import React from 'react'

import { Link } from 'react-router-dom'

export default class extends React.Component {
	state = {
		isExpand: false
	}

	render() {
		const { props } = this

		const { isExpand, item } = props

		return (
			<div
                className = 'class-item-container'
			>
				<a
					href = '/crocoschool-web-app/#'
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
										<Link
											className = 'class-item-lesson-item'
                                            key = {lessonItem.id}
											to = {'/crocoschool-web-app/' + lessonItem.id}
										>
											<p
												style = {{
													marginTop: lessonIndex === 0 ? 0 : 10
												}}
											>
												{lessonItem.name}
											</p>
										</Link>
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
}