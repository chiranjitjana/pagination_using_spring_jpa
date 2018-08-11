function AjaxHandler()
{

}

AjaxHandler.makeAjaxCall=function(requestObject)
{
	var request = $.ajax({
	  url: requestObject.url,
	  type: requestObject.methodtype,
	  data: requestObject.data,
	  dataType: requestObject.datatype,
	  contentType:requestObject.contenttype
	});

	request.done(function(data,textStatus,jqXHR) {
		var responseData={};
		responseData.message=jqXHR.getResponseHeader("message");
		responseData.container=requestObject.container;
		responseData.data=data;
		requestObject.callbackFunction(responseData);
		
	});

	request.fail(function(jqXHR, textStatus,error) {
		var responseData={};
		responseData.message=jqXHR.getResponseHeader("message");
		responseData.container=requestObject.container;
		responseData.data=null;
		requestObject.callbackFunction(responseData);
		
	});
	
}


AjaxHandler.makeMutipartAjaxCall=function(requestObject)
{
	var request = $.ajax({
	  url: requestObject.url,
	  type: requestObject.methodtype,
	  data: requestObject.data,
	  enctype: 'multipart/form-data',
	  dataType: requestObject.datatype,
	  processData: false,
      contentType: false,
	});

	request.done(function(data,textStatus,jqXHR) {
		var responseData={};
		responseData.message=jqXHR.getResponseHeader("message");
		responseData.container=requestObject.container;
		responseData.data=data;
		requestObject.callbackFunction(responseData);
		
	});

	request.fail(function(jqXHR, textStatus,error) {
		var responseData={};
		responseData.message=jqXHR.getResponseHeader("message");
		responseData.container=requestObject.container;
		responseData.data=null;
		requestObject.callbackFunction(responseData);
		
	});
	
}