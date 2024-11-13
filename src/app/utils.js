export default class Utils {

    static generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }


    static extractUris(trackList) {
      var uriList = [];
      for (let i = 0; i < trackList.length; i++) {
        uriList.push(trackList[i].uri);
      }

      return uriList;
    }


}

