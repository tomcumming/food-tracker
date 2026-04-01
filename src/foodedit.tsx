import { useEffect, useState } from "preact/hooks";
import { getFoodType, saveFoodType, FoodId } from "./db";

export function FoodEditor({ id }: { id?: FoodId }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (id !== undefined) {
      getFoodType(id).then((food) => setName(food.name));
    }
  }, [id]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!name.trim()) return;
    await saveFoodType({ name: name.trim(), ...(id !== undefined && { id }) });
    location.hash = "#/";
  };

  return (
    <div class="p-4">
      <a href="#/" class="text-blue-600 underline">
        ← Back
      </a>
      <h1 class="text-2xl font-bold my-4">
        {id !== undefined ? "Edit Food Type" : "Add Food Type"}
      </h1>
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
            class="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder="e.g. Apple"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {id !== undefined ? "Save" : "Add"}
        </button>
      </form>
    </div>
  );
}
