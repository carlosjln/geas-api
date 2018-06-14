const http = require( 'http' );

const HttpStatusCode = require( '../constants/http-status-codes' );
const AppicationError = require( '../errors' );
const UserError = require( '../errors/user-error' );

class Response {
	constructor( data, success ) {
		if ( arguments.length === 1 ) {
			success = !( data instanceof AppicationError || data instanceof UserError || data instanceof ValidationError || data instanceof Error );
		}

		this.success = success = !!success;
		this.data = success ? data : null;
		this.error = !success ? data : null;
	}
}

class ValidationError {
	constructor( validators ) {
		this.code = 'ValidationErrors';
		this.message = 'Some fields did not meet the required validation criteria.';
		this.validators = validators;
	}

	static create( validators ) {
		return new ValidationError( validators );
	}
}

function get_mongoose_validators( error ) {
	let error_name = error.name;
	let validators = [];

	if ( error_name === 'ValidationError' ) {
		let errors = error.errors;

		for ( let path in errors ) {
			let validator_error = errors[ path ];

			if ( errors.hasOwnProperty( path ) && validator_error.hasOwnProperty( 'kind' ) && validator_error.hasOwnProperty( 'path' ) ) {
				validators[ validators.length ] = validator_error.properties;
			}
		}
	}

	return validators.length ? validators : null;
}

function get_validation_errors( error ) {
	// for now just return mongoose validators, but consider to add other filters
	return get_mongoose_validators( error )
}

Object.defineProperty( http.ServerResponse.prototype, 'api', {
	get: function () {
		let $this = this;

		return {
			send: function ( data ) {
				$this.send( new Response( data ) );
				return $this;
			},

			send_error: function ( object ) {
				let arguments_length = arguments.length;
				let first_arg = arguments[ 0 ];
				let second_arg = arguments[ 1 ];

				let response_status_code = $this.statusCode >= 400 ? $this.statusCode : 500;
				let validators;
				let output;

				if ( typeof first_arg == "string" ) {
					let error_code;
					let error_message;

					if ( arguments_length === 1 ) {
						error_code = '42-1'; // The developer was too lazy to designate a unique error code ¯\_(ツ)_/¯
						error_message = first_arg;
					} else {
						error_code = first_arg;
						error_message = second_arg;
					}

					output = new AppicationError( error_code, error_message );

				} else if ( validators = get_validation_errors( object ) ) {
					response_status_code = HttpStatusCode.BAD_REQUEST;

					// ValidationError contains a list of validators errors
					output = ValidationError.create( validators );

				} else if ( object instanceof AppicationError || object instanceof UserError ) {
					output = object;

					// if defined, use the error object http status code
					response_status_code = object.http_status_code || response_status_code;

				} else {
					// TODO: implement persistent log for later inspection
					console.log( 'Unhandled API Error' );
					console.log( object );

					// Insuficient data for a meaninful answer (╯°□°）╯┻━┻
					output = new AppicationError( '42', "Something somewhere went wrong, our geeks will be looking into it." );
				}


				$this.status( response_status_code ).send( new Response( output ) );
				return $this;
			}
		};
	}
} );

module.exports = {
	Response,

	get_validation_errors,
	get_mongoose_validators
};

// let the_bodies_hit_the_floor = {
// 	success: true,
// 	data: {
// 		gibberish
// 	},
// 	error: {
// 		code: '', // Unique internal identifier
// 		message: '', // Short description
// 		details: '', // A friendly message explaning the problem and possible solution

// 		// Validators attribute should be present only for HTTP Status code 400
// 		// The error name should be "FailedValidations"
// 		validators: [ {
// 			field: validator_error.path,
// 			message: validator_error.message,
// 			value: validator_error.value,
// 			type: validator_error.kind,

// 			// Other custom properties are accepted
// 		} ]

// 		// Other custom properties are accepted
// 	}
// };