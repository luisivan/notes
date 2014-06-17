(function () {
  'use strict';

  var navigator = window.navigator;
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.mozGetUserMedia;

  var MediaRecorder = window.MediaRecorder;

  var Mic = window.Mic = {};

  Mic.record = function() {

    return new Promise(function(resolve, reject) {
      navigator.getUserMedia(
        {audio: true},
        Mic._callback.bind(this, resolve, reject),
        reject);
    });

  };

  Mic.stop = function() {
    Mic._stream.stop.bind(Mic._stream);
    if (!Mic._stream) console.log('Call record before stop')
    Mic._stream = null;
  };

  Mic._callback = function(resolve, reject, _stream) {

    Mic._stream = _stream;

    var recorder = new MediaRecorder(_stream);

    recorder.ondataavailable = function(e) {
      resolve(e.data);
    };

    recorder.onerror = reject;

    recorder.start();
  };

}());
