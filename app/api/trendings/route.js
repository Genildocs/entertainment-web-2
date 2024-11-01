import { NextResponse } from 'next/server';

export async function GET(request) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGQ0MTI2NDI0ODRjNTVhYTM0MmUyNzFhZTU0ZmMxMiIsIm5iZiI6MTczMDQyMTg5Ni4yOTUyODg4LCJzdWIiOiI2NWQ2ZWE5Zjk5NzRlZTAxN2IwNjQwNTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OatpsyMSNqysZJGgdVeCe4b3mksshaWcX8i5h17xrtA',
    },
  };

  try {
    const res = await fetch(
      'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
      options
    );
    const data = await res.json();
    // Envia a resposta como JSON
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar dados', error: error.message },
      { status: 500 }
    );
  }
}
