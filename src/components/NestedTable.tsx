// eslint-disable-next-line
import { Table, Badge, Menu, Dropdown, Space } from 'antd'
// eslint-disable-next-line
import { DownOutlined } from '@ant-design/icons'
// eslint-disable-next-line
import React, { useState } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Firebase } from '../services/Firebase'
import { Order } from '../models/Order'
import { CartItem } from '../models/CartItem'

// type Props = {
//     items: Item[] | undefined
//     cartItems: CartItem[] | undefined
// }

// eslint-disable-next-line
const menu = (
    <Menu>
        <Menu.Item>Action 1</Menu.Item>
        <Menu.Item>Action 2</Menu.Item>
    </Menu>
)

export const NestedTable = () => {
    const [user] = useAuthState(Firebase.auth())
    const email: string = user?.email || 'blank'
    const [orders] = useCollectionData<Order>(
        Firebase.firestore().collection('orders').where('user', '==', email),
        { idField: 'orderID' }
    )
    const expandedRowRender = (record: Order) => {
        const columns = [
            { title: 'name', dataIndex: 'name', key: 'name' },
            {
                title: 'description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'quantity',
                dataIndex: 'quantity',
                key: 'quantity',
            },
        ]

        const [orderData] = Firebase.firestore().collection('orders').doc(record.orderID).get()
        )

        return (
            <Table
                columns={columns}
                dataSource={orderData}
                pagination={false}
            />
        )
    }

    const columns = [
        { title: 'user', dataIndex: 'user', key: 'user' },
        { title: 'time', dataIndex: 'time', key: 'time' },
        { title: 'address', dataIndex: 'address', key: 'address' },
        { title: 'completed', dataIndex: 'completed', key: 'completed' },
    ]

    // for (let i = 0; i < 3; ++i) {
    //     data.push({
    //         key: i,
    //         name: 'Screem',
    //         platform: 'iOS',
    //         version: '10.3.4.5654',
    //         upgradeNum: 500,
    //         creator: 'Jack',
    //         createdAt: '2014-12-24 23:12:00',
    //     })
    // }

    return (
        <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{ expandedRowRender: (record) => record.orderID }}
            dataSource={orders}
        />
    )
}
