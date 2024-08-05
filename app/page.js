"use client";
import { useState } from "react";
import Nav from "./components/nav";
import Hero from "./components/hero";
import ProductSlider from "./components/productslider";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main>
      <Nav onSearch={handleSearch} />
      <ProductSlider />
      <Hero searchQuery={searchQuery} />
    </main>
  );
}
