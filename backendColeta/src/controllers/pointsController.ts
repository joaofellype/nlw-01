import knex from '../database/config';

import { Request, Response } from 'express'

class PointsController {

     async index (request:Request,response:Response){

        const {city,uf,items}=request.query;
        console.log(city)
        const parsedItems = String(items)
        .split(',')
        .map(item =>Number(item.trim()));

        const point = await knex('points')
        .join('point_items','points.id','=','point_items.point_id')
        .whereIn('point_items.item_id',parsedItems)
        .where('city',String(city))
        .where('uf',String(uf))
        .distinct()
        .select('points.*')

        response.json(point)
     }
    async create (request:Request,response:Response){
        const {
            image,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
        const trx = await knex.transaction();
      const ids =   await knex('points').insert({
            city:city,
            email:email,
            image:image,
            latitude:latitude,
            longitude:longitude,
            name:name,
            uf:uf,
            whatsapp:whatsapp,
        }).returning('*')
        const pointsItems = items.split(',').map((item:string)=>Number(item.trim())).map((item_id: number)=>{
            return {
                item_id,
                point_id:ids[0].id
            }
        })
        await knex('point_items').insert(pointsItems)
        return response.json({...ids[0]})
    };
    async show(request:Request,response:Response){
        const id = request.params.id;

        const resposta = await knex('points').where('id',id).first();
        if(!resposta){
            return response.json({message:'Não contém pontos'})
        }
        const items = await knex('items')
        .join('point_items','items.id','=', 'point_items.item_id')
        .where('point_items.point_id',id)

        return response.json({resposta,items})
    }
    async upload(request:Request,response:Response){
        console.log(request.file)
        response.json({message:`http://192.168.100.4:3333/uploads/${request.file.originalname}`})
   
    }
}

export default PointsController