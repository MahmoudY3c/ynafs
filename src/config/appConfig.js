
const config = {
  BaseURL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BaseURL : '/api',
  KEY: process.env.REACT_APP_KEY,
};

export default config;
