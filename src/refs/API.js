export const BASE_URL = 'https://raw.githubusercontent.com/crocodication/crocoschool-web-app/content'

export default {
    Content: () => fetching(BASE_URL + '/list.json')
}

function fetching(url) {
    return fetch(url + '?loadtime=' + (new Date()).getTime().toString())
}