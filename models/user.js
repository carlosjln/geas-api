const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

const ObjectId = mongoose.Types.ObjectId;
const config = require( '../config' );

const SALT_I = 10;

const user_schema = mongoose.Schema( {
	name: {
		type: String,
		require: true,
		trim: true,
	},

	email: {
		type: String,
		require: true,
		trim: true,
		unique: 1
	},

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

	token: {
		type: String,
		require: true
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

// INSTANCE METHODS
user_schema.methods.hash_password = function ( password ) {
	return bcrypt.hashSync( password, bcrypt.genSaltSync( SALT_I ), null );
};

user_schema.methods.compare_password = function ( password ) {
	return bcrypt.compare( password, this.password );
};

user_schema.methods.compare_password_sync = function ( password ) {
	return bcrypt.compareSync( password, this.password );
};

user_schema.methods.generate_token = function () {
	let token = jwt.sign( this.id, config.JWT.SECRET );
	this.token = token;

	return this.save();
}

user_schema.methods.remove_token = function () {
	const user = this;

	return user.update( {
		$unset: {
			token: 1
		}
	} );
}

// STATIC METHODS
user_schema.statics.find_by_token = function ( token ) {
	return new Promise( ( resolve, reject ) => {
		let callback = ( error, decode ) => {
			resolve( User.findOne( {
				'_id': ObjectId( decode ),
				'token': token
			}, {
				password: 0 // exclude this field
			} ) )
		}

		jwt.verify( token, config.JWT.SECRET, callback );
	} );
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
		} );
	} else {
		next();
	}
} );

const User = mongoose.model( 'User', user_schema );

module.exports = User;