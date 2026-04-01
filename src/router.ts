import { useEffect, useState } from "preact/hooks";

export interface Route {
  page: "summary" | "day";
  date?: string;
}

function parseHash(): Route {
  const hash = location.hash.slice(1) || "/";
  const dayMatch = hash.match(/^\/day\/(\d{4}-\d{2}-\d{2})$/);
  if (dayMatch) {
    return { page: "day", date: dayMatch[1] };
  }
  return { page: "summary" };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const handler = () => setRoute(parseHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return route;
}
