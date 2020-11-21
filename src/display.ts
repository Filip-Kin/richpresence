export abstract class display {

    constructor() {
    }

    public abstract update(): rp

    public equals(b: display): boolean {
        return false;
    }
}


export interface rp {
    lineOne: string
    lineTwo: string
    largeImage: 'null' | 'windows_logo' | 'premiere' | 'csgo' | 'cs_office' | 'de_cache' | 'de_dust2' | 'de_inferno' | 'de_mirage' | 'de_nuke' | 'de_overpass' | 'de_train'
    smallImage: 'null' | 'windows_logo' | 'premiere' | 'csgo' | 'cs_office' | 'de_cache' | 'de_dust2' | 'de_inferno' | 'de_mirage' | 'de_nuke' | 'de_overpass' | 'de_train'
    emoji_name: string | null
    status: string
}