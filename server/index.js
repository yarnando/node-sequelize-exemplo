
(async () => {
    const Produto = require('./models/Produto');
    const database = require('./db');
 
    try {
        // - SYNC
        // const resultado = await database.sync();

        // - CREATE
        // const resultadoCreate = await Produto.create({
        //     nome: 'mouse',
        //     preco: 10,
        //     descricao: 'Um mouse USB bonitão'
        // })

        // - READ ALL
        // const produtos = await Produto.findAll();
        // console.log(produtos); 
        
        // - READ ONE
        // const produto = await Produto.findByPk(1);
        // console.log(produto)   

        // - UPDATE
        // const produto = await Produto.findByPk(1);
        // console.log(produto)           
        // produto.nome = "Mouse Top";
        // const resultadoSave = await produto.save();
        // console.log(resultadoSave);    

        //--DELETE
        // assim
        // Produto.destroy({ where: { id: 1 }});
        // ou assim
        // const produto = await Produto.findByPk(1);
        // produto.destroy();                          
    } catch (error) {
        console.log(error);
    }
})();