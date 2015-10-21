# express-ssl

express-ssl enforces SSL for Express apps.

## Use

Simply require and use the function exported by this module:

```javascript
var ssl = require('express-ssl');
var app = require('express')();
app.use(ssl());
```

The function requires an optional object of options:

- `disabled`: (default `false`) If `true`, this middleware will allow all
requests through.
- `disallow`: A function called with the request and response so that the user
can handle rejecting non-SSL requests themselves.

The function also leverages the following env variables:

- `NODE_ENV`: (default `development`) This middleware will not run when
`NODE_ENV` is set to development.
- `TRUST_PROXY`: (default `false`) If `true`, trust the `x-forwarded-proto`
header. If it is "https", requests are allowed through.

Unless a `disallow` function is supplied, this middleware will respond with the
status code 403 and the body "Please use HTTPS when communicating with this
server."
