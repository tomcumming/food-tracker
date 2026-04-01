# Database

- Use indexedDB to store all our data.
- Isolate all the database logic into `db.ts`.
- Use a single, strongly types schema, reference that when we need to type
  utility functions etc.
- Add simple top level functions for accessing each object store.
- dont bother with joins, we will join in the accessing code.

## Schema

- `day-summary`
  - This is where we materialize the totals for each day.
  - fields:
    - `date` primary key, should be short date string aka `2026-01-01`.
    - `colories` number (not null)
    - `carbs` number (not null)
    - `alcohol` number (not null)
    - `finalised` bool (not null)
- `food-type`
  - fields
    - `id`: primary key `FoodId`
    - `name`: string (not null)
- `portion`
  - fields
    - `id`: primary key
    - `food`: `FoodId` (not null)
    - `desc`: string (not null)
    - `size`: number (not null) 
- `eaten`
  - primary-key: `date` and `food`
  - fields:
    - `date` primary key, should be short date string aka `2026-01-01`.
    - `food`: `FoodId` (not null)
    - `amount`: number (not null)
