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
                status: true,
                message: "Produto criado com sucesso!",
                data: {
                    createdProdutoId: resultadoCreate.id
                }                
            }               
            return res.status(201).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao criar produto",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response); 
        }
    }                   
    async readOne(req, res) {
        try {
            const produto = await Produto.findByPk(req.params.id);
            const response = {
                status: true,
                message: "Produto obtido com sucesso!",
                data: produto              
            }              
            return res.json(response);            
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao buscar produto",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response); 
        }
    }           
    async readAll(req, res) {
        try {
            const resultado = await database.sync();
            const produtos = await Produto.findAll();   
            const response = {
                status: true,
                message: "Lista de produtos obtida com sucesso!",
                data: produtos              
            }              
            return res.json(response);                          
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao listar todos os produtos",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response);             
        }
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
            const response = {
                status: true,
                message: "Produto alterado com sucesso!",
                data: resultadoSave              
            }              
            return res.json(response);  
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao alterar produto",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response);    
        }
    }   
    async delete(req, res) {
        try {
            let id = req.params.id 
            const produto = await Produto.findByPk(id);     
            const resultadoDelete = await produto.destroy();  
            const response = {
                status: true,
                message: "Produto deletado com sucesso!",
                data: resultadoDelete              
            }              
            return res.json(response);                     
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao deletar produto",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response); 
        }        
    }   
}

module.exports = new produtosController();