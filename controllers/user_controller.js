'use strict';

const User = require( '../models/user' );
const HttpStatusCode = require( '../constants/http-status-codes' );
const AppicationError = require( '../errors' );
const UserError = require( '../errors/user-error' );

function setup_routes( express ) {
	express.route( '/user' ).post( create );
	express.route( '/user/login' ).post( login );
	express.route( '/user/logout' ).delete( logout );

	express.route( '/middlewares' ).get( function ( request, response ) {
		response.api.send( request.user );
	} );
}

// TODO: Creating a user must requre an authenticated user 

function create( request, response ) {
	let params = request.body;

	let name = params.name;
	let email = params.email;
	let username = params.username;
	let password = params.password;

	User.findOne( {
			'username': username
		} )
		.then( ( user ) => {
			if ( user ) {
				response.status( HttpStatusCode.CONFLICT );
				return response.api.send_error( new UserError( 'USERNAME_TAKEN' ) );
			}

			var new_user = new User();

			new_user.name = name;
			new_user.email = email;
			new_user.username = username;
			new_user.password = password;

			return new_user.save().then( function ( document ) {
				response.status( HttpStatusCode.CREATED );
				response.api.send( {
					name: document.name,
					email: document.email,
					username: document.username
				} );
			} )
		} )
		.catch( ( error ) => {
			// TODO: log error
			response.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).send_error( error );
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
					return user.generate_token().then( ( user ) => {
						response.setHeader( 'x-token', user.token );
						response.api.send( {
							authenticated: true
						} );
					} );
				}

				return Promise.reject( 'PASSWORD_MATCH_FAILED' );
			} );
		} )
		.catch( ( error ) => {
			// TODO: Log error
			invalid_credentials();
		} );
}

function logout( request, response ) {
	let token = request.header( 'x-token' );
	let user = request.user;

	if ( user == null ) {
		response.status( HttpStatusCode.NOT_FOUND );
		response.api.send_error( new AppicationError( 'INVALID_TOKEN' ) );
		return;
	}

	user.remove_token().then( () => {
		response.status( HttpStatusCode.ACCEPTED );
		response.api.send( {
			logout: true
		} );

	} ).catch( ( error ) => {
		// TODO: Log error
		response.status( HttpStatusCode.NOT_FOUND );
		response.api.send_error( new AppicationError( 'INVALID_TOKEN' ) );
	} );
}

module.exports = {
	setup_routes,
	login,
	logout
};