import axios from 'axios'

export const HOSTNAME = 'http://localhost:4000'
export async function request(method, url, data, headers) {

    const response = await axios({
        method, url, data, headers
    })
    return response


}
