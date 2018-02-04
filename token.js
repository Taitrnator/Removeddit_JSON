var express = require('express');
import { json } from './utils'
import clientID from './clientID'

var app = express();

// Token for reddit API
let token = null

// Headers for getting reddit api token
const tokenInit = {
  headers: {
    Authorization: `Basic ${Buffer.from(clientID, 'base64').toString()}`,
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
      console.log(res);
      json(res);
      console.log(`collected response: ${res}`);
      token = res.access_token
      return token
    })
  )
}
