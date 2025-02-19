const { nativeImage, Menu } = require("electron");
const { app, BrowserWindow,  ipcMain, Tray } = require("electron/main");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    frame: true, // false: ウィンドウのフレームを非表示
    transparent: true,
    skipTaskbar: false, // true: タスクバーに表示しない
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
    const img = nativeImage.createFromPath('./img/icon.png');
    let tray = new Tray(img);
    tray.setToolTip('Clock');
    tray.setContextMenu(Menu.buildFromTemplate([
        {label: 'Quit', role: 'quit'}
    ]));
    createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
