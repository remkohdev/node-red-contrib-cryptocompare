var request = require('request');

module.exports = function(RED) {
  "use strict";
  function TopPairsNode(config) {
    RED.nodes.createNode(this,config);
    this.fsym = config.fsym;
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
      // limit
      if(msg.params && msg.params.limit){
        urlParams.push("limit="+msg.params.limit);
      }else{
        if(node.limit || node.limit!=""){
          urlParams.push("limit="+ node.limit);
        }
      }
      // sign
      if(msg.params && msg.params.sign){
        urlParams.push("sign="+msg.params.sign);
      }else{
        if(node.sign || node.sign!=""){
          urlParams.push("sign="+ node.sign);
        }
      }
      
      urlParams = urlParams.join("&");
      console.log("urlParams:"+urlParams);

    	var opts = {
	        method: "GET",
	        url: "https://min-api.cryptocompare.com/data/top/pairs?"+urlParams,
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
  RED.nodes.registerType("toppairs", TopPairsNode);
}