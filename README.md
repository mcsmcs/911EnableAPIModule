911EnableAPIModule
==================

A node module for the 911 Enable SOAP API V2

To use this module you will need to contact 911 Enable's Support team for API credentials and documentation.

To use require the module and provide the API details:

	var e911 = require('./e911SOAP')({

		wsdl         : path.join(__dirname, wsdlFile),	// path to wsdl file
		endpoint     : httpEndpoint,					// api endpoint
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