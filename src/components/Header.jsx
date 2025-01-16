import '../styles/component-styles/header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="header">
            <p> Rainbow Incident Tracker</p>
            <Link to='/'><a>Home</a></Link>
            <Link to='/reportsPage'><a>Reports</a></Link>
        </div>
    );
}