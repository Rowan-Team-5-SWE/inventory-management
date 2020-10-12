import React from "react";
import { Item } from "../models/Item";

type ItemComponentProps = {
  item: Item;
};

export const ItemComponenent = ({ item }: ItemComponentProps) => {
  return <div><b>{`${item.name}`}</b>
    <ul> 
      <li> {`Price: ${item.price}`} </li>
      <li>  {`Cost: ${item.cost}`} </li>
      <li>  {`Description: ${item.description}`} </li>
      <li> {`Stock: ${item.stock}`}</li>
      <li> {`UPC: ${item.UPC}`} </li>
    </ul>
    
  
  
  </div>;
};
