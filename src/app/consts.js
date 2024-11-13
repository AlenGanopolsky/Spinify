import Utils from "./utils";

const url_link = () => {
    const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
    const scopes = ('playlist-modify-public playlist-read-private user-modify-playback-state playlist-read-private playlist-read-collaborative user-read-private user-read-email user-top-read user-read-currently-playing');
    const redirect = process.env.NEXT_PUBLIC_REDIRECT_URI;
    var state = Utils.generateRandomString(16);
    const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect}&scope=${scopes}&state=${state}`;

    return url;
}

export default url_link;