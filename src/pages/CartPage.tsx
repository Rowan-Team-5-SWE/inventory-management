import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { CartComponent } from '../components/CartComponent'
import { PageTemplate } from '../components/PageTemplate'
import { CartItem } from '../models/CartItem'
import { Item } from '../models/Item'
import { Firebase } from '../services/Firebase'

export const CartPage = () => {
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
        <PageTemplate>
            <CartComponent cartItems={cartItems} items={items} />
        </PageTemplate>
    )
}
