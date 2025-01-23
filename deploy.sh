git reset --hard HEAD
git pull --all
git checkout master
git reset --hard HEAD
git pull --all
touch docker/production/acme.json
chmod 600 docker/production/acme.json
make stop-production
make build-production
make start-production