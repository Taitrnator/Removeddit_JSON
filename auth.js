import snoowrap from 'snoowrap'
import { Token } from './token'

// Header for general api calls
export const getAuth = () => {
  snoowrap.fromAuthCode(Token).then(console.log);
  // getToken()
  //   .then(token => (
  //     {
  //     headers: {
  //       Authorization: `bearer ${token}`,
  //     },
  //   }))
}
