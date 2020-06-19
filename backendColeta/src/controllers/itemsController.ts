import knex from '../database/config';

import { Request, Response } from 'express'

class ItemsController {

    async index(requeste: Request, response: Response) {
        const item = await knex('items').select('*');
        const serializedItems = item.map(item => {
            return {
                id:item.id,
                title: item.title,
                image_url: `http://192.168.100.4:3333/uploads/${item.image}`
            }
        })
        return response.json(serializedItems)
    
}
}

export default ItemsController
