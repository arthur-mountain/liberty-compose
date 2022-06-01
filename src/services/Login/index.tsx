import instance from 'services/apiInstance';

export const lineLogin = () => {
  const url = '/api/login/line';

  return instance.get(url);
};
