const db = require('../../database/index');


class ProdutosRepository{
//metodos de manipulacao do banco
async findAll(){

    const rows = await db.query(`SELECT * 
    FROM Produto
    ORDER BY codProduto
     `);
    return rows;
  }

  async findByCodProduto(codProduto){
    const [row] = await db.query(`SELECT * FROM Produto WHERE codProduto = $1 `,[codProduto]);
    return row;
  }

    async delete(codProduto){
      const deleteOp = await db.query(`DELETE FROM Produto 
      WHERE codProduto = $1

      `,[codProduto]);
      return deleteOp;
    }

    async update(codProduto,{
        unidade,descricao,valorUnitario,estoqueMinimo,qtdEstoque
    }){

      //db.query retorna um array, dai desestrutura pra ter acesso à priemira posição
      const [row] = await db.query(`
      UPDATE Produto
      SET unidade = $1, descricao = $2, valorUnitario = $3, estoqueMinimo = $4, qtdEstoque = $5
      WHERE codProduto = $6
      RETURNING *
      `,[unidade,descricao,valorUnitario,estoqueMinimo,qtdEstoque,codProduto]);      
      return row;
    }

    async create({
        codProduto,unidade,descricao,valorUnitario,estoqueMinimo,qtdEstoque
    }){
        const [row] = await db.query(`INSERT INTO Produto(codProduto,unidade,descricao,valorUnitario,estoqueMinimo,qtdEstoque) 
        VALUES($1,$2,$3,$4,$5,$6) 
        RETURNING *
        `,[codProduto,unidade,descricao,valorUnitario,estoqueMinimo,qtdEstoque]) //cria nova linha de registro

        return row;
    }




}

module.exports = new ProdutosRepository();