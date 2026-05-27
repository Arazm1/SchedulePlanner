import fetchData from "../utils/fetchData";
//import { useUserContext } from "./contextHooks";


//Server API URL
let SERVER_URL = import.meta.env.VITE_SERVER_URL;
let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.VITE_USE_LOCAL_SERVER === 'true') {
  SERVER_URL = import.meta.env.VITE_SERVER_URL_LOCAL;
  API_URL = import.meta.env.VITE_API_URL_LOCAL;
}

/**
 * Custom hook for authentication-related API requests.
 * @returns {Object} Functions for interacting with the authentication related requests.
 *  - postLogin - Post login with inputs and returns token.
 *  - postRegister - Post register with inputs.
 */
const useAuthentication = () => {
  //Login
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      SERVER_URL + '/api/v1/auth/login',
      fetchOptions,
    );
    return loginResult;
  };

  //Register
  const postRegister = async (inputs) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };

      const registerResult = await fetchData(SERVER_URL + '/api/v1/auth/register', fetchOptions);
      return registerResult;
    } catch (error) {
      console.log('Error in postRegister: ', error);
    }
  };

  return {postLogin, postRegister};

}

const useUser = () => {
  const getUserByToken = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    };

    const result = await fetchData(API_URL + '/users/me', fetchOptions);
    return { user: result };
  };
  return { getUserByToken }
}



export {
  useAuthentication,
  useUser,
};