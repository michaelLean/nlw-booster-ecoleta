import { Request, Response } from "express";

import knex from '../database/connection';
import environment from '../config/environment';

class ItemsController {
    index = async (req: Request, res: Response) => {
        const items = await knex('items').select('*');

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `${environment.server.SERVER_URL}:${environment.server.SERVER_PORT}/uploads/${item.image}`,
            }
        });

        return res.json(serializedItems);
    }
}

export default new ItemsController;