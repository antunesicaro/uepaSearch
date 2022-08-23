const ClientsRepository = require('../repositories/ClientsRepository');

//parei em criando as rotas show delete

class ClientController{
    //parei em ordernando

    async index(request,response){ //lista todos registros
       const clients = await ClientsRepository.findAll();

       response.json(clients)
    }

    async show(request,response){ //mostra um cliente
        const { codCliente } = request.params; //id ta aqui no parametro

        const client = await ClientsRepository.findByCodCli(codCliente); //pego o id q veio no param

        //regra de negocio, se n achar da erro, se achar mostra o cliente
        if(!client){
            return response.status(404).json({error:'usuario nao encontrado' });//not found
        }
        response.json(client); 
    }

    async store(request,response){ //cria um cliente

      const {codCliente,cpf,nomeCliente,email,renda,classe} = request.body;

    if(!nomeCliente){
      return response.status(400).json({ error : 'Nome obrigatório' });
    }

    const clientExists = await ClientsRepository.findByEmail(email);

    if(clientExists){
      return response.status(400).json({ error : 'Email já em uso' });
    }

    //else
    const client = await ClientsRepository.create(
      {codCliente,cpf,nomeCliente,email,renda,classe}
    );

    response.json(client);
    }

    async update(request,response){ //atualiza um cliente

    const { codCliente } = request.params;
    const { cpf,nomeCliente,email,renda,classe } = request.body;


    const clientExists = await ClientsRepository.findByCodCli(codCliente);

    if(!clientExists){
      return response.status(404).json({error: 'User não encontrado'});
    }

    if(!nomeCliente){
      return response.status(400).json({ error : 'Nome obrigatóried plis' });
    }

    const clientByEmail = await ClientsRepository.findByEmail(email);
  

    if(clientByEmail && clientByEmail.codcliente !== codCliente){
      return response.status(400).json({error:'email já em uso if'});
    }

    const client = await ClientsRepository.update(codCliente,{
      cpf,nomeCliente,email,renda,classe
    });

    response.json(client);
    }

    async delete(request,response){ //deleta um cliente
        const { codCliente } = request.params;
        /* 
        const contact = await ContactsRepository.findById(id);
    
        if(!contact){
          return response.status(404).json({ error: 'User not found'});
        }
        */
    
        //else
        await ClientsRepository.delete(codCliente);
    
    
        response.sendStatus(204);
      }
    
    }




module.exports = new ClientController();