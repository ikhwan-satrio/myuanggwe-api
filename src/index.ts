import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { dashboardGroup } from '#server/lib/groups/dashboard';
import { walletsGroup } from '#server/lib/groups/wallets';
import { transactionsGroup } from '#server/lib/groups/transactions';
import { categoriesGroup } from '#server/lib/groups/categories';
import { budgetsGroup } from '#server/lib/groups/budgets';
import { recurringGroup, processRecurringTransactions } from '#server/lib/groups/recurring';
import { goalsGroup } from '#server/lib/groups/goals';
import { orgsGroups } from '#server/lib/groups/orgs/switch';
import { manageOrgsGroup } from '#server/lib/groups/orgs/manage';
import { auth } from './lib/auth/auth';
import { betterAuthMiddleware } from './lib/middlewares/better-auth';
import { userDataMiddleware } from './lib/middlewares/user-data';

const app = new Hono().basePath('/api')

app.use('*', cors({
  origin: [
    'http://localhost:5173',
    'https://myuanggwe.vercel.app'
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization']
}))

// auth handler harus sebelum middleware lain
app.on(['POST', 'GET'], '/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

app.use('*', betterAuthMiddleware);
app.use('*', userDataMiddleware);

// layout route
app.get('/layout', async (c) => {
  const user = c.get('user');
  const authSession = c.get('session');
  const activeOrg = c.get('activeOrg');
  const organizations = c.get('organizations');

  if (!authSession) {
    return c.json({ user: null, activeOrg: null, organizations: [] });
  }

  await processRecurringTransactions(user.id, activeOrg?.id);
  return c.json({ user, session: authSession, organizations, activeOrg });
});

// route groups — pakai .route() bukan .use()
app.route('/orgs', orgsGroups);
app.route('/dashboard', dashboardGroup);
app.route('/wallets', walletsGroup);
app.route('/transactions', transactionsGroup);
app.route('/categories', categoriesGroup);
app.route('/manage-orgs', manageOrgsGroup);
app.route('/budgets', budgetsGroup);
app.route('/recurring', recurringGroup);
app.route('/goals', goalsGroup);

export default app;
