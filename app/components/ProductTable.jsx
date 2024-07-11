"use client";
import React, { useEffect, useState } from "react";
import { getTableData } from "../../public/utils/database";

export default function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const result = await getTableData("products");
      if (result) {
        const columns = result.columns;
        const values = result.values;
        const products = values.map((row) => {
          let product = {};
          columns.forEach((column, index) => {
            product[column] = row[index];
          });
          return product;
        });
        setProducts(products);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product Table</h2>
      <table>
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Product Line</th>
            <th>Product Scale</th>
            <th>Product Vendor</th>
            <th>Product Description</th>
            <th>Quantity In Stock</th>
            <th>Buy Price</th>
            <th>MSRP</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productCode}>
              <td>{product.productCode}</td>
              <td>{product.productName}</td>
              <td>{product.productLine}</td>
              <td>{product.productScale}</td>
              <td>{product.productVendor}</td>
              <td>{product.productDescription}</td>
              <td>{product.quantityInStock}</td>
              <td>{product.buyPrice}</td>
              <td>{product.MSRP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
