import { Table, Typography } from 'antd'
import React from 'react'
import { Item } from '../models/Item'
import Column from 'antd/lib/table/Column'
import { Firebase } from '../services/Firebase'

type Props = {
    items: Item[] | undefined
    loading: boolean
}

export const ItemTable = ({ items, loading }: Props) => {
    const incrementStock = (id: string) => {
        const db = Firebase.firestore()
        const increment = Firebase.firestore.FieldValue.increment(1)
        const itemRef = db.collection('items').doc(id)
        itemRef.update({ stock: increment })
    }

    const decrementStock = (id: string) => {
        const db = Firebase.firestore()
        const increment = Firebase.firestore.FieldValue.increment(-1)
        const itemRef = db.collection('items').doc(id)
        itemRef.update({ stock: increment })
    }

    return (
        <Table
            tableLayout="auto"
            rowKey={(item) => `${item.id}`}
            dataSource={items}
            loading={loading}
            bordered={true}
            pagination={{ pageSize: 20, hideOnSinglePage: true }}
            scroll={{ x: 'calc(700px + 50%)', y: '800px' }}
        >
            <Column title="Name" dataIndex="name" />
            <Column title="Price" dataIndex="price" />
            <Column title="Cost" dataIndex="cost" />

            <Column
                title="Stock"
                dataIndex="stock"
                render={(val: any, item: Item, index: number) => (
                    <Typography.Paragraph>{item.stock}</Typography.Paragraph>
                )}
            />

            <Column title="UPC" dataIndex="UPC" />
            <Column title="Description" dataIndex="description" />
        </Table>
    )
}
