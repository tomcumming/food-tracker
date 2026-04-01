import { spawn } from "child_process";

spawn(
  "esbuild",
  [
    "src/index.tsx",
    "--bundle",
    "--outfile=dist/index.js",
    "--servedir=dist",
    "--serve",
  ],
  { stdio: "inherit" },
);
spawn(
  "npx",
  [
    "--",
    "tailwindcss",
    "-i",
    "src/index.css",
    "-o",
    "dist/index.css",
    "--watch",
  ],
  { stdio: "inherit" },
);
