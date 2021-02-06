import fastq from "fastq";
import { watch, FSWatcher } from "chokidar";
import electronSettings from "electron-settings";
import { ipcMain } from "electron-better-ipc";

class ReplayProcessor {
  queue: fastq.queue;
  watcher: FSWatcher;
  removeListener: () => void;
  constructor() {
    this.queue = fastq(worker, 1);
    this.watcher = watch("", {
      depth: 1,
    });
    this.removeListener = ipcMain.answerRenderer("database", (bleh: string) => {
      console.log(bleh);
    });
  }

  async updateReplayDir() {
    const rootSlpPath = electronSettings.getSync("settings.rootSlpPath");
    if (!rootSlpPath) {
      console.log("Error: rootSlpPath does not exist!");
      return;
    } else {
      await this.watcher.close();
      this.watcher.add(String(rootSlpPath));
      this.watcher.on("add", (path) => {
        console.log("pushing ", path, " to queue");
        this.queue.push(path, function (err, result) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("just processed file/path: ", result);
        });
      });
    }
  }
}

function worker(slpPath: string, cb: fastq.done) {
  console.log("doing async processing...");
  // await processReplay(slpPath);
  cb(null, slpPath);
  // const rootSlpPath = electronSettings.getSync("settings.rootSlpPath");
  // if (!rootSlpPath) {
  //   return;
  // }
}

export { ReplayProcessor };
