import Header from "./Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleApi = () => {
        console.log({ username, password });
        const url = 'http://localhost:4000/signup';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                console.log(res.data)
                if (res.data.message) {
                    alert(res.data.message)
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
            Welcome to signup page ....<br></br>
            USERNAME
            <input type="text" value={username} onChange={(e) => {
                setUsername(e.target.value)
            }} /><br></br>

            PASSWORD
            <input type="text" value={password} onChange={(e) => {
                setPassword(e.target.value)
            }} /><br></br>
            <button onClick={handleApi}>Signup</button>
            <Link to="/login">login</Link>
        </div>
    )
}

export default Signup;