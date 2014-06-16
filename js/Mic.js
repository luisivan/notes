navigator.getUserMedia = ( navigator.getUserMedia || navigator.mozGetUserMedia )

var Mic = {}

Mic.record = function(cb) {

    navigator.getUserMedia({ audio: true }, Mic.successCallback.bind(cb), Mic.errorCallback)

}

Mic.successCallback = function(stream) {

    var cb = this

    Mic.stop = stream.stop.bind(stream)

    var recorder = new MediaRecorder(stream)
    
    recorder.ondataavailable = function(e) {
        cb(e.data)
    }

    recorder.onerror = recorder.onwarning = Mic.errorCallback
    
    recorder.start()
}

Mic.errorCallback = console.log.bind(console)

var bool = true

function test() {
    if (bool) {
        Mic.record(function(blob) {
            console.log(blob)
            var audio = document.querySelector('audio')
            audio.src = window.URL.createObjectURL(blob)            
        })
    } else
        Mic.stop()
    bool = !bool
}