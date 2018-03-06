const whichEnv = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

export default {
  apiUrl: `https://api.${whichEnv}.sardius.media`,
};
