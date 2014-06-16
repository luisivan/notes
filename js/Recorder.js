var recorder = {}

recorder.controller = function() {
	this.recording = m.prop(false)
	this.blob = m.prop('')

    this.record = function() {

    	if (!this.recording()) {

    		var _this = this
    		Mic.record(function(blob) {
    			_this.blob(URL.createObjectURL(blob))
    			m.redraw()
    		})
    	} else
    		Mic.stop()

    	this.recording(!this.recording())

    }.bind(this)
}

recorder.view = function(ctrl) {
    return m("div", [
            m("button", { class: ctrl.recording(), onclick: ctrl.record }, ctrl.recording()),
            m("audio", {autoplay: true, controls: true, src: ctrl.blob() })
    ])
}

m.module(document.body, recorder)