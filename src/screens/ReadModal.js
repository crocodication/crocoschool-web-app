import React from 'react'

import { Link } from 'react-router-dom'

import { BASE_URL } from '../refs/API'

export default class extends React.Component {
    state = {
        article: '',
        lesson: null
    }

    async componentDidMount() {
        this.loadArticle()
    }

    render() {
        const { state } = this

        const { article } = state

        return  (
            <>
                <div
                    className = 'read-modal-main-container'
                >
                    <Link
                        to = '/crocoschool-web-app/#'
                    >
                        <div
                            className = 'read-modal-background'
                        />
                    </Link>

                    <div
                        className = 'read-modal-content-container'
                    >   
                        <div
                            className = 'read-modal-content'
                            dangerouslySetInnerHTML = {{__html: article}}
                        />

                    <a
                        className = 'telegram-content-container'
                        href = '/crocoschool-web-app/#'
                        onClick = {() => {
                            let otherWindow = window.open()

                            otherWindow.opener = null

                            otherWindow.location = 'https://t.me/crocodication'
                        }}
                    >
                        <img
                            alt = 'telegram logo'
                            height = {30}
                            src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png'
                            width = {30}
                            rel = "noopener noreferrer"
                        />

                        <p
                            className = 'telegram-label'
                        >
                            Let's Discuss With Us On Telegram
                        </p>
                    </a>
                    </div>
                </div>
            </>
        )
    }

    async loadArticle() {
        const id = window.location.href.split('/')[window.location.href.split('/').length - 1]

        const recentArticlePage = await localStorage.getItem(id)

        if(recentArticlePage !== null) {
            await this.setState({article: recentArticlePage})
        }
        
        fetch(BASE_URL + '/html/' + id + '.html?loadtime=' + (new Date()).getTime().toString())
        .then(res => res.text())
        .then(async(resText) => {
            await localStorage.setItem(id, resText)

            this.setState({article: resText})
        })
    }
}