import { display, rp } from '../display';
import size from 'filesize';
import { readFileSync } from 'fs';
import { totalmem, freemem } from 'os';

export class system extends display {
    private i: number = 0;
    private sys: Array<number> = [0, 0, 0, 0, 0, 0, 0];
    private values: Array<string> = ['"CPUUsage [%]"', '"CPUTemp [C]"', '"CPUPower [W]"', '"GPUUsage [%]"', '"GPUTemp [C]"', '"GPUPower [W]"'];
    private status: string = 'Playing Windows 10';
    private emoji: string | null = null;
    private largeImage: string = 'windows_logo';

    constructor(status?: string, emoji?: string | null, largeImage?: string) {
        super();
        if (status) this.status = status;
        if (emoji) this.emoji = emoji;
        if (largeImage) this.largeImage = largeImage;
    }

    private updateStats(): void {
        let text = readFileSync('./log.CSV').toString().split('\n');
        let key = text[0].split(',')
        let sys = text[text.length-2].split(',');
        for (let i = 0; i < 6; i++) {
            this.sys[i] = parseInt(sys[key.indexOf(this.values[i])]);
        }
        this.sys[6] = totalmem() - freemem();
    }

    public update(): rp {
        this.updateStats();
        let lineOne: string;
        if (this.i < 3) lineOne = `CPU ${this.sys[0]}% ${this.sys[1]}C ${this.sys[2]}W`
        else lineOne = `GPU ${this.sys[3]}% ${this.sys[4]}C ${this.sys[5]}W`

        let lineTwo: string = 'RAM ' + size(this.sys[6], { round: 1 }) + '/32 GB';

        (this.i > 6) ? this.i = 0 : this.i++;
        
        return <rp><unknown>{
            lineOne: lineOne,
            lineTwo: lineTwo,
            largeImage: this.largeImage,
            smallImage: 'null',
            emoji_name: this.emoji,
            emoji_id: null,
            status: this.status
        }
    }
}