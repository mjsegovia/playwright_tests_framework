export const urls = {
  // Application URLs
  playwright: 'https://playwright.dev/',
  bstackdemo: 'https://bstackdemo.com/',  
};

export const config = {
  base_url: process.env.BASE_URL || 'https://bstackdemo.com/',
  api_url: process.env.API_URL || 'https://reqres.in/api',
  env: process.env.ENV || 'development',
  headless: process.env.HEADLESS !== 'false',
  slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0, 
};