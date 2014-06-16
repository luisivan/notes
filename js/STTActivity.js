navigator.mozSetMessageHandler('activity', function(activityRequest) {

	console.log(activityRequest)
	window.activityRequest = activityRequest
	//activityRequest.postResult('text')
	// activityRequest.postError("Didn't catch that")

})