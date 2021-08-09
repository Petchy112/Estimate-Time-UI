import axios from 'axios'
export async function request(method, url, data) {
    try {
        const response = await axios({
            method, url, data
        })
        console.log('res API', response)
        return response
    }

    catch (error) {
        console.log('e', error.response)
        return error.response
    }

}
