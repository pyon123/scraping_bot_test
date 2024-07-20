import { ISite, SiteType } from '@/types';
import { db } from '@/utils/database';
import ResponseErrors from '@/utils/errors';
import { WithoutId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const sitesCol = db.collection<WithoutId<ISite>>('sites');

const siteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const GET = async () => {
  try {
    const sites = await sitesCol.find().toArray();
    return NextResponse.json(sites);
  } catch (error: any) {
    return ResponseErrors.base(error.message);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    let { site } = await request.json();
    if (!site || typeof site !== 'string') {
      return ResponseErrors.invalid();
    }
    if (!siteRegex.test(site)) {
      return ResponseErrors.invalid();
    }

    if (site.includes('youtube.com')) {
      return ResponseErrors.base('Youtbe not acceptable');
    }
    if (!site.startsWith('http')) {
      site = `https://${site}`;
    }

    await sitesCol.updateOne(
      { url: site },
      {
        $set: {
          url: site,
          baseUrl: site,
          type: SiteType.website,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({});
  } catch (error: any) {
    return ResponseErrors.base(error.message);
  }
};
