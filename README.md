## sat-api-express

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This is an express implementation of sat-api.

### Installation

Make sure you have an instance of Elasticsearch running. To populate it with Landsat and Sentinel metadata refer to [landsat8-metadata](https://github.com/sat-utils/landsat8-metadata) and [sentinel2-metadata](https://github.com/sat-utils/sentinel2-metadata)

    $ npm install
    $ node index.js

### Documentation

Documentation can be found at http://docs.sat-utils.org/.

It is generated from this repo using [`apidoc`](https://www.npmjs.com/package/apidoc):

```bash
apidoc -i app/ -o apidoc/
```


### About
Sat API Express was made by [Development Seed](http://developmentseed.org).
