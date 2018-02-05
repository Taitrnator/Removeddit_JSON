import {getComments} from './comments';
import {getThread} from './thread';
import snoowrap from 'snoowrap'
import { credentials } from './clientID'


let Token = new snoowrap({
  userAgent: credentials.userAgent,
  clientId: credentials.clientId,
  clientSecret: credentials.clientSecret,
  username: credentials.username,
  password: credentials.password
});



getComments('TwoXChromosomes', '7v6xf3');
