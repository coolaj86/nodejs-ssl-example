#!/bin/bash
set -u
set -e

# Sign the request from Device with your Root CA
openssl x509 \
  -req -in certs/tmp/my-server.csr.pem \
  -sha256 \
  -CA certs/ca/my-root-ca.crt.pem \
  -CAkey certs/ca/my-root-ca.key.pem \
  -CAcreateserial \
  -out certs/server/my-server.crt.pem \
  -days 1095

# If you already have a serial file, you would use that (in place of CAcreateserial)
# -CAserial certs/ca/my-root-ca.srl
