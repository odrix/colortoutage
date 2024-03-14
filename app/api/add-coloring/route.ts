import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coloringName = searchParams.get('coloringName');
  const filePath = searchParams.get('filePath');
  const tags = searchParams.get('tags');
 
  try {
    if (!coloringName || !filePath) throw new Error('coloringName and filePath names required');
    await sql`INSERT INTO Colorings (Name, file, tags) VALUES (${coloringName}, ${filePath}, ${tags});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const colorings = await sql`SELECT * FROM Colorings;`;
  return NextResponse.json({ colorings }, { status: 200 });
}