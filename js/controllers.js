angular.module('redmonica.controllers',[])
.controller('startctrl',function($scope,$state,$ionicHistory) {

    $scope.irEstaciones=function(){
	
	    $state.go('tabs.home');
    };
    $scope.irLocation=function(){
	
	    $state.go('tabs.about');
    };
    $scope.irIca=function(){
	
	    $state.go('tabs.automatico');
    };
  
  
     
})
.controller('EstacionCtrl', function($scope, $window,$state, $timeout,ContaminanteAutoPMService) {
            $scope.arrayitems=[]
            var listA = [];
            var listP = [];
            $scope.concentracion = 0;
            $scope.concentracionP=0
          ContaminanteAutoPMService.ListaContaminantesPM().then(function(datosPM){

              $scope.items = datosPM.data;
              $scope.arrayitems=$scope.items.reverse();
              //to painting
              $scope.getTrColor = function (colorIndex) {
               // console.log("numcolor"+colorIndex);
                    if(colorIndex > 1 && colorIndex<=50){
                        
                        return '15px';
                    }
                    if(colorIndex >51 && colorIndex<=100){
                        return '45px';
                    }
                    if(colorIndex >= 101 && colorIndex<=150){
                        return '60px';
                    }
                    if(colorIndex>151){
                        return '100px';
                    }
                // switch(colorIndex){
                //     case 0: return 'red';
                //     case 1: return 'green';
                //     default: return '15px';
                // }
            };
            // console.log($scope.arrayitems);
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].Estacion.EstacionId==1) {
                        listA.push($scope.items[i].Concentracion);
                        //console.log("con:" + $scope.niveles[i].Concentracion);
                    }
                    if ($scope.items[i].Estacion.EstacionId == 2) {
                        listP.push($scope.items[i].Concentracion);
                        //console.log("con:" + $scope.niveles[i].Concentracion);
                    }
                 
                }
                //$scope.concentracion = listA.pop();
                $scope.concentracionP = listP.pop();
               // console.log(listA);
                // $scope.concentracion = $scope.items[$scope.tam - 1].Concentracion;
            
                    // for refresh
                     $scope.doRefresh = function() {
                      $timeout( function() {
                       $window.location.reload(true)
                        $scope.$broadcast('scroll.refreshComplete');
                      }, 1000);

                    };
                    

                    // para el speed
                            var gaugeOptions = {

                                chart: {
                                    type: 'solidgauge',
                                    renderTo:undefined
                                },

                                title: null,

                                pane: {
                                    center: ['50%', '85%'],
                                    size: '140%',
                                    startAngle: -90,
                                    endAngle: 90,
                                    background: {
                                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                                        innerRadius: '60%',
                                        outerRadius: '100%',
                                        shape: 'arc'
                                    }
                                },

                                tooltip: {
                                    enabled: false
                                },

                                // the value axis
                                yAxis: {
                                    stops: [
                                        [0.1, '#55BF3B'], // green
                                        [0.16, '#55BF3B'],
                                        [0.17, '#FFFF00'],
                                        [0.18, '#FFFF00'],
                                        [0.20, '##F7FE2E'],
                                        [0.22, '#FFFF00'],
                                        [0.32, '#FFFF00'], //yellow 
                                        [0.35, '##FF0000'],//red
                                        [0.40, '##FF0000'],//red
                                        [0.49, '##FF0000'],//RED
                                        [0.51, '#B43104'], // RED
                                        [0.6, '#B43104'],
                                        [0.7, '#000000'],
                                        [0.8, '#000000'],
                                        [0.9, '#000000'] // red
                                    ],
                                    lineWidth: 0,
                                    minorTickInterval: null,
                                    tickAmount: 4,
                                    title: {
                                        y: -70
                                    },
                                    labels: {
                                        y: 16
                                    }
                                },

                                plotOptions: {
                                    solidgauge: {
                                        dataLabels: {
                                            y: 5,
                                            borderWidth: 0,
                                            useHTML: true
                                        }
                                    }
                                }
                            };

                            // The speed gauge
                            var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
                                yAxis: {
                                    min: 0,
                                    max: 300,
                                    title: {
                                        text: 'Curva'
                                    }
                                },

                                credits: {
                                    enabled: false
                                },

                                series: [{
                                    name: 'Speed',
                                    data: [$scope.concentracion],
                                    dataLabels: {
                                        format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                                               '<span style="font-size:12px;color:silver">Ug/M3</span></div>'
                                    },
                                    tooltip: {
                                        valueSuffix: 'Ug/m3'
                                    }
                                }]

                            }));
     
                    }).catch(function(error){

                      console.log("No encotro ctrl gauge");
                      //alert("Api no responde");

                    })
                    //go home
                    $scope.goHome=function(){
                      
                        $state.go('start');
                        }; 

})
.controller('DetailCtrl', function($scope, $stateParams,$ionicModal, ContaminanteAutoPMService) {
    //console.log("ddd"+$stateParams.NivelID);
    $scope.markers=[];
    $scope.concentracion = 0;
   $scope.recomendaciones=
    [{
        id: 0,
        namek: 'Adecuado para actividades al aire libre',
        namev: 'Recomendado',
        namem: 'Innecesario',
        alert: 'Adecuada para realizar actividades al aire libre.',
        nameout:'Recomendado'
      }, {
        id: 1,
        namek: 'Considerar limitar los esfuerzos al aire libre',
        namev: 'Recomendado',
        namem: 'solo grupos sensibles',
        alert: 'Las personas que son extremadamente sensibles(niños, adultos) a la contaminación deben considerar limitar los esfuerzos prolongados al aire libre.',
        nameout:'recomendado'
      }, {
        id: 2,
        namek: 'Evitar el esfuerzo al aire libre',
        namev: 'Recomendado',
        namem: 'Nesesario',
        alert: 'Los niños, adultos mayores, personas que realizan actividad física intensa o con enfermedades respiratorias y cardiovasculares, deben limitar los esfuerzos prolongados al aire libre.',
        nameout:'Nose recomienda'
      }, {
        id: 3,
        namek: 'Evitar el esfuerzo al aire libre para todos',
        namev: 'No se recomienda',
        namem: 'Nesesario',
        alert: 'Los niños, adultos mayores, personas que realizan actividad física intensa o con enfermedades respiratorias y cardiovasculares, deben evitar el esfuerzo prolongado al aire libre. La población en general debe limitar el esfuerzo prolongado al aire libre.',
        nameout:'Nose recomienda para todos'
      }, {
        id: 4,
        namek: 'Evitar el esfuerzo al aire libre',
        namev: 'Recomendado',
        namem: 'Nesesario',
        alert: 'La población en general debe suspender los esfuerzos al aire libre.',
        nameout:'Nose recomienda'
      }];
    
   $scope.item =ContaminanteAutoPMService.get($stateParams.NivelID);
  // console.log("enreando"+$scope.item.Concentracion);
        if($scope.item.Concentracion>=1 && $scope.item.Concentracion<=50){
            //console.log("here:"+ $scope.recomendaciones[0].namek);
            $scope.listr=$scope.recomendaciones[0];
        
        } 
        if($scope.item.Concentracion>=51 && $scope.item.Concentracion<=100){
            $scope.listr=$scope.recomendaciones[1];
        }
        if($scope.item.Concentracion>=101 && $scope.item.Concentracion<=150){
            $scope.listr=$scope.recomendaciones[2];
        }
        if($scope.item.Concentracion>150){
           // console.log("aire maloooooo")
            $scope.listr=$scope.recomendaciones[3];
        }

        // para los modals
        $ionicModal.fromTemplateUrl('templates/contact.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) { $scope.modal = modal; });
              // para el speed
              var gaugeOptions = {

                chart: {
                    type: 'solidgauge'
                },

                title: null,

                pane: {
                    center: ['50%', '85%'],
                    size: '140%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },

                tooltip: {
                    enabled: false
                },

                // the value axis
                yAxis: {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.16, '#55BF3B'],
                        [0.17, '#FFFF00'],
                        [0.18, '#FFFF00'],
                        [0.20, '#F7FE2E'],
                        [0.22, '#FFFF00'],
                        [0.32, '#FFFF00'], //yellow 
                        [0.33, '#FFFF00'],
                        [0.34, '#FF0000'],//RED
                        [0.35, '#FF0000'],//red
                        [0.36, '#FF0000'],
                        [0.40, '#FF0000'],//red
                        [0.49, '#FF0000'],//RED
                        [0.51, '#B43104'], // RED
                        [0.60, '#B43104'],//CAFE
                        [0.61, '#B43104'],//CAFE
                        [0.62, '#B43104'],
                        [0.69, '#B43104'],
                        [0.7, '#B43104'],
                        [0.8, '#B43104'],
                        [0.9, '#B43104'],
                        // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickAmount: 4,
                    title: {
                        y: -70
                    },
                    labels: {
                        y: 16
                    }
                },

                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }
            };

            // The speed gauge
            var chartSpeed = Highcharts.chart('container-speedy', Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: 300,
                    title: {
                        text: 'Curva'
                    }
                },

                credits: {
                    enabled: false
                },

                series: [{
                    name: 'Speed',
                    data: [$scope.item.Concentracion],//$scope.item.Concentracion
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                               '<span style="font-size:12px;color:silver">Ug/M3</span></div>'
                    },
                    tooltip: {
                        valueSuffix: 'Ug/m3'
                    }
                }]

            }));
           // console.log($scope.item);
            $scope.markers=ContaminanteAutoPMService.all();
          //  console.log($scope.markers);
            var lat=getlat($scope.markers,$scope.item);
            var long=getlong($scope.markers,$scope.item);
            //console.log(lat);
           // console.log(long);
        // to  see google maps
        $scope.colores = ["#4ABD0F","#F2F907","#FF0000","#864406","#0C0C0D"];
        var fill="";
                    $scope.map = new google.maps.Map(document.getElementById('mapi'), {
                        zoom: 14,
                        center: {lat: lat, lng:long},
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        panControl: false,
                        zoomControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        navigationControl: true,
                        disableDefaultUI: true,
                        overviewMapControl: false
                    });
                        var mylatlng = new google.maps.LatLng(lat, long);
                       // console.log("hire"+mylatlng);
                        var marker = new google.maps.Marker({
                            position: mylatlng,
                            map: $scope.map,
                            title: $scope.item.Estacion.Name,
                            icon: 'http://cdn.webiconset.com/map-icons/images/pin2.png'
                        });
                        fill=getColor($scope.item.Concentracion);
            // to animate for location
            var _radius = 1000;
            var rMin = _radius * 2/4;
            var rMax = _radius;
            var direction = 1;
            
            var circleOption = {
                center: new google.maps.LatLng(lat, long),
                fillColor: fill,
                fillOpacity: 0.40,
                map: $scope.map,
                radius: 1000,
                strokeColor: '#3878c7',
                strokeOpacity: 0.8,
                strokeWeight: 0.1
            };
            
            var circle = new google.maps.Circle(circleOption);
            
            var circleTimer = setInterval(function(){
                var radius = circle.getRadius();
                
                if ((radius > rMax) || (radius < rMin)) {
                    direction *= -1;
                }
                
                var _par = (radius/_radius)-0.3;
                
                circleOption.radius = radius + direction * 10;
                circleOption.fillOpacity = 0.6 * _par;
                
                circle.setOptions(circleOption);
            }, 50);
    // end for animate toi location

      function getlat(lista,listb){
        var n=0;
        for ( var i = 0; i < lista.length; i++) {
            if(lista[i].id==listb.Estacion.EstacionId)
            {
                return n=lista[i].lat;
            }
            
        }
        return n
      }   
      function getlong(lista,listb){
        var n=0;
        for ( var i = 0; i < lista.length; i++) {
            if(lista[i].id==listb.Estacion.EstacionId)
            {
                return n=lista[i].lng;
            }
            
        }
        return n
      } 
      function getColor(valor){
        //console.log(valor);
      
                    if(valor <= 50) {
                      return fill= $scope.colores[0];
                  }
                  if (valor >= 51 && valor <= 100) {
                      
                   return   fill= $scope.colores[1];
                  }
                  if (valor >= 101 && valor <= 150) {
                     
                     return fill= $scope.colores[2];
                  }
                  if (valor >= 151 && valor <= 300) {
                    return fill= $scope.colores[3];
                  }
                  if (valor >= 301) {
                    return fill= $scope.colores[4];
                  }
                  //console.log(fill);
        return fill;
    }              


})
.controller('locationctrl', function ($scope,ContaminanteAutoPMService,$window,$state) {

    $scope.update=function(){
  
       $window.location.reload(true);
    }
    var markers = [
        {
                id:1,
            "title": "Martin cardenas",
             "lat": -17.406082582861508,
             "lng": -66.28279370079326,
             "Description": "MOnitoreo pasivo",
             center: {lat: -17.406082582861508, lng: -66.28279370079326},
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
    $scope.concentracion = 0;
    $scope.lastA=[];
    $scope.lastP=[];
    $scope.lastPT=[];
    $scope.listFull=[];
    var listA = [];
    var listP = [];
    var listPT = [];
    
      ContaminanteAutoPMService.ListaContaminantesPM().then(function(datosPM){
       //console.log("se Lista contaminates");
          $scope.items = datosPM.data;
        // console.log($scope.items);
         // to get the last list
      
         for (var i = 0; i < $scope.items.length; i++) {
            if ($scope.items[i].Estacion.EstacionId==1) {
                listA.push($scope.items[i]);
                //console.log("con:" + $scope.niveles[i].Concentracion);
            }
            if ($scope.items[i].Estacion.EstacionId == 2) {
                listP.push($scope.items[i]);
                //console.log("con:" + $scope.niveles[i].Concentracion);
            }
            if ($scope.items[i].Estacion.EstacionId == 3) {
                listPT.push($scope.items[i]);
                //console.log("con:" + $scope.niveles[i].Concentracion);
            }
            
        }
    
        $scope.lastA = listA.pop();
        $scope.lastP = listP.pop();
        $scope.lastPT=listPT.pop();
        $scope.listFull.push($scope.lastA);
        $scope.listFull.push($scope.lastP);
        $scope.listFull.push($scope.lastPT);

    
        $scope.tam = $scope.items.length;
             $scope.concentracion = $scope.lastA.Concentracion;
        
                    $scope.colores = ["#4ABD0F","#F2F907","#F60606","#864406","#0C0C0D"];
                var fill="";
                 //para los coleres del mapa 
                  // Create the map.
                 $scope.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14,
                    center: {lat: -17.39483168, lng:-66.28304958},
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: false,
					zoomControl: false,
					mapTypeControl: false,
					scaleControl: false,
					streetViewControl: false,
					navigationControl: true,
					disableDefaultUI: true,
					overviewMapControl: false
                  });
                  
                    for (var i = 0; i < markers.length; i++) {
                        var data = markers[i]
                        var mylatlng = new google.maps.LatLng(data.lat, data.lng);
                        var marker = new google.maps.Marker({
                            position: mylatlng,
                            map: $scope.map,
                            title: data.title,
                            icon: 'http://cdn.webiconset.com/map-icons/images/pin2.png'
                        });
                        //console.log($scope.listFull[1].Estacion.EstacionId);
                         if(i<$scope.listFull.length){
                            if($scope.listFull[i].Estacion.EstacionId==markers[i].id){
    
                                fill=getColor($scope.listFull[i].Concentracion);
                              
                            var cityCircle = new google.maps.Circle({
                                strokeColor: '#0C0C0D',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: fill,
                                fillOpacity: 0.40,
                                map: $scope.map,
                                center: markers[i].center,
                                radius: Math.sqrt(markers[i].population) * 100
                            });

                            }
                        }
                        google.maps.event.addListener(marker, 'click', function () {
                            $('#myModal').modal('show');
                            //$('#topMenu').hide()
                            //$('#topMenu').css('z-index', '0');
        
                        });  
                    }
                   

               }).catch(function(error){

                 // console.log("No encotro controller para mapas");
                  alert("No se encontro controller y apis")

                })
                function getColor(valor){
                   
                  
                                if(valor <= 50) {
                                  return fill= $scope.colores[0];
                              }
                              if (valor > 50 && valor <= 100) {
                                  
                               return   fill= $scope.colores[1];
                              }
                              if (valor > 101 && valor <= 150) {
                                 
                                 return fill= $scope.colores[2];
                              }
                              if (valor > 151 && valor <= 200) {
                                return fill= $scope.colores[3];
                              }
                              if (valor >= 200) {
                                return fill= $scope.colores[4];
                              }
                          
                    return fill;
                }
               // here finish NivelCOntamionacionServices
               // init services to get Rangos 
               $scope.goHome=function(){
               
                $state.go('start');
                };

                             
})

