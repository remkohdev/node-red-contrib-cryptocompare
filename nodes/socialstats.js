var request = require('request');

module.exports = function(RED) {
  "use strict";
  function SocialStatsNode(config) {
    RED.nodes.createNode(this,config);
    this.id = config.id;
    var node = this;
    this.on('input', function(msg) {

    	var urlParams = [];

    	// verify params
      // required fields
      // id
    	if(msg.params && msg.params.id){
        urlParams.push("id="+msg.params.id);
      }else{
        if(node.id && node.id!=""){
          urlParams.push("id="+ node.id);
        }else{
          var errMsg = "Error: required id parameter is missing";
          node.status({
            fill: 'red',
            shape: 'ring',
            text: errMsg
          });
          node.error(errMsg, msg);
          return false;
        }
      }

      urlParams = urlParams.join("&");
      console.log("urlParams:"+urlParams);

    	var opts = {
	        method: "GET",
	        url: "https://www.cryptocompare.com/api/data/socialstats?"+urlParams,
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

      })

    });
  }
  RED.nodes.registerType("socialstats", SocialStatsNode);
}