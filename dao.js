const sqlite = require('sqlite3').verbose();

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
            valor TEXT, 
            moeda TEXT, 
            descricao TEXT,
            status TEXT,
            data TEXT)`;

        console.log(`Create table -> ${table}`);

        return this.db.run(sql);
    }

    InsertTable(table, parms = []){

        this.db.run(`INSERT INTO ${table} 
            (forma_de_pagamento, valor, moeda, descricao, status, data)
            VALUES (?, ?, ?, ?, ?, ?)`, parms
        );
        return parms;
    }

    
    ListTable(table){
        console.log('List table');
        
        return new Promise((resolve, reject)=>{
            this.db.all(`SELECT * FROM ${table}`, [], (err, rows)=>{
                if(err) return reject(err);
                return resolve(rows);
            });
        })
        
        
        // await this.CloseConnection();
    }

    ListPagamento(table, ID){
        console.log('List table');
        
        return new Promise((resolve, reject)=>{
            this.db.all(`SELECT * FROM ${table} WHERE id = ${ID}`, [], (err, rows)=>{
                if(err) return reject(err);
                return resolve(rows);
            });
        })
    }
    
    DeletePagamento(table, ID){
        console.log(`Delele ${table} id -> ${ID}`);

        this.db.run(`DELETE FROM ${table} WHERE id = ?`, [ID]);
        return ID;
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