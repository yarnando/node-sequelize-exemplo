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
                message: "Plano criado com sucesso!",
                plano: createdPlan
            }               
            return res.status(201).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
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
                list
            }               
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
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
                message: "Cartao criado com sucesso!",
                cartao: createdCard
            }               
            return res.status(201).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
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
                message: "Plano assinado com sucesso!",
                assinatura: createdSubscription
            }               
            return res.status(201).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
        }
    }        
    async listSubscriptions(req, res) {
        try {
            const data = req.body 
            console.log(data);
            let clientPagarme = await pagarme.client.connect({ api_key: pagarmeKey })       
            let subscriptions = await clientPagarme.subscriptions.all()  
            console.log(subscriptions);
            const response = subscriptions            
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
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
            const response = updatedSub            
            return res.status(201).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
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
            const response = transactionList            
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
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
            const response = canceledSub            
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
        }
    }          
}

module.exports = new PlanosController();