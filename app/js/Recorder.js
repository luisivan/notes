/*global Mic:false */

(function () {
  'use strict';

  var m = window.m;

  var recorder = {};

  var activityRequest = null;

  recorder.controller = function() {
    this.recording = m.prop(false);
    this.blob = this.blobURL = this.text = m.prop('');

    this.record = function() {

      if (!this.recording()) {

        m.startComputation();
        var _this = this;
        Mic.record(function(err, blob) {
          if (blob) {
            _this.blob(blob);
            _this.blobURL(URL.createObjectURL(blob));
          }
          m.endComputation();
        });
      } else {
        Mic.stop();
      }

      this.recording(!this.recording());

    }.bind(this);

    this.postResult = function() {
      this.text('This will return the processed text outta the audio');
      activityRequest.postResult(this.text());
    }.bind(this);
  };

  recorder.view = function(ctrl) {
    return m('div', [
      m('button', {
        class: ctrl.recording(),
        onclick: ctrl.record
      }, ctrl.recording()),
      m('audio', { autoplay: true, controls: true, src: ctrl.blobURL() }),
      m('button', { onclick: ctrl.postResult }, 'OK')
    ]);
  };

  m.module(document.body, recorder);

  navigator.mozSetMessageHandler('activity', function(activityRequest) {

    console.log(activityRequest);
    activityRequest = activityRequest;

  });

}());
