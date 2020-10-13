import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ItemComponent } from '../components/ItemComponent'
import { Item } from '../models/Item'
import { Firebase } from '../services/Firebase'

export const Home = () => {
    const [items, loading, error] = useCollectionData<Item>(
        Firebase.firestore().collection('items')
    )

    return (
        <div>
            HomePage
            {items && items.map((item) => <ItemComponent item={item} />)}
        </div>
    )
}
