import { getToken } from './token'

// Header for general api calls
export const getAuth = () => {
  let token = getToken();
  console.log(token);
  // getToken()
  //   .then(token => (
  //     {
  //     headers: {
  //       Authorization: `bearer ${token}`,
  //     },
  //   }))
}
