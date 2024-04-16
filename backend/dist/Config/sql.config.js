"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
// import mssql from 'mssql'
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.DB_NAME);
exports.sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
// console.log(sqlConfig);
// let connect = async () =>{
//     let pool = await mssql.connect(sqlConfig)
//     if(pool.connected){
//         console.log("connected");
//         // let query = 'CREATE TABLE Users(user_id VARCHAR(100) NOT NULL, name VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, phone_number VARCHAR(15) NOT NULL UNIQUE, role VARCHAR(20), Password VARCHAR(200) NOT NULL, profile_image VARCHAR(200), location VARCHAR(150))'
//         let query2 = 'DROP TABLE Users'
//         let result = (await (await pool.connect()).query(query2)).rowsAffected
//         console.log(result);
//     }else{
//         console.log('not connected');
//     }
// }
// connect()
