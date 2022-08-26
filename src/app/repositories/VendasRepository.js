const db = require('../../database/index');


class VendasRepository{
//metodos de manipulacao do banco
async findAll(){

    const rows = await db.query(`SELECT * 
    FROM Venda
    ORDER BY codVenda
     `);
    return rows;
  }

  async findByCodVenda(codVenda){
    const [row] = await db.query(`SELECT * FROM Venda WHERE codVenda = $1 `,[codVenda]);
    return row;
  }

    async delete(codVenda){
      const deleteOp = await db.query(`DELETE FROM Venda 
      WHERE codVenda = $1

      `,[codVenda]);
      return deleteOp;
    }

   

    async create({
        codVenda,codCliente,dataVenda
    }){
        const [row] = await db.query(`INSERT INTO Venda(codVenda,codCliente,dataVenda) 
        VALUES($1,$2,$3) 
        RETURNING *
        `,[codVenda,codCliente,dataVenda]) //cria nova linha de registro

        return row;
    }




}

module.exports = new VendasRepository();