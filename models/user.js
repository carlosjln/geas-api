const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );

const SALT_I = 10;

const user_schema = mongoose.Schema( {
	username: {
		type: String,
		require: true,
		trim: true,
		unique: 1
	},

	password: {
		type: String,
		require: true,
		minlength: [ 6, 'Su contraseña debe tener al menos 6 caractéres.' ]
	},

	created: {
		type: Date,
		default: Date.now
	},

	updated: {
		type: Date,
		default: null
	}
} );

// MODEL ERRORS
user_schema.statics.Error = Object.freeze( {
	WrongPassword: ( function () {
		function WrongPassword() {
			Error.captureStackTrace( this, this.constructor );

			this.name = this.constructor.name;
			this.message = 'Contraseña incorecta.';
		}

		WrongPassword.prototype = Object.create( Error.prototype );
		WrongPassword.prototype.constructor = Error;

		return WrongPassword;
	} )()
} );

// INSTANCE METHODS
user_schema.methods.generate_hash = function ( password ) {
	return bcrypt.hashSync( password, bcrypt.genSaltSync( SALT_I ), null );
};

user_schema.methods.compare_password = function ( password ) {
	return bcrypt.compare( password, this.password );
};

user_schema.methods.compare_password_sync = function ( password ) {
	return bcrypt.compareSync( password, this.password );
};

// HOOKS
user_schema.pre( 'save', function ( next ) {
	var user = this;
	this.updated = new Date();

	if ( user.isModified( 'password' ) ) {
		bcrypt.genSalt( SALT_I, function ( error, salt ) {
			if ( error ) {
				return next( error );
			}

			bcrypt.hash( user.password, salt, function ( error, hash ) {
				if ( error ) {
					return next( error );
				}

				user.password = hash;
				next();
			} )
		} )
	} else {
		next();
	}
} );

const User = mongoose.model( 'User', user_schema );

module.exports = User;