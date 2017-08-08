define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "GET",
    "name": "_",
    "group": "search",
    "description": "<p>Primary search functionality. Parameters listed are shared across satellites (Landsat-8 and Sentinel-2). Satellite specific parameters can be searched on via exact match like <code>path=30</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "defaultValue": "1",
            "description": "<p>Limit of results to return.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "defaultValue": "0",
            "description": "<p>Results to skip in return.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Results page to view.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fields",
            "description": "<p>Comma separated list of fields to include in the query results. Ex: <code>?fields=scene_id,date,cloud_coverage</code>.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contains",
            "description": "<p>Comma separated lists of form <code>longitude,latitude</code>. Returns results if the point  is within the bounding box of an image. Ex <code>?contains=40.23,70.76</code>.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "intersects",
            "description": "<p>Valid GeoJSON, returns results that touch any point of the geometry.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scene_id",
            "description": "<p>Performs exact search on sceneID field.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cloud_from",
            "description": "<p>The lower limit for cloud_coverage field.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cloud_to",
            "description": "<p>The upper limit for cloud_coverage field.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "date_from",
            "description": "<p>The lower limit for date field.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "date_to",
            "description": "<p>The upper limit for date field.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Metadata about the search endpoint.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.found",
            "description": "<p>Total number of results returned from this query.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meta.name",
            "description": "<p>API name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meta.license",
            "description": "<p>API license.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meta.website",
            "description": "<p>API endpoint.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.page",
            "description": "<p>Results page being viewed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.limit",
            "description": "<p>Limit of results to return.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "results",
            "description": "<p>Query results.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "results.scene_id",
            "description": "<p>Scene ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "results.satellite_name",
            "description": "<p>Satellite name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "results.cloud_coverage",
            "description": "<p>Cloud coverage.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "results.date",
            "description": "<p>Date when image was taken.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "results.thumbnail",
            "description": "<p>Thumbnail for the scene.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "results.data_geometry",
            "description": "<p>GeoJSON representing the scene outline.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Minimal Success Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"meta\": {\n    \"found\": 2257062,\n    \"name\": \"sat-api\",\n    \"license\": \"CC0-1.0\",\n    \"website\": \"https://api.developmentseed.org/satellites/\",\n    \"page\": 1,\n    \"limit\": 1\n  },\n  \"results\": [\n    {\n      \"scene_id\": \"LC81000202017030LGN00\",\n      \"satellite_name\": \"landsat-8\",\n      \"cloud_coverage\": 19.53,\n      \"date\": \"2017-01-30\",\n      \"thumbnail\": \"https://ad-thumbnails.s3.amazonaws.com/LC81000202017030LGN00.jpg\",\n      \"data_geometry\": {\n        \"crs\": {\n          \"type\": \"name\",\n          \"properties\": {\n            \"name\": \"urn:ogc:def:crs:EPSG:8.9:4326\"\n          }\n        },\n        \"type\": \"Polygon\",\n        \"coordinates\": [\n          [\n            [\n              161.38522,\n              57.878\n            ],\n            [\n              158.27701,\n              58.39804\n            ],\n            [\n              157.37548,\n              56.70892\n            ],\n            [\n              160.35236,\n              56.20273\n            ],\n            [\n              161.38522,\n              57.878\n            ]\n          ]\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Full Success Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"meta\": {\n    \"found\": 2257062,\n    \"name\": \"sat-api\",\n    \"license\": \"CC0-1.0\",\n    \"website\": \"https://api.developmentseed.org/satellites/\",\n    \"page\": 1,\n    \"limit\": 1\n  },\n  \"results\": [\n    {\n      \"scene_id\": \"LC81000202017030LGN00\",\n      \"satellite_name\": \"landsat-8\",\n      \"cloud_coverage\": 19.53,\n      \"date\": \"2017-01-30\",\n      \"thumbnail\": \"https://ad-thumbnails.s3.amazonaws.com/LC81000202017030LGN00.jpg\",\n      \"data_geometry\": {\n        \"crs\": {\n          \"type\": \"name\",\n          \"properties\": {\n            \"name\": \"urn:ogc:def:crs:EPSG:8.9:4326\"\n          }\n        },\n        \"type\": \"Polygon\",\n        \"coordinates\": [\n          [\n            [\n              161.38522,\n              57.878\n            ],\n            [\n              158.27701,\n              58.39804\n            ],\n            [\n              157.37548,\n              56.70892\n            ],\n            [\n              160.35236,\n              56.20273\n            ],\n            [\n              161.38522,\n              57.878\n            ]\n          ]\n        ]\n      },\n      \"browseAvailable\": \"Y\",\n      \"browseURL\": \"http://earthexplorer.usgs.gov/browse/landsat_8/2017/100/020/LC81000202017030LGN00.jpg\",\n      \"sceneID\": \"LC81000202017030LGN00\",\n      \"sensor\": \"OLI_TIRS\",\n      \"acquisitionDate\": \"2017-01-30\",\n      \"dateUpdated\": \"2017-01-29\",\n      \"path\": 100,\n      \"row\": 20,\n      \"upperLeftCornerLatitude\": 58.39804,\n      \"upperLeftCornerLongitude\": 158.27701,\n      \"upperRightCornerLatitude\": 57.878,\n      \"upperRightCornerLongitude\": 161.38522,\n      \"lowerLeftCornerLatitude\": 56.70892,\n      \"lowerLeftCornerLongitude\": 157.37548,\n      \"lowerRightCornerLatitude\": 56.20273,\n      \"lowerRightCornerLongitude\": 160.35236,\n      \"sceneCenterLatitude\": 57.30952,\n      \"sceneCenterLongitude\": 159.3503,\n      \"cloudCover\": 1,\n      \"cloudCoverFull\": 19.53,\n      \"dayOrNight\": \"DAY\",\n      \"sunElevation\": 13.6553746,\n      \"sunAzimuth\": 163.05483232,\n      \"receivingStation\": \"LGN\",\n      \"sceneStartTime\": \"2017:030:00:26:23.6556890\",\n      \"sceneStopTime\": \"2017:030:00:26:55.4256860\",\n      \"imageQuality1\": 9,\n      \"DATA_TYPE_L1\": \"L1T\",\n      \"cartURL\": \"http://earthexplorer.usgs.gov/order/process?dataset_name=LANDSAT_8&ordered=LC81000202017030LGN00\",\n      \"ROLL_ANGLE\": -0.001,\n      \"GEOMETRIC_RMSE_MODEL_X\": 10.185,\n      \"GEOMETRIC_RMSE_MODEL_Y\": 11.822,\n      \"FULL_PARTIAL_SCENE\": \"FULL\",\n      \"NADIR_OFFNADIR\": \"NADIR\",\n      \"PROCESSING_SOFTWARE_VERSION\": \"LPGS_2.6.2\",\n      \"CPF_NAME\": \"L8CPF20170101_20170331.02\",\n      \"RLUT_FILE_NAME\": \"L8RLUT20150303_20431231v11.h5\",\n      \"BPF_NAME_OLI\": \"LO8BPF20170130002250_20170130010416.01\",\n      \"BPF_NAME_TIRS\": \"LT8BPF20170126095930_20170126100746.01\",\n      \"GROUND_CONTROL_POINTS_MODEL\": 178,\n      \"GROUND_CONTROL_POINTS_VERSION\": 4,\n      \"DATE_L1_GENERATED\": \"2017-01-29 22:17:21\",\n      \"TIRS_SSM_MODEL\": \"PRELIMINARY\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/index.js",
    "groupTitle": "search"
  }
] });
