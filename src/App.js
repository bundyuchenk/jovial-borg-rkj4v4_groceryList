import { useState } from "react";
import "./styles.css";

function ShoppingList({ products }) {
  return (
    <ul className="shopping-list">
      {products.map((prodact) => (
        <li key={prodact.id}>{prodact.title}</li>
      ))}
    </ul>
  );
}

function ProdactForm({ onAddProduct }) {
  const addProdacts = function (e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title");
    const price = Number(formData.get("price"));
    const category = formData.get("category");

    const cart = { title, price, category };

    onAddProduct(cart);
  };
  return (
    <form className="product-form" onSubmit={addProdacts}>
      <input name="title" type="text" placeholder="Product name" />
      <input name="price" type="text" placeholder="Price" />
      <select name="category" defaultValue="">
        <option value="" disabled>
          Select category
        </option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="shopping">Shopping</option>
        <option value="other">Other</option>
      </select>
      <button type="submit">Add product</button>
    </form>
  );
}

export default function App() {
  const year = new Date().getFullYear();
  const [products, setProducts] = useState([]);

  function addProduct(product) {
    const newProduct = { ...product, id: crypto.randomUUID() };

    const updateList = [...products, newProduct];
    setProducts(updateList);
  }
  return (
    <div className="App">
      <h1>Expense tracker</h1>
      <ProdactForm onAddProduct={addProduct} />
      <ShoppingList products={products} />

      <p>Maks Bund {year}</p>
    </div>
  );
}
