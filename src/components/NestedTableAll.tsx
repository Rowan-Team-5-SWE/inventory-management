import { Table, Popconfirm, Checkbox } from 'antd'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Firebase } from '../services/Firebase'
import { Order } from '../models/Order'
import { CartItem } from '../models/CartItem'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */

export const NestedTableAll = () => {
    const [user] = useAuthState(Firebase.auth())
    const email: string = user?.email || ''
    const [orders] = useCollectionData<Order>(
        Firebase.firestore().collection('orders'),
        { idField: 'key' }
    )

    type ListSort = 'descend' | 'ascend' | null | undefined

    const [orderData] = useCollectionData<CartItem>(
        Firebase.firestore().collectionGroup('orderItems')
    )

    const claimOrder = (order: Order) => {
        console.log(order)
        Firebase.firestore()
            .collection('orders')
            .doc(order.key)
            .set({ employee: email }, { merge: true })
    }

    const finalizeOrder = (order: Order) => {
        Firebase.firestore()
            .collection('orders')
            .doc(order.key)
            .set({ status: 'completed' }, { merge: true })
    }

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
            {
                title: 'checklist',
                dataindex: 'checklist',
                render: (_: any, item: CartItem) => {
                    return <Checkbox></Checkbox>
                },
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
        { title: 'user', dataIndex: 'user', key: 'user' },
        {
            title: 'time',
            dataIndex: 'time',
            key: 'time',
            sorter: (a: Order, b: Order) => {
                return Date.parse(a.time) - Date.parse(b.time)
            },
            defaultSortOrder: 'ascend' as ListSort,
        },
        { title: 'address', dataIndex: 'address', key: 'address' },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Completed', value: 'completed' },
                { text: 'Pending', value: 'pending' },
            ],
            onFilter: (value: string | number | boolean, order: Order) =>
                order.status === value,
            sorter: (a: Order, b: Order) => {
                return a.status == null || b.status == null
                    ? 0
                    : a.status.localeCompare(b.status)
            },
            defaultSortOrder: 'descend' as ListSort,
            defaultFilteredValue: ['pending'],
        },
        {
            title: 'employee',
            dataIndex: 'employee',
            key: 'employee',
        },
        {
            title: 'action',
            dataIndex: 'action',
            render: (_: any, order: Order) => {
                let isWorkingOn: number
                order.employee == null
                    ? (isWorkingOn = -2)
                    : (isWorkingOn = order.employee.localeCompare(email))
                return order.status === 'completed' ? (
                    <div></div>
                ) : isWorkingOn !== 0 ? (
                    <span>
                        <a onClick={() => claimOrder(order)}> Work On</a>
                    </span>
                ) : (
                    <span>
                        <Popconfirm
                            title="Sure to finalize?"
                            onConfirm={() => finalizeOrder(order)}
                        >
                            <a>Finalize</a>
                        </Popconfirm>
                    </span>
                )
            },
        },
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
