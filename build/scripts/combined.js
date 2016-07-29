function addCommas(e){e+="";for(var t=e.split("."),a=t[0],i=t.length>1?"."+t[1]:"",o=/(\d+)(\d{3})/;o.test(a);)a=a.replace(o,"$1,$2");return a+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0==t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}!function(e){e.fn.confirmModal=function(t){function a(e,t){}var i=e("body"),o={confirmTitle:"Please confirm",confirmMessage:"Are you sure you want to perform this action ?",confirmOk:"Yes",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:a,confirmDismiss:!0,confirmAutoOpen:!1},s=e.extend(o,t),r='<div class="modal fade" id="#modalId#" tabindex="-1" role="dialog" aria-labelledby="#AriaLabel#" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>#Heading#</h3></div><div class="modal-body"><p>#Body#</p></div><div class="modal-footer">#buttonTemplate#</div></div></div></div>';return this.each(function(t){var a=e(this),o=a.data(),n=(e.extend(s,o),"confirmModal"+Math.floor(1e9*Math.random())),l=r,c='<button class="btn btn-default" data-dismiss="modal">#Cancel#</button><button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button>';"ltr"==s.confirmDirection&&(c='<button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button><button class="btn btn-default" data-dismiss="modal">#Cancel#</button>');var d=s.confirmTitle;"function"==typeof s.confirmTitle&&(d=s.confirmTitle.call(this));var m=s.confirmMessage;"function"==typeof s.confirmMessage&&(m=s.confirmMessage.call(this)),l=l.replace("#buttonTemplate#",c).replace("#modalId#",n).replace("#AriaLabel#",d).replace("#Heading#",d).replace("#Body#",m).replace("#Ok#",s.confirmOk).replace("#Cancel#",s.confirmCancel).replace("#Style#",s.confirmStyle),i.append(l);var p=e("#"+n);a.on("click",function(e){e.preventDefault(),p.modal("show")}),e('button[data-dismiss="ok"]',p).on("click",function(e){s.confirmDismiss&&p.modal("hide"),s.confirmCallback(a,p)}),s.confirmAutoOpen&&p.modal("show")})}}(jQuery);var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,t,a){allLayers=[]}),function(){"use strict"}();var crsra=crsra||{bookmarks:[{id:"ottawa-nwr",name:"Ottawa NWR",userCreated:!1,spatialReference:{wkid:102100},xmax:-9253627.864758775,xmin:-9268896.161158718,ymax:5109457.058192252,ymin:5099759.110228584}],globals:{}},map,zonalStatsGP,maxLegendHeight,maxLegendDivHeight,printCount=0,storageName="esrijsapi_mapmarks",mapLayers=[],mapLayerIds=[];require(["esri/map","esri/dijit/OverviewMap","esri/SnappingManager","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/Bookmarks","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/Popup","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","esri/tasks/GeometryService","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/tasks/LegendLayer","esri/SpatialReference","esri/geometry/Extent","esri/config","esri/urlUtils","esri/request","dojo/_base/array","dojo/_base/lang","dojo/keys","dojo/cookie","dojo/has","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/on","dojo/domReady!"],function(e,t,a,i,o,s,r,n,l,c,d,m,p,u,g,h,y,f,b,v,k,S,L,w,x,C,M,R,D,T,A,I,P,z){function G(){if(K){var e=[];C.forEach(crsra.bookmarks,function(t){t.userCreated===!1&&e.push(t.id)});for(var t=crsra.bookmarks.slice(),a=0;a<t.length;a++){var i=t[a];-1!==e.indexOf(i.id)&&(t.splice(a,1),a--)}console.log(t);var o=JSON.stringify(t);window.localStorage.setItem(storageName,o)}else{var s=7;D(storageName,dojo.toJson(crsra.bookmarks),{expires:s})}}function E(){K?window.localStorage.removeItem(storageName):dojo.cookie(storageName,null,{expires:-1});var e=[];C.forEach(crsra.bookmarks,function(t){t.userCreated===!0&&e.push(t.id)});for(var t=0;t<crsra.bookmarks.length;t++){var a=crsra.bookmarks[t];-1!==e.indexOf(a.id)&&(crsra.bookmarks.splice(t,1),t--)}C.forEach(e,function(e){$("#"+e).remove()})}function F(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}function O(){$("#shareModal").modal("show");var e=map.extent,t="?xmax="+e.xmax.toString()+"&xmin="+e.xmin.toString()+"&ymax="+e.ymax.toString()+"&ymin="+e.ymin.toString(),a="%3Fxmax="+e.xmax.toString()+"%26xmin="+e.xmin.toString()+"%26ymax="+e.ymax.toString()+"%26ymin="+e.ymin.toString(),i="http://wlera.wim.usgs.gov/crsra/",o=i+t,s=i+a;console.log("Share URL is:"+o),$("#showFullLinkButton").click(function(){$("#fullShareURL").html('<span id="fullLinkLabel" class="label label-default"><span class="glyphicon glyphicon-link"></span> Full link</span><br><textarea style="margin-bottom: 10px; cursor: text" class="form-control"  rows="3" readonly>'+o+"</textarea>")}),$("#showShortLinkButton").click(function(){$.ajax({dataType:"json",type:"GET",url:"https://api-ssl.bitly.com/v3/shorten?access_token=e1a16076cc8470c65419920156e0ae2c4f77850f&longUrl="+s,headers:{Accept:"*/*"},success:function(e){var t=e.data.url;$("#bitlyURL").html('<span class="label label-default"><span class="glyphicon glyphicon-link"></span> Bitly link</span><code>'+t+"</code>")},error:function(e){$("#bitlyURL").html('<i class="fa fa-exclamation-triangle"></i> An error occurred retrieving shortened Bitly URL')}})})}function j(){$("#printModal").modal("show")}function B(){$("#bookmarkModal").modal("show")}function N(){1==A.byId("chkExtent").checked?ce.activeGeocoder.searchExtent=map.extent:ce.activeGeocoder.searchExtent=null}function _(){N();var e=ce.find();e.then(function(e){V(e)}),$("#geosearchModal").modal("hide")}function U(e){Y();var t=e.graphic?e.graphic:e.result.feature;t.setSymbol(de),q(e.result,t.symbol)}function V(e){if(e=e.results,e.length>0){Y();for(var t=de,a=0;a<e.length;a++)q(e[a],t);W(e)}}function H(e){var t=e.indexOf(",");return t>0&&(e=e.substring(0,t)),e}function q(e,t){var a,i,o,s,r={};o=e.feature.geometry,r.address=e.name,r.score=e.feature.attributes.Score,a={address:H(r.address),score:r.score,lat:o.getLatitude().toFixed(2),lon:o.getLongitude().toFixed(2)},i=new d({title:"{address}",description:"Latitude: {lat}<br/>Longitude: {lon}"}),s=new m(o,t,a,i),map.graphics.add(s)}function W(e){for(var t=new p(map.spatialReference),a=0;a<e.length;a++)t.addPoint(e[a].feature.geometry);map.setExtent(t.getExtent().expand(2))}function Y(){map.infoWindow.hide(),map.graphics.clear()}function X(e,t,a,i,o){return new u({angle:0,xoffset:t,yoffset:a,type:"esriPMS",url:e,contentType:"image/png",width:i,height:o})}function Z(){function e(e){printCount++;var t=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+l+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(t),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function t(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem"),$("#printExecuteButton").button("reset")}var a=new f;a.map=map;var i=new b;i.exportOptions={width:500,height:400,dpi:300};var o=map.getZoom(),s="";o>=9&&(s="9"),o>=11&&(s="11"),o>=15&&(s="15"),i.showAttribution=!1,i.format="PDF",i.layout="Letter ANSI A LandscapeGLCWRA"+s,i.preserveScale=!1;var r=new v;r.layerId="normalized",r.subLayerIds=[0];var n=$("#printTitle").val();""===n?i.layoutOptions={titleText:"Connecting River Systems Restoration Assessment - Provisional Data",authorText:"Connecting River Systems Restoration Assessment (CRSRA)",copyrightText:"This page was produced by the CRSRA web application at wlera.wim.usgs.gov/crsra",legendLayers:[r]}:i.layoutOptions={titleText:n+" - Provisional Data",authorText:"Connecting River Systems Restoration Assessment (CRSRA)",copyrightText:"This page was produced by the CRSRA web application at wlera.wim.usgs.gov/crsra",legendLayers:[r]};var l=i.layoutOptions.titleText;a.template=i;var c=new y("http://gis.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");c.execute(a,e,t)}function J(){var e=$("#bookmarkTitle"),t=map.extent.toJson(),a=e.val();if(a.length>0){var i=a.toLowerCase().replace(/ /g,"-");t.name=a,t.id=i,t.userCreated=!0,crsra.bookmarks.push(t);var o=i+"_delete",s=$('<tr id="'+i+'"><td  class="bookmarkTitle td-bm">'+a+'</td><td class="text-right text-nowrap"> <button id="'+o+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" > <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(s),$("#"+o).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+i).remove();for(var e=0;e<crsra.bookmarks.length;e++){var t=crsra.bookmarks[e];-1!==i.indexOf(t.id)&&crsra.bookmarks.splice(e,1)}G()}}),e.val(""),G(),$("#bmAlert").hide(),$("#bookmarkModal").modal("hide")}else $("#bmAlert").show()}function Q(){var e=esri.urlToObject(document.location.href);if(e.query){var t=new S(parseFloat(e.query.xmin),parseFloat(e.query.ymin),parseFloat(e.query.xmax),parseFloat(e.query.ymax),new k({wkid:102100}));map.setExtent(t);var a=document.location.href,i=a.substring(0,a.indexOf("?"));history.pushState(null,"",i)}}var K=F(),ee=new c({},P.create("div"));I.add(ee.domNode,"dark"),map=new e("mapDiv",{basemap:"gray",center:[-82.7863,42.5864],spatialReference:26917,zoom:9,logo:!1,minZoom:9,infoWindow:ee}),L.defaults.geometryService=new h("http://gis.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),esri.config.defaults.io.corsEnabledServers.push("http://gis.wim.usgs.gov/");const te=new i({map:map},"homeButton");te.startup();const ae=new o({map:map},"locateButton");ae.startup();const ie=new s({map:map,advancedLocationUnits:!0},A.byId("measurementDiv"));ie.startup();var oe;if(oe=K?window.localStorage.getItem(storageName):dojo.cookie(storageName),oe&&"null"!==oe&&oe.length>4){console.log("cookie: ",oe,oe.length);var se=dojo.fromJson(oe);C.forEach(se,function(e){crsra.bookmarks.push(e)})}else console.log("no stored bookmarks...");const re=new t({map:map,attachTo:"bottom-right"});re.startup();var ne=$('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');$(".esriMeasurementResultTable").append(ne),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#shareNavButton").click(function(){O()}),$("#printNavButton").click(function(){j()}),$("#addBookmarkButton").click(function(){B()}),$("#printExecuteButton").click(function(){$(this).button("loading"),Z()}),$("#print-title-form").on("keypress",function(e){13==e.keyCode&&($("#printExecuteButton").button("loading"),Z())}),$("#bookmarkSaveButton").click(function(){J()}),$("#bookmark-title-form").on("keypress",function(e){13==e.keyCode&&J()}),$("#bookmarkDismissButton").click(function(){$("#bmAlert").hide()}),z(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var t=g.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(t.y.toFixed(4)),$("#longitude").html(t.x.toFixed(4)),Q()}),z(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),z(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!==e.mapPoint){var t=g.webMercatorToGeographic(e.mapPoint);$("#latitude").html(t.y.toFixed(4)),$("#longitude").html(t.x.toFixed(4))}}),z(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=g.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(4)),$("#longitude").html(e.x.toFixed(4))});var le=new n("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer",{visible:!1});map.addLayer(le),z(A.byId("btnStreets"),"click",function(){map.setBasemap("streets"),le.setVisibility(!1)}),z(A.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),le.setVisibility(!1)}),z(A.byId("btnGray"),"click",function(){map.setBasemap("gray"),le.setVisibility(!1)}),z(A.byId("btnOSM"),"click",function(){map.setBasemap("osm"),le.setVisibility(!1)}),z(A.byId("btnTopo"),"click",function(){map.setBasemap("topo"),le.setVisibility(!1)}),z(A.byId("btnNatlMap"),"click",function(){le.setVisibility(!0)});var ce=new l({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");ce.startup(),ce.on("select",U),ce.on("findResults",V),ce.on("clear",Y),z(ce.inputNode,"keydown",function(e){13==e.keyCode&&N()});var de=X("images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),z(A.byId("btnGeosearch"),"click",_),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function t(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){t()}),$("#scaleAlertClose").click(function(){$("#parcelSelectScaleAlert").hide()}),$("#goToScale").click(function(){$("#parcelSelectScaleAlert").hide();var e=map.getLayer("parcelsFeat").minScale;map.setScale(e)}),$("#disclaimerModal").modal({backdrop:"static"}),$("#disclaimerModal").modal("show"),$("#html").niceScroll();var a=$("#sidebar");a.niceScroll(),a.scroll(function(){$("#sidebar").getNiceScroll().resize()});var i=$("#legendCollapse"),o=$("#legendElement");$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),o.css("max-height",maxLegendHeight),i.on("shown.bs.collapse",function(){$("#legendLabel").show(),maxLegendHeight=.9*$("#mapDiv").height(),o.css("max-height",maxLegendHeight),maxLegendDivHeight=o.height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),i.on("hide.bs.collapse",function(){o.css("height","initial"),window.innerWidth<=767&&$("#legendLabel").hide()});var s=$("#measurementCollapse");s.on("shown.bs.collapse",function(){$("#measureLabel").show()}),s.on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()}),$(function(){$("[data-hide]").on("click",function(){$("."+$(this).attr("data-hide")).hide()})}),crsra.bookmarks.forEach(function(e){if(e.userCreated===!1){var t=$('<tr id="'+e.id+'"><td class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"></td> </tr>');$("#bookmarkList").append(t)}else{var a=e.id+"_delete",i=$('<tr id="'+e.id+'"><td  class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"> <button id="'+a+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" title="Delete bookmark"> <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(i),$("#"+a).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+e.id).remove();for(var t=0;t<crsra.bookmarks.length;t++){var a=crsra.bookmarks[t];-1!==e.id.indexOf(a.id)&&crsra.bookmarks.splice(t,1)}G()}})}}),$("body").on("click",".td-bm",function(){var e=this.parentNode.id;crsra.bookmarks.forEach(function(t){if(t.id==e){var a=new S(t.xmin,t.ymin,t.xmax,t.ymax,new k(t.spatialReference));map.setExtent(a)}})}),$('[data-toggle="tooltip"]').tooltip({delay:{show:500,hide:0}}),$("#removeBookmarksButton").confirmModal({confirmTitle:"Delete user bookmarks from memory",confirmMessage:"This action will remove all user-defined bookmarks from local memory on your computer or device. Would you like to continue?",confirmOk:"Yes, delete bookmarks",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:E,confirmDismiss:!0,confirmAutoOpen:!1})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/Geoprocessor","esri/tasks/FeatureSet","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/toolbars/draw","esri/SpatialReference","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/layers/LabelLayer","esri/symbols/TextSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/renderers/SimpleRenderer","esri/Color","esri/dijit/Popup","esri/dijit/PopupTemplate","dojo/query","dojo/dom"],function(e,t,a,i,o,s,r,n,l,c,d,p,u,g,h,y,f,b,v,k,S,L,w,x,C){function M(e){$("#calculateStats").button("reset");var t=e.results[0].value.features[0].attributes,a=$("#zonalStatsTable");a.html("<tr><th>Mean </th><th>Standard Deviation</th><th>Max</th></tr>"),a.append("<tr><td>"+t.MEAN.toFixed(4)+"</td><td>"+t.STD.toFixed(3)+"</td><td>"+t.MAX+"</td></tr>"),$("#zonalStatsModal").modal("show")}var R,D,T,A,I,P=[],G=!1,E=!1,F=!1,O=!1,j={inputPoly:null},B=[];const N="http://gis.wim.usgs.gov/arcgis/rest/services/GLCWRA/",_=new s("http://gis.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),U=new g(N+"CRSRA_restorationModel/MapServer",{id:"normalized",visible:!0});U.setVisibleLayers([0]),mapLayers.push(U),mapLayerIds.push(U.id),P.push({layer:U,title:" "}),U.inLegendLayers=!0;const V=new g(N+"CRSRA_hydroCondition/MapServer",{id:"dikes",visible:!1,minScale:2e7});V.setVisibleLayers([2]),mapLayers.push(V),mapLayerIds.push(V.id),V.inLegendLayers=!1;const H=new g(N+"CRSRA_hydroCondition/MapServer",{id:"degFlowlines",visible:!1,minScale:2e6});H.setVisibleLayers([1]),mapLayers.push(H),mapLayerIds.push(H.id),H.inLegendLayers=!1;const q=new g(N+"CRSRA_hydroCondition/MapServer",{id:"culverts",visible:!1,minScale:2e6});q.setVisibleLayers([0]),mapLayers.push(q),mapLayerIds.push(q.id),q.inLegendLayers=!1,map.disableClickRecenter(),R=new d(map);var W=$("#drawCustom");W.click(function(){parcelsFeatLayer.clearSelection(),map.graphics.remove(A),map.graphics.remove(I),$("#displayStats").prop("disabled",!0),$("#calculateStats").prop("disabled",!0),j={inputPoly:null},F?(R.finishDrawing(),R.deactivate(),W.removeClass("active"),W.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),F=!1):F||(W.addClass("active"),W.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop drawing'),G=!1,R.activate(d.POLYGON),F=!0)});var Y=$("#selectParcels");Y.click(function(){W.removeClass("active"),W.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),F=!1,R.deactivate(),G?(Y.removeClass("active"),Y.html('<span class="ti-plus"></span>&nbsp;&nbsp;Click'),map.setMapCursor("auto"),G=!1):G||(Y.addClass("active"),Y.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop selecting'),map.setMapCursor("crosshair"),E=!1,G=!0)}),$("#clearSelection").click(function(){parcelsFeatLayer.clearSelection(),map.graphics.remove(A),map.graphics.remove(I),$("#displayStats").prop("disabled",!0),$("#calculateStats").prop("disabled",!0),j={inputPoly:null},B=[]}),zonalStatsGP=new i("http://gis.wim.usgs.gov/arcgis/rest/services/GLCWRA/CRSRAZonalStats/GPServer/CRSRAZonalStats"),zonalStatsGP.setOutputSpatialReference({wkid:102100}),zonalStatsGP.on("execute-complete",M),$("#calculateStats").click(function(){$(this).button("loading"),zonalStatsGP.execute(j)}),z(R,"DrawEnd",function(e){T=new b(b.STYLE_SOLID,new v(v.STYLE_SOLID,new S([255,0,0]),2),new S([255,255,0,.5])),A=new m(e,T),map.graphics.add(A),R.deactivate(),W.removeClass("active"),W.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),F=!1,B.push(A);var t=new o;t.features=B,j={inputPoly:t},$("#calculateStats").prop("disabled",!1)}),D=new d(map);var X=$("#selectParcelsDraw");X.click(function(){map.graphics.remove(I);var e=map.getScale(),t=map.getLayer("parcelsFeat").minScale;O?(D.finishDrawing(),D.deactivate(),X.removeClass("active"),X.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),O=!1):O||(e>t?$("#parcelSelectScaleAlert").show():(X.addClass("active"),X.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop drawing'),G=!1,D.activate(d.POLYGON),O=!0))}),$("#displayStats").click(function(){$("#zonalStatsTable").html("<tr><th>Parcel ID</th><th>Hectares</th><th>Mean </th><th>Standard Deviation</th><th>Max</th></tr>"),map.getLayer("parcelsFeat").getSelectedFeatures().length>0&&$.each(map.getLayer("parcelsFeat").getSelectedFeatures(),function(){$("#zonalStatsTable").append("<tr><td>"+this.attributes.P_ID+"</td><td>"+this.attributes.Hec.toFixed(3)+"</td><td>"+this.attributes.MEAN.toFixed(4)+"</td><td>"+this.attributes.STD.toFixed(3)+"</td><td>"+this.attributes.stat_MAX+"</td></tr>"),$("#zonalStatsModal").modal("show")})});const Z=new g(N+"CRSRA_reference/MapServer",{id:"studyArea",visible:!0});Z.setVisibleLayers([0]),mapLayers.push(Z),mapLayerIds.push(Z.id),P.push({layer:Z,title:" "}),Z.inLegendLayers=!0;const J=new g(N+"CRSRA_reference/MapServer",{id:"GLRIWetlands",visible:!0,minScale:1e5,maxScale:1e4});J.setVisibleLayers([2]),mapLayers.push(J),P.push({layer:J,title:" "}),J.inLegendLayers=!0;var Q=new w({title:"U.S. ACOE Aerial Photo",mediaInfos:[{title:"",caption:"Date & Time taken: {date_}",type:"image",value:{sourceURL:"{imageUrl}",linkURL:"{imageUrl}"}}]}),K=new h(N+"CRSRA_reference/MapServer/1",{id:"aerials",layerID:"aerials",visible:!1,minScale:1e5,mode:h.MODE_ONDEMAND,outFields:["*"],infoTemplate:Q});K.id="aerials",mapLayers.push(K),mapLayerIds.push(K.id),P.push({layer:K,title:"US Army Corps of Engineers Aerial Photos "}),K.inLegendLayers=!0;const ee=new g(N+"CRSRA_restorationModel/MapServer",{id:"landuse",visible:!1});ee.setVisibleLayers([8]),mapLayers.push(ee),mapLayerIds.push(ee.id),ee.inLegendLayers=!1;const te=new g(N+"CRSRA_restorationModel/MapServer",{id:"imperviousSurfaces",visible:!1});te.setVisibleLayers([7]),mapLayers.push(te),mapLayerIds.push(te.id),te.inLegendLayers=!1;const ae=new g(N+"CRSRA_restorationModel/MapServer",{id:"conservedLands",visible:!1});ae.setVisibleLayers([6]),mapLayers.push(ae),mapLayerIds.push(ae.id),ae.inLegendLayers=!1;const oe=new g(N+"CRSRA_restorationModel/MapServer",{id:"flowline",visible:!1});oe.setVisibleLayers([5]),mapLayers.push(oe),mapLayerIds.push(oe.id),oe.inLegendLayers=!1;const se=new g(N+"CRSRA_restorationModel/MapServer",{id:"wetsoils",visible:!1});se.setVisibleLayers([4]),mapLayers.push(se),mapLayerIds.push(se.id),se.inLegendLayers=!1;const re=new g(N+"CRSRA_restorationModel/MapServer",{id:"hydroperiod",visible:!1});re.setVisibleLayers([3]),mapLayers.push(re),mapLayerIds.push(re.id),re.inLegendLayers=!1;const ne=new g(N+"CRSRA_restorationModel/MapServer",{id:"waterMask",visible:!0,opacity:.75});ne.setVisibleLayers([2]),mapLayers.push(ne),mapLayerIds.push(ne.id),ne.inLegendLayers=!1,map.addLayers(mapLayers);var le=new r,ce=new p(26917);ie.on("measure-end",function(e){le.geometries=[e.geometry],le.outSR=ce;var t=-1*e.geometry.x;84>t&&t>78?_.project(le,function(e){var t=e[0];console.log(t);var a=t.x.toFixed(0),i=t.y.toFixed(0);$("#utmX").html(a),$("#utmY").html(i)}):($("#utmX").html('<span class="label label-danger">outside zone</span>'),$("#utmY").html('<span class="label label-danger">outside zone</span>'))});for(var de=0;de<map.layerIds.length;de++){var me=map.getLayer(map.layerIds[de]);me.visible&&($("#"+me.id).button("toggle"),$("#"+me.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}for(var de=0;de<map.graphicsLayerIds.length;de++){var me=map.getLayer(map.graphicsLayerIds[de]);me.visible&&($("#"+me.id).button("toggle"),$("#"+me.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}$("button.lyrTog").click(function(e){$(this).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$(this).button("toggle"),e.preventDefault(),e.stopPropagation();var t=map.getLayer($(this).attr("id"));t.visible?t.setVisibility(!1):(t.setVisibility(!0),t.inLegendLayers===!1&&(P.push({layer:t,title:" "}),t.inLegendLayers=!0,pe.refresh()))}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("hide.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down");var t=$(this).attr("id")+"Buttons";$("#"+t).button("toggle")}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("show.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down")}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var t=this.parentNode.id,a=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(a),$(".zoomDialog").css("left",event.clientX-80),$(".zoomDialog").css("top",event.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var a=map.getLayer(t).minScale;map.setScale(a)}),$("#zoomcenter").click(function(e){var t=new c(-83.208084,41.628103,new p({wkid:4326}));map.centerAt(t)}),$("#zoomextent").click(function(e){var a=map.getLayer(t).fullExtent,i=new r;i.outSR=new p(102100),i.geometries=[a],_.project(i,function(e){var t=e[0];map.setExtent(t,new p({wkid:102100}))})})}),$(".opacity").hover(function(){$(".opacitySlider").remove();var e=this.parentNode.id,t=map.getLayer(e).opacity,a=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+t+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(a);var i=$("#slider");i[0].value=100*t,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-5),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),i.change(function(t){var a=i[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(e).setOpacity(a)})});var pe=new e({map:map,layerInfos:P},"legendDiv");pe.startup()})});