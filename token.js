'use strict';
import snoowrap from 'snoowrap'
import { credentials } from './clientID'

export const Token = new snoowrap({
  userAgent: credentials.userAgent,
  clientId: credentials.clientId,
  clientSecret: credentials.clientSecret,
  username: credentials.username,
  password: credentials.password
});

export const getToken = () => {
  return Token;
}
