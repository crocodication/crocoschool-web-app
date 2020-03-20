import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import Emoji from './components/Emoji'
import ClassItem from './components/ClassItem'
import ReadModal from './components/ReadModal'

import API from './refs/API'

export default class extends React.Component {
	render() {
		return (
			<div
				className = "app-container"
			>
				<Switch>
					<Route
						exact
						path = '/'
						component = {Home}
					/>

					<Route
						path = {`/:id(\\d+)`}
						component = {ReadModal}
					/>

					<Redirect
						to = "/#"
					/>
				</Switch>
			</div>
		)
	}
}

class Home extends React.Component {
	state = {
		data: require('./modules/data').data,
		selectedClassIndex: null
	}

	componentDidMount() {
		this.loadData()
	}

	render() {
		const { state } = this

		const { data, selectedClassIndex } = state

		return (
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
								isExpand = {index.toString() === (selectedClassIndex !== null ? selectedClassIndex.toString() : "")}
								key = {item.class}
								ref = {ref => this['classItem' + index.toString()] = ref}
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
		)
	}

	async expandClassItemAtIndex(index) {
		let selectedClassIndex = await localStorage.getItem('selectedClassIndex')

		if(selectedClassIndex === null) {
			selectedClassIndex = index

			await localStorage.setItem('selectedClassIndex', index)
		} else {
			selectedClassIndex = null

			await localStorage.removeItem('selectedClassIndex')
		}
		
		this.setState({selectedClassIndex})
	}

	async loadData() {
		let recentData = await localStorage.getItem('data')

		const selectedClassIndex = await localStorage.getItem('selectedClassIndex')

		if(recentData !== null) {
			await this.setState({data: JSON.parse(recentData)})
		}

		await this.setState({selectedClassIndex})

		if(this.state.data.length === 0) {
			API.Content()
			.then(res => res.json())
			.then(async(resJson) => {
				const data = resJson.data

				await localStorage.setItem('data', JSON.stringify(data))

				this.setState({data})
			})
			.catch(err => alert(err.toString()))
		}
	}
}