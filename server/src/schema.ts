import { z } from 'zod';

// Menu Item schemas
export const menuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  category: z.string(),
  available: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type MenuItem = z.infer<typeof menuItemSchema>;

export const createMenuItemInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  available: z.boolean().default(true)
});

export type CreateMenuItemInput = z.infer<typeof createMenuItemInputSchema>;

export const updateMenuItemInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  price: z.number().positive().optional(),
  category: z.string().min(1).optional(),
  available: z.boolean().optional()
});

export type UpdateMenuItemInput = z.infer<typeof updateMenuItemInputSchema>;

// Table schemas
export const tableStatusEnum = z.enum(['available', 'occupied', 'reserved']);

export const tableSchema = z.object({
  id: z.number(),
  table_number: z.number(),
  capacity: z.number(),
  status: tableStatusEnum,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Table = z.infer<typeof tableSchema>;
export type TableStatus = z.infer<typeof tableStatusEnum>;

export const createTableInputSchema = z.object({
  table_number: z.number().int().positive("Table number must be positive"),
  capacity: z.number().int().positive("Capacity must be positive"),
  status: tableStatusEnum.default('available')
});

export type CreateTableInput = z.infer<typeof createTableInputSchema>;

export const updateTableInputSchema = z.object({
  id: z.number(),
  table_number: z.number().int().positive().optional(),
  capacity: z.number().int().positive().optional(),
  status: tableStatusEnum.optional()
});

export type UpdateTableInput = z.infer<typeof updateTableInputSchema>;

// Order schemas
export const orderStatusEnum = z.enum(['pending', 'preparing', 'ready', 'served', 'completed', 'paid', 'cancelled']);

export const orderSchema = z.object({
  id: z.number(),
  table_id: z.number(),
  status: orderStatusEnum,
  total_amount: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Order = z.infer<typeof orderSchema>;
export type OrderStatus = z.infer<typeof orderStatusEnum>;

export const createOrderInputSchema = z.object({
  table_id: z.number().int().positive("Table ID must be positive"),
  status: orderStatusEnum.default('pending')
});

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;

export const updateOrderInputSchema = z.object({
  id: z.number(),
  table_id: z.number().int().positive().optional(),
  status: orderStatusEnum.optional()
});

export type UpdateOrderInput = z.infer<typeof updateOrderInputSchema>;

// Order Item schemas
export const orderItemSchema = z.object({
  id: z.number(),
  order_id: z.number(),
  menu_item_id: z.number(),
  quantity: z.number(),
  unit_price: z.number(),
  subtotal: z.number(),
  created_at: z.coerce.date()
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const addOrderItemInputSchema = z.object({
  order_id: z.number().int().positive("Order ID must be positive"),
  menu_item_id: z.number().int().positive("Menu item ID must be positive"),
  quantity: z.number().int().positive("Quantity must be positive")
});

export type AddOrderItemInput = z.infer<typeof addOrderItemInputSchema>;

export const updateOrderItemInputSchema = z.object({
  id: z.number(),
  quantity: z.number().int().positive("Quantity must be positive")
});

export type UpdateOrderItemInput = z.infer<typeof updateOrderItemInputSchema>;

// Combined schemas for complex operations
export const orderWithItemsSchema = z.object({
  id: z.number(),
  table_id: z.number(),
  status: orderStatusEnum,
  total_amount: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  items: z.array(orderItemSchema),
  table: tableSchema
});

export type OrderWithItems = z.infer<typeof orderWithItemsSchema>;