/*global Mic:false */

(function () {
  'use strict';

  var m = window.m;

  var activityRequest = null;

  var recorder = {};

  recorder.controller = function() {
    this.recording = m.prop(false);
    this.blob = m.prop(null);
    this.blobURL = m.prop('');

    this.record = function() {

      if (!this.recording()) {

        this.recording(true);
        // Let's make Mithril run to its endComputation
        // before running our own
        setTimeout(function() {  
          m.startComputation();
          Mic.record().then(function(blob) {
            this.blob(blob);
            URL.revokeObjectURL(this.blobURL());
            this.blobURL(URL.createObjectURL(blob));
            m.endComputation();
          }.bind(this), function() {
            this.recording(false);
            m.endComputation();
          }.bind(this));
        }.bind(this), 1);
      } else {
        Mic.stop();
        this.recording(false);
      }

    }.bind(this);

    this.save = function() {

      if (activityRequest) {
        activityRequest.postResult(this.blob());
        return;
      }

      /*new window.MozActivity({
        name: 'open',
        data: {
          type: ['audio/ogg'],
          blob: this.blob(),
          allowSave: true
        }
      });*/
      // This shall not be here, but just for the sake of quick testing
      var opts = {clientId: 'zyszzdvrixnakrkwxpa5nym7frdx5da0',
          clientSecret: '987lh4x5pkkmp5dyknaqu3npc1nbbj0z'};

      var w = new window.Watson(opts, function() {
        w.speechToText(this.blob(), function(err, res) {
          console.log(res);
        }.bind(this));
      }.bind(this));

    }.bind(this);

    this.share = function() {

      new window.MozActivity({
        name: 'share',
        data: {
          blob: this.blob()
        }
      });

    }.bind(this);
  };

  recorder.view = function(ctrl) {
    return m('section.skin-dark[role="region"]', [
      m('header', [
        m('button.action-icon.email-share', {
          disabled: !ctrl.blobURL(), onclick: ctrl.share }),
        m('menu[type="toolbar"]', [
          m('button', { disabled: !ctrl.blobURL(), onclick: ctrl.save }, 'Save')
        ]),
        m('h1', 'Recorder')
      ]),
      m('section#record', [
        m('div#mic', {
          class: ctrl.recording(),
          onclick: ctrl.record
        }),
        m('audio', { autoplay: true, controls: true, src: ctrl.blobURL() })
      ])
    ]);
  };

  m.module(document.body, recorder);

  navigator.mozSetMessageHandler('activity', function(activityRequest) {

    activityRequest = activityRequest;

  });

}());
