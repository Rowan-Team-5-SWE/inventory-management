import { Layout, Menu, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router-dom'
import { usePermissions } from '../hooks/usePermissions'
import { Firebase } from '../services/Firebase'
const { Header } = Layout

export const HeaderBar = () => {
    const history = useHistory()
    const { isLoggedIn, isAdmin } = usePermissions()
    const [user] = useAuthState(Firebase.auth())

    useEffect(() => {
        if (user == null) {
            history.push('/login')
        }
    })

    const logout = () => {
        Firebase.auth().signOut()
    }

    return (
        <Header>
            <Row justify="space-between">
                <Typography.Title
                    style={{ position: 'relative', top: '7px', color: 'white' }}
                >
                    StoreIt
                </Typography.Title>

                <Menu theme="dark" mode="horizontal" style={{ height: '100%' }}>
                    <Menu.Item
                        onClick={() => {
                            history.push('/inventory')
                        }}
                        key="1"
                    >
                        Inventory
                    </Menu.Item>
                    {!isAdmin && (
                        <Menu.Item
                            onClick={() => {
                                history.push('/cart')
                            }}
                            key="2"
                        >
                            Cart
                        </Menu.Item>
                    )}
                    {!isAdmin && (
                        <Menu.Item
                            onClick={() => {
                                history.push('/orders')
                            }}
                            key="7"
                        >
                            Orders
                        </Menu.Item>
                    )}

                    {isAdmin && (
                        <Menu.Item
                            onClick={() => {
                                history.push('/fulfillment')
                            }}
                            key="8"
                        >
                            Fulfillment
                        </Menu.Item>
                    )}
                    {!isLoggedIn && (
                        <Menu.Item
                            onClick={() => {
                                history.push('/login')
                            }}
                            key="6"
                        >
                            Log In
                        </Menu.Item>
                    )}
                    {isLoggedIn && <Menu.Item key="4">{user?.email}</Menu.Item>}
                    {isLoggedIn && (
                        <Menu.Item onClick={logout} key="5">
                            Log Out
                        </Menu.Item>
                    )}
                </Menu>
            </Row>
        </Header>
    )
}
