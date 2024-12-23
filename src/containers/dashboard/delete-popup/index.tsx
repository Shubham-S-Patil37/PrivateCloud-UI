import { Dispatch, SetStateAction, FC, useEffect, useRef } from 'react'

import "./deletePopUp.css"
import apiService from '../../../services/apiServices';
import { json } from 'react-router-dom';

interface DeletePopUpProps {
    // popUpRef: RefObject<HTMLDivElement>;
    setShowDeletePopUp: Dispatch<SetStateAction<boolean>>;

}

const DeletePopUp: FC<DeletePopUpProps> = ({ setShowDeletePopUp }) => {

    const popUpRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
    //             setShowDeletePopUp(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    const onDelete = async () => {
        setShowDeletePopUp(false);
        const fileId = localStorage.getItem("fileId")
        if (fileId) {
            const resp = await apiService.deletedFile(fileId)

            console.log(JSON.stringify(resp))
        }


    }

    return (
        <div className='delete-popup-parent'>
            <div>
                Do you want to delete ?
            </div>
            <div className='delete-btn-parent'>
                <button className='delete-popup-btn' onClick={() => setShowDeletePopUp(false)}>Cancel</button>
                <button className='delete-popup-btn' onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default DeletePopUp;