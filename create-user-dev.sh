echo "[request creating user dev]"
curl -i localhost:3000/create-user-dev -X POST -H 'Content-Type: application/json' -d '{ "name": "Stylish", "email": "stylish@mail.com" }'