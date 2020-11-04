/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import { Item } from '../models/Item'
import { CartItem } from '../models/CartItem'
import { Table } from 'antd'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Firebase } from '../services/Firebase'

type Props = {
    items: Item[] | undefined
    cartItems: CartItem[] | undefined
}

export const CartComponent = (props: Props) => {
    const [user] = useAuthState(Firebase.auth())
    const email: string = user?.email || 'blank'

    function changeFunction(cartItem: CartItem) {
        console.log(props.items)
        console.log(props.cartItems)
        const matchingItem = props.items?.find(
            (item) => item.id === cartItem.itemID
        )

        cartItem.name = matchingItem?.name ?? 'Item does not exist'
        cartItem.price = matchingItem?.price ?? -1
        cartItem.description =
            matchingItem?.description ?? 'Please remove from cart'
    }
    // function find(item: Item, id: string) {
    //     return (item.id = id)
    // }

    function deleteItem(cartItem: CartItem) {
        Firebase.firestore()
            .collection('cart')
            .doc(email)
            .collection('cartItems')
            .doc(cartItem.itemID)
            .delete()
    }

    props.cartItems?.forEach((CartItem) => changeFunction(CartItem))
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            editable: true,
            inputType: 'string',
        },
        {
            title: 'qty',
            dataIndex: 'quantity',
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
            render: (_: any, cartItem: CartItem) => {
                return (
                    <a
                        onClick={() => {
                            deleteItem(cartItem)
                        }}
                    >
                        Delete
                    </a>
                )
            },
        },
    ]

    return <Table columns={columns} dataSource={props.cartItems}></Table>
}
