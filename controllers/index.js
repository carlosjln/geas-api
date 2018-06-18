'use strict';

const UserError = require( '../errors/user-error' );

function setup( express ) {
	require( '../controllers/user_controller.js' ).setup_routes( express );

	/**
	 * Default handler for unmatched routes
	 */
	express.use( function ( request, response, next ) {
		response.status( 404 ).send( new UserError( 404, "Welcome to Narnia!" ) );
	} );
}

module.exports = {
	setup
};