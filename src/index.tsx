import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import { getDaySummaries, setDay, DaySummary } from "./db";

async function seedTestData() {
  const existing = await getDaySummaries();
  if (existing.length > 0) return;

  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    await setDay({
      date: date.toISOString().slice(0, 10),
      calories: Math.floor(Math.random() * 1000) + 1500,
      carbs: Math.floor(Math.random() * 150) + 100,
      alcohol: Math.floor(Math.random() * 5),
      finalised: i > 5,
    });
  }
}

function SummaryTable() {
  const [summaries, setSummaries] = useState<DaySummary[]>([]);

  useEffect(() => {
    seedTestData()
      .then(() => getDaySummaries())
      .then(setSummaries);
  }, []);

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Food Tracker</h1>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="text-left p-2">Date</th>
            <th class="text-right p-2">Cals</th>
            <th class="text-right p-2">Carbs</th>
            <th class="text-right p-2">Alcohol</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((s) => (
            <tr key={s.date} class="border-b border-gray-200">
              <td class="p-2">{s.date}</td>
              <td class="text-right p-2">{s.calories}</td>
              <td class="text-right p-2">{s.carbs}g</td>
              <td class="text-right p-2">{s.alcohol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

render(<SummaryTable />, document.getElementById("app")!);
