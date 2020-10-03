import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ItemComponenent } from "../components/ItemComponent";
import { Item } from "../models/Item";
import firebase from "../services/Firebase";

export const Home = () => {
  const [items, loading, error] = useCollectionData<Item>(
    firebase.firestore().collection("items")
  );

  return (
    <div>
      HomePage
      {items && items.map((item) => <ItemComponenent item={item} />)}
    </div>
  );
};
