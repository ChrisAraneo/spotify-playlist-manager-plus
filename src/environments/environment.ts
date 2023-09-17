import { clientId, clientSecret } from './secret';

export const environment = {
  production: true,
  grantType: 'client_credentials',
  clientId: clientId, // TODO Add to env variables set during deployment
  clientSecret: clientSecret, // TODO Add to env variables set during deployment
};
