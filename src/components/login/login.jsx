import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from '../service/AuthService ';
import './login.scss';

function Login() {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        let token = AuthService.getToken();
        console.log(`Bearer ${token}`);
        if (token !== null) {
            fetch("http://localhost:8081/private", {
               
                headers: {
                    "Authorization": `Bearer ${token}`
                }

            })
                .then(response => {
                   
                    response.body.getReader().read().then(data => {
                        let userInfo = new TextDecoder("utf-8").decode(data.value);
                 console.log(userInfo);
                       
                    });
                });
        }
    }, []);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setUserInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLogin = () => {
        let { username, password } = userInfo;

        fetch("http://localhost:8080/auth/realms/AkaResident/protocol/openid-connect/token", {
            method: "POST",
            body: `client_id=login-app&password=${password}&username=${username}&grant_type=password`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.status !== 200) {
                alert("Sai tai khoan mat khau");
            } else if (res.status === 200) {
                res.body.getReader().read().then(data => {
                    let userInfo = JSON.parse(new TextDecoder("utf-8").decode(data.value));
                    let token = userInfo.access_token;
                    AuthService.setToken(token);
                    alert("ban da nhan dc token");
                });
            }
        }).catch(error => {
            alert("Loi server");
        });

    }

    return (
        <div className="Login">
            <label>username</label>
            <input className="username" type="text" onChange={handleChange} name="username"></input>
            <label>password</label>
            <input className="password" type="password" onChange={handleChange} name="password"></input>
            <button className="login" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;