navigator.mozSetMessageHandler('activity', function(activityRequest) {

	activityRequest.postResult('text')
	// activityRequest.postError("Didn't catch that")

})