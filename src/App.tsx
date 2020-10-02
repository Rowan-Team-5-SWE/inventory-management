import React from "react";
import { useState } from "react";
import { ItemComponenent } from "./components/ItemComponent";
import { Item } from "./models/Item";
import firebase from "./services/Firebase";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  firebase
    .firestore()
    .collection("items")
    .onSnapshot((s) => {
      const items = s.docs.map((e) => e.data() as Item);
      setItems(items);
    });

  return (
    <div>
      {items.map((item) => (
        <ItemComponenent item={item} />
      ))}
    </div>
  );
}
