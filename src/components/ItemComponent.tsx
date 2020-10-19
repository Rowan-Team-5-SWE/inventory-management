import React from 'react'
import { Item } from '../models/Item'
import { Firebase } from '../services/Firebase'

type ItemComponentProps = {
    item: Item
}

export const ItemComponent = ({ item }: ItemComponentProps) => {
    return (
        <div>
            <b>{`${item.name}`}</b>
            <ul>
                <li> {`Price: ${item.price}`} </li>
                <li> {`Cost: ${item.cost}`} </li>
                <li> {`Description: ${item.description}`} </li>
                <li> {`Stock: ${item.stock}`}</li>
                <li> {`UPC: ${item.UPC}`} </li>
            </ul>
            <button
                onClick={() => {
                    if (window.confirm(`Delete ${item.name}???`)) {
                        
                        console.log(
                            Firebase.firestore()
                                .collection('items')
                                .doc(item.id)
                                .delete()
                        )
                    }
                }}
            >
                {' '}
                Delete{' '}
            </button>
        </div>
    )
}
