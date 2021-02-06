import { processFolder, FileLoadResult } from "common/replayBrowser";

export async function processReplayFolder(
  folder: string,
  callback: (current: number, total: number) => void
): Promise<FileLoadResult> {
  console.log("please");
  return processFolder(folder, callback);
}
