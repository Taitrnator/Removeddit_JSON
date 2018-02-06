import fs from 'fs';
import snoowrap from 'snoowrap'
import {getPost, getCommentIDs, getThread} from './thread';
import { Token} from './token';
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
      Token.getSubmission(threadID).expandReplies({limit: Infinity, depth: Infinity})
        .then(post => {
          console.log(post);
          // Fetch the thread from pushshift if it was deleted/removed
          if (isDeleted(post.selftext)) {
            getRemovedPost(threadID)
              .then(removedPost => {
                removedPost.removed = true
                this.setState({ post: removedPost })
              })
          }
        })
      // // Get comment ids from reddit
      .then(() => getCommentIDs(subreddit, threadID))
      //
      // // Get comment ids from pushshift
      .then(() => getAllCommentIDs(threadID))
])
      .then(results => {
        try {
        const foundIDs = results[0]
        const allIDs = results[1]

        console.log("////////////////results 0");
        console.log(results[0]);
        console.log("////////////////results 1");
        console.log(results[1]);

        const removedIDs = difference(allIDs, foundIDs)
        // Get removed comments from pushshift
        return getRemovedComments(removedIDs)
        }
        catch(err) {
          console.log(`uh oh: ${error}`)
        }
      })
