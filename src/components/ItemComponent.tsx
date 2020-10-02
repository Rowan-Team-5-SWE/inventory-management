import React from "react";
import { Item } from "../models/Item";

type ItemComponenentProps = {
  item: Item;
};

export const ItemComponenent = ({ item }: ItemComponenentProps) => {
  return <div>{`Item: ${item.name} : ${item.price}`}</div>;
};
