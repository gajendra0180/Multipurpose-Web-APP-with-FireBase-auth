

import { React, useRef, useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { useAuth } from './Contexts/AuthContext'
import { Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'


const UpdateProfile = () => {

    const [Email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const history = useHistory()
    function handleSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword)
            return setError('Passwords do not match')


        const promises = []
        setError('')
        setLoading(true)
        if (Email != currentUser.email) {
            promises.push(updateEmail(Email))
        }

        if (password) {
            promises.push(updatePassword(password))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch((err) => {
            setError('Failed to Update Account')
        }).finally(() => {
            setLoading(false)
        })

    }

    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }
    function handleChangePassword(event) {
        setPassword(event.target.value)
    }
    function handleChangeConfirmPassword(event) {
        setConfirmPassword(event.target.value)
    }


    return (
        <>
            {/* {currentUser && currentUser.email} */}
            {error && <Alert variant="danger">{error}</Alert>}
            <form action="" onSubmit={handleSubmit} style={{
                justifContent: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10vh",
            }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="">
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="">

                        </IconButton>
                    }
                    title="Welcome To the UpdateProfile Page"
                    subheader="Please update now"

                />
                <br />
                <br />
                <TextField
                    id="email"
                    autoFocus
                    type="email"
                    label="Enter Your Email"
                    variant="standard"
                    required
                    defaultValue={currentUser.email}
                    onChange={handleChangeEmail}
                    style={{ width: "30%" }}
                />
                <br />
                <TextField
                    type="password"
                    style={{ width: "30%" }}
                    id="password"
                    label="Enter Your Password"
                    onChange={handleChangePassword}
                    value={password}
                    placeholder="Leave blank to keep the same"
                    variant="standard"
                    helperText="Password must be of atleat 6 length"
                    // required
                />
                <br />
                <TextField
                    type="password"
                    style={{ width: "30%" }}
                    id="Confirm password"
                    label="Confirm Your Password"
                    onChange={handleChangeConfirmPassword}
                    value={confirmPassword}
                    variant="standard"
                    helperText="Password must be same as you typed above"
                // required
                />
                <br />
                <br />
                <Button disabled={loading} type="submit" color="secondary" variant="contained">Update</Button>
                <div>
                    <Link to="/">Cancel</Link>
                </div>
            </form>

        </>
    )
}

export default UpdateProfile
