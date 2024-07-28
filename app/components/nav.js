"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input, Avatar, Badge } from "@nextui-org/react";

export default function Nav() {
  // State to keep track of the scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  // State to keep track of the blur level
  const [blur, setBlur] = useState(0);

  // useEffect hook to add a scroll event listener when the component mounts
  useEffect(() => {
    // Function to handle the scroll event
    const handleScroll = () => {
      // Update the scroll position state with the current scroll position
      setScrollPosition(window.scrollY);
      // Calculate and set the blur level based on the scroll position
      setBlur(Math.min(window.scrollY / 100, 10));
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll the page to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // Navbar container with Tailwind CSS classes for styling
    <nav
      className="flex justify-between items-center p-4 bg-white  sticky top-0 z-50 mt-2 rounded-b-lg "
      style={{
        maxWidth: "1700px",
        boxShadow: "0 50px 50px -50px rgba(0,0,0,0.3)",
      }}
    >
      {/* Logo container with an onClick event to scroll to the top */}
      <div className="logo" onClick={scrollToTop}>
        <Image
          src="/gallery/logonb.png"
          alt="N&B Logo"
          width={80}
          height={30}
          objectFit="contain"
          objectPosition="50% 50%"
          className="transition duration-300 transform hover:scale-90 cursor-pointer"
        />
      </div>
      {/* Search bar container with a transition for width change on hover */}
      <div className="relative mx-4 transition-all duration-300 ease-in-out transform hover:w-64 w-40">
        <Input
          clearable
          placeholder="Search for products..."
          fullWidth
          bordered
          className="mx-2"
        />
      </div>
      {/* Avatar and badge container with hover effects */}
      <div className="avatar flex gap-4 items-center">
        <Badge content="5" color="danger" shape="circle">
          <Avatar
            isBordered
            radius="full"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            className="transition duration-300 transform hover:scale-110 cursor-pointer"
          />
        </Badge>
      </div>
    </nav>
  );
}
