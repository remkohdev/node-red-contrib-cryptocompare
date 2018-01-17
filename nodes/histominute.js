var request = require('request');

module.exports = function(RED) {
  "use strict";
  function HistoMinuteNode(config) {
    RED.nodes.createNode(this,config);

    this.apiUrl = "https://min-api.cryptocompare.com/data/histominute";

    this.fsym = config.fsym;
    this.tsym = config.tsym;
    this.e = config.e;
    this.extraParams = config.extraParams;
    this.sign = config.sign;
    this.tryConversion = config.tryConversion;
    this.aggregate = config.aggregate;
    this.limit = config.limit;
    this.toTs = config.toTs;

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
      // e
      if(msg.params && msg.params.e){
        urlParams.push("e="+msg.params.e);
      }else{
        if(node.e && node.e!=""){
          urlParams.push("e="+ node.e);
        }else{
          var errMsg = "Error: required e parameter is missing";
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
      // extraParams
      if(msg.params && msg.params.extraParams){
        urlParams.push("extraParams="+msg.params.extraParams);
      }else{
        if(node.extraParams || node.extraParams!=""){
          urlParams.push("extraParams="+ node.extraParams);
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
      // tryConversion
      if(msg.params && msg.params.tryConversion){
        urlParams.push("tryConversion="+msg.params.tryConversion);
      }else{
        if(node.tryConversion || node.tryConversion!=""){
          urlParams.push("tryConversion="+ node.tryConversion);
        }
      }
      // aggregate
      if(msg.params && msg.params.aggregate){
        urlParams.push("aggregate="+msg.params.aggregate);
      }else{
        if(node.aggregate || node.aggregate!=""){
          urlParams.push("aggregate="+ node.aggregate);
        }
      }
      // limit
      if(msg.params && msg.params.limit){
        urlParams.push("limit="+msg.params.limit);
      }else{
        if(node.limit || node.limit!=""){
          urlParams.push("limit="+ node.limit);
        }
      }
      // toTs
      if(msg.params && msg.params.toTs){
        urlParams.push("toTs="+msg.params.toTs);
      }else{
        if(node.toTs || node.toTs!=""){
          urlParams.push("toTs="+ node.toTs);
        }
      }

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
  RED.nodes.registerType("histominute", HistoMinuteNode);
}