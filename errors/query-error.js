const AppicationError = require( './' );

let DocumentNotFound = ( function () {
	function DocumentNotFound( id ) {
		AppicationError.call( this );

		this.name = 'DocumentNotFound';
		this.message = id ? `Document [${id}] was not found.` : 'Document was not found.';
		this.http_status_code = 404;
	}

	/**
	 * Inheritor of AppicationError
	 */
	DocumentNotFound.prototype = Object.create( AppicationError.prototype );
	DocumentNotFound.prototype.constructor = AppicationError;

	return DocumentNotFound;
} )()

let QueryError = {
	DocumentNotFound
};

module.exports = QueryError;