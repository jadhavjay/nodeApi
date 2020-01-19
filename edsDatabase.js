  const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
class EdsDatabase {
    constructor() {
        async function connect() {
            try {
                const con = await MongoClient.connect("mongodb://localhost:27017",{ useNewUrlParser: true })
                return con
            } catch (err) {
                console.log(err)
                throw err
            }
        }
        this.readAll=async function(readAllParams){
            try{
                console.log(readAllParams)
                const conn = await connect()
                const db = conn.db("emp")
                const collection = db.collection(readAllParams.collection)
                const data = await collection.find(readAllParams.criteria,readAllParams.projection).toArray()
                if(data){
                    return data
                }
                else{
                    throw new Error('not foundd')
                           }
             } catch (err) {
               throw err
            }
        }
    
        this.read = async function (readParams) {
            try {
               console.log(readParams)
                const conn = await connect()
                const db = conn.db("emp")
                const collection = db.collection(readParams.collection)
                const data = await collection.findOne(readParams.criteria, readParams.projection)
                if(data){
                return data
                }
                else
                {
                return "Inavlid Creds"
                }
                
             } catch(error) {
                
              console.log(error)
            }
        }
    }
}
module.exports = EdsDatabase