import React from 'react'

export default class extends React.Component {
	state = {
		isExpand: false
	}

	render() {
		const { props, state } = this

		const { item } = props
		const { isExpand } = state

		return (
			<div
                className = 'class-item-container'
			>
				<a
					href = '/#'
					onClick = {() => props.expandClassItemAtIndex()}
				>
					<div
						className = 'class-item-top-detail-container'
					>
						<h2>
							{item.class}
						</h2>
						
						<img
							alt = 'Expand button'
							src = {isExpand ? require('../resources/expand_less.png') : require('../resources/expand_more.png')}
                            height = {30}
                            width = {30}
						/>
					</div>
				</a>

				{
					isExpand ?
						<div
                            className = 'class-item-lessons-container'
						>
							{
								item.lessons.map((lessonItem, lessonIndex) => {
									return (
										<a
                                            className = 'class-item-lesson-item'
                                            href = '/#'
                                            key = {lessonItem.id}
                                            onClick = {() => props.showReadModalWithID(lessonItem.id)}
										>
											<p
												style = {{
													marginTop: lessonIndex === 0 ? 0 : 10
												}}
											>
												{lessonItem.name}
											</p>
										</a>
									)
								})
							}
						</div>
						:
						null
				}
			</div>
		)
    }
    
    setExpand(index) {
        const { props, state } = this

        const { isExpand } = state

        if(props.index !== index) {
            this.setState({isExpand: false})
        } else {
            this.setState({isExpand: !isExpand})
        }
    }
}