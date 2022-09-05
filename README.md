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

-Executar o projeto --> yarn start
-Baixar o insomnia e testar todas requisiçoes do servidor, criando rotas. O servidor será startado na porta 3005, cuidado para já não ter outra na sua máquina e dar erro.
-Com a api rodando no insominia ou postman, faça rotas e requisições para popular o banco. Sempre olhando para o routes.js,que é onde tem toda explicação das rotas.






