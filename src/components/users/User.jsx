import React, { useEffect, Fragment, useContext } from 'react'
import {Link} from "react-router-dom"
import Spinner from "../layout/Spinner"
import PropTypes from "prop-types"
import Repos from "../repos/Repos"
import GithubContext from "../../context/github/githubContext"

const User = ({repos,getUsersRepos, match}) => {
  const githubContext = useContext(GithubContext);
  const {user,loading, getUser} = githubContext;
useEffect(()=> {
   getUser(match.params.login);
   getUsersRepos(match.params.login)
   //eslint-disable-next-line
},[]);

   const {name,avatar_url, location,bio,blog,login,html_url,followers,following,public_repos,public_gists,hireable, company} = user


      if(loading) {
         return <Spinner/>
      }else {
         return (

            <Fragment>
              <Link to="/" className="btn btn-light">Back to search</Link>
              Hireable: {" "}{hireable?<i className="fas fa-check text-success"></i>:<i className="fas fa-times-circle text-danger"></i>}
            <div className="card grid-2">
               <div className="all-center">
                  <img src={avatar_url} alt="profile" className="round-img" style={{width:"150px"}} />
                  <h1>{name}</h1>
                   <p>Location: {location}</p>
               </div>
               <div>
                  {bio && (<Fragment>
                     <h3>Bio</h3>
                     <p>{bio}</p>
                     </Fragment>)}
                  <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                  <ul>
                     <li>{login&&<Fragment><b>Username:</b> {login}</Fragment>}</li>
                     <li>{company&&<Fragment><b>Company:</b> {company}</Fragment>}</li>
                     <li>{blog&&<Fragment><b>Website:</b> <a href={blog}>{blog}</a> </Fragment>}</li>
                  </ul>
               </div>
               
            </div>
            <div className="car text-center">
                  <div className="badge badge-primary">Followers: {followers}</div>
                  <div className="badge badge-success">Following: {following}</div>
                  <div className="badge badge-light">Public Repos: {public_repos}</div>
                  <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos}/>
            </Fragment>
         )
      }
}

User.propTypes = {
   getUsersRepos: PropTypes.func.isRequired,
   repos: PropTypes.array.isRequired
}

export default User
