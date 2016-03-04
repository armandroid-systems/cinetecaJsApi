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

		 //self.items = new Array();

		 if(dia !== undefined){
		 	url += '&dia='+dia;
		 }		 

		 request(url, function(err, response, body){
		 	if(err && response.statusCode !== 200){
		 		console.log('ERROR ['+err+']');
		 	}else{
		 		jsdom.env(body,['http://code.jquery.com/jquery-1.6.min.js'], function(err, window){
		 			var $ = window.jQuery;
		 			var $bodyHtml = $('body');		 			
		 			var $peliculas = $bodyHtml.find('#contenedorPelicula');
		 			//console.log(peliculas);
		 			$peliculas.each(function(i, item){
		 				$title = $(item).find('.peliculaTitulo'),
		 				$ficha = $(item).find('.peliculaMiniFicha'),
		 				$sinopsis = $(item).find('.peliculaImagenSinopsis');

		 				self[i] = {
		 					peliculaTitulo: $title.text().trim(),
		 					peliculaMiniFicha: $ficha.text().trim(),
		 					peliculaSinopsis: $sinopsis.text().trim(),

		 				};

		 			});
		 			
		 			return res.json({
		 				//peliculaTitulo: jq('.peliculaTitulo').text()
		 				//peliculas: peliculas
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


	}
	
};

