import { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import "./fileInfo.css"

interface FileInfoProps {
    fileName: string;
    fileSize: string;
}

const FileInfo: FC<FileInfoProps> = ({ fileName, fileSize }) => {

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsActive(true);
        }, 20);

    }, []);

    return (
        <div className={`file-info-main ${isActive ? 'active' : ''}`}>
            <div>
                {fileName}
            </div>

            <div className='footer-bar '>
                <div>
                    <FontAwesomeIcon icon={faCircleCheck} className='upload-complete-check' /> Uploaded
                </div>

                {fileSize} MB
            </div>
        </div>
    )
}

export default FileInfo;