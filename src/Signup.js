import { React, useRef, useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { useAuth } from './Contexts/AuthContext'
import { Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'


const Signup = () => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword)
            return setError('Passwords do not match')
        try {
            setError('')
            setLoading(true)
            console.log(signup);
            await signup(name, password)
            history.push("/login")
        }
        catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    function handleChangeName(event) {
        setName(event.target.value)
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
                    title="Welcome To the Signup Page"
                    subheader="Please SignUp to continue"

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
                    onChange={handleChangeName}
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
                    variant="standard"
                    helperText="Password must be of atleat 6 length"
                    required
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
                    required
                />
                <br />
                <br />
                <Button disabled={loading} type="submit" color="secondary" variant="contained">Submit</Button>
                <div>
                    Already Have an account?<Link to="/login">Login</Link>
                </div>
            </form>

        </>
    )
}

export default Signup
