"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const SESSION_KEY = "odyssey-authenticated";

export function clearSession() {
  window.sessionStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(SESSION_KEY);
  document.cookie = `${SESSION_KEY}=; path=/; max-age=0; samesite=lax`;
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // Stage URLs change with history.replaceState. Keep the questionnaire mounted
  // when moving between protected routes so its answers and timers survive.
  const accessScope = pathname === "/" ? "login" : "protected";
  const [checkedScope, setCheckedScope] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = () => {
      const authenticated = window.sessionStorage.getItem(SESSION_KEY) === "true";
      if (!authenticated) {
        clearSession();
        if (pathname !== "/") {
          setCheckedScope(null);
          router.replace("/");
          return;
        }
      } else {
        // Refresh the session cookie without giving it a persistent expiry.
        document.cookie = `${SESSION_KEY}=session; path=/; samesite=lax`;
        if (pathname === "/") {
          setCheckedScope(null);
          router.replace("/landing");
          return;
        }
      }
      setCheckedScope(accessScope);
    };

    checkSession();
    // Recheck pages restored from the browser's back/forward cache, too.
    window.addEventListener("pageshow", checkSession);
    return () => window.removeEventListener("pageshow", checkSession);
  }, [pathname, accessScope, router]);

  return checkedScope === accessScope ? children : null;
}
