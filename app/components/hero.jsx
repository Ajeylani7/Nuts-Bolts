"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { getTableData } from "../../public/database"; // Ensure this path is correct

// Helper function to calculate the discounted price
const getDiscountedPrice = (price, discount) => {
  return (price - (price * discount) / 100).toFixed(2);
};

// Image map for the product codes
const imageMap = {
  EN01: "engine_oil.png",
  BP01: "brake_pads.png",
  RT01: "brake_rotors.png",
  AF01: "air_filter.png",
  SP01: "spark_plug.png",
  TF01: "transmission_fluid.png",
  OF01: "oil_filter.png",
  BC01: "battery_charger.png",
  W01: "wipers.png",
  HF01: "headlights.png",
  BF01: "brake_fluid.png",
  CS01: "coolant_system.png",
  RS01: "radiator_support.png",
  IS01: "ignition.png",
  AT01: "alternator.png",
  SW01: "steering.png",
  TW01: "wheel.png",
  EB01: "exhaust.png",
  FS01: "fuel.png",
  SC01: "suspension.png",
  BR01: "brake_rotors.png",
  HT01: "hose.png",
  FS02: "fuel_injector.png",
  WP01: "water_pump.png",
};

const getImagePath = (productCode) => {
  return `/gallery/${imageMap[productCode]}`;
};

// The main functional component for displaying products.
export default function Products({ searchQuery }) {
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
  const productsRef = useRef();

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

  // Scroll to the searched item and highlight it
  useEffect(() => {
    if (searchQuery) {
      const productElement = document.getElementById(searchQuery.toLowerCase());
      if (productElement) {
        productElement.scrollIntoView({ behavior: "smooth" });
        productElement.classList.add("highlight");
        setTimeout(() => {
          productElement.classList.remove("highlight");
        }, 2000);
      }
    }
  }, [searchQuery]);

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

  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.keywords.includes("sale")
      ? getDiscountedPrice(item.buyPrice, 25)
      : item.buyPrice;
    return total + price * item.quantity;
  }, 0);

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

  const resetCart = () => {
    setCartItems([]);
    onReceiptOpenChange(false);
  };

  return (
    <div
      id="products-section"
      className="w-full mx-auto p-5 pb-20"
      style={{ maxWidth: "1700px" }}
    >
      <h1
        className="text-left text-2xl font-bold bg-clip-text text-transparent mb-4"
        style={{
          backgroundImage:
            "linear-gradient(to right, #051937, #132950, #213a6a, #304c85, #405ea1)",
        }}
      >
        AUTO PARTS COLLECTION
      </h1>
      <div className="flex justify-between items-center mb-8 ">
        <Tabs
          aria-label="Product Tabs"
          radius="full"
          className="w-full space-x-2 "
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
        >
          <Tab
            key="all"
            title="ALL"
            className="text-sm px-4 py-1"
            isSelectedClass="bg-blue-600 text-white"
          />
          <Tab
            key="popular"
            title="POPULAR"
            className="text-sm px-4 py-1 text-blue-600"
            isSelectedClass="bg-blue-600 text-white"
          />
          <Tab
            key="new"
            title="NEW"
            className="text-sm px-4 py-1 text-green-600"
            isSelectedClass="bg-green-600 text-white"
          />
          <Tab
            key="sale"
            title="SALE"
            className="text-sm px-4 py-1 text-red-600"
            isSelectedClass="bg-red-600 text-white"
          />
        </Tabs>

        <Select
          label="Sort by"
          placeholder="Select"
          className="max-w-xs"
          onChange={(e) => setSortOrder(e.target.value)}
          defaultValue=""
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
              id={product.productName.toLowerCase()}
            >
              <div className="relative mb-4">
                <Image
                  isBlurred
                  src={getImagePath(product.productCode)}
                  alt={product.productName}
                  className="w-full h-56 object-cover rounded-lg"
                />
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
                        ${getDiscountedPrice(product.buyPrice, 25)}
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
                    <div className="flex items-center">
                      <Image
                        src={getImagePath(item.productCode)}
                        alt={item.productName}
                        width={100}
                        height={100}
                        className="mr-4"
                      />
                      <div>
                        <p className="font-bold">{item.productName}</p>
                        {item.keywords.includes("sale") ? (
                          <p className="text-gray-700">
                            <span className="line-through mr-2">
                              ${item.buyPrice}
                            </span>
                            <span className="text-red-500">
                              ${getDiscountedPrice(item.buyPrice, 25)}
                            </span>
                          </p>
                        ) : (
                          <p className="text-gray-700">${item.buyPrice}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <select
                        className="p-2 border rounded"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productCode,
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {[1, 2, 3, 4, 5].map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
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
                <div className="text-lg font-bold ">
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
      <Modal
        isOpen={isReceiptOpen}
        onOpenChange={(open) => {
          if (!open) resetCart();
          onReceiptOpenChange(open);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Receipt
              </ModalHeader>
              <ModalBody>
                <p className="text-lg text-center">
                  Thank you for your purchase!
                </p>
                <Card className="p-4 bg-gray-100 rounded-lg shadow">
                  {cartItems.map((item) => (
                    <div
                      key={item.productCode}
                      className="flex justify-between items-center mb-4"
                    >
                      <div className="flex items-center">
                        <Image
                          src={getImagePath(item.productCode)}
                          alt={item.productName}
                          width={80}
                          height={80}
                          className="mr-4"
                        />
                        <div>
                          <p className="font-bold">{item.productName}</p>
                          {item.keywords.includes("sale") ? (
                            <p className="text-gray-700">
                              <span className="line-through mr-2">
                                ${item.buyPrice}
                              </span>
                              <span className="text-red-500">
                                ${getDiscountedPrice(item.buyPrice, 25)}
                              </span>
                            </p>
                          ) : (
                            <p className="text-gray-700">${item.buyPrice}</p>
                          )}
                        </div>
                      </div>
                      <div className="bg-blue-400 p-2 rounded text-center w-8 h-8 flex items-center justify-center text-white">
                        {item.quantity}
                      </div>
                    </div>
                  ))}
                </Card>
              </ModalBody>
              <ModalFooter className="flex justify-between items-center">
                <div className="text-lg font-bold ">
                  Total: ${totalAmount.toFixed(2)}
                </div>
                <Button
                  color="primary"
                  onPress={() => {
                    resetCart();
                  }}
                >
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
