'use strict';

function setup( express ) {
	require( '../controllers/user_controller.js' ).setup_routes( express );
}

module.exports = {
	setup
};