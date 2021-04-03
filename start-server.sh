yarn global add pm2@4.5.6

cd publisher
yarn

cd ../subscriber
yarn
cd ..


pm2 start