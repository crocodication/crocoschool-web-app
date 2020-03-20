export const BASE_URL = 'https://crocoschoolstorage.000webhostapp.com'

export default {
    Content: () => fetching(BASE_URL + '/content.json')
}

function fetching(url) {
    return fetch(url + '?loadtime=' + (new Date()).getTime().toString())
}