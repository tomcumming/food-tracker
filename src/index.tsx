import { render } from "preact";
import { useRoute } from "./router";
import { SummaryTable } from "./summary";
import { DayEditor } from "./dayview";
import { FoodEditor } from "./foodedit";

function App() {
  const route = useRoute();

  if (route.page === "day") {
    return <DayEditor date={route.date} />;
  }
  if (route.page === "food") {
    return <FoodEditor id={route.id} />;
  }
  return <SummaryTable />;
}

render(<App />, document.getElementById("app")!);
