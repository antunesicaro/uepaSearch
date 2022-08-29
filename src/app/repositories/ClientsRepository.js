const db = require('../../database/index');


class ClientsRepository{
//metodos de manipulacao do banco
async findAll(){

    const rows = await db.query(`SELECT * 
    FROM Cliente
    ORDER BY codCliente
     `);
    return rows;
  }

  async findByCodCli(codCliente){
    const [row] = await db.query(`SELECT * FROM Cliente WHERE codCliente = $1 `,[codCliente]);
    return row;
  }

    async findByEmail(email){
        const [row] = await db.query(`SELECT * FROM Cliente WHERE email = $1`,[email]);
        return row;
    }

    async delete(codCliente){
      const deleteOp = await db.query(`DELETE FROM Cliente 
      WHERE codCliente = $1

      `,[codCliente]);
      
      return deleteOp;
    }

    async update(codCliente,{
      cpf,nomeCliente,email,renda,classeSoc
    }){

      //db.query retorna um array, dai desestrutura pra ter acesso à priemira posição
      const [row] = await db.query(`
      UPDATE Cliente
      SET cpf = $1, nomeCliente = $2, email = $3, renda = $4, classe = $5
      WHERE codCliente = $6
      RETURNING *
      `,[cpf,nomeCliente,email,renda,classeSoc,codCliente]);      
      return row;
    }

    async create({
        codCliente,cpf,nomeCliente,email,renda,classeSoc 
    }){
        const [row] = await db.query(`INSERT INTO Cliente(codCliente,cpf,nomeCliente,email,renda,classe ) 
        VALUES($1,$2,$3,$4,$5,$6) 
        RETURNING *
        `,[codCliente,cpf,nomeCliente,email,renda,classeSoc]) //cria nova linha de registro

        return row;
    }

    


}

module.exports = new ClientsRepository();