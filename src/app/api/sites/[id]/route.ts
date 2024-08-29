import { ISite } from '@/types';
import { db } from '@/utils/database';
import ResponseErrors from '@/utils/errors';
import { ObjectId, WithoutId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const sitesCol = db.collection<WithoutId<ISite>>('sites');

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (_: NextRequest, { params }: Props) => {
  try {
    const site = await sitesCol.findOne({ _id: new ObjectId(String(params.id)) });
    if (!site) {
      return ResponseErrors.notFound();
    }

    return NextResponse.json(site);
  } catch (error: any) {
    return ResponseErrors.base(error.message);
  }
};

export const PUT = async (_: NextRequest, { params }: Props) => {
  try {
    const site = await sitesCol.findOne({ _id: new ObjectId(String(params.id)) });
    if (!site) {
      return ResponseErrors.notFound();
    }

    await sitesCol.updateOne({ _id: site._id }, { $set: { wrong: true } });

    return NextResponse.json(site);
  } catch (error: any) {
    return ResponseErrors.base(error.message);
  }
};
