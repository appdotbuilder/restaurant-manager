import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import {
  createMenuItemInputSchema,
  updateMenuItemInputSchema,
  createTableInputSchema,
  updateTableInputSchema,
  createOrderInputSchema,
  updateOrderInputSchema,
  addOrderItemInputSchema,
  updateOrderItemInputSchema,
  tableStatusEnum,
  orderStatusEnum
} from './schema';

// Import handlers
import { createMenuItem } from './handlers/create_menu_item';
import { getMenuItems, getMenuItemById, getMenuItemsByCategory } from './handlers/get_menu_items';
import { updateMenuItem } from './handlers/update_menu_item';
import { deleteMenuItem } from './handlers/delete_menu_item';

import { createTable } from './handlers/create_table';
import { getTables, getTableById, getTablesByStatus } from './handlers/get_tables';
import { updateTable } from './handlers/update_table';
import { deleteTable } from './handlers/delete_table';

import { createOrder } from './handlers/create_order';
import { getOrders, getOrderById, getOrderWithItems, getOrdersByStatus, getOrdersByTable } from './handlers/get_orders';
import { updateOrder } from './handlers/update_order';

import { addOrderItem } from './handlers/add_order_item';
import { getOrderItems, getOrderItemById } from './handlers/get_order_items';
import { updateOrderItem } from './handlers/update_order_item';
import { removeOrderItem } from './handlers/remove_order_item';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Menu Item routes
  createMenuItem: publicProcedure
    .input(createMenuItemInputSchema)
    .mutation(({ input }) => createMenuItem(input)),
  
  getMenuItems: publicProcedure
    .query(() => getMenuItems()),
  
  getMenuItemById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getMenuItemById(input.id)),
  
  getMenuItemsByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(({ input }) => getMenuItemsByCategory(input.category)),
  
  updateMenuItem: publicProcedure
    .input(updateMenuItemInputSchema)
    .mutation(({ input }) => updateMenuItem(input)),
  
  deleteMenuItem: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteMenuItem(input.id)),

  // Table routes
  createTable: publicProcedure
    .input(createTableInputSchema)
    .mutation(({ input }) => createTable(input)),
  
  getTables: publicProcedure
    .query(() => getTables()),
  
  getTableById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getTableById(input.id)),
  
  getTablesByStatus: publicProcedure
    .input(z.object({ status: tableStatusEnum }))
    .query(({ input }) => getTablesByStatus(input.status)),
  
  updateTable: publicProcedure
    .input(updateTableInputSchema)
    .mutation(({ input }) => updateTable(input)),
  
  deleteTable: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteTable(input.id)),

  // Order routes
  createOrder: publicProcedure
    .input(createOrderInputSchema)
    .mutation(({ input }) => createOrder(input)),
  
  getOrders: publicProcedure
    .query(() => getOrders()),
  
  getOrderById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getOrderById(input.id)),
  
  getOrderWithItems: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getOrderWithItems(input.id)),
  
  getOrdersByStatus: publicProcedure
    .input(z.object({ status: orderStatusEnum }))
    .query(({ input }) => getOrdersByStatus(input.status)),
  
  getOrdersByTable: publicProcedure
    .input(z.object({ tableId: z.number() }))
    .query(({ input }) => getOrdersByTable(input.tableId)),
  
  updateOrder: publicProcedure
    .input(updateOrderInputSchema)
    .mutation(({ input }) => updateOrder(input)),

  // Order Item routes
  addOrderItem: publicProcedure
    .input(addOrderItemInputSchema)
    .mutation(({ input }) => addOrderItem(input)),
  
  getOrderItems: publicProcedure
    .input(z.object({ orderId: z.number() }))
    .query(({ input }) => getOrderItems(input.orderId)),
  
  getOrderItemById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getOrderItemById(input.id)),
  
  updateOrderItem: publicProcedure
    .input(updateOrderItemInputSchema)
    .mutation(({ input }) => updateOrderItem(input)),
  
  removeOrderItem: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => removeOrderItem(input.id)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();