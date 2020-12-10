import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { Firebase } from '../services/Firebase'

export const Login = () => {
    const [user] = useAuthState(Firebase.auth())

    useEffect(() => {
        if (user?.email == null) return

        const email = user.email

        Firebase.firestore()
            .collection('users')
            .doc(email)
            .set(
                {
                    admin: email?.split('@')[1].includes('rowan'),
                },
                {
                    merge: true,
                }
            )
    }, [user])

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',

        // We will display Google as auth provider.
        signInOptions: [Firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    }

    return (
        <div>
            {user?.email}
            {!user && (
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={Firebase.auth()}
                />
            )}
        </div>
    )
}
