"use strict";
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
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../Config/sql.config");
class Connection {
    // private pool: Promise <mssql.ConnectionPool>
    // constructor(){
    //     this.pool = this.getConnection()
    // }
    // getConnection(): Promise<mssql.ConnectionPool>{
    //     const pool = mssql.connect(sqlConfig) as Promise<mssql.ConnectionPool>;
    //     return pool
    // }
    // createRequest(request: mssql.Request, data:{[c:string | number]:string | number}){
    //     const keys = Object.keys(data)
    //     keys.map((keyName)=>{
    //         const keyValue = data[keyName]
    //         request.input(keyName, keyValue)
    //     })
    //     return request
    // }
    // async execute(procedureName: string, data:{[c:string | number]: string| number} = {}){
    //     let pool = await this.pool
    //     let request = (await pool.request()) as mssql.Request
    //     request = this.createRequest(request, data)
    //     const result = await request.execute(procedureName)
    //     return result
    // }
    // async query(query:string){
    //     const result = (await this.pool).request().query(query)
    //     return result
    // }
    static query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = mssql_1.default.connect(sql_config_1.sqlConfig);
            let request = ((yield pool).request().query(query));
            return request;
        });
    }
    static execute(procedureName, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = mssql_1.default.connect(sql_config_1.sqlConfig);
            let request = ((yield pool).request());
            for (let key in data) {
                request.input(key, data[key]);
            }
            const result = yield request.execute(procedureName);
            return result;
        });
    }
}
exports.default = Connection;
