import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import generator from '@/lib/generator';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');
  const to = searchParams.get('to');
  const url = searchParams.get('url');

  let filename: string | undefined;
  try {

    // if (!subject || !to) throw new Error('coloringName and filePath names required');
    if (subject && to){
      const imgData = await generator.generateColoring(subject, to);
      console.log(imgData);
      if(imgData)
        filename = await generator.saveData(imgData);

    }
    
    // if (!url) throw new Error('image url is required');
    // await generator.save(url, 'test.png');
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 

  return NextResponse.json({ filename }, { status: 200 });
}