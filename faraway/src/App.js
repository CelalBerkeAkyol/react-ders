import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  function handleItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onHandleItems={handleItems} />
      <PackingList
        allItems={items}
        onDeleteItem={handleDeleteItem}
        onHandleToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}
function Form({ onHandleItems }) {
  const [description, setDescription] = useState("");
  const [quantitiy, setQuantitiy] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { quantitiy, description, packed: false, id: Date.now() };

    onHandleItems(newItem);
  }
  return (
    <form className="add-form">
      <h3>What do you need for your trip</h3>
      <select
        value={quantitiy}
        onChange={(e) => setQuantitiy(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {" "}
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}
function PackingList({ allItems, onDeleteItem, onHandleToggleItem }) {
  return (
    <div className="list">
      <ul>
        {allItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onHandleToggleItem={onHandleToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItem, onHandleToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onHandleToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {item.quantitiy} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>you have x items on your list, and you already packed x (x%)</em>
    </footer>
  );
}
export default App;
