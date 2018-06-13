var status = {};
var code = {};

status[ code.CONTINUE = 100 ] = "Continue";
status[ code.SWITCHING_PROTOCOLS = 101 ] = "Switching Protocols";
status[ code.PROCESSING = 102 ] = "Processing";

status[ code.OK = 200 ] = "OK";
status[ code.CREATED = 201 ] = "Created";
status[ code.ACCEPTED = 202 ] = "Accepted";
status[ code.NON_AUTHORITATIVE_INFORMATION = 203 ] = "Non Authoritative Information";
status[ code.NO_CONTENT = 204 ] = "No Content";
status[ code.RESET_CONTENT = 205 ] = "Reset Content";
status[ code.PARTIAL_CONTENT = 206 ] = "Partial Content";
status[ code.MULTI_STATUS = 207 ] = "Multi-Status";

status[ code.MULTIPLE_CHOICES = 300 ] = "Multiple Choices";
status[ code.MOVED_PERMANENTLY = 301 ] = "Moved Permanently";
status[ code.MOVED_TEMPORARILY = 302 ] = "Moved Temporarily";
status[ code.SEE_OTHER = 303 ] = "See Other";
status[ code.NOT_MODIFIED = 304 ] = "Not Modified";
status[ code.USE_PROXY = 305 ] = "Use Proxy";
status[ code.TEMPORARY_REDIRECT = 307 ] = "Temporary Redirect";
status[ code.PERMANENT_REDIRECT = 308 ] = "Permanent Redirect";

status[ code.BAD_REQUEST = 400 ] = "Bad Request";
status[ code.UNAUTHORIZED = 401 ] = "Unauthorized";
status[ code.PAYMENT_REQUIRED = 402 ] = "Payment Required";
status[ code.FORBIDDEN = 403 ] = "Forbidden";
status[ code.NOT_FOUND = 404 ] = "Not Found";
status[ code.METHOD_NOT_ALLOWED = 405 ] = "Method Not Allowed";
status[ code.NOT_ACCEPTABLE = 406 ] = "Not Acceptable";
status[ code.PROXY_AUTHENTICATION_REQUIRED = 407 ] = "Proxy Authentication Required";
status[ code.REQUEST_TIMEOUT = 408 ] = "Request Timeout";
status[ code.CONFLICT = 409 ] = "Conflict";

status[ code.GONE = 410 ] = "Gone";
status[ code.LENGTH_REQUIRED = 411 ] = "Length Required";
status[ code.PRECONDITION_FAILED = 412 ] = "Precondition Failed";
status[ code.REQUEST_TOO_LONG = 413 ] = "Request Entity Too Large";
status[ code.REQUEST_URI_TOO_LONG = 414 ] = "Request-URI Too Long";
status[ code.UNSUPPORTED_MEDIA_TYPE = 415 ] = "Unsupported Media Type";
status[ code.REQUESTED_RANGE_NOT_SATISFIABLE = 416 ] = "Requested Range Not Satisfiable";
status[ code.EXPECTATION_FAILED = 417 ] = "Expectation Failed";
status[ code.IM_A_TEAPOT = 418 ] = "I'm a teapot";
status[ code.INSUFFICIENT_SPACE_ON_RESOURCE = 419 ] = "Insufficient Space on Resource";

status[ code.METHOD_FAILURE = 420 ] = "Method Failure";

status[ code.UNPROCESSABLE_ENTITY = 422 ] = "Unprocessable Entity";
status[ code.LOCKED = 423 ] = "Locked";
status[ code.FAILED_DEPENDENCY = 424 ] = "Failed Dependency";
status[ code.PRECONDITION_REQUIRED = 428 ] = "Precondition Required";
status[ code.TOO_MANY_REQUESTS = 429 ] = "Too Many Requests";

status[ code.REQUEST_HEADER_FIELDS_TOO_LARGE = 431 ] = "Request Header Fields Too Large";

status[ code.INTERNAL_SERVER_ERROR = 500 ] = "Server Error";
status[ code.NOT_IMPLEMENTED = 501 ] = "Not Implemented";
status[ code.BAD_GATEWAY = 502 ] = "Bad Gateway";
status[ code.SERVICE_UNAVAILABLE = 503 ] = "Service Unavailable";
status[ code.GATEWAY_TIMEOUT = 504 ] = "Gateway Timeout";
status[ code.HTTP_VERSION_NOT_SUPPORTED = 505 ] = "HTTP Version Not Supported";
status[ code.INSUFFICIENT_STORAGE = 507 ] = "Insufficient Storage";
status[ code.NETWORK_AUTHENTICATION_REQUIRED = 511 ] = "Network Authentication Required";

code.getText = function ( status_code ) {
	return status.hasOwnProperty( status_code ) ? status[ status_code ] : null;
};

module.exports = code;