const pagarme = require('pagarme')

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
    async createCard(req, res) {
        try {
            const payload = req.body 
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let createdCard = await clientPagarme.cards.create({
                ...payload              
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
            console.log(data);
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let createdSubscription = await clientPagarme.subscriptions.create({
                ...data               
            })  
            console.log(createdSubscription);   
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