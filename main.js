const { nativeImage, Menu } = require("electron");
const { app, BrowserWindow, ipcMain, Tray } = require("electron/main");
const path = require("node:path");
let tray = null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 430,
    height: 250,
    // width: 800,
    // height: 800,
    x: 0,
    y: 0,
    frame: false, // false: ウィンドウのフレームを非表示
    transparent: true, // frameがfalseのとき背景を透過する
    skipTaskbar: true, // true: タスクバーに表示しない
    resizable: false,
    minimizable: false,
    maximizable: false,
    icon: "img/icon.ico",
    // alwaysOnTop: true, // true: 常に最前面に表示
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
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

app.on('ready', () => {
  const img = nativeImage.createFromPath("img/icon.ico");
  tray = new Tray(img);
  tray.setToolTip("Persona Calendar");
  tray.setContextMenu(
    Menu.buildFromTemplate([{ label: "Quit", role: "quit" }])
  );
});
