import {getComments} from './comments';
import {getThread} from './thread';
import snoowrap from 'snoowrap'
import { Token } from './token';
const fs = require('fs');

// getComments('TwoXChromosomes', '7v6xf3');
// let subreddit = Token.getSubreddit('TwoXChromosomes')

// Token.getHot().then(console.log);

getThread('TwoXChromosomes', '7v6xf3').then(value => {
  fs.writeFile('thread.json', value, function(err){ });
})
