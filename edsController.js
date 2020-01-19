const router = require('express').Router()
let Localstorage = require('node-localstorage').LocalStorage
let localStorage = new Localstorage('./localstorage');
let jwt = require('jsonwebtoken');
const DB = require('./edsDatabase')
let bcrypt = require('bcryptjs');
let config = require('./config1.js')
class Controller {
    static get() {
        router.post("/controller", async (req, res) => {
            try {
                const docs = await new DB().read({
                    collection: "empdetails",
                    criteria: {
                        name: req.body.name,
                        surname: req.body.surname   
                    },
                    projection: {}
                })
               if(docs!="Inavlid Creds")
            {  
                if (docs) {
                    try {
                        console.log(docs)
                        let hashedPassword = bcrypt.hashSync(docs.name, 8);
                        let expiresIn = 1500;
                        let token = jwt.sign({
                            name: req.body.name
                        }, config.secret, {
                            expiresIn: expiresIn
                        });
                        localStorage.setItem('token', token)
                        res.send(docs).status(200)
                        console.log(`found ` + JSON.stringify(docs.name) + hashedPassword);
                    } catch(err) {
                        res.send("err docs not found").status(500)
                        console.log(`docs not found`)
                    }}
                /*console.log("Found docs as docs!")
                res.send(docs).status(200)*/
             }
             else
             {

                res.status(500).send(docs)
             }
            } catch (error) {
                     res.send(error).status(500)
                     console.log(error+"rwtewer")

            }
        })  
        router.get("/getdata", async (req, res) => {
            try {
                const docs = await new DB().readAll({
                    collection: "empdetails",
                    criteria: {},
                    projection: {}

                })
                if (docs) {
                    res.send(docs).status(200)
                }

            } catch (err) {
                res.send("error").status(500)
            }
        })
        return router;
    }
}
module.exports = Controller