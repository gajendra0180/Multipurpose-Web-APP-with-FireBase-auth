import React, { useState } from 'react'
import { Card,Alert,Button } from 'react-bootstrap'
import { useAuth } from "./Contexts/AuthContext.js"
import { Link, useHistory } from 'react-router-dom'

const Dashboard = () => {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

   async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push("/login")
        }
        catch
        {
            setError('Failed to logout')
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4"></h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong>{currentUser.email}
                    <Link to="/updateProfile" className="btn btn-primary w-100 mt-3 ">Update Profile</Link>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>LogOut</Button>
                </div>
            </Card>
        </>
    )
}

export default Dashboard
