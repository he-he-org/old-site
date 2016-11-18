#!/usr/bin/env bash
docker-compose down
docker-compose up --build -d
rsync -avP `pwd`/ rsync://localhost:10873/volume/  > /dev/null 2>&1
fswatch -e "/\." -o . | xargs -n 1 -I{} rsync -avP `pwd`/ --exclude `pwd`/web/dev/** rsync://localhost:10873/volume/ > /dev/null 2>&1 &

docker exec -it repo_web_1 bash
kill %%
docker-compose down
