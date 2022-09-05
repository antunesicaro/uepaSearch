const db = require('../../database/index');


class ProfessorRepository{
//metodos de manipulacao do banco
async findAll(){

    const rows = await db.query(`SELECT * 
    FROM professor
     `);
    return rows;
  }

  async findById(id){
    const [row] = await db.query(`SELECT * FROM professor WHERE id = $1 `,[id]);
    return row;
  }

 
    async delete(id){
      const deleteOp = await db.query(`DELETE  FROM professor 
      WHERE id = $1

      `,[id]);
      
      return deleteOp;
    }

    async update(id,{
      name,email,phone,especialidade
    }){

      //db.query retorna um array, dai desestrutura pra ter acesso à priemira posição
      const [row] = await db.query(`
      UPDATE professor
      SET name = $1, email = $2, phone = $3, especialidade = $4
      WHERE id = $5
      RETURNING *
      `,[name,email,phone,especialidade,id]);      
      return row;
    }

    async create({
      id,name,email,phone,especialidade
    }){
        const [row] = await db.query(`INSERT INTO professor(id,name,email,phone,especialidade) 
        VALUES($1,$2,$3,$4,$5) 
        RETURNING *
        `,[id,name,email,phone,especialidade]) //cria nova linha de registro

        return row;
    }

    


}

module.exports = new ProfessorRepository();