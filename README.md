HTTPS 2048-bit RSA TLS/SSL Cert Example
====

This is targeted towards people who are using io.js / node.js,
but as far as generating and testing certs, these are the exact
same **openssl** commands you'd use with any language.

ScreenCast
-----------

See <https://youtu.be/r92gqYHJc5c>

See the full article at
[How to create a Certificate Signing Request (CSR) for HTTPS (TLS/SSL) RSA PEMs](http://blog.coolaj86.com/articles/how-to-create-a-csr-for-https-tls-ssl-rsa-pems/)


Zero-Config Example
========

Clone and run - it's that easy.

1. Clone the Example
------------

```
git clone https://github.com/coolaj86/nodejs-ssl-example.git

pushd nodejs-ssl-example

npm install
node ./serve.js 8043 4080
```

2. Go to <https://local.helloworld3000.com:8043>
-------------

Then visit <https://local.helloworld3000.com:8043>.

Note that <https://local.helloworld3000.com:4080> will **redirect to https**.

**Note**: This points to **your localhost** but since it's very difficult to
develop, especially with HTTPS, with `127.0.0.1`, `localhost`, or `file://`,
I maintain `local.helloworld3000.com` and `local.foobar3000.com`
for examples such as this one.

**Note**: Your browser will warn you that you the server is using a bogus
certificate authority. That's okay for the purposes of this example.

Special Notes
----

The key to this example is that the certs are not self-signed **root** certificates.
Using self-signed root certs is the stupidest thing that anyone ever tried to do in a browser.

Instead, the self-signed **Root CA** is used to sign the certificate that the browser / other
http client will use. That's why this example works where others fail. It doesn't violate the rules for Root certs.

If only the world knew that all you have to do to fix Self-Signed Certificate errors
is to create one additional certificate and serve that instead of the root...

Full Article
-----

See the full article at
[How to create a Certificate Signing Request (CSR) for HTTPS (TLS/SSL) RSA PEMs](http://blog.coolaj86.com/articles/how-to-create-a-csr-for-https-tls-ssl-rsa-pems/)

SSL Warnings
============

This example uses **dummy SSL certificates** that are not recognized
by your browser.

There's nothing wrong with the example.
**The browser security warnings are normal**.
It's simply your browser letting
you know that these certificates are not from a recognized vendor.

![](https://i.imgur.com/d5mXvGa.png)

![](https://i.imgur.com/RDjfEE5.png)

![](https://i.imgur.com/xRnNSDQ.png)

**If you deploy your "real" app publicly** you should swap them with your own certificates.

**TODO**: During Summer 2015 Mozilla will make basic SSL certificates available
to all web hosts for free be (see [Let's Encrypt](https://letsencrypt.org/)).
Someone remind me to come back and update the instructions for the
free certificates if this notice is still here in August.


Other SSL Resources
=========

Zero-Config clone 'n' run (tm) Repos:


* [io.js / node.js HTTPS SSL Example](https://github.com/coolaj86/nodejs-ssl-example)
* [io.js / node.js HTTPS SSL Self-Signed Certificate Example](https://github.com/coolaj86/nodejs-self-signed-certificate-example)
* [io.js / node.js HTTPS SSL Trusted Peer Client Certificate Example](https://github.com/coolaj86/nodejs-ssl-trusted-peer-example)
* [SSL Root CAs](https://github.com/coolaj86/node-ssl-root-cas)

Articles

* [http://greengeckodesign.com/blog/2013/06/15/creating-an-ssl-certificate-for-node-dot-js/](Creating an SSL Certificate for node.js)
* [http://www.hacksparrow.com/express-js-https-server-client-example.html/comment-page-1](HTTPS Trusted Peer Example)
* [How to Create a CSR for HTTPS SSL (demo with name.com, node.js)](http://blog.coolaj86.com/articles/how-to-create-a-csr-for-https-tls-ssl-rsa-pems/)
* [coolaj86/Painless-Self-Signed-Certificates-in-node](https://github.com/coolaj86/node-ssl-root-cas/wiki/Painless-Self-Signed-Certificates-in-node.js)
