const database = require('../db')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const mailer = require('../modules/mailer')
const jwt = require('jsonwebtoken');

class usuariosController {    
    async create(req, res) {
        try {
            const { email } = req.body
            const { senha } = req.body          
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
            console.log(error);
            return res.status(500).send({ error: error });
        }
    }           
    async login(req, res) {
        try {
            const { email } = req.body
            const { senha } = req.body          
            let results = await Usuario.findAll({
                where: {
                    email
                }
            })
            if (results.length < 1) {
                return res.status(401).send({ message: 'Falha na autenticação' })
            }
            if (await bcrypt.compareSync(senha, results[0].senha)) {
                const token = jwt.sign({
                    userId: results[0].userId,
                    email: results[0].email
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
                return res.status(200).send({
                    message: 'Autenticado com sucesso',
                    token: token
                });                
            }
            return res.status(401).send({ message: 'Falha na autenticação' })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Falha na autenticação' });
        }
    }           
    async forgotPassword(req, res) {
        try {
            const { email } = req.body    
            let user = await Usuario.findOne({ email })
            if(!user)
                return res.status(400).send({ error: 'Usuário não encontrado.'} )
            const token = crypto.randomBytes(20).toString('hex')    
            const now = new Date()
            now.setHours(now.getHours() + 1)  
            user.password_reset_token = token 
            user.password_reset_expires = now  
            user.save()  
            mailer.sendMail({
                from: 'fernando.silva@regulacaoriorj.com.br',
                to: email,
                subject: 'Link para Resetar sua Senha ✔',
                text: `Utilize o token ${ token } para resetar sua senha`,
              }, (err) => {
                  console.log(err);
                if(err)
                  return res.status(400).send({ error: 'Cannot send forgot password email' })
        
                return res.status(200).send({ message: "Email send successfully" })
              })            
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: 'Error on forgot password, try again' })
        }
    } 
    async resetPassword(req, res) {
        const { email, token, password } =  req.body
        try {
          const usuario = await Usuario.findOne({ email })
          if (!usuario) return res.status(400).send({ error: "Usuario não encontrado." });

          if (token !== usuario.password_reset_token)
            return res.status(400).send({ error: "Token invalido." });

          const now = new Date();

          if (now > usuario.password_reset_expires)
            return res
              .status(400)
              .send({ error: "Token expirado, por favor, gere um novo token." });

          usuario.password = password;

          await usuario.save();

          res.status(200).send({ message: "Senha atualizada com sucesso" });
        } catch (err) {
            console.log(err);
          res.status(400).send({ error: "Não foi possível atualizar sua senha." });
        }        
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