
var WebRequest = cc.Class({
    _callBack: null,
    getData: function (url, data, callback, post) {
        this._callBack = callback;
        var self = this;
        var xhr = cc.loader.getXMLHttpRequest();
        // Simple events
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
                //console.log("WebRequest.getData event = " + eventname);
                if (eventname == 'abort' || eventname == 'error' || eventname == 'timeout') {
                    if (self._callBack != null) {
                        self._callBack(false, "");
                    }
                }
            };
        });

        // Special event
        xhr.onreadystatechange = function () {
            //console.log("onreadystatechange code = " + xhr.readyState + ",status = " + xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                if (self._callBack != null) {
                    // var XmlToJson = require('XmlToJson');
                    // var xmlToJson = new  XmlToJson();
                    // var jsonData = JSON.stringify(xmlToJson.parse(xhr.responseText));                    
                    self._callBack(true, xhr.response);                    
                }
            }
        };
        xhr.timeout = 5000;//5 seconds for timeout
        if (post == null || post == false) {
            if(data =="" || data ==null)
            {
                xhr.open("GET", url, true);
            }
            else
            {
                xhr.open("GET", url + "?" + data, true);
            }
           
            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }
            xhr.send();
        }
        else {
            //console.log("open url = " + url + ",data = "+ data);
            xhr.open("POST", url);
            //set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView
            // xhr.setRequestHeader("Content-Type","text/plain");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // Uint8Array is an ArrayBufferView
            //xhr.send(new Uint8Array([1,2,3,4,5]));
            xhr.send(data);
        }

    },
});

module.exports = WebRequest;