"use client"
import { useAuth } from "../../auth/AuthContext"; // ✅ Relative import (Recommended)

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user]);

  if (!user) return <p>Redirecting to login...</p>;

  return <p>Proceed to checkout...</p>;
}
