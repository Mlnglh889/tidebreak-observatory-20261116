import assert from 'node:assert/strict';
import {S,start,deploy,step,shoot,reload,buy,grenade} from './game/sim.js';
const I={forward:0,back:0,left:0,right:0,crouch:false,walk:false,fire:false,use:false};
function tick(n){for(let i=0;i<n;i++)step(1/60,I);}
start();assert(buy(2));assert.equal(S.money,400);deploy();
S.bots.forEach(a=>a.alive=false);S.bots[2].alive=true;S.bots[2].x=0;S.bots[2].z=14;
shoot();assert.equal(S.headshots,1);assert.equal(S.p.ammo,7);assert.equal(S.bots[2].alive,false);
start();buy(0);deploy();S.bots.forEach(a=>{a.cool=1000;});shoot();const reserve=S.p.reserve;reload();tick(120);assert.equal(S.p.reload,0);assert.equal(S.p.ammo,24);assert.equal(S.p.reserve,reserve-1);
S.p.x=-18;S.p.z=-13;S.bots.forEach(a=>{a.cool=1000;});I.use=true;tick(151);assert(S.bomb);I.use=false;const charge=S.bomb;S.team=1;S.p.x=charge.x;S.p.z=charge.z;I.use=true;tick(245);assert.equal(S.phase,'result');assert.equal(S.winner,1);I.use=false;
start();deploy();grenade();assert.equal(S.p.grenades,0);tick(98);assert.equal(S.grenades.length,0);
console.log('PASS buy, headshot kill, magazine depletion, reload/reserve, plant, defuse, grenade fuse');
