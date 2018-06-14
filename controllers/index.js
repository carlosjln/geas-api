'use strict';

const UserError = require( '../errors/user-error' );

function setup( express ) {

	/**
	 * Default handler for unmatched routes
	 */
	express.use( function ( request, response, next ) {
		response.status( 404 ).send( new UserError( 404, "Welcome to Narnia!" ) );

		// response.status( 404 ).api.send( {
		// 	message: "Welcome to Narnia :)"
		// } );
	} );

	require( '../controllers/user_controller.js' ).setup_routes( express );
}

module.exports = {
	setup
};