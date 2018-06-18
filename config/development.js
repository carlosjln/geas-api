module.exports = {
	debug_enabled: true,

	http: {
		port: 3000
	},

	cookie: {
		secure: false
	},
	
	session: {
		secret: 's3Cur3',
	},

	mongodb: {
		url: 'mongodb://localhost/invest_app',
		port: 27017
	},

	JWT: {
		SECRET: '!7wR&Tha+LkIR?nIcA!8'
	}
};