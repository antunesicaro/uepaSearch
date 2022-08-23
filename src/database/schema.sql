CREATE DATABASE sistemauepa;


CREATE TABLE IF NOT EXISTS Cliente(
codCliente BIGINT NOT NULL UNIQUE,
cpf VARCHAR(15),
nomeCliente VARCHAR NOT NULL,
email VARCHAR UNIQUE,
renda DECIMAL DEFAULT 0,
classe VARCHAR(55),

PRIMARY KEY(codCliente)
);


CREATE TABLE IF NOT EXISTS Venda(
codVenda BIGINT NOT NULL UNIQUE,
dataVenda date NOT NULL,
codCliente bigint,

primary key(codVenda),
FOREIGN KEY (codCliente) REFERENCES Cliente(codCliente)  
);


CREATE TABLE IF NOT EXISTS Produto(
codProduto BIGINT NOT NULL UNIQUE,
unidade varchar(55),
descricao varchar(55),
valorUnitario decimal,
estoqueMinimo decimal,
qtdEstoque decimal,

primary key(codProduto)
);

CREATE TABLE IF NOT EXISTS DetalheVenda(
venda bigint,
produto bigint,
qtdProduto decimal,

FOREIGN KEY (venda) REFERENCES Venda(codVenda),
FOREIGN KEY (produto) REFERENCES Produto(codProduto) 
);

