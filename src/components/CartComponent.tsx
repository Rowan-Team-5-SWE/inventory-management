/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import Modal from 'react-modal'
import { Item } from '../models/Item'
import { CartItem } from '../models/CartItem'
import { Table, Input } from 'antd'
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
        const matchingItem = props.items?.find(
            (item) => item.id === cartItem.itemID
        )

        cartItem.name = matchingItem?.name ?? 'Item does not exist'
        cartItem.price = matchingItem?.price ?? -1
        cartItem.description =
            matchingItem?.description ?? 'Please remove from cart'
        cartItem.stock = matchingItem?.stock ?? -1
        if (cartItem.stock < cartItem.quantity) {
            cartItem.quantity = cartItem.stock
        }
        if (cartItem.stock < 0) {
            deleteItem(cartItem)
        }
    }

    function deleteItem(cartItem: CartItem) {
        Firebase.firestore()
            .collection('cart')
            .doc(email)
            .collection('cartItems')
            .doc(cartItem.itemID)
            .delete()
    }

    function quantityPlus(cartItem: CartItem) {
        if (cartItem.quantity < cartItem.stock) {
            Firebase.firestore()
                .collection('cart')
                .doc(email)
                .collection('cartItems')
                .doc(cartItem.itemID)
                .update({ quantity: ++cartItem.quantity })
        }
    }

    function quantityMinus(cartItem: CartItem) {
        if (cartItem.quantity > 1) {
            Firebase.firestore()
                .collection('cart')
                .doc(email)
                .collection('cartItems')
                .doc(cartItem.itemID)
                .update({ quantity: --cartItem.quantity })
        }
    }

    props.cartItems?.forEach((CartItem) => changeFunction(CartItem))
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            title: 'qty',
            dataIndex: 'quantity',
        },

        {
            title: 'price',
            dataIndex: 'price',
        },
        {
            title: 'description',
            dataIndex: 'description',
        },
        {
            title: 'delete',
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
        {
            title: 'change qty',
            dataIndex: 'operation',
            render: (_: any, cartItem: CartItem) => {
                return (
                    <div>
                        <a
                            onClick={() => {
                                quantityPlus(cartItem)
                            }}
                        >
                            Increase
                        </a>
                        <a
                            onClick={() => {
                                quantityMinus(cartItem)
                            }}
                        >
                            &nbsp;&nbsp;&nbsp; Decrease
                        </a>
                    </div>
                )
            },
        },
    ]

    /** Text box code */

    const { TextArea } = Input

    function finalizeCartItem(cartItem: CartItem, orderID: string) {
        const newInventoryQty = cartItem.stock - cartItem.quantity
        if (cartItem.stock && newInventoryQty >= 0) {
            Firebase.firestore()
                .collection('items')
                .doc(cartItem.itemID)
                .update({
                    stock: newInventoryQty,
                })
            Firebase.firestore()
                .collection('orders')
                .doc(orderID)
                .collection('items')
                .doc(cartItem.itemID)
                .set({
                    name: cartItem.name,
                    quantity: cartItem.quantity,
                    description: cartItem.description,
                    price: cartItem.price,
                })
            Firebase.firestore()
                .collection('cart')
                .doc(email)
                .collection('cartItems')
                .doc(cartItem.itemID)
                .delete()
        }
    }

    function finalizeButton(inputAddress: string) {
        if (Array.isArray(props.cartItems) && props.cartItems.length) {
            let orderTimeString: string = new Date().toDateString().substr(4)
            orderTimeString = orderTimeString.concat(
                ' ' + new Date().toLocaleTimeString('en-US')
            )

            const orderID: string = email.concat(orderTimeString)
            let totalQty = 0
            props.cartItems.forEach(
                (cartItem) => (totalQty += cartItem.quantity)
            )

            if (totalQty > 0) {
                props.cartItems?.forEach((cartItem) =>
                    finalizeCartItem(cartItem, orderID)
                )
                Firebase.firestore().collection('orders').doc(orderID).set({
                    user: email,
                    time: orderTimeString,
                    address: inputAddress,
                    completed: false,
                })
            }
        }
    }

    // let addressInput = React.createRef()

    // function handleClick(){
    //     inputAddress = addressInput.current
    // }

    return (
        <div>
            <Table columns={columns} dataSource={props.cartItems}></Table>
            <div
                style={{
                    paddingLeft: '5%',
                    width: '40%',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {/* <TextArea
                    placeholder="Mailing Address"
                    rows={3}
                    allowClear={true}
                ></TextArea> */}
                <div>
                    <button onClick={() => finalizeButton('')}>
                        Finalize Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
