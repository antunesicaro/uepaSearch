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
-Com a api rodando no insominia ou postman, faça rotas e requisições para popular o banco. Sempre olhando para o routes.js,que é onde tem toda explicação das rotas.


# Design pattern e arquiterura: Motivações de escolha:
Uso de controller para centralizar toda a regra de negócio relacionada à uma determinada entidade da aplicação.
Entidades da aplicação: Produto,Cliente,Venda,DetalheVenda.
Cada entidade terá seu próprio controller. Esse controller será uma classe que irá conter métodos e será instanciada.
Escolha de uso do Singleton,pois nesse caso só teremos uma instância dos objetos dentro da aplicação, todo mundo que for usar a classe do controller do client, por exemplo, use a mesma instância.
Repository Pattern para permitir a troca do banco de dados utilizado sem afetar o sistema como um todo, abstrai de maneira que o controller conheça diretamente um repository, e o repository que conhece o data source. Caso precise mudar, muda o repository e não a camada de controller. Controller precisa conhecer apenas a regra de negócio da aplicação e não a regra de implementação de banco de dados,por exemplo.



# Executando o front da aplicação
-Como a api está em localhost, vamos precisar usar o ngrok : https://dashboard.ngrok.com/ e https://ngrok.com/docs/secure-tunnels#http-tunnels
-Crie uma conta e você irá obter um authtoken que irá deixar a sua api local, como de um webservice.
-Baixe o exe do ngrok
-Digite os comandos no seu terminal: ngrok authtoken --coleseutokenaqui para ter acesso à sua api online
-Abra novamente o terminal e digite: ngrok http http://localhost:3005 para linkar o tunel da api com a da aplicação
-a conexão será feita e você terá acesso à webinterface e ao forwarding da api, que é justamente onde ela está online.


# Rendezirando
- Para renderizar iremos usar o cronapp, acesse: https://acesso.cronapp.io/#  , faça login e entre
-Clique em novo projeto, mobile e web e selecione a opção e importar o arquivo em zip que está no sigaa
-Dê um nome e clique em finalizar, selecione o projeto e o execute.
-Após isso, vá em fonte de dados no projeto, clique sob o webservice chamado cliente.
-Mude seu valor de webservice para o valor do seu link que será retornado do ngrok, que é o que diz que sua api está online.
-Mude também o endpoint para o que desejar, de preferência o "/clients" ... faça isso para todas as outras entidades.
-Execute a aplicação e veja as telas(para fazer login o usuário é admin admin)





