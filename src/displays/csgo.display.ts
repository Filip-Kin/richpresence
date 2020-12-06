import { GameState } from 'csgo-gsi-types';
import { CSGORP } from '../csgo';
import { display, rp } from '../display';

const MAP_NAMES: any = {
    'cs_office': 'Office',
    'de_dust2': 'Dust II',
    'de_nuke': 'Nuke',
    'de_cache': 'Cache'
}

export class csgo extends display {
    private csgorp: CSGORP;
    private map: string = 'csgo';
    private team: string | null = null;
    private score: string | null = null;
    private stats: string | null = null;

    constructor(csgorp: CSGORP) {
        super();
        this.csgorp = csgorp;
        this.csgorp.addListener('data', data => this.datalistner(data));
    }

    private datalistner(data: GameState): void {
        console.log(data);
        this.map = data.map?.name || 'csgo';
        this.team = data.player?.team || null;
        this.score = (this.team === 'CT') ? (data.map?.team_ct.score + ':' + data.map?.team_t.score) : (data.map?.team_t.score + ':' + data.map?.team_ct.score);
        this.stats = (this.map !== 'csgo') ? (data.player?.match_stats.kills + 'K ' + data.player?.match_stats.assists + 'A ' + data.player?.match_stats.deaths + 'D ' + data.player?.match_stats.mvps + ' MVPs') : null;
    }

    public update(): rp {
        return <rp><unknown>{
            lineOne: (this.map === 'csgo') ? 'Not playing a match yet' : 'Playing ' + ((MAP_NAMES[this.map])?MAP_NAMES[this.map]:this.map) + ' ' + this.score,
            lineTwo: this.stats || 'but it\s probably gonna be office',
            largeImage: this.map,
            smallImage: 'null',
            emoji_id: '741542785814888499',
            emoji_name: null,
            status: 'Playing CSGO'
        }
    }
}
