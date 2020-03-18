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