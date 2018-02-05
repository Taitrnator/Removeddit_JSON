import fs from 'fs';
import snoowrap from 'snoowrap'
import {  getPost,
          getCommentIDs } from './comments';
import {getThread} from './thread';

import { Token } from './token';
import {
  getPost as getRemovedPost,
  getCommentIDs as getAllCommentIDs,
  getComments as getRemovedComments,
} from './pushshift';
import { isDeleted, difference } from './utils';


// getComments('TwoXChromosomes', '7v6xf3');
// let subreddit = Token.getSubreddit('TwoXChromosomes')

// Token.getHot().then(console.log);

// getThread('TwoXChromosomes', '7v6xf3').then(value => {
//   fs.writeFile('thread.json', value, function(err){ });
// })


let subreddit = 'TwoXChromosomes',
    threadID = '7v6xf3';

    console.timeEnd('scripts loaded')

    Promise.all([
      // Get thread from reddit
      getPost(subreddit, threadID)
        .then(post => {
          // Fetch the thread from pushshift if it was deleted/removed
          if (isDeleted(post.selftext)) {
            console.log('post deleted');
            // getRemovedPost(threadID)
            //   .then(removedPost => {
            //     removedPost.removed = true
            //     this.setState({ post: removedPost })
            //   })
          }
        })
      // Get comment ids from reddit
        .then(() => getCommentIDs(subreddit, threadID)),

      // Get comment ids from pushshift
      getAllCommentIDs(threadID)
])
      .then(results => {
        const foundIDs = results[0]
        const allIDs = results[1]

        const removedIDs = difference(allIDs, foundIDs)
        // Get removed comments from pushshift
        return getRemovedComments(removedIDs)
      })
