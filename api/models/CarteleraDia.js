/**
* CarteleraDia.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	peliculaTitulo:{
  		type:'string',
  		required:true
  	},
  	peliculaMiniFicha:{
  		type:'string',
  		required:true
  	},
  	peliculaSinopsis:{
  		type:'string',
  		required:true
  	},
    horarios:{
      type:'string',
      required:true
    }

  }
};

