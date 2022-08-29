const ProdutosRepository = require('../repositories/ProdutosRepository');
const AuxilioController = require('./AuxilioController');



class ProdutoController{

    async index(request,response){ //lista todos produtos
       const produtos = await ProdutosRepository.findAll();

       response.json(produtos);
    }

    async show(request,response){ //mostra um produto
        const { codProduto } = request.params; 

        const produto = await ProdutosRepository.findByCodProduto(codProduto); //pego o id q veio no param

        //regra de negocio, se n achar da erro, se achar mostra o cliente
        if(!produto){
            return response.status(404).json({error:'produto não encontrado' });//not found
        }
        response.json(produto); 
    }

    async store(request,response){ //cria um produto

      const {codProduto,unidade,descricao,valorUnitario,estoqueMinimo,qtdEstoque} = request.body;

    if(!descricao){
      return response.status(400).json({ error : 'Seu produto precisa de uma descricao' });
    }

    if(!codProduto){
        return response.status(400).json({ error : 'Seu produto precisa de um código' });
      }

    const produtoExists = await ProdutosRepository.findByCodProduto(codProduto);

    if(produtoExists){
      return response.status(400).json({ error : 'Código de produto já está em uso' });
    }

    //else
    const produto = await ProdutosRepository.create(
      {codProduto,unidade,descricao,valorUnitario,estoqueMinimo,qtdEstoque}
    );

    response.json(produto);
    }

    async update(request,response){ //atualiza um produto

    const { codProduto } = request.params;
    const { unidade,descricao,valorUnitario,estoqueMinimo,qtdEstoque} = request.body;


    const produtoExists = await ProdutosRepository.findByCodProduto(codProduto);

    if(!produtoExists){
      return response.status(404).json({error: 'Produto não encontrado, logo não consigo editar um produto que não existe.'});
    }

    if(!descricao){
      return response.status(400).json({ error : 'Seu produto precisa de uma descrição para ser cadastrado' });
    }

    const produto = await ProdutosRepository.update(codProduto,{
    unidade,descricao,valorUnitario,estoqueMinimo,qtdEstoque
    });

    response.json(produto);
    }

    async delete(request,response){ //deleta um produto
        const { codProduto } = request.params;
        await ProdutosRepository.delete(codProduto);
        response.sendStatus(204);
      }


    async baixarEstoque(request,response){
      const {qtdParaDiminuir} = request.params

      
    }


      
    
    }




module.exports = new ProdutoController();