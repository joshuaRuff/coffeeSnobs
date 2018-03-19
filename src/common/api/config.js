const whichEnv = (process.env.NODE_ENV === 'production') ? 'prod' : 'dev';

export default {
  apikey: 'e647bc6d-6ecf-4f2d-b8b8-c237accedd59',
  apiUrl: `https://api.${whichEnv}.sardius.media`,
};
