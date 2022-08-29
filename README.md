# Setup Projeto:

-Baixar na máquina o node, versão mais atual
-Instalar yarn --> npm install -g yarn
-Testar se foi isntalado --> yarn -v
-Adicionar o express do node --> yarn add express 
-Baixar na máquina o docker
-Executar o comando de docker para criar um container de postgres --> docker run pgitalo POSTGRES_USER=root -e POSTGRES_PASSWORD=root 5432:5432 -d postgres 
-Iniciar o container --> docker start pgitalo
-Entrar no container para dar instruções sql e criar o banco local --> docker exec -it pgitalo bash
-Entrar no root --> psql -U root
-Criar uma database--> CREATE DATABASE sistemauepa
-Conectar na base de dados sistemauepa --> \c sistemauepa
-Copiar e colar esse backup de banco para criar localmente seu banco:
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

-Executar o projeto --> yarn start
-Baixar o insomnia e testar todas requisiçoes do servidor, criando rotas. O servidor será startado na porta 3005, cuidado para já não ter outra na sua máquina e dar erro.


# Design pattern e arquiterura: Motivações de escolha:
Uso de controller para centralizar toda a regra de negócio relacionada à uma determinada entidade da aplicação.
Entidades da aplicação: Produto,Cliente,Venda,DetalheVenda.
Cada entidade terá seu próprio controller. Esse controller será uma classe que irá conter métodos e será instanciada.
Escolha de uso do Singleton,pois nesse caso só teremos uma instância dos objetos dentro da aplicação, todo mundo que for usar a classe do controller do client, por exemplo, use a mesma instância.
Repository Pattern para permitir a troca do banco de dados utilizado sem afetar o sistema como um todo, abstrai de maneira que o controller conheça diretamente um repository, e o repository que conhece o data source. Caso precise mudar, muda o repository e não a camada de controller. Controller precisa conhecer apenas a regra de negócio da aplicação e não a regra de implementação de banco de dados,por exemplo.









