import { CSGORP } from './csgo';
import { appList } from './appList';
import { rp } from './display';
import { premiere } from './displays/premiere.display';
import { csgo } from './displays/csgo.display';
import { system } from './displays/system.display';

import { readFileSync } from 'fs';
const fetch = require('node-fetch');

const client = require('discord-rich-presence')('777555968438697984');
const TOKEN = readFileSync('./token');

const csgorp = new CSGORP(3000, null);

const displayManagers: any = {
    'Adobe premiere pro.exe': new premiere(),
    'csgo.exe': new csgo(csgorp),
    'GTA5.exe': new system('Playing GTA V', '👮', 'gta5'),
    '\*': new system('Dead inside')
};

const update = (): void => {
    appList.list().then((apps: Array<string>): void => {
        let currentApp = '\*';
        for (let a of apps) {
            if (Object.keys(displayManagers).includes(a)) {
                currentApp = a;
            }
        }

        console.log(currentApp);

        let displayOut: rp = displayManagers[currentApp].update();
        let statusOut = {
            custom_status: {
                text: '',
                emoji_name: '',
                emoji_id: ''
            }
        }

        if (displayOut.status !== null) statusOut.custom_status.text = displayOut.status;
        if (displayOut.emoji_name !== null) statusOut.custom_status.emoji_name = displayOut.emoji_name;
        if (displayOut.emoji_id !== null) statusOut.custom_status.emoji_id = displayOut.emoji_id;
        
        client.updatePresence({
            state: displayOut.lineTwo,
            details: displayOut.lineOne,
            largeImageKey: displayOut.largeImage,
            smallImageKey: displayOut.smallImage,
            instance: true,
        });

        console.log(displayOut);

        if (statusOut.custom_status.text !== '') {
            fetch('https://discord.com/api/v8/users/@me/settings', {
                method: 'PATCH',
                headers: {
                    authorization: TOKEN,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(statusOut)
            });
        }
    });
}

update();
setInterval(update, 1e3);