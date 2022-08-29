const DetalhesVendasRepository = require('../repositories/DetalhesVendasRepository');
const VendasRepository = require('../repositories/VendasRepository');
const ClientsRepository = require('../repositories/ClientsRepository');
const ProdutosRepository = require('../repositories/ProdutosRepository')



class DetalheVendaController{
   
    
    async index(request,response){ //lista todos registros
       const detalhesVendas = await DetalhesVendasRepository.findAll();

       response.json(detalhesVendas)
    }

    async show(request,response){ //mostra uma venda, devolvendo um conujunto de registro de acordo com o codigo de uma venda
        const { codVenda } = request.params; 

        const venda = await VendasRepository.findByCodVenda(codVenda);
       

        if(!venda){
            return response.status(404).json({error:'Código de venda não existente' });//not found
        }

        const umDetalhe = await DetalhesVendasRepository.listaUmProduto(codVenda)
        
        response.json(umDetalhe); 
    }

    async store(request,response){ //cria um detalhe de venda

      const {venda,produto,qtdProduto} = request.body;

    //else
    const detalheVenda = await DetalhesVendasRepository.create(
      {venda,produto,qtdProduto}
    );

    response.json(detalheVenda);
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




module.exports = new DetalheVendaController();