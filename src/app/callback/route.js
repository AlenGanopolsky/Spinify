import { NextRequest, NextResponse } from "next/server";

import url_link from "@/app/consts";

// also potential cause
import { refreshAccessToken } from "../api/auth/token/refresh/route";
/**
 * 
 * @param {NextRequest} request 
 */
let accessToken;
export async function GET(request) {
    const data = request.nextUrl.searchParams;
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
    const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
    const url = process.env.NEXT_PUBLIC_REDIRECT_URI;
    let refreshToken;
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        body: new URLSearchParams({
            code: data.get('code'),
            redirect_uri: "http://localhost:3000/callback",
            grant_type: 'authorization_code'

        })

        
      });
  
      const data_response = await response.json();
      accessToken = data_response.access_token;
      //    refreshToken = data_response.refresh_token;
       
      //    console.log(data_response);
       console.log("oops!");
      //  console.log(data_response.refresh_token);
      //  console.log(data_response.refresh_token);
      //   console.log(data_response.refresh_token);
     

      if (response.ok) {
        refreshToken = data_response.refresh_token;
        //  console.log(refreshToken);
        let resp = NextResponse.redirect(new URL('/dashboard', request.url));
        

        resp.cookies.set('Cookie', accessToken, {
            httpOnly: false,
         
        });
     
        resp.cookies.set('RefreshCookie', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          path: '/',
        });

        
        return resp;
      } else {
        return NextResponse.json(data_response, { status: response.status });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Error fetching access token', details: error.message },
        { status: 500 }
      );
    }


}
