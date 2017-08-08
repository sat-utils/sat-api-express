require('envloader').load();
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var compression = require('compression');
var api = require('sat-api-lib');
var app = express();

var search = function (action, req, res) {
  var s = new api(req);
  s[action](function (err, resp) {
    if (err) {
      return res.status(400).send({details: err.message});
    }
    return res.send(resp);
  });
};

/*----------------------------------
// START MIDDLEWARES
----------------------------------*/
app.use(cors());
app.use(compression())
app.use(bodyParser.json({ type: 'application/json' })); // for parsing application/json
app.use(function(err, req, res, next) {
  console.error(err.stack);
  if (err.status === 400 && err.name === 'SyntaxError' && err.body) {
    res.status(err.status).send({details: 'Invalid JSON'})
  }

  res.status(err.status).send({details: err.body.slice(0, 100).toString()});
});
/*----------------------------------
// END MIDDLEWARES
----------------------------------*/

/*----------------------------------
// START ENDPOINTS
----------------------------------*/

/**
 * @api {get} / GET
 * @apiName /
 * @apiGroup search
 * @apiDescription Primary search functionality. Parameters listed are shared across satellites (Landsat-8 and Sentinel-2).
 * Satellite specific parameters can be searched on via exact match like `path=30`.
 *
 * @apiParam {Number} limit=1 Limit of results to return.
 * @apiParam {Number} skip=0 Results to skip in return.
 * @apiParam {Number} page=1 Results page to view.
 * @apiParam {String} fields Comma separated list of fields to include in the query results. Ex: `?fields=scene_id,date,cloud_coverage`.
 * @apiParam {String} contains Comma separated lists of form `longitude,latitude`. Returns results if the point  is within the bounding box of an image. Ex `?contains=40.23,70.76`.
 * @apiParam {String} intersects Valid GeoJSON, returns results that touch any point of the geometry.
 * @apiParam {String} scene_id Performs exact search on sceneID field.
 * @apiParam {Number} cloud_from The lower limit for cloud_coverage field.
 * @apiParam {Number} cloud_to The upper limit for cloud_coverage field.
 * @apiParam {Number} date_from The lower limit for date field.
 * @apiParam {Number} date_to The upper limit for date field.
 *
 * @apiSuccess {Object} meta Metadata about the search endpoint.
 * @apiSuccess {Number} meta.found Total number of results returned from this query.
 * @apiSuccess {String} meta.name API name.
 * @apiSuccess {String} meta.license API license.
 * @apiSuccess {String} meta.website API endpoint.
 * @apiSuccess {Number} meta.page Results page being viewed.
 * @apiSuccess {Number} meta.limit Limit of results to return.
 * @apiSuccess {Object[]} results Query results.
 * @apiSuccess {String} results.scene_id Scene ID.
 * @apiSuccess {String} results.satellite_name Satellite name.
 * @apiSuccess {Number} results.cloud_coverage Cloud coverage.
 * @apiSuccess {String} results.date Date when image was taken.
 * @apiSuccess {String} results.thumbnail Thumbnail for the scene.
 * @apiSuccess {Object} results.data_geometry GeoJSON representing the scene outline.
 * @apiSuccessExample {json} Minimal Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "meta": {
 *     "found": 2257062,
 *     "name": "sat-api",
 *     "license": "CC0-1.0",
 *     "website": "https://api.developmentseed.org/satellites/",
 *     "page": 1,
 *     "limit": 1
 *   },
 *   "results": [
 *     {
 *       "scene_id": "LC81000202017030LGN00",
 *       "satellite_name": "landsat-8",
 *       "cloud_coverage": 19.53,
 *       "date": "2017-01-30",
 *       "thumbnail": "https://ad-thumbnails.s3.amazonaws.com/LC81000202017030LGN00.jpg",
 *       "data_geometry": {
 *         "crs": {
 *           "type": "name",
 *           "properties": {
 *             "name": "urn:ogc:def:crs:EPSG:8.9:4326"
 *           }
 *         },
 *         "type": "Polygon",
 *         "coordinates": [
 *           [
 *             [
 *               161.38522,
 *               57.878
 *             ],
 *             [
 *               158.27701,
 *               58.39804
 *             ],
 *             [
 *               157.37548,
 *               56.70892
 *             ],
 *             [
 *               160.35236,
 *               56.20273
 *             ],
 *             [
 *               161.38522,
 *               57.878
 *             ]
 *           ]
 *         ]
 *       }
 *     }
 *   ]
 * }
 * @apiSuccessExample {json} Full Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "meta": {
 *     "found": 2257062,
 *     "name": "sat-api",
 *     "license": "CC0-1.0",
 *     "website": "https://api.developmentseed.org/satellites/",
 *     "page": 1,
 *     "limit": 1
 *   },
 *   "results": [
 *     {
 *       "scene_id": "LC81000202017030LGN00",
 *       "satellite_name": "landsat-8",
 *       "cloud_coverage": 19.53,
 *       "date": "2017-01-30",
 *       "thumbnail": "https://ad-thumbnails.s3.amazonaws.com/LC81000202017030LGN00.jpg",
 *       "data_geometry": {
 *         "crs": {
 *           "type": "name",
 *           "properties": {
 *             "name": "urn:ogc:def:crs:EPSG:8.9:4326"
 *           }
 *         },
 *         "type": "Polygon",
 *         "coordinates": [
 *           [
 *             [
 *               161.38522,
 *               57.878
 *             ],
 *             [
 *               158.27701,
 *               58.39804
 *             ],
 *             [
 *               157.37548,
 *               56.70892
 *             ],
 *             [
 *               160.35236,
 *               56.20273
 *             ],
 *             [
 *               161.38522,
 *               57.878
 *             ]
 *           ]
 *         ]
 *       },
 *       "browseAvailable": "Y",
 *       "browseURL": "http://earthexplorer.usgs.gov/browse/landsat_8/2017/100/020/LC81000202017030LGN00.jpg",
 *       "sceneID": "LC81000202017030LGN00",
 *       "sensor": "OLI_TIRS",
 *       "acquisitionDate": "2017-01-30",
 *       "dateUpdated": "2017-01-29",
 *       "path": 100,
 *       "row": 20,
 *       "upperLeftCornerLatitude": 58.39804,
 *       "upperLeftCornerLongitude": 158.27701,
 *       "upperRightCornerLatitude": 57.878,
 *       "upperRightCornerLongitude": 161.38522,
 *       "lowerLeftCornerLatitude": 56.70892,
 *       "lowerLeftCornerLongitude": 157.37548,
 *       "lowerRightCornerLatitude": 56.20273,
 *       "lowerRightCornerLongitude": 160.35236,
 *       "sceneCenterLatitude": 57.30952,
 *       "sceneCenterLongitude": 159.3503,
 *       "cloudCover": 1,
 *       "cloudCoverFull": 19.53,
 *       "dayOrNight": "DAY",
 *       "sunElevation": 13.6553746,
 *       "sunAzimuth": 163.05483232,
 *       "receivingStation": "LGN",
 *       "sceneStartTime": "2017:030:00:26:23.6556890",
 *       "sceneStopTime": "2017:030:00:26:55.4256860",
 *       "imageQuality1": 9,
 *       "DATA_TYPE_L1": "L1T",
 *       "cartURL": "http://earthexplorer.usgs.gov/order/process?dataset_name=LANDSAT_8&ordered=LC81000202017030LGN00",
 *       "ROLL_ANGLE": -0.001,
 *       "GEOMETRIC_RMSE_MODEL_X": 10.185,
 *       "GEOMETRIC_RMSE_MODEL_Y": 11.822,
 *       "FULL_PARTIAL_SCENE": "FULL",
 *       "NADIR_OFFNADIR": "NADIR",
 *       "PROCESSING_SOFTWARE_VERSION": "LPGS_2.6.2",
 *       "CPF_NAME": "L8CPF20170101_20170331.02",
 *       "RLUT_FILE_NAME": "L8RLUT20150303_20431231v11.h5",
 *       "BPF_NAME_OLI": "LO8BPF20170130002250_20170130010416.01",
 *       "BPF_NAME_TIRS": "LT8BPF20170126095930_20170126100746.01",
 *       "GROUND_CONTROL_POINTS_MODEL": 178,
 *       "GROUND_CONTROL_POINTS_VERSION": 4,
 *       "DATE_L1_GENERATED": "2017-01-29 22:17:21",
 *       "TIRS_SSM_MODEL": "PRELIMINARY"
 *     }
 *   ]
 * }
 */

app.get('/', function(req, res) {
  search('simple', req, res);
});

app.post('/', function (req, res) {
  search('simple', {query: req.body}, res);
});

app.get('/landsat', function(req, res) {
  search('landsat', req, res);
});

app.post('/landsat', function (req, res) {
  search('landast', {query: req.body}, res);
});

app.get('/sentinel', function(req, res) {
  search('sentinel', req, res);
});

app.post('/sentinel', function (req, res) {
  search('sentinel', {query: req.body}, res);
});

app.get('/count', function(req, res) {
  search('count', req, res);
});

app.get('/geojson', function(req, res) {
  search('geojson', req, res);
});

app.post('/geojson', function(req, res) {
  search('geojson', {query: req.body}, res);
});

app.get('/health', function(req, res) {
  search('health', req, res);
});
/*----------------------------------
// END ENDPOINTS
----------------------------------*/

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});
