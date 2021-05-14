const database = require('../db')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const mailer = require('../modules/mailer')
const jwt = require('jsonwebtoken');
const verifyJWT = require('../middlewares/verifyJWT')

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
                const response = {
                    status: false,
                    message: "Usuário já cadastrado",
                    data: null
                }
                return res.status(409).send(response)
            }
            const senhaHash = await bcrypt.hashSync(senha, 10);
            const resultadoCreate = await Usuario.create({
                email,
                senha: senhaHash,
            })
            const response = {
                status: true,
                message: "Usuario criado com sucesso!",
                data: {
                    createdUserId: resultadoCreate.id_usuario
                }
            }
            return res.status(201).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao criar usuário",
                data: error
            }
            console.log(error);
            return res.status(500).send(response);
        }
    }
    async verificaToken(req, res) {
        return verifyJWT(req, res)
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
                const response = {
                    status: false,
                    message: "Falha na autenticação",
                    data: null
                }
                return res.status(401).send(response)
            }
            if (await bcrypt.compareSync(senha, results[0].senha)) {
                const token = jwt.sign({
                    userId: results[0].userId,
                    email: results[0].email
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "2m"
                    });
                const response = {
                    status: true,
                    message: "Autenticado com sucesso",
                    data: { token }
                }
                return res.status(200).send(response)
            }
            const response = {
                status: false,
                message: "Falha na autenticação",
                data: null
            }
            return res.status(401).send(response)
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao autenticar usuário",
                data: error
            }
            console.log(error);
            return res.status(500).send(response);
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body
            let user = await Usuario.findOne({ email })
            if (!user) {
                const response = {
                    status: false,
                    message: "Usuário não encontrado",
                    data: null
                }
                return res.status(400).send(response);
            }
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
                text: `Utilize o token ${token} para resetar sua senha`,
            }, (err) => {
                console.log(err);
                if (err) {
                    const response = {
                        status: false,
                        message: "Não foi possivel enviar o email de recuperação de senha",
                        data: null
                    }
                    return res.status(401).send(response)
                }
                const response = {
                    status: true,
                    message: "Email enviado com sucesso!",
                    data: null
                }
                return res.status(200).send(response)
            })
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao enviar email de recuperação",
                data: error
            }
            console.log(error);
            return res.status(500).send(response);
        }
    }
    async resetPassword(req, res) {
        const { email, token, password } = req.body
        try {
            const usuario = await Usuario.findOne({ email })
            if (!usuario) {
                const response = {
                    status: false,
                    message: "Usuario não encontrado",
                    data: null
                }
                return res.status(400).send(response);
            }

            if (token !== usuario.password_reset_token) {
                const response = {
                    status: false,
                    message: "Token inválido",
                    data: null
                }
                return res.status(400).send(response);
            }

            const now = new Date();

            if (now > usuario.password_reset_expires) {
                const response = {
                    status: false,
                    message: "Token expirado, por favor, gere um novo token",
                    data: null
                }
                return res.status(400).send(response);
            }

            usuario.password = password;

            await usuario.save();
            const response = {
                status: true,
                message: "Senha atualizada com sucesso",
                data: null
            }
            return res.status(200).send(response);
        } catch (err) {
            const response = {
                status: false,
                message: "Erro ao alterar senha",
                data: error
            }
            console.log(error);
            return res.status(500).send(response);
        }
    }
    async readOne(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            const response = {
                status: true,
                message: "Usuario obtido com sucesso",
                data: usuario
            }
            return res.status(200).send(response);            
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao buscar usuário",
                data: error
            }
            console.log(error);
            return res.status(500).send(response);
        }
    }
    async readAll(req, res) {
        try {
            const resultado = await database.sync();
            const usuarios = await Usuario.findAll();
            const response = {
                status: true,
                message: "Lista de usuarios obtida com sucesso",
                data: usuarios
            }
            return res.status(200).send(response);               
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao buscar lista de usuários",
                data: error
            }
            console.log(error);
            return res.status(500).send(response);
        }

    }
    async update(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            usuario.senha = req.body.senha;
            const resultadoSave = await usuario.save();
            const response = {
                status: true,
                message: "Senha alterada com sucesso",
                data: resultadoSave
            }
            return res.status(200).send(response);               
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao atualizar informações do usuário",
                data: error
            }
            console.log(error);
            return res.status(500).send(response);
        }
    }
    async delete(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if(!usuario) {
                const response = {
                    status: false,
                    message: "Usuario não encontrado",
                    data: null
                }
                return res.status(400).send(response);                   
            }
            const resultadoDelete = await usuario.destroy();
            const response = {
                status: true,
                message: "Usuario deletado com sucesso",
                data: resultadoDelete
            }
            return res.status(200).send(response);               
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao deletar usuário",
                data: error
            }
            console.log(error);
            return res.status(500).send(response);
        }
    }

}

module.exports = new usuariosController();