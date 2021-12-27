import { React, useRef, useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { useAuth } from './Contexts/AuthContext'
import { Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
const Login = () => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(name, password)
            history.push("/")
        }
        catch {
            setError('Failed to login')
        }
        setLoading(false)
    }

    function handleChangeName(event) {
        setName(event.target.value)
    }
    function handleChangePassword(event) {
        setPassword(event.target.value)
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
                    title="Welcome To the Login Page"
                    subheader="Please Login to continue"

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
                <br />
                <Button disabled={loading} type="submit" color="secondary" variant="contained">Login</Button>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgotPassword">Forgot Password?</Link>
                </div>
                <div>
                    Create an account?<Link to="/signup">Sign Up</Link>
                </div>

            </form>

        </>
    )
}

export default Login
