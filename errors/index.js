/**
 * Internal application error
 */
function AppicationError( code, message, details ) {
	Error.call( this );

	if ( Error.captureStackTrace ) {
		Error.captureStackTrace( this, AppicationError )
	} else {
		this.stack = new Error().stack;
	}

	this.type = 'Error';
	this.name = 'AppicationError';
	this.code = code;
	this.message = message;
	this.details = details;
}

AppicationError.prototype = Object.create( Error.prototype );
AppicationError.prototype.constructor = Error;

module.exports = AppicationError;

AppicationError.UserError = require('./user-error');
AppicationError.QueryError = require('./query-error');