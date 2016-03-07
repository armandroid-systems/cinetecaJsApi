/**
 * CarteleraDiaController
 *
 * @description :: Server-side logic for managing carteleradias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {	

	getCarteleraPorDia:function (req, res){
		 var request = require('request');
		 var jsdom = require('jsdom');

		 var url = 'http://www.cinetecanacional.net/controlador.php?opcion=carteleraDia';
		 var dia = req.param('dia');
		 var self = Array();

		 console.log('ENTER CONTROLLER');		 
		 console.log('PARAM ARRIVED ['+dia+']');

		 if(dia !== undefined){
		 	url += '&dia='+dia;
		 }		 

		 request({uri: url, enconding: 'utf8'}, function(err, response, body){
		 	if(err && response.statusCode !== 200){
		 		console.log('ERROR SERVER ['+err+']');
		 	}else{
		 		console.log('REQUEST 0k');
		 		jsdom.env(body,['http://code.jquery.com/jquery-1.6.min.js'], function(err, window){
		 			var $ = window.jQuery;
		 			var $bodyHtml = $('body');		 			
		 			var $peliculas = $bodyHtml.find('#contenedorPelicula');
		 			//console.log(peliculas);
		 			$peliculas.each(function(i, item){

		 				$title 	  = $(item).find('.peliculaTitulo'),
		 				$ficha 	  = $(item).find('.peliculaMiniFicha'),
		 				$horarios = $(item).find('#horarios'),
		 				$sinopsis = $(item).find('#peliculaSinopsis')
		 										.children().remove().end();
		 				

		 				self[i] = {
		 					peliculaTitulo: 	$title.text().trim(),
		 					peliculaMiniFicha:  $ficha.text().trim(),
		 					peliculaSinopsis:   $sinopsis.text().trim(),
		 					horarios: 			$horarios.text().trim(),


		 				};

		 			});
		 			
		 			return res.json({
		 				self	 				
		 			});
		 			
		 		});
		 	}		 	
		 });
	},

	getCarteleraThirdParty:function(req, res){
		var dia = req.param('dia');
		var param = "";
		if(dia !== undefined){
				param = '/controlador.php?opcion=carteleraDia&dia='+dia;
			}else{
				param = '/controlador.php?opcion=carteleraDia';
			}
		var thirdPartyCineteca = require('cineteca')({
			entry: 'http://www.cinetecanacional.net',
			today: param
  			
		});

		thirdPartyCineteca.today(function(err, movies){
			return res.json({
				movies
			});
		});


	},
	//GET WITH CHEERIO 
	getCheerioToDay:function(req, res){

		 var request = require('request');
		 var cheerio = require('cheerio');

		 var url = 'http://www.cinetecanacional.net/controlador.php?opcion=carteleraDia';
		 var dia = req.param('dia');
		 var self = Array();

		 console.log('ENTER CONTROLLER');		 
		 console.log('PARAM ARRIVED ['+dia+']');

		 if(dia !== undefined){
		 	url += '&dia='+dia;
		 }		 

		 request({uri: url, enconding: 'utf8'}, function(err, response, body){
		 	if(err && response.statusCode !== 200){
		 		console.log('ERROR SERVER ['+err+']');
		 	}else{
		 		console.log('REQUEST 0k');
		 		var $ = cheerio.load(body);

		 		$('#contenedorPelicula').each(function(i, item){

		 			$title 	  = $(item).find('.peliculaTitulo'),
		 				$ficha 	  = $(item).find('.peliculaMiniFicha'),
		 				$horarios = $(item).find('#horarios'),
		 				$sinopsis = $(item).find('#peliculaSinopsis')
		 										.children().remove().end(),
		 				$urlImg	  = $(item).find('img'),
		 				$urlDetail = $(item).find('#botonVer');
		 				

		 				self[i] = {
		 					peliculaTitulo: 	$title.text().trim(),
		 					peliculaMiniFicha:  $ficha.text().trim(),
		 					peliculaSinopsis:   $sinopsis.text().trim(),
		 					horarios: 			$horarios.text().trim(),
		 					urlImg: 			$urlImg.attr('src'),
		 					test: $urlDetail.attr('onclick'),


		 				};

		 		});
		 	
				return res.json({
					self
				});
		 	}		 	
		 });
	},

	testXray:function(req, res){

		 var xray = require('x-ray');
		 var url = 'http://www.cinetecanacional.net/controlador.php?opcion=carteleraDia';
		 var dia = req.param('dia');
		 var self = Array();
		 var x = xray();

		 console.log('ENTER CONTROLLER');		 
		 console.log('PARAM ARRIVED ['+dia+']');

		 if(dia !== undefined){
		 	url += '&dia='+dia;
		 }	

		 x(url,'#peliculaTitulo')(function(err, obj){
		 	console.log('ERROR -->'+err);
		 	return res.json({
					obj
				});
		 });
		 

	}
	
};

