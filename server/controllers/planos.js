const Usuario = require('../models/Usuario')
const pagarme = require('pagarme')
const moment = require('moment')

let pagarmeKey = process.env.pagarmeKey

class PlanosController {
    async create(req, res) {
        try {
            const { 
                amount,
                days,
                name
             } = req.body 
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let createdPlan = await clientPagarme.plans.create({
                amount,
                days,
                name                
            })  
            console.log(createdPlan);
            const response = {
                status: true,
                message: "Plano criado com sucesso!",
                data: createdPlan
            }               
            return res.status(201).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao criar plano",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response);
        }
    }    
    async list(req, res) {
        try {
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let list = await clientPagarme.plans.all({
                count: 10,
                page: 1,              
            })  
            console.log(list);
            const response = {
                status: true,
                message: "Listagem de planos obtida com sucesso!",
                data: list
            }               
            return res.status(200).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao listar planos",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response);            
        }
    }  
    async createCustomer(req, res) {     
        try {
            const id_usuario = req.params.id
            const { 
                name,
                country,
                email,
                documents,
                phone_numbers,
                birthday,
             } = req.body 
             const usuario = await Usuario.findOne({
                where: {
                    id_usuario
                }
            });    
            if(!usuario) {
                const response = {
                    status: false,
                    message: "Cliente não encontrado no banco de dados da aplicação",
                    data: null
                }              
                return res.status(500).send(response);                 
            }                        
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let createdCustomer = await clientPagarme.customers.create({
                external_id: id_usuario,
                name,
                type: "individual", //individual ou corporation. 
                country: "br",
                email,
                documents,
                phone_numbers,
                birthday,       
            })  
            console.log(createdCustomer);   
            usuario.id_usuario_pagarme = createdCustomer.id;
            const resultadoSave = await usuario.save();            
            const response = {
                status: true,
                message: "Cliente criado com sucesso!",
                data: createdCustomer
            }                       
            return res.status(201).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao criar cliente",
                data: error
            }       
            console.log(error);       
            return res.status(500).send(response); 
        }
    }      
    async getCustomer(req, res) {     
        try {
            const id_usuario = req.params.id
             const usuario = await Usuario.findOne({
                where: {
                    id_usuario
                }
            });    
            if(!usuario) {
                const response = {
                    status: false,
                    message: "Cliente não encontrado no banco de dados da aplicação",
                    data: null
                }              
                return res.status(500).send(response);                 
            }             
            const id_usuario_pagarme = usuario.id_usuario_pagarme                     
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let customer = await clientPagarme.customers.find({
                id: id_usuario_pagarme,     
            })  
            console.log(customer);   
            const response = {
                status: true,
                message: "Cliente encontrado!",
                data: customer
            }                       
            return res.status(200).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao encontrar cliente",
                data: error
            }       
            console.log(error);       
            return res.status(500).send(response); 
        }
    }      
    async getCustomerCards(req, res) {
        try {
            const id_usuario = req.params.id
             const usuario = await Usuario.findOne({
                where: {
                    id_usuario
                }
            });    
            if(!usuario) {
                const response = {
                    status: false,
                    message: "Cliente não encontrado no banco de dados da aplicação",
                    data: null
                }              
                return res.status(500).send(response);                 
            }             
            const id_usuario_pagarme = usuario.id_usuario_pagarme         
            if(!!id_usuario_pagarme) {
                let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
                let customerCards = await clientPagarme.cards.find({
                    customer_id: id_usuario_pagarme
                }) 
                // console.log(customerCards);   
                const response = {
                    status: true,
                    message: "Lista de cartões do cliente obtida com sucesso!",
                    data: customerCards
                }                       
                return res.status(201).send(response);                
            } else {
                const response = {
                    status: true,
                    message: "Cliente não encontrado no pagarme",
                    data: []
                }                       
                return res.status(500).send(response); 
            }                                   
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao buscar lista de cartões do cliente",
                data: error.message
            }       
            console.log(error);       
            return res.status(500).send(response); 
        }
    }      
    async getCard(req, res) {
        try {
            const card_id = req.params.id                 
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let customerCards = await clientPagarme.cards.find({
                id: card_id
            }) 
            // console.log(customerCards);   
            const response = {
                status: true,
                message: "Cartão obtido com sucesso!",
                data: customerCards
            }                       
            return res.status(201).send(response);                                              
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao buscar cartão",
                data: error.message
            }       
            console.log(error);       
            return res.status(500).send(response); 
        }
    }      
    async createCard(req, res) {
        try {
            const id_usuario = req.params.id
            const usuario = await Usuario.findOne({
                where: {
                    id_usuario
                }
            });    
            if(!usuario) {
                const response = {
                    status: false,
                    message: "Cliente não encontrado no banco de dados da aplicação",
                    data: null
                }              
                return res.status(500).send(response);                 
            }              
            const { 
                card_number,
                card_holder_name,
                card_expiration_date,
                card_cvv,
             } = req.body                        
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let createdCard = await clientPagarme.cards.create({
                customer_id: usuario.id_usuario_pagarme,
                card_number,
                card_holder_name,
                card_expiration_date,
                card_cvv,            
            })  
            console.log(createdCard);   
            const response = {
                status: true,
                message: "Cartao criado com sucesso!",
                data: createdCard
            }                       
            return res.status(201).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao criar cartão",
                data: error
            }       
            console.log(error);       
            return res.status(500).send(response); 
        }
    }      
    async subscribe(req, res) {
        try {
            const data = req.body 
            const usuario = await Usuario.findOne({
                where: {
                    email: data.customer.email
                }
            });    
            if(!usuario) {
                const response = {
                    status: false,
                    message: "Usuário não encontrado",
                    data: null
                }              
                return res.status(500).send(response);                 
            }        
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let createdSubscription = await clientPagarme.subscriptions.create({
                ...data,               
                "plan_id": 573355,
                "payment_method":"credit_card",
            })  
            usuario.id_assinatura = createdSubscription.id;
            const resultadoSave = await usuario.save();            
            const response = {
                status: true,
                message: "Plano assinado com sucesso!",
                data: createdSubscription
            }                    
            return res.status(201).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao assinar plano",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response); 
        }
    }        
    async listSubscriptions(req, res) {
        try {
            const data = req.body 
            console.log(data);
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let subscriptions = await clientPagarme.subscriptions.all()  
            console.log(subscriptions);
            const response = {
                status: true,
                message: "Lista de assinaturas obtida com sucesso!",
                data: subscriptions
            }                        
            return res.status(200).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao listar assinaturas",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response); 
        }
    }        
    async getSubscription(req, res) {
        try {
            const id = req.params.id
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let subscription = await clientPagarme.subscriptions.find({
                id
            })  
            console.log(subscription);
            const response = {
                status: true,
                message: "Assinatura encontrada!",
                data: subscription
            }                        
            return res.status(200).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao buscar assinatura",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response); 
        }
    }        
    async validateSubscription(req, res) {
        try {
            const emailUsuario = req.body.email
            const usuario = await Usuario.findOne({
                where: {
                    email: emailUsuario
                }
            });
            if(!usuario) {
                const response = {
                    status: false,
                    message: "Usuário não encontrado",
                    data: null
                }              
                return res.status(404).send(response);                 
            }              
            if(!!usuario.id_assinatura) { //verificando se existe alguma assinatura...
                let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
                let subscription = await clientPagarme.subscriptions.find({
                    id: usuario.id_assinatura
                })  
                if(subscription.current_transaction.status == 'paid') { //assinatura existe. verificando se está paga...
                    const response = {
                        status: true,
                        message: "Assinatura OK!",
                        data: {
                            status: 2, //assinatura existente e está paga,
                            subscription
                        }
                    }                        
                    return res.status(200).send(response);  
                } 
                const response = { //assinatura existe mas não está paga.
                    status: false,
                    message: "Assinatura inválida",
                    data: {
                        status: 3, //assinatura existente mas não está paga,
                        subscription
                    }
                }                        
                return res.status(200).send(response);                         
            } else { //nenhuma assinatura feita ainda
                let data_expiracao_trial = moment(usuario.data_expiracao_trial)
                let usuarioEmTrial = moment().isBefore(data_expiracao_trial); // true = ainda está em periodo de trial                
                if(usuarioEmTrial) { //nenhuma assinatura feita ainda, mas usuario em periodo de testes
                    const response = {
                        status: true,
                        message: "Assinatura encontrada(período de testes)!",
                        data: {
                            status: 0, //período de testes,
                            subscription: {
                                expira_em: data_expiracao_trial.format("DD/MM/YYYY"), 
                                dias_restantes: data_expiracao_trial.diff(moment(), 'd')
                            }
                        }
                    }                        
                    return res.status(200).send(response);                
                }    
                // periodo de testes expirou e nenhuma assinatura foi feita ainda             
                const response = {
                    status: false,
                    message: "Período de testes expirado!",
                    data: {
                        status: 1, // periodo de testes expirou e nenhuma assinatura foi feita ainda 
                        subscription: null
                    }
                }                        
                return res.status(200).send(response);                  
            }
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao buscar assinatura",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response); 
        }
    }        
    async updateSubscription(req, res) {
        try {
            const {
                subscription_id,
                payment_method,
                card_id,
            } = req.body 
            // console.log(data);
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let updatedSub = await clientPagarme.subscriptions.update({
                id: subscription_id,
                payment_method,
                card_id
            })  
            const response = {
                status: true,
                message: "Assinatura atualizada com sucesso!",
                data: updatedSub
            }                          
            return res.status(200).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao atualizar assinatura",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response); 
        }
    }        
    async listSubscriptionTransactions(req, res) {
        try {
            const {
                subscription_id,
            } = req.body 
            // console.log(data);
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let transactionList = await clientPagarme.subscriptions.findTransactions({
                id: subscription_id,
            })      
            const response = {
                status: true,
                message: "Lista de transações da assinatura obtida com sucesso!",
                data: transactionList
            }                   
            return res.status(200).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao listar transações da assinatura",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response); 
        }
    }  
    async cancelSubscription(req, res) {
        try {
            const {
                subscription_id,
            } = req.body 
            // console.log(data);
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let canceledSub = await clientPagarme.subscriptions.cancel({
                id: subscription_id,
            })  
            const response = {
                status: true,
                message: "Assinatura cancelada com sucesso!",
                data: canceledSub
            }                       
            return res.status(200).send(response);
        } catch (error) {
            const response = {
                status: false,
                message: "Erro ao cancelar assinatura",
                data: error
            }              
            console.log(error);
            return res.status(500).send(response); 
        }
    }          
}

module.exports = new PlanosController();