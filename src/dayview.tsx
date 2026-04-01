import { useEffect, useState } from "preact/hooks";
import { getDaySummaries, setDay } from "./db";

export function DayEditor({ date }: { date: string }) {
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [alcohol, setAlcohol] = useState(0);
  const [finalised, setFinalised] = useState(false);

  useEffect(() => {
    getDaySummaries().then((summaries) => {
      const existing = summaries.find((s) => s.date === date);
      if (existing) {
        setCalories(existing.calories);
        setCarbs(existing.carbs);
        setAlcohol(existing.alcohol);
        setFinalised(existing.finalised);
      }
    });
  }, [date]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    await setDay({ date, calories, carbs, alcohol, finalised });
    location.hash = "#/";
  };

  return (
    <div class="p-4">
      <a href="#/" class="text-blue-600 underline">
        ← Back
      </a>
      <h1 class="text-2xl font-bold my-4">Edit {date}</h1>
      <h2 class="text-lg font-semibold text-gray-500 mb-2">Test Editor</h2>
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Calories</label>
          <input
            type="number"
            value={calories}
            onInput={(e) =>
              setCalories(Number((e.target as HTMLInputElement).value))
            }
            class="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Carbs (g)</label>
          <input
            type="number"
            value={carbs}
            onInput={(e) =>
              setCarbs(Number((e.target as HTMLInputElement).value))
            }
            class="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Alcohol</label>
          <input
            type="number"
            value={alcohol}
            onInput={(e) =>
              setAlcohol(Number((e.target as HTMLInputElement).value))
            }
            class="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            id="finalised"
            checked={finalised}
            onChange={(e) =>
              setFinalised((e.target as HTMLInputElement).checked)
            }
          />
          <label for="finalised" class="text-sm font-medium">
            Finalised
          </label>
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
