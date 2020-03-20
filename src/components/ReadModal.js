import React from 'react'

import { Link } from 'react-router-dom'

export default class extends React.Component {
    state = {
        article: '',
        lesson: null
    }

    async componentDidMount() {
        this.loadArtcile()
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
                        to = '/#'
                    >
                        <div
                            className = 'read-modal-background'
                        />
                    </Link>

                    <div
                        className = 'read-modal-content-container'
                    >   
                        <div
                            style = {{
                                alignItems: 'flex-start',
                                backgroundColor: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                padding: 20
                            }}   
                            dangerouslySetInnerHTML = {{__html: article}}
                        />
                    </div>
                </div>
            </>
        )
    }

    async loadArtcile() {
        const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
        
        fetch('https://crocoschool.000webhostapp.com/resources/html/' + id + '.html?loadtime=' + (new Date()).getTime().toString())
        .then(res => res.text())
        .then(resText => {
            this.setState({article: resText})
        })
    }
}