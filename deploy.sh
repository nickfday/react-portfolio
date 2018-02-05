echo "Building...."
npm run-script build
echo "Deploying to server...."
scp -r build/* nickf@finley-day.com:/var/www/portfolioReact
