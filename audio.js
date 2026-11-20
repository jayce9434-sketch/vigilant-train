/* My Singing Dogs — synchronized, individually controllable full-song stems.
   The original compositions are pre-rendered with real sampled instruments.
   Web Audio starts every performer from one exact AudioContext timestamp. */
(function(){
'use strict';
class IslandOrchestra{
 constructor(){this.ctx=null;this.island='plant';this.buffers=new Map();this.sources=new Map();this.gains=new Map();this.playing=false;this.loading=false;this.position=0;this.startTime=0;this.loadToken=0;this.loadingKeys=new Set();this.master=100;this.music=100;this.muted=false;this.concert=false;this.getMix=()=>({});this.onState=()=>{};this.onError=()=>{};}
 get duration(){return window.MSD_SCORE[this.island].duration;}
 desiredMix(){const mix=this.getMix();if(!this.concert)return mix;const out={...mix};const base=window.MSD_PREVIEW_KEYS?.[this.island]||[];for(const key of base)out[key]=Math.max(.92,out[key]||0);return out;}
 async init(){if(!this.ctx){this.ctx=new (window.AudioContext||window.webkitAudioContext)({latencyHint:'playback'});this.compressor=this.ctx.createDynamicsCompressor();this.compressor.threshold.value=-17;this.compressor.knee.value=16;this.compressor.ratio.value=5;this.compressor.attack.value=.007;this.compressor.release.value=.26;this.masterNode=this.ctx.createGain();this.masterNode.connect(this.compressor);this.compressor.connect(this.ctx.destination);this.setVolumes();}if(this.ctx.state!=='running')await this.ctx.resume();}
 setVolumes(master=this.master,music=this.music){this.master=master;this.music=music;if(this.masterNode){let volume=this.muted?0:3.3*(master/100)*(music/100);this.masterNode.gain.setTargetAtTime(Math.min(12,volume),this.ctx.currentTime,.07);}}
 setMuted(flag){this.muted=!!flag;this.setVolumes();this.onState();}
 async load(island){await this.init();let mix=this.desiredMix(),needed=Object.keys(window.MSD_SCORE[island].tracks).filter(k=>(mix[k]||0)>0);const token=++this.loadToken;this.loading=true;this.onState();try{
  // decode all eight stems before starting any, avoiding staggered entrances
  const decoded=await Promise.all(needed.map(async key=>{const id=`${island}-${key}`;if(this.buffers.has(id))return [id,this.buffers.get(id)];const resp=await fetch(`${island[0]}-${key}.ogg`);if(!resp.ok)throw Error(`Could not load ${key} (${resp.status})`);const arr=await resp.arrayBuffer();const buf=await this.ctx.decodeAudioData(arr);return [id,buf];}));
  if(token!==this.loadToken)return false;
  // Keep only current island decoded: mobile memory stays bounded.
  this.buffers=new Map(decoded);this.loading=false;this.onState();return true;
 }catch(err){if(token===this.loadToken){this.loading=false;this.onError('Music could not load. Check the connection and try again.');this.onState();}console.error('MSD music load error',err);return false;}}
 async play(){if(this.playing||this.loading)return;const island=this.island;const success=await this.load(island);if(!success||this.island!==island)return;this.startSources(this.position);}
 startSources(offset){if(!this.ctx)return;this.stopSources();this.position=Math.max(0,offset%this.duration);const when=this.ctx.currentTime+.09;this.startTime=when-this.position;const kinds=Object.keys(window.MSD_SCORE[this.island].tracks);for(const key of kinds){const buffer=this.buffers.get(`${this.island}-${key}`);if(!buffer)continue;const source=this.ctx.createBufferSource();source.buffer=buffer;source.loop=true;source.loopStart=0;source.loopEnd=Math.min(buffer.duration,this.duration);const gain=this.ctx.createGain();gain.gain.value=0;source.connect(gain).connect(this.masterNode);source.start(when,Math.min(this.position,source.loopEnd-.01));this.sources.set(key,source);this.gains.set(key,gain);}this.playing=true;this.refreshMix();this.onState();}
 refreshMix(){if(!this.ctx)return;const mix=this.desiredMix();for(const [key,gain] of this.gains){const val=Math.min(1.3,Number(mix[key]||0));gain.gain.setTargetAtTime(Math.max(0,val),this.ctx.currentTime,.06);}
  if(this.playing)for(const key of Object.keys(mix))if(mix[key]>0&&!this.gains.has(key))this.addStem(key);
 }
 async addStem(key){if(!this.ctx||!this.playing||this.loadingKeys.has(key))return;
  const island=this.island, token=this.loadToken;
  if(!window.MSD_SCORE[island].tracks[key])return;
  this.loadingKeys.add(key);
  try{const id=island+'-'+key;let buffer=this.buffers.get(id);
   if(!buffer){const response=await fetch(island[0]+'-'+key+'.ogg');if(!response.ok)throw Error('Music part unavailable: '+key);buffer=await this.ctx.decodeAudioData(await response.arrayBuffer());}
   if(this.island!==island||token!==this.loadToken||!this.playing)return;
   this.buffers.set(id,buffer);
   const when=this.ctx.currentTime+.07, offset=((when-this.startTime)%this.duration+this.duration)%this.duration;
   const src=this.ctx.createBufferSource(),gain=this.ctx.createGain();src.buffer=buffer;src.loop=true;src.loopStart=0;src.loopEnd=Math.min(buffer.duration,this.duration);gain.gain.value=0;src.connect(gain).connect(this.masterNode);
   src.start(when,Math.min(offset,src.loopEnd-.02));this.sources.set(key,src);this.gains.set(key,gain);this.refreshMix();
  }catch(err){console.warn('Unable to add instrument',key,err);this.onError('An instrument part could not load.');}
  finally{this.loadingKeys.delete(key)}
 }
 stopSources(){for(const [,s]of this.sources){try{s.stop();s.disconnect();}catch(_){}}for(const [,g]of this.gains){try{g.disconnect();}catch(_){}}this.sources.clear();this.gains.clear();this.playing=false;}
 now(){if(!this.playing||!this.ctx)return this.position;return ((this.ctx.currentTime-this.startTime)%this.duration+this.duration)%this.duration;}
 pause(){if(!this.playing)return;this.position=this.now();this.stopSources();this.onState();}
 toggle(){if(this.playing){this.pause();return Promise.resolve();}return this.play();}
 seek(seconds){const p=Math.min(this.duration-.02,Math.max(0,seconds));this.position=p;if(this.playing)this.startSources(p);this.onState();}
 restart(){this.seek(0);}
 setIsland(island){if(this.island===island)return;this.loadToken++;const wasPlaying=this.playing;this.stopSources();this.position=0;this.island=island;this.concert=false;this.buffers.clear();this.loadingKeys.clear();this.loading=false;this.onState();if(wasPlaying)this.play();}
 setConcert(flag){this.concert=!!flag;this.refreshMix();this.onState();}
 effect(type){if(!this.ctx||this.ctx.state!=='running')return;let t=this.ctx.currentTime;const osc=this.ctx.createOscillator(),gain=this.ctx.createGain(),flt=this.ctx.createBiquadFilter();osc.type=type==='egg'?'triangle':type==='coin'?'sine':'sawtooth';let start=type==='egg'?390:type==='coin'?490:150,end=type==='egg'?240:type==='coin'?620:72;osc.frequency.setValueAtTime(start,t);osc.frequency.exponentialRampToValueAtTime(end,t+.17);flt.type='lowpass';flt.frequency.value=type==='coin'?1200:620;gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(.055*Math.min(2,this.master/100),t+.015);gain.gain.exponentialRampToValueAtTime(.0001,t+.28);osc.connect(flt).connect(gain).connect(this.masterNode);osc.start(t);osc.stop(t+.32);}
}
window.MSDAudio=new IslandOrchestra();
})();
