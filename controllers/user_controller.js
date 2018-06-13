'use strict';

const User = require( '../models/user' );
const HttpStatusCode = require( '../constants/http-status-codes' );

function setup_routes( express ) {
	express.route( '/users/login' )
		.post( authenticate )
		.delete( logout );
}

function authenticate( request, response ) {

}

function logout( request, response ) {

}

module.exports = {
	setup_routes,
	authenticate,
	logout
};