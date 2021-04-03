module.exports = {
  apps : [
    {
      name: 'Publisher',
      script: './publisher/bin/start.js',
      watch: './publisher',
      env: {
        "NODE_ENV": "development"
      },
    }, 
    {
      name: 'GamingSubscriber1',
      script: './subscriber/bin/start.js/',
      watch: './subscriber',
      env: {
        "NODE_ENV": "development",
        "PORT": "8001",
        "TOPIC": "gaming"
      },
    },
    {
      name: 'GamingSubscriber2',
      script: './subscriber/bin/start.js/',
      watch: './subscriber',
      env: {
        "NODE_ENV": "development",
        "PORT": "8002",
        "TOPIC": "gaming"
      },
    },
    {
      name: 'FlashSubscriber',
      script: './subscriber/bin/start.js/',
      watch: './subscriber',
      env: {
        "NODE_ENV": "development",
        "PORT": "8003",
        "TOPIC": "flash"
      },
    }
  ],
};
