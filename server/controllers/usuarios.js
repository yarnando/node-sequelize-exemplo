const database = require('../db')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class usuariosController {    
    async create(req, res) {
        try {
            const email = req.body.email
            const senha = req.body.senha            
            let result = await Usuario.findAll({
                where: {
                    email
                }
            })
            if (result.length > 0) {
                return res.status(409).send({ message: 'Usuário já cadastrado' })
            }
            const senhaHash = await bcrypt.hashSync(senha, 10);  
            const resultadoCreate = await Usuario.create({
                email,
                senha: senhaHash,
            })       
            const response = {
                message: "Usuário criado com sucesso!",
                createdUserId: resultadoCreate.id_usuario
            }               
            return res.status(201).send(response);
        } catch (error) {
            return res.status(500).send({ error: error });
        }
        // const resultadoCreate = await Usuario.create({
        //     email,
        //     senha,
        // })
        // return res.json('Usuario criado com sucesso')
    }           
    async readOne(req, res) {
        const usuario = await Usuario.findByPk(req.params.id);
        return res.json(usuario);
    }           
    async readAll(req, res) {
        const resultado = await database.sync();
        const usuarios = await Usuario.findAll();     
        return res.json(usuarios);
    }           
    async update(req, res) {
        const usuario = await Usuario.findByPk(req.params.id);        
        usuario.senha = req.body.senha;
        const resultadoSave = await usuario.save();
        return res.json('Senha modificada com sucesso')
    }   
    async delete(req, res) {
        const usuario = await Usuario.findByPk(req.params.id);
        const resultadoDelete = await usuario.destroy();   
        return res.json('Usuario deletado com sucesso')
    }   

}

module.exports = new usuariosController();