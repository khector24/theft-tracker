import '../styles/component-styles/header.css';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <div className="header">
            <div className='title'>
                <h3> Rainbow Incident Tracker</h3>
            </div>
            <div className='links'>
                <NavLink
                    to='/'
                    className={({ isActive }) => (isActive ? 'active-link' : undefined)}
                >
                    Home
                </NavLink>
                <NavLink
                    to='/reportsPage'
                    className={({ isActive }) => (isActive ? 'active-link' : undefined)}
                >
                    Reports
                </NavLink>

            </div>
        </div>
    );
}