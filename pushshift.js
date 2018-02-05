import { json, toBase10, toBase36, chunk, flatten } from './utils'

const baseURL = 'https://elastic.pushshift.io'
const postURL = `${baseURL}/rs/submissions/_search?source=`
const commentURL = `${baseURL}/rc/comments/_search?source=`
const commentIDsURL = 'https://api.pushshift.io/reddit/submission/comment_ids/'

export const getCommentIDs = threadID => (
  fetch(commentIDsURL + threadID)
    .then(json)
    .then(results => results.data)
)

export const getPost = threadID => {
  const elasticQuery = {
    query: {
      term: {
        id: toBase10(threadID),
      },
    },
  }

  return (
    fetch(postURL + JSON.stringify(elasticQuery))
      .then(json)
      .then(jsonData => jsonData.hits.hits[0]._source)
      .then(post => {
        post.id = toBase36(post.id)
        return post
      })
  )
}

export const getComments = commentIDs => (
  Promise.all(chunk(commentIDs, 100).map(fetchComments)).then(flatten)
)

const fetchComments = commentIDs => {
  const elasticQuery = {
    query: {
      ids: {
        values: commentIDs.map(toBase10),
      },
    },
    _source: [
      'author', 'body', 'created_utc', 'parent_id', 'score',
    ],
  }

  return (
    fetch(commentURL + JSON.stringify(elasticQuery))
      .then(json)
      .then(jsonData => jsonData.hits.hits)
      .then(comments => comments.map(comment => {
        comment._source.id = toBase36(comment._id)

        if (!comment._source.parent_id) {
          console.error('MISSING PARENT ID')
        }

        comment._source.parent_id = toBase36(comment._source.parent_id)
        return comment._source
      }))
  )
}
