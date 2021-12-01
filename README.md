##NOTE
Don't rebuild the static webfiles with webpack. Some dependencies are broken in package.json

### To run locally
```
npm run dev # builds static files. Don't run unless trying to fix
python3 -m pip install -r requirements.txt
python3 manage.py runserver
```
### Run in kubernetes
Set up database
```commandline
CREATE DATABASE budget_master

# export env vars

export DB_USER=postgres
export DB_PASSWORD=mypw
export DB_HOST=my.ip.to.the.db
export DB_PORT=5432 # Should be k8 LB port

# sets up initial tables for django
python3 manage.py migrate
```
```commandline
helm install budget_master ./charts/budget_master/ -n whatever
```

#DB secrets

For kubernetes deployment make sure there is a postgres-credentials secret in same namespace

For all other deployments make sure the env vars are available similar to example above.