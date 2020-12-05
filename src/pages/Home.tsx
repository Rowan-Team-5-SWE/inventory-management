import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ItemComponent } from '../components/ItemComponent'
import { CartComponent } from '../components/CartComponent'
import { Item } from '../models/Item'
import { CartItem } from '../models/CartItem'
import { Firebase } from '../services/Firebase'
import { AddItemForm } from '../components/AddItemForm'
import { EditableTable } from '../components/EditableTable'
import { useAuthState } from 'react-firebase-hooks/auth'
import { NestedTable } from '../components/NestedTable'

export const Home = () => {
    const [user] = useAuthState(Firebase.auth())

    const [items] = useCollectionData<Item>(
        Firebase.firestore().collection('items'),
        { idField: 'key' }
    )

    const email: string = user?.email || 'blank'
    const [cartItems] = useCollectionData<CartItem>(
        Firebase.firestore()
            .collection('cart')
            .doc(email)
            .collection('cartItems'),
        { idField: 'itemID' }
    )

    return (
        <div>
            HomePage
            <EditableTable items={items} />
            {items && items.map((item) => <ItemComponent item={item} />)}
            <AddItemForm />
            <h3>Cart</h3>
            <CartComponent cartItems={cartItems} items={items} />
            <h3>Past Orders</h3>
            <NestedTable />
        </div>
    )
}
