#!/bin/bash

API="http://localhost:4741"
URL_PATH="/topics"

curl ${API}${URL_PATH} \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "topic": {
      "title": "'"${TITLE}"'",
      "side1":"'"${SIDE1}"'",
      "side2": "'"${SIDE2}"'"
    }
  }'

echo
