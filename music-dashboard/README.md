# Music Dashboard

A simple Express application that visualizes global music sales and lets you search for new music via the iTunes API.

## Setup

```bash
pnpm install
pnpm start
```

The server will fetch sales data from [this dataset](https://github.com/rufuspollock/music-sales) and expose it at `/api/sales`. It also proxies search queries to the iTunes Search API.

Open `http://localhost:3000` in your browser to view the dashboard.
