const whichEnv = (process.env.NODE_ENV === 'production') ? 'prod' : 'alpha';

export default {
  app: {
    apiUrl: `https://api.${whichEnv}.sardius.media`,
    test: 'test',
  },
  auth: {
    loginStuff: 'test',
    auth: '',
  },
};
