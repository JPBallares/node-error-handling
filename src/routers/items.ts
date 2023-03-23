/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import Api404Error from '../errors/Api404Error';
import { IBaseItem, IItem } from '../interfaces/items';
import * as ItemService from '../services/items';

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

itemsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items: IItem[] = await ItemService.findAll();

    res.status(200).send(items);
  } catch (e: any) {
    next(e);
  }
});

// GET items/:id

itemsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: IItem = await ItemService.find(id);

    if (!item) {
      throw new Api404Error(`Item ${id} not found.`);
    }

    return res.status(200).send(item);
  } catch (e: any) {
    next(e);
  }
});

// POST items

itemsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item: IBaseItem = req.body;

    const newItem = await ItemService.create(item);

    res.status(201).json(newItem);
  } catch (e: any) {
    next(e);
  }
});

// PUT items/:id

itemsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: IItem = req.body;

    const existingItem: IItem = await ItemService.find(id);

    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await ItemService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e: any) {
    next(e);
  }
});

// DELETE items/:id

itemsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);

    res.sendStatus(204);
  } catch (e: any) {
    next(e);
  }
});
