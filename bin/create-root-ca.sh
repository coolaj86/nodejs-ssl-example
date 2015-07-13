#!/bin/bash
set -u
set -e

# make directories to work from
mkdir -p certs/{server,client,ca,tmp}

# Create your very own Root Certificate Authority
openssl genrsa \
  -out certs/ca/my-root-ca.key.pem \
  2048

# Self-sign your Root Certificate Authority
# Since this is private, the details can be as bogus as you like
openssl req \
  -x509 \
  -new \
  -sha256 \
  -nodes \
  -key certs/ca/my-root-ca.key.pem \
  -days 3652 \
  -out certs/ca/my-root-ca.crt.pem \
  -subj "/C=US/ST=Utah/L=Provo/O=ACME Signing Authority Inc/CN=example.com"

# NOTE
# -nodes means "no-des" which means "no passphrase"
# -days 3652 means that this example will break about 10 years from now
