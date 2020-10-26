import React, {useState} from 'react'
import { Item } from '../models/Item'
import { Firebase } from '../services/Firebase'
import { EditItemForm } from './EditItemForm'

type ItemComponentProps = {
    item: Item
    
}




export const ItemComponent = ({ item }: ItemComponentProps) => {
    const [edit, setEdit] = useState(false);

    if(edit){

        return (
            <EditItemForm item={item} setEdit={setEdit}/>

            
        )

    } else {
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
                    <button
                        onClick={() => {
                            if (window.confirm(`Edit ${item.name}???`)) {
                                setEdit(true);
                            }
                        }}
                    >
                        {' '}
                        Edit{' '}
                    </button>
                </div>
        )
    }
}
