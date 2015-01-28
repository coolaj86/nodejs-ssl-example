HTTPS 2048-bit RSA TLS/SSL Cert Example
====

This is targeted towards people who are using io.js / node.js,
but as far as generating and testing certs, these are the exact
same **openssl** commands you'd use with any language.


Here's the zero-config example:

```
git clone https://github.com/coolaj86/nodejs-ssl-example.git

pushd nodejs-ssl-example

npm install
node ./serve.js
```

Then visit <https://local.helloworld3000.com:8043>.

**Note**: Your browser will warn you that you the server is using a bogus
certificate authority. That's okay for the purposes of this example.

Special Notes
----

The key to this example is that **the certs are not self-signed**.
Using self-signed certs is the stupidest thing that anyone ever tried to do in a browser.

Instead, a bogus Root CA is created. Then the bogus Root CA is used to sign the certificates.

If only the world knew that all you have to do to fix Self-Signed Certificate errors
is to create one additional certificate and use that as the Certificate Authority...

Full Article
-----

See the full article at
[How to create a Certificate Signing Request (CSR) for HTTPS (TLS/SSL) RSA PEMs](http://blog.coolaj86.com/articles/how-to-create-a-csr-for-https-tls-ssl-rsa-pems/)
