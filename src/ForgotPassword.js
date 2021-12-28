import { React, useRef, useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { useAuth } from './Contexts/AuthContext'
import { Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
const ForgotPassword = () => {

    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
        const { resetPassword } = useAuth()
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false)
        const history = useHistory()

        async function handleSubmit(e) {
            e.preventDefault()

            try {
                setMessage("")
                setError('')
                setLoading(true)
                await resetPassword(name)
                setMessage('Check Your inbox for further instructions')
            }
            catch {
                setError('Failed to Reset Password')
            }
            setLoading(false)
        }

        function handleChangeName(event) {
            setName(event.target.value)
        }

        return (
            <>
                {/* {currentUser && currentUser.email} */}
                {error && <Alert variant="danger">{error}</Alert>}
                {message &&<Alert variant="success">{message}</Alert>}
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
                        title="Welcome To the Password Reset Page"
                        subheader="Please Enter Email to continue"
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
                    <Button disabled={loading} type="submit" color="secondary" variant="contained">Reset Password</Button>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                    <div>
                        Create an account?<Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </>
        )
    }

    export default ForgotPassword
