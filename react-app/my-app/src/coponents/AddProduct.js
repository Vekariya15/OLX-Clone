import Header from "./Header";
import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';



function AddProduct() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            <Header />
            <h2>ADD PRODUCT HERE:</h2>
            <label>Product Name: </label>
            <input className="form-control" type="text" />
            <label>Product Description: </label>
            <input className="form-control" type="text" />
            <label>Product Prise: </label>
            <input className="form-control" type="text" />
            <label>Product Category: </label>
           <select>
            <option>Fruit</option>
            <option>Vegetabales</option>
            <option>Cotton</option>
            <option>Other</option>

           </select>
        </div>
    )
}

export default AddProduct;