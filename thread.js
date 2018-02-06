import fetch from 'node-fetch';
import { getAuth } from './auth'
import { Token } from './token'

const cachedThreads = {}

// Thread = Post + Comments
// Return the post itself
export const getPost = (subreddit, threadID) => (
  getThread(subreddit, threadID)
)

export const getThread = (subreddit, threadID, commentID = '') => {
  // We have already downloaded the thread and can use a cached copy
  if (cachedThreads.hasOwnProperty(threadID)) {
    if (cachedThreads[threadID].hasOwnProperty(commentID)) {
      return Promise.resolve(cachedThreads[threadID][commentID])
    }
  }

  const url = `https://oauth.reddit.com/r/${subreddit}/comments/${threadID}/_/${commentID}`
  // Fetch thread from reddit
  return (
    Token.getSubmission(threadID).expandReplies({limit: Infinity, depth: Infinity})
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
