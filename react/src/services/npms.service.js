import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'
const baseUrl = 'https://api.npms.io/v2';

const cache = setupCache({
    maxAge: 15 * 60 * 1000
})
  
const api = axios.create({
    adapter: cache.adapter
})


export default {
    getSuggestions(query){
        query = query.split(' ').join('+');
        // return axios.get(`${baseUrl}/search/suggestions?q=${query}`)
        return api({
            url: `${baseUrl}/search/suggestions?q=${query}`,
            method: 'get'
        })
    },
    
    getPackageDetail(pkg){
        // return axios.get(`${baseUrl}/package/${pkg}`)
        return api({
            url: `${baseUrl}/package/${pkg}`,
            method: 'get'
        })
    }
}