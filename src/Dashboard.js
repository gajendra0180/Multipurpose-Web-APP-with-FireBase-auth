import React, { useState } from 'react'
import { Card, Alert, Button } from 'react-bootstrap'
import { useAuth } from "./Contexts/AuthContext.js"
import { Link, useHistory } from 'react-router-dom'
import Navbar from "./Components/Navbar";
      
import Form from "./Components/Form";
const LOCAL_STORAGE_KEY = 'USERS_APP'




const Dashboard = () => {

    const [error, setError] = useState("")
    var { currentUser, logout } = useAuth()
    const history = useHistory()
      var users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (currentUser == undefined) {
      currentUser = users
    }


   


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
        <Navbar signedIn="true" name={currentUser.email}/>
            <Form />
            {/* <Card>
                <Card.Body>
                    <h2 className="text-center mb-4"></h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong>{currentUser.email}
                    <Link to="/updateProfile" className="btn btn-primary w-100 mt-3 ">Update Profile</Link>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>LogOut</Button>
                </div>
            </Card> */}
        </>
    )
}

export default Dashboard
