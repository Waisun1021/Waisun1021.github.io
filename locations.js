(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TaxiPlaces=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{'use strict';
function valid(point){return !!point&&typeof point.address==='string'&&point.address.trim().length>0&&point.address.length<=200&&Number.isFinite(point.lat)&&Math.abs(point.lat)<=90&&Number.isFinite(point.lng)&&Math.abs(point.lng)<=180;}
class Selection{
 constructor(){this.places=new Map();}
 select(id,point){if(typeof id!=='string'||!valid(point))return false;this.places.set(id,Object.freeze({address:point.address.trim(),lat:point.lat,lng:point.lng,partial:point.partial===true}));return true;}
 get(id,currentAddress){const point=this.places.get(id);return point&&point.address===currentAddress&&valid(point)?{...point}:null;}
 clear(id){this.places.delete(id);}
}
function stopIds(mode,order,mixedStops){if(mode==='mixed')return mixedStops.map(s=>(s.field==='drop'?'drop-':'place-')+s.person);const ids=order.map(i=>'place-'+i);return mode==='pickup'?ids.concat('shared'):['shared',...ids];}
return {valid,Selection,stopIds};
});
