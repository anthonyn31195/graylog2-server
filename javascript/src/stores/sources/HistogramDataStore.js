/** @jsx React.DOM */

'use strict';

var mergeInto = require('../../lib/util').mergeInto;
var AbstractEventSendingStore = require('../AbstractEventSendingStore');
var $ = require('jquery'); // excluded and shimed

var HistogramDataStore = {
    HISTOGRAM_URL: '/a/search/histogram',

    setHistogramData(histogramData) {
        this._histogramData = histogramData;
        this._emitChange();
    },

    getHistogramData() {
        return this._histogramData && JSON.parse(JSON.stringify(this._histogramData));
    },

    loadHistogramData(range, sourceNames) {
        var url = this.HISTOGRAM_URL;
        var q = "";
        if (typeof sourceNames !== 'undefined' && sourceNames instanceof Array) {
            q = encodeURIComponent(sourceNames.map((source) => "source:" + source).join(" OR "));
        }
        if (typeof range !== 'undefined') {
            url += `?q=${q}&rangetype=relative&relative=${ range }`;
        }
        var successCallback = (data) => this.setHistogramData(data);
        var failCallback = (jqXHR, textStatus, errorThrown) => {
            console.error("Loading of histogram data failed with status: " + textStatus);
            console.error("Error", errorThrown);
            alert("Could not retrieve histogram data from server - try reloading the page");
        };
        $.getJSON(url, successCallback).fail(failCallback);
    }
};
mergeInto(HistogramDataStore, AbstractEventSendingStore);

module.exports = HistogramDataStore;
