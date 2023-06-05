//iife - immediately invoked function expression:

(function (global) {

	//Set up namespace for our utility
	var ajaxUtils = {};

	//Returns an HTTP request object
	//not attached to ajaxUtils, so not available to outside world
	function getRequestObject() {
		if (window.XMLHttpRequest) {
			return (new XMLHttpRequest());
		}
		else {
			global.alert("Ajax is not supported");
			return(null);
		}
	}

	ajaxUtils.doesFileExist = 
		function(urlToFile)  {
		    var xhr = new XMLHttpRequest();
		    xhr.open('HEAD', urlToFile, false);
		    xhr.send();
		     
		    if (xhr.status == "404") {
		        return false;
		    } else {
		        return true;
		    }
		}

	//attached to ajaxUtils, so will be visible
	ajaxUtils.sendGetRequest = 
		function(requestUrl, sync, responseHandler) {
			var request = getRequestObject();
			request.onreadystatechange =
				function() {
					handleResponse(request,responseHandler);
				};
			request.open("GET",requestUrl,sync); //true means let it be asynchronous
			request.send(null); //for POST only
		};

	//Only calls user provided 'responseHandler'
		//function if response is ready and not an error

	function handleResponse(request,responseHandler) {
		if ((request.readyState==4) &&
			(request.status==200)) {//200 relates to the status code OK 
			responseHandler(request);
		}
	}

	// Expose utility to the global object
	global.$ajaxUtils = ajaxUtils;


})(window);