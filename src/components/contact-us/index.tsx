import { useState } from 'react'
import "./contact-us.css"

const ContactUS = () => {

    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [msg, setMsg] = useState("");
    const [mbNo, setMbNo] = useState("");

    const onSubmit = (event: any) => {
        event.preventDefault();
        const data = {
            "userName": name,
            "receiverEmail": emailAddress,
            "userContactNumber": mbNo,
            "message": msg
        }
        // apiService.sendEmail(data)

        setName("")
        setEmailAddress("")
        setMsg("")
        setMbNo("")
    }

    const onMobileNumberChange = (event: any) => {
        const value = event.target.value
        if (!isNaN(Number(value)))
            setMbNo(value)
    }

    return (
        <div className='contact-us'>
            <div className='contact-us-parent'>
                <div className='section1'></div>
                <div className='section2'>
                    <form className='form-parent'>
                        <label className='title-lab' >Contact Us</label> <br />
                        <input className='input-field' type="text" name="name" placeholder="Name" required value={name} onChange={(e) => { setName(e.target.value) }} /><br />
                        <input className='input-field' type="email" name="email" placeholder="Email Address" required value={emailAddress} onChange={(e) => { setEmailAddress(e.target.value) }} /><br />
                        <input className='input-field' type="tel" name="tel" placeholder="Mobile Number" required value={mbNo} onChange={onMobileNumberChange} maxLength={10} /><br />
                        <textarea className='input-field input-field-text-area' name="message" placeholder="Message" required value={msg} onChange={(e) => { setMsg(e.target.value) }}></textarea><br />
                        <button className='submit-btn' type="submit" value="Submit" > Send Message </button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ContactUS;