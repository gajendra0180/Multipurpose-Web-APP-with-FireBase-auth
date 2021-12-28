import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './Contexts/AuthContext'
const LOCAL_STORAGE_KEY = 'USERS_APP'

export default function PrivateRoute({ component: Component, ...rest }
) {

	var { currentUser } = useAuth()
	var users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
	if (currentUser == undefined) {
		currentUser = users
	}

	if (currentUser != undefined && currentUser != users)
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentUser))

	return (
		<Route
			{...rest}
			render={props => {
				return currentUser ? <Component {...props} /> : <Redirect to="/login" />
			}}
		>
		</Route>
	)


}