const {MongoClient} = require('mongodb');
const csvtojson = require("csvtojson");

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    let databases = [];

    if (databasesList && databasesList.databases) {
        databasesList.databases.map((myObj) => {
            if (myObj && myObj.name) databases.push(myObj.name);
       });
    }

    return databases;
};

async function main(){
    const uri = "mongodb://localhost:27017";
 

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        const databases = await  listDatabases(client);

        if (databases.includes('QuickTest')) {
            console.log('Database exists');
        } else {
            // Create Database
            const collection = client.db('QuickTest').collection('products');
            console.log('Database created');

            // Import Database
            const csvData = await csvtojson().fromFile("./tools/mockData.csv");
            const result = await client.db("QuickTest")
            .collection("products")
            .insertMany(csvData);

            if (result && result.insertedCount) {
                console.log(`Inserted: ${result.insertedCount} rows`);
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);