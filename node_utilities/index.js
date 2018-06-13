function convert_to_utc( date ) {
	return new Date( date.toUTCString().substr( 0, 25 ) );
	// return new Date( date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds() );
}

function count_weekdays( start_date, end_date, inclusive ) {
	inclusive = inclusive === void 0 ? true : !!inclusive;

	start_date = Date.parse( start_date );
	end_date = Date.parse( end_date );

	if ( isNaN( start_date ) || isNaN( end_date ) || ( start_date > end_date ) ) {
		return -1;
	}

	start_date = convert_to_utc( new Date( start_date ) );
	end_date = convert_to_utc( new Date( end_date ) );

	start_date.setHours( 0, 0, 0, 0 );
	end_date.setHours( 0, 0, 0, 0 );

	var index_date = new Date( start_date.getTime() );
	var max_date = new Date( end_date.getTime() );
	var count = 0;
	var day = 0;

	if ( !inclusive ) {
		index_date.setDate( index_date.getDate() + 1 );
		max_date.setDate( max_date.getDate() - 1 );
	}

	while ( index_date <= max_date ) {
		day = index_date.getDay();

		// skip sundays and saturdays
		if ( day !== 0 && day !== 6 ) {
			count = count + 1;
		}

		index_date.setDate( index_date.getDate() + 1 );
	}

	return count;
}

function get_month_last_day( month ) {
	var deit = new Date();

	deit.setHours( 0, 0, 0, 0 );
	deit.setMonth( month + 1 );
	deit.setDate( 0 );

	return deit.getDate();
}

function get_workdays( start_date, end_date, inclusive ) {
	inclusive = inclusive === void 0 ? true : !!inclusive;

	start_date = Date.parse( start_date );
	end_date = Date.parse( end_date );

	if ( isNaN( start_date ) || isNaN( end_date ) || ( start_date > end_date ) ) {
		return -1;
	}

	start_date = convert_to_utc( new Date( start_date ) );
	end_date = convert_to_utc( new Date( end_date ) );

	var index_date = new Date( start_date.getTime() );
	var max_date = new Date( end_date.getTime() );
	var dates = [];
	var day;

	if ( !inclusive ) {
		index_date.setUTCDate( index_date.getUTCDate() + 1 );
		max_date.setUTCDate( max_date.getUTCDate() - 1 );
	}

	while ( index_date <= max_date ) {
		day = index_date.getUTCDay();

		// skip sundays and saturdays
		if ( day !== 0 && day !== 6 ) {
			dates.push( ( new Date( index_date ) ).trimUTCHours() );
		}

		index_date.setUTCDate( index_date.getUTCDate() + 1 );
	}

	return dates;
}

module.exports = {
	date: {
		convert_to_utc,
		get_month_last_day,
		get_workdays,
		count_weekdays
	}
}