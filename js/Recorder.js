var recorder = {}

console.log('whooo')

recorder.controller = function() {
	this.recording = m.prop(false)
	this.blob = m.prop('')
	this.blobURL = m.prop('')
	this.text = m.prop('')

    this.record = function() {

    	if (!this.recording()) {

    		// Binding this to Mic.record makes it go nuts
    		var _this = this
    		Mic.record(function(blob) {
    			_this.blob(blob)
    			_this.blobURL(URL.createObjectURL(blob))
    			m.redraw()
    		})
    	} else
    		Mic.stop()

    	this.recording(!this.recording())

    }.bind(this)

    this.postResult = function() {
    	this.text('This will return the processed text outta the audio')
    	activityRequest.postResult(this.text())
    }.bind(this)
}

recorder.view = function(ctrl) {
    return m("div", [
            m("button", { class: ctrl.recording(), onclick: ctrl.record }, ctrl.recording()),
            m("audio", {autoplay: true, controls: true, src: ctrl.blobURL() }),
            m("button", { onclick: ctrl.postResult }, "OK")
    ])
}

m.module(document.body, recorder)

navigator.mozSetMessageHandler('activity', function(activityRequest) {

    window.activityRequest = activityRequest

})