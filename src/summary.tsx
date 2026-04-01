import { useEffect, useState } from "preact/hooks";
import { getDaySummaries, DaySummary } from "./db";

const PAGE_SIZE = 30;

function generateDates(count: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().slice(0, 10));
  }
  return dates;
}

export function SummaryTable() {
  const [summaryMap, setSummaryMap] = useState<Map<string, DaySummary>>(
    new Map(),
  );
  const dates = generateDates(PAGE_SIZE);

  useEffect(() => {
    getDaySummaries().then((summaries) => {
      setSummaryMap(new Map(summaries.map((s) => [s.date, s])));
    });
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
          {dates.map((date) => {
            const summary = summaryMap.get(date);
            const isEditable = !summary || !summary.finalised;

            return (
              <tr key={date} class="border-b border-gray-200">
                <td class="p-2">
                  {isEditable ? (
                    <a href={`#/day/${date}`} class="text-blue-600 underline">
                      {date}
                    </a>
                  ) : (
                    date
                  )}
                </td>
                <td class="text-right p-2">
                  {summary ? summary.calories : "-"}
                </td>
                <td class="text-right p-2">
                  {summary ? `${summary.carbs}g` : "-"}
                </td>
                <td class="text-right p-2">
                  {summary ? summary.alcohol : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
