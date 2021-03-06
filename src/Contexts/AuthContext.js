import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { auth } from '../Firebase'

const AuthContext = React.createContext()
export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()

    function signup(email, password) {
        console.log(auth, "this");
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

function updateEmail(email)
{
    return currentUser.updateEmail(email)
}

function updatePassword(password)
{
    return currentUser.updatePassword(password)
}


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    const value = { currentUser, signup, login, logout, resetPassword,updateEmail,updatePassword }

    return (
        <div>
            <AuthContext.Provider value={value}>
                {children}
            </ AuthContext.Provider >

        </div>
    )
}
