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
            descricao TEXT)`;

        console.log(`Create table -> ${table}`);

        return this.db.run(sql);
    }

    InsertTable(table, parms = []){

        this.db.run(`INSERT INTO ${table} 
            (forma_de_pagamento, valor, moeda, descricao)
            VALUES (?, ?, ?, ?)`, parms
        );
    }

    ListTable(table){

        console.log('List table');
        
        this.db.each(`SELECT * FROM ${table}`, function(err, row) {
            if(err) console.log(err.message);
            console.log(row);
        });
    }

    DeletePagamento(table, ID){
        this.db.run(`DELETE FROM ${table} WHERE id = ?`, [ID]);
    }

    // db.close();
    
}

module.exports = AppDao;