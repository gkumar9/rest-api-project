import query from './database.js';
import { getOffset, emptyOrRows } from '../helper.js';
import config from '../config.js';
import mysql from 'mysql2/promise';
export const connection = await mysql.createConnection(config.db);

export async function getMultipleDrugInventory() {
  const rows = await query(
    `SELECT * FROM druginventory`
  );
  const data = emptyOrRows(rows);

  return {
    data,
  }
}
export async function getMultipleOrders() {
  // const offset = getOffset(page, config.listPerPage);
  const rows = await query(
    `SELECT * FROM orders`
  );
  const data = emptyOrRows(rows);

  return {
    data,
  }
}

export async function newDrug(Data) {
  // console.log(Data.DrugID)
  const result = await query(
    `INSERT INTO druginventory(DrugID, DrugName, DrugDescription, DrugType, DrugPrice, DrugQuantity)
    VALUES ("${Data.DrugID}", "${Data.DrugName}", "${Data.DrugDescription}", "${Data.DrugType}", "${Data.DrugPrice}", "${Data.DrugQuantity}")`
  );

  let message = 'Error in adding into rest-api';

  if (result.affectedRows) {
    message = 'Row added successfully';
  }

  return { message };
}

export async function update(id, data) {
  // console.log(data);
  const result = await query(
    `UPDATE druginventory 
    SET DrugName="${data.DrugName}", DrugDescription="${data.DrugDescription}", DrugType="${data.DrugType}", 
    DrugPrice="${data.DrugPrice}", DrugQuantity="${data.DrugQuantity}"
    WHERE DrugID="${id}"`
  );

  let message = 'Error in updating rest-api';
  // console.log(result)
  if (result.affectedRows) {
    message = 'Drug updated successfully in rest-api';
  }

  return { message };
}

export async function remove(id) {
  const result = await query(
    `DELETE FROM druginventory WHERE DrugID="${id}"`
  );

  let message = 'Error in deleting druginventory rest-api';

  if (result.affectedRows) {
    message = 'rest-api deleted successfully';
  }

  return { message };
}