import './App.css';
import {useHistory} from "react-router-dom"
import React,{ useState,} from 'react';
import {BrowserRouter,Switch,Route,NavLink} from "react-router-dom";
import {logoutUser} from './service/users/UserService';
import Register from './Register';
import Login from './Login'
import PostWall from './PostWall';

function App() {
const [token,setToken] = useState('');
const history = useHistory();
const [username,setUsername] = useState('');
const [logedin,setlogedin] = useState(false);
const initiallLogoutUserUrl ='http://localhost:8080/user/logout'

const logout = () => {
  logoutUser(initiallLogoutUserUrl,token)
  setlogedin(false);
  setToken('');
  alert("You logged out from " + username);
}

if (logedin === false) {
  return (
    <div className="App">
      <BrowserRouter>                        
        <div className="header" style={{display:"flex",justifyContent:"center",  padding:"10px", backgroundColor:"DarkOliveGreen"}} >
          <NavLink exact activeClassName="active" to="/" style={{padding:"5px", color: 'black' }}>Register</NavLink>
          <NavLink activeClassName="active" to="/login" style={{padding:"5px", color: 'black'}}>Login</NavLink>
          <NavLink activeClassName="active" to="/postwall" style={{padding:"5px", color: 'black'}}>PostWall</NavLink>
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/postwall" component={  () => <PostWall  username={username} setUsername={setUsername} logedin={logedin} token={token} setToken={setToken}/>} />
            <Route exact path="/login" component={  () => <Login setToken={setToken} token={token} logedin={logedin} setlogedin={setlogedin}
            username={username} setUsername={setUsername} />} /> 
          </Switch>
        </div>
        </BrowserRouter>
    </div>
  );
}
else {
  return (
  
    <div className="App">
      <BrowserRouter>
        <div className="header" style={{display:"flex", justifyContent:"center", border:"2px solid", borderBlockColor:"LemonChiffon", padding:"15px", backgroundColor:"DarkOliveGreen"}}>
          <NavLink activeClassName="active" to="/postwall" style={{padding:"5px", color: 'black'}}>PostWall</NavLink>
          <NavLink activeClassName="active" to="/login" onClick={logout} style={{padding:"5px", color: 'black'}}>Logout</NavLink>
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/postwall" component={  () => <PostWall  username={username} setUsername={setUsername} logedin={logedin} token={token} setToken={setToken}/>} />
            <Route exact path="/login" component={  () => <Login setToken={setToken} token={token} logedin={logedin} setlogedin={setlogedin} 
            username={username} setUsername={setUsername}/>} /> 
          </Switch>
        </div>
        </BrowserRouter>
    </div>
  );
}
}

export default App;