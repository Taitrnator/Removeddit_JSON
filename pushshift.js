import fetch from 'node-fetch';
import { toBase10, toBase36, chunk, flatten } from './utils'

const baseURL = 'https://elastic.pushshift.io'
const postURL = `${baseURL}/rs/submissions/_search?source=`
const commentURL = `${baseURL}/rc/comments/_search?source=`

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
      .then((res) => res.json())
      .then(jsonData => jsonData.hits.hits[0]._source)
      .then(post => {
        post.id = toBase36(post.id)
        return post
      })
  )
}

export const getComments = threadID => (
  fetch(`https://api.pushshift.io/reddit/comment/search?link_id=${threadID}&limit=10000`)
    .then((res) => res.json())
    .then(data => data.data)
    .then(comments => {
      comments.forEach(comment => {
        comment.link_id = comment.link_id.split('_')[1]
        comment.parent_id = comment.parent_id.split('_')[1]
      })
      return comments
    })
)
