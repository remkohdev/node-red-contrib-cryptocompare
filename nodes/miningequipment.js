var request = require('request');

module.exports = function(RED) {
  "use strict";
  function MiningEquipmentNode(config) {
    RED.nodes.createNode(this,config);

    this.apiUrl = "https://www.cryptocompare.com/api/data/miningequipment/";

    var node = this;
    this.on('input', function(msg) {

    	var urlParams = [];

    	// verify params
      // required fields
      
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
  RED.nodes.registerType("miningequipment", MiningEquipmentNode);
}