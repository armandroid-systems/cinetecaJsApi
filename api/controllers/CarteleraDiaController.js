/**
 * CarteleraDiaController
 *
 * @description :: Server-side logic for managing carteleradias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {	

	
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
	getCartelera:function(req, res){

		 var request = require('request');
		 var cheerio = require('cheerio');

		 var url = 'http://www.cinetecanacional.net/'; 				 
		 var dia = req.param('dia');
		 var comando = 'controlador.php?opcion=carteleraDia';
		 var peliculas = Array();
		 var sinopsis = '';

		 console.log('ENTER CONTROLLER');		 
		 console.log('PARAM ARRIVED ['+dia+']');

		 undefined !== dia ? url += comando + '&dia=' + dia : url += comando;

		 
		 request({uri: url, enconding: 'binary'}, function(err, response, body){
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

		 				peliculas[i] = {
		 					peliculaTitulo: 	$title.text().trim(),
		 					peliculaMiniFicha:  $ficha.text().trim(),
		 					peliculaSinopsis:   $sinopsis.text().trim(),
		 					horarios: 			$horarios.text().trim(),
		 					urlImg: 			$urlImg.attr('src'),
		 					urlDetail: $urlDetail.attr('onclick').substring(15).replace('\'',''),		 					

		 				};

		 		});
		 	
				return res.json({
					error: response.statusCode,
					peliculas: peliculas
				});
		 	}		 	
		 });
	},

	getDetail:function (req, res){

		 var request = require('request');
		 var cheerio = require('cheerio');
		 var url = 'http://www.cinetecanacional.net/'; 

		 var command = req.param('pelicula');
		 var peliculasArray = Array();

		 undefined !== command ?  url+=command : url;

		 console.log('URL ['+url+']');
		 console.log('COMMAND ['+command+']');

		 request({url, encoding: 'binary'}, function(err, response, body){

		 	if(err && response.statusCode !== 200){
		 		console.log('ERROR 2'+err);
		 	}else{

		 		var $ = cheerio.load(body);		 		
		 		$detalle = $('#peliculaSinopsis');
		 		$avance = $('#botonTrailer');
		 		$imgAvance = $('#peliculaVisible').find('img');

		 		console.log($avance.attr('onclick'));

		 		peliculasArray[0] = {

		 			sinopsisCompleta: $detalle.text().trim(),		 			
		 			imgUrl: $imgAvance.attr('src'),
		 			trailer: undefined !== $avance.attr('onclick') ? $avance.attr('onclick').match(/\/(.{11})(?:\'|\?)/)[1] : '',

		 		}
		 		return res.json({
		 			error:response.statusCode,		 			
		 			peliculas: peliculasArray
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

