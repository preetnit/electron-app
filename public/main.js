const { app, BrowserWindow, screen, Tray } = require('electron')

function createWindow () {
  
  let display = screen.getPrimaryDisplay();
  let { width, height } = display.workAreaSize

  const window = new BrowserWindow({
    title:"Agent Console",
    //alwaysOnTop: false,ORDER # 403-1466879-2909107

    width: 800,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule:true,
      enablePreferredSizeMode: true,
    },
    show: false
  })
    
  window.loadURL('https://solutions-stb.cloud.247-inc.net/index.html?agentId=test-default-nemo-user-ashwin');

    window.once('ready-to-show', () => {
      window.show()
    })

    
    const WinMin = new BrowserWindow({
      title:"Agent Console",
      width: 300,
      height: 200,
      maxHeight: 300,
      maxWidth: 200,
      minHeight: 300,
      minWidth: 200,
      x: width - 325,
      y: height - 200,
      show:false,
      alwaysOnTop: true,
      minimizable: false,
      movable: false,
      //resizable: false,
      fullscreenable: false,
    });

    WinMin.loadURL("https://solutions-stb.cloud.247-inc.net/index.html?agentId=test-default-nemo-user-ashwin")

    window.removeMenu(200,200)

    window.on('minimize',function(event){
      event.preventDefault();
      WinMin.show()
    });

     WinMin.on('minimize',function(event){
       window.show()
     });

    WinMin.on('maximize',function(event){
      WinMin.setMovable(false)
      WinMin.hide()
      window.show()
    });

    WinMin.on('close',function(event){
      event.preventDefault();
      WinMin.hide()
      window.show()
    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
