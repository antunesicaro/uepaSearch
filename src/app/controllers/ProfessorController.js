const ProfessorRepository = require('../repositories/ProfessorRepository');




class ProfessorController{
   

    async index(request,response){ //lista todos registros
       const professor = await ProfessorRepository.findAll();

       response.json(professor)
    }

    async show(request,response){ 
        const { id } = request.params; //id ta aqui no parametro

        const professor = await ProfessorRepository.findById(id); //pego o id q veio no param

        //regra de negocio, se n achar da erro, se achar mostra o cliente
        if(!professor){
            return response.status(404).json({error:'prof nao encontrado' });//not found
        }
        response.json(professor); 
    }

    async store(request,response){ 

      const {id,name,email,phone,especialidade} = request.body;

    //regra para q o id seja um valido da uepa
    if(!id){
      return response.status(400).json({ error : 'id obrigatório' });
    }

    const professorExists = await ProfessorRepository.findById(id);

    if(professorExists){
      return response.status(400).json({ error : 'professor ja cadastrado' });
    }
    //else,sucesso
    const professor = await ProfessorRepository.create(
      {id,name,email,phone,especialidade}
    );

    response.json(professor);
    }

    async update(request,response){ //atualiza um cliente

    const { id } = request.params;
    const { name,email,phone,especialidade} = request.body;


    const professorExists = await ProfessorRepository.findById(id);

    if(!professorExists){
      return response.status(404).json({error: 'User não encontrado'});
    }

    if(!name){
      return response.status(400).json({ error : 'Nome obrigatóried plis' });
    }

    const professor = await ProfessorRepository.update(id,{
      name,email,phone,especialidade
    });

    response.json(professor);
    }

    async delete(request,response){ //deleta um cliente
        const { id } = request.params;
      
  
        //else
        await ProfessorRepository.delete(id);
    
    
        response.sendStatus(204);
      }

      
      
    
    }




module.exports = new ProfessorController();