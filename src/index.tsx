import { render } from "preact";
import { useRoute } from "./router";
import { SummaryTable } from "./summary";
import { DayEditor } from "./dayview";

function App() {
  const route = useRoute();

  if (route.page === "day") {
    return <DayEditor date={route.date} />;
  }
  return <SummaryTable />;
}

render(<App />, document.getElementById("app")!);
