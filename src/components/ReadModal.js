import React from 'react'

import API from '../refs/API'

export default class extends React.Component {
    state = {
        article: '',
        lesson: null
    }

    async componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)

        if(require('../modules/data').data.length === 0) {
            await this.loadData()
        }

        const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
        
        let pickedLesson = null
        
        for(let data of require('../modules/data').data) {
            for(let lesson of data.lessons) {
                if(lesson.id === id) {
                    pickedLesson = lesson
    
                    break
                }
            }
        }
        if(pickedLesson === null) {
            alert('Not Found')
        } else {
            await this.setState({lesson: pickedLesson})
        
            this.loadArtcile()
        }
    }

    render() {
        const { state } = this

        const { article, lesson } = state

        return  (
            <>
                <div
                    className = 'read-modal-main-container'
                >
                    <a
                        className = 'read-modal-background'
                        href = '/#'
                    >
                    </a>

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
                                {lesson ? lesson.name : ''}
                            </h3>

                            <a
                                href = '/#'
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
                            dangerouslySetInnerHTML = {{__html: article}}
                        />
                    </div>
                </div>
            </>
        )
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown = (event) => {
        if(event.keyCode === 27) {
            setTimeout(window.open('/#'), 100)
        }
    }

    async loadArtcile() {
        fetch(this.state.lesson.article.url + '?loadtime=' + (new Date()).getTime().toString())
        .then(res => res.text())
        .then(resText => {
            this.setState({article: resText})
        })
    }

    async loadData() {
        await API.Content()
        .then(res => res.json())
        .then(resJson => require('../modules/data').data = resJson.data)
        .catch(err => alert(err.toString()))
    }
}