import Header from "./Header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleApi = () => {
        console.log({ username, password });
        const url = 'http://localhost:4000/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                console.log(res.data)
                if (res.data.message) {
                    alert(res.data.message)
                    if (res.data.message) {
                        localStorage.setItem('token', res.data.token)
                        navigate('/');
                    }

                }
            })
            .catch((err) => {
                console.log(err)
                alert("SERVER ERR")
            })
    }



    return (
        <div>
            <Header />
            Welcome to login ....<br></br>
            USERNAME
            <input type="text" value={username} onChange={(e) => {
                setUsername(e.target.value)
            }} /><br></br>
            PASSWORD
            <input type="text" value={password} onChange={(e) => {
                setPassword(e.target.value)
            }} /><br></br>
            <button onClick={handleApi}>Login</button>
            <Link to="/signup">signup</Link>
        </div>
    )
}

export default Login;