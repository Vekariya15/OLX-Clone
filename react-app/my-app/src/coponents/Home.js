import axios from "axios";
import Header from "./Header";
import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react";


function Home() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])


    useEffect(() => {
        const url = 'http://localhost:4000/get-products';
        axios.get(url)
            .then((res) => {
                console.log(res);
                if (res.data.products) {
                    setProducts(res.data.products)
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Server err')
            })
    }, [])
    console.log(products);

    return ({

    }

export default Home;