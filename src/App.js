import React from 'react'

import Emoji from './components/Emoji'
import ClassItem from './components/ClassItem'

import API from './refs/API'

export default class extends React.Component {
	state = {
		data: []
	}

	componentDidMount() {
		this.loadData()
	}

	render() {
		const { state } = this

		const { data } = state

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

				{
					data.map((item, index) => {
						return (
							<ClassItem
								expandClassItemAtIndex = {() => this.expandClassItemAtIndex(index)}
								index = {index}
								item = {item}
								key = {item.class}
								ref = {ref => this['classItem' + index.toString()] = ref}
							/>
						)
					})
				}

				<a
					className = 'telegram-content-container'
					href = 'https://t.me/crocodication'
					target = '_blank'
				>
					<img
						src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png'
						height = {30}
						width = {30}
					/>

					<p
						className = 'telegram-label'
					>
						Let's Discuss With Us On Telegram
					</p>
				</a>
			</div>
		)
	}

	expandClassItemAtIndex(index) {
		const { state } = this

		const { data } = state

		for(let i = 0; i < data.length; i++) {
			this['classItem' + i.toString()].setExpand(index)
		}
	}

	loadData() {
		API.Content()
		.then(res => res.json())
		.then(resJson => this.setState({data: resJson.data}))
		.catch(err => alert(err.toString()))
	}
}