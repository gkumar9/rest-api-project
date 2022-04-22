// import query from './database.js';
import { getOffset, emptyOrRows } from '../helper.js';
import config from '../config.js';
import mysql from 'mysql2/promise';
import require from 'requirejs';
// export const connection = await mysql.createConnection(config.db);

export let connectionDrugs;
export let connectionOrders
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://gaurav:gaurav@cluster0.njylt.mongodb.net/pharma?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to MongoDB Database')
  const db = client.db('pharma')
  connectionDrugs = db.collection('drugInventory');
  connectionOrders = db.collection('orders');
})

export async function getMultipleDrugInventory() {
  // const rows = await query(
  //   `SELECT * FROM druginventory`
  // );
  const rows = await connectionDrugs.find().toArray();

  const data = emptyOrRows(rows);

  return {
    data,
  }
}
export async function getMultipleOrders() {
  // const offset = getOffset(page, config.listPerPage);
  // const rows = await query(
  //   `SELECT * FROM orders`
  // );
  const rows = await connectionOrders.find().toArray();
  const data = emptyOrRows(rows);

  return {
    data,
  }
}

export async function newDrug(Data) {
  console.log(Data)
  // const result = await query(
  //   `INSERT INTO druginventory(DrugID, DrugName, DrugDescription, DrugType, DrugPrice, DrugQuantity)
  //   VALUES ("${Data.DrugID}", "${Data.DrugName}", "${Data.DrugDescription}", "${Data.DrugType}", "${Data.DrugPrice}", "${Data.DrugQuantity}")`
  // );
  const result = await connectionDrugs.insertOne({
    "DrugID": Data.DrugID,
    "DrugName": Data.DrugName,
    "DrugDescription": Data.DrugDescription,
    "DrugPrice": Data.DrugPrice,
    "DrugQuantity": Data.DrugQuantity
  })
  let message = 'Error in adding into rest-api';
  console.log(result)
  if (result.acknowledged) {
    message = 'Row added successfully';
  }

  return { message };
}

export async function update(id, data) {
  console.log(data);
  // const result = await query(
  //   `UPDATE druginventory 
  //   SET DrugName="${data.DrugName}", DrugDescription="${data.DrugDescription}", DrugPrice="${data.DrugPrice}", DrugQuantity="${data.DrugQuantity}"
  //   WHERE DrugID="${id}"`
  // );
  const result = await connectionDrugs.replaceOne(
    { "DrugID": id },
    {
      "DrugID": data.DrugID,
      "DrugName": data.DrugName,
      "DrugDescription": data.DrugDescription,
      "DrugPrice": data.DrugPrice,
      "DrugQuantity": data.DrugQuantity
    }, { upsert: true })

  let message = 'Error in updating rest-api';
  // console.log(result)
  if (result.acknowledged) {
    message = 'Drug updated successfully in rest-api';
  }

  return { message };
}

export async function remove(id) {
  // const result = await query(
  //   `DELETE FROM druginventory WHERE DrugID="${id}"`
  // );
  const result = await connectionDrugs.deleteOne(
    { "DrugID": id })

  let message = 'Error in deleting druginventory rest-api';

  if (result.acknowledged) {
    message = 'rest-api deleted successfully';
  }

  return { message };
}