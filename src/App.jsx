 import './App.css';
 import React, {Fragment, useEffect, useState} from "react";
 import Navbar from "./components/layout/Navbar"
 import Users from "./components/users/Users"
 import Search from "./components/users/Search"
 import Alert from "./components/layout/Alert"
 import About from "./components/pages/About"
 import User from "./components/users/User"
 import {BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
 import axios from "axios";
  import GithubState from "./context/github/GithubState"
const App = () => {
  const[loading, setLoading] = useState(false);
  const[alert, setAlert] = useState(null);
 
  const[repos, setRepos] = useState([]);



 

  const getUsersRepos = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false);
    setRepos(res.data);
  }
  
  const sendAlert = (msg,type) => {
    setAlert({msg, type});
    setTimeout(()=> setAlert(null), 5000);
  }
    
    return (
      <GithubState>
      <Router>
          <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"/>

        <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route exact path="/" render={props => (
            <Fragment>
                <Search
                 setAlert={sendAlert}/>
                 <Users />
            </Fragment>
          )} />
          <Route exact path="/about" render={About} />
          <Route exact path="/user/:login" render={props =>(
            <User {...props } getUsersRepos={getUsersRepos} repos={repos} />
          )}/>
        </Switch>
        
        </div>    
      </div>
      </Router>
      </GithubState>
    ); 
}

export default App;

