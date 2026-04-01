import { useEffect, useState } from "preact/hooks";
import { FoodId } from "./db";

export type Route =
  | { page: "summary" }
  | { page: "day"; date: string }
  | { page: "food"; id?: FoodId };

function parseRoute(): Route {
  const url = new URL(location.hash.slice(1) || "/", location.origin);
  const parts = url.pathname.slice(1).split("/").filter(Boolean);

  if (parts[0] === "day" && parts[1]) {
    return { page: "day", date: parts[1] };
  }
  if (parts[0] === "food") {
    const id = parts[1] ? (Number(parts[1]) as FoodId) : undefined;
    return { page: "food", id };
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
