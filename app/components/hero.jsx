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
import { getTableData } from "../../public/database"; // Ensure this path is correct
import icon from "/public/gallery/icon.png";

// Helper function to calculate the discounted price
const getDiscountedPrice = (price, discount) => {
  return (price - (price * discount) / 100).toFixed(2);
};

// Helper function to generate a random discount percentage
const getRandomDiscount = () => {
  return Math.floor(Math.random() * 21) + 10; // Random discount between 10% and 30%
};

// The main functional component for displaying products.
export default function Products() {
  // State variable for storing product data.
  const [products, setProducts] = useState([]);
  // State variable for the cart items.
  const [cartItems, setCartItems] = useState([]);
  // useDisclosure hook for managing the modal state.
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isReceiptOpen,
    onOpen: onReceiptOpen,
    onOpenChange: onReceiptOpenChange,
  } = useDisclosure();
  // State variable for the selected product to show in the modal.
  const [selectedProduct, setSelectedProduct] = useState(null);
  // State to track the liked items
  const [likedItems, setLikedItems] = useState(new Set());
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  // useEffect to run client-side logic for fetching products data.
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getTableData("products");
        console.log("Fetched products:", data); // Debugging log
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error); // Error handling
      }
    }
    fetchProducts();
  }, []);

  // Function to handle the purchase of a product.
  const handleBuy = (product) => {
    const existingItem = cartItems.find(
      (item) => item.productCode === product.productCode
    );
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productCode === product.productCode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
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

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.buyPrice * item.quantity,
    0
  );

  const handleCheckout = () => {
    onOpenChange(false);
    onReceiptOpen();
  };

  const filteredProducts = products
    .filter(
      (product) => activeTab === "all" || product.keywords.includes(activeTab)
    )
    .sort((a, b) => {
      if (sortOrder === "highest") return b.buyPrice - a.buyPrice;
      if (sortOrder === "lowest") return a.buyPrice - b.buyPrice;
      return 0;
    });

  return (
    <div className="w-full mx-auto p-5 pb-20" style={{ maxWidth: "1700px" }}>
      <h1
        className="text-left text-2xl font-bold bg-clip-text text-transparent mb-4"
        style={{
          backgroundImage:
            "linear-gradient(to right, #051937, #132950, #213a6a, #304c85, #405ea1)",
        }}
      >
        AUTO PARTS COLLECTION
      </h1>
      <div className="flex justify-between items-center mb-8">
        <Tabs
          aria-label="Product Tabs"
          radius="full"
          className="w-full space-x-2"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
        >
          <Tab
            key="all"
            title="All"
            className="text-sm px-4 py-1 text-blue-600"
            isSelectedClass="bg-blue-600 text-white"
          />
          <Tab
            key="popular"
            title="Popular"
            className="text-sm px-4 py-1 text-blue-600"
            isSelectedClass="bg-blue-600 text-white"
          />
          <Tab
            key="new"
            title="New"
            className="text-sm px-4 py-1 text-blue-600"
            isSelectedClass="bg-blue-600 text-white"
          />
          <Tab
            key="sale"
            title="Sale"
            className="text-sm px-4 py-1 text-blue-600"
            isSelectedClass="bg-blue-600 text-white"
          />
        </Tabs>

        <Select
          label="Sort by"
          placeholder="Select"
          className="max-w-xs"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <SelectItem key="highest" value="highest">
            Highest Price
          </SelectItem>
          <SelectItem key="lowest" value="lowest">
            Lowest Price
          </SelectItem>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8 mb-8 rounded-lg">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 24).map((product) => (
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
                <div className="absolute top-2 right-2 flex flex-col space-y-1">
                  {product.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs text-white ${
                        keyword === "sale" ? "bg-red-500" : "bg-blue-500"
                      }`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="text-sm font-semibold">
                    {product.productName}
                  </div>
                  {product.keywords.includes("sale") ? (
                    <div className="text-lg text-gray-800">
                      <span className="line-through mr-2">
                        ${product.buyPrice}
                      </span>
                      <span className="text-red-500">
                        $
                        {getDiscountedPrice(
                          product.buyPrice,
                          getRandomDiscount()
                        )}
                      </span>
                    </div>
                  ) : (
                    <div className="text-lg text-gray-800">
                      ${product.buyPrice}
                    </div>
                  )}
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
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
      {/* Modal for displaying the cart */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cart</ModalHeader>
              <ModalBody>
                {cartItems.map((item) => (
                  <div
                    key={item.productCode}
                    className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg shadow"
                  >
                    <div>
                      <p className="font-bold">{item.productName}</p>
                      <p className="text-gray-700">${item.buyPrice} each</p>
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
                        className="w-16"
                        defaultValue={item.quantity}
                      >
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
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
              <ModalFooter className="flex justify-between items-center">
                <div className="text-lg font-bold">
                  Total: ${totalAmount.toFixed(2)}
                </div>
                <Button color="primary" onPress={handleCheckout}>
                  Checkout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Modal for displaying the receipt */}
      <Modal isOpen={isReceiptOpen} onOpenChange={onReceiptOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Receipt</ModalHeader>
              <ModalBody>
                <p className="text-lg font-bold">
                  Thank you for your purchase!
                </p>
                {cartItems.map((item) => (
                  <div
                    key={item.productCode}
                    className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg shadow"
                  >
                    <div>
                      <p className="font-bold">{item.productName}</p>
                      <p className="text-gray-700">${item.buyPrice} each</p>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter className="flex justify-between items-center">
                <div className="text-lg font-bold">
                  Total: ${totalAmount.toFixed(2)}
                </div>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
