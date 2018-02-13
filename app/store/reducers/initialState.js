import { getToken } from '../../src/common/functions';

const whichEnv = (process.env.NODE_ENV === 'production') ? 'prod' : 'dev';

const token = getToken();
const sessionToken = token.sessionToken || '';
const sessionExpires = token.sessionExpires || '';

export default {
  app: {
    accountId: '-uniqueAccountId_1',
    accounts: [
      {
        id: '-KrXWhrxRAYPfu44QPJ0',
        name: 'Joyce Meyer\'s Minsitries',
      },
      {
        id: '-KyMV-J0vDqnClcSXs8p',
        name: 'Jim Bakker',
      },
      {
        id: '-K6FGrVYzVr92SDZiDnc',
        name: 'IHOPKC',
      },
      {
        id: '-uniqueAccountId_1',
        name: 'Sardius Media',
      },
    ],
    apiUrl: `https://api.${whichEnv}.sardius.media`,
    layouts: {},
    layoutsFetched: false,
    templates: {},
    templatesFetched: false,
  },
  auth: {
    token: sessionToken,
    expires: sessionExpires,
  },
};
