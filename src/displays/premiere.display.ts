import { display, rp } from '../display';

export class premiere extends display {
    constructor() {
        super();
    }
    
    public update(): rp {
        return <rp><unknown>{
            lineOne: 'lineOne',
            lineTwo: 'lineTwo',
            largeImage: 'premiere',
            smallImage: 'null',
            emoji_id: null,
            emoji_name: '📹',
        }
    }
}