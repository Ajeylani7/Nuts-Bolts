"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Input,
  Avatar,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tabs,
  Tab,
  Button,
  Card,
} from "@nextui-org/react";

// Custom hook to manage modal state
function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onOpenChange = (open) => setIsOpen(open);

  return { isOpen, onOpen, onOpenChange };
}

export default function Nav() {
  // State to keep track of the scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  // State to keep track of the blur level
  const [blur, setBlur] = useState(0);
  // State to manage the modal visibility
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // State for the selected tab in the modal
  const [selected, setSelected] = useState("login");

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
      className="flex justify-between items-center p-4 bg-white sticky top-0 z-50 mt-2 rounded-b-lg "
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
            onClick={onOpen}
          />
        </Badge>
      </div>
      {/* Modal for login and sign-up */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <Card className="w-full">
            <ModalHeader className="flex flex-col gap-1 text-center">
              {selected === "login" ? "Login" : "Sign Up"}
            </ModalHeader>
            <ModalBody className="overflow-hidden">
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="Login">
                  <form className="flex flex-col gap-4">
                    <Input
                      isRequired
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Input
                      isRequired
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    <p className="text-center text-small">
                      Need to create an account?{" "}
                      <a
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setSelected("sign-up")}
                      >
                        Sign up
                      </a>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary">
                        Login
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="sign-up" title="Sign up">
                  <form className="flex flex-col gap-4">
                    <Input
                      isRequired
                      label="Name"
                      placeholder="Enter your name"
                    />
                    <Input
                      isRequired
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Input
                      isRequired
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    <p className="text-center text-small">
                      Already have an account?{" "}
                      <a
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setSelected("login")}
                      >
                        Login
                      </a>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary">
                        Sign up
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </ModalBody>
          </Card>
        </ModalContent>
      </Modal>
    </nav>
  );
}
