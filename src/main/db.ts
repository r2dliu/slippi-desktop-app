import sqlite3 from "better-sqlite3";
import { ipcMain } from "electron-better-ipc";

const db = sqlite3("test.db", { verbose: console.log });
export function setupListeners() {
  console.log(db);
  const removeListener = ipcMain.answerRenderer(
    "get_replays",
    (bleh: string) => {
      console.log(bleh);
    }
  );
}
