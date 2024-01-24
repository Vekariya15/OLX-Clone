import Header from "./Header";
import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';



function Home(){
    const navigate = useNavigate()
    useEffect(()=>{
if(!localStorage.getItem('token')){
    navigate('/login')
}
    },[])
    return(
        <div>
            <Header/>   
            <Link to="/add-product">Add PRODUCT</Link>
            Welcome to home ....
        </div>
    )
}

export default Home;