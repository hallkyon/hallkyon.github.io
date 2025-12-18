#!/bin/bash

curl -X PUT localhost:8080/graph/d135efee-d502-11f0-8ff2-63c49e2ab801 -d '{"properties": ["timestamp":"2025-12-18"]}' | jq .
