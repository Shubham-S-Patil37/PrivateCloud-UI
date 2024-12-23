import { FC } from 'react'
import "./sidebar.css"


import { faUser, faGears, faCloudArrowUp, faTableCellsLarge, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import logo from "./../../assets/title-icon.svg"


interface sidebarProps {
    onMenuClicked: (menuItemName: string) => void;
}

const SideBar: FC<sidebarProps> = ({ onMenuClicked }) => {

    interface sidebarItems {
        icon: IconDefinition;
        title: string;
    }

    const sidebarMenu: sidebarItems[] = [
        { "icon": faTableCellsLarge, "title": "Dashboard" },
        { "icon": faUser, "title": "Profile" },
        { "icon": faCloudArrowUp, "title": "Upload" },
        { "icon": faBoxOpen, "title": "Your Drive" },
        { "icon": faGears, "title": "Setting" } //  change password, upgrade plan etc
    ]

    return (
        <div className='sidebar-parent'>
            <div className='log-parent'>
                <img src={logo} className='logo-icon' />
            </div>
            <ul className='sidebar-list'>
                {
                    sidebarMenu.map((item: sidebarItems) =>
                        <li className='list-item' onClick={() => onMenuClicked(item.title)}>
                            <div className='list-item-child'>
                                <div className='list-icon'> <FontAwesomeIcon icon={item.icon} /></div>
                                <div>{item.title}</div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default SideBar;