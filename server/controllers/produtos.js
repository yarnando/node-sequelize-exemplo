const database = require('../db')
const Produto = require('../models/Produto')
const jwt = require('jsonwebtoken');

class produtosController {    
    async create(req, res) {
        await database.sync();
        try {
            const { 
                nome,
                preco,
                descricao
             } = req.body        
            const resultadoCreate = await Produto.create({
                nome,
                preco,
                descricao
            })       
            const response = {
                message: "Produto criado com sucesso!",
                createdProdutoId: resultadoCreate.id
            }               
            return res.status(201).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
        }
    }                   
    async readOne(req, res) {
        const produto = await Produto.findByPk(req.params.id);
        return res.json(produto);
    }           
    async readAll(req, res) {
        const resultado = await database.sync();
        const produtos = await Produto.findAll();     
        return res.json(produtos);
    }           
    async update(req, res) {
        try {
            let id = req.params.id
            const { 
                nome,
                preco,
                descricao
            } = req.body   
            const produto = await Produto.findByPk(id); 
            produto.nome = nome;
            produto.preco = preco;
            produto.descricao = descricao;       
            const resultadoSave = await produto.save();       
            return res.json('Produto modificado com sucesso')    
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
        }
    }   
    async delete(req, res) {
        try {
            let id = req.params.id 
            const produto = await Produto.findByPk(id);     
            const resultadoDelete = await produto.destroy();      
            return res.json('Produto deletado com sucesso')    
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
        }        
    }   
}

module.exports = new produtosController();