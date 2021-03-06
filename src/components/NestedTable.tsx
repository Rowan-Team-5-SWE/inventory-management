import { Table } from 'antd'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Firebase } from '../services/Firebase'
import { Order } from '../models/Order'
import { CartItem } from '../models/CartItem'
/* eslint-disable @typescript-eslint/no-explicit-any */

export const NestedTable = () => {
    const [user] = useAuthState(Firebase.auth())
    const email: string = user?.email || 'blank'
    const [orders] = useCollectionData<Order>(
        Firebase.firestore().collection('orders').where('user', '==', email),
        { idField: 'key' }
    )

    type ListSort = 'descend' | 'ascend' | null | undefined

    const [orderData] = useCollectionData<CartItem>(
        Firebase.firestore()
            .collectionGroup('orderItems')
            .where('user', '==', email)
    )

    console.log(orders)

    const expandedRowRender = (record: Order) => {
        const columns = [
            { title: 'Item', dataIndex: 'name', key: 'name' },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
            },
        ]

        return (
            <Table
                columns={columns}
                dataSource={orderData?.filter(
                    (item) => item.orderID === record.key
                )}
                pagination={false}
            />
        )
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'time',
            key: 'time',
            sorter: (a: Order, b: Order) => {
                return Date.parse(a.time) - Date.parse(b.time)
            },
            defaultSortOrder: 'descend' as ListSort,
        },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
    ]

    return (
        <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={orders}
        />
    )
}
