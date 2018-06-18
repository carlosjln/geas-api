'use strict';

const User = require( '../models/user' );
const HttpStatusCode = require( '../constants/http-status-codes' );
const AppicationError = require( '../errors' );
const UserError = require( '../errors/user-error' );

function setup_routes( express ) {
	express.route( '/user' ).post( create );
	express.route( '/user/login' ).post( login );
	express.route( '/user/logout' ).delete( logout );
}

// TODO: Creating a user must requre an authenticated user 

function create( request, response ) {
	let params = request.body;
	let username = params.username;
	let password = params.password;

	User.findOne( {
			'username': username
		} )
		.then( ( user ) => {
			if ( user ) {
				return response.status( 500 ).send( {
					message: 'Username already taken.'
				} );
			}

			var new_user = new User();
			new_user.username = username;
			new_user.password = password;

			new_user.save()
				.then( function ( document ) {
					response.status( 200 ).send( document );
				} )
				.catch( function ( error ) {
					response.status( 500 ).send( error );
				} );
		} )
		.catch( ( error ) => {
			response.status( 500 ).send( error );
		} );
}

function login( request, response ) {
	let params = request.body;
	let username = params.username;
	let password = params.password;

	let invalid_credentials = () => {
		response.removeHeader( 'x-token' )
		response.status( HttpStatusCode.UNAUTHORIZED );
		response.api.send_error( new UserError( 'INVALID_CREDENTIALS' ) );
	};

	let query = {
		'username': username
	};

	User.findOne( query )
		.then( ( user ) => {
			return user || Promise.reject( 'USER_NOT_FOUND' );
		} )
		.then( ( user ) => {
			return user.compare_password( password ).then( ( match ) => {
				if ( match ) {
					return user.generate_token()
						.then( ( user ) => {
							response.setHeader( 'x-token', user.token );
							response.api.send( {
								authenticated: true
							} );
						} )
				}

				return Promise.reject( 'PASSWORD_MATCH_FAILED' );
			} );
			// .catch( ( error ) => {
			// 	// TODO: Log error
			// 	invalid_credentials();
			// } );

		} )
		.catch( ( error ) => {
			// TODO: Log error
			invalid_credentials();
		} );
}

function logout( request, response ) {

}

module.exports = {
	setup_routes,
	login,
	logout
};