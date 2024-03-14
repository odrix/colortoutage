import { db, Coloring } from '../../../lib/database.ts'
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    const result = await db.selectFrom("colorings")
                    .select(['colorings.name', 'colorings.file', 'colorings.tags'])
                    .where('tags', 'like', `%${tag}%`)
                    .execute()

    return NextResponse.json({ result }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}