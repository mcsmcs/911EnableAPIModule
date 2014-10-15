var request  = require('request');
var async    = require('async');
var path     = require('path');
var _private = require('./api_credentials.js');

var e911     = require('./e911SOAP')({

	wsdl         : path.join(__dirname, _private.wsdlFile),	// path to wsdl file
	endpoint     : _private.httpEndpoint,					// api endpoint
	httpUsername : _private.httpUsername,
	httpPassword : _private.httpPassword,
	username     : _private.username,
	password     : _private.password,

});


// functions we'll call in series using async.series
var fxns = [];
fxns.push(e911.initialize);	// init the SOAP client


// example
var dids = [1112223333,4445556666,9998887777];	// DIDs you want to add 911
var enterprise_id = 20004445555;				// Enterprise ID (Company)
var locationKey   = 20001112222;				// Location key (address)


// create a function/SOAP request for each DID
for (var idx in dids) {

    fxns.push(

        (function(did) {

            return function(callback) {

            	var formData = {
					enterprise_id  : enterprise_id,
					locationKey    : locationKey,
					endpoint       : did,
					callbackMethod : 2,
            	};

				e911.addEndpointEnterprise(formData, function(err,soapResponse){
					if(err){ callback(err); }
					else { 
						console.log(did + ': ' + JSON.stringify(soapResponse.addEndpointEnterpriseResponse));
						callback(null); 
					}
				});

            };	// end returned fxn
        }(dids[idx])) // end iife
    );
}


async.series(fxns,function(err,results){ 
	if(err){ console.log('error: ' + err); }
	console.log('Done');
});
