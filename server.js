'use strict';

require( '../node_utilities/polyfills' );
require( '../node_utilities/api-response' );

const path = require( 'path' );
const helmet = require( 'helmet' );

const express = require( 'express' );
const app = express();

const config = require( 'config' );
const http_port = config.http.port;

const mongoose = require( 'mongoose' );

app.enable( 'trust proxy' );
app.use( helmet() );

/**
 * Database setup
 */
mongoose.Promise = global.Promise;
mongoose.plugin( require( 'mongoose-beautiful-unique-validation' ) );
mongoose.connect( config.mongodb.url );
mongoose.connection.on( 'error', console.error.bind( console, 'connection error:' ) );

// Setup application routes
require( './controllers' ).setup( app );

// Start listening for requests
app.listen( http_port, () => {
	console.log( `Server up on port ${http_port}` )
} );

module.exports = app;