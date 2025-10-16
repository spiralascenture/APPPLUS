import "@radix-ui/themes/styles.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { router } from "expo-router";

export default function Index() {
  const { isLoggedIn } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (isLoggedIn) {
      router.replace("/categories");
    } else {
      router.replace("/login");
    }
  }, [isReady, isLoggedIn]);

  return null;
}
