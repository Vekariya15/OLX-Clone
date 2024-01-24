import { Link,useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div>
            <div className="header">
                <Link to="/">Home</Link>
                <span className='mt-3'>SELL & PURCHASE ONLINE .. IN Your City</span>

                {!localStorage.getItem('token') ?
                 <Link to="/login">Login</Link> :
                  <button onClick={handleLogout}>LOGOUT</button>}
            </div>

        </div>
    )
}
export default Header;