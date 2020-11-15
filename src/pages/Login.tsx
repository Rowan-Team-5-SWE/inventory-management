import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { Firebase } from '../services/Firebase'

export const Login = () => {
    const [user] = useAuthState(Firebase.auth())

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
        // We will display Google and Facebook as auth providers.
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
            <button type="button" onClick={() => Firebase.auth().signOut()}>
                Sign Out{' '}
            </button>
        </div>
    )
}
