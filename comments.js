import snoowrap from 'snoowrap'
import { chunk, flatten, json } from './utils'
import { getAuth } from './auth'

export const getComments = commentIDs => (
  getAuth()
    .then(auth => (
      Promise.all(chunk(commentIDs, 100).map(ids => fetchComments(ids, auth))).then(flatten)
    ))
)

export const fetchComments = (commentIDs, auth) => {
  for (let i = 0; i < commentIDs.length; i++) {
    auth.getComment(commentID[i]).expandReplies({limit: Infinity, depth: Infinity})
    .then(results => results.data.children)
    .then(commentsData => commentsData.map(commentData => commentData.data))
    }
}
