"use client";
import { useEffect, useState } from "react";
import { Card, Tabs, Tab, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { getSession, clearSession } from "../../public/session";

export default function UserPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const sessionUser = getSession();
    if (!sessionUser) {
      router.push("/");
      return;
    }
    setUser(sessionUser);

    const fetchPurchases = async () => {
      try {
        const res = await fetch("/api/user/purchases", {
          headers: {
            "user-id": sessionUser.id,
          },
        });
        const data = await res.json();
        setPurchases(data.purchases);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, [router]);

  const handleLogout = () => {
    clearSession();
    setUser(null);
    router.push("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user ? user.name : "User"}
      </h1>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={() => router.push("/")}>Browse now</Button>
      <Tabs aria-label="User Tabs" fullWidth size="md" selectedKey="purchases">
        <Tab key="purchases" title="Purchased Items">
          <div>
            {purchases.map((purchase) => (
              <Card key={purchase.id} className="mb-4">
                <p>{purchase.productName}</p>
              </Card>
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
