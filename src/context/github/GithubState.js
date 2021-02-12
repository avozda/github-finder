import {useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {SEARCH_USERS, SET_LOADING,SET_ALERT, GET_REPOS,GET_USER, CLEAR_USERS} from "../types"

const GithubState= props => {
   const initalState = {
      users:[],
      user:{},
      repos:[],
      loading:false
   }

   const [state,dispatch] = useReducer(GithubReducer, initalState);

    
  const getUser = async (username) => {
   setLoading();
   const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   dispatch({
      type:GET_USER,
      payload: res.data
   })
 }

   const searchUsers = async text => {
      setLoading();
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
      dispatch({
         type: SEARCH_USERS,
         payload: res.data.items
      });
    }
    const clearUsers = () => dispatch({type:CLEAR_USERS})
  

    const setLoading = () => dispatch({type: SET_LOADING})

   return <GithubContext.Provider value={{
      users:state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser
      }}>

      {props.children}
   </GithubContext.Provider>
}

export default GithubState;