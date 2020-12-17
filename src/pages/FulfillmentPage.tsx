import { Layout } from 'antd'
import React from 'react'
import { NestedTableAll } from '../components/NestedTableAll'
import { PageTemplate } from '../components/PageTemplate'
const { Content } = Layout

export const FulfillmentPage = () => {
    return (
        <PageTemplate>
            <Content style={{ padding: '16px' }}>
                <NestedTableAll />
            </Content>
        </PageTemplate>
    )
}
