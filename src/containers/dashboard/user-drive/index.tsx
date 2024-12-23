import { FC, useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'

import "./userDrive.css"

import { faEllipsisVertical, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DriveMenu from './deive-menu';
import SharePopUp from '../share-popup';

interface userDriveProps {
    fileId: string;
    fileName: string;
    fileSize: string;
    setShowSharePopUp: Dispatch<SetStateAction<boolean>>;
    setShowDeletePopUp: Dispatch<SetStateAction<boolean>>;
}

const UserDrive: FC<userDriveProps> = ({ fileId, fileName, fileSize, setShowSharePopUp, setShowDeletePopUp }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [displayFileName, setDisplayFileName] = useState("")
    const [fileExt, setFileExt] = useState("")

    const onMenuClick = (menuClicked: string) => {

        localStorage.setItem("fileId", fileId)
        if (menuClicked == "Share")
            setShowSharePopUp(true)
        else if (menuClicked == "Delete")
            setShowDeletePopUp(true)

        setIsMenuOpen(false);
    };

    // console.log(fileName.split("."))
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };



    }, []);

    useEffect(() => {
        const fileExtVar = fileName.split(".")

        const fileExt_Var = fileExtVar[fileExtVar.length - 1]
        setFileExt(fileExt_Var)

        if (fileName && fileName.length > 12)
            setDisplayFileName(fileName.substring(0, 12) + "..." + fileExt_Var)
        else
            setDisplayFileName(fileName)
    }, []);

    return (
        <div className='drive-parent'>
            <div ref={menuRef} className={isMenuOpen ? "user-drive-item" : "display-none"}>
                <DriveMenu onClose={onMenuClick} />
            </div>
            <div className='drive-section-1'>
                <div className='drive-ext-icon-parent'>
                    <FontAwesomeIcon icon={faFile} className='file-icon' />

                    <div className='file-ext'>{fileExt}</div>
                </div>
            </div>

            <div className='drive-section-2'>
                <div className='drive-space-used'>
                    {displayFileName}
                </div>
                <div className='drive-space-used'>
                    File size : {fileSize} MB
                </div>
            </div>
            <div className='drive-section-3'>
                <FontAwesomeIcon icon={faEllipsisVertical} className='drive-menu-icon' onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
        </div>
    )
}

export default UserDrive;