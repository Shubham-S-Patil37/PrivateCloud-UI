import { FC, Dispatch, SetStateAction, ChangeEvent, useState } from 'react'
import "./sharePopUp.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import apiService from '../../../services/apiServices';

interface SharePopUpProps {
    // popUpRef: RefObject<HTMLDivElement>;
    setShowSharePopUp: Dispatch<SetStateAction<boolean>>;

}

const SharePopUp: FC<SharePopUpProps> = ({ setShowSharePopUp }) => {

    const [emailAddress, setEmailAddress] = useState("")

    const onPopClose = () => {
        setShowSharePopUp(false)
    }

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailAddress(e.target.value)
    }

    const onSubmit = () => {
        const fileId = localStorage.getItem("fileId")
        const email = emailAddress.trim()
        const userId = localStorage.getItem("userId")

        const data = {
            fileId: fileId,
            userEmailAddress: email,
            userId: userId
        }
        apiService.shareFile(data)
            .then((res) => {
                if (res.status)
                    alert("File shared with user")

            })
            .catch((err) => { console.log(err) })
        setShowSharePopUp(false)
    }

    return (
        <div className='share-parent' >
            <div className='share-main'>
                <div className='share-header'>
                    <div>
                        Share your File
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCircleXmark} className='close-btn' onClick={onPopClose} />
                    </div>

                </div>
                <form action="#" onSubmit={onSubmit} className='input-parent'>
                    <input className='share-input' type="email" placeholder="Type email address to search" onChange={onEmailChange} /> <br />
                    <button className='share-btn' type='submit'> Share</button>
                </form>

            </div>
        </div >
    )
}

export default SharePopUp;