const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;

const testUrls = [
  'http://api.com',
  'https://api.com',
  'http://sub.api.com',
  'https://sub.api.com',
  'http://sub.api.com/url',
  'https://sub.api.com/url',
  'api.com',
  'sub.api.com',
  'any-random-text'
];

testUrls.forEach(url => {
  console.log(`${url} is ${regex.test(url) ? 'valid' : 'invalid'}`);
});