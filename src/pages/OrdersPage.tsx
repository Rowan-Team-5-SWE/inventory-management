import { Layout } from 'antd'
import React from 'react'
import { NestedTable } from '../components/NestedTable'
import { PageTemplate } from '../components/PageTemplate'
const { Content } = Layout

export const OrdersPage = () => {
    return (
        <PageTemplate>
            <Content style={{ padding: '16px' }}>
                <NestedTable />
            </Content>
        </PageTemplate>
    )
}
