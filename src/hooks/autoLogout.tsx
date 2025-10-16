import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

// const MAX_SESSION_TIME = 10 * 60 * 1000; // 10 minutos em ms

// const MAX_SESSION_TIME = 10 * 1000; // 10 segundos em ms

const MAX_SESSION_TIME = 2 * 24 * 60 * 60 * 1000; // 2 dias em milissegundos

export function useAutoLogout() {
  const { loginTimestamp, logout, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn || !loginTimestamp) return;

    const now = Date.now();
    const timePassed = now - loginTimestamp;

    if (timePassed > MAX_SESSION_TIME) {
      logout();
    } else {
      const timeout = setTimeout(() => {
        logout();
      }, MAX_SESSION_TIME - timePassed);

      return () => clearTimeout(timeout);
    }
  }, [loginTimestamp, isLoggedIn]);
}
