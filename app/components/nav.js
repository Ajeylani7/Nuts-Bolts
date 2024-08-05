"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image"; // Ensure correct import
import {
  Input,
  Avatar,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Card,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { registerUser, loginUser } from "../../public/auth";

export default function Nav({ onSearch }) {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [blur, setBlur] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onOpenChange: onCartOpenChange,
  } = useDisclosure();
  const [selected, setSelected] = useState("login");
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setBlur(Math.min(window.scrollY / 100, 10));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      onOpenChange(false); // Close the login modal
      router.push("/userpage"); // Redirect to user page
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const data = await registerUser(name, email, password);
      setIsAccountCreated(true);
      setSelected("login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  return (
    <nav
      className="flex justify-between items-center p-4 bg-white sticky top-0 z-50 mt-2 rounded-b-lg "
      style={{
        maxWidth: "1700px",
        boxShadow: "0 50px 50px -50px rgba(0,0,0,0.3)",
      }}
    >
      <div className="logo" onClick={() => router.push("/")}>
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
      <div className="relative mx-4 transition-all duration-300 ease-in-out transform hover:w-64 w-40">
        <Input
          clearable
          placeholder="Search for products..."
          fullWidth
          bordered
          className="mx-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="avatar flex gap-4 items-center">
        {user ? (
          <Badge color="primary" shape="circle">
            <Avatar
              text={user.name.charAt(0).toUpperCase()}
              isBordered
              radius="full"
              className="transition duration-300 transform hover:scale-110 cursor-pointer"
              onClick={onCartOpen}
            />
          </Badge>
        ) : (
          <Badge color="danger" shape="circle">
            <Avatar
              isBordered
              radius="full"
              text="?"
              className="transition duration-300 transform hover:scale-110 cursor-pointer"
              onClick={onOpen}
            />
          </Badge>
        )}
      </div>
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
                  <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <Input
                      isRequired
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Input
                      isRequired
                      label="Password"
                      name="password"
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
                      <Button fullWidth color="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="sign-up" title="Sign up">
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={handleRegister}
                  >
                    <Input
                      isRequired
                      label="Name"
                      name="name"
                      placeholder="Enter your name"
                    />
                    <Input
                      isRequired
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Input
                      isRequired
                      label="Password"
                      name="password"
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
                      <Button fullWidth color="primary" type="submit">
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
      <Modal isOpen={isCartOpen} onOpenChange={onCartOpenChange}>
        <ModalContent>
          <Card className="w-full">
            <ModalHeader className="flex flex-col gap-1 text-center">
              Your Cart
            </ModalHeader>
            <ModalBody>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4"
                  >
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                  </div>
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  router.push("/userpage");
                  onCartOpenChange(false);
                }}
              >
                Go to user page
              </Button>
              <Button color="danger" onClick={handleLogout}>
                Logout
              </Button>
            </ModalFooter>
          </Card>
        </ModalContent>
      </Modal>
      <Modal isOpen={isAccountCreated} onOpenChange={setIsAccountCreated}>
        <ModalContent>
          <Card className="w-full">
            <ModalHeader className="flex flex-col gap-1 text-center">
              Account Created Successfully
            </ModalHeader>
            <ModalBody>
              <p>
                Your account has been created successfully. You can now log in.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  setIsAccountCreated(false);
                  onOpen();
                  setSelected("login");
                }}
              >
                Login
              </Button>
            </ModalFooter>
          </Card>
        </ModalContent>
      </Modal>
    </nav>
  );
}
