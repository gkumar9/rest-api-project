import { connection } from './programming.js';

export default async function query(sql, params) {
  const [results] = await connection.execute(sql, params);
  // console.log(results)
  return results;
}

