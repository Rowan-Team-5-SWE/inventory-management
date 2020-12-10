import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Firebase } from '../services/Firebase'

export const usePermissions = () => {
    const [user] = useAuthState(Firebase.auth())
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const email = user?.email

        if (email == null) {
            setLoggedIn(false)
        } else {
            setLoggedIn(true)
            Firebase.firestore()
                .collection('users')
                .doc(email)
                .get()
                .then((snapshot) => {
                    setIsAdmin(!!snapshot.data()?.admin)
                })
        }
    }, [user])

    return {
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
    }
}
