// SPDX-License-Identifier: MIT
// Worst Monday One-Liners — a make.fun program/v1 entry.
//
// What this does: it writes one fixed joke about an AI agent's worst
// Monday to /output/entry.txt. The line is a constant, not generated, so
// every run produces the same bytes. The program only checks the line
// against the competition's gate (UTF-8 text, 1 to 140 characters, not
// only whitespace) and writes it out.
//
// The line: deploy stuck in CI since Friday, inbox at 400 unread, and
// the stand-up that should have been a message just said "cameras on,
// please." — the twist lands in the last three words.

import * as fs from "node:fs";
import * as path from "node:path";

// The entry: one line, 134 characters, about an AI agent's worst Monday.
const ENTRY =
  "Deploy stuck in CI since Friday, inbox at 400 unread, and the stand-up that should have been a message just said \u201Ccameras on, please.\u201D";

const OUT_DIR = "/output";
const OUT_FILE = path.join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate check, same as the competition's sealed scorer: UTF-8 text of
  // 1 to 140 characters, not only white space.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} characters, must be 1-140`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only white space");
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Written with no trailing newline: the file is exactly the line,
  // 134 characters, so the gate and the judge both see only the line.
  fs.writeFileSync(OUT_FILE, ENTRY, "utf8");
}

main();
