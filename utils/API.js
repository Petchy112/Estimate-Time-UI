import axios from 'axios'

export const HOSTNAME = 'https://estimate-time.herokuapp.com'//'http://localhost:4000'
export async function request(method, url, data, headers) {

    const response = await axios({
        method, url, data, headers
    })
    return response.data


}
