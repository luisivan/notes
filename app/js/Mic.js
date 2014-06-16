(function () {
  'use strict';

  var getUserMedia = (navigator.getUserMedia || navigator.mozGetUserMedia);
  var MediaRecorder = window.MediaRecorder;

  var Mic = window.Mic = {};

  Mic.record = function(cb) {

    getUserMedia({audio: true}, Mic.successCb.bind(this, cb), Mic.errorCb);

  };

  Mic.successCb = function(cb, stream) {

    Mic.stop = stream.stop.bind(stream);

    var recorder = new MediaRecorder(stream);

    recorder.ondataavailable = function(e) {
      cb(e.data);
    };

    recorder.onerror = recorder.onwarning = Mic.errorCb;

    recorder.start();
  };

  Mic.errorCb = console.log.bind(console);

}());
