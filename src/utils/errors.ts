import { NextResponse } from 'next/server';

const base = (message: string, status = 400) => NextResponse.json({ message }, { status });

const server = () => NextResponse.json({ message: 'Internal server error.' }, { status: 500 });

const notFound = () => NextResponse.json({ message: 'Not Found' }, { status: 404 });

const invalid = () =>
  NextResponse.json(
    {
      message: 'Invalid request',
    },
    { status: 400 }
  );

const unauthorized = () =>
  NextResponse.json({ message: 'You do not have permission to run this service.' }, { status: 403 });

const unauthenticated = () => NextResponse.json({ message: 'You are not authenticated.' }, { status: 401 });

const ResponseErrors = {
  base,
  notFound,
  server,
  invalid,
  unauthorized,
  unauthenticated,
};

export default ResponseErrors;
