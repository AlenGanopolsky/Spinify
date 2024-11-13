'use client';

import '../globals.css';
import { useState, useEffect } from 'react';
import Utils from '../utils';

export default function page() {
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [genres, setGenres] = useState('');
    const [track, setTrack] = useState('');
    const [uris, setUris] = useState('');
    const [valid, setValid] = useState(false);
    const expiration_time = 3600000;

    // this endpoint here  '../api/auth/token/refresh/route'
    async function initToken() {
        try {
            
            const response = await fetch('/api/auth/token/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
                // body here
            });
    
            if (!response.ok) {
                console.log('...');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const tokenData = await response.json();
            const newToken = tokenData.token;
     
            console.log('New token:', newToken);

            // added this back
            setToken(newToken);


            return newToken;
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
    }

    
    useEffect( () => {
        
        // Changes: wrapped setInterval() in the useEffect() just to experiment
        setInterval(initToken, expiration_time - 1000);
        

        // end 

        const accessToken = document.cookie.split("; ").map(c =>c.split("=")).find(([k,v]) => k === "Cookie")[1];
        setToken(accessToken);
        console.log(accessToken);

        const getTrack = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${ accessToken }`,
                  
                    }

                })

                const current_info = await response.json();
                console.log(token)
                console.log(current_info);
                console.log(current_info.item.artists[0].id)
                console.log(current_info.item.id);
                const artistId = current_info.item.artists[0].id;
                setId(artistId);
                setTrack(current_info.item.id);
            }

            catch(e) {

                console.error("error in getting current track", e);
            }
        }

        getTrack();

    }, [])

    useEffect(() => {
        if (id && token) {

        
        const artistGenres = async (id, token) => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${ token }`
                    }
                })
                const data = await response.json();
                if (data.genres.length == 0) {
                    console.log('error: no genres included');
                }
                
                else {
                
                console.log(data.genres);
                setGenres(data.genres);

            
            }
        }

            catch(e) {
                console.error('error in fetching artist genres', e);
            }
        }
        

        
        artistGenres(id, token);
    }
    }, [id, token]);


    useEffect(() => {
        const getRecs = async (genres, limit, token, track, id) => {
        if (token && genres.length > 0 && track && id) {
            try {
                const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${id}&seed_genres=${genres[0]}&seed_tracks=${track}&min_popularity=10&max_popularity=30`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${ token }`
                        }
                    })

                    const recTracks = await response.json();
                    console.log(genres[0]);
                    if (recTracks.length < 5) {
                        console.log('...');
                        
                    }
                    console.log(recTracks);
                    const uriList = Utils.extractUris(recTracks.tracks);

                    setUris(uriList);
            }
        catch(e) {
            console.error(e);
        }
    }
    }   

    getRecs(genres, 5, token, track, id);

    }, [genres, token, id, track]);


    
    const addQueue = async (token, uri) => {
        if (token && uris) {
            try {
                const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${encodeURIComponent(uri)}`, 
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${ token }`,
                            'Content-Type': 'application/json'

                        }
                    })
            }

            catch(e) {
                console.error('error in adding to queue', e);
            }
        }
    }

 
    const addAll = async (token, uri) => {
        if (uris.length < 3) {
            setValid(true);
            
        }
        else {
        for (let i = 0; i < uris.length; i++) {
            if (sessionStorage.getItem(uri[i]) == null) {
            await addQueue(token, uri[i]); 
            sessionStorage.setItem(uri[i], 'track_uri');
            }
            
        }
        window.location.reload();
    }

    }   

    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <button className = "bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded font-mono" onClick = {() => {addAll(token, uris);}}> Spin </button>
        {valid ? <p> ERROR, PLEASE RELOAD AND SPIN </p> : <p></p>}
        </div>
    );

}




