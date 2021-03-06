import { useState, useContext } from 'react'
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext"

const Search = ({ setAlert}) =>{
  const githubContext = useContext(GithubContext);
  const {searchUsers, clearUsers, users} = githubContext;
   const [text, setText] = useState("");
   const onSubmit = (e) => {
      e.preventDefault();
      if (text === "") {
         setAlert("Please enter something", "light")
      } else {
         searchUsers(text);
         setText("");
      }
   }
   const onChange = (e) => {
      setText(e.target.value);
   }

      return (
         <div>
            <form className="form" onSubmit={onSubmit}>
               <input type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange}/>
               <input type="submit" value="Search" className="btn btn-dark btn-block"/>
            </form>
            {users.length>0 && <button className="btn btn-block btn-light" onClick={clearUsers}>Clear</button>}
           
         </div>
      )
   
}

Search.propTypes = {
   setAlert: PropTypes.func.isRequired
}

export default Search
