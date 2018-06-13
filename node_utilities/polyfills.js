// ARRAY - CUSTOM POLYFILLS AND STATIC METHODS
Array.prototype.contains = function ( object ) {
	return this.indexOf( object ) > -1;
};

Array.prototype.add = function ( item ) {
	let self = this;
	self[ self.length ] = item;
	return self;
};

Array.prototype.sort_by_date = function ( property_name, order ) {
	let ascending = ( ( order || 'ASC' ).toUpperCase() === 'ASC' );

	return this.sort( function ( a, b ) {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		let date_a = new Date( a[ property_name ] )
		let date_b = new Date( b[ property_name ] );

		return ascending ? date_a - date_b : date_b - date_a;
	} );
};

// Unlike Array.prototype.concat, .extend() modifies the current array and appends the items of the passed arrays
// Useage [1,2,3].extend([4, 5], [6,7], [8,9]);
// Returns [1, 2, 3, 4, 5, 6, 7, 8, 9]
Array.prototype.extend = function (...arrays) {
	let target = this;
	let target_length = target.length;

	// let arrays = Array.from( arguments );
	let arrays_length = arrays.length;

	if ( !arrays || arrays_length === 0 ) {
		return target;
	}

	let arrays_index = 0;
	let items;

	let item_index;
	let items_length;

	for ( let j = 0; j < arrays_length; j++ ) {
		items = arrays[ j ];
		items_length = items.length;

		if ( items === null || items === undefined ) {
			continue;
		}

		for ( let k = 0; k < items_length; k++ ) {
			target[ target_length ] = items[ k ];

			target_length += 1;
		}
	}

	return target;
};

Array.prototype.remove = function ( item ) {
	let self = this;
	let index;

	while ( ( index = self.indexOf( item ) ) > -1 ) {
		self.splice( index, 1 )[ 0 ];
	}

	return self;
};

Array.prototype.empty = function () {
	return this.splice( 0, this.length );
};

Array.prototype.get_by = function ( attribute, value ) {
	let index = this.length;
	let item;

	while ( index-- ) {
		item = this[ index ];

		if ( item && item[ attribute ] === value ) {
			return item;
		}
	}

	return null;
};

Array.prototype.get_last = function () {
	let self = this;
	let length = self.length;

	return length ? self[ length - 1 ] : null;
};

// TODO: DEPRECATED
Array.from_object = function ( array_like ) {
	if ( array_like === null || array_like === undefined ) {
		return [];
	}

	return Array.prototype.slice.call( array_like );
};

// TODO: DEPRECATED
Array.prototype.sum = function ( propery_name ) {
	let $this = this;
	let i_max = this.length;
	let item;
	let total = 0;

	for ( let i = 0; i < i_max; i++ ) {
		item = this[ i ];
		total = total + ( propery_name ? ( item[ propery_name ] || 0 ) : item );
	}

	return total;
};

// DATE - CUSTOM POLYFILLS
Date.UTCDate = function ( year, month, date, hours, minutes, seconds, milliseconds ) {
	return new Date( Date.UTC( year, month, date, hours || 0, minutes || 0, seconds || 0, milliseconds || 0 ) );
};

Date.prototype.trimUTCHours = function () {
	this.setUTCHours( 0, 0, 0, 0 );
	return this;
};

Date.prototype.trimHours = function () {
	this.setHours( 0, 0, 0, 0 );
	return this;
};