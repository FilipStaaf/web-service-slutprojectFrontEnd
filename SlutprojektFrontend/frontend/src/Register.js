import React,{ useState, useEffect} from 'react';
import {useHistory} from "react-router-dom"
import { registerUser} from './service/users/UserService';


function Register() {
    const history = useHistory();
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const initialUrlRegister = 'http://localhost:8080/user/register'

    const Registerform = (e) =>{
        e.preventDefault();
        if(username === '' || password === ''){
            alert("Username or password is empty..")
        }else{
            registerUser(initialUrlRegister,username,password);
            history.push('/login')
        }
    }
    const gotoLogin = () =>{
        history.push('/login')
    }
  
    return (

      <div className="App">
          <h3>Register</h3>
        <form onSubmit={Registerform}>
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}></input><br/>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input><br/>
            <button>Register</button>
        </form>
        <button style={{backgroundColor:'rgba(52,52,52,0'}}onClick={gotoLogin}>Already have an account? Go to login here!</button>
      </div>
    
    );
  }


  export default Register;
