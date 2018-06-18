const AppicationError = require( './' );

/**
 * User specific error
 */
function UserError( code, message, details ) {
	Error.call( this );

	if ( Error.captureStackTrace ) {
		Error.captureStackTrace( this, UserError )
	} else {
		this.stack = new Error().stack;
	}

	this.type = 'UserError';
	this.code = code;
	this.message = message;
	this.details = details;
}

UserError.prototype = Object.create( Error.prototype );
UserError.prototype.constructor = Error;

module.exports = UserError;