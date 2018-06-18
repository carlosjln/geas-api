'use strict';

const User = require( '../models/user' );
const HttpStatusCode = require( '../constants/http-status-codes' );
const AppicationError = require( '../errors' );
const UserError = require( '../errors/user-error' );

function setup_routes( express ) {
	express.route( '/user/login' )
		.post( authenticate )
		.delete( logout );
}

function authenticate( request, response ) {
	let params = request.body;
	let username = params.username;
	let password = params.password;

	let query = {
		'username': username
	};

	User.findOne( query )
		.then( ( user ) => {
			if ( user ) {
				return user.compare_password( password )
					.then( ( match ) => {
						if ( match ) {

							response.setHeader( 'x-token', user.generate_token() );
							response.api.send( {
								authenticated: true
							} );

						} else {

							response.removeHeader( 'x-token' )
							response.status( HttpStatusCode.BAD_REQUEST );
							response.api.send_error( new UserError( 'INVALID_CREDENTIALS' ) );
						}

					} ).catch( ( error ) => {
						request.session.flash = {
							error_message: 'Invalid username or password.'
						};
						done( error );
					} );
			}

			request.session.flash = {
				error_message: 'Invalid username or password.'
			};
			done( null, false );
			// done( null, false, request.flash( 'error_message', 'Invalid username or password....' ) );
		} )
		.catch( ( error ) => {
			request.session.flash = {
				error_message: 'Invalid username or password.'
			};
			done( error );
		} );
}

function logout( request, response ) {

}

module.exports = {
	setup_routes,
	authenticate,
	logout
};