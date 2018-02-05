import { app } from './app';
import { ClientID } from './clientID';

// Token for reddit API
let token = null

// Headers for getting reddit api token
const tokenInit = {
  headers: {
    Authorization: `Basic ${ClientID}`,
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  },
  method: 'POST',
  body: `grant_type=${encodeURIComponent('https://oauth.reddit.com/grants/installed_client')}&device_id=DO_NOT_TRACK_THIS_DEVICE`,
}

export const getToken = () => {
  if (token !== null) {
    return Promise.resolve(token)
  }

  return (
    app.get('https://www.reddit.com/api/v1/access_token', function(req, res) {
      res = res.json();
      token = res.access_token
      return token
    })
  )
}
