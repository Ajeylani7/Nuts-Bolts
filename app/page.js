"use client"; // Indicate that this component should be rendered client-side
import Hero from "./components/hero";
import ProductSlider from "./components/productslider";

// Main functional component for the home page
export default function Home() {
  return (
    <main>
      <ProductSlider />
      <Hero />
    </main>
  );
}
