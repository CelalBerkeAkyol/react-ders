import { useState } from "react";
const initaialItems = [
  { id: 1, description: "Passports", quantitiy: 2, packed: false },
  { id: 2, description: "Socks", quantitiy: 12, packed: false },
  { id: 3, description: "charger", quantitiy: 1, packed: true },
];
function App() {
  const [items, setItems] = useState([]);
  function handleItems(item) {
    setItems((items) => [...items, item]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onHandleItems={handleItems} />
      <PackingList allItems={items} />
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
function PackingList({ allItems }) {
  return (
    <div className="list">
      <ul>
        {allItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {item.quantitiy} {item.description}
      </span>
      <button>❌</button>
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
