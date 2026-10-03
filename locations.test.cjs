const assert=require('node:assert/strict'),{valid,Selection,stopIds}=require('./locations.js');
const landmark={address:'台北車站',lat:25.0479,lng:121.517,partial:false};
const selection=new Selection();assert.equal(selection.get('place-0','台北車站'),null);
for(const bad of [{...landmark,lat:NaN},{...landmark,lng:181},{...landmark,lat:'25'},{...landmark,address:''},{...landmark,address:'x'.repeat(201)},null]){assert(!valid(bad));assert(!selection.select('place-0',bad));}
assert(selection.select('place-0',landmark));landmark.lat=0;assert.equal(selection.get('place-0','台北車站').lat,25.0479);
assert.equal(selection.get('place-0','台北101'),null);const copy=selection.get('place-0','台北車站');copy.lat=0;assert.equal(selection.get('place-0','台北車站').lat,25.0479);
assert.deepEqual(stopIds('pickup',[2,0,1],[]),['place-2','place-0','place-1','shared']);
assert.deepEqual(stopIds('dropoff',[1,0],[]),['shared','place-1','place-0']);
assert.deepEqual(stopIds('mixed',[],[{person:1,field:'place'},{person:0,field:'place'},{person:1,field:'drop'},{person:0,field:'drop'}]),['place-1','place-0','drop-1','drop-0']);
selection.clear('place-0');assert.equal(selection.get('place-0','台北車站'),null);
const examples=[['pickup',[0,1],[]],['dropoff',[1,0],[]],['mixed',[],[{person:0,field:'place'},{person:1,field:'place'},{person:0,field:'drop'},{person:1,field:'drop'}]]];
for(const [mode,order,stops] of examples){const state=new Selection(),ids=stopIds(mode,order,stops);assert(ids.some(id=>!state.get(id,'台北車站')));for(const id of ids)state.select(id,{address:'台北車站',lat:25,lng:121});assert(ids.every(id=>state.get(id,'台北車站')));state.clear(ids.at(-1));assert(ids.some(id=>!state.get(id,'台北車站')));}
console.log('All modes require selected coordinates; changed text, removed places, malformed coordinates and copy isolation passed.');
