import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Item } from '../models/Item'
import { Firebase } from '../services/Firebase'
import { EditableTable } from '../components/EditableTable'
import { usePermissions } from '../hooks/usePermissions'
import { Layout } from 'antd'
import { AddItemForm } from '../components/AddItemAntD'
import { PageTemplate } from '../components/PageTemplate'
const { Content, Sider } = Layout

export const InventoryPage = () => {
    const { isAdmin } = usePermissions()

    const [items] = useCollectionData<Item>(
        Firebase.firestore().collection('items'),
        { idField: 'key' }
    )

    return (
        <PageTemplate>
            {isAdmin && (
                <Sider theme="light" style={{ padding: '16px' }}>
                    <AddItemForm />
                </Sider>
            )}
            <Content style={{ padding: '16px' }}>
                <EditableTable items={items} />
            </Content>
        </PageTemplate>
    )
}
