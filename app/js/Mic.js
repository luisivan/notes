navigator.getUserMedia = ( navigator.getUserMedia || navigator.mozGetUserMedia )

var Mic = {}

Mic.record = function(cb) {

    navigator.getUserMedia({ audio: true }, Mic.successCallback.bind(this, cb), Mic.errorCallback)

}

Mic.successCallback = function(cb, stream) {

    Mic.stop = stream.stop.bind(stream)

    var recorder = new MediaRecorder(stream)
    
    recorder.ondataavailable = function(e) {
        cb(e.data)
    }

    recorder.onerror = recorder.onwarning = Mic.errorCallback
    
    recorder.start()
}

Mic.errorCallback = console.log.bind(console)