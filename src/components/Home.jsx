import React, { useEffect, useState } from "react";
import { getOrders, getProducts, getCustomers } from "../api/shopify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsCurrencyDollar,
} from "react-icons/bs";

function Home() {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ordersRes = await getOrders();
      const productsRes = await getProducts();
      const customersRes = await getCustomers();

      setOrders(ordersRes.data);
      setProducts(productsRes.data);
      setCustomers(customersRes.data);

      const revenue = ordersRes.data.reduce(
        (sum, order) => sum + parseFloat(order.total_price),
        0
      );
      setTotalRevenue(revenue);
    }

    fetchData();
  }, []);

  const chartData = orders.map((order) => ({
    name: order.name,
    total: parseFloat(order.total_price),
  }));

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Total Products</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{products.length}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Total Orders</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{orders.length}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Total Revenue</h3>
            <BsCurrencyDollar className="card_icon" />
          </div>
          <h1>${totalRevenue.toFixed(2)}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Customers</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{customers.length}</h1>
        </div>
      </div>

      <h2 className="charts-title">Recent Order Totals</h2>
      <div className="charts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.slice(0, 10)}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
