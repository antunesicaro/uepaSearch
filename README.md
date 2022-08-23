# Setup API:

Baixar na máquina o node
Instalar yarn --> npm install -g yarn
Testar se foi isntalado --> yarn -v
yarn add express
exec: yarn npx nodemon src/index.js 

# Design pattern e arquiterura: Motivações de escolha:
Uso de controller para centralizar toda a regra de negócio relacionada à uma determinada entidade da aplicação.
Entidades da aplicação: Produto,Cliente,Venda...
Cada entidade terá seu próprio controller. Esse controller será uma classe que irá conter métodos e será instanciada.
Escolha de uso do Singleton,pois nesse caso só teremos uma instância dos objetos dentro da aplicação, todo mundo que for usar a classe do controller do client, por exemplo, use a mesma instância.
https://github.com/junioralcant/sistema-entrada-saida
Repository Pattern para permitir a troca do banco de dados utilizado sem afetar o sistema como um todo, abstrai de maneira que o controller conheça diretamente um repository, e o repository que conhece o data source. Caso precise mudar, muda o repository e não a camada de controller. Controller precisa conhecer apenas a regra de negócio da aplicação e não a regra de implementação de banco de dados,por exemplo.









