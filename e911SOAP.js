'use strict';
/*jslint unparam: true, node: true */


// required modules =======================================
var soap       = require('soap');

var soapClient = null;

var apiInfo    = {
	wsdl         : null,
	endpoint     : null,
	httpUsername : null,
	httpPassword : null,
	username     : null,
	password     : null,
};


// create soap client ====================================
function initialize(callback){

	soap.createClient(apiInfo.wsdl, { endpoint: apiInfo.endpoint }, function(err,client){ 
		if(err){ console.log(err); callback(err); }
		else {
			client.setSecurity(new soap.BasicAuthSecurity(apiInfo.httpUsername, apiInfo.httpPassword));
			soapClient = client;
			callback(null);
		}
	});

}




// helper functions =======================================
function prepareArguments(args, requestName){
	
	var ret = {};

	// extend the args: add message namespace attributes, username, password
	args.attributes = {	'xmlns:mns': "urn:e911SoapService",
						'SOAP-ENV:encodingStyle': "http://schemas.xmlsoap.org/soap/encoding/" };
	args.username 	= apiInfo.username;
	args.password 	= apiInfo.password;

	// wrap the tag in an mns:<METHOD> tag
	ret['mns:' + requestName] = args;

	return ret;
}



// soap client functions ==================================
// 
// Descriptions for the args can be found in the Enable911
// document "Emergency Routing Service (ERS) SOAP API Description"
// 
function validateAddress(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'validateAddressRequest');
	soapClient.Address_Service.Address_Port.validateAddressRequest(soapArgs,callback);
}

function addEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'addEnterpriseRequest');
	soapClient.Address_Service.Address_Port.addEnterpriseRequest(soapArgs,callback);
}

function getEnterpriseInfo(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }
	
	var soapArgs = prepareArguments(args,'getEnterpriseInfoRequest');
	soapClient.Address_Service.Address_Port.getEnterpriseInfoRequest(soapArgs,callback);
}

function deleteEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'deleteEnterpriseRequest');
	soapClient.Address_Service.Address_Port.deleteEnterpriseRequest(soapArgs,callback);
}

function addLocationEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'addLocationEnterpriseRequest');
	soapClient.Address_Service.Address_Port.addLocationEnterpriseRequest(soapArgs,callback);
}

function addEndpointEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'addEndpointEnterpriseRequest');
	soapClient.Address_Service.Address_Port.addEndpointEnterpriseRequest(soapArgs,callback);
}

function addorUpdateEndpointLocationEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }
	
	var soapArgs = prepareArguments(args,'addorUpdateEndpointLocationEnterpriseRequest');
	soapClient.Address_Service.Address_Port.addorUpdateEndpointLocationEnterpriseRequest(soapArgs,callback);
}

function updateLocationEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'updateLocationEnterpriseRequest');
	soapClient.Address_Service.Address_Port.updateLocationEnterpriseRequest(soapArgs,callback);
}

function updateEndpointEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'updateEndpointEnterpriseRequest');
	soapClient.Address_Service.Address_Port.updateEndpointEnterpriseRequest(soapArgs,callback);
}

function deleteLocationEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'deleteLocationEnterpriseRequest');
	soapClient.Address_Service.Address_Port.deleteLocationEnterpriseRequest(soapArgs,callback);
}

function deleteEndpointEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'deleteEndpointEnterpriseRequest');
	soapClient.Address_Service.Address_Port.deleteEndpointEnterpriseRequest(soapArgs,callback);
}

function qryEndpointEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'qryEndpointEnterpriseRequest');
	soapClient.Address_Service.Address_Port.qryEndpointEnterpriseRequest(soapArgs,callback);
}

function qryLocationEnterprise(args, callback){
	if (!soapClient){ callback('SOAP client was not initialized.  Please call function "initialize" first.'); }

	var soapArgs = prepareArguments(args,'qryLocationEnterpriseRequest');	
	soapClient.Address_Service.Address_Port.qryLocationEnterpriseRequest(soapArgs,callback);
}


// module interface (final) ===============================
module.exports = function(apiDetails){

	apiInfo = apiDetails;

	return {

		initialize                            : initialize,
		validateAddress                       : validateAddress,
		addEnterprise                         : addEnterprise,
		getEnterpriseInfo                     : getEnterpriseInfo,
		deleteEnterprise                      : deleteEnterprise,
		addLocationEnterprise                 : addLocationEnterprise,
		addEndpointEnterprise                 : addEndpointEnterprise,
		addorUpdateEndpointLocationEnterprise : addorUpdateEndpointLocationEnterprise,
		updateLocationEnterprise              : updateLocationEnterprise,
		updateEndpointEnterprise              : updateEndpointEnterprise,
		deleteLocationEnterprise              : deleteLocationEnterprise,
		deleteEndpointEnterprise              : deleteEndpointEnterprise,
		qryEndpointEnterprise                 : qryEndpointEnterprise,
		qryLocationEnterprise                 : qryLocationEnterprise,

	}
};