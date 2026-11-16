// Coordinates are shared by navigation, hitscan and scene geometry.
export const blocks=[
[-23,0,1,48,5], [23,0,1,48,5],[0,-23,48,1,5],[0,23,48,1,5],
[-12,1,2,25,5],[12,1,2,25,5],[-6,-10,10,2,5],[6,-10,10,2,5],
[0,4,10,2,5],[-18,1,4,3,1.4],[18,0,4,3,1.4],[-5,14,4,3,1.5],[5,14,4,3,1.5],
[-5,-18,3,3,1.5],[5,-18,3,3,1.5],[0,-2,3,3,1.25],[-18,14,3,3,1.6],[18,14,3,3,1.6]
];
export const sites=[{x:-18,z:-13,name:'A',label:'Tidal engine'},{x:18,z:-13,name:'B',label:'Signal array'}];
export const nodes=[[0,19],[-8,19],[-18,19],[-21,19],[-21,8],[-21,-6],[-21,-18],[-18,-14],[-15,-6],[-15,8],[-15,19],[-8,-17],[0,-17],[8,-17],[18,-14],[21,-18],[21,-6],[21,8],[21,19],[18,19],[15,19],[15,8],[15,-6],[8,19],[0,10],[-7,8],[7,8],[0,-6],[-7,-6],[7,-6],[0,-13]];
export function blocked(x,z,r=.32){for(const b of blocks)if(Math.abs(x-b[0])<b[2]/2+r&&Math.abs(z-b[1])<b[3]/2+r)return true;return false;}
export function clear(x,z,a,b){const d=Math.hypot(a-x,b-z),n=Math.ceil(d/.3);for(let i=1;i<n;i++)if(blocked(x+(a-x)*i/n,z+(b-z)*i/n,.03))return false;return true;}
export const graph=nodes.map((p,i)=>nodes.map((q,j)=>j!==i&&clear(...p,...q)?j:-1).filter(j=>j>=0));
export function nextNode(x,z,tx,tz){let start=0,end=0,sd=1e9,ed=1e9;nodes.forEach((p,i)=>{let d=Math.hypot(x-p[0],z-p[1]);if(d<sd&&clear(x,z,...p)){sd=d;start=i;}d=Math.hypot(tx-p[0],tz-p[1]);if(d<ed){ed=d;end=i;}});const queue=[start],prev=Array(nodes.length).fill(-1);prev[start]=start;for(let k=0;k<queue.length;k++){let i=queue[k];if(i===end)break;for(const j of graph[i])if(prev[j]===-1){prev[j]=i;queue.push(j);}}let n=end;if(prev[n]===-1)return nodes[start];while(prev[n]!==start&&prev[n]!==n)n=prev[n];return nodes[n];}
