import { useState, FC } from 'react'
import MobileNav from '../mobile-nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCloudflare } from '@fortawesome/free-brands-svg-icons';


import "./nav.css"

interface navProp {
    onClickNavItem: (menuItemName: string) => void
}

const Nav: FC<navProp> = ({ onClickNavItem }) => {

    const [open, setOpen] = useState(false);

    const menuItems = ["Home", "About", "Pricing", "Contact Us", "Log in"]

    const mobileMenuClick = () => { setOpen(!open) }

    return (
        <div className='nav-parent'>

            <div className='logo-parent'>
                <FontAwesomeIcon icon={faCloudflare} className='nav-logo' />
                <div style={{ cursor: "pointer" }}>Your Cloud</div>
            </div>
            <div className="nav-item-parent">
                <ul className='nav-ul'>
                    {
                        menuItems.map(ele => <li className='nav-item' onClick={() => onClickNavItem(ele)}>{ele}</li>)
                    }
                </ul>
            </div>

            <div>
                <div className='mobile-parent'>
                    <FontAwesomeIcon icon={faBars} className='mobile-parent-icon' onClick={mobileMenuClick} />
                </div>
                <div>
                    <MobileNav navItem={menuItems} isOpen={open} onClickNavItem={onClickNavItem} />
                </div>
            </div>
        </div>
    )
}

export default Nav;