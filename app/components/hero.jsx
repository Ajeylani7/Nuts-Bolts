"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Skeleton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { getTableData } from "../../public/utils/database";
import icon from "/public/gallery/icon.png";

// The main functional component for displaying products.
export default function Products() {
  // State variable for storing product data.
  const [products, setProducts] = useState([]);
  // State variable for the cart items.
  const [cartItems, setCartItems] = useState([]);
  // useDisclosure hook for managing the modal state.
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // State variable for the selected product to show in the modal.
  const [selectedProduct, setSelectedProduct] = useState(null);
  // State to track the liked items
  const [likedItems, setLikedItems] = useState(new Set());

  // useEffect to run client-side logic for fetching products data.
  useEffect(() => {
    async function fetchProducts() {
      const data = await getTableData("products");
      setProducts(data);
    }
    fetchProducts();
  }, []);

  // Function to handle the purchase of a product.
  const handleBuy = (product) => {
    // Check if the product is already in the cart.
    const existingItem = cartItems.find(
      (item) => item.productCode === product.productCode
    );
    if (existingItem) {
      // If it is, update the quantity of the existing product in the cart.
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productCode === product.productCode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If not, add the product to the cart.
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
    // Set the selected product and open the modal.
    setSelectedProduct(product);
    onOpen();
  };

  // Function to handle quantity change of a product in the cart.
  const handleQuantityChange = (productCode, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productCode === productCode ? { ...item, quantity } : item
      )
    );
  };

  // Function to handle removal of a product from the cart.
  const handleRemoveItem = (productCode) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productCode !== productCode)
    );
  };

  // Function to handle like/unlike of a product.
  const handleLike = (productCode) => {
    setLikedItems((prevLikes) => {
      const newLikes = new Set(prevLikes);
      if (newLikes.has(productCode)) {
        newLikes.delete(productCode);
      } else {
        newLikes.add(productCode);
      }
      return newLikes;
    });
  };

  return (
    <div className="w-full mx-auto p-5 pb-20" style={{ maxWidth: "1700px" }}>
      <h1 className="text-left text-4xl font-bold bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent mb-4">
        AUTO PARTS COLLECTION
      </h1>
      <div className="flex justify-between items-center mb-8">
        <Tabs
          aria-label="Product Tabs"
          radius="full"
          className="w-full space-x-4"
        >
          <Tab
            key="all"
            title="All"
            className="text-lg px-6 py-2"
            isSelectedClass="bg-blue-600 text-white"
          />
          <Tab
            key="popular"
            title="Popular"
            className="text-lg px-6 py-2"
            isSelectedClass="bg-blue-600 text-white"
          />
          <Tab
            key="new"
            title="New"
            className="text-lg px-6 py-2"
            isSelectedClass="bg-blue-600 text-white"
          />
          <Tab
            key="sale"
            title="Sale"
            className="text-lg px-6 py-2"
            isSelectedClass="bg-blue-600 text-white"
          />
        </Tabs>
        <Select label="Sort by" placeholder="Select" className="max-w-xs">
          <SelectItem key="highest" value="highest">
            Highest Price
          </SelectItem>
          <SelectItem key="lowest" value="lowest">
            Lowest Price
          </SelectItem>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8 mb-8 rounded-lg">
        {/* Display products */}
        {products.slice(0, 24).map((product) => (
          <Card
            key={product.productCode}
            className="p-4 relative flex flex-col bg-imageCardBackground"
            radius="lg"
          >
            <div className="relative mb-4">
              <Image
                isBlurred
                src={product.imageUrl || "/gallery/bd2.svg"}
                alt={product.productName}
                className="w-full h-56 object-cover rounded-lg"
              />
              <button
                onClick={() => handleLike(product.productCode)}
                className="absolute top-2 right-2 bg-white/70 rounded-full p-1"
              >
                <Image
                  src={icon.src}
                  alt="Heart Icon"
                  className={`h-5 w-5 ${
                    likedItems.has(product.productCode)
                      ? "fill-current text-black"
                      : ""
                  }`}
                />
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div className="flex flex-col">
                <div className="text-sm font-semibold">
                  {product.productName}
                </div>
                <div className="text-lg text-gray-800">{product.buyPrice}$</div>
              </div>
              <Button
                auto
                size="tiny"
                className="rounded-full"
                color="primary"
                onClick={() => handleBuy(product)}
              >
                Buy
              </Button>
            </div>
          </Card>
        ))}
        {/* Display skeleton loaders if products length is less than 24 */}
        {Array.from({ length: 24 - products.length }, (_, index) => (
          <Card
            key={`skeleton-${index}`}
            className="space-y-5 p-4 relative flex flex-col"
            radius="lg"
            color="#F3F4F6"
          >
            <Skeleton className="mb-auto h-[200px] w-full rounded-lg"></Skeleton>
            <Skeleton className="w-3/5 rounded-lg h-3"></Skeleton>
            <Skeleton className="w-4/5 rounded-lg h-3"></Skeleton>
            <Skeleton className="w-2/5 rounded-lg h-3"></Skeleton>
          </Card>
        ))}
        {/* Modal for displaying the cart */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Cart</ModalHeader>
                <ModalBody>
                  {/* Display items in the cart */}
                  {cartItems.map((item) => (
                    <div
                      key={item.productCode}
                      className="flex justify-between items-center mb-4"
                    >
                      <div>
                        <p>
                          <strong>Name:</strong> {item.productName}
                        </p>
                        <p>
                          <strong>Price:</strong> {item.buyPrice}
                        </p>
                        <p>
                          <strong>Details:</strong> {item.productDescription}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Select
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.productCode,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {/* Select options for quantity */}
                          {[...Array(10).keys()].map((i) => (
                            <SelectItem key={i + 1} value={i + 1}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </Select>
                        <Button
                          color="danger"
                          auto
                          size="mini"
                          className="ml-2"
                          onClick={() => handleRemoveItem(item.productCode)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Checkout
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
