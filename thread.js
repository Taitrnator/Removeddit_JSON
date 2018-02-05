import snoowrap from 'snoowrap'
import { Token } from './token';
import { json } from './utils'

const cachedThreads = {}

// Thread = Post + Comments
// Return the post itself
export const getPost = (subreddit, threadID) => {
  getThread(subreddit, threadID)
  .then(thread =>  {
    thread[0].data.children[0].data
  });
}

export const getThread = (subreddit, threadID, commentID = '') => {
  // We have already downloaded the thread and can use a cached copy
    if (cachedThreads.hasOwnProperty(threadID)) {
      if (cachedThreads[threadID].hasOwnProperty(commentID)) {
        return Promise.resolve(cachedThreads[threadID][commentID])
      }
    }
  // .getSubmissions(threadID).expandReplies({limit: Infinity, depth: Infinity});
    // Create cache object for thread  if it doesn't exists
    cachedThreads[threadID] = {}


    // Token.getSubmission(threadID).expandReplies({limit: Infinity, depth: Infinity})
    // .then(console.log);
    // thread => {
    //   console.log(thread);
    //   // Save the thread for later
    //   cachedThreads[threadID][commentID] = JSON.stringify(thread);
      // Return the thread

      return (
      Token.getSubmission(threadID).expandReplies({limit: Infinity, depth: Infinity})
        .then(json)
        .then(thread => {
          // Create cache object for thread  if it doesn't exists
          if (!cachedThreads.hasOwnProperty(threadID)) {
            cachedThreads[threadID] = {}
          }

          // Save the thread for later
          cachedThreads[threadID][commentID] = thread

          // Return the thread
          return thread
        })
    )
  }
