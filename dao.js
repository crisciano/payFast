const sqlite = require('sqlite3').verbose();
const base = 'http://localhost:3000';

class AppDao {
    
    constructor(dbPath){
        this.db = new sqlite.Database(dbPath, (err)=>{
            if(err) console.log('Erro database', err)
            else console.log('Connect ok database')
        });
    }

    CreateTable(table){

        const sql = `CREATE TABLE IF NOT EXISTS ${table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            forma_de_pagamento TEXT, 
            valor decimal(10,2), 
            moeda TEXT, 
            descricao TEXT,
            status TEXT,
            data TEXT)`;

        console.log(`Create table -> ${table}`);

        return this.db.run(sql);
    }

    // InsertTable(table, parms = [], fn){

    //     return this.db.run(`INSERT INTO ${table} 
    //         (forma_de_pagamento, valor, moeda, descricao, status, data)
    //         VALUES (?, ?, ?, ?, ?, ?)`, parms, function(err) {
    //             if(err) return err.message;
    //             fn(this.lastID);
    //         }
    //     );
    //     // return parms;
    // }
    InsertTable(table, params = [], fn){

        var sql = `INSERT INTO ${table} 
        (forma_de_pagamento, valor, moeda, descricao, status, data)
        VALUES (?, ?, ?, ?, ?, ?)`;

        return new Promise( (resolve, reject) =>{
            
            this.db.run(sql, params, function(err) {
                if(err) return reject(err);
                // params.id = this.lastID
                // fn(this.lastID);
                params.id = this.lastID;

                var response = {
                    pagamento: params,
                    links : [
                        { href : `${base}/pagamentos/pagamento/${params.id}`, rel:'CONFIRMAR', method: 'PUT' },
                        { href : `${base}/pagamentos/pagamento/${params.id}`, rel:'DELETE', method: 'DELETE' }
                    ]
                }
                console.log(response);
                return resolve(response);
            });

        })
    }

    
    ListTable(table){
        console.log(`List table ${table}`);
        
        return new Promise((resolve, reject)=>{
            this.db.all(`SELECT * FROM ${table}`, [], (err, rows)=>{
                if(err) return reject(err);
                return resolve(rows);
            });
        })
    }

    ListPagamento(table, id){
        console.log(`List pagamento ${id}`);

        var sql = `SELECT * FROM ${table} WHERE id = ?`;

        return new Promise((resolve, reject)=>{
            this.db.get(sql, [id], function (err, row){
                if(err) return reject(err);
                return resolve(row);
            });
        })
    }
    
    DeletePagamento(table, id){
        console.log(`Delele ${table} id -> ${id}`);

        return new Promise((resolve, reject) =>{
            this.db.run(`DELETE FROM ${table} WHERE id = ?`, [id], function(err){
                if(err) return reject(err);
                return resolve(id);
            });
        })
    }

    PutStatus(table, id){
        var status = "CONFIRMADO";
        var sql = `UPDATE ${table} SET status = ? where id = ?`; 

        return new Promise((resolve, reject)=>{
            this.db.run(sql, [status, id], function(err) {
                    if(err) return reject(err)
                    return resolve(status);
                });
        })
    }

    PutPagamento(table, ID, params = []){
        this.db.run(`UPDATE ${table} SET
            forma_de_pagamento = ?, 
            valor = ?, 
            moeda = ?, 
            descricao = ?
        WHERE id = ${ID}`, params)

        return params;
    } 

    CloseConnection(){
        console.log('Close connection');
        this.db.close();
    }
}

module.exports = AppDao;