import axios from "axios";

const backendUrl = "http://localhost:8080"
const userId = localStorage.getItem("userId")?.toString();

export type IApiData = {
    "status": boolean,
    "message": string,
    "data": object
}

const apiService = {
    logIn: async function (logInDetails: any) {

        try {
            const response = await axios.post(`${backendUrl}/user/login`, logInDetails, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })

            if (response)
                return { "status": true, "data": response.data }

            return { "status": false, "message": "User name password not match" }
        }
        catch (error) {
            console.log(error)
            return { "status": false, "message": "User name password not match" }
        }
    },

    signUp: async function (signUpDetails: any) {

        try {
            const response = await axios.post(`${backendUrl}/user`, signUpDetails, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })

            if (response)
                return { "status": true, "data": response.data }

            return { "status": false, "message": "Unable to create user" }
        }
        catch (error) {
            console.log(error)
            return { "status": false, "message": "Unable to create file" }
        }
    },

    userFeed: async function () {
        try {

            const response = await axios.get(`${backendUrl}/user/userFeed/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response)
                return { "status": true, "data": response.data.data }

            return { "status": false, "message": "Unable to retrieve user feed" }
        }
        catch (error) {
            console.log(error)
            return { "status": false, "message": "Unable to retrieve user feed" }
        }
    },

    shareFile: async function (fileDetails: any) {

        try {
            const response = await axios.post(`${backendUrl}/file-upload/shareFile`, fileDetails, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })

            if (response)
                return { "status": true, "data": {} }

            return { "status": false, "message": "Unable to share user file" }
        }
        catch (error) {
            console.log(error)
            return { "status": false, "message": "Unable to share user file" }
        }
    },

    getUserFile: async function () {

        try {
            const response = await axios.get(`${backendUrl}/file-upload/userFile/${userId}`, {
                headers: { 'Content-Type': 'application/json', },
            })

            if (response)
                return { "status": true, "data": response.data.data }

            return { "status": false, "message": "Unable to retrieve user file" }
        }
        catch (error) {
            console.log(error)
            return { "status": false, "message": "Unable to retrieve user file" }
        }
    },

    uploadFile: async function (formData: FormData) {

        try {
            const response = await axios.post(`${backendUrl}/file-upload/${userId}`, formData, {
                headers: { 'Content-Type': 'application/json', },
            })

            if (response)
                return { "status": true, "data": response.data.data }

            return { "status": false, "message": "Unable to upload user file" }
        }
        catch (error) {
            console.log(error)
            return { "status": false, "message": "Unable to upload user file" }
        }
    },

    getUserDetail: async function () {

        try {
            const response = await axios.get(`${backendUrl}/user/${userId}`, {
                headers: { 'Content-Type': 'application/json', },
            })

            if (response)
                return { "status": true, "data": response.data.data }

            return { "status": false, "message": "Unable to get user details" }
        }
        catch (error) {
            console.log(error)
            return { "status": false, "message": "Unable to get user details" }
        }
    },

    updateUser: async function (userDetails: any) {

        try {
            const response = await axios.put(`${backendUrl}/user/${userId}`, userDetails, {
                headers: { 'Content-Type': 'application/json', },
            })

            if (response)
                return { "status": true, "data": response.data.data }

            return { "status": false, "message": "Unable to update user" }
        }
        catch (error) {
            console.log(error)
            return { "status": false, "message": "Unable to update user" }
        }
    },

    deletedFile: async function (fileId: string) {

        try {
            const response = await axios.delete(`${backendUrl}/file-upload/${userId}/${fileId}`, {
                headers: { 'Content-Type': 'application/json', },
            })

            if (response)
                return { "status": true, "data": response.data.data }

            return { "status": false, "message": "Unable to upload user file" }
        }
        catch (error) {
            console.log(error)
            return { "status": false, "message": "Unable to upload user file" }
        }
    },
}

export default apiService;