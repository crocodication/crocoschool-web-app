const BASE_URL = 'https://crocoschool.000webhostapp.com'

export default {
    Content: () => fetch(BASE_URL + '/crocoschool-web-app-content.json')
}