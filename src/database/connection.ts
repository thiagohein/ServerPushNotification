import knex from 'knex';



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




const connection = knex({
    client: 'mssql',
    connection: {  
        user: 'sa',  
        password: 'ituran',  
        server:'localhost',  
        database: 'APPITURAN',
        port: 1433,
        options: {
            "enableArithAbort": true
        },
    },  
   
    useNullAsDefault: true,
});

export default connection;