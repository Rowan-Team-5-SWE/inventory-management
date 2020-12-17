import { Layout } from 'antd'
import React from 'react'
import { HeaderBar } from './HeaderBar'

export const PageTemplate = (props: { children: React.ReactNode }) => {
    return (
        <Layout style={{ width: '100vw', height: '100vh', minWidth: '800px' }}>
            <HeaderBar />
            <Layout style={{ width: '100%', height: '100%' }}>
                {props.children}
            </Layout>
        </Layout>
    )
}
