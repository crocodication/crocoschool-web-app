const BASE_URL = 'https://crocoschool.000webhostapp.com'

export default {
    Content: () => fetching(BASE_URL + '/crocoschool-web-app-content.json')
}

async function fetching(url) {
    let loadIndex = await localStorage.getItem('loadIndex')

    if(loadIndex === null) {
        loadIndex = 0
    }

    await localStorage.setItem('loadIndex', Number(loadIndex) + 1)

    return fetch(url + '?loadindex=' + loadIndex.toString())
}