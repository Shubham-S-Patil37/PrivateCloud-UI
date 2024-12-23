import { useEffect, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import "./userFrom.css"
import defaultUser from "./../../assets/defaultUser.png"

import apiService from "../../services/apiServices"


// type FormData = {
//     name: string;
//     email: string;
//     mobileNumber: number;
// };

interface FormData {
    name: string;
    email: string;
    phone: string;
};

const UserForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [userDetails, setUserDetails] = useState<FormData>({ name: '', email: '', phone: '', })


    useEffect(() => {
        apiService.getUserDetail()
            .then((resp: any) => {


                if (resp.status) {
                    const userInfo = resp.data
                    setUserDetails(prevState => ({
                        ...prevState, name: userInfo.name, email: userInfo.email,
                        ...(userInfo.phone ? { phone: userInfo.phone } : {})
                    }));
                }
                console.log(resp)
            })
            .catch(error => {
                console.log("error in apiService.getUserDetail " + error)
            })
    }, []);

    const onSubmit = async (data: FormData) => {
        apiService.updateUser(userDetails)
            .then((resp: any) => { console.log(resp) })
            .catch(error => { console.log("error in apiService.updateUser " + error) })
    };


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({ ...prevState, [name]: value, }));
    }

    return (
        <div className='user-form-parent'>
            <div className='user-info'>
                <div className='user-profile-image'>
                    <img src={defaultUser} style={{ width: "100%", height: "100%" }} />
                </div>
                <div className='user-info-data'>
                    <div className='user-info-name'>
                        Shubham Patil
                    </div>
                    <div>
                        You've used 80% of your storage. Upgrade to avoid running out!
                    </div>
                </div>
            </div>
            <form className='user-detail-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <div style={{ width: "100%" }}>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input id="name" {...register("name", { required: "Name is required" })} className='user-form-input' placeholder='Name' value={userDetails.name} onChange={onChange} />
                    </div> <br /><br />

                    <div style={{ width: "100%" }}>
                        <label htmlFor="email">Email</label><br />
                        <input id="email" type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address", }
                            })}
                            placeholder='Email Address'
                            className='user-form-input'
                            value={userDetails.email}
                            onChange={onChange}
                        />
                        {/* {errors.email && <p>{errors.email.message}</p>} */}
                    </div> <br /><br />

                    <div style={{ width: "100%" }}>
                        <label htmlFor="mobileNumber">Mobile Number</label><br />
                        <input
                            id="phone"
                            type="text"
                            {...register("phone", {
                                required: "Mobile Number is required",
                            })}
                            placeholder="Mobile Number"
                            className="user-form-input"
                            value={userDetails.phone}
                            onChange={onChange}
                            onInput={(e: any) => {
                                const inputData: string = e.target.value.replace(/\D/g, '');
                                e.target.value = (inputData.length > 10) ? inputData.slice(0, 10) : inputData
                            }}
                        />
                        {/* {errors.mobileNumber && <p>{errors.mobileNumber.message}</p>} */}
                    </div> <br /><br />

                    {/* <div className='user-form-combine-field'>
                        <div>
                            <label htmlFor="email">Email</label><br />
                            <input id="email" type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address", }
                                })}
                                placeholder='Email Address'
                                className='user-form-input'
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label><br />
                            <input id="email" type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address", }
                                })}
                                placeholder='Email Address'
                                className='user-form-input'
                            />
                        </div>
                    </div> <br /><br /><br /> */}

                    <button type="submit" className='update-btn'>Update</button>
                    <br /><br />

                </div>
            </form>
        </div>
    );
};

export default UserForm;
