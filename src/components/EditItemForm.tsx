import React, { useState } from 'react'

import { Firebase } from '../services/Firebase'
import { Item } from '../models/Item'

type EditItemFormProps = {
    item: Item
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditItemForm = ({ item, setEdit }: EditItemFormProps) => {
    const [name, setname] = useState(item.name)
    const [price, setprice] = useState(item.price)
    const [cost, setcost] = useState(item.cost)
    const [stock, setstock] = useState(item.stock)
    const [description, setdescription] = useState(item.description)
    const [UPC, setupc] = useState(item.UPC)

    function onSumbit(e: { preventDefault: () => void }) {
        e.preventDefault()

        Firebase.firestore().collection('items').doc(item.key).set({
            name,
            price,
            cost,
            stock,
            description,
            UPC,
        })

        setEdit(false)
    }

    return (
        <form id={item.key} onSubmit={onSumbit}>
            <h4>Add Item</h4>
            <div>
                <label>
                    {' '}
                    Name{' '}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.currentTarget.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    {' '}
                    Price{' '}
                    <input
                        type="number"
                        value={price}
                        onChange={(e) =>
                            setprice(parseFloat(e.currentTarget.value))
                        }
                    />
                </label>
            </div>
            <div>
                <label>
                    {' '}
                    Cost{' '}
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) =>
                            setcost(parseFloat(e.currentTarget.value))
                        }
                    />
                </label>
            </div>
            <div>
                <label>
                    {' '}
                    Description{' '}
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setdescription(e.currentTarget.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    {' '}
                    Quantity{' '}
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) =>
                            setstock(parseInt(e.currentTarget.value))
                        }
                    />
                </label>
            </div>
            <div>
                <label>
                    {' '}
                    UPC{' '}
                    <input
                        type="number"
                        value={UPC}
                        onChange={(e) =>
                            setupc(parseInt(e.currentTarget.value))
                        }
                    />
                </label>
            </div>
            <button> Save Changes</button>
            <button type="button" onClick={() => setEdit(false)}>
                Cancel
            </button>
        </form>
    )
}
