git reset --hard HEAD
git pull --all
git checkout master
git reset --hard HEAD
git pull --all
make stop-production
make start-production