import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import Home from './screens/Home'
import ReadModal from './screens/ReadModal'

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