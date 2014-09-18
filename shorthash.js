
/*
	shorthash
	(c) 2013 Bibig
	
	https://github.com/bibig/node-shorthash
	shorthash may be freely distributed under the MIT license.
*/

exports.bitwise = bitwise;
exports.binaryTransfer = binaryTransfer;
exports.unique = unique;
exports.setDictionary = setDictionary;

var dictionary = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// refer to: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
function bitwise(str){
	var hash = 0;
	if (str.length == 0) return hash;
	for (var i = 0; i < str.length; i++) {
		var ch = str.charCodeAt(i);
		hash = ((hash<<5)-hash) + ch;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

// 10进制转化成62进制以内的进制
// convert 10 binary to customized binary, max is 62
function binaryTransfer(integer, binary) {
	binary = binary || dictionary.length;
	var stack = [];
	var num;
	var result = '';
	var sign = integer < 0 ? '-' : '';
	
	function table (num) {
		return dictionary[num];
	}
	
	integer = Math.abs(integer);
	
	while (integer >= binary) {
		num = integer % binary;
		integer = Math.floor(integer / binary);
		stack.push(table(num));
	}
	
	if (integer > 0) {
		stack.push(table(integer));
	}
	
	for (var i = stack.length - 1; i >= 0; i--) {
		result += stack[i];
	} 
	
	return sign + result;
}


/**
 * why choose 61 binary, because we need the last element char to replace the minus sign
 * eg: -aGtzd will be ZaGtzd
 */
function unique (text) {
	var id = binaryTransfer(bitwise(text), dictionary.length - 1);
	return id.replace('-', 'Z');
}

function setDictionary(dict) {
    dictionary = dict;
}