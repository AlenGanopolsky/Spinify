
import { NextResponse } from 'next/server';

/**
 * 
 * @param {NextResponse} request 
 * 
 * 
 * 
 */

export async function POST(request) {
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

  const cookieHeader = request.headers.get('cookie');
  const refreshToken = cookieHeader?.split('; ').find(cookie => cookie.startsWith('RefreshCookie='))?.split('=')[1];
  console.log('here it is!', refreshToken);
  if (refreshToken) {
    try {
      const refresh = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      });

      const data = await refresh.json();
      const tokenTwo = data.access_token;
      
      console.log('success!');
      console.log('UUUUUUUUUUUUUUUUUUUUUUUU', tokenTwo);
      return NextResponse.json({ token: tokenTwo }, {status: 200});
    }
  

    catch(e) {
      console.error("error in getting new access token", e);
      return NextResponse.json({ error: "Failed to get new access token"}, {status: 500});
    }
  }

  
  return NextResponse.json({error: "what the even happened"}, {status: 500});
}


