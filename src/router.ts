import { useEffect, useState } from "preact/hooks";

export type Route = { page: "summary" } | { page: "day"; date: string };

function parseRoute(): Route {
  const url = new URL(location.hash.slice(1) || "/", location.origin);
  const parts = url.pathname.slice(1).split("/").filter(Boolean);

  if (parts[0] === "day" && parts[1]) {
    return { page: "day", date: parts[1] };
  }
  return { page: "summary" };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseRoute);

  useEffect(() => {
    const handler = () => setRoute(parseRoute());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return route;
}
