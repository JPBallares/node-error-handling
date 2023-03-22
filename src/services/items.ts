/**
 * Data Model Interfaces
 */

import { IBaseItem, IItem, IItems } from '../interfaces/items';

/**
 * In-Memory Store
 * TODO: update this to store to a database
 */

const items: IItems = {
  1: {
    id: 1,
    name: 'Burger',
    price: 599,
    description: 'Tasty',
    image: 'https://cdn.auth0.com/blog/whatabyte/burger-sm.png'
  },
  2: {
    id: 2,
    name: 'Pizza',
    price: 299,
    description: 'Cheesy',
    image: 'https://cdn.auth0.com/blog/whatabyte/pizza-sm.png'
  },
  3: {
    id: 3,
    name: 'Tea',
    price: 199,
    description: 'Informative',
    image: 'https://cdn.auth0.com/blog/whatabyte/tea-sm.png'
  }
};

/**
 * Service Methods
 */
export const findAll = async (): Promise<IItem[]> => Object.values(items);

export const find = async (id: number): Promise<IItem> => items[id];

export const create = async (newItem: IBaseItem): Promise<IItem> => {
  const id = new Date().valueOf();

  items[id] = {
    id,
    ...newItem,
  };

  return items[id];
};


export const update = async (
  id: number,
  itemUpdate: IBaseItem
): Promise<IItem | null> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  items[id] = { id, ...itemUpdate };

  return items[id];
};


export const remove = async (id: number): Promise<null | void> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  delete items[id];
};
