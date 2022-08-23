const { Client } = require('pg');

const client = new Client({
    host:'localhost',
    port:5432,
    user:'root',
    password:'root',
    database:'sistemauepa',
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
})

client.connect();

exports.query = async (query,values) => { //RECEBO AS QUERYS E VALORES DO schema.sql aqui
    const {rows} = await client.query(query,values);
    return rows;
}