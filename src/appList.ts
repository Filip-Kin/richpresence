const tasklist = require('tasklist');

export class appList {
    public static FILTER_PROCESSES: Array<string> = [
        'csrss.exe',
        'winlogon.exe',
        'fontdrvhost.exe',
        'dwm.exe',
        'NVDisplay.Container.exe',
        'rundll32.exe',
        'Corsair.Service.CpuIdRemote64.exe',
        'conhost.exe',
        'Corsair.Service.DisplayAdapter.exe',
        'nvcontainer.exe',
        'sihost.exe',
        'svchost.exe',
        'taskhostw.exe',
        'ctfmon.exe',
        'StartMenuExperienceHost.exe',
        'RuntimeBroker.exe',
        'SearchApp.exe',
        'YourPhone.exe',
        'SettingSyncHost.exe',
        'nvsphelper64.exe',
        'NVIDIA Share.exe',
        'ShellExperienceHost.exe',
        'NVIDIA Web Helper.exe',
        'nvsmartmaxapp64.exe',
        'nvsmartmaxapp.exe',
        'TextInputHost.exe',
        'dllhost.exe',
        'ApplicationFrameHost.exe',
        'WinStore.App.exe',
        'AdobeNotificationClient.exe',
        'SystemSettings.exe',
        'UserOOBEBroker.exe',
        'Calculator.exe',
        'Microsoft.Photos.exe',
        'Video.UI.exe',
        'GameBarFTServer.exe',
        'CompPkgSrv.exe',
        'AdobeIPCBroker.exe',
        'CCLibrary.exe',
        'CCXProcess.exe',
        'steamwebhelper.exe',
        'adb.exe',
        'GameBar.exe',
        'CodeHelper.exe',
        'wakatime-cli.exe',
        'tasklist.exe',
        'crashpad_handler.exe',
        'dynamiclinkmanager.exe',
        'TeamProjectsLocalHub.exe',
        'smartscreen.exe',
        'GameBarPresenceWriter.exe',
        'GameOverlayUI.exe',
    ]

    public static list(): Promise<Array<string>> {
        return new Promise(resolve => {
            let apps: Array<string> = [];
            tasklist().then((tasks: any) => {
                tasks.forEach((task: any) => {
                    if (task.sessionName === 'Services' || this.FILTER_PROCESSES.includes(task.imageName)) return;
                    if (!apps.includes(task.imageName)) apps.push(task.imageName);
                });
                resolve(apps);
            });
        })
    }
}