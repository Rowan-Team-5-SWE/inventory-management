import React, {useState} from 'react';

import {Firebase} from "../services/Firebase";

export const AddItemForm = () => {
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    const [cost, setcost] = useState('')
    const [stock, setstock] = useState('')
    const [description, setdescription] = useState('')
    const [UPC, setupc] = useState('')
    
    function onSumbit(e: { preventDefault: () => void; }) {
        e.preventDefault()

        Firebase
            .firestore()
            .collection('items')
            .add({
                name,
                price,
                cost,
                stock,
                description,
                UPC
            })
            .then(() => {
                setname('')
                setprice('')
                setcost('')
                setstock('')
                setdescription('')
                setupc('')
            })
    }

   return <form onSubmit={onSumbit}>
        <h4>Add Item</h4>
        <div>
        <label> Name <input type="text" value={name} onChange={e => setname(e.currentTarget.value)} /></label>
        </div>
        <div>
        <label> Price <input type="number" value={price} onChange={e => setprice(e.currentTarget.value)} /></label>
        </div>
        <div>
        <label> Cost <input type="number" value={cost} onChange={e => setcost(e.currentTarget.value)} /></label>
        </div>
         <div>
        <label> Description <input type="text"  value={description} onChange={e => setdescription(e.currentTarget.value)} /></label>
        </div>
        <div>
        <label> Quantity <input type="number"  value={stock} onChange={e => setstock(e.currentTarget.value)} /></label>
        </div>
        <div>
        <label> UPC <input type="number"  value={UPC} onChange={e => setupc(e.currentTarget.value)} /></label>
        </div>
        <button> Add Item</button>
       </form>
       
   }; 


