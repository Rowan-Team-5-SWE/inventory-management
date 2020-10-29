import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ItemComponent } from '../components/ItemComponent'
import { Item } from '../models/Item'
import { Firebase } from '../services/Firebase'
import { AddItemForm } from '../components/AddItemForm'
import { ItemTable } from '../components/ItemTable'
import { EditableTable } from '../components/EditableTable'

export const Home = () => {
    const [items, loading] = useCollectionData<Item>(
        Firebase.firestore().collection('items'),
        { idField: 'id' }
    )

    return (
        <div>
            HomePage
            <EditableTable items={items} />
            {items && items.map((item) => <ItemComponent item={item} />)}
            <AddItemForm />
        </div>
    )
}
