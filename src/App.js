import React from 'react'
import Emoji from './components/Emoji'

export default class extends React.Component {
	render() {
		return (
			<div
				className = 'app-container'
			>
				<h1>
					CrocoSchool
				</h1>

				<p
					className = 'app-slogan'
				>
					Made with&nbsp;

					<Emoji
						label = '❤️'
					/>

					❤️selected skill share content media for everyone
				</p>
			</div>
		)
	}
}