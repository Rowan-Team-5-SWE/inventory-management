import React, {useState} from 'react'
import { Item } from '../models/Item'
import { Firebase } from '../services/Firebase'
import { EditItemForm } from './EditItemForm'
import { UpdateStockForm } from './UpdateStockForm'

type ItemComponentProps = {
    item: Item
    
}

export const ItemComponent = ({ item }: ItemComponentProps) => {
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(false);

    function incrementStock(e: { preventDefault: () => void }){
        e.preventDefault()

        const db = Firebase.firestore()
        const increment = Firebase.firestore.FieldValue.increment(1)
        const itemRef = db.collection('items').doc(item.id)
        itemRef.update({stock: increment})
    }

    function decrementStock(e: { preventDefault: () => void }){
        e.preventDefault()

        const db = Firebase.firestore()
        const increment = Firebase.firestore.FieldValue.increment(-1)
        const itemRef = db.collection('items').doc(item.id)
        itemRef.update({stock: increment})
}

    if(edit){

        return (
            <EditItemForm item={item} setEdit={setEdit}/>

            
        )

    }if(update){
            return (
            <UpdateStockForm item={item} setUpdate={setUpdate}/>

            
        )
    }else {
        return (    
                <div>
                    <b>{`${item.name}`}</b>
                    <ul>
                        <li> {`Price: ${item.price}`} </li>
                        <li> {`Cost: ${item.cost}`} </li>
                        <li> {`Description: ${item.description}`} </li>
                        <li> {`Stock: ${item.stock} `} <button onClick={() => {setUpdate(true);}}> Update Quantity </button><button onClick={decrementStock}>-</button><button onClick={incrementStock}>+</button></li> 
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
