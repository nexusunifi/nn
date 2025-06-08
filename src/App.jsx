import { useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ item: "", amount: "", vat: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = () => {
    const amount = parseFloat(form.amount);
    const vatRate = parseFloat(form.vat);
    if (!form.item || isNaN(amount) || isNaN(vatRate)) return alert("Fill all fields correctly.");

    const vatAmount = (amount * vatRate) / 100;
    const total = amount + vatAmount;

    setExpenses([
      ...expenses,
      { ...form, amount, vat: vatRate, vatAmount, total }
    ]);
    setForm({ item: "", amount: "", vat: "" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial" }}>
      <h1>SASU Expense Tracker</h1>
      <input
        name="item"
        placeholder="Expense Name"
        value={form.item}
        onChange={handleChange}
        style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount (excl. VAT)"
        value={form.amount}
        onChange={handleChange}
        style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
      />
      <input
        name="vat"
        type="number"
        placeholder="VAT %"
        value={form.vat}
        onChange={handleChange}
        style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
      />
      <button onClick={addExpense} style={{ padding: "10px", width: "100%", background: "#0070f3", color: "white", border: "none", cursor: "pointer" }}>
        Add Expense
      </button>

      <h2 style={{ marginTop: "30px" }}>All Expenses</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc" }}>Item</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Amount (€)</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>VAT (%)</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>VAT (€)</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Total (€)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => (
            <tr key={i}>
              <td>{e.item}</td>
              <td>{e.amount.toFixed(2)}</td>
              <td>{e.vat}</td>
              <td>{e.vatAmount.toFixed(2)}</td>
              <td>{e.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
