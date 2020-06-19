import express, { Router,Request,Response } from 'express';
import ItemsController from './controllers/itemsController';
import PointsController from './controllers/pointsController';
import multer from 'multer'
import multerConfig from './config/multer'

const upload = multer(multerConfig)
const route = express.Router();
require('dotenv').config()

const itemsController = new ItemsController();
const pointsController = new PointsController();
route.get('/',(req,res)=>{
    res.json({message:'Inicio'});
})
route.get('/items',itemsController.index)
    
route.post('/image', upload.single('image'),pointsController.upload)
route.post('/points', upload.single('image'),pointsController.create)
route.get('/points/:id',pointsController.show)
route.get('/points',pointsController.index)

export default route;