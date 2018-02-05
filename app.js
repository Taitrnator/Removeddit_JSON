import express from 'express';
import {getComments} from './comments';
import {getThread} from './thread';


export const app = express();

console.log(getThread('TwoXChromosomes', '7v2fcs'));
