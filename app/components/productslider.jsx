"use client";
import React from "react";
import Image from "next/image";
import ms1 from "/public/gallery/ms1.png";
import en1 from "/public/gallery/en1.png";
import arrow from "/public/gallery/arrow2.png";
import { Card, Button, CardFooter } from "@nextui-org/react";

export default function ProductSlider() {
  return (
    <div className="w-full mx-auto p-5 pb-20 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="flex flex-col justify-between">
          <div className="text-left text-4xl font-bold bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent mb-4">
            AUTO PARTS MADE SIMPLE
          </div>
          <div className="text-left text-lg mb-4">
            Welcome to our auto parts store, your one-stop destination for
            premium quality automotive parts. Our products are sourced from top
            manufacturers to ensure reliability and performance.
          </div>
          <Button
            size="lg"
            className="bg-primaryButton text-white hover:bg-blue-500 transition duration-300 mb-8 w-[150px] rounded-full font-semibold"
          >
            Browse Parts
          </Button>
          <div className="relative transition-transform ease-in-out duration-500 mt-4">
            <Card className="w-full h-[300px] md:h-[100%] overflow-hidden rounded-3xl shadow-lg transition-transform ease-in-out duration-500 bg-imageCardBackground">
              <Image
                src={ms1}
                alt="Product Image"
                className="w-full h-full object-cover"
              />
            </Card>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="relative transition-transform ease-in-out duration-500">
            <Card className="w-full h-[300px] md:h-[100%] overflow-hidden rounded-3xl shadow-lg transition-transform ease-in-out duration-500 bg-imageCardBackground">
              <Image
                src={en1}
                alt="Product Image"
                className="w-full h-full object-cover"
              />
              <CardFooter className="absolute bottom-0 z-10 flex justify-between items-center w-full p-4">
                <Button
                  size="lg"
                  className="bg-secondaryButton text-white hover:bg-primaryButton transition duration-300 rounded-full"
                >
                  Engine Parts
                </Button>
                <div
                  className="bg-arrowButtonBackground text-black hover:bg-gray-200 transition duration-300 rounded-full w-12 h-12 flex items-center justify-center transform "
                  style={{ transform: "rotate(-40deg)", cursor: "pointer" }}
                >
                  <Image src={arrow} alt="Arrow Icon" className="w-6 h-6" />
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="relative p-5 bg-infoCardBackground rounded-3xl h-[100px] md:h-[30%] flex items-center justify-center mt-8 md:mt-4">
            <div className="text-center text-white text-xl">
              Discover our wide range of auto parts that combine quality with
              affordability. Transform your vehicle with top-notch parts that
              promise enhanced performance and longevity. Shop now and
              experience the difference.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
