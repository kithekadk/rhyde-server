"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const user_router_1 = __importDefault(require("./Routes/user.router"));
const auth_router_1 = __importDefault(require("./Routes/auth.router"));
const trips_router_1 = __importDefault(require("./Routes/trips.router"));
const vehicles_router_1 = __importDefault(require("./Routes/vehicles.router"));
const app = (0, express_1.default)();
// websockets
const server = http_1.default.createServer(express_1.default);
const wss = new ws_1.default.Server({ server });
wss.on('connection', function connection(ws) {
    // const userId = 
    ws.on('message', function incoming(data, isBinary) {
        wss.clients.forEach(function each(client) {
            return __awaiter(this, void 0, void 0, function* () {
                if (client !== ws && client.readyState === ws_1.default.OPEN) {
                    console.log(data);
                    // const pool = await mssql.connect(sqlConfig)
                    // const result = (await pool.request()
                    // .input('data', data)
                    // .input('isBinary', isBinary)
                    // .execute('insertChats')).rowsAffected
                    // console.log(result);
                    client.send(data, { binary: isBinary });
                }
            });
        });
    });
});
server.listen(4101, () => {
    console.log('websocket server running on port 4101');
});
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use('/users', user_router_1.default);
app.use('/auth', auth_router_1.default);
app.use('/trips', trips_router_1.default);
app.use('/vehicles', vehicles_router_1.default);
app.use((error, req, res, next) => {
    res.json({
        message: error.message
    });
});
let port = 4100;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// supertest
exports.default = app;
