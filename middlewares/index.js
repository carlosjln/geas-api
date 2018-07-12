'use strict';

const User = require( '../models/user' );

function authenticate( request, response, next ) {
	const token = request.header( 'x-token' );

	User.find_by_token( token ).then( ( user ) => {
		request.token = token;
		request.user = user;
		next();
	} );

	// .catch( ( error ) => {
	// 	// TODO: Log error
	// 	response.status( HttpStatusCode.NOT_FOUND );
	// 	response.api.send_error( new AppicationError( 'INVALID_TOKEN' ) );
	// } )
	// .finally( () => {
	// 	next();
	// } )
}

function setup_routes( express ) {
	express.use( authenticate );
}

module.exports = {
	setup_routes
}