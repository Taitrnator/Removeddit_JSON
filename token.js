'use strict';
import snoowrap from 'snoowrap'
import credentials from './clientID'

export const Token = new snoowrap({
  credentials
});
