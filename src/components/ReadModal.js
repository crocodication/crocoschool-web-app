import React from 'react'

const ReactMarkdown = require('react-markdown/with-html')

export default class extends React.Component {
    state = {
        article: ''
    }

    componentDidMount() {
        this.loadArtcile()

        window.addEventListener('keydown', this.onKeyDown)
    }

    render() {
        const { props, state } = this

        const { article } = state

        return  (
            <div
                className = 'read-modal-main-container'
            >
                <div
                    className = 'read-modal-background'
                    onClick = {props.onDismiss}
                />

                <div
                    className = 'read-modal-content-container'
                >
                    <div
                        style = {{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <h3>
                            {props.item.name}
                        </h3>

                        <a
                            href = '/#'
                            onClick = {props.onDismiss}
                            className = 'read-modal-close-button'
                        >
                            X
                        </a>
                    </div>

                    <div
                        style = {{
                            alignItems: 'flex-start',
                            backgroundColor: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            marginTop: 20,
                            padding: 20
                        }}
                    >
                        <ReactMarkdown
                            source = {article}
                            skipHtml = {false}
                        />
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown = (event) => {
        if(event.keyCode === 27) {
            setTimeout(this.props.onDismiss, 100)
        }
    }

    async loadArtcile() {
        const { props } = this

        const { item } = props

        let loadIndex = await localStorage.getItem('loadIndex')

        if(loadIndex === null) {
            loadIndex = 0
        }

        await localStorage.setItem('loadIndex', Number(loadIndex) + 1)
         
        fetch(item.article.url + '?loadIndex=' + loadIndex.toString())
        .then(res => res.text())
        .then(resText => this.setState({article: resText}))
    }
}