import { FC } from 'react'
import "./drive-menu.css"

interface DriveMenuProps {
    onClose: (menuItem: string) => void;
}

const DriveMenu: FC<DriveMenuProps> = ({ onClose }) => {

    const driveMenu: string[] = ["Share", "Download", "Delete"]
    return (
        <ul className='drive-menu-parent'>
            {
                driveMenu.map((ele: string) => <li className='drive-menu-item' onClick={() => onClose(ele)}>{ele}</li>)
            }
        </ul>
    )
}

export default DriveMenu;