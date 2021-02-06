import * as fs from "fs-extra";
import { FileLoadResult } from "./types";

export async function processFolder(
  folder: string,
  callback: (current: number, total: number) => void
): Promise<FileLoadResult> {
  console.log("in process folder");
  try {
  } catch (e) {
    console.log(e, "wtf");
  }

  callback(0, 0);

  // If the folder does not exist, return empty
  if (!(await fs.pathExists(folder))) {
    return {
      files: [],
      fileErrorCount: 0,
    };
  }

  const fileErrorCount = 0;
  // const results = await fs.readdir(folder, { withFileTypes: true });
  // const slpFiles = results.filter(
  //   (dirent) => dirent.isFile() && path.extname(dirent.name) === ".slp"
  // );
  // const total = slpFiles.length;

  // let fileErrorCount = 0;
  // let fileValidCount = 0;
  // callback(0, total);

  // const process = async (path: string) => {
  //   return new Promise<FileResult | null>((resolve) => {
  //     setImmediate(async () => {
  //       try {
  //         const res = await loadFile(path);
  //         fileValidCount += 1;
  //         callback(fileValidCount, total);
  //         resolve(res);
  //       } catch (err) {
  //         fileErrorCount += 1;
  //         resolve(null);
  //       }
  //     });
  //   });
  // };

  // const slpGames = (
  //   await Promise.all(
  //     slpFiles.map((dirent) => {
  //       const fullPath = path.resolve(folder, dirent.name);
  //       return process(fullPath);
  //     })
  //   )
  // ).filter((g) => g !== null) as FileResult[];

  // // Indicate that loading is complete
  // callback(total, total);

  return {
    files: [],
    fileErrorCount,
  };
}
