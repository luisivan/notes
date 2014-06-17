(function () {
  'use strict';

  var navigator = window.navigator;
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.mozGetUserMedia;

  var MediaRecorder = window.MediaRecorder;

  var Mic = window.Mic = {};

  Mic.record = function(callback) {

    navigator.getUserMedia(
      {audio: true},
      Mic._callback.bind(this, callback),
      Mic._callback.bind(this, callback));

  };

  Mic._callback = function(callback, stream) {

    Mic.stop = stream.stop.bind(stream);

    var recorder = new MediaRecorder(stream);

    recorder.ondataavailable = function(e) {
      callback(null, e.data);
    };

    recorder.onerror = recorder.onwarning = callback;

    recorder.start();
  };

}());
