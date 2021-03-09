const database = require('../db')
const Usuario = require('../models/Usuario')

class usuariosController {    
    async create(req, res) {
        const email = req.body.email
        const senha = req.body.senha
        const resultadoCreate = await Usuario.create({
            email,
            senha,
        })
        return res.json('Usuario criado com sucesso')
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
        const resultadoDelete = Usuario.destroy();   
        return res.json('Usuario deletado com sucesso')
    }   

}

module.exports = new usuariosController();