import { EventEmitter } from 'events';
import { createServer, IncomingMessage, OutgoingMessage, Server } from 'http';
import { GameState } from 'csgo-gsi-types';

export class CSGORP extends EventEmitter {
    private port: number;
    private token: string | null;
    private httpServer: Server;
    public gamestate: GameState;

    constructor(port: number, token: string | null) {
        super();

        this.port = port;
        this.token = token;

        this.httpServer = createServer(this.handleRequest.bind(this));
        this.httpServer.listen(port);

        this.gamestate = <GameState> {};
    }

    private handleRequest(req: IncomingMessage, res: OutgoingMessage): void {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            this.gamestate = <GameState>JSON.parse(body);
            this.emit('data', this.gamestate);
        	res.end( '' );
        });
    }

    public die(): void {
        this.httpServer.close();
    }
}