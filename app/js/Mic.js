(function () {
  'use strict';

  var navigator = window.navigator;
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.mozGetUserMedia;

  var MediaRecorder = window.MediaRecorder;

  var Mic = window.Mic = {};

  Mic.record = function(cb) {

    navigator.getUserMedia(
      {audio: true}, Mic.cb.bind(this, cb), Mic.cb.bind(this, cb));

  };

  Mic.cb = function(cb, stream) {

    Mic.stop = stream.stop.bind(stream);

    var recorder = new MediaRecorder(stream);

    recorder.ondataavailable = function(e) {
      cb(null, e.data);
    };

    recorder.onerror = recorder.onwarning = cb;

    recorder.start();
  };

  Mic.errorCb = console.log.bind(console);

}());
