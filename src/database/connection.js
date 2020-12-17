"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
// const connection = knex({
//     client: 'mssql',
//     connection: {  
//         user: 'avl',  
//         password: 'v3rd4d0s',  
//         server:'151.144.95.199\\IRIS_PRD',  
//         database: 'DB_ITURAN_APP_NCC',
//         port: 1433,
//         options: {
//             "enableArithAbort": true
//         },
//     },  
//     useNullAsDefault: true,
// });
var connection = knex_1.default({
    client: 'mssql',
    connection: {
        user: 'sa',
        password: 'ituran',
        server: 'localhost',
        database: 'APPITURAN',
        port: 1433,
        options: {
            "enableArithAbort": true
        },
    },
    useNullAsDefault: true,
});
exports.default = connection;
