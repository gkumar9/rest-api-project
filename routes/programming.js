import express from "express";
const router = express.Router();
import { getMultipleDrugInventory, getMultipleOrders, newDrug, update, remove } from '../service/programming.js'

router.get('/drugInventory', async function (req, res, next) {
  try {
    res.json(await getMultipleDrugInventory());
  } catch (err) {
    console.error(`Error while getting rest-api `, err.message);
    next(err);
  }
});

router.get('/orders', async function (req, res, next) {
  try {
    res.json(await getMultipleOrders());
  } catch (err) {
    console.error(`Error while getting orders in rest-api `, err.message);
    next(err);
  }
});

router.post('/new/drugInventory', async function (req, res, next) {
  try {
    res.json(await newDrug(req.body));
  } catch (err) {
    console.error(`Error while creating in drug inventory in rest-api`, err.message);
    next(err);
  }
});

router.put('/edit/drugInventory/:id', async function (req, res, next) {
  try {
    res.json(await update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating drug inventory in rest-api`, err.message);
    next(err);
  }
});

router.delete('/delete/drugInventory/:id', async function (req, res, next) {
  try {
    res.json(await remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting drug inventory language`, err.message);
    next(err);
  }
});

export default router;