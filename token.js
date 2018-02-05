'use strict';
import snoowrap from 'snoowrap'
import clientID from './clientID'

export const r = new snoowrap({
  userAgent: clientID.User,
  clientId: clientID.clientID,
  clientSecret: clientID.Secret,
  refreshToken: 'put your refresh token here'
});
