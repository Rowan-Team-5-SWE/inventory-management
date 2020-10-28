import React, { useState } from 'react'
import { Firebase } from '../services/Firebase'
import { Item } from '../models/Item'

type UpdateStockFormProps = {
    item: Item
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpdateStockForm = ({ item, setUpdate }: UpdateStockFormProps) =>{
    const [name, setname] = useState(item.name)
    const [price, setprice] = useState(item.price)
    const [cost, setcost] = useState(item.cost)
    const [stock, setstock] = useState(item.stock)
    const [description, setdescription] = useState(item.description)
    const [UPC, setupc] = useState(item.UPC)

    function onSumbit(e: { preventDefault: () => void }) {
        e.preventDefault()

        Firebase.firestore().collection('items').doc(item.id).set({
            name,
            price,
            cost,
            stock,
            description,
            UPC,
         
        })

        setUpdate(false)
    }
        return(
        <form id={item.id} onSubmit={onSumbit}>
            <div>
                <b>Editing {item.name} stock</b>

                <ul>
                    <li> {`Price: ${item.price}`} </li>
                    <li> {`Cost: ${item.cost}`} </li>
                    <li> {`Description: ${item.description}`} </li>
                    <li> 
                        <label>
                            {' '}
                            Quantity{' '}
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setstock(parseInt(e.currentTarget.value))}
                            />
                        </label>
                    </li>
                    <li> {`UPC: ${item.UPC}`} </li>
                </ul>
            </div> 
            
            <button>Confirm</button>
            <button type="button" onClick={() => setUpdate(false)}> Cancel </button> 
        </form>
        )
    }
