"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  Image,
  Button,
  CardHeader,
  CardFooter,
  Divider,
} from "@nextui-org/react";

// Main functional component for displaying a product slider
export default function ProductSlider() {
  // Sample product data with random auto parts images
  const products = [
    {
      id: 1,
      name: "Engine Oil",
      description: "Premium quality engine oil for better performance.",
      imageUrl:
        "https://images.unsplash.com/photo-1643700973089-baa86a1ab9ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Brake Pads",
      description: "High-performance brake pads for enhanced safety.",
      imageUrl:
        "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Air Filter",
      description: "Efficient air filters to improve engine life.",
      imageUrl:
        "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Spark Plugs",
      description: "Reliable spark plugs for better ignition.",
      imageUrl:
        "https://images.unsplash.com/photo-1527383418406-f85a3b146499?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  // Settings for the react-slick slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="w-full mt-4 mb-4 relative rounded-lg">
      <Slider {...settings}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`relative p-5 transition-transform ease-in-out duration-500 ${
              activeSlide === index ? "scale-105" : "scale-90"
            }`}
            style={{ width: activeSlide === index ? "80%" : "20%" }}
          >
            <Card className="w-full h-[300px] overflow-hidden rounded-lg shadow-lg transition-transform ease-in-out duration-500">
              <CardHeader className="absolute z-10 top-2 left-2 bg-black/40 rounded-md p-1 text-white text-xs font-bold">
                🔧 Recommended
              </CardHeader>
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t border-default-600 dark:border-default-100 flex justify-between items-center">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <h1 className="text-white text-xl font-bold">
                      {product.name}
                    </h1>
                    <p className="text-white text-sm">{product.description}</p>
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  className="bg-primary text-white hover:bg-primary transition duration-300"
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
