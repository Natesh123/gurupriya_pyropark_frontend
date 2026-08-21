export SSHPASS='Prasath@1990'

echo "Deploying Frontend..."
sshpass -e rsync -avz -e "ssh -o StrictHostKeyChecking=no" \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env*' \
  /Users/balaji/Documents/Natesh/Gurupriya\ Pyropark/gurupriya_pyropark_frontend/ \
  root@103.191.208.98:/var/www/gurupriyapyropark/frontend/

echo "Deploying Backend..."
sshpass -e rsync -avz -e "ssh -o StrictHostKeyChecking=no" \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env*' \
  /Users/balaji/Documents/Natesh/Gurupriya\ Pyropark/gurupriya_pyropark_backend/ \
  root@103.191.208.98:/var/www/gurupriyapyropark/backend/

echo "Restarting PM2 on Server..."
sshpass -e ssh -o StrictHostKeyChecking=no root@103.191.208.98 << 'INNEREOF'
  source ~/.nvm/nvm.sh || true
  
  echo "Installing frontend dependencies..."
  cd /var/www/gurupriyapyropark/frontend
  npm install --production

  echo "Installing backend dependencies..."
  cd /var/www/gurupriyapyropark/backend
  npm install --production

  echo "Restarting pm2..."
  pm2 restart all
INNEREOF

echo "Deployment completed!"
