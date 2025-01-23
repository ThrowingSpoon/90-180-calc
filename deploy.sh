if test -d docker/production/acme.json; then
  echo "docker/production/acme.json already exists as a directory, you need to delete this directory and run the setup script again"
  return 1
fi
git reset --hard HEAD
git pull --all
git checkout master
git reset --hard HEAD
git pull --all
if ! test -f docker/production/acme.json; then
  echo "acme.json does not exist, creating..."
  touch docker/production/acme.json
  chmod 600 docker/production/acme.json
fi
make stop-production
make build-production
make start-production