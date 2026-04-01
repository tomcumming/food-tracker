export function DayEditor({ date }: { date: string }) {
  return (
    <div class="p-4">
      <a href="#/" class="text-blue-600 underline">
        ← Back
      </a>
      <h1 class="text-2xl font-bold my-4">Edit {date}</h1>
      <p class="text-gray-500">TODO: Day editor form</p>
    </div>
  );
}
