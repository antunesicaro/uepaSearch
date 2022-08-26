const VendasRepository = require('../repositories/VendasRepository');
const ClientsRepository = require('../repositories/ClientsRepository');
const ProdutosRepository = require('../repositories/ProdutosRepository')



class VendaController{


    async index(request,response){ //mostra todas vendas
       const vendas = await VendasRepository.findAll();

       response.json(vendas)
    }

    async show(request,response){ 
        const { codVenda } = request.params; 

        const venda = await VendasRepository.findByCodVenda(codVenda); 

        //regra de negocio, se n achar da erro, se achar mostra a venda
        if(!venda){
            return response.status(404).json({error:'venda não existente' });//not found
        }
        response.json(venda); 
    }

    async store(request,response){ //cria uma venda

      const {codVenda,codCliente,dataVenda} = request.body;

    if(!codVenda){
      return response.status(400).json({ error : 'Codigo de venda é obrigatório' });
    }

    if(!codCliente){
        return response.status(400).json({ error : 'Codigo cliente é obrigatório' });
      }

    
      //checa se o cliente existe, pois só poderá fazer a venda para um cliente existente
    const clientExists = await ClientsRepository.findByCodCli(codCliente);

    if(clientExists){

     const venda = await VendasRepository.create(
        {codVenda,codCliente,dataVenda}
          );
      
        response.json(venda);
    }

    else{
        return response.status(400).json({ error : 'Não é possível fazer uma venda para um cliente inexistente' }); 
    }

    
  
    }


    async delete(request,response){ //deleta uma venda
        const { codVenda } = request.params;
      
        await VendasRepository.delete(codVenda);
    
    
        response.sendStatus(204);
      }
    
    }




module.exports = new VendaController();