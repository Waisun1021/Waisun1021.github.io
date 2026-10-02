(function(root){
  'use strict';
  function splitFare(total,legs,mode){
    if(!Number.isSafeInteger(total)||total<1||total>1000000) throw new Error('fare');
    if(!['pickup','dropoff'].includes(mode)||!Array.isArray(legs)||legs.length<1||legs.length>8||legs.some(d=>!Number.isFinite(d)||d<0||d>10000000)) throw new Error('distance');
    const distances=legs.map((_,i)=>mode==='pickup'?legs.slice(i).reduce((a,b)=>a+b,0):legs.slice(0,i+1).reduce((a,b)=>a+b,0));
    return allocateFare(total,distances);
  }
  function allocateFare(total,distances){
    if(!Number.isSafeInteger(total)||total<1||total>1000000)throw new Error('fare');
    if(!Array.isArray(distances)||distances.length<1||distances.length>8||distances.some(d=>!Number.isFinite(d)||d<0))throw new Error('distance');
    const sum=distances.reduce((a,b)=>a+b,0);
    if(sum<=0)throw new Error('zero');
    const exact=distances.map(d=>total*d/sum).map(x=>Math.abs(x-Math.round(x))<1e-8?Math.round(x):x);
    const amounts=exact.map(Math.floor), remainder=total-amounts.reduce((a,b)=>a+b,0);
    if(remainder<0||remainder>distances.length)throw new Error('distance');
    const order=amounts.map((_,i)=>i).sort((a,b)=>Math.round((exact[b]-amounts[b])*1e8)-Math.round((exact[a]-amounts[a])*1e8)||a-b);
    order.slice(0,remainder).forEach(i=>amounts[i]++);
    return {total,distances,amounts};
  }
  function splitMixed(total,legs,intervals){
    if(!Array.isArray(legs)||legs.length<1||legs.length>15||legs.some(d=>!Number.isFinite(d)||d<0||d>10000000)||!Array.isArray(intervals)||intervals.length<1||intervals.length>8)throw new Error('distance');
    if(intervals.some(v=>!Array.isArray(v)||v.length!==2||!Number.isInteger(v[0])||!Number.isInteger(v[1])||v[0]<0||v[1]>legs.length||v[0]>=v[1]))throw new Error('order');
    const stops=intervals.flat();if(stops.length!==legs.length+1||new Set(stops).size!==stops.length)throw new Error('order');
    return allocateFare(total,intervals.map(([a,b])=>legs.slice(a,b).reduce((sum,d)=>sum+d,0)));
  }
  root.TaxiFare={splitFare,splitMixed};
  if(typeof module!=='undefined')module.exports=root.TaxiFare;
})(typeof window!=='undefined'?window:globalThis);
