import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { CartComponent } from '../components/CartComponent'
import { Item } from '../models/Item'
import { CartItem } from '../models/CartItem'
import { Firebase } from '../services/Firebase'
import { EditableTable } from '../components/EditableTable'
import { useAuthState } from 'react-firebase-hooks/auth'
import { NestedTable } from '../components/NestedTable'
import { NestedTableAll } from '../components/NestedTableAll'
import { usePermissions } from '../hooks/usePermissions'
import { Login } from '../pages/Login'

export const Home = () => {
    const [user] = useAuthState(Firebase.auth())
    const { isLoggedIn, isAdmin } = usePermissions()

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

    return isAdmin ? (
        <div>
            <Login></Login>
            <EditableTable items={items} />
            <h3>Order Fulfillment</h3>
            <NestedTableAll />
        </div>
    ) : isLoggedIn ? (
        <div>
            <Login></Login>
            <EditableTable items={items} />
            <h3>Cart</h3>
            <CartComponent cartItems={cartItems} items={items} />
            <h3>Past Orders</h3>
            <NestedTable />
        </div>
    ) : (
        <div>
            <Login></Login>
            <EditableTable items={items} />
        </div>
    )
}
