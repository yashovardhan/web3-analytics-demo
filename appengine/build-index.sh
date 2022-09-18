#!/bin/bash

if [ -z ${CONTRACT_ADDRESS+x} ]; then
  echo '$CONTRACT_ADDRESS is not set'
  exit 1
fi
if [ -z ${TOKEN_ADDRESS+x} ]; then
  echo '$TOKEN_ADDRESS is not set'
  exit 1
fi

cp public/index.html.in public/index.html
perl -pi -e 's/___CONTRACT_ADDRESS___/$ENV{CONTRACT_ADDRESS}/' public/index.html
perl -pi -e 's/___TOKEN_ADDRESS___/$ENV{TOKEN_ADDRESS}/' public/index.html
