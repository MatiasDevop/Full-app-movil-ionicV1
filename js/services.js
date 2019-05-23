angular.module('redmonica.services', [])
.factory('NivelContaminacionService',function($http){

 var url = 'http://redmonica.fullcodigo.com/Api/NivelContaminacionApi';
  return{ 
          ListarNivel: function(){
            return $http.get(url).then(function(dataNivel){
              
              console.log(dataNivel);
              return dataNivel;
            }) 
          }
        }
})
.factory('ContaminanteService', function($http){
	var url='http://localhost:3249/Api/PasivoApi'

	return {
		ListarContaminantes:function(){
			return $http.get(url).then(function(datosC){
				console.log(datosC);
              return datosC;
			})
		}

	};
})
.factory('ContanaminanteAutoService',function ($http) {
   var url="http://redmonica.fullcodigo.com/Api/AutomaticoApi"

  return {
    ListaContaminantesAutomatico:function(){
        return $http.get(url).then(function(datosAutomatico){
          console.log(" service del automatioco json")
          return datosAutomatico;
        })
    }
   

  };
})
//to solid bar 
.factory('ContaminanteAutoPMService',function ($http) {
      var markers = [
          {
                  id:1,
              "title": "Martin cardenas",
              "lat": -17.40608258286150,
              "lng": -66.2827937007932,
              "Description": "MOnitoreo pasivo",
              center: {lat: -17.40608258286150, lng: -66.2827937007932},
              population: 80

          }, {
              id:2,
              "title": "Zuares miranda",
            "lat": -17.385588423766034,
            "lng": -66.28143382082271,
            "Description": "MOnitoreo pasivo",
            center: {lat: -17.385588423766034, lng: -66.28143382082271},
            population: 80

          },
        {
              id:3,
              "title": "Potreros",
              "lat": -17.31850911369314,
              "lng": -66.31069859867239,
              "Description": "MOnitoreo pasivo",
              center: {lat: -17.31850911369314, lng: -66.31069859867239},
              population: 80
          
        },
        {
              id:4,
            "title": "Terminal",
            "lat": -17.392946825799555,
            "lng": -66.27302670465724,
            "Description": "MOnitoreo pasivo",
            center: {lat: -17.392946825799555, lng: -66.27302670465724},
            population: 80
        },
        {
            id:5,
            "title": "Capitan Arsabe",
            "lat": -17.38955689889783,
            "lng": -66.28555583993148,
            "Description": "MOnitoreo pasivo",
            center: {lat: -17.38955689889783, lng: -66.28555583993148},
            population: 80
        },
        {
            id:6,
            "title": "Circunvalacion",
            "lat": -17.401502758673747,
            "lng": -66.27462959368131,
            "Description": "MOnitoreo pasivo",
            center: {lat: -17.401502758673747, lng: -66.27462959368131},
            population: 80
        },
          {
            id:7,
            "title": "KM11",
            "lat": -17.38605530774336,
            "lng": -66.25952768365096,
            "Description": "MOnitoreo pasivo",
            center: {lat: -17.38605530774336, lng: -66.25952768365096},
            population: 80
        }];

   
  var url="http://redmonica.fullcodigo.com/Api/NivelContaminacionApi";
   var lista=[]; 
  return {
    ListaContaminantesPM:function(){
        return $http.get(url).then(function(datosNivel){
          console.log(" service del automatioco json")
          lista=datosNivel;
          return datosNivel;
        })
    },
    get: function(NivelID) {
    // console.log("hi get"+lista.data);

        for (var i = 0; i < 10; i++) {
         // console.log(i);
         if (lista.data[i].NivelID === parseInt(NivelID)) {
           //console.log("hola"+i);
           return lista.data[i];
         }
        }
       return null;
     },
     all: function() {
      return markers;
    },

  };
})
// to get Rangos Api
.factory('RangosApiService',function ($http) {
  var url="http://redmonica.fullcodigo.com/Api/RangoICAAPi"
  var lista=[]; 
 return {
   ListaRangos:function(){
       return $http.get(url).then(function(datosRango){
         console.log(" service del rangos json")
         //lista=datosNivel;
         return datosRango;
       })
   },
  
 };
})

.factory('DatosActivoService',function ($http) {
  var url="http://redmonica.fullcodigo.com/Api/ActivoPMApi"
  var lista=[]; 
 return {
   getActivosID:function(id){
     console.log("entro:"+id);//if you want to search by String url+"/?Name="+Name
       return $http.get(url+"/?idEstacion="+id).then(function(data){
         console.log(" service del activos json")
         //lista=datosNivel;
         return data;
       })
       return console.log("eeeeeeeeeeee");
   },
  
 };
})

