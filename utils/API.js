import axios from 'axios'
export async function request(method, url, data, headers) {
    try {
        const response = await axios({
            method, url, data, headers
        })
        return response
    }

    catch (error) {
        console.log('error in API', error)
        return error
    }

}
