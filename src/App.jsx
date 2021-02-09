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

const App = () => {
  const[users, setUsers] = useState([]);
  const[loading, setLoading] = useState(false);
  const[alert, setAlert] = useState(null);
  const[user, setUser] = useState({});
  const[repos, setRepos] = useState([]);

  useEffect(()=>{
    const fetchUsers = async () => {
      setLoading(true);
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data);
    setLoading(false);
    }
    fetchUsers();
    
  },[])


  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false);
    setUsers(res.data.items)

  }
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false);
    setUser(res.data);
  }

  const getUsersRepos = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false);
    setRepos(res.data);
  }
  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
    }

  const sendAlert = (msg,type) => {
    setAlert({msg, type});
    setTimeout(()=> setAlert(null), 5000);
  }
    
    return (
      <Router>
          <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"/>

        <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route exact path="/" render={props => (
            <Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers} 
                 showClear={users.length>0?true:false} setAlert={sendAlert}/>
                 <Users users={users} loading={loading}/>
            </Fragment>
          )} />
          <Route exact path="/about" render={About} />
          <Route exact path="/user/:login" render={props =>(
            <User {...props } getUser={getUser} getUsersRepos={getUsersRepos} repos={repos} user={user} loading={loading} />
          )}/>
        </Switch>
        
        </div>    
      </div>
      </Router>
    
    ); 
}

export default App;

