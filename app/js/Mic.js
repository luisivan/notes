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

  Mic._callback = function(resolve, reject, stream) {

    Mic.stop = stream.stop.bind(stream);

    var recorder = new MediaRecorder(stream);

    recorder.ondataavailable = function(e) {
      resolve(e.data);
    };

    recorder.onerror = reject;

    recorder.start();
  };

}());
