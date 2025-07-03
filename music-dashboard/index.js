import express from "express";
import fetch from "node-fetch";
import { parse } from "csv-parse/sync";

const SALES_URL =
  "https://raw.githubusercontent.com/rufuspollock/music-sales/master/data/data.csv";

async function fetchSales() {
  const res = await fetch(SALES_URL);
  const text = await res.text();
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
}

const app = express();
let salesData = [];

app.use(express.static("public"));

app.get("/api/sales", async (req, res) => {
  if (salesData.length === 0) {
    salesData = await fetchSales();
  }
  res.json(salesData);
});

app.get("/api/search", async (req, res) => {
  const term = req.query.term;
  if (!term) {
    return res.status(400).json({ error: "term query required" });
  }
  const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=10`;
  const response = await fetch(searchUrl);
  const json = await response.json();
  res.json(json);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Music dashboard running on http://localhost:${PORT}`),
);
