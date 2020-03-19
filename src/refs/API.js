const BASE_URL = 'https://crocoschool.000webhostapp.com'

export default {
    Content: () => fetching(BASE_URL + '/crocoschool-web-app-content.json')
}

function fetching(url) {
    return fetch(url + '?loadtime=' + (new Date()).getTime().toString())
}