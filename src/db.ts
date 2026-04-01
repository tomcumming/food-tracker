const DB_NAME = "food-tracker";
const DB_VERSION = 1;

const PAGE_SIZE = 30;

export interface DaySummary {
  date: string;
  calories: number;
  carbs: number;
  alcohol: number;
}

export interface Schema {
  "day-summary": DaySummary;
}

type StoreName = keyof Schema;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("day-summary")) {
        db.createObjectStore("day-summary", { keyPath: "date" });
      }
    };
  });
}

function getStore(
  db: IDBDatabase,
  name: StoreName,
  mode: IDBTransactionMode,
): IDBObjectStore {
  return db.transaction(name, mode).objectStore(name);
}

export async function getDaySummaries(upto?: Date): Promise<DaySummary[]> {
  const db = await openDb();
  const store = getStore(db, "day-summary", "readonly");

  const upperBound = upto
    ? upto.toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  const range = IDBKeyRange.upperBound(upperBound, false);

  return new Promise((resolve, reject) => {
    const results: DaySummary[] = [];
    const request = store.openCursor(range, "prev");

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor && results.length < PAGE_SIZE) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
  });
}

export async function setDay(data: DaySummary): Promise<void> {
  const db = await openDb();
  const store = getStore(db, "day-summary", "readwrite");

  return new Promise((resolve, reject) => {
    const request = store.put(data);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
