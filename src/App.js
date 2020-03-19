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
		data: require('./modules/data').data
	}

	componentDidMount() {
		this.loadData()
	}

	render() {
		const { state } = this

		const { data } = state

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

	expandClassItemAtIndex(index) {
		const { state } = this

		const { data } = state

		for(let i = 0; i < data.length; i++) {
			this['classItem' + i.toString()].setExpand(index)
		}
	}

	loadData() {
		if(this.state.data.length === 0) {
			API.Content()
			.then(res => res.json())
			.then(resJson => {
				this.setState({data: resJson.data})

				require('./modules/data').data = resJson.data
			})
			.catch(err => alert(err.toString()))
		}
	}
}