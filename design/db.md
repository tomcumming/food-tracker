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
  - Exposed functions:
    - `getDaySummaries(upto?: Date)`
      - Should return 1 page of rows with the newest entry being the `upto`
        field, else return the latest entries.
    - `setDay(data: ...)`
