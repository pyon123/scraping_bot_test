import { ISite, SiteType } from '@/types';
import { db } from '@/utils/database';
import ResponseErrors from '@/utils/errors';
import { WithoutId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const sitesCol = db.collection<WithoutId<ISite>>('sites');

const siteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const GET = async () => {
  try {
    const sites = await sitesCol.find().sort({ searchedAt: -1 }).toArray();
    return NextResponse.json(sites);
  } catch (error: any) {
    return ResponseErrors.base(error.message);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    let { site, requireSubSearch = false } = await request.json();
    if (!site || typeof site !== 'string') {
      return ResponseErrors.invalid();
    }
    if (!siteRegex.test(site)) {
      return ResponseErrors.invalid();
    }

    site = site.trim();
    site = site.endsWith('/') ? site.slice(0, -1) : site;

    let type = SiteType.website;
    if (site.includes('youtube.com') || site.includes('youtu.be')) {
      type = SiteType.youtube;
    }
    if (!site.startsWith('http')) {
      site = `https://${site}`;
    }

    const existing = await sitesCol.findOne({ url: site });
    if (existing) {
      return ResponseErrors.base('Site already exists in our db');
    }

    await sitesCol.insertOne({
      url: site,
      baseUrl: site,
      type,
      subSearched: false,
      requireSubSearch,
      contentChecked: false,
    });

    return NextResponse.json({});
  } catch (error: any) {
    return ResponseErrors.base(error.message);
  }
};
