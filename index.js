(async () => {
    const db = require("./db");

    const result = await db.insertCustomer({nome: "Zé"});
    console.log(result);
 
    const clientes = await db.selectCustomers();
    console.log(clientes);
})();