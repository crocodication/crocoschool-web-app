import React from 'react'

export default class extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
    }

    render() {
        const { props } = this

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
                    {"< Dalam pengembangan artikel akan ada disini >"}
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
}