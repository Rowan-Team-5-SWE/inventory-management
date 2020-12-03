/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import { Item } from '../models/Item'
import { CartItem } from '../models/CartItem'
import { Table } from 'antd'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Firebase } from '../services/Firebase'
import { FinalizeOrderForm } from '../components/FinalizeOrderForm'

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
            Firebase.firestore()
                .collection('cart')
                .doc(email)
                .collection('cartItems')
                .doc(cartItem.itemID)
                .update({ quantity: cartItem.stock })
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

    function finalizeCartItem(cartItem: CartItem, orderID: string) {
        const newInventoryQty = cartItem.stock - cartItem.quantity
        const increaseBy = Firebase.firestore.FieldValue.increment(
            cartItem.quantity
        )
        if (cartItem.stock && newInventoryQty >= 0) {
            Firebase.firestore()
                .collection('items')
                .doc(cartItem.itemID)
                .update({
                    stock: newInventoryQty,
                    numSold: increaseBy,
                })
            Firebase.firestore()
                .collection('orders')
                .doc(orderID)
                .collection('orderItems')
                .doc(cartItem.itemID)
                .set({
                    name: cartItem.name,
                    quantity: cartItem.quantity,
                    description: cartItem.description,
                    price: cartItem.price,
                    orderID: orderID,
                    user: email,
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
                    status: 'pending',
                })
            }
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

    return (
        <div>
            <Table columns={columns} dataSource={props.cartItems}></Table>
            <div
                style={{
                    paddingLeft: '5%',
                    width: '80%',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <FinalizeOrderForm finalizeButton={finalizeButton} />
                <div>
                    {/* <button onClick={() => finalizeButton('')}>
                        Finalize Cart
                    </button> */}
                </div>
            </div>
        </div>
    )
}
