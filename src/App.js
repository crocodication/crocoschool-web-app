import React from 'react'

import Emoji from './components/Emoji'
import ClassItem from './components/ClassItem'
import ReadModal from './components/ReadModal'

import API from './refs/API'

export default class extends React.Component {
	state = {
		data: [],
		viewedLessonItem: null
	}

	componentDidMount() {
		this.loadData()
	}

	render() {
		const { state } = this

		const { data, viewedLessonItem } = state

		return (
			<div
				className = 'app-container'
			>
				{
					viewedLessonItem === null ?
						<>
							<h1
								className = 'app-title'
							>
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
											showReadModalWithItem = {this.showReadModalWithItem}
										/>
									)
								})
							}

							<a
								className = 'telegram-content-container'
								href = '/#'
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
						</>	
						:
						<ReadModal
							item = {viewedLessonItem}
							onDismiss = {() => this.setState({viewedLessonItem: null})}
						/>
				}
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

	showReadModalWithItem = viewedLessonItem => {
		this.setState({viewedLessonItem})
	}
}