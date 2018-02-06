import fs from 'fs';
import snoowrap from 'snoowrap'
import {
  getPost
} from './thread'
import {
  getComments
} from './comments'
import {
  getPost as getRemovedPost,
  getComments as getPushshiftComments,
} from './pushshift'
import {
  isDeleted,
  isRemoved
} from './utils'

// getComments('TwoXChromosomes', '7v6xf3');
// let subreddit = Token.getSubreddit('TwoXChromosomes')

// Token.getHot().then(console.log);

// getThread('TwoXChromosomes', '7v6xf3').then(value => {
//   fs.writeFile('thread.json', value, function(err){ });
// })


let subreddit = 'TwoXChromosomes',
  threadID = '7v6xf3';

Promise.all([
    // Get thread from reddit
    getPost(subreddit, threadID)
    .then(post => {
      // Fetch the thread from pushshift if it was deleted/removed
      if (isDeleted(post.selftext)) {
        getRemovedPost(threadID)
          .then(removedPost => {
            removedPost.removed = true
          })
      }
    }),
    // Get comment ids from pushshift
    getPushshiftComments(threadID),
  ])
  .then(console.log('///////////PUSH SHIFT COMMENTS///////////'))
  .then((res) => console.log(res))
  .then(results => {
    const pushshiftComments = results[1]

    // Extract ids from pushshift response
    const ids = pushshiftComments.map(comment => comment.id)
    console.log('pushshift:', ids.length)

    // Get all the comments from reddit
    return (
      getRedditComments(ids)
      .then(redditComments => {
        pushshiftComments.forEach(comment => {
          // Replace pushshift score with reddit (its usually more accurate)
          const redditComment = redditComments.find(rComment => rComment.id === comment.id)
          if (redditComment !== undefined) {
            comment.score = redditComment.score
          }
        })
        return redditComments
      })
    )
  })
  .then(redditComments => {
      console.log('reddit:', redditComments.length)
      const removed = []
      const deleted = []

      // Check what as removed / deleted according to reddit
      redditComments.forEach(comment => {
        if (isRemoved(comment.body)) {
          removed.push(comment.id)
        } else if (isDeleted(comment.body)) {
          deleted.push(comment.id)
        }
      })
    })
