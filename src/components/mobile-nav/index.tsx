import { useState, FC } from 'react'
import "./mobile-nav.css"

interface navProp {
    navItem: string[];
    isOpen: boolean;
    onClickNavItem: (menuItemName: string) => void
}

const MobileNav: FC<navProp> = ({ navItem, isOpen, onClickNavItem }) => {

    return (
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
            <ul className="mobile-menu-item-parent">
                {
                    navItem.map((item: string) =>
                        <li onClick={() => onClickNavItem(item)}>{item}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default MobileNav;