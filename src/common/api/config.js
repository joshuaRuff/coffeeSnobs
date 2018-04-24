const whichEnv = (process.env.NODE_ENV === 'production') ? 'prod' : 'dev';

export const securityRoutes = {
  '/routeone': ['admin', 'user'],
  '/routetwo': ['admin'],
  '/routethree': ['admin'],
};

export default {
  apikey: (whichEnv === 'prod') ? 'prodApiKey' : 'e647bc6d-6ecf-4f2d-b8b8-c237accedd59',
  apiUrl: `https://api.${whichEnv}.sardius.media`,
  securityRoutes: {
    '/routeone': ['admin', 'user'],
    '/routetwo': ['admin'],
    '/routethree': ['admin'],
  },
};
