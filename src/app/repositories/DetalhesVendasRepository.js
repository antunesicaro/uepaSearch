const db = require('../../database/index');


class DetalhesVendasRepository {
  //metodos de manipulacao do banco
  async findAll() {

    const rows = await db.query(`
    SELECT Venda.codVenda, Venda.codCliente, Venda.dataVenda, DetalheVenda.PRODUTO,
  DetalheVenda.qtdProduto, Produto.descricao, Produto.unidade, Produto.valorUnitario,
  (Produto.valorUnitario*DetalheVenda.qtdProduto) AS SubTotal
  FROM Venda LEFT JOIN
  (Produto RIGHT JOIN DetalheVenda ON Produto.codProduto=DetalheVenda.PRODUTO)
  ON Venda.codVenda=DetalheVenda.VENDA;

     `);
    return rows;
  }

  async listaUmProduto(codVenda) {
    const [row] = await db.query(`
    
	SELECT Venda.codVenda, Venda.codCliente, Venda.dataVenda, DetalheVenda.PRODUTO,
  DetalheVenda.qtdProduto, Produto.descricao, Produto.unidade, Produto.valorUnitario,
  (Produto.valorUnitario*DetalheVenda.qtdProduto) AS SubTotal
  FROM Venda LEFT JOIN
  (Produto RIGHT JOIN DetalheVenda ON Produto.codProduto=DetalheVenda.PRODUTO)
  ON Venda.codVenda=DetalheVenda.VENDA
  
  WHERE codVenda = $1

    `,[codVenda])

    return row;
  }

  async findByCodVenda(codVenda) {
    const [row] = await db.query(`SELECT * FROM Venda WHERE codVenda = $1 `, [codVenda]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`SELECT * FROM Cliente WHERE email = $1`, [email]);
    return row;
  }

  async delete(codCliente) {
    const deleteOp = await db.query(`DELETE FROM Cliente 
      WHERE codCliente = $1

      `, [codCliente]);

    return deleteOp;
  }

  async update(codCliente, {
    cpf, nomeCliente, email, renda, classe
  }) {

    //db.query retorna um array, dai desestrutura pra ter acesso à priemira posição
    const [row] = await db.query(`
      UPDATE Cliente
      SET cpf = $1, nomeCliente = $2, email = $3, renda = $4, classe = $5
      WHERE codCliente = $6
      RETURNING *
      `, [cpf, nomeCliente, email, renda, classe, codCliente]);
    return row;
  }

  async create({
    venda, produto, qtdProduto
  }) {
    const [row] = await db.query(`INSERT INTO DetalheVenda(venda,produto,qtdProduto) 
        VALUES($1,$2,$3) 
        RETURNING *
        `, [venda, produto, qtdProduto]) //cria nova linha de registro

    return row;
  }




}

module.exports = new DetalhesVendasRepository();