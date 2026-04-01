const DB_NAME = "food-tracker";
const DB_VERSION = 2;

const PAGE_SIZE = 30;

export type FoodId = string & { readonly __brand: "FoodId" };
export type PortionId = string & { readonly __brand: "PortionId" };

export interface DaySummary {
  date: string;
  calories: number;
  carbs: number;
  alcohol: number;
  finalised: boolean;
}

export interface FoodType {
  id: FoodId;
  name: string;
}

export interface Portion {
  id: PortionId;
  food: FoodId;
  desc: string;
  size: number;
}

export interface Eaten {
  date: string;
  food: FoodId;
  amount: number;
}

export interface Schema {
  "day-summary": DaySummary;
  "food-type": FoodType;
  portion: Portion;
  eaten: Eaten;
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
      if (!db.objectStoreNames.contains("food-type")) {
        db.createObjectStore("food-type", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("portion")) {
        db.createObjectStore("portion", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("eaten")) {
        db.createObjectStore("eaten", { keyPath: ["date", "food"] });
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

export async function getEatenForDay(date: string): Promise<Eaten[]> {
  const db = await openDb();
  const store = getStore(db, "eaten", "readonly");

  const range = IDBKeyRange.bound([date], [date, []]);

  return new Promise((resolve, reject) => {
    const results: Eaten[] = [];
    const request = store.openCursor(range);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
  });
}

export async function setEaten(
  date: string,
  food: FoodId,
  amount: number,
): Promise<void> {
  const db = await openDb();
  const store = getStore(db, "eaten", "readwrite");

  return new Promise((resolve, reject) => {
    const request = store.put({ date, food, amount });
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
