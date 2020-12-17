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

    const releaseOrder = (order: Order) => {
        Firebase.firestore()
            .collection('orders')
            .doc(order.key)
            .set({ employee: '' }, { merge: true })
    }

    const expandedRowRender = (record: Order) => {
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
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
            {
                title: 'Checklist',
                dataindex: 'checklist',
                render: (_: any, cartItem: CartItem) => {
                    console.log(record)
                    let isWorkingOn: number
                    record?.employee == null
                        ? (isWorkingOn = -2)
                        : (isWorkingOn = record.employee.localeCompare(email))
                    return record?.status === 'completed' ? (
                        <></>
                    ) : isWorkingOn !== 0 ? (
                        <></>
                    ) : (
                        <Checkbox></Checkbox>
                    )
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
        { title: 'Customer', dataIndex: 'user', key: 'user' },
        {
            title: 'time',
            dataIndex: 'time',
            key: 'time',
            sorter: (a: Order, b: Order) => {
                return Date.parse(a.time) - Date.parse(b.time)
            },
            defaultSortOrder: 'ascend' as ListSort,
        },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
            title: 'Status',
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
            title: 'Employee',
            dataIndex: 'employee',
            key: 'employee',
        },
        {
            title: 'Action',
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
                        <a onClick={() => releaseOrder(order)}>
                            &nbsp; Release
                        </a>
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
            expandIconColumnIndex={5}
        />
    )
}
