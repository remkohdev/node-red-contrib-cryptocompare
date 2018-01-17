var request = require('request');

module.exports = function(RED) {
  "use strict";
  function CoinSnapshotNode(config) {
    RED.nodes.createNode(this,config);

    this.apiUrl = "https://www.cryptocompare.com/api/data/coinsnapshot/";

    this.fsym = config.fsym;
    this.tsym = config.tsym;

    var node = this;
    this.on('input', function(msg) {

    	var urlParams = [];

    	// verify params
      // required fields
      // fsym
    	if(msg.params && msg.params.fsym){
        urlParams.push("fsym="+msg.params.fsym);
      }else{
        if(node.fsym && node.fsym!=""){
          urlParams.push("fsym="+ node.fsym);
        }else{
    		  var errMsg = "Error: required fsym parameter is missing";
    		  node.status({
		        fill: 'red',
		        shape: 'ring',
		        text: errMsg
		      });
		      node.error(errMsg, msg);
		      return false;
    		}
      }
      // tsym
      if(msg.params && msg.params.tsym){
        urlParams.push("tsym="+msg.params.tsym);
      }else{
        if(node.tsym && node.tsym!=""){
          urlParams.push("tsym="+ node.tsym);
        }else{
          var errMsg = "Error: required tsym parameter is missing";
          node.status({
            fill: 'red',
            shape: 'ring',
            text: errMsg
          });
          node.error(errMsg, msg);
          return false;
        }
      }
      // optional fields   

      urlParams = urlParams.join("&");
      console.log("urlParams:"+urlParams);

    	var opts = {
        method: "GET",
        url: this.apiUrl+"?"+urlParams,
        timeout: node.reqTimeout,
        headers: {},
        encoding: null,
      };

  		request(opts, function (error, response, body) {
        node.status({});
        if(error) { 
          node.error(error, msg);
          node.status({
            fill: "red",
            shape: "ring",
            text: error.code
          });
          msg.payload = error.toString() + " : " + url;
          msg.statusCode = error.code;
        } else {
          try { 
          	msg.payload = body.toString('utf8');
          	msg.payload = JSON.parse(msg.payload); 
          } catch(e) { 
          	node.warn(RED._("httpin.errors.json-error")); 
       	  }
          msg.headers = response.headers;
          msg.statusCode = response.statusCode;        
        }
        node.send(msg);
      });

    });
  }
  RED.nodes.registerType("coinsnapshot", CoinSnapshotNode);
}