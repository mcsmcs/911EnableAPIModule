911EnableAPIModule
==================

A node module for the 911 Enable SOAP API V2

To use require the module and provide the API details.  For help tracking down this information contact 911Enable Support:

	var e911     = require('./e911SOAP')({

		wsdl         : path.join(__dirname, _private.wsdlFile),	// path to wsdl file
		endpoint     : httpEndpoint,							// api endpoint
		httpUsername : httpUsername,
		httpPassword : httpPassword,
		username     : username,
		password     : password,

	});


Initialize the SOAP client:

	e911.initialize(callback);


Make your calls:

	e911.addEndpointEnterprise(formData, function(err,soapResponse){
		if(err){ callback(err); }
		else { 
			console.log(did + ': ' + JSON.stringify(soapResponse.addEndpointEnterpriseResponse));
			callback(null); 
		}
	}