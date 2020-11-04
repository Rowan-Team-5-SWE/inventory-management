/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import { Item } from '../models/Item'
import { CartItem } from '../models/CartItem'
import { Table } from 'antd'

type Props = {
    items: Item[] | undefined
    cartItems: CartItem[] | undefined
}

export const CartComponent = (props: Props) => {
    function changeFunction(cartItem: CartItem) {
        console.log(props.items)
        console.log(props.cartItems)
        const matchingItem = props.items?.find(
            (item) => item.id === cartItem.itemID
        )

        cartItem.name = matchingItem?.name ?? 'no data'
        cartItem.price = matchingItem?.price ?? -1
        cartItem.description = matchingItem?.description ?? 'no data'
    }
    // function find(item: Item, id: string) {
    //     return (item.id = id)
    // }

    props.cartItems?.forEach((CartItem) => changeFunction(CartItem))
    const columns = [
        {
            title: 'itemID',
            dataIndex: 'itemID',
        },
        {
            title: 'qty',
            dataIndex: 'quantity',
        },
        {
            title: 'name',
            dataIndex: 'name',
            editable: true,
            inputType: 'string',
        },
        {
            title: 'price',
            dataIndex: 'price',
            editable: true,
            inputType: 'number',
        },
        {
            title: 'description',
            dataIndex: 'description',
            editable: true,
            inputType: 'string',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
        },
    ]

    return <Table columns={columns} dataSource={props.cartItems}></Table>
}
