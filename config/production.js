module.exports = {
	debug_enabled: false,
	
	http: {
		port: process.env.PORT
	},

	cookie: {
		secure: false
	},
	
	session: {
		secret: process.env.SESSION_SECRET_KEY
	},

	mongodb: {
		url: process.env.DATABASE_URL,
		port: process.env.DATABASE_PORT
	},

	JWT: {
		SECRET: process.env.JWT_SECRET
	}
};