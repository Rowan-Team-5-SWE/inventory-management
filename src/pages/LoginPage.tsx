import { InboxOutlined } from '@ant-design/icons'
import { Layout, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { useHistory } from 'react-router-dom'
import { Firebase } from '../services/Firebase'

export const LoginPage = () => {
    const [user] = useAuthState(Firebase.auth())

    const history = useHistory()

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

    useEffect(() => {
        if (user != null) {
            history.push('/inventory')
        }
    })

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',

        // We will display Google as auth provider.
        signInOptions: [Firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    }

    return (
        <Layout
            style={{
                width: '100vw',
                height: '100vh',
                minWidth: '800px',
            }}
        >
            <Layout.Content>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '300px',
                            margin: 'auto',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '3px 3px 3px #ddd',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            top: '-50px',
                        }}
                    >
                        <InboxOutlined style={{ fontSize: '144px' }} />
                        <Typography.Title>StoreIt</Typography.Title>
                        <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={Firebase.auth()}
                        />
                    </div>
                </div>
            </Layout.Content>
        </Layout>
    )
}
