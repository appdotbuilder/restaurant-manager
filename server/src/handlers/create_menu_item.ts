import { type CreateMenuItemInput, type MenuItem } from '../schema';

export const createMenuItem = async (input: CreateMenuItemInput): Promise<MenuItem> => {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is creating a new menu item and persisting it in the database.
    return Promise.resolve({
        id: 0, // Placeholder ID
        name: input.name,
        description: input.description || null,
        price: input.price,
        category: input.category,
        available: input.available ?? true,
        created_at: new Date(),
        updated_at: new Date()
    } as MenuItem);
};