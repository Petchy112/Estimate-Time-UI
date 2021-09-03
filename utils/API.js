import axios from 'axios'

export const HOSTNAME = 'https://estimate-time.herokuapp.com'
export async function request(method, url, data, headers) {

    const response = await axios({
        method, url, data, headers
    })
    return response


}