.controller('GraficasGeneralCtrl',function($scope,$state,NivelContaminacionService, $timeout,$state, $window, $ionicModal,$stateParams,DatosActivoService){
 
    var monthNames = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"
              ];
        $scope.series = ["NO2","PM"];
              $scope.Estaciones=[
                  {
                      id:1,
                      Name:'Martin Cardenas',
                    
                  },
                  {
                    id:2,
                    Name:'Zuares Miranda',
                  
                },
                {
                    id:3,
                    Name:'Potreros',
                  
                },
                {
                    id:4,
                    Name:'Terminal',
                  
                }
                ];
          
    
    
        $scope.onchange = function(id) {
                //console.log("id:"+id);
            
        DatosActivoService.getActivosID(id).then(function(data) {
            //console.log("holass activos"+id);
            $scope.item=data.data;
            $scope.dataPM=[];
            $scope.meses=[];
            // console.log("estos son los datos")
         //console.log(data.data);
            for (var i=0; i <$scope.item.length; i++){
                var fecha = $scope.item[i].Fecha;
                var dateObj = new Date(fecha);
                          var month = dateObj.getUTCMonth()+1; //months from 1-12
                          var day = dateObj.getUTCDate();
                          var year = dateObj.getUTCFullYear();
                         // console.log("el concentracion" +$scope.item[i].Concentracion);
                            $scope.dataPM.push($scope.item[i].Concentracion);
                          newdate = year + "/" + monthNames[month - 1] + "/" + day;
                          // console.log("ness"+newdate);
                          //console.log("la fecha activos" + fecha + "mas" + newdate);
   
                          $scope.meses.push(day+","+monthNames[month - 1]+","+year);
            }
            Highcharts.chart('containers', {
                title: {
                    text: 'Estacion:'+$scope.item[0].Estacion.Name,
                    x: -20 //center
                },
                subtitle: {
                    text: 'Material Particulado',
                    x: -20
                },
                xAxis: {
                    categories:$scope.meses//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        //'Jul', 'Aug', 'Sep', 'Oct','Nov','Dic']
                },
                yAxis: {
                    title: {
                        text: 'Value(ug/m3)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ' (Ug/m3)'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [ 
                {
                    name: 'PM',
                    data: $scope.dataPM
                }]
            })

        }).catch(function(data) {
           // if is errror
          alert("No existe datos en esta estacion"); 
        });     
        }

        // to refresh
        $scope.doRefresh = function() {
            $timeout( function() {
             $window.location.reload(true)
              $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
    
          };
           
      //to modal but is?

         $scope.meses=[]; 
          $scope.dataNO=[];
          $scope.dataPM=[];
          $scope.mesesNO=[];
          $scope.mesesPM=[];
    
  
    NivelContaminacionService.ListarNivel().then(function(datosC){
     //console.log("se Lista contaminates");
        $scope.nivel = datosC.data;
        
       // console.log($scope.nivel);
          for(var i=0;i < $scope.nivel.length;i++)
          {
            //console.log($scope.items[i].Valor);
            if($scope.nivel[i].Contaminante.Nombre=="PM"){
              //console.log("es pm");
              //para el primer grafico
               var fecha = $scope.nivel[i].Fecha;
               var dateObj = new Date(fecha);
                         var month = dateObj.getUTCMonth()+1; //months from 1-12
                         var day = dateObj.getUTCDate();
                         var year = dateObj.getUTCFullYear();
                         //console.log("el concentracion" +$scope.nivel[i].Concentracion);
                           $scope.dataPM.push($scope.nivel[i].Concentracion);
                         newdate = year + "/" + monthNames[month - 1] + "/" + day;
                         // console.log("ness"+newdate);
                         //console.log("la fecha activos" + fecha + "mas" + newdate);
  
                         $scope.meses.push(monthNames[month - 1]);
             
              }
          }
       // console.log($scope.dataPM);
          Highcharts.chart('containers-1', {
          title: {
              text: 'Contaminantes',
              x: -20 //center
          },
          subtitle: {
              text: 'Material Particulado',
              x: -20
          },
          xAxis: {
              categories:$scope.meses//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  //'Jul', 'Aug', 'Sep', 'Oct','Nov','Dic']
          },
          yAxis: {
              title: {
                  text: 'Value(ug/m3)'
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },
          tooltip: {
              valueSuffix: ' (Ug/m3)'
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
          },
          series: [ 
          {
              name: 'PM',
              data: $scope.dataPM
          }]
      });
  
    
        }).catch(function(error){
  
          console.log("No encotro controller de la vistaGraficas");
           
        })
       
        $scope.goHome=function(){
           
            $state.go('start');
            };
  })

  // para la view del automatico
.controller('AutomaticoCtrl', function ($scope,$state,ContanaminanteAutoService,$http,NivelContaminacionService){
   
    $scope.goAtras=function(){
      //alert("volviendo con angular");
       $state.go('contaminantes');
      }
      $scope.datosAtm=[];
      var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
         ];
      var databig = [];
      var matriz = [];
  ContanaminanteAutoService.ListaContaminantesAutomatico().then(function(datosAutomatico){
  
      $scope.datosAtm=datosAutomatico.data;
   
      for (var i = 0; i < $scope.datosAtm.length; i++) {
        var event = new Date($scope.datosAtm[i].Fecha);
        var ev = event.toLocaleString();
        var reshoras = $scope.datosAtm[i].Fecha.substring(11, 16);
        var dateObj = new Date($scope.datosAtm[i].Fecha);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var horas = dateObj.getHours() + ":" + dateObj.getMinutes();

        newdate = day + "/" + monthNames[month - 1] + "/" + year + "hora:" + reshoras;

        matriz[i] = [ev, $scope.datosAtm[i].Concentracion];

    }
    // databig.push($scope.venta[0].Fecha, $scope.venta[0].Concentracion);
   // console.log(matriz);
    var currentDate = new Date($scope.datosAtm[0].Fecha);
    currentDate = JSON.stringify(currentDate);
    currentDate = new Date(JSON.parse(currentDate));

   // console.log("current:" + currentDate.valueOf());
    Highcharts.stockChart('containerstock', {
        animation: {
            duration: 2000,
            easing: 'swing'
        },
        rangeSelector: {
            selected: 1,
            enabled: false
        },

        title: {
            text: 'Nivel de contaminacion (PM)'

        },
        xAxis: {
            ordinal: true,
            type: 'datetime'
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Valores',
                margin: 0.3,
                size:"10px",
            },
            labels: {
                format: '{value:.2f}'
            }

        },

        series: [{

            name: 'PM(ug/m3)',
            data: matriz,
            gapSize: 1,
            tooltip: {
                valueDecimals: 2,
               
            },
            shadow: {
                color: 'blue',
                width: 10,
                offsetX: 1,
                offsetY: 1
            },
            dataGrouping: {
                enabled: true,
                approximation: "open",
            }
        }],
        legend: {
            enabled:false
        },
        credits: {
            enabled: false
        }
    });

  })
// for figura de prigreso

var listAT = [];
$scope.pmconcetracion=0;
NivelContaminacionService.ListarNivel().then(function(datosNivel){
$scope.datosAuto=datosNivel.data;
//console.log("datosdasd"+$scope.datosAuto);
for (var i = 0; i < $scope.datosAuto.length; i++) {
    if ($scope.datosAuto[i].Estacion.EstacionId==1) {
        listAT.push($scope.datosAuto[i].Concentracion);
        //console.log("con:" + $scope.niveles[i].Concentracion);
    }
   
}
$scope.pmconcetracion=listAT.pop();
  // para el speed
  var gaugeOptions = {

    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.16, '#55BF3B'],
            [0.17, '#FFFF00'],
            [0.18, '#FFFF00'],
            [0.20, '#F7FE2E'],
            [0.22, '#FFFF00'],
            [0.32, '#FFFF00'], //yellow 
            [0.33, '#FFFF00'],
            [0.34, '#FF0000'],//RED
            [0.35, '#FF0000'],//red
            [0.36, '#FF0000'],
            [0.40, '#FF0000'],//red
            [0.49, '#FF0000'],//RED
            [0.51, '#B43104'], // RED
            [0.60, '#B43104'],//CAFE
            [0.61, '#B43104'],//CAFE
            [0.62, '#B43104'],
            [0.69, '#B43104'],
            [0.7, '#B43104'],
            [0.8, '#B43104'],
            [0.9, '#B43104'],
            // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 4,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

// The speed gauge
var chartSpeed = Highcharts.chart('container-speedyauto', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 300,
        title: {
            text: 'Curva'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Speed',
        data: [$scope.pmconcetracion],//$scope.item.Concentracion
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                   '<span style="font-size:12px;color:silver">Ug/M3</span></div>'
        },
        tooltip: {
            valueSuffix: 'Ug/m3'
        }
    }]

}));
// final progress diagonal
})

        
  //final stock
//   $scope.rangos=[];
//   $http.get('http://redmonica.fullcodigo.com/Api/RangoICAAPi').
//   then(function (response) {
//       $scope.rangos = response.data;
//       console.log($scope.rangos);


//               }, function(error){
//               alert("There is not rangos");
//           });
//   console.log("dasdsadas"+$scope.rangos);
//   $scope.goHome=function(){
// 	alert("casa");
//     $state.go('start');
//     };

})
// para popup
.controller('PopupCtrl',function($scope,$ionicModal, $ionicPopup, $timeout,ContaminanteAutoPMService) {

   
    // Triggered on a button click, or some other target
    $scope.showPopup = function() {
      $scope.data = {};
    
    
      $timeout(function() {
         myPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);
     };
    
    
    
     // An alert dialog
     $scope.showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Calidad PM',
         template: ' EL indice es muy alto Puede ser muy dañino para la salud'
       });
    
       alertPopup.then(function(res) {
         //console.log('Thank you for not eating my delicious ice cream cone');
       });
     };
    })
;