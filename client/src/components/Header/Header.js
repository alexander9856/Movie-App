import { useLocation, useNavigate } from 'react-router'
import './Header.css'
export const Header = () => {
    const navigate = useNavigate();
    const urlPath = useLocation().pathname
    return (
        <nav>
            <ul>
                <li className={urlPath === '/' ? 'clicked' : ""} onClick={() => navigate('/')}>Movie Explorer</li>
                <li className={urlPath === '/picks' ? 'clicked' : ""} onClick={() => navigate('/picks')}>My Picks</li>
            </ul>
        </nav>
    )
}