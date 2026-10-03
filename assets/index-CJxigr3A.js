(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();const zt={ANCHO:56,LARGO:56,ALTO:112,SUELO_Y:96,SUPERFICIE_CALOR:1.5,SUPERFICIE_ASCENSOR:2.5,LIMITE_MIN:5,LIMITE_MAX:51,CHUNK:16},Jt={X0:16,Z0:16,LADO:24,PROFUNDIDAD_BASE:72,POR_ESTRATO:6,MAX_ESTRATOS:3,ESTRATO_DESDE:6},Ze={TIERRA_HASTA:10,TIERRA_PROB_PIEDRA:.15,PIEDRA_HASTA:30,OBSIDIANA_PROB_MEDIA:.22,OBSIDIANA_PROFUNDA_DESDE:50,OBSIDIANA_PROB_PROFUNDA:.55,CUEVAS_DESDE:12,CUEVAS_FRACCION:.1,CUEVAS_ESCALA:.13,CUEVAS_PESO_A:.65,CUEVAS_PESO_B:.35,CUEVAS_ESCALA_B:2.1,CUEVAS_ALARGADO:1.3},fi={tierra:2,piedra:5,obsidiana:12,estrato:6,fosil:10,MINERAL_MULT:1.2,POR_METRO:.03},zr={azufre:{nombre:"Azufre",forma:[[1]],valor:4,desde:1,probVeta:.027,apagaDesde:14,color:"var(--azufre)"},oro:{nombre:"Oro",forma:[[1],[1]],valor:12,desde:8,probVeta:.011,apagaDesde:30,color:"var(--oro)"},esmeralda:{nombre:"Esmeralda",forma:[[1,0],[1,1]],valor:30,desde:18,probVeta:.0075,apagaDesde:48,color:"var(--esmeralda)"},rubi:{nombre:"Rubí",forma:[[1,1],[1,1]],valor:70,desde:30,probVeta:.0055,apagaDesde:999,color:"var(--rubi)"},zafiro:{nombre:"Zafiro",forma:[[1],[1],[1]],valor:160,desde:45,probVeta:.0045,apagaDesde:999,color:"var(--zafiro)"}},qr={MIN:2,MAX:5,APAGA_FRACCION:.65,APAGA_METROS:20},Cl=.03,Rl={DANIO_BASE:1,GOLPES_POR_SEG:4,ALCANCE_BASE:3},qd=1.15,Vn={filo:{nombre:"Filo",base:20,max:25,porNivel:.25,unidad:"% de daño"},mango:{nombre:"Mango ligero",base:30,max:20,porNivel:.08,unidad:"% de golpes por segundo"},alcance:{nombre:"Alcance",base:150,max:4,porNivel:.5,unidad:" m de alcance"},suerte:{nombre:"Suerte",base:60,max:20,porNivel:.03,unidad:"% de botín doble"},temple:{nombre:"Temple",base:40,max:20,porNivel:.03,unidad:"% menos calor"}},Un={COLUMNAS:4,FILAS:4,BONUS_LLENA:.5,INTENTOS_ACOMODO:4e3},nn={SATURACION_POR_UNIDAD:.03,SATURACION_MAX:.5,RECUPERACION:.02,RECUPERACION_CADA_SEG:10,ABAJO_MULT:1.35,ABAJO_PROFUNDIDAD:30,NOMBRE_TERE:"Niña Tere",NOMBRE_ABAJO:"Don Mauricio",FRASE_ABAJO:"Acá abajo se paga mejor, vos. Traeme lo que brilla."},Zn={DESDE:10,GANANCIA_POR_METRO:.12,ENFRIA_SUPERFICIE:25,ENFRIA_ARRIBA:5,PIERDE_AL_DESMAYO:.5,SEG_DESMAYADO:2.5,ALTO:70,CRITICO:90},be={ANCHO:.6,ALTO:1.7,OJOS:1.55,CAMINA:4.3,CORRE:6.5,GRAVEDAD:24,SALTO:7.8,RADIO_RECOGER:1.5,PECHO:1,ACEL_SUELO:60,ACEL_AIRE:18,RAD_POR_PIXEL:.0022,CABECEO_MAX:1.5533},kt={DESDE:20,MAX:3,DIST_APARICION:10,VE:10,VELOCIDAD:2.2,VELOCIDAD_PASEO:.9,CALOR_GOLPE:20,ESPERA:1.2,VIDA_GOLPES:6,COLONES:25,PROB_ZAFIRO:.1,ALTO:1.8,ANCHO:.6,HITBOX:.7,REACH:1.1,REACH_Y:1.7,DIST_MIN_PERSEGUIR:.2,RETROCESO:5,SEG_ENTRE_APARICIONES:6,SEG_DANO:.25,EMPUJE:7,GIRO_CAMBIO:3},Cn={REQUERIDO_BASE:30,EXTRA_POR_COLAPSO:5,REQUERIDO_MAX:55,MULT_POR_COLAPSO:.75,FOSILES_POR_PARTIDA:3,SEG:4.6,FASE_FUNDIDO:2.6,FASE_TARJETA:3.4},Rn={ROMPEFILAS_EXTRA:2,CHEPE_SEG:1.2,CHEPE_VENDE:.5,CHEPE_LADO:2,CHEPE_LADO_ROMPEFILAS:3,IMAN_RADIO:5,IMAN_VELOCIDAD:12,BRASA_CALOR:60,BRASA_MULT:2},We={nombre:"Torogoz",costo:250,BONUS_VENTA:.2},ce={MARGEN:.2,TOLERANCIA_Y:1.4,CADA:10,SALITA_X:27,SALITA_Z:27,SALITA_LADO:3,ALTO_SALITA:3},ih={SEG:2},de={SPAWN:{x:26.5,z:37.5,guinada:Math.atan2(-9.5,-7)},TIENDA:{x0:32,x1:39,z0:44,z1:49,altoMuro:3,mostrador:{x:36,z:44.5},RADIO:3.4},ASCENSOR:{x:13.5,z:28.5,RADIO:2.4},FOGATA:{x:22.5,z:47.5},FAROLES:[{x:30.5,z:41.5},{x:14.5,z:42.5},{x:27.5,z:13.5}],VENDEDOR:{dx:2.5,dz:2.5,RADIO:2},ARBOLES:26,IZOTES:14},rh={calidad:"medio",volumen:.7,silencio:!1,sensibilidad:1,invertirY:!1,fov:75},Dn={PASO:1/60,MAX_PASOS:5,GUARDAR_CADA_SEG:10,SEG_ENTRE_AVISOS_LLENA:3},xi={CLAVE:"estratos-fps.save.v1",VERSION:1},ve={SACUDIDA_GOLPE:.012,SACUDIDA_ROTURA:.03,SACUDIDA_MINERAL:.05,SACUDIDA_DECAE_SEG:.16,SACUDIDA_COLAPSO:.35,SACUDIDA_GOLPE_MOMIA:.08,PAUSA_IMPACTO_MINERAL_MS:45,PAUSA_IMPACTO_FOSIL_MS:90,CAMARA_LENTA_FOSIL_SEG:.5,CAMARA_LENTA_ESCALA:.25,BALANCEO_PICO_PX:6,BALANCEO_PICO_FREC:9,RETRASO_PICO:.04,RETRASO_PICO_MAX_PX:40,BALANCEO_CAMARA:.012,GOLPE_PICO_RETROCESO_PX:10,FOV_CORRER:6,FOV_SUAVIZADO:8,LATIDO_DESDE_CALOR:70},Dt={CALIDAD:{bajo:{ancho:480,alto:270,bloom:!1,dof:!1,polvo:60,particulas:128},medio:{ancho:640,alto:360,bloom:!0,dof:!1,polvo:120,particulas:256},alto:{ancho:960,alto:540,bloom:!0,dof:!0,polvo:200,particulas:512}},FOV_DEFECTO:75,FOV_MIN:60,FOV_MAX:90,CERCA:.05,LEJOS:140,NIEBLA_SUPERFICIE:.012,NIEBLA_MINA:.045,NIEBLA_POR_METRO:6e-4,NIEBLA_MAX:.095,LUZ_FAROL:{intensidad:8,distancia:30,decae:1.4},LUZ_AMBIENTE_MINA:1.9,LUZ_AMBIENTE_SUPERFICIE:2.6,LUZ_LUNA:3,EMISION_MINERAL:1.4,EMISION_FOSIL:1.8,EMISION_FONDO:1.6,BLOOM:{umbral:.8,fuerza:.65,radio:.5},VINETA:{fuerza:.55,suavidad:.5},AO:[.5,.68,.84,1],ALCANCE_PARTICULAS_FOSIL:24,ESTRELLAS:700},ah={};function Ct(n,t){(ah[n]??=[]).push(t)}function Wt(n,t){const e=ah[n];if(e)for(const i of[...e])i(t)}var et=(n=>(n[n.aire=0]="aire",n[n.tierra=1]="tierra",n[n.piedra=2]="piedra",n[n.obsidiana=3]="obsidiana",n[n.roca_madre=4]="roca_madre",n[n.arenisca_jeroglificos=5]="arenisca_jeroglificos",n[n.piedra_azufre=6]="piedra_azufre",n[n.piedra_oro=7]="piedra_oro",n[n.piedra_esmeralda=8]="piedra_esmeralda",n[n.piedra_rubi=9]="piedra_rubi",n[n.piedra_zafiro=10]="piedra_zafiro",n[n.estrato_0=11]="estrato_0",n[n.estrato_1=12]="estrato_1",n[n.estrato_2=13]="estrato_2",n[n.fosil_0=14]="fosil_0",n[n.fosil_1=15]="fosil_1",n[n.fosil_2=16]="fosil_2",n[n.empedrado=17]="empedrado",n[n.adobe=18]="adobe",n[n.madera=19]="madera",n[n.teja=20]="teja",n))(et||{});const Co=["aire","tierra","piedra","obsidiana","roca_madre","arenisca_jeroglificos","piedra_azufre","piedra_oro","piedra_esmeralda","piedra_rubi","piedra_zafiro","estrato_0","estrato_1","estrato_2","fosil_0","fosil_1","fosil_2","empedrado","adobe","madera","teja"],Er=["azufre","oro","esmeralda","rubi","zafiro"],wl=["filo","mango","alcance","suerte","temple"],Pl=["rompefilas","don_chepe","iman","brasa"],Ll=["tere","abajo"],Yd={azufre:6,oro:7,esmeralda:8,rubi:9,zafiro:10};function Tr(n){switch(n){case 6:return"azufre";case 7:return"oro";case 8:return"esmeralda";case 9:return"rubi";case 10:return"zafiro";default:return null}}function $d(n){return n>=11&&n<=13}function Dl(n){return n>=14&&n<=16}function sh(n){return n===4||n===5||n===17||n===18||n===19||n===20}let te=null,wn=null,zi=null,oh=.7,lh=!1;function jd(){if(te){te.resume();return}const n=window.AudioContext??window.webkitAudioContext;if(!n)return;te=new n,wn=te.createGain(),wn.connect(te.destination),zi=te.createBuffer(1,te.sampleRate,te.sampleRate);const t=zi.getChannelData(0);for(let e=0;e<t.length;e++)t[e]=Math.random()*2-1;Il(),Zd()}function Il(){wn&&(wn.gain.value=lh?0:oh*.6)}function ch(n){oh=Math.min(1,Math.max(0,n)),Il()}function uh(n){lh=n,Il()}function Ht(n,t,e,i,r=0,a=n){if(!te||!wn)return;const s=te.currentTime+r,o=te.createOscillator(),l=te.createGain();o.type=e,o.frequency.setValueAtTime(n,s),a!==n&&o.frequency.exponentialRampToValueAtTime(Math.max(20,a),s+t),l.gain.setValueAtTime(i,s),l.gain.exponentialRampToValueAtTime(1e-4,s+t),o.connect(l).connect(wn),o.start(s),o.stop(s+t+.02)}function ln(n,t,e,i=0,r=e){if(!te||!wn||!zi)return;const a=te.currentTime+i,s=te.createBufferSource();s.buffer=zi,s.loop=!0;const o=te.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(e,a),r!==e&&o.frequency.exponentialRampToValueAtTime(Math.max(40,r),a+n);const l=te.createGain();l.gain.setValueAtTime(t,a),l.gain.exponentialRampToValueAtTime(1e-4,a+n),s.connect(o).connect(l).connect(wn),s.start(a,Math.random()*.5),s.stop(a+n+.02)}function se(n,t=1){if(!(!te||te.state!=="running"))switch(n){case"golpe":ln(.06,.35,1800*t),Ht(150*t,.07,"square",.12,0,90*t);break;case"rotura":ln(.2,.5,1400,0,200),Ht(110,.14,"triangle",.25,0,50);break;case"mineral_azufre":ln(.14,.3,2400,0,500),Ht(740,.12,"triangle",.22),Ht(988,.18,"triangle",.16,.06);break;case"mineral_oro":ln(.16,.3,2800,0,500),Ht(880,.14,"triangle",.22),Ht(1320,.2,"sine",.18,.06);break;case"mineral_esmeralda":ln(.16,.3,3e3,0,600),Ht(660,.14,"sine",.22),Ht(990,.14,"sine",.2,.05),Ht(1480,.22,"sine",.16,.1);break;case"mineral_rubi":ln(.18,.35,2200,0,400),Ht(523,.18,"triangle",.24),Ht(784,.18,"triangle",.2,.07),Ht(1046,.24,"triangle",.16,.13);break;case"mineral_zafiro":ln(.2,.35,3400,0,700),[880,1109,1319,1760].forEach((e,i)=>Ht(e,.22,"sine",.18,i*.05));break;case"recoger":Ht(660*t,.09,"sine",.25,0,1180*t);break;case"mochila_llena":Ht(180,.12,"square",.14),Ht(140,.18,"square",.14,.13);break;case"venta":[523,659,784,1047].forEach((e,i)=>Ht(e,.16,"triangle",.22,i*.07));break;case"compra":Ht(440,.1,"square",.12),Ht(660,.16,"square",.12,.09);break;case"fosil":[392,494,587,784].forEach((e,i)=>Ht(e,.9,"sine",.16,i*.11)),ln(.5,.15,5e3,0,600);break;case"momia":Ht(90,.4,"sawtooth",.14,0,60),Ht(95,.4,"sawtooth",.1,.02,58);break;case"momia_muerta":ln(.5,.4,900,0,120),Ht(120,.5,"triangle",.25,0,40);break;case"golpeado":ln(.12,.5,700,0,150),Ht(70,.2,"square",.3,0,40);break;case"desmayo":Ht(420,.7,"sawtooth",.16,0,70);break;case"colapso":ln(3.6,.9,300,0,60),Ht(60,3.2,"sine",.5,0,26);break;case"latido":Ht(70,.14,"sine",.5*t,0,40),Ht(62,.14,"sine",.35*t,.16,38);break;case"ascensor":ln(.9,.25,500,0,200),Ht(110,.9,"triangle",.12,0,160);break;case"silbido":Ht(1500,.5,"sine",.14,0,2300),Ht(2300,.5,"sine",.12,.55,1700);break;case"record":[659,784,988].forEach((e,i)=>Ht(e,.14,"triangle",.18,i*.08));break;case"torogoz":Ht(1800,.08,"sine",.12,0,2600),Ht(2600,.08,"sine",.12,.1,1900),Ht(2200,.12,"sine",.1,.22,3e3);break;case"clic":Ht(520,.04,"square",.07);break;case"error":Ht(160,.12,"square",.1);break}}let Ui=null,xr=null,Mc=0,Sc=0;function Zd(){if(!te||!wn||!zi)return;Ui=te.createGain(),Ui.gain.value=0,Ui.connect(wn);for(const s of[48,50.3,71]){const o=te.createOscillator();o.type="sine",o.frequency.value=s;const l=te.createGain();l.gain.value=.05,o.connect(l).connect(Ui),o.start()}const n=te.createBufferSource();n.buffer=zi,n.loop=!0;const t=te.createBiquadFilter();t.type="lowpass",t.frequency.value=220;const e=te.createGain();e.gain.value=.18,n.connect(t).connect(e).connect(Ui),n.start(),xr=te.createGain(),xr.gain.value=0,xr.connect(wn);const i=te.createBufferSource();i.buffer=zi,i.loop=!0;const r=te.createBiquadFilter();r.type="highpass",r.frequency.value=1800;const a=te.createGain();a.gain.value=.12,i.connect(r).connect(a).connect(xr),i.start()}function Kd(n){if(!te)return;const t=n.jugador,e=Math.max(0,zt.SUELO_Y-t.pos.y),i=te.currentTime;if(Ui&&Ui.gain.setTargetAtTime(n.pantalla==="titulo"?0:Math.min(1,Math.max(0,(e-2)/8)),i,.4),xr){const r=Math.hypot(t.pos.x-de.FOGATA.x,t.pos.z-de.FOGATA.z),a=e<3?Math.max(0,1-r/26):0;xr.gain.setTargetAtTime(n.pantalla==="titulo"?0:a*.9,i,.3),a>.15&&i-Sc>.18+Math.random()*.5&&(Sc=i,ln(.03,.12*a,4e3,0,2500))}if(t.calor>ve.LATIDO_DESDE_CALOR&&n.pantalla==="jugando"){const r=1.1-(t.calor-70)/30*.55;i-Mc>r&&(Mc=i,se("latido",.7+(t.calor-70)/60))}}function Jd(n){Ct("bloque:golpeado",t=>{const i=n().mundo.vidaMax(t.x,t.y,t.z),r=i>0?1-t.restante/i:0;se("golpe",.85+r*.7)}),Ct("bloque:roto",t=>{const e=Tr(t.bloque);se(e?`mineral_${e}`:"rotura")}),Ct("mineral:recogido",()=>se("recoger",.9+Math.random()*.3)),Ct("mochila:llena",()=>se("mochila_llena")),Ct("venta:hecha",()=>{se("venta"),setTimeout(()=>se("torogoz"),450)}),Ct("mejora:comprada",()=>se("compra")),Ct("mascota:comprada",()=>{se("compra"),se("torogoz")}),Ct("fosil:hallado",()=>se("fosil")),Ct("momia:golpe",()=>se("momia")),Ct("momia:muerta",()=>se("momia_muerta")),Ct("jugador:golpeado",()=>se("golpeado")),Ct("calor:desmayo",()=>se("desmayo")),Ct("colapso:inicio",()=>se("colapso")),Ct("ascensor:viaje",()=>se("ascensor")),Ct("silbido:inicio",()=>se("silbido")),Ct("record:nuevo",()=>se("record")),Ct("chepe:venta",()=>se("compra"))}function vs(n){let t=n|0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function hh(n=Math.random){return n()*2147483647|0}function Qd(n,t,e,i){let r=Math.imul(n|0,374761393)^Math.imul(t|0,668265263)^Math.imul(e|0,2147483647)^Math.imul(i|0,1274126177);return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296}function Ls(n){return n*n*(3-2*n)}function Ec(n,t,e,i){const r=Math.floor(n),a=Math.floor(t),s=Math.floor(e),o=Ls(n-r),l=Ls(t-a),c=Ls(e-s),u=(g,m,d)=>Qd(r+g,a+m,s+d,i),h=u(0,0,0)*(1-o)+u(1,0,0)*o,f=u(0,1,0)*(1-o)+u(1,1,0)*o,p=u(0,0,1)*(1-o)+u(1,0,1)*o,_=u(0,1,1)*(1-o)+u(1,1,1)*o;return(h*(1-l)+f*l)*(1-c)+(p*(1-l)+_*l)*c}const Le=zt.ANCHO,tn=zt.LARGO,_i=zt.ALTO,mn=zt.SUELO_Y,Bi=Math.ceil(Le/zt.CHUNK),yc=Math.ceil(_i/zt.CHUNK),da=Math.ceil(tn/zt.CHUNK);function ya(n,t,e){return n+e*Le+t*Le*tn}function Ul(n){return mn-1-n}function tf(n){return n===et.tierra?fi.tierra:n===et.piedra?fi.piedra:n===et.obsidiana?fi.obsidiana:$d(n)?fi.estrato:Dl(n)?fi.fosil:Tr(n)?fi.piedra*fi.MINERAL_MULT:0}class dh{bloques=new Uint8Array(Le*tn*_i);original=new Uint8Array(Le*tn*_i);danio=new Map;cambios=new Map;sucios=new Set;fosiles=[];profundidadMina=zt.SUELO_Y;version=0;dentro(t,e,i){return t>=0&&e>=0&&i>=0&&t<Le&&e<_i&&i<tn}get(t,e,i){return e>=_i?et.aire:t<0||e<0||i<0||t>=Le||i>=tn?et.roca_madre:this.bloques[t+i*Le+e*Le*tn]}esSolido(t,e,i){return this.get(t,e,i)!==et.aire}set(t,e,i,r){if(!this.dentro(t,e,i))return;const a=ya(t,e,i);this.bloques[a]!==r&&(this.bloques[a]=r,this.danio.delete(a),this.original[a]===r?this.cambios.delete(a):this.cambios.set(a,r),this.marcarSucio(t,e,i),this.version++)}poner(t,e,i,r){this.bloques[ya(t,e,i)]=r}confirmarBase(){this.original=this.bloques.slice(),this.cambios.clear(),this.danio.clear()}marcarSucio(t,e,i){const r=zt.CHUNK,a=Math.floor(t/r),s=Math.floor(e/r),o=Math.floor(i/r);this.sucios.add(ii(a,s,o));const l=t-a*r,c=e-s*r,u=i-o*r;l===0&&a>0&&this.sucios.add(ii(a-1,s,o)),l===r-1&&a<Bi-1&&this.sucios.add(ii(a+1,s,o)),c===0&&s>0&&this.sucios.add(ii(a,s-1,o)),c===r-1&&s<yc-1&&this.sucios.add(ii(a,s+1,o)),u===0&&o>0&&this.sucios.add(ii(a,s,o-1)),u===r-1&&o<da-1&&this.sucios.add(ii(a,s,o+1))}marcarTodoSucio(){for(let t=0;t<Bi;t++)for(let e=0;e<yc;e++)for(let i=0;i<da;i++)this.sucios.add(ii(t,e,i));this.version++}vidaMax(t,e,i){const r=tf(this.get(t,e,i));return r<=0?0:r*(1+Math.max(0,Ul(e))*fi.POR_METRO)}vidaRestante(t,e,i){const r=this.vidaMax(t,e,i);return r<=0?0:Math.max(0,r-(this.danio.get(ya(t,e,i))??0))}aplicarDanio(t,e,i,r){const a=this.vidaMax(t,e,i);if(a<=0)return-1;const s=ya(t,e,i),o=(this.danio.get(s)??0)+r;return o>=a-1e-9?0:(this.danio.set(s,o),a-o)}contarSolidos(){let t=0;for(let e=0;e<this.bloques.length;e++)this.bloques[e]!==0&&t++;return t}}function ii(n,t,e){return n+e*Bi+t*Bi*da}function ef(n){const t=n%Bi,e=Math.floor(n/Bi)%da,i=Math.floor(n/(Bi*da));return{cx:t,cy:i,cz:e}}function nf(n){return Jt.PROFUNDIDAD_BASE+Jt.POR_ESTRATO*Math.min(n,Jt.MAX_ESTRATOS)}function rf(n){return(n%3+3)%3}function Ds(n){return n===et.tierra||n===et.piedra||n===et.obsidiana}function fh(n,t){const e=mn-t,i=ce.SALITA_LADO;for(let r=0;r<i;r++)for(let a=0;a<i;a++){const s=ce.SALITA_X+a,o=ce.SALITA_Z+r;for(let l=0;l<ce.ALTO_SALITA;l++)n.get(s,e+l,o)!==et.aire&&n.set(s,e+l,o,et.aire);n.get(s,e-1,o)===et.aire&&n.set(s,e-1,o,et.piedra)}return{x:ce.SALITA_X+i/2,y:e,z:ce.SALITA_Z+i/2}}function af(n){const t=de.TIENDA,e=mn;for(let a=t.z0;a<=t.z1;a++)for(let s=t.x0;s<=t.x1;s++)if(s===t.x0||s===t.x1||a===t.z0||a===t.z1)for(let l=0;l<t.altoMuro;l++)n.poner(s,e+l,a,et.adobe);for(let a=t.x0+1;a<t.x1;a++){n.poner(a,e,t.z0,et.madera);for(let s=1;s<t.altoMuro;s++)n.poner(a,e+s,t.z0,et.aire)}for(let a=2;a<=3;a++)for(let s=0;s<2;s++)n.poner(t.x0,e+s,t.z0+a,et.aire);for(let a=t.z0-1;a<=t.z1+1;a++)for(let s=t.x0-1;s<=t.x1+1;s++)n.poner(s,e+t.altoMuro,a,et.teja);for(let a=t.z0+1;a<t.z1;a++)for(let s=t.x0+1;s<t.x1;s++)n.poner(s,e-1,a,et.madera);const i=Math.floor(de.ASCENSOR.x),r=Math.floor(de.ASCENSOR.z);for(let a=-1;a<=1;a++)for(let s=-1;s<=1;s++)if(n.poner(i+s,e-1,r+a,et.madera),n.poner(i+s,e+3,r+a,et.teja),s!==0&&a!==0)for(let o=0;o<3;o++)n.poner(i+s,e+o,r+a,et.madera);for(const[a,s]of[[Jt.X0,Jt.Z0],[Jt.X0+Jt.LADO-1,Jt.Z0],[Jt.X0,Jt.Z0+Jt.LADO-1],[Jt.X0+Jt.LADO-1,Jt.Z0+Jt.LADO-1]])n.poner(a,e,s,et.madera),n.poner(a,e+1,s,et.madera)}function Nl(n,t){const e=new dh,i=vs(n),r=nf(t.length);e.profundidadMina=r;const{X0:a,Z0:s,LADO:o}=Jt,l=(m,d)=>m>=a&&m<a+o&&d>=s&&d<s+o;for(let m=0;m<mn-1;m++)for(let d=0;d<tn;d++)for(let E=0;E<Le;E++)e.poner(E,m,d,et.roca_madre);for(let m=0;m<tn;m++)for(let d=0;d<Le;d++)e.poner(d,mn-1,m,et.empedrado);for(let m=s;m<s+o;m++)for(let d=a;d<a+o;d++)for(let E=0;E<r;E++){const A=mn-1-E;let x;E===r-1?x=et.arenisca_jeroglificos:E<2?x=et.tierra:E<Ze.TIERRA_HASTA?x=i()<Ze.TIERRA_PROB_PIEDRA?et.piedra:et.tierra:E<Ze.PIEDRA_HASTA?x=et.piedra:E<Ze.OBSIDIANA_PROFUNDA_DESDE?x=i()<Ze.OBSIDIANA_PROB_MEDIA?et.obsidiana:et.piedra:x=i()<Ze.OBSIDIANA_PROB_PROFUNDA?et.obsidiana:et.piedra,e.poner(d,A,m,x)}const c=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];for(const m of Er){const d=zr[m];for(let E=Math.max(2,d.desde);E<r-2;E++){const A=mn-1-E;for(let x=s;x<s+o;x++)for(let w=a;w<a+o;w++){const T=1-qr.APAGA_FRACCION*Math.max(0,Math.min(1,(E-d.apagaDesde)/qr.APAGA_METROS));if(i()>=d.probVeta*T||!Ds(e.get(w,A,x)))continue;const C=qr.MIN+Math.floor(i()*(qr.MAX-qr.MIN+1));let D=w,y=A,S=x;for(let R=0;R<C;R++){l(D,S)&&Ds(e.get(D,y,S))&&mn-1-y>=d.desde&&e.poner(D,y,S,Yd[m]);const G=c[Math.floor(i()*6)];D+=G[0],y+=G[1],S+=G[2]}}}}const u=[],h=Ze.CUEVAS_ESCALA,f=new Float32Array(o*o*r);let p=0;const _=n^1540483477|0;for(let m=Ze.CUEVAS_DESDE;m<r-3;m++){const d=mn-1-m;for(let E=s+1;E<s+o-1;E++)for(let A=a+1;A<a+o-1;A++){const x=h*Ze.CUEVAS_ESCALA_B,w=Ze.CUEVAS_PESO_A*Ec(A*h,d*h*Ze.CUEVAS_ALARGADO,E*h,_)+Ze.CUEVAS_PESO_B*Ec(A*x,d*x,E*x,_+7);f[p]=w,u.push({i:p,v:w}),p++}}if(u.length>0){const m=Float32Array.from(u.map(A=>A.v)).sort(),d=m[Math.floor(m.length*Ze.CUEVAS_FRACCION)];let E=0;for(let A=Ze.CUEVAS_DESDE;A<r-3;A++){const x=mn-1-A;for(let w=s+1;w<s+o-1;w++)for(let T=a+1;T<a+o-1;T++)f[E++]<d&&e.poner(T,x,w,et.aire)}}const g=[];t.slice(-3).reverse().forEach((m,d)=>{const E=Jt.ESTRATO_DESDE+Jt.POR_ESTRATO*d;g.push({desde:E,hasta:E+Jt.POR_ESTRATO,color:rf(m.id)})});for(const m of g)for(let d=m.desde;d<m.hasta&&d<r-1;d++){const E=mn-1-d;for(let A=s;A<s+o;A++)for(let x=a;x<a+o;x++)Ds(e.get(x,E,A))&&e.poner(x,E,A,et.estrato_0+m.color)}if(g.length>0){const m=[...Pl];for(let d=m.length-1;d>0;d--){const E=Math.floor(i()*(d+1));[m[d],m[E]]=[m[E],m[d]]}for(const d of m.slice(0,Cn.FOSILES_POR_PARTIDA))for(let E=0;E<400;E++){const A=g[Math.floor(i()*g.length)],x=a+2+Math.floor(i()*(o-4)),w=s+2+Math.floor(i()*(o-4)),T=A.desde+Math.floor(i()*(A.hasta-A.desde)),C=mn-1-T,D=e.get(x,C,w);if(!(D<et.estrato_0||D>et.estrato_2)){e.poner(x,C,w,et.fosil_0+A.color),e.fosiles.push({id:d,x,y:C,z:w});break}}}return af(e),e.confirmarBase(),r>36&&(fh(e,30),e.confirmarBase()),e.sucios.clear(),e.marcarTodoSucio(),e}const Is=1e-6;function ph(n,t,e,i,r,a){if(t-r<zt.LIMITE_MIN||t+r>zt.LIMITE_MAX||i-r<zt.LIMITE_MIN||i+r>zt.LIMITE_MAX)return!0;const s=Math.floor(t-r),o=Math.floor(t+r-Is),l=Math.floor(e),c=Math.floor(e+a-Is),u=Math.floor(i-r),h=Math.floor(i+r-Is);for(let f=l;f<=c;f++)for(let p=u;p<=h;p++)for(let _=s;_<=o;_++)if(n.esSolido(_,f,p))return!0;return!1}function sf(n,t,e,i){return ph(n,t,e,i,be.ANCHO/2,be.ALTO)}function Us(n,t,e,i,r,a){return a===0||(t[r]+=a,!ph(n,t.x,t.y,t.z,e,i))?!1:(r==="x"?t.x=a>0?Math.floor(t.x+e)-e-1e-5:Math.floor(t.x-e)+1+e+1e-5:r==="z"?t.z=a>0?Math.floor(t.z+e)-e-1e-5:Math.floor(t.z-e)+1+e+1e-5:t.y=a>0?Math.floor(t.y+i)-i-1e-5:Math.floor(t.y)+1,!0)}function mh(n,t,e,i,r,a){const s=Us(n,t,i,r,"x",e.x*a);s&&(e.x=0);const o=Us(n,t,i,r,"z",e.z*a);o&&(e.z=0);const l=e.y<0;let c=!1;return Us(n,t,i,r,"y",e.y*a)&&(c=l,e.y=0),{suelo:c,choqueX:s,choqueZ:o}}function of(n,t,e,i){const r=e.correr?be.CORRE:be.CAMINA,a=e.dirX*r,s=e.dirZ*r,o=(t.enSuelo?be.ACEL_SUELO:be.ACEL_AIRE)*i;t.vel.x+=Math.max(-o,Math.min(o,a-t.vel.x)),t.vel.z+=Math.max(-o,Math.min(o,s-t.vel.z)),e.saltar&&t.enSuelo&&(t.vel.y=be.SALTO,t.enSuelo=!1),t.vel.y=Math.max(-32,t.vel.y-be.GRAVEDAD*i);const l=mh(n,t.pos,t.vel,be.ANCHO/2,be.ALTO,i);t.enSuelo=l.suelo}function lf(n,t){for(let e=0;e<64&&sf(n,t.pos.x,t.pos.y,t.pos.z);e++)t.pos.y+=.5}function cf(){const n=de.SPAWN;return{pos:{x:n.x,y:zt.SUELO_Y,z:n.z},vel:{x:0,y:0,z:0},guinada:n.guinada,cabeceo:0,enSuelo:!1,calor:0,desmayado:!1,silbando:!1}}function xs(n){return{x:n.pos.x,y:n.pos.y+be.OJOS,z:n.pos.z}}function Cr(n){const t=Math.cos(n.cabeceo);return{x:-Math.sin(n.guinada)*t,y:Math.sin(n.cabeceo),z:-Math.cos(n.guinada)*t}}function ds(n,t,e,i){const r=n.jugador;r.pos.x=t,r.pos.y=e,r.pos.z=i,r.vel.x=r.vel.y=r.vel.z=0,lf(n.mundo,r)}function Ol(n){const t=de.SPAWN;ds(n,t.x,zt.SUELO_Y,t.z),n.jugador.guinada=t.guinada,n.jugador.cabeceo=0}function uf(n){const t=n.records;t.bloquesTotal++,t.bloquesPartida++,t.bloquesPartida>t.mejorPartida&&(t.mejorPartida>0&&t.bloquesPartida===t.mejorPartida+1&&Wt("record:nuevo",{tipo:"bloques",valor:t.bloquesPartida}),t.mejorPartida=t.bloquesPartida)}function ki(n){return Math.max(0,zt.SUELO_Y-n.jugador.pos.y)}function hf(n){const t=n.records,e=Math.floor(ki(n));if(e>t.profundidadPartida&&(t.profundidadPartida=e),e>t.profundidadMax){const i=t.profundidadMax;t.profundidadMax=e,i>0&&Math.floor(e/10)>Math.floor(i/10)&&Wt("record:nuevo",{tipo:"profundidad",valor:e})}for(let i=ce.CADA;i<=t.profundidadPartida;i+=ce.CADA)n.paradas.includes(i)||n.paradas.push(i)}function Ac(n){return[...n.paradas].sort((t,e)=>t-e)}function _h(){return{x:ce.SALITA_X+de.VENDEDOR.dx,z:ce.SALITA_Z+de.VENDEDOR.dz}}function df(n){const{x:t,z:e}=n.jugador.pos,i=ce.SALITA_LADO;if(t<ce.SALITA_X-ce.MARGEN||t>ce.SALITA_X+i+ce.MARGEN||e<ce.SALITA_Z-ce.MARGEN||e>ce.SALITA_Z+i+ce.MARGEN)return null;const r=ki(n),a=Math.round(r/ce.CADA)*ce.CADA;return a<ce.CADA||Math.abs(r-a)>ce.TOLERANCIA_Y?null:n.paradas.includes(a)?a:null}function bc(n,t,e,i){return Math.hypot(n.jugador.pos.x-t,n.jugador.pos.z-e)<=i}function gh(n){const t=n.jugador;if(ki(n)<zt.SUPERFICIE_ASCENSOR){const o=de.TIENDA;if(bc(n,o.mostrador.x,o.mostrador.z,o.RADIO))return{tipo:"tienda",tienda:"tere",texto:`E: tienda de la ${nn.NOMBRE_TERE}`};if(bc(n,de.ASCENSOR.x,de.ASCENSOR.z,de.ASCENSOR.RADIO)){const l=Ac(n);return l.length===0?null:{tipo:"ascensor",destino:l[l.length-1],texto:`E: bajar en el ascensor a ${l[l.length-1]} m`}}return null}const i=df(n);if(i===null)return null;const r=_h();if(i===nn.ABAJO_PROFUNDIDAD&&Math.hypot(t.pos.x-r.x,t.pos.z-r.z)<=de.VENDEDOR.RADIO)return{tipo:"tienda",tienda:"abajo",texto:`E: vender a ${nn.NOMBRE_ABAJO} (paga x${nn.ABAJO_MULT})`};const a=Ac(n).filter(o=>o<i),s=a.length?a[a.length-1]:0;return{tipo:"ascensor",destino:s,texto:s===0?"E: subir a la superficie":`E: subir a ${s} m`}}function vh(n,t){if(t!==0&&!n.paradas.includes(t))return!1;if(t===0)ds(n,de.ASCENSOR.x,zt.SUELO_Y,de.ASCENSOR.z+2);else{const e=fh(n.mundo,t);ds(n,e.x-1,e.y,e.z-1)}return n.jugador.silbando=!1,n.silbido.reloj=0,n.momias=[],Wt("ascensor:viaje",{parada:t}),!0}function xh(){return{filo:0,mango:0,alcance:0,suerte:0,temple:0}}function Ms(n,t){return Math.round(Vn[t].base*Math.pow(qd,n.mejoras[t]))}function Fl(n,t){return n.mejoras[t]>=Vn[t].max}function Mh(n,t){return!Fl(n,t)&&n.colones>=Ms(n,t)}function Sh(n,t){return Mh(n,t)?(n.colones-=Ms(n,t),n.mejoras[t]++,Wt("mejora:comprada",{id:t,nivel:n.mejoras[t]}),!0):!1}function ff(n){return Rl.DANIO_BASE*(1+Vn.filo.porNivel*n.mejoras.filo)}function pf(n){return Rl.GOLPES_POR_SEG*(1+Vn.mango.porNivel*n.mejoras.mango)}function Eh(n){return Rl.ALCANCE_BASE+Vn.alcance.porNivel*n.mejoras.alcance}function mf(n){return Vn.suerte.porNivel*n.mejoras.suerte}function _f(n){return Math.max(0,1-Vn.temple.porNivel*n.mejoras.temple)}function Tc(n,t){const e=Vn[n].porNivel*t,i=Math.round(e*100);switch(n){case"filo":return`+${i} % de daño`;case"mango":return`+${i} % de golpes por segundo`;case"alcance":return`+${e.toLocaleString("es-SV")} m de alcance`;case"suerte":return`${i} % de botín doble`;case"temple":return`-${i} % de calor`}}function qe(n,t){const e=n.pantalla;e!==t&&(n.pantalla=t,t!=="jugando"&&(n.picado.picando=!1,n.picado.reloj=0,n.picado.fase=0),Wt("pantalla:cambio",{de:e,a:t}))}const Pn=Un.COLUMNAS,Mi=Un.FILAS;function gf(n){const t=n.length,e=n[0].length,i=[];for(let r=0;r<e;r++){const a=[];for(let s=t-1;s>=0;s--)a.push(n[s][r]);i.push(a)}return i}const Cc=new Map;function Ss(n,t){const e=n+t;let i=Cc.get(e);if(!i){i=zr[n].forma;for(let r=0;r<t;r++)i=gf(i);Cc.set(e,i)}return i}function Ro(n){let t=0;for(const e of zr[n].forma)for(const i of e)t+=i;return t}function wo(n,t,e,i,r,a){const s=Ss(t,r);for(let o=0;o<s.length;o++)for(let l=0;l<s[o].length;l++)s[o][l]&&(n[(i+o)*Pn+e+l]=a)}function Es(n,t=-1){const e=new Int32Array(Pn*Mi);for(const i of n.mochila.piezas)i.uid!==t&&wo(e,i.mineral,i.x,i.y,i.rot,i.uid);return e}function ga(n,t,e,i,r){const a=Ss(t,r);if(e<0||i<0||i+a.length>Mi||e+a[0].length>Pn)return!1;for(let s=0;s<a.length;s++)for(let o=0;o<a[s].length;o++)if(a[s][o]&&n[(i+s)*Pn+e+o]!==0)return!1;return!0}function vf(n,t){return ga(Es(n,t.uid),t.mineral,t.x,t.y,t.rot)}function yh(n,t,e){const i=Es(n);for(let r=0;r<Mi;r++)for(let a=0;a<Pn;a++)for(let s=0;s<4;s++)if(ga(i,t,a,r,s))return n.mochila.piezas.push({uid:n.uid++,mineral:t,x:a,y:r,rot:s,valor:e}),Wt("mochila:cambio",{}),!0;return!1}function zl(n,t,e,i,r){const a=n.mochila.piezas.find(o=>o.uid===t);if(!a)return!1;const s=(r%4+4)%4;return ga(Es(n,t),a.mineral,e,i,s)?(a.x=e,a.y=i,a.rot=s,Wt("mochila:cambio",{}),!0):!1}function xf(n,t){const e=n.mochila.piezas.find(o=>o.uid===t);if(!e)return!1;const i=(e.rot+1)%4,r=Es(n,t);let a=null,s=1/0;for(let o=0;o<Mi;o++)for(let l=0;l<Pn;l++){if(!ga(r,e.mineral,l,o,i))continue;const c=Math.abs(l-e.x)+Math.abs(o-e.y);c<s&&(s=c,a={x:l,y:o})}return a?zl(n,t,a.x,a.y,i):!1}function Mf(n,t){const e=n.mochila.piezas,i=e.findIndex(r=>r.uid===t);return i<0?!1:(e.splice(i,1),Wt("mochila:cambio",{}),!0)}function Sf(n){const t=[...n.mochila.piezas].sort((s,o)=>Ro(o.mineral)-Ro(s.mineral));if(t.length===0)return!1;const e=new Int32Array(Pn*Mi),i=[];let r=0;const a=s=>{if(s===t.length)return!0;const o=t[s].mineral;for(let l=0;l<Mi;l++)for(let c=0;c<Pn;c++)for(let u=0;u<4;u++){if(++r>Un.INTENTOS_ACOMODO)return!1;if(ga(e,o,c,l,u)){if(wo(e,o,c,l,u,1),i[s]={x:c,y:l,rot:u},a(s+1))return!0;wo(e,o,c,l,u,0)}}return!1};return a(0)?(t.forEach((s,o)=>{s.x=i[o].x,s.y=i[o].y,s.rot=i[o].rot}),Wt("mochila:cambio",{}),!0):!1}function Ah(n){let t=0;for(const e of n.mochila.piezas)t+=Ro(e.mineral);return t}function bh(n){return Ah(n)===Pn*Mi}function Rc(n){const t=new Array(Pn*Mi).fill(null);for(const e of n.mochila.piezas){const i=Ss(e.mineral,e.rot);for(let r=0;r<i.length;r++)for(let a=0;a<i[r].length;a++)i[r][a]&&(t[(e.y+r)*Pn+e.x+a]=e.mineral)}return t}function Th(){return{azufre:0,oro:0,esmeralda:0,rubi:0,zafiro:0}}function Ef(n){return n==="abajo"?nn.ABAJO_MULT:1}function Ch(n,t){let e=0,i=0;for(const c of n.mochila.piezas)e+=c.valor,i+=c.valor*n.saturacion[t][c.mineral];const r=Ef(t),a=bh(n),s=n.mascota.comprada,o=yi(n),l=Math.round((e-i)*r*(1+(a?Un.BONUS_LLENA:0))*(1+(s?We.BONUS_VENTA:0))*o);return{piezas:n.mochila.piezas.length,base:Math.round(e),perdidaSaturacion:Math.round(i),tiendaMult:r,bonusLlena:a,bonusMascota:s,multiplicador:o,total:l}}function Rh(n,t){const e=Ch(n,t);if(e.piezas===0)return 0;const i=n.saturacion[t];for(const r of n.mochila.piezas)i[r.mineral]=Math.min(nn.SATURACION_MAX,i[r.mineral]+nn.SATURACION_POR_UNIDAD);return n.mochila.piezas=[],n.colones+=e.total,n.tutorial.vendio=!0,Wt("mochila:cambio",{}),Wt("venta:hecha",{total:e.total,tiendaId:t,bonusLlena:e.bonusLlena,bonusMascota:e.bonusMascota}),e.total}function wc(n,t){if(n.relojSaturacion+=t,!(n.relojSaturacion<nn.RECUPERACION_CADA_SEG)){n.relojSaturacion-=nn.RECUPERACION_CADA_SEG;for(const e of Object.keys(n.saturacion))for(const i of Er)n.saturacion[e][i]=Math.max(0,n.saturacion[e][i]-nn.RECUPERACION)}}function yi(n){return 1+Cn.MULT_POR_COLAPSO*n.colapsos}function wh(n){return Math.min(Cn.REQUERIDO_BASE+Cn.EXTRA_POR_COLAPSO*n.colapsos,Cn.REQUERIDO_MAX)}function Bl(n){return n.records.profundidadPartida>=wh(n)}function Ph(n,t=!1){if(!Bl(n)||n.pantalla==="colapso")return null;const e={id:n.colapsos+1,profundidadMax:n.records.profundidadPartida,bloquesPicados:n.records.bloquesPartida,fecha:new Date().toISOString()};return n.colapso={reloj:0,estrato:e},Wt("colapso:inicio",{estrato:e}),qe(n,"colapso"),t&&(Lh(n),qe(n,"jugando")),e}function Lh(n){const t=n.colapso.estrato;t&&(n.estratos.push(t),n.estratos.length>Jt.MAX_ESTRATOS&&n.estratos.shift(),n.colapsos++,n.colones=0,n.mejoras=xh(),n.mochila.piezas=[],n.sueltos=[],n.momias=[],n.fosilesActivos=[],n.chepe={activo:!1,x:0,y:0,z:0,reloj:0},n.saturacion=Object.fromEntries(Ll.map(e=>[e,Th()])),n.paradas=[],n.records.bloquesPartida=0,n.records.profundidadPartida=0,n.semilla=hh(),n.mundo=Nl(n.semilla,n.estratos),n.fosilesMapa=n.mundo.fosiles.map(e=>({...e})),n.jugador.calor=0,n.jugador.desmayado=!1,n.jugador.silbando=!1,n.picado.objetivo=null,n.estratoActual=-1,n.ascensorSel=0,n.colapso={reloj:0,estrato:null},Ol(n),Wt("mundo:regenerado",{}),Wt("mochila:cambio",{}),Wt("colapso:fin",{multiplicador:yi(n)}))}function va(n,t){return n.fosilesActivos.includes(t)}function yf(n,t,e,i,r){va(n,t)||(n.fosilesActivos.push(t),t==="don_chepe"&&(n.chepe={activo:!0,x:e+.5,y:i,z:r+.5,reloj:Rn.CHEPE_SEG})),n.fosilesMapa=n.fosilesMapa.filter(a=>!(a.x===e&&a.y===i&&a.z===r)),Wt("fosil:hallado",{id:t})}function Af(n){const t=n.chepe,e=va(n,"rompefilas")?Rn.CHEPE_LADO_ROMPEFILAS:Rn.CHEPE_LADO,i=n.mundo,r=Math.floor(t.x)-(e===3?1:0),a=Math.floor(t.z)-(e===3?1:0),s=Math.floor(t.y)-1;let o=0;for(let l=0;l<e;l++)for(let c=0;c<e;c++)if(sh(i.get(r+c,s,a+l))){t.activo=!1;return}for(let l=0;l<e;l++)for(let c=0;c<e;c++){const u=r+c,h=a+l,f=i.get(u,s,h);if(f===et.aire)continue;const p=Tr(f);if(i.set(u,s,h,et.aire),n.records.bloquesTotal++,n.records.bloquesPartida++,p){const _=Math.round(zr[p].valor*(1+Ul(s)*Cl));o+=Math.round(_*Rn.CHEPE_VENDE*yi(n))}Wt("bloque:roto",{x:u,y:s,z:h,bloque:f})}t.y=s,o>0&&(n.colones+=o,Wt("chepe:venta",{total:o}))}function bf(n,t){const e=n.chepe;if(e.activo&&(e.reloj-=t,e.reloj<=0)){if(e.reloj+=Rn.CHEPE_SEG,e.y-1<=1||e.y>zt.ALTO){e.activo=!1;return}Af(n)}}function Tf(n){return va(n,"brasa")&&n.jugador.calor>Rn.BRASA_CALOR?Rn.BRASA_MULT:1}function Vl(n,t){return Math.round(zr[n].valor*(1+Math.max(0,t)*Cl))}function Po(n,t,e,i,r,a){const s=n.uid++;return n.sueltos.push({uid:s,mineral:t,x:e,y:i,z:r,valor:a}),Wt("suelto:creado",{uid:s}),s}function Cf(n,t){const e=n.jugador,i=va(n,"iman"),r=e.pos.x,a=e.pos.y+be.PECHO,s=e.pos.z;for(let o=n.sueltos.length-1;o>=0;o--){const l=n.sueltos[o];let c=r-l.x,u=a-l.y,h=s-l.z,f=Math.hypot(c,u,h);if(i&&f<Rn.IMAN_RADIO&&f>.01){const p=Math.min(f,Rn.IMAN_VELOCIDAD*t);l.x+=c/f*p,l.y+=u/f*p,l.z+=h/f*p,c=r-l.x,u=a-l.y,h=s-l.z,f=Math.hypot(c,u,h)}f>be.RADIO_RECOGER||(yh(n,l.mineral,l.valor)?(n.sueltos.splice(o,1),Wt("mineral:recogido",{mineral:l.mineral,valor:l.valor})):n.tiempo-n.picado.ultimoAvisoLlena>=Dn.SEG_ENTRE_AVISOS_LLENA&&(n.picado.ultimoAvisoLlena=n.tiempo,Wt("mochila:llena",{})))}}function Dh(){return{moverX:0,moverZ:0,mirarDX:0,mirarDY:0,picar:!1,correr:!1,saltar:!1,interactuar:!1,subir:!1}}function Rf(n){const t=n.jugador,e=n.mochila.piezas,i=Math.floor(e.length*Zn.PIERDE_AL_DESMAYO);for(let r=0;r<i;r++)e.splice(Math.floor(Math.random()*e.length),1);t.calor=0,t.desmayado=!0,t.silbando=!1,n.momias=[],n.desmayoReloj=Zn.SEG_DESMAYADO,Ol(n),Wt("mochila:cambio",{}),Wt("calor:desmayo",{perdidas:i})}let Pc=-1;function wf(n,t){const e=n.jugador;if(e.desmayado)return;const i=ki(n);i<zt.SUPERFICIE_CALOR?e.calor-=Zn.ENFRIA_SUPERFICIE*t:i<Zn.DESDE?e.calor-=Zn.ENFRIA_ARRIBA*t:e.calor+=(i-Zn.DESDE)*Zn.GANANCIA_POR_METRO*_f(n)*t,e.calor=Math.min(100,Math.max(0,e.calor));const r=Math.round(e.calor);r!==Pc&&(Pc=r,Wt("calor:cambio",{valor:r}))}function Pf(n,t){n.jugador.calor=Math.min(100,n.jugador.calor+t)}const Lf=[{x:1,y:0,z:0},{x:-1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:-1,z:0},{x:0,y:0,z:1},{x:0,y:0,z:-1}];function Gl(n,t,e,i){const r=Math.hypot(t.x,t.y,t.z);if(r===0)return;const a=t.x/r,s=t.y/r,o=t.z/r;let l=Math.floor(n.x),c=Math.floor(n.y),u=Math.floor(n.z);const h=a>0?1:-1,f=s>0?1:-1,p=o>0?1:-1,_=a!==0?Math.abs(1/a):1/0,g=s!==0?Math.abs(1/s):1/0,m=o!==0?Math.abs(1/o):1/0;let d=a!==0?(a>0?l+1-n.x:n.x-l)*_:1/0,E=s!==0?(s>0?c+1-n.y:n.y-c)*g:1/0,A=o!==0?(o>0?u+1-n.z:n.z-u)*m:1/0,x=-1,w=0;for(let T=0;T<512;T++)if(i(l,c,u,x,w)||(d<=E&&d<=A?(l+=h,w=d,d+=_,x=h>0?1:0):E<=A?(c+=f,w=E,E+=g,x=f>0?3:2):(u+=p,w=A,A+=m,x=p>0?5:4),w>e))return}function Ih(n,t,e,i){let r=null;return Gl(t,e,i,(a,s,o,l,c)=>n.dentro(a,s,o)?n.esSolido(a,s,o)?(r={x:a,y:s,z:o,cara:l,distancia:c},!0):!1:!(s>=_i&&a>=0&&o>=0&&a<Le&&o<tn)),r}function Uh(n,t,e){const i=e.x-t.x,r=e.y-t.y,a=e.z-t.z,s=Math.hypot(i,r,a);if(s<1e-6)return!0;const o=Math.floor(e.x),l=Math.floor(e.y),c=Math.floor(e.z);let u=!0;return Gl(t,{x:i,y:r,z:a},s,(h,f,p)=>h===o&&f===l&&p===c?!0:n.esSolido(h,f,p)?(u=!1,!0):!1),u}const Df=kt.ANCHO/2;function If(n){return{x:n.x,y:n.y+kt.ALTO*.6,z:n.z}}function Uf(n){const t=n.mundo,e=n.jugador,i=xs(e);for(let r=0;r<60;r++){const a=Jt.X0+1+Math.floor(Math.random()*(Jt.LADO-2)),s=Jt.Z0+1+Math.floor(Math.random()*(Jt.LADO-2)),o=kt.DESDE+Math.random()*Math.max(1,t.profundidadMina-4-kt.DESDE),l=zt.SUELO_Y-Math.floor(o);if(t.get(a,l,s)!==0||t.get(a,l+1,s)!==0||t.get(a,l-1,s)===0)continue;const c={x:a+.5,y:l+.01,z:s+.5};if(!(Math.hypot(c.x-e.pos.x,c.y-e.pos.y,c.z-e.pos.z)<kt.DIST_APARICION)&&!Uh(t,i,{x:c.x,y:c.y+1,z:c.z}))return c}return null}function Nh(n,t,e,i){const r={uid:n.uid++,x:t,y:e,z:i,vx:0,vz:0,vy:0,vida:kt.VIDA_GOLPES,reloj:kt.ESPERA,rumbo:Math.random()*Math.PI*2,cambioRumbo:kt.GIRO_CAMBIO,dano:0,persigue:!1};return n.momias.push(r),r}function Nf(n,t){const e=n.jugador,i=ki(n);if(n.relojMomias-=t,i>=kt.DESDE&&n.momias.length<kt.MAX&&n.relojMomias<=0){n.relojMomias=kt.SEG_ENTRE_APARICIONES;const a=Uf(n);a&&Nh(n,a.x,a.y,a.z)}const r=xs(e);for(let a=n.momias.length-1;a>=0;a--){const s=n.momias[a],o=e.pos.x-s.x,l=e.pos.z-s.z,c=Math.hypot(o,l);if(c>60||i<kt.DESDE-8&&c>25){n.momias.splice(a,1);continue}s.reloj=Math.max(0,s.reloj-t),s.dano=Math.max(0,s.dano-t);const u=c<kt.VE&&Math.abs(e.pos.y-s.y)<6&&Uh(n.mundo,If(s),{x:r.x,y:r.y,z:r.z});s.persigue=u;let h=0,f=0;u&&c>kt.DIST_MIN_PERSEGUIR?(h=o/c*kt.VELOCIDAD,f=l/c*kt.VELOCIDAD):(s.cambioRumbo-=t,s.cambioRumbo<=0&&(s.cambioRumbo=kt.GIRO_CAMBIO*(.6+Math.random()),s.rumbo=Math.random()*Math.PI*2),h=Math.cos(s.rumbo)*kt.VELOCIDAD_PASEO,f=Math.sin(s.rumbo)*kt.VELOCIDAD_PASEO),s.vx+=(h-s.vx)*Math.min(1,8*t),s.vz+=(f-s.vz)*Math.min(1,8*t),s.vy=Math.max(-32,s.vy-be.GRAVEDAD*t);const p={x:s.x,y:s.y,z:s.z},_={x:s.vx,y:s.vy,z:s.vz},g=mh(n.mundo,p,_,Df,kt.ALTO,t);if((g.choqueX||g.choqueZ)&&g.suelo&&(_.y=7),!u&&(g.choqueX||g.choqueZ)&&(s.rumbo+=Math.PI*(.5+Math.random())),s.x=p.x,s.y=p.y,s.z=p.z,s.vx=_.x,s.vy=_.y,s.vz=_.z,c<kt.REACH&&Math.abs(e.pos.y-s.y)<kt.REACH_Y&&s.reloj<=0&&!e.desmayado){s.reloj=kt.ESPERA,Pf(n,kt.CALOR_GOLPE);const m=c>.01?1/c:0;e.vel.x+=o*m*kt.EMPUJE,e.vel.z+=l*m*kt.EMPUJE,e.vel.y=Math.max(e.vel.y,3),e.enSuelo=!1,e.silbando&&(e.silbando=!1,n.silbido.reloj=0,Wt("silbido:cancelado",{})),Wt("jugador:golpeado",{})}}}function Of(n,t,e){const i=n.momias.findIndex(h=>h.uid===t);if(i<0)return!1;const r=n.momias[i],a=n.jugador;r.vida-=e,r.dano=kt.SEG_DANO;const s=r.x-a.pos.x,o=r.z-a.pos.z,l=Math.hypot(s,o)||1;if(r.vx=s/l*kt.RETROCESO,r.vz=o/l*kt.RETROCESO,Wt("momia:golpe",{uid:t}),r.vida>0)return!1;const c=Math.max(0,zt.SUELO_Y-r.y),u=Math.round(kt.COLONES*(1+c*Cl));return n.colones+=u,n.momias.splice(i,1),Math.random()<kt.PROB_ZAFIRO&&Po(n,"zafiro",r.x,r.y+.5,r.z,Vl("zafiro",c)),Wt("momia:muerta",{uid:t,colones:u}),!0}const Ff=.3,Ns=.5,zf=.68;function Bf(n,t,e,i){const r=n.mundo,a=r.get(t,e,i);if(a===et.aire||sh(a))return;const s=Ul(e);let o;Dl(a)&&(o=(n.fosilesMapa.find(c=>c.x===t&&c.y===e&&c.z===i)??r.fosiles.find(c=>c.x===t&&c.y===e&&c.z===i))?.id),r.set(t,e,i,et.aire),uf(n);const l=Tr(a);if(l){const c=Vl(l,s);Po(n,l,t+.5,e+.5,i+.5,c),Math.random()<mf(n)&&Po(n,l,t+.5,e+.3,i+.5,c)}Wt("bloque:roto",{x:t,y:e,z:i,bloque:a,fosilId:o}),o&&yf(n,o,t,e,i)}function Lc(n,t,e,i,r){const a=n.mundo.aplicarDanio(t,e,i,r);return a===0&&Bf(n,t,e,i),a}function Vf(n,t,e,i){let r=0,a=1/0;for(const s of["x","y","z"]){if(Math.abs(t[s])<1e-9){if(n[s]<e[s]||n[s]>i[s])return 1/0;continue}let o=(e[s]-n[s])/t[s],l=(i[s]-n[s])/t[s];if(o>l&&([o,l]=[l,o]),r=Math.max(r,o),a=Math.min(a,l),r>a)return 1/0}return r}function Gf(n){const t=n.jugador,e=xs(t),i=Cr(t),r=Eh(n),a=Ih(n.mundo,e,i,r),s=ff(n)*Tf(n);n.tutorial.pico=!0;let o=-1,l=1/0;for(const p of n.momias){const _=Vf(e,i,{x:p.x-kt.HITBOX/2,y:p.y,z:p.z-kt.HITBOX/2},{x:p.x+kt.HITBOX/2,y:p.y+kt.ALTO,z:p.z+kt.HITBOX/2});_<=r&&_<l&&(l=_,o=p.uid)}if(o>=0&&l<(a?a.distancia+.5:1/0)){Of(n,o,s);return}if(!a)return;const{x:c,y:u,z:h}=a,f=Lc(n,c,u,h,s);if(!(f<0)&&(Wt("bloque:golpeado",{x:c,y:u,z:h,restante:f}),va(n,"rompefilas"))){let p=0;Gl(e,i,r+Rn.ROMPEFILAS_EXTRA+1,(_,g,m,d,E)=>E<=a.distancia+1e-6?!1:n.mundo.dentro(_,g,m)?n.mundo.esSolido(_,g,m)?(Lc(n,_,g,m,s),++p>=Rn.ROMPEFILAS_EXTRA):!1:!0)}}function Hf(n,t,e){const i=n.picado,r=n.jugador;i.objetivo=Ih(n.mundo,xs(r),Cr(r),Eh(n)),i.golpesSeg=pf(n);const a=1/i.golpesSeg;if(i.picando=t,!t&&i.reloj<=0){i.fase=0;return}const s=i.reloj/a;i.reloj+=e;const o=i.reloj/a;if(s<Ns&&o>=Ns&&Gf(n),o>=1)if(t)i.reloj-=a;else{i.reloj=0,i.fase=0;return}const l=i.reloj/a;i.fase=l<Ff?1:l<Ns?2:l<zf?3:4}function fa(n,t={}){const e=n??hh(),i=t.generar===!1?new dh:Nl(e,[]);return{semilla:e,mundo:i,jugador:cf(),mochila:{piezas:[]},sueltos:[],momias:[],chepe:{activo:!1,x:0,y:0,z:0,reloj:0},colones:0,mejoras:xh(),mascota:{comprada:!1},fosilesActivos:[],fosilesMapa:i.fosiles.map(r=>({...r})),saturacion:Object.fromEntries(Ll.map(r=>[r,Th()])),paradas:[],colapsos:0,estratos:[],records:{bloquesTotal:0,bloquesPartida:0,mejorPartida:0,profundidadPartida:0,profundidadMax:0},ajustes:{...rh},tutorial:{movio:!1,pico:!1,vendio:!1},pantalla:"titulo",tiendaActual:"tere",tiempo:0,uid:1,picado:{reloj:0,picando:!1,fase:0,objetivo:null,golpesSeg:4,ultimoAvisoLlena:-99},silbido:{reloj:0},colapso:{reloj:0,estrato:null},desmayoReloj:0,relojSaturacion:0,relojMomias:3,estratoActual:-1,ascensorSel:0,ultimoAvisoFondo:-99}}function Oh(n){const t=fa(void 0),e=n.ajustes,i=n.pantalla;Object.assign(n,t,{ajustes:e,pantalla:i}),Wt("mundo:regenerado",{}),Wt("mochila:cambio",{})}function kf(n){const{x:t,z:e}=n.jugador.pos,i=t>=Jt.X0&&t<Jt.X0+Jt.LADO&&e>=Jt.Z0&&e<Jt.Z0+Jt.LADO,r=ki(n);let a=-1;if(i&&n.estratos.length>0){const s=Math.floor((r-Jt.ESTRATO_DESDE)/Jt.POR_ESTRATO),o=n.estratos.slice(-3);r>=Jt.ESTRATO_DESDE&&s>=0&&s<o.length&&(a=o[o.length-1-s].id)}a!==n.estratoActual&&(n.estratoActual=a,a>=0&&Wt("estrato:entrada",{estratoId:a}))}function Lo(n,t,e){switch(n.tiempo+=e,n.pantalla){case"desmayo":n.desmayoReloj-=e,n.desmayoReloj<=0&&(n.jugador.desmayado=!1,qe(n,"jugando"));return;case"colapso":n.colapso.reloj+=e,n.colapso.reloj>=Cn.SEG&&(Lh(n),qe(n,"jugando"));return;case"jugando":break;default:wc(n,e);return}const i=n.jugador;i.guinada-=t.mirarDX*be.RAD_POR_PIXEL*n.ajustes.sensibilidad;const r=n.ajustes.invertirY?1:-1;i.cabeceo=Math.max(-1.5533,Math.min(be.CABECEO_MAX,i.cabeceo+r*t.mirarDY*be.RAD_POR_PIXEL*n.ajustes.sensibilidad));let a=t.moverX,s=t.moverZ;const o=Math.hypot(a,s);o>1&&(a/=o,s/=o),o>.01&&(n.tutorial.movio=!0);const l=Math.sin(i.guinada),c=Math.cos(i.guinada),u=-l*s+c*a,h=-c*s-l*a;if(of(n.mundo,i,{dirX:u,dirZ:h,correr:t.correr,saltar:t.saltar},e),hf(n),kf(n),Hf(n,t.picar,e),Cf(n,e),wf(n,e),i.calor>=100&&!i.desmayado){Rf(n),qe(n,"desmayo");return}if(Nf(n,e),bf(n,e),wc(n,e),t.subir&&!i.silbando&&ki(n)>=zt.SUPERFICIE_ASCENSOR?(i.silbando=!0,n.silbido.reloj=ih.SEG,Wt("silbido:inicio",{})):i.silbando&&(n.silbido.reloj-=e,n.silbido.reloj<=0&&(i.silbando=!1,Ol(n),n.momias=[],Wt("ascensor:viaje",{parada:0}))),t.interactuar){const f=gh(n);f?.tipo==="tienda"?(n.tiendaActual=f.tienda,qe(n,"tienda")):f?.tipo==="ascensor"&&vh(n,f.destino)}}function Wf(n){const t=n.jugador;return{version:xi.VERSION,fecha:new Date().toISOString(),semilla:n.semilla,cambios:[...n.mundo.cambios.entries()],jugador:{x:t.pos.x,y:t.pos.y,z:t.pos.z,guinada:t.guinada,cabeceo:t.cabeceo,calor:t.calor},mochila:n.mochila.piezas.map(e=>({...e})),sueltos:n.sueltos.map(e=>({...e})),chepe:{...n.chepe},colones:n.colones,mejoras:{...n.mejoras},mascota:{...n.mascota},fosilesActivos:[...n.fosilesActivos],saturacion:JSON.parse(JSON.stringify(n.saturacion)),paradas:[...n.paradas],colapsos:n.colapsos,estratos:n.estratos.map(e=>({...e})),records:{...n.records},ajustes:{...n.ajustes},tutorial:{...n.tutorial},uid:n.uid}}const ee=n=>typeof n=="number"&&Number.isFinite(n),an=n=>typeof n=="object"&&n!==null&&!Array.isArray(n);function Xf(){return{...rh}}function qf(n){if(!an(n))return null;const t=n.version;if(t!==0&&t!==xi.VERSION||!ee(n.semilla)||!Array.isArray(n.cambios)||!an(n.jugador)||!Array.isArray(n.mochila))return null;const e=n.jugador;if(![e.x,e.y,e.z].every(ee)||!ee(n.colones)||!an(n.mejoras)||!an(n.records)||!Array.isArray(n.estratos))return null;for(const p of n.cambios)if(!Array.isArray(p)||p.length!==2||!ee(p[0])||!ee(p[1]))return null;for(const p of n.mochila)if(!an(p)||!Er.includes(p.mineral)||!ee(p.x)||!ee(p.y)||!ee(p.valor))return null;const i=Yf(),r={...i.mejoras};for(const p of wl)ee(n.mejoras[p])&&(r[p]=n.mejoras[p]);const a=n.records,s={...i.records};for(const p of Object.keys(s))ee(a[p])&&(s[p]=a[p]);const o=n.estratos.filter(an).map(p=>({id:ee(p.id)?p.id:1,profundidadMax:ee(p.profundidadMax)?p.profundidadMax:0,bloquesPicados:ee(p.bloquesPicados)?p.bloquesPicados:0,fecha:typeof p.fecha=="string"?p.fecha:""})),l=i.saturacion;if(an(n.saturacion))for(const p of Ll){const _=n.saturacion[p];if(an(_))for(const g of Er)ee(_[g])&&(l[p][g]=_[g])}const c=an(n.ajustes)?n.ajustes:{},u={...Xf(),...c},h=an(n.chepe)?n.chepe:{},f=an(n.tutorial)?n.tutorial:{};return{version:xi.VERSION,fecha:typeof n.fecha=="string"?n.fecha:"",semilla:n.semilla,cambios:n.cambios,jugador:{x:e.x,y:e.y,z:e.z,guinada:ee(e.guinada)?e.guinada:0,cabeceo:ee(e.cabeceo)?e.cabeceo:0,calor:ee(e.calor)?e.calor:0},mochila:n.mochila.map((p,_)=>({uid:ee(p.uid)?p.uid:_+1,mineral:p.mineral,x:p.x,y:p.y,rot:ee(p.rot)?(p.rot%4+4)%4:0,valor:p.valor})),sueltos:Array.isArray(n.sueltos)?n.sueltos.filter(p=>an(p)&&Er.includes(p.mineral)&&ee(p.x)&&ee(p.y)&&ee(p.z)&&ee(p.valor)).map((p,_)=>({uid:ee(p.uid)?p.uid:1e5+_,mineral:p.mineral,x:p.x,y:p.y,z:p.z,valor:p.valor})):[],chepe:{activo:h.activo===!0,x:ee(h.x)?h.x:0,y:ee(h.y)?h.y:0,z:ee(h.z)?h.z:0,reloj:ee(h.reloj)?h.reloj:0},colones:n.colones,mejoras:r,mascota:{comprada:an(n.mascota)&&n.mascota.comprada===!0},fosilesActivos:Array.isArray(n.fosilesActivos)?n.fosilesActivos.filter(p=>Pl.includes(p)):[],saturacion:l,paradas:Array.isArray(n.paradas)?n.paradas.filter(ee):[],colapsos:ee(n.colapsos)?n.colapsos:o.length,estratos:o,records:s,ajustes:u,tutorial:{movio:f.movio===!0,pico:f.pico===!0,vendio:f.vendio===!0},uid:ee(n.uid)?n.uid:1e3}}function Yf(){return fa(1,{generar:!1})}function $f(n){const t=qf(n);if(!t)return null;const e=fa(t.semilla,{generar:!1});e.estratos=t.estratos,e.colapsos=t.colapsos,e.mundo=Nl(t.semilla,t.estratos);for(const[r,a]of t.cambios){if(r<0||r>=e.mundo.bloques.length||a<0||a>et.teja)return null;const s=56,o=56;e.mundo.set(r%s,Math.floor(r/(s*o)),Math.floor(r/s)%o,a)}e.mundo.danio.clear(),e.fosilesMapa=e.mundo.fosiles.filter(r=>Dl(e.mundo.get(r.x,r.y,r.z))).map(r=>({...r}));const i=e.jugador;return i.pos={x:t.jugador.x,y:t.jugador.y,z:t.jugador.z},i.guinada=t.jugador.guinada,i.cabeceo=t.jugador.cabeceo,i.calor=t.jugador.calor,e.mochila.piezas=t.mochila,e.sueltos=t.sueltos,e.chepe=t.chepe,e.colones=t.colones,e.mejoras=t.mejoras,e.mascota=t.mascota,e.fosilesActivos=t.fosilesActivos,e.saturacion=t.saturacion,e.paradas=t.paradas,e.records=t.records,e.ajustes=t.ajustes,e.tutorial=t.tutorial,e.uid=Math.max(t.uid,...t.mochila.map(r=>r.uid+1),...t.sueltos.map(r=>r.uid+1),1),e}const jf={[et.aire]:"Aire",[et.tierra]:"Tierra",[et.piedra]:"Piedra",[et.obsidiana]:"Obsidiana",[et.roca_madre]:"Roca madre",[et.arenisca_jeroglificos]:"Muro de jeroglíficos",[et.piedra_azufre]:"Veta de azufre",[et.piedra_oro]:"Veta de oro",[et.piedra_esmeralda]:"Veta de esmeralda",[et.piedra_rubi]:"Veta de rubí",[et.piedra_zafiro]:"Veta de zafiro",[et.estrato_0]:"Estrato violeta",[et.estrato_1]:"Estrato teal",[et.estrato_2]:"Estrato dorado",[et.fosil_0]:"Fósil",[et.fosil_1]:"Fósil",[et.fosil_2]:"Fósil",[et.empedrado]:"Empedrado",[et.adobe]:"Adobe",[et.madera]:"Madera",[et.teja]:"Teja"},en={pistaMoverse:"WASD para moverte",pistaPicar:"Mantené el clic para picar",pistaVender:"Vendé en la tienda con E",mochilaLlena:"Mochila llena: T para subir o Tab para acomodar",algoDuerme:"Algo duerme debajo…",record:"¡Récord!",guardadoDanado:"El guardado estaba dañado. Empezás con una mina nueva.",silbidoCancelado:"Te golpearon, se cortó el silbido.",desmayo:"Te desmayaste por el calor. Perdiste la mitad de lo que llevabas.",despertas:"Despertás en la superficie.",tiraste:"Tiraste una pieza.",sinAcomodo:"No encontré un acomodo mejor."};function Hl(n){return zr[n].nombre}function Zf(n){switch(n){case"filo":return"Cada golpe rompe más.";case"mango":return"Golpeás más veces por segundo.";case"alcance":return"Llegás más lejos con el pico.";case"suerte":return"A veces el bloque suelta dos minerales.";case"temple":return"El calor te pega más despacio."}}const Do={rompefilas:{nombre:"Pico Rompefilas",detalle:"Cada golpe también daña los 2 bloques que siguen en línea."},don_chepe:{nombre:"Don Chepe",detalle:"Lo rescataste. Pica solo una columna de 2×2 hacia abajo, a un bloque cada 1.2 s, y vende al 50 %."},iman:{nombre:"Imán de talpetate",detalle:"Los minerales sueltos a menos de 5 m vuelan hacia vos, aunque haya paredes."},brasa:{nombre:"Brasa antigua",detalle:"Con el calor arriba de 60 % pegás el doble."}},Kf=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];function Jf(n){const t=new Date(n);return Number.isNaN(t.getTime())?"una fecha perdida":`${t.getDate()} de ${Kf[t.getMonth()]}`}function Qf(n){return`Estrato ${n.id}: tu partida del ${Jf(n.fecha)}, ${n.profundidadMax} m, ${n.bloquesPicados} bloques`}function tp(n){return`Estrato ${n.id} enterrado: ${n.profundidadMax} m, ${n.bloquesPicados} bloques`}function ep(){return`${nn.NOMBRE_ABAJO}: ${nn.FRASE_ABAJO}`}function np(){return`Te sigue y sube ${Math.round(We.BONUS_VENTA*100)} % cada venta. Sobrevive al colapso.`}function Ee(n){return"₡"+Math.round(n).toLocaleString("es-SV")}class ip{constructor(t){this.o=t,document.addEventListener("pointerlockchange",()=>{this.bloqueado?t.alGanar():t.alPerder()}),document.addEventListener("pointerlockerror",()=>t.alRechazar())}ultimoPedido=0;get bloqueado(){return this.o.sinBloqueo?!1:document.pointerLockElement===this.o.elemento}get activo(){return!this.o.sinBloqueo}async pedir(){if(this.o.sinBloqueo)return this.o.alGanar(),!0;if(this.bloqueado)return!0;this.ultimoPedido=performance.now();const t=this.o.elemento.requestPointerLock.bind(this.o.elemento);try{return await t({unadjustedMovement:!0}),!0}catch{try{return await t(),!0}catch{return this.o.alRechazar(),!1}}}soltar(){!this.o.sinBloqueo&&document.pointerLockElement&&document.exitPointerLock()}get msDesdePedido(){return performance.now()-this.ultimoPedido}}const Dc=200;class rp{constructor(t,e){this.lienzo=t,this.sinBloqueo=e,window.addEventListener("keydown",i=>this.alBajar(i)),window.addEventListener("keyup",i=>this.teclas.delete(i.code)),window.addEventListener("blur",()=>this.soltarTodo()),window.addEventListener("mousemove",i=>{if(!this.mouseActivo()||!this.sinBloqueo&&document.pointerLockElement!==this.lienzo)return;const r=i.movementX,a=i.movementY;Math.abs(r)>Dc||Math.abs(a)>Dc||(this.dx+=r,this.dy+=a)}),t.addEventListener("mousedown",i=>{i.button===0&&this.mouseActivo()&&(this.picar=!0)}),window.addEventListener("mouseup",i=>{i.button===0&&(this.picar=!1)}),window.addEventListener("contextmenu",i=>{i.target===t&&i.preventDefault()})}teclas=new Set;dx=0;dy=0;picar=!1;interactuar=!1;subir=!1;mouseActivo=()=>!0;globales={};jugando=()=>!0;tabEsMochila=()=>!0;alBajar(t){if(t.code==="Tab"&&this.tabEsMochila()){t.preventDefault(),t.repeat||this.globales.tab?.();return}if(t.code==="Escape"){t.repeat||this.globales.escape?.();return}if(t.code==="F3"){t.preventDefault(),t.repeat||this.globales.diagnostico?.();return}if(t.code==="KeyM"&&!t.repeat){this.globales.silenciar?.();return}t.code==="KeyQ"&&!t.repeat&&this.globales.acomodar?.(),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.code)&&this.jugando()&&t.preventDefault(),!t.repeat&&(this.teclas.add(t.code),this.jugando()&&(t.code==="KeyE"&&(this.interactuar=!0),t.code==="KeyT"&&(this.subir=!0)))}leer(){const t=Dh();if(this.jugando()){const e=this.teclas;t.moverZ=(e.has("KeyW")||e.has("ArrowUp")?1:0)-(e.has("KeyS")||e.has("ArrowDown")?1:0),t.moverX=(e.has("KeyD")||e.has("ArrowRight")?1:0)-(e.has("KeyA")||e.has("ArrowLeft")?1:0),t.correr=e.has("ShiftLeft")||e.has("ShiftRight"),t.saltar=e.has("Space"),t.picar=this.picar,t.mirarDX=this.dx,t.mirarDY=this.dy,t.interactuar=this.interactuar,t.subir=this.subir}return this.dx=this.dy=0,this.interactuar=this.subir=!1,t}soltarTodo(){this.teclas.clear(),this.picar=!1,this.dx=this.dy=0,this.interactuar=this.subir=!1}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const kl="170",ap=0,Ic=1,sp=2,Fh=1,op=2,$n=3,Si=0,Ye=1,An=2,Fn=0,Vi=1,Rr=2,Uc=3,Nc=4,lp=5,Ni=100,cp=101,up=102,hp=103,dp=104,fp=200,pp=201,mp=202,_p=203,Io=204,Uo=205,gp=206,vp=207,xp=208,Mp=209,Sp=210,Ep=211,yp=212,Ap=213,bp=214,No=0,Oo=1,Fo=2,wr=3,zo=4,Bo=5,Vo=6,Go=7,Wl=0,Tp=1,Cp=2,vi=0,zh=1,Bh=2,Vh=3,Gh=4,Rp=5,Hh=6,kh=7,Wh=300,Pr=301,Lr=302,Ho=303,ko=304,ys=306,Wo=1e3,gi=1001,Xo=1002,Te=1003,Xh=1004,aa=1005,Nn=1006,Os=1007,Fi=1008,ti=1009,qh=1010,Yh=1011,pa=1012,Xl=1013,Gi=1014,On=1015,zn=1016,ql=1017,Yl=1018,Dr=1020,$h=35902,jh=1021,Zh=1022,Tn=1023,Kh=1024,Jh=1025,yr=1026,Ir=1027,$l=1028,jl=1029,Qh=1030,Zl=1031,Kl=1033,rs=33776,as=33777,ss=33778,os=33779,qo=35840,Yo=35841,$o=35842,jo=35843,Zo=36196,Ko=37492,Jo=37496,Qo=37808,tl=37809,el=37810,nl=37811,il=37812,rl=37813,al=37814,sl=37815,ol=37816,ll=37817,cl=37818,ul=37819,hl=37820,dl=37821,ls=36492,fl=36494,pl=36495,td=36283,ml=36284,_l=36285,gl=36286,wp=3200,ed=3201,nd=0,Pp=1,mi="",cn="srgb",Br="srgb-linear",As="linear",oe="srgb",Zi=7680,Oc=519,Lp=512,Dp=513,Ip=514,id=515,Up=516,Np=517,Op=518,Fp=519,vl=35044,Fc="300 es",Kn=2e3,fs=2001;class Vr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const a=r.indexOf(e);a!==-1&&r.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,t);t.target=null}}}const ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zc=1234567;const Ar=Math.PI/180,ma=180/Math.PI;function Jn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ze[n&255]+ze[n>>8&255]+ze[n>>16&255]+ze[n>>24&255]+"-"+ze[t&255]+ze[t>>8&255]+"-"+ze[t>>16&15|64]+ze[t>>24&255]+"-"+ze[e&63|128]+ze[e>>8&255]+"-"+ze[e>>16&255]+ze[e>>24&255]+ze[i&255]+ze[i>>8&255]+ze[i>>16&255]+ze[i>>24&255]).toLowerCase()}function Xe(n,t,e){return Math.max(t,Math.min(e,n))}function Jl(n,t){return(n%t+t)%t}function zp(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function Bp(n,t,e){return n!==t?(e-n)/(t-n):0}function la(n,t,e){return(1-e)*n+e*t}function Vp(n,t,e,i){return la(n,t,1-Math.exp(-e*i))}function Gp(n,t=1){return t-Math.abs(Jl(n,t*2)-t)}function Hp(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function kp(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Wp(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Xp(n,t){return n+Math.random()*(t-n)}function qp(n){return n*(.5-Math.random())}function Yp(n){n!==void 0&&(zc=n);let t=zc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function $p(n){return n*Ar}function jp(n){return n*ma}function Zp(n){return(n&n-1)===0&&n!==0}function Kp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Jp(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Qp(n,t,e,i,r){const a=Math.cos,s=Math.sin,o=a(e/2),l=s(e/2),c=a((t+i)/2),u=s((t+i)/2),h=a((t-i)/2),f=s((t-i)/2),p=a((i-t)/2),_=s((i-t)/2);switch(r){case"XYX":n.set(o*u,l*h,l*f,o*c);break;case"YZY":n.set(l*f,o*u,l*h,o*c);break;case"ZXZ":n.set(l*h,l*f,o*u,o*c);break;case"XZX":n.set(o*u,l*_,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*_,o*c);break;case"ZYZ":n.set(l*_,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function bn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function le(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Bc={DEG2RAD:Ar,RAD2DEG:ma,generateUUID:Jn,clamp:Xe,euclideanModulo:Jl,mapLinear:zp,inverseLerp:Bp,lerp:la,damp:Vp,pingpong:Gp,smoothstep:Hp,smootherstep:kp,randInt:Wp,randFloat:Xp,randFloatSpread:qp,seededRandom:Yp,degToRad:$p,radToDeg:jp,isPowerOfTwo:Zp,ceilPowerOfTwo:Kp,floorPowerOfTwo:Jp,setQuaternionFromProperEuler:Qp,normalize:le,denormalize:bn};class bt{constructor(t=0,e=0){bt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Xe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),a=this.x-t.x,s=this.y-t.y;return this.x=a*i-s*r+t.x,this.y=a*r+s*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(t,e,i,r,a,s,o,l,c){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,a,s,o,l,c)}set(t,e,i,r,a,s,o,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=a,u[5]=l,u[6]=i,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,a=this.elements,s=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],_=i[8],g=r[0],m=r[3],d=r[6],E=r[1],A=r[4],x=r[7],w=r[2],T=r[5],C=r[8];return a[0]=s*g+o*E+l*w,a[3]=s*m+o*A+l*T,a[6]=s*d+o*x+l*C,a[1]=c*g+u*E+h*w,a[4]=c*m+u*A+h*T,a[7]=c*d+u*x+h*C,a[2]=f*g+p*E+_*w,a[5]=f*m+p*A+_*T,a[8]=f*d+p*x+_*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],s=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*s*u-e*o*c-i*a*u+i*o*l+r*a*c-r*s*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],s=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=u*s-o*c,f=o*l-u*a,p=c*a-s*l,_=e*h+i*f+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=h*g,t[1]=(r*c-u*i)*g,t[2]=(o*i-r*s)*g,t[3]=f*g,t[4]=(u*e-r*l)*g,t[5]=(r*a-o*e)*g,t[6]=p*g,t[7]=(i*l-c*e)*g,t[8]=(s*e-i*a)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,a,s,o){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*s+c*o)+s+t,-r*c,r*l,-r*(-c*s+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Fs.makeScale(t,e)),this}rotate(t){return this.premultiply(Fs.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fs=new Ft;function rd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function _a(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function tm(){const n=_a("canvas");return n.style.display="block",n}const Vc={};function sa(n){n in Vc||(Vc[n]=!0,console.warn(n))}function em(n,t,e){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:i()}}setTimeout(a,e)})}function nm(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function im(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const $t={enabled:!0,workingColorSpace:Br,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(n.r=Qn(n.r),n.g=Qn(n.g),n.b=Qn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(n.r=br(n.r),n.g=br(n.g),n.b=br(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===mi?As:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Qn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function br(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Gc=[.64,.33,.3,.6,.15,.06],Hc=[.2126,.7152,.0722],kc=[.3127,.329],Wc=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xc=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$t.define({[Br]:{primaries:Gc,whitePoint:kc,transfer:As,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:Hc,workingColorSpaceConfig:{unpackColorSpace:cn},outputColorSpaceConfig:{drawingBufferColorSpace:cn}},[cn]:{primaries:Gc,whitePoint:kc,transfer:oe,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:Hc,outputColorSpaceConfig:{drawingBufferColorSpace:cn}}});let Ki;class rm{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ki===void 0&&(Ki=_a("canvas")),Ki.width=t.width,Ki.height=t.height;const i=Ki.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Ki}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=_a("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=Qn(a[s]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Qn(e[i]/255)*255):e[i]=Qn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let am=0;class ad{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=Jn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(zs(r[s].image)):a.push(zs(r[s]))}else a=zs(r);i.url=a}return e||(t.images[this.uuid]=i),i}}function zs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?rm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sm=0;class Ne extends Vr{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,i=gi,r=gi,a=Nn,s=Fi,o=Tn,l=ti,c=Ne.DEFAULT_ANISOTROPY,u=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=Jn(),this.name="",this.source=new ad(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Wh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wo:t.x=t.x-Math.floor(t.x);break;case gi:t.x=t.x<0?0:1;break;case Xo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wo:t.y=t.y-Math.floor(t.y);break;case gi:t.y=t.y<0?0:1;break;case Xo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=Wh;Ne.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,i=0,r=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,a=this.w,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*e+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*e+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*e+s[7]*i+s[11]*r+s[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,a;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],_=l[9],g=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const A=(c+1)/2,x=(p+1)/2,w=(d+1)/2,T=(u+f)/4,C=(h+g)/4,D=(_+m)/4;return A>x&&A>w?A<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(A),r=T/i,a=C/i):x>w?x<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(x),i=T/r,a=D/r):w<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(w),i=C/a,r=D/a),this.set(i,r,a,e),this}let E=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(m-_)/E,this.y=(h-g)/E,this.z=(f-u)/E,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class om extends Vr{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new Ne(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ad(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gn extends om{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class sd extends Ne{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Te,this.minFilter=Te,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class lm extends Ne{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Te,this.minFilter=Te,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,a,s,o){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=a[s+0],p=a[s+1],_=a[s+2],g=a[s+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=_,t[e+3]=g;return}if(h!==g||l!==f||c!==p||u!==_){let m=1-o;const d=l*f+c*p+u*_+h*g,E=d>=0?1:-1,A=1-d*d;if(A>Number.EPSILON){const w=Math.sqrt(A),T=Math.atan2(w,d*E);m=Math.sin(m*T)/w,o=Math.sin(o*T)/w}const x=o*E;if(l=l*m+f*x,c=c*m+p*x,u=u*m+_*x,h=h*m+g*x,m===1-o){const w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,a,s){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=a[s],f=a[s+1],p=a[s+2],_=a[s+3];return t[e]=o*_+u*h+l*p-c*f,t[e+1]=l*_+u*f+c*h-o*p,t[e+2]=c*_+u*p+o*f-l*h,t[e+3]=u*_-o*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,a=t._z,s=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),h=o(a/2),f=l(i/2),p=l(r/2),_=l(a/2);switch(s){case"XYZ":this._x=f*u*h+c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h-f*p*_;break;case"YXZ":this._x=f*u*h+c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h+f*p*_;break;case"ZXY":this._x=f*u*h-c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h-f*p*_;break;case"ZYX":this._x=f*u*h-c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h+f*p*_;break;case"YZX":this._x=f*u*h+c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h-f*p*_;break;case"XZY":this._x=f*u*h-c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],a=e[8],s=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(a-c)*p,this._z=(s-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(a+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(a-c)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(s-r)/p,this._x=(a+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xe(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,a=t._z,s=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+s*o+r*c-a*l,this._y=r*u+s*l+a*o-i*c,this._z=a*u+s*c+i*l-r*o,this._w=s*u-i*o-r*l-a*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,a=this._z,s=this._w;let o=s*t._w+i*t._x+r*t._y+a*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=s,this._x=i,this._y=r,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*s+e*this._w,this._x=p*i+e*this._x,this._y=p*r+e*this._y,this._z=p*a+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=s*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=a*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,i=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[3]*i+a[6]*r,this.y=a[1]*e+a[4]*i+a[7]*r,this.z=a[2]*e+a[5]*i+a[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,a=t.elements,s=1/(a[3]*e+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*e+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*e+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*e+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,a=t.x,s=t.y,o=t.z,l=t.w,c=2*(s*r-o*i),u=2*(o*e-a*r),h=2*(a*i-s*e);return this.x=e+l*c+s*h-o*u,this.y=i+l*u+o*c-a*h,this.z=r+l*h+a*u-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r,this.y=a[1]*e+a[5]*i+a[9]*r,this.z=a[2]*e+a[6]*i+a[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,a=t.z,s=e.x,o=e.y,l=e.z;return this.x=r*l-a*o,this.y=a*s-i*l,this.z=i*o-r*s,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Bs.copy(this).projectOnVector(t),this.sub(Bs)}reflect(t){return this.sub(Bs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Xe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Bs=new P,qc=new Gr;class Wi{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const a=i.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)t.isMesh===!0?t.getVertexPosition(s,Sn):Sn.fromBufferAttribute(a,s),Sn.applyMatrix4(t.matrixWorld),this.expandByPoint(Sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Aa.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Aa.copy(i.boundingBox)),Aa.applyMatrix4(t.matrixWorld),this.union(Aa)}const r=t.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Sn),Sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Yr),ba.subVectors(this.max,Yr),Ji.subVectors(t.a,Yr),Qi.subVectors(t.b,Yr),tr.subVectors(t.c,Yr),ri.subVectors(Qi,Ji),ai.subVectors(tr,Qi),Ti.subVectors(Ji,tr);let e=[0,-ri.z,ri.y,0,-ai.z,ai.y,0,-Ti.z,Ti.y,ri.z,0,-ri.x,ai.z,0,-ai.x,Ti.z,0,-Ti.x,-ri.y,ri.x,0,-ai.y,ai.x,0,-Ti.y,Ti.x,0];return!Vs(e,Ji,Qi,tr,ba)||(e=[1,0,0,0,1,0,0,0,1],!Vs(e,Ji,Qi,tr,ba))?!1:(Ta.crossVectors(ri,ai),e=[Ta.x,Ta.y,Ta.z],Vs(e,Ji,Qi,tr,ba))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const kn=[new P,new P,new P,new P,new P,new P,new P,new P],Sn=new P,Aa=new Wi,Ji=new P,Qi=new P,tr=new P,ri=new P,ai=new P,Ti=new P,Yr=new P,ba=new P,Ta=new P,Ci=new P;function Vs(n,t,e,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){Ci.fromArray(n,a);const o=r.x*Math.abs(Ci.x)+r.y*Math.abs(Ci.y)+r.z*Math.abs(Ci.z),l=t.dot(Ci),c=e.dot(Ci),u=i.dot(Ci);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const cm=new Wi,$r=new P,Gs=new P;class Xi{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):cm.setFromPoints(t).getCenter(i);let r=0;for(let a=0,s=t.length;a<s;a++)r=Math.max(r,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$r.subVectors(t,this.center);const e=$r.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector($r,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gs.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($r.copy(t.center).add(Gs)),this.expandByPoint($r.copy(t.center).sub(Gs))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Wn=new P,Hs=new P,Ca=new P,si=new P,ks=new P,Ra=new P,Ws=new P;class Ql{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Wn.copy(this.origin).addScaledVector(this.direction,e),Wn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Hs.copy(t).add(e).multiplyScalar(.5),Ca.copy(e).sub(t).normalize(),si.copy(this.origin).sub(Hs);const a=t.distanceTo(e)*.5,s=-this.direction.dot(Ca),o=si.dot(this.direction),l=-si.dot(Ca),c=si.lengthSq(),u=Math.abs(1-s*s);let h,f,p,_;if(u>0)if(h=s*l-o,f=s*o-l,_=a*u,h>=0)if(f>=-_)if(f<=_){const g=1/u;h*=g,f*=g,p=h*(h+s*f+2*o)+f*(s*h+f+2*l)+c}else f=a,h=Math.max(0,-(s*f+o)),p=-h*h+f*(f+2*l)+c;else f=-a,h=Math.max(0,-(s*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-s*a+o)),f=h>0?-a:Math.min(Math.max(-a,-l),a),p=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-a,-l),a),p=f*(f+2*l)+c):(h=Math.max(0,-(s*a+o)),f=h>0?a:Math.min(Math.max(-a,-l),a),p=-h*h+f*(f+2*l)+c);else f=s>0?-a:a,h=Math.max(0,-(s*f+o)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Hs).addScaledVector(Ca,f),p}intersectSphere(t,e){Wn.subVectors(t.center,this.origin);const i=Wn.dot(this.direction),r=Wn.dot(Wn)-i*i,a=t.radius*t.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=i-s,l=i+s;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,a,s,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),u>=0?(a=(t.min.y-f.y)*u,s=(t.max.y-f.y)*u):(a=(t.max.y-f.y)*u,s=(t.min.y-f.y)*u),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),h>=0?(o=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,Wn)!==null}intersectTriangle(t,e,i,r,a){ks.subVectors(e,t),Ra.subVectors(i,t),Ws.crossVectors(ks,Ra);let s=this.direction.dot(Ws),o;if(s>0){if(r)return null;o=1}else if(s<0)o=-1,s=-s;else return null;si.subVectors(this.origin,t);const l=o*this.direction.dot(Ra.crossVectors(si,Ra));if(l<0)return null;const c=o*this.direction.dot(ks.cross(si));if(c<0||l+c>s)return null;const u=-o*si.dot(Ws);return u<0?null:this.at(u/s,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class re{constructor(t,e,i,r,a,s,o,l,c,u,h,f,p,_,g,m){re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,a,s,o,l,c,u,h,f,p,_,g,m)}set(t,e,i,r,a,s,o,l,c,u,h,f,p,_,g,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=r,d[1]=a,d[5]=s,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=_,d[11]=g,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new re().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/er.setFromMatrixColumn(t,0).length(),a=1/er.setFromMatrixColumn(t,1).length(),s=1/er.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*a,e[5]=i[5]*a,e[6]=i[6]*a,e[7]=0,e[8]=i[8]*s,e[9]=i[9]*s,e[10]=i[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,a=t.z,s=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(a),h=Math.sin(a);if(t.order==="XYZ"){const f=s*u,p=s*h,_=o*u,g=o*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+_*c,e[5]=f-g*c,e[9]=-o*l,e[2]=g-f*c,e[6]=_+p*c,e[10]=s*l}else if(t.order==="YXZ"){const f=l*u,p=l*h,_=c*u,g=c*h;e[0]=f+g*o,e[4]=_*o-p,e[8]=s*c,e[1]=s*h,e[5]=s*u,e[9]=-o,e[2]=p*o-_,e[6]=g+f*o,e[10]=s*l}else if(t.order==="ZXY"){const f=l*u,p=l*h,_=c*u,g=c*h;e[0]=f-g*o,e[4]=-s*h,e[8]=_+p*o,e[1]=p+_*o,e[5]=s*u,e[9]=g-f*o,e[2]=-s*c,e[6]=o,e[10]=s*l}else if(t.order==="ZYX"){const f=s*u,p=s*h,_=o*u,g=o*h;e[0]=l*u,e[4]=_*c-p,e[8]=f*c+g,e[1]=l*h,e[5]=g*c+f,e[9]=p*c-_,e[2]=-c,e[6]=o*l,e[10]=s*l}else if(t.order==="YZX"){const f=s*l,p=s*c,_=o*l,g=o*c;e[0]=l*u,e[4]=g-f*h,e[8]=_*h+p,e[1]=h,e[5]=s*u,e[9]=-o*u,e[2]=-c*u,e[6]=p*h+_,e[10]=f-g*h}else if(t.order==="XZY"){const f=s*l,p=s*c,_=o*l,g=o*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+g,e[5]=s*u,e[9]=p*h-_,e[2]=_*h-p,e[6]=o*u,e[10]=g*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(um,t,hm)}lookAt(t,e,i){const r=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),oi.crossVectors(i,sn),oi.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),oi.crossVectors(i,sn)),oi.normalize(),wa.crossVectors(sn,oi),r[0]=oi.x,r[4]=wa.x,r[8]=sn.x,r[1]=oi.y,r[5]=wa.y,r[9]=sn.y,r[2]=oi.z,r[6]=wa.z,r[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,a=this.elements,s=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],_=i[2],g=i[6],m=i[10],d=i[14],E=i[3],A=i[7],x=i[11],w=i[15],T=r[0],C=r[4],D=r[8],y=r[12],S=r[1],R=r[5],G=r[9],B=r[13],$=r[2],j=r[6],k=r[10],Z=r[14],V=r[3],rt=r[7],ht=r[11],_t=r[15];return a[0]=s*T+o*S+l*$+c*V,a[4]=s*C+o*R+l*j+c*rt,a[8]=s*D+o*G+l*k+c*ht,a[12]=s*y+o*B+l*Z+c*_t,a[1]=u*T+h*S+f*$+p*V,a[5]=u*C+h*R+f*j+p*rt,a[9]=u*D+h*G+f*k+p*ht,a[13]=u*y+h*B+f*Z+p*_t,a[2]=_*T+g*S+m*$+d*V,a[6]=_*C+g*R+m*j+d*rt,a[10]=_*D+g*G+m*k+d*ht,a[14]=_*y+g*B+m*Z+d*_t,a[3]=E*T+A*S+x*$+w*V,a[7]=E*C+A*R+x*j+w*rt,a[11]=E*D+A*G+x*k+w*ht,a[15]=E*y+A*B+x*Z+w*_t,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],a=t[12],s=t[1],o=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],_=t[3],g=t[7],m=t[11],d=t[15];return _*(+a*l*h-r*c*h-a*o*f+i*c*f+r*o*p-i*l*p)+g*(+e*l*p-e*c*f+a*s*f-r*s*p+r*c*u-a*l*u)+m*(+e*c*h-e*o*p-a*s*h+i*s*p+a*o*u-i*c*u)+d*(-r*o*u-e*l*h+e*o*f+r*s*h-i*s*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],s=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],_=t[12],g=t[13],m=t[14],d=t[15],E=h*m*c-g*f*c+g*l*p-o*m*p-h*l*d+o*f*d,A=_*f*c-u*m*c-_*l*p+s*m*p+u*l*d-s*f*d,x=u*g*c-_*h*c+_*o*p-s*g*p-u*o*d+s*h*d,w=_*h*l-u*g*l-_*o*f+s*g*f+u*o*m-s*h*m,T=e*E+i*A+r*x+a*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return t[0]=E*C,t[1]=(g*f*a-h*m*a-g*r*p+i*m*p+h*r*d-i*f*d)*C,t[2]=(o*m*a-g*l*a+g*r*c-i*m*c-o*r*d+i*l*d)*C,t[3]=(h*l*a-o*f*a-h*r*c+i*f*c+o*r*p-i*l*p)*C,t[4]=A*C,t[5]=(u*m*a-_*f*a+_*r*p-e*m*p-u*r*d+e*f*d)*C,t[6]=(_*l*a-s*m*a-_*r*c+e*m*c+s*r*d-e*l*d)*C,t[7]=(s*f*a-u*l*a+u*r*c-e*f*c-s*r*p+e*l*p)*C,t[8]=x*C,t[9]=(_*h*a-u*g*a-_*i*p+e*g*p+u*i*d-e*h*d)*C,t[10]=(s*g*a-_*o*a+_*i*c-e*g*c-s*i*d+e*o*d)*C,t[11]=(u*o*a-s*h*a-u*i*c+e*h*c+s*i*p-e*o*p)*C,t[12]=w*C,t[13]=(u*g*r-_*h*r+_*i*f-e*g*f-u*i*m+e*h*m)*C,t[14]=(_*o*r-s*g*r-_*i*l+e*g*l+s*i*m-e*o*m)*C,t[15]=(s*h*r-u*o*r+u*i*l-e*h*l-s*i*f+e*o*f)*C,this}scale(t){const e=this.elements,i=t.x,r=t.y,a=t.z;return e[0]*=i,e[4]*=r,e[8]*=a,e[1]*=i,e[5]*=r,e[9]*=a,e[2]*=i,e[6]*=r,e[10]*=a,e[3]*=i,e[7]*=r,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),a=1-i,s=t.x,o=t.y,l=t.z,c=a*s,u=a*o;return this.set(c*s+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*s,0,c*l-r*o,u*l+r*s,a*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,a,s){return this.set(1,i,a,0,t,1,s,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,a=e._x,s=e._y,o=e._z,l=e._w,c=a+a,u=s+s,h=o+o,f=a*c,p=a*u,_=a*h,g=s*u,m=s*h,d=o*h,E=l*c,A=l*u,x=l*h,w=i.x,T=i.y,C=i.z;return r[0]=(1-(g+d))*w,r[1]=(p+x)*w,r[2]=(_-A)*w,r[3]=0,r[4]=(p-x)*T,r[5]=(1-(f+d))*T,r[6]=(m+E)*T,r[7]=0,r[8]=(_+A)*C,r[9]=(m-E)*C,r[10]=(1-(f+g))*C,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let a=er.set(r[0],r[1],r[2]).length();const s=er.set(r[4],r[5],r[6]).length(),o=er.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),t.x=r[12],t.y=r[13],t.z=r[14],En.copy(this);const c=1/a,u=1/s,h=1/o;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=u,En.elements[5]*=u,En.elements[6]*=u,En.elements[8]*=h,En.elements[9]*=h,En.elements[10]*=h,e.setFromRotationMatrix(En),i.x=a,i.y=s,i.z=o,this}makePerspective(t,e,i,r,a,s,o=Kn){const l=this.elements,c=2*a/(e-t),u=2*a/(i-r),h=(e+t)/(e-t),f=(i+r)/(i-r);let p,_;if(o===Kn)p=-(s+a)/(s-a),_=-2*s*a/(s-a);else if(o===fs)p=-s/(s-a),_=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,a,s,o=Kn){const l=this.elements,c=1/(e-t),u=1/(i-r),h=1/(s-a),f=(e+t)*c,p=(i+r)*u;let _,g;if(o===Kn)_=(s+a)*h,g=-2*h;else if(o===fs)_=a*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const er=new P,En=new re,um=new P(0,0,0),hm=new P(1,1,1),oi=new P,wa=new P,sn=new P,Yc=new re,$c=new Gr;class vn{constructor(t=0,e=0,i=0,r=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,a=r[0],s=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Xe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Xe(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Yc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $c.setFromEuler(this),this.setFromQuaternion($c,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class od{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let dm=0;const jc=new P,nr=new Gr,Xn=new re,Pa=new P,jr=new P,fm=new P,pm=new Gr,Zc=new P(1,0,0),Kc=new P(0,1,0),Jc=new P(0,0,1),Qc={type:"added"},mm={type:"removed"},ir={type:"childadded",child:null},Xs={type:"childremoved",child:null};class Ce extends Vr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=Jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new P,e=new vn,i=new Gr,r=new P(1,1,1);function a(){i.setFromEuler(e,!1)}function s(){e.setFromQuaternion(i,void 0,!1)}e._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new re},normalMatrix:{value:new Ft}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new od,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return nr.setFromAxisAngle(t,e),this.quaternion.multiply(nr),this}rotateOnWorldAxis(t,e){return nr.setFromAxisAngle(t,e),this.quaternion.premultiply(nr),this}rotateX(t){return this.rotateOnAxis(Zc,t)}rotateY(t){return this.rotateOnAxis(Kc,t)}rotateZ(t){return this.rotateOnAxis(Jc,t)}translateOnAxis(t,e){return jc.copy(t).applyQuaternion(this.quaternion),this.position.add(jc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zc,t)}translateY(t){return this.translateOnAxis(Kc,t)}translateZ(t){return this.translateOnAxis(Jc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Pa.copy(t):Pa.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),jr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(jr,Pa,this.up):Xn.lookAt(Pa,jr,this.up),this.quaternion.setFromRotationMatrix(Xn),r&&(Xn.extractRotation(r.matrixWorld),nr.setFromRotationMatrix(Xn),this.quaternion.premultiply(nr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qc),ir.child=t,this.dispatchEvent(ir),ir.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(mm),Xs.child=t,this.dispatchEvent(Xs),Xs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qc),ir.child=t,this.dispatchEvent(ir),ir.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(jr,t,fm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(jr,pm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];a(t.shapes,h)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));r.material=o}else r.material=a(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(a(t.animations,l))}}if(e){const o=s(t.geometries),l=s(t.materials),c=s(t.textures),u=s(t.images),h=s(t.shapes),f=s(t.skeletons),p=s(t.animations),_=s(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}Ce.DEFAULT_UP=new P(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yn=new P,qn=new P,qs=new P,Yn=new P,rr=new P,ar=new P,tu=new P,Ys=new P,$s=new P,js=new P,Zs=new he,Ks=new he,Js=new he;class hn{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),yn.subVectors(t,e),r.cross(yn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(t,e,i,r,a){yn.subVectors(r,e),qn.subVectors(i,e),qs.subVectors(t,e);const s=yn.dot(yn),o=yn.dot(qn),l=yn.dot(qs),c=qn.dot(qn),u=qn.dot(qs),h=s*c-o*o;if(h===0)return a.set(0,0,0),null;const f=1/h,p=(c*l-o*u)*f,_=(s*u-o*l)*f;return a.set(1-p-_,_,p)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,i,r,a,s,o,l){return this.getBarycoord(t,e,i,r,Yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Yn.x),l.addScaledVector(s,Yn.y),l.addScaledVector(o,Yn.z),l)}static getInterpolatedAttribute(t,e,i,r,a,s){return Zs.setScalar(0),Ks.setScalar(0),Js.setScalar(0),Zs.fromBufferAttribute(t,e),Ks.fromBufferAttribute(t,i),Js.fromBufferAttribute(t,r),s.setScalar(0),s.addScaledVector(Zs,a.x),s.addScaledVector(Ks,a.y),s.addScaledVector(Js,a.z),s}static isFrontFacing(t,e,i,r){return yn.subVectors(i,e),qn.subVectors(t,e),yn.cross(qn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),yn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,a){return hn.getInterpolation(t,this.a,this.b,this.c,e,i,r,a)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,a=this.c;let s,o;rr.subVectors(r,i),ar.subVectors(a,i),Ys.subVectors(t,i);const l=rr.dot(Ys),c=ar.dot(Ys);if(l<=0&&c<=0)return e.copy(i);$s.subVectors(t,r);const u=rr.dot($s),h=ar.dot($s);if(u>=0&&h<=u)return e.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return s=l/(l-u),e.copy(i).addScaledVector(rr,s);js.subVectors(t,a);const p=rr.dot(js),_=ar.dot(js);if(_>=0&&p<=_)return e.copy(a);const g=p*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(i).addScaledVector(ar,o);const m=u*_-p*h;if(m<=0&&h-u>=0&&p-_>=0)return tu.subVectors(a,r),o=(h-u)/(h-u+(p-_)),e.copy(r).addScaledVector(tu,o);const d=1/(m+g+f);return s=g*d,o=f*d,e.copy(i).addScaledVector(rr,s).addScaledVector(ar,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},La={h:0,s:0,l:0};function Qs(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Pt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=cn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=$t.workingColorSpace){if(t=Jl(t,1),e=Xe(e,0,1),i=Xe(i,0,1),e===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+e):i+e-i*e,s=2*i-a;this.r=Qs(s,a,t+1/3),this.g=Qs(s,a,t),this.b=Qs(s,a,t-1/3)}return $t.toWorkingColorSpace(this,r),this}setStyle(t,e=cn){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=cn){const i=ld[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qn(t.r),this.g=Qn(t.g),this.b=Qn(t.b),this}copyLinearToSRGB(t){return this.r=br(t.r),this.g=br(t.g),this.b=br(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=cn){return $t.fromWorkingColorSpace(Be.copy(this),t),Math.round(Xe(Be.r*255,0,255))*65536+Math.round(Xe(Be.g*255,0,255))*256+Math.round(Xe(Be.b*255,0,255))}getHexString(t=cn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(Be.copy(this),e);const i=Be.r,r=Be.g,a=Be.b,s=Math.max(i,r,a),o=Math.min(i,r,a);let l,c;const u=(o+s)/2;if(o===s)l=0,c=0;else{const h=s-o;switch(c=u<=.5?h/(s+o):h/(2-s-o),s){case i:l=(r-a)/h+(r<a?6:0);break;case r:l=(a-i)/h+2;break;case a:l=(i-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=cn){$t.fromWorkingColorSpace(Be.copy(this),t);const e=Be.r,i=Be.g,r=Be.b;return t!==cn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(li),this.setHSL(li.h+t,li.s+e,li.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(li),t.getHSL(La);const i=la(li.h,La.h,e),r=la(li.s,La.s,e),a=la(li.l,La.l,e);return this.setHSL(i,r,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,a=t.elements;return this.r=a[0]*e+a[3]*i+a[6]*r,this.g=a[1]*e+a[4]*i+a[7]*r,this.b=a[2]*e+a[5]*i+a[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new Pt;Pt.NAMES=ld;let _m=0;class Ai extends Vr{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=Jn(),this.name="",this.blending=Vi,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Uo,this.blendEquation=Ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zi,this.stencilZFail=Zi,this.stencilZPass=Zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Vi&&(i.blending=this.blending),this.side!==Si&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Io&&(i.blendSrc=this.blendSrc),this.blendDst!==Uo&&(i.blendDst=this.blendDst),this.blendEquation!==Ni&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Zi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Zi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const s=[];for(const o in a){const l=a[o];delete l.metadata,s.push(l)}return s}if(e){const a=r(t.textures),s=r(t.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=e[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class xa extends Ai{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ae=new P,Da=new bt;class $e{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=vl,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Da.fromBufferAttribute(this,e),Da.applyMatrix3(t),this.setXY(e,Da.x,Da.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=bn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=bn(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=bn(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=bn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=bn(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,a){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array),a=le(a,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==vl&&(t.usage=this.usage),t}}class tc extends $e{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class ec extends $e{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class ye extends $e{constructor(t,e,i){super(new Float32Array(t),e,i)}}let gm=0;const pn=new re,to=new Ce,sr=new P,on=new Wi,Zr=new Wi,Pe=new P;class Oe extends Vr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=Jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rd(t)?ec:tc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ft().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return pn.makeRotationFromQuaternion(t),this.applyMatrix4(pn),this}rotateX(t){return pn.makeRotationX(t),this.applyMatrix4(pn),this}rotateY(t){return pn.makeRotationY(t),this.applyMatrix4(pn),this}rotateZ(t){return pn.makeRotationZ(t),this.applyMatrix4(pn),this}translate(t,e,i){return pn.makeTranslation(t,e,i),this.applyMatrix4(pn),this}scale(t,e,i){return pn.makeScale(t,e,i),this.applyMatrix4(pn),this}lookAt(t){return to.lookAt(t),to.updateMatrix(),this.applyMatrix4(to.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(sr).negate(),this.translate(sr.x,sr.y,sr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,a=t.length;r<a;r++){const s=t[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new ye(i,3))}else{for(let i=0,r=e.count;i<r;i++){const a=t[i];e.setXYZ(i,a.x,a.y,a.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const a=e[i];on.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const i=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let a=0,s=e.length;a<s;a++){const o=e[a];Zr.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(on.min,Zr.min),on.expandByPoint(Pe),Pe.addVectors(on.max,Zr.max),on.expandByPoint(Pe)):(on.expandByPoint(Zr.min),on.expandByPoint(Zr.max))}on.getCenter(i);let r=0;for(let a=0,s=t.count;a<s;a++)Pe.fromBufferAttribute(t,a),r=Math.max(r,i.distanceToSquared(Pe));if(e)for(let a=0,s=e.length;a<s;a++){const o=e[a],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Pe.fromBufferAttribute(o,c),l&&(sr.fromBufferAttribute(t,c),Pe.add(sr)),r=Math.max(r,i.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<i.count;D++)o[D]=new P,l[D]=new P;const c=new P,u=new P,h=new P,f=new bt,p=new bt,_=new bt,g=new P,m=new P;function d(D,y,S){c.fromBufferAttribute(i,D),u.fromBufferAttribute(i,y),h.fromBufferAttribute(i,S),f.fromBufferAttribute(a,D),p.fromBufferAttribute(a,y),_.fromBufferAttribute(a,S),u.sub(c),h.sub(c),p.sub(f),_.sub(f);const R=1/(p.x*_.y-_.x*p.y);isFinite(R)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(h,-p.y).multiplyScalar(R),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(R),o[D].add(g),o[y].add(g),o[S].add(g),l[D].add(m),l[y].add(m),l[S].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let D=0,y=E.length;D<y;++D){const S=E[D],R=S.start,G=S.count;for(let B=R,$=R+G;B<$;B+=3)d(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const A=new P,x=new P,w=new P,T=new P;function C(D){w.fromBufferAttribute(r,D),T.copy(w);const y=o[D];A.copy(y),A.sub(w.multiplyScalar(w.dot(y))).normalize(),x.crossVectors(T,y);const R=x.dot(l[D])<0?-1:1;s.setXYZW(D,A.x,A.y,A.z,R)}for(let D=0,y=E.length;D<y;++D){const S=E[D],R=S.start,G=S.count;for(let B=R,$=R+G;B<$;B+=3)C(t.getX(B+0)),C(t.getX(B+1)),C(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new $e(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new P,a=new P,s=new P,o=new P,l=new P,c=new P,u=new P,h=new P;if(t)for(let f=0,p=t.count;f<p;f+=3){const _=t.getX(f+0),g=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),s.fromBufferAttribute(e,m),u.subVectors(s,a),h.subVectors(r,a),u.cross(h),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)r.fromBufferAttribute(e,f+0),a.fromBufferAttribute(e,f+1),s.fromBufferAttribute(e,f+2),u.subVectors(s,a),h.subVectors(r,a),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let p=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*u;for(let d=0;d<u;d++)f[_++]=c[p++]}return new $e(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Oe,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,i);e.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=t(f,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(r[l]=u,a=!0)}a&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const a=t.morphAttributes;for(const c in a){const u=[],h=a[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const s=t.groups;for(let c=0,u=s.length;c<u;c++){const h=s[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eu=new re,Ri=new Ql,Ia=new Xi,nu=new P,Ua=new P,Na=new P,Oa=new P,eo=new P,Fa=new P,iu=new P,za=new P;class De extends Ce{constructor(t=new Oe,e=new xa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(a&&o){Fa.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const u=o[l],h=a[l];u!==0&&(eo.fromBufferAttribute(h,t),s?Fa.addScaledVector(eo,u):Fa.addScaledVector(eo.sub(e),u))}e.add(Fa)}return e}raycast(t,e){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ia.copy(i.boundingSphere),Ia.applyMatrix4(a),Ri.copy(t.ray).recast(t.near),!(Ia.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(Ia,nu)===null||Ri.origin.distanceToSquared(nu)>(t.far-t.near)**2))&&(eu.copy(a).invert(),Ri.copy(t.ray).applyMatrix4(eu),!(i.boundingBox!==null&&Ri.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ri)))}_computeIntersections(t,e,i){let r;const a=this.geometry,s=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,h=a.attributes.normal,f=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(s))for(let _=0,g=f.length;_<g;_++){const m=f[_],d=s[m.materialIndex],E=Math.max(m.start,p.start),A=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let x=E,w=A;x<w;x+=3){const T=o.getX(x),C=o.getX(x+1),D=o.getX(x+2);r=Ba(this,d,t,i,c,u,h,T,C,D),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=_,d=g;m<d;m+=3){const E=o.getX(m),A=o.getX(m+1),x=o.getX(m+2);r=Ba(this,s,t,i,c,u,h,E,A,x),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(s))for(let _=0,g=f.length;_<g;_++){const m=f[_],d=s[m.materialIndex],E=Math.max(m.start,p.start),A=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=E,w=A;x<w;x+=3){const T=x,C=x+1,D=x+2;r=Ba(this,d,t,i,c,u,h,T,C,D),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=_,d=g;m<d;m+=3){const E=m,A=m+1,x=m+2;r=Ba(this,s,t,i,c,u,h,E,A,x),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function vm(n,t,e,i,r,a,s,o){let l;if(t.side===Ye?l=i.intersectTriangle(s,a,r,!0,o):l=i.intersectTriangle(r,a,s,t.side===Si,o),l===null)return null;za.copy(o),za.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(za);return c<e.near||c>e.far?null:{distance:c,point:za.clone(),object:n}}function Ba(n,t,e,i,r,a,s,o,l,c){n.getVertexPosition(o,Ua),n.getVertexPosition(l,Na),n.getVertexPosition(c,Oa);const u=vm(n,t,e,i,Ua,Na,Oa,iu);if(u){const h=new P;hn.getBarycoord(iu,Ua,Na,Oa,h),r&&(u.uv=hn.getInterpolatedAttribute(r,o,l,c,h,new bt)),a&&(u.uv1=hn.getInterpolatedAttribute(a,o,l,c,h,new bt)),s&&(u.normal=hn.getInterpolatedAttribute(s,o,l,c,h,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new P,materialIndex:0};hn.getNormal(Ua,Na,Oa,f.normal),u.face=f,u.barycoord=h}return u}class Ei extends Oe{constructor(t=1,e=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const l=[],c=[],u=[],h=[];let f=0,p=0;_("z","y","x",-1,-1,i,e,t,s,a,0),_("z","y","x",1,-1,i,e,-t,s,a,1),_("x","z","y",1,1,t,i,e,r,s,2),_("x","z","y",1,-1,t,i,-e,r,s,3),_("x","y","z",1,-1,t,e,i,r,a,4),_("x","y","z",-1,-1,t,e,-i,r,a,5),this.setIndex(l),this.setAttribute("position",new ye(c,3)),this.setAttribute("normal",new ye(u,3)),this.setAttribute("uv",new ye(h,2));function _(g,m,d,E,A,x,w,T,C,D,y){const S=x/C,R=w/D,G=x/2,B=w/2,$=T/2,j=C+1,k=D+1;let Z=0,V=0;const rt=new P;for(let ht=0;ht<k;ht++){const _t=ht*R-B;for(let It=0;It<j;It++){const jt=It*S-G;rt[g]=jt*E,rt[m]=_t*A,rt[d]=$,c.push(rt.x,rt.y,rt.z),rt[g]=0,rt[m]=0,rt[d]=T>0?1:-1,u.push(rt.x,rt.y,rt.z),h.push(It/C),h.push(1-ht/D),Z+=1}}for(let ht=0;ht<D;ht++)for(let _t=0;_t<C;_t++){const It=f+_t+j*ht,jt=f+_t+j*(ht+1),W=f+(_t+1)+j*(ht+1),Q=f+(_t+1)+j*ht;l.push(It,jt,Q),l.push(jt,W,Q),V+=6}o.addGroup(p,V,y),p+=V,f+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ei(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ur(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function ke(n){const t={};for(let e=0;e<n.length;e++){const i=Ur(n[e]);for(const r in i)t[r]=i[r]}return t}function xm(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function cd(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const Nr={clone:Ur,merge:ke};var Mm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ue extends Ai{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mm,this.fragmentShader=Sm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ur(t.uniforms),this.uniformsGroups=xm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?e.uniforms[r]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[r]={type:"m4",value:s.toArray()}:e.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class ud extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=Kn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ci=new P,ru=new bt,au=new bt;class un extends ud{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ma*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ma*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ci.x,ci.y).multiplyScalar(-t/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ci.x,ci.y).multiplyScalar(-t/ci.z)}getViewSize(t,e){return this.getViewBounds(t,ru,au),e.subVectors(au,ru)}setViewOffset(t,e,i,r,a,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ar*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;a+=s.offsetX*r/l,e-=s.offsetY*i/c,r*=s.width/l,i*=s.height/c}const o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const or=-90,lr=1;class Em extends Ce{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new un(or,lr,t,e);r.layers=this.layers,this.add(r);const a=new un(or,lr,t,e);a.layers=this.layers,this.add(a);const s=new un(or,lr,t,e);s.layers=this.layers,this.add(s);const o=new un(or,lr,t,e);o.layers=this.layers,this.add(o);const l=new un(or,lr,t,e);l.layers=this.layers,this.add(l);const c=new un(or,lr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,a,s,o,l]=e;for(const c of e)this.remove(c);if(t===Kn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===fs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,a),t.setRenderTarget(i,1,r),t.render(e,s),t.setRenderTarget(i,2,r),t.render(e,o),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class hd extends Ne{constructor(t,e,i,r,a,s,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Pr,super(t,e,i,r,a,s,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ym extends gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new hd(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Nn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ei(5,5,5),a=new Ue({name:"CubemapFromEquirect",uniforms:Ur(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ye,blending:Fn});a.uniforms.tEquirect.value=e;const s=new De(r,a),o=e.minFilter;return e.minFilter===Fi&&(e.minFilter=Nn),new Em(1,10,this).update(t,s),e.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(t,e,i,r){const a=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(e,i,r);t.setRenderTarget(a)}}const no=new P,Am=new P,bm=new Ft;class Di{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=no.subVectors(i,e).cross(Am.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(no),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||bm.getNormalMatrix(t),r=this.coplanarPoint(no).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wi=new Xi,Va=new P;class nc{constructor(t=new Di,e=new Di,i=new Di,r=new Di,a=new Di,s=new Di){this.planes=[t,e,i,r,a,s]}set(t,e,i,r,a,s){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Kn){const i=this.planes,r=t.elements,a=r[0],s=r[1],o=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],p=r[8],_=r[9],g=r[10],m=r[11],d=r[12],E=r[13],A=r[14],x=r[15];if(i[0].setComponents(l-a,f-c,m-p,x-d).normalize(),i[1].setComponents(l+a,f+c,m+p,x+d).normalize(),i[2].setComponents(l+s,f+u,m+_,x+E).normalize(),i[3].setComponents(l-s,f-u,m-_,x-E).normalize(),i[4].setComponents(l-o,f-h,m-g,x-A).normalize(),e===Kn)i[5].setComponents(l+o,f+h,m+g,x+A).normalize();else if(e===fs)i[5].setComponents(o,h,g,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(t){return wi.center.set(0,0,0),wi.radius=.7071067811865476,wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(Va.x=r.normal.x>0?t.max.x:t.min.x,Va.y=r.normal.y>0?t.max.y:t.min.y,Va.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Va)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function dd(){let n=null,t=!1,e=null,i=null;function r(a,s){e(a,s),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){n=a}}}function Tm(n){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,_)=>p.start-_.start);let f=0;for(let p=1;p<h.length;p++){const _=h[f],g=h[p];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,h[f]=g)}h.length=f+1;for(let p=0,_=h.length;p<_;p++){const g=h[p];n.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:a,update:s}}class qi extends Oe{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const a=t/2,s=e/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,h=t/o,f=e/l,p=[],_=[],g=[],m=[];for(let d=0;d<u;d++){const E=d*f-s;for(let A=0;A<c;A++){const x=A*h-a;_.push(x,-E,0),g.push(0,0,1),m.push(A/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let E=0;E<o;E++){const A=E+c*d,x=E+c*(d+1),w=E+1+c*(d+1),T=E+1+c*d;p.push(A,x,T),p.push(x,w,T)}this.setIndex(p),this.setAttribute("position",new ye(_,3)),this.setAttribute("normal",new ye(g,3)),this.setAttribute("uv",new ye(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qi(t.width,t.height,t.widthSegments,t.heightSegments)}}var Cm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Dm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Im=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Um=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Om=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Vm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,km=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ym=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$m=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,jm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Zm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Km=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,t_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,e_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,n_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,i_="gl_FragColor = linearToOutputTexel( gl_FragColor );",r_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,a_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,s_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,o_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,l_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,c_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,u_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,h_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,d_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,f_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,p_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,m_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,__=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,g_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,v_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,x_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,M_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,S_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,E_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,y_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,A_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,b_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,T_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,C_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,R_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,w_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,P_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,D_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,I_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,U_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,N_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,O_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,F_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,z_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,B_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,V_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,G_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,k_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,X_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,q_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,j_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Z_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,K_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,J_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Q_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ng=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ig=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ag=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,og=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,cg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ug=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,hg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_g=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ig=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ug=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ng=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Gg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Xg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$g=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Kg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,e0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,n0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,r0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:Cm,alphahash_pars_fragment:Rm,alphamap_fragment:wm,alphamap_pars_fragment:Pm,alphatest_fragment:Lm,alphatest_pars_fragment:Dm,aomap_fragment:Im,aomap_pars_fragment:Um,batching_pars_vertex:Nm,batching_vertex:Om,begin_vertex:Fm,beginnormal_vertex:zm,bsdfs:Bm,iridescence_fragment:Vm,bumpmap_pars_fragment:Gm,clipping_planes_fragment:Hm,clipping_planes_pars_fragment:km,clipping_planes_pars_vertex:Wm,clipping_planes_vertex:Xm,color_fragment:qm,color_pars_fragment:Ym,color_pars_vertex:$m,color_vertex:jm,common:Zm,cube_uv_reflection_fragment:Km,defaultnormal_vertex:Jm,displacementmap_pars_vertex:Qm,displacementmap_vertex:t_,emissivemap_fragment:e_,emissivemap_pars_fragment:n_,colorspace_fragment:i_,colorspace_pars_fragment:r_,envmap_fragment:a_,envmap_common_pars_fragment:s_,envmap_pars_fragment:o_,envmap_pars_vertex:l_,envmap_physical_pars_fragment:x_,envmap_vertex:c_,fog_vertex:u_,fog_pars_vertex:h_,fog_fragment:d_,fog_pars_fragment:f_,gradientmap_pars_fragment:p_,lightmap_pars_fragment:m_,lights_lambert_fragment:__,lights_lambert_pars_fragment:g_,lights_pars_begin:v_,lights_toon_fragment:M_,lights_toon_pars_fragment:S_,lights_phong_fragment:E_,lights_phong_pars_fragment:y_,lights_physical_fragment:A_,lights_physical_pars_fragment:b_,lights_fragment_begin:T_,lights_fragment_maps:C_,lights_fragment_end:R_,logdepthbuf_fragment:w_,logdepthbuf_pars_fragment:P_,logdepthbuf_pars_vertex:L_,logdepthbuf_vertex:D_,map_fragment:I_,map_pars_fragment:U_,map_particle_fragment:N_,map_particle_pars_fragment:O_,metalnessmap_fragment:F_,metalnessmap_pars_fragment:z_,morphinstance_vertex:B_,morphcolor_vertex:V_,morphnormal_vertex:G_,morphtarget_pars_vertex:H_,morphtarget_vertex:k_,normal_fragment_begin:W_,normal_fragment_maps:X_,normal_pars_fragment:q_,normal_pars_vertex:Y_,normal_vertex:$_,normalmap_pars_fragment:j_,clearcoat_normal_fragment_begin:Z_,clearcoat_normal_fragment_maps:K_,clearcoat_pars_fragment:J_,iridescence_pars_fragment:Q_,opaque_fragment:tg,packing:eg,premultiplied_alpha_fragment:ng,project_vertex:ig,dithering_fragment:rg,dithering_pars_fragment:ag,roughnessmap_fragment:sg,roughnessmap_pars_fragment:og,shadowmap_pars_fragment:lg,shadowmap_pars_vertex:cg,shadowmap_vertex:ug,shadowmask_pars_fragment:hg,skinbase_vertex:dg,skinning_pars_vertex:fg,skinning_vertex:pg,skinnormal_vertex:mg,specularmap_fragment:_g,specularmap_pars_fragment:gg,tonemapping_fragment:vg,tonemapping_pars_fragment:xg,transmission_fragment:Mg,transmission_pars_fragment:Sg,uv_pars_fragment:Eg,uv_pars_vertex:yg,uv_vertex:Ag,worldpos_vertex:bg,background_vert:Tg,background_frag:Cg,backgroundCube_vert:Rg,backgroundCube_frag:wg,cube_vert:Pg,cube_frag:Lg,depth_vert:Dg,depth_frag:Ig,distanceRGBA_vert:Ug,distanceRGBA_frag:Ng,equirect_vert:Og,equirect_frag:Fg,linedashed_vert:zg,linedashed_frag:Bg,meshbasic_vert:Vg,meshbasic_frag:Gg,meshlambert_vert:Hg,meshlambert_frag:kg,meshmatcap_vert:Wg,meshmatcap_frag:Xg,meshnormal_vert:qg,meshnormal_frag:Yg,meshphong_vert:$g,meshphong_frag:jg,meshphysical_vert:Zg,meshphysical_frag:Kg,meshtoon_vert:Jg,meshtoon_frag:Qg,points_vert:t0,points_frag:e0,shadow_vert:n0,shadow_frag:i0,sprite_vert:r0,sprite_frag:a0},it={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},In={basic:{uniforms:ke([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:ke([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:ke([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:ke([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:ke([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:ke([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:ke([it.points,it.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:ke([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:ke([it.common,it.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:ke([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:ke([it.sprite,it.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:ke([it.common,it.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:ke([it.lights,it.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};In.physical={uniforms:ke([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const Ga={r:0,b:0,g:0},Pi=new vn,s0=new re;function o0(n,t,e,i,r,a,s){const o=new Pt(0);let l=a===!0?0:1,c,u,h=null,f=0,p=null;function _(E){let A=E.isScene===!0?E.background:null;return A&&A.isTexture&&(A=(E.backgroundBlurriness>0?e:t).get(A)),A}function g(E){let A=!1;const x=_(E);x===null?d(o,l):x&&x.isColor&&(d(x,1),A=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(n.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(E,A){const x=_(A);x&&(x.isCubeTexture||x.mapping===ys)?(u===void 0&&(u=new De(new Ei(1,1,1),new Ue({name:"BackgroundCubeMaterial",uniforms:Ur(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Pi.copy(A.backgroundRotation),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(s0.makeRotationFromEuler(Pi)),u.material.toneMapped=$t.getTransfer(x.colorSpace)!==oe,(h!==x||f!==x.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=x,f=x.version,p=n.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new De(new qi(2,2),new Ue({name:"BackgroundMaterial",uniforms:Ur(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=$t.getTransfer(x.colorSpace)!==oe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,p=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function d(E,A){E.getRGB(Ga,cd(n)),i.buffers.color.setClear(Ga.r,Ga.g,Ga.b,A,s)}return{getClearColor:function(){return o},setClearColor:function(E,A=1){o.set(E),l=A,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,d(o,l)},render:g,addToRenderList:m}}function l0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let a=r,s=!1;function o(S,R,G,B,$){let j=!1;const k=h(B,G,R);a!==k&&(a=k,c(a.object)),j=p(S,B,G,$),j&&_(S,B,G,$),$!==null&&t.update($,n.ELEMENT_ARRAY_BUFFER),(j||s)&&(s=!1,x(S,R,G,B),$!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function h(S,R,G){const B=G.wireframe===!0;let $=i[S.id];$===void 0&&($={},i[S.id]=$);let j=$[R.id];j===void 0&&(j={},$[R.id]=j);let k=j[B];return k===void 0&&(k=f(l()),j[B]=k),k}function f(S){const R=[],G=[],B=[];for(let $=0;$<e;$++)R[$]=0,G[$]=0,B[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:G,attributeDivisors:B,object:S,attributes:{},index:null}}function p(S,R,G,B){const $=a.attributes,j=R.attributes;let k=0;const Z=G.getAttributes();for(const V in Z)if(Z[V].location>=0){const ht=$[V];let _t=j[V];if(_t===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(_t=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(_t=S.instanceColor)),ht===void 0||ht.attribute!==_t||_t&&ht.data!==_t.data)return!0;k++}return a.attributesNum!==k||a.index!==B}function _(S,R,G,B){const $={},j=R.attributes;let k=0;const Z=G.getAttributes();for(const V in Z)if(Z[V].location>=0){let ht=j[V];ht===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(ht=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(ht=S.instanceColor));const _t={};_t.attribute=ht,ht&&ht.data&&(_t.data=ht.data),$[V]=_t,k++}a.attributes=$,a.attributesNum=k,a.index=B}function g(){const S=a.newAttributes;for(let R=0,G=S.length;R<G;R++)S[R]=0}function m(S){d(S,0)}function d(S,R){const G=a.newAttributes,B=a.enabledAttributes,$=a.attributeDivisors;G[S]=1,B[S]===0&&(n.enableVertexAttribArray(S),B[S]=1),$[S]!==R&&(n.vertexAttribDivisor(S,R),$[S]=R)}function E(){const S=a.newAttributes,R=a.enabledAttributes;for(let G=0,B=R.length;G<B;G++)R[G]!==S[G]&&(n.disableVertexAttribArray(G),R[G]=0)}function A(S,R,G,B,$,j,k){k===!0?n.vertexAttribIPointer(S,R,G,$,j):n.vertexAttribPointer(S,R,G,B,$,j)}function x(S,R,G,B){g();const $=B.attributes,j=G.getAttributes(),k=R.defaultAttributeValues;for(const Z in j){const V=j[Z];if(V.location>=0){let rt=$[Z];if(rt===void 0&&(Z==="instanceMatrix"&&S.instanceMatrix&&(rt=S.instanceMatrix),Z==="instanceColor"&&S.instanceColor&&(rt=S.instanceColor)),rt!==void 0){const ht=rt.normalized,_t=rt.itemSize,It=t.get(rt);if(It===void 0)continue;const jt=It.buffer,W=It.type,Q=It.bytesPerElement,mt=W===n.INT||W===n.UNSIGNED_INT||rt.gpuType===Xl;if(rt.isInterleavedBufferAttribute){const at=rt.data,Et=at.stride,Ut=rt.offset;if(at.isInstancedInterleavedBuffer){for(let Gt=0;Gt<V.locationSize;Gt++)d(V.location+Gt,at.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Gt=0;Gt<V.locationSize;Gt++)m(V.location+Gt);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let Gt=0;Gt<V.locationSize;Gt++)A(V.location+Gt,_t/V.locationSize,W,ht,Et*Q,(Ut+_t/V.locationSize*Gt)*Q,mt)}else{if(rt.isInstancedBufferAttribute){for(let at=0;at<V.locationSize;at++)d(V.location+at,rt.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let at=0;at<V.locationSize;at++)m(V.location+at);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let at=0;at<V.locationSize;at++)A(V.location+at,_t/V.locationSize,W,ht,_t*Q,_t/V.locationSize*at*Q,mt)}}else if(k!==void 0){const ht=k[Z];if(ht!==void 0)switch(ht.length){case 2:n.vertexAttrib2fv(V.location,ht);break;case 3:n.vertexAttrib3fv(V.location,ht);break;case 4:n.vertexAttrib4fv(V.location,ht);break;default:n.vertexAttrib1fv(V.location,ht)}}}}E()}function w(){D();for(const S in i){const R=i[S];for(const G in R){const B=R[G];for(const $ in B)u(B[$].object),delete B[$];delete R[G]}delete i[S]}}function T(S){if(i[S.id]===void 0)return;const R=i[S.id];for(const G in R){const B=R[G];for(const $ in B)u(B[$].object),delete B[$];delete R[G]}delete i[S.id]}function C(S){for(const R in i){const G=i[R];if(G[S.id]===void 0)continue;const B=G[S.id];for(const $ in B)u(B[$].object),delete B[$];delete G[S.id]}}function D(){y(),s=!0,a!==r&&(a=r,c(a.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:D,resetDefaultState:y,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:g,enableAttribute:m,disableUnusedAttributes:E}}function c0(n,t,e){let i;function r(c){i=c}function a(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function s(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function o(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let _=0;_<h;_++)p+=u[_];e.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)s(c[_],u[_],f[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g]*f[g];e.update(_,i,1)}}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function u0(n,t,e,i){let r;function a(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(C){return!(C!==Tn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const D=C===zn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==ti&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==On&&!D)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=_>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:E,maxVaryings:A,maxFragmentUniforms:x,vertexTextures:w,maxSamples:T}}function h0(n){const t=this;let e=null,i=0,r=!1,a=!1;const s=new Di,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!r||_===null||_.length===0||a&&!m)a?u(null):c();else{const E=a?0:i,A=E*4;let x=d.clippingState||null;l.value=x,x=u(_,f,A,p);for(let w=0;w!==A;++w)x[w]=e[w];d.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,p,_){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const d=p+g*4,E=f.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<d)&&(m=new Float32Array(d));for(let A=0,x=p;A!==g;++A,x+=4)s.copy(h[A]).applyMatrix4(E,o),s.normal.toArray(m,x),m[x+3]=s.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function d0(n){let t=new WeakMap;function e(s,o){return o===Ho?s.mapping=Pr:o===ko&&(s.mapping=Lr),s}function i(s){if(s&&s.isTexture){const o=s.mapping;if(o===Ho||o===ko)if(t.has(s)){const l=t.get(s).texture;return e(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new ym(l.height);return c.fromEquirectangularTexture(n,s),t.set(s,c),s.addEventListener("dispose",r),e(c.texture,s.mapping)}else return null}}return s}function r(s){const o=s.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function a(){t=new WeakMap}return{get:i,dispose:a}}class ic extends ud{constructor(t=-1,e=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-t,s=i+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,s=a+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Mr=4,su=[.125,.215,.35,.446,.526,.582],Oi=20,io=new ic,ou=new Pt;let ro=null,ao=0,so=0,oo=!1;const Ii=(1+Math.sqrt(5))/2,cr=1/Ii,lu=[new P(-Ii,cr,0),new P(Ii,cr,0),new P(-cr,0,Ii),new P(cr,0,Ii),new P(0,Ii,-cr),new P(0,Ii,cr),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class cu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){ro=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),oo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,i,r,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=du(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ro,ao,so),this._renderer.xr.enabled=oo,t.scissorTest=!1,Ha(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pr||t.mapping===Lr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ro=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),oo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:zn,format:Tn,colorSpace:Br,depthBuffer:!1},r=uu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uu(t,e,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=f0(a)),this._blurMaterial=p0(a,t,e)}return r}_compileMaterial(t){const e=new De(this._lodPlanes[0],t);this._renderer.compile(e,io)}_sceneToCubeUV(t,e,i,r){const o=new un(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(ou),u.toneMapping=vi,u.autoClear=!1;const p=new xa({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),_=new De(new Ei,p);let g=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,g=!0):(p.color.copy(ou),g=!0);for(let d=0;d<6;d++){const E=d%3;E===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):E===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const A=this._cubeSize;Ha(r,E*A,d>2?A:0,A,A),u.setRenderTarget(r),g&&u.render(_,o),u.render(t,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===Pr||t.mapping===Lr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=du()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hu());const a=r?this._cubemapMaterial:this._equirectMaterial,s=new De(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=t;const l=this._cubeSize;Ha(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(s,io)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const s=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=lu[(r-a-1)%lu.length];this._blur(t,a-1,a,s,o)}e.autoClear=i}_blur(t,e,i,r,a){const s=this._pingPongRenderTarget;this._halfBlur(t,s,e,i,r,"latitudinal",a),this._halfBlur(s,t,i,i,r,"longitudinal",a)}_halfBlur(t,e,i,r,a,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new De(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*Oi-1),g=a/_,m=isFinite(a)?1+Math.floor(u*g):Oi;m>Oi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Oi}`);const d=[];let E=0;for(let C=0;C<Oi;++C){const D=C/g,y=Math.exp(-D*D/2);d.push(y),C===0?E+=y:C<m&&(E+=2*y)}for(let C=0;C<d.length;C++)d[C]=d[C]/E;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=s==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:A}=this;f.dTheta.value=_,f.mipInt.value=A-i;const x=this._sizeLods[r],w=3*x*(r>A-Mr?r-A+Mr:0),T=4*(this._cubeSize-x);Ha(e,w,T,3*x,2*x),l.setRenderTarget(e),l.render(h,io)}}function f0(n){const t=[],e=[],i=[];let r=n;const a=n-Mr+1+su.length;for(let s=0;s<a;s++){const o=Math.pow(2,r);e.push(o);let l=1/o;s>n-Mr?l=su[s-n+Mr-1]:s===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,_=6,g=3,m=2,d=1,E=new Float32Array(g*_*p),A=new Float32Array(m*_*p),x=new Float32Array(d*_*p);for(let T=0;T<p;T++){const C=T%3*2/3-1,D=T>2?0:-1,y=[C,D,0,C+2/3,D,0,C+2/3,D+1,0,C,D,0,C+2/3,D+1,0,C,D+1,0];E.set(y,g*_*T),A.set(f,m*_*T);const S=[T,T,T,T,T,T];x.set(S,d*_*T)}const w=new Oe;w.setAttribute("position",new $e(E,g)),w.setAttribute("uv",new $e(A,m)),w.setAttribute("faceIndex",new $e(x,d)),t.push(w),r>Mr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function uu(n,t,e){const i=new gn(n,t,e);return i.texture.mapping=ys,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ha(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function p0(n,t,e){const i=new Float32Array(Oi),r=new P(0,1,0);return new Ue({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function hu(){return new Ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function du(){return new Ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function rc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function m0(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ho||l===ko,u=l===Pr||l===Lr;if(c||u){let h=t.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new cu(n)),h=c?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&r(p)?(e===null&&(e=new cu(n)),h=c?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",a),h.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function s(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:s}}function _0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&sa("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function g0(n,t,e,i){const r={},a=new WeakMap;function s(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const _ in f.attributes)t.remove(f.attributes[_]);for(const _ in f.morphAttributes){const g=f.morphAttributes[_];for(let m=0,d=g.length;m<d;m++)t.remove(g[m])}f.removeEventListener("dispose",s),delete r[f.id];const p=a.get(f);p&&(t.remove(p),a.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",s),r[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const _ in f)t.update(f[_],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const _ in p){const g=p[_];for(let m=0,d=g.length;m<d;m++)t.update(g[m],n.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,_=h.attributes.position;let g=0;if(p!==null){const E=p.array;g=p.version;for(let A=0,x=E.length;A<x;A+=3){const w=E[A+0],T=E[A+1],C=E[A+2];f.push(w,T,T,C,C,w)}}else if(_!==void 0){const E=_.array;g=_.version;for(let A=0,x=E.length/3-1;A<x;A+=3){const w=A+0,T=A+1,C=A+2;f.push(w,T,T,C,C,w)}}else return;const m=new(rd(f)?ec:tc)(f,1);m.version=g;const d=a.get(h);d&&t.remove(d),a.set(h,m)}function u(h){const f=a.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return a.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function v0(n,t,e){let i;function r(f){i=f}let a,s;function o(f){a=f.type,s=f.bytesPerElement}function l(f,p){n.drawElements(i,p,a,f*s),e.update(p,i,1)}function c(f,p,_){_!==0&&(n.drawElementsInstanced(i,p,a,f*s,_),e.update(p,i,_))}function u(f,p,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,f,0,_);let m=0;for(let d=0;d<_;d++)m+=p[d];e.update(m,i,1)}function h(f,p,_,g){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/s,p[d],g[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,a,f,0,g,0,_);let d=0;for(let E=0;E<_;E++)d+=p[E]*g[E];e.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function x0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(e.calls++,s){case n.TRIANGLES:e.triangles+=o*(a/3);break;case n.LINES:e.lines+=o*(a/2);break;case n.LINE_STRIP:e.lines+=o*(a-1);break;case n.LINE_LOOP:e.lines+=o*a;break;case n.POINTS:e.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function M0(n,t,e){const i=new WeakMap,r=new he;function a(s,o,l){const c=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let S=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var p=S;f!==void 0&&f.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let x=0;_===!0&&(x=1),g===!0&&(x=2),m===!0&&(x=3);let w=o.attributes.position.count*x,T=1;w>t.maxTextureSize&&(T=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const C=new Float32Array(w*T*4*h),D=new sd(C,w,T,h);D.type=On,D.needsUpdate=!0;const y=x*4;for(let R=0;R<h;R++){const G=d[R],B=E[R],$=A[R],j=w*T*4*R;for(let k=0;k<G.count;k++){const Z=k*y;_===!0&&(r.fromBufferAttribute(G,k),C[j+Z+0]=r.x,C[j+Z+1]=r.y,C[j+Z+2]=r.z,C[j+Z+3]=0),g===!0&&(r.fromBufferAttribute(B,k),C[j+Z+4]=r.x,C[j+Z+5]=r.y,C[j+Z+6]=r.z,C[j+Z+7]=0),m===!0&&(r.fromBufferAttribute($,k),C[j+Z+8]=r.x,C[j+Z+9]=r.y,C[j+Z+10]=r.z,C[j+Z+11]=$.itemSize===4?r.w:1)}}f={count:h,texture:D,size:new bt(w,T)},i.set(o,f),o.addEventListener("dispose",S)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",s.morphTexture,e);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:a}}function S0(n,t,e,i){let r=new WeakMap;function a(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function s(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:a,dispose:s}}class fd extends Ne{constructor(t,e,i,r,a,s,o,l,c,u=yr){if(u!==yr&&u!==Ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===yr&&(i=Gi),i===void 0&&u===Ir&&(i=Dr),super(null,r,a,s,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Te,this.minFilter=l!==void 0?l:Te,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const pd=new Ne,fu=new fd(1,1),md=new sd,_d=new lm,gd=new hd,pu=[],mu=[],_u=new Float32Array(16),gu=new Float32Array(9),vu=new Float32Array(4);function Hr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let a=pu[r];if(a===void 0&&(a=new Float32Array(r),pu[r]=a),t!==0){i.toArray(a,0);for(let s=1,o=0;s!==t;++s)o+=e,n[s].toArray(a,o)}return a}function Re(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function we(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function bs(n,t){let e=mu[t];e===void 0&&(e=new Int32Array(t),mu[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function E0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function y0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2fv(this.addr,t),we(e,t)}}function A0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;n.uniform3fv(this.addr,t),we(e,t)}}function b0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4fv(this.addr,t),we(e,t)}}function T0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Re(e,i))return;vu.set(i),n.uniformMatrix2fv(this.addr,!1,vu),we(e,i)}}function C0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Re(e,i))return;gu.set(i),n.uniformMatrix3fv(this.addr,!1,gu),we(e,i)}}function R0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Re(e,i))return;_u.set(i),n.uniformMatrix4fv(this.addr,!1,_u),we(e,i)}}function w0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function P0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2iv(this.addr,t),we(e,t)}}function L0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3iv(this.addr,t),we(e,t)}}function D0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4iv(this.addr,t),we(e,t)}}function I0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function U0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2uiv(this.addr,t),we(e,t)}}function N0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3uiv(this.addr,t),we(e,t)}}function O0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4uiv(this.addr,t),we(e,t)}}function F0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(fu.compareFunction=id,a=fu):a=pd,e.setTexture2D(t||a,r)}function z0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||_d,r)}function B0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||gd,r)}function V0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||md,r)}function G0(n){switch(n){case 5126:return E0;case 35664:return y0;case 35665:return A0;case 35666:return b0;case 35674:return T0;case 35675:return C0;case 35676:return R0;case 5124:case 35670:return w0;case 35667:case 35671:return P0;case 35668:case 35672:return L0;case 35669:case 35673:return D0;case 5125:return I0;case 36294:return U0;case 36295:return N0;case 36296:return O0;case 35678:case 36198:case 36298:case 36306:case 35682:return F0;case 35679:case 36299:case 36307:return z0;case 35680:case 36300:case 36308:case 36293:return B0;case 36289:case 36303:case 36311:case 36292:return V0}}function H0(n,t){n.uniform1fv(this.addr,t)}function k0(n,t){const e=Hr(t,this.size,2);n.uniform2fv(this.addr,e)}function W0(n,t){const e=Hr(t,this.size,3);n.uniform3fv(this.addr,e)}function X0(n,t){const e=Hr(t,this.size,4);n.uniform4fv(this.addr,e)}function q0(n,t){const e=Hr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Y0(n,t){const e=Hr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function $0(n,t){const e=Hr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function j0(n,t){n.uniform1iv(this.addr,t)}function Z0(n,t){n.uniform2iv(this.addr,t)}function K0(n,t){n.uniform3iv(this.addr,t)}function J0(n,t){n.uniform4iv(this.addr,t)}function Q0(n,t){n.uniform1uiv(this.addr,t)}function tv(n,t){n.uniform2uiv(this.addr,t)}function ev(n,t){n.uniform3uiv(this.addr,t)}function nv(n,t){n.uniform4uiv(this.addr,t)}function iv(n,t,e){const i=this.cache,r=t.length,a=bs(e,r);Re(i,a)||(n.uniform1iv(this.addr,a),we(i,a));for(let s=0;s!==r;++s)e.setTexture2D(t[s]||pd,a[s])}function rv(n,t,e){const i=this.cache,r=t.length,a=bs(e,r);Re(i,a)||(n.uniform1iv(this.addr,a),we(i,a));for(let s=0;s!==r;++s)e.setTexture3D(t[s]||_d,a[s])}function av(n,t,e){const i=this.cache,r=t.length,a=bs(e,r);Re(i,a)||(n.uniform1iv(this.addr,a),we(i,a));for(let s=0;s!==r;++s)e.setTextureCube(t[s]||gd,a[s])}function sv(n,t,e){const i=this.cache,r=t.length,a=bs(e,r);Re(i,a)||(n.uniform1iv(this.addr,a),we(i,a));for(let s=0;s!==r;++s)e.setTexture2DArray(t[s]||md,a[s])}function ov(n){switch(n){case 5126:return H0;case 35664:return k0;case 35665:return W0;case 35666:return X0;case 35674:return q0;case 35675:return Y0;case 35676:return $0;case 5124:case 35670:return j0;case 35667:case 35671:return Z0;case 35668:case 35672:return K0;case 35669:case 35673:return J0;case 5125:return Q0;case 36294:return tv;case 36295:return ev;case 36296:return nv;case 35678:case 36198:case 36298:case 36306:case 35682:return iv;case 35679:case 36299:case 36307:return rv;case 35680:case 36300:case 36308:case 36293:return av;case 36289:case 36303:case 36311:case 36292:return sv}}class lv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=G0(e.type)}}class cv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ov(e.type)}}class uv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(t,e[o.id],i)}}}const lo=/(\w+)(\])?(\[|\.)?/g;function xu(n,t){n.seq.push(t),n.map[t.id]=t}function hv(n,t,e){const i=n.name,r=i.length;for(lo.lastIndex=0;;){const a=lo.exec(i),s=lo.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===r){xu(e,c===void 0?new lv(o,n,t):new cv(o,n,t));break}else{let h=e.map[o];h===void 0&&(h=new uv(o),xu(e,h)),e=h}}}class cs{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=t.getActiveUniform(e,r),s=t.getUniformLocation(e,a.name);hv(a,s,this)}}setValue(t,e,i,r){const a=this.map[e];a!==void 0&&a.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let a=0,s=e.length;a!==s;++a){const o=e[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,a=t.length;r!==a;++r){const s=t[r];s.id in e&&i.push(s)}return i}}function Mu(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const dv=37297;let fv=0;function pv(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let s=r;s<a;s++){const o=s+1;i.push(`${o===t?">":" "} ${o}: ${e[s]}`)}return i.join(`
`)}const Su=new Ft;function mv(n){$t._getMatrix(Su,$t.workingColorSpace,n);const t=`mat3( ${Su.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(n)){case As:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Eu(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const s=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+pv(n.getShaderSource(t),s)}else return r}function _v(n,t){const e=mv(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function gv(n,t){let e;switch(t){case zh:e="Linear";break;case Bh:e="Reinhard";break;case Vh:e="Cineon";break;case Gh:e="ACESFilmic";break;case Hh:e="AgX";break;case kh:e="Neutral";break;case Rp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ka=new P;function vv(){$t.getLuminanceCoefficients(ka);const n=ka.x.toFixed(4),t=ka.y.toFixed(4),e=ka.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(oa).join(`
`)}function Mv(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Sv(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(t,r),s=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),e[s]={type:a.type,location:n.getAttribLocation(t,s),locationSize:o}}return e}function oa(n){return n!==""}function yu(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Au(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Ev=/^[ \t]*#include +<([\w\d./]+)>/gm;function xl(n){return n.replace(Ev,Av)}const yv=new Map;function Av(n,t){let e=Vt[t];if(e===void 0){const i=yv.get(t);if(i!==void 0)e=Vt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return xl(e)}const bv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bu(n){return n.replace(bv,Tv)}function Tv(n,t,e,i){let r="";for(let a=parseInt(t);a<parseInt(e);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Tu(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Cv(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Fh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===op?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===$n&&(t="SHADOWMAP_TYPE_VSM"),t}function Rv(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Pr:case Lr:t="ENVMAP_TYPE_CUBE";break;case ys:t="ENVMAP_TYPE_CUBE_UV";break}return t}function wv(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Lr:t="ENVMAP_MODE_REFRACTION";break}return t}function Pv(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Wl:t="ENVMAP_BLENDING_MULTIPLY";break;case Tp:t="ENVMAP_BLENDING_MIX";break;case Cp:t="ENVMAP_BLENDING_ADD";break}return t}function Lv(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Dv(n,t,e,i){const r=n.getContext(),a=e.defines;let s=e.vertexShader,o=e.fragmentShader;const l=Cv(e),c=Rv(e),u=wv(e),h=Pv(e),f=Lv(e),p=xv(e),_=Mv(a),g=r.createProgram();let m,d,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(oa).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(oa).join(`
`),d.length>0&&(d+=`
`)):(m=[Tu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(oa).join(`
`),d=[Tu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==vi?"#define TONE_MAPPING":"",e.toneMapping!==vi?Vt.tonemapping_pars_fragment:"",e.toneMapping!==vi?gv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,_v("linearToOutputTexel",e.outputColorSpace),vv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(oa).join(`
`)),s=xl(s),s=yu(s,e),s=Au(s,e),o=xl(o),o=yu(o,e),o=Au(o,e),s=bu(s),o=bu(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Fc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Fc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const A=E+m+s,x=E+d+o,w=Mu(r,r.VERTEX_SHADER,A),T=Mu(r,r.FRAGMENT_SHADER,x);r.attachShader(g,w),r.attachShader(g,T),e.index0AttributeName!==void 0?r.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function C(R){if(n.debug.checkShaderErrors){const G=r.getProgramInfoLog(g).trim(),B=r.getShaderInfoLog(w).trim(),$=r.getShaderInfoLog(T).trim();let j=!0,k=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,w,T);else{const Z=Eu(r,w,"vertex"),V=Eu(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+G+`
`+Z+`
`+V)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(B===""||$==="")&&(k=!1);k&&(R.diagnostics={runnable:j,programLog:G,vertexShader:{log:B,prefix:m},fragmentShader:{log:$,prefix:d}})}r.deleteShader(w),r.deleteShader(T),D=new cs(r,g),y=Sv(r,g)}let D;this.getUniforms=function(){return D===void 0&&C(this),D};let y;this.getAttributes=function(){return y===void 0&&C(this),y};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(g,dv)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=fv++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=T,this}let Iv=0;class Uv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),a=this._getShaderStage(i),s=this._getShaderCacheForMaterial(t);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Nv(t),e.set(t,i)),i}}class Nv{constructor(t){this.id=Iv++,this.code=t,this.usedTimes=0}}function Ov(n,t,e,i,r,a,s){const o=new od,l=new Uv,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,S,R,G,B){const $=G.fog,j=B.geometry,k=y.isMeshStandardMaterial?G.environment:null,Z=(y.isMeshStandardMaterial?e:t).get(y.envMap||k),V=Z&&Z.mapping===ys?Z.image.height:null,rt=_[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const ht=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,_t=ht!==void 0?ht.length:0;let It=0;j.morphAttributes.position!==void 0&&(It=1),j.morphAttributes.normal!==void 0&&(It=2),j.morphAttributes.color!==void 0&&(It=3);let jt,W,Q,mt;if(rt){const ae=In[rt];jt=ae.vertexShader,W=ae.fragmentShader}else jt=y.vertexShader,W=y.fragmentShader,l.update(y),Q=l.getVertexShaderID(y),mt=l.getFragmentShaderID(y);const at=n.getRenderTarget(),Et=n.state.buffers.depth.getReversed(),Ut=B.isInstancedMesh===!0,Gt=B.isBatchedMesh===!0,xe=!!y.map,Zt=!!y.matcap,Se=!!Z,N=!!y.aoMap,dn=!!y.lightMap,Xt=!!y.bumpMap,qt=!!y.normalMap,At=!!y.displacementMap,me=!!y.emissiveMap,yt=!!y.metalnessMap,b=!!y.roughnessMap,v=y.anisotropy>0,O=y.clearcoat>0,q=y.dispersion>0,K=y.iridescence>0,X=y.sheen>0,Mt=y.transmission>0,ot=v&&!!y.anisotropyMap,dt=O&&!!y.clearcoatMap,Kt=O&&!!y.clearcoatNormalMap,tt=O&&!!y.clearcoatRoughnessMap,ft=K&&!!y.iridescenceMap,Tt=K&&!!y.iridescenceThicknessMap,Rt=X&&!!y.sheenColorMap,pt=X&&!!y.sheenRoughnessMap,Yt=!!y.specularMap,Bt=!!y.specularColorMap,fe=!!y.specularIntensityMap,L=Mt&&!!y.transmissionMap,st=Mt&&!!y.thicknessMap,H=!!y.gradientMap,Y=!!y.alphaMap,ut=y.alphaTest>0,lt=!!y.alphaHash,Nt=!!y.extensions;let Me=vi;y.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(Me=n.toneMapping);const Fe={shaderID:rt,shaderType:y.type,shaderName:y.name,vertexShader:jt,fragmentShader:W,defines:y.defines,customVertexShaderID:Q,customFragmentShaderID:mt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Gt,batchingColor:Gt&&B._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&B.instanceColor!==null,instancingMorph:Ut&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:at===null?n.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Br,alphaToCoverage:!!y.alphaToCoverage,map:xe,matcap:Zt,envMap:Se,envMapMode:Se&&Z.mapping,envMapCubeUVHeight:V,aoMap:N,lightMap:dn,bumpMap:Xt,normalMap:qt,displacementMap:f&&At,emissiveMap:me,normalMapObjectSpace:qt&&y.normalMapType===Pp,normalMapTangentSpace:qt&&y.normalMapType===nd,metalnessMap:yt,roughnessMap:b,anisotropy:v,anisotropyMap:ot,clearcoat:O,clearcoatMap:dt,clearcoatNormalMap:Kt,clearcoatRoughnessMap:tt,dispersion:q,iridescence:K,iridescenceMap:ft,iridescenceThicknessMap:Tt,sheen:X,sheenColorMap:Rt,sheenRoughnessMap:pt,specularMap:Yt,specularColorMap:Bt,specularIntensityMap:fe,transmission:Mt,transmissionMap:L,thicknessMap:st,gradientMap:H,opaque:y.transparent===!1&&y.blending===Vi&&y.alphaToCoverage===!1,alphaMap:Y,alphaTest:ut,alphaHash:lt,combine:y.combine,mapUv:xe&&g(y.map.channel),aoMapUv:N&&g(y.aoMap.channel),lightMapUv:dn&&g(y.lightMap.channel),bumpMapUv:Xt&&g(y.bumpMap.channel),normalMapUv:qt&&g(y.normalMap.channel),displacementMapUv:At&&g(y.displacementMap.channel),emissiveMapUv:me&&g(y.emissiveMap.channel),metalnessMapUv:yt&&g(y.metalnessMap.channel),roughnessMapUv:b&&g(y.roughnessMap.channel),anisotropyMapUv:ot&&g(y.anisotropyMap.channel),clearcoatMapUv:dt&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:Kt&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:pt&&g(y.sheenRoughnessMap.channel),specularMapUv:Yt&&g(y.specularMap.channel),specularColorMapUv:Bt&&g(y.specularColorMap.channel),specularIntensityMapUv:fe&&g(y.specularIntensityMap.channel),transmissionMapUv:L&&g(y.transmissionMap.channel),thicknessMapUv:st&&g(y.thicknessMap.channel),alphaMapUv:Y&&g(y.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(qt||v),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!j.attributes.uv&&(xe||Y),fog:!!$,useFog:y.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Et,skinning:B.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:It,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Me,decodeVideoTexture:xe&&y.map.isVideoTexture===!0&&$t.getTransfer(y.map.colorSpace)===oe,decodeVideoTextureEmissive:me&&y.emissiveMap.isVideoTexture===!0&&$t.getTransfer(y.emissiveMap.colorSpace)===oe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===An,flipSided:y.side===Ye,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Nt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Nt&&y.extensions.multiDraw===!0||Gt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function d(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const R in y.defines)S.push(R),S.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(E(S,y),A(S,y),S.push(n.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function E(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function A(y,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),y.push(o.mask)}function x(y){const S=_[y.type];let R;if(S){const G=In[S];R=Nr.clone(G.uniforms)}else R=y.uniforms;return R}function w(y,S){let R;for(let G=0,B=u.length;G<B;G++){const $=u[G];if($.cacheKey===S){R=$,++R.usedTimes;break}}return R===void 0&&(R=new Dv(n,S,y,a),u.push(R)),R}function T(y){if(--y.usedTimes===0){const S=u.indexOf(y);u[S]=u[u.length-1],u.pop(),y.destroy()}}function C(y){l.remove(y)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:w,releaseProgram:T,releaseShaderCache:C,programs:u,dispose:D}}function Fv(){let n=new WeakMap;function t(s){return n.has(s)}function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function r(s,o,l){n.get(s)[o]=l}function a(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:a}}function zv(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Cu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Ru(){const n=[];let t=0;const e=[],i=[],r=[];function a(){t=0,e.length=0,i.length=0,r.length=0}function s(h,f,p,_,g,m){let d=n[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},n[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=_,d.renderOrder=h.renderOrder,d.z=g,d.group=m),t++,d}function o(h,f,p,_,g,m){const d=s(h,f,p,_,g,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):e.push(d)}function l(h,f,p,_,g,m){const d=s(h,f,p,_,g,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):e.unshift(d)}function c(h,f){e.length>1&&e.sort(h||zv),i.length>1&&i.sort(f||Cu),r.length>1&&r.sort(f||Cu)}function u(){for(let h=t,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:r,init:a,push:o,unshift:l,finish:u,sort:c}}function Bv(){let n=new WeakMap;function t(i,r){const a=n.get(i);let s;return a===void 0?(s=new Ru,n.set(i,[s])):r>=a.length?(s=new Ru,a.push(s)):s=a[r],s}function e(){n=new WeakMap}return{get:t,dispose:e}}function Vv(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Pt};break;case"SpotLight":e={position:new P,direction:new P,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":e={color:new Pt,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function Gv(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Hv=0;function kv(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Wv(n){const t=new Vv,e=Gv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const r=new P,a=new re,s=new re;function o(c){let u=0,h=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let p=0,_=0,g=0,m=0,d=0,E=0,A=0,x=0,w=0,T=0,C=0;c.sort(kv);for(let y=0,S=c.length;y<S;y++){const R=c[y],G=R.color,B=R.intensity,$=R.distance,j=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=G.r*B,h+=G.g*B,f+=G.b*B;else if(R.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(R.sh.coefficients[k],B);C++}else if(R.isDirectionalLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Z=R.shadow,V=e.get(R);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,i.directionalShadow[p]=V,i.directionalShadowMap[p]=j,i.directionalShadowMatrix[p]=R.shadow.matrix,E++}i.directional[p]=k,p++}else if(R.isSpotLight){const k=t.get(R);k.position.setFromMatrixPosition(R.matrixWorld),k.color.copy(G).multiplyScalar(B),k.distance=$,k.coneCos=Math.cos(R.angle),k.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),k.decay=R.decay,i.spot[g]=k;const Z=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,Z.updateMatrices(R),R.castShadow&&T++),i.spotLightMatrix[g]=Z.matrix,R.castShadow){const V=e.get(R);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,i.spotShadow[g]=V,i.spotShadowMap[g]=j,x++}g++}else if(R.isRectAreaLight){const k=t.get(R);k.color.copy(G).multiplyScalar(B),k.halfWidth.set(R.width*.5,0,0),k.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=k,m++}else if(R.isPointLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),k.distance=R.distance,k.decay=R.decay,R.castShadow){const Z=R.shadow,V=e.get(R);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,V.shadowCameraNear=Z.camera.near,V.shadowCameraFar=Z.camera.far,i.pointShadow[_]=V,i.pointShadowMap[_]=j,i.pointShadowMatrix[_]=R.shadow.matrix,A++}i.point[_]=k,_++}else if(R.isHemisphereLight){const k=t.get(R);k.skyColor.copy(R.color).multiplyScalar(B),k.groundColor.copy(R.groundColor).multiplyScalar(B),i.hemi[d]=k,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=it.LTC_FLOAT_1,i.rectAreaLTC2=it.LTC_FLOAT_2):(i.rectAreaLTC1=it.LTC_HALF_1,i.rectAreaLTC2=it.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const D=i.hash;(D.directionalLength!==p||D.pointLength!==_||D.spotLength!==g||D.rectAreaLength!==m||D.hemiLength!==d||D.numDirectionalShadows!==E||D.numPointShadows!==A||D.numSpotShadows!==x||D.numSpotMaps!==w||D.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=x+w-T,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,D.directionalLength=p,D.pointLength=_,D.spotLength=g,D.rectAreaLength=m,D.hemiLength=d,D.numDirectionalShadows=E,D.numPointShadows=A,D.numSpotShadows=x,D.numSpotMaps=w,D.numLightProbes=C,i.version=Hv++)}function l(c,u){let h=0,f=0,p=0,_=0,g=0;const m=u.matrixWorldInverse;for(let d=0,E=c.length;d<E;d++){const A=c[d];if(A.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),h++}else if(A.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(A.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),p++}else if(A.isRectAreaLight){const x=i.rectArea[_];x.position.setFromMatrixPosition(A.matrixWorld),x.position.applyMatrix4(m),s.identity(),a.copy(A.matrixWorld),a.premultiply(m),s.extractRotation(a),x.halfWidth.set(A.width*.5,0,0),x.halfHeight.set(0,A.height*.5,0),x.halfWidth.applyMatrix4(s),x.halfHeight.applyMatrix4(s),_++}else if(A.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(A.matrixWorld),x.position.applyMatrix4(m),f++}else if(A.isHemisphereLight){const x=i.hemi[g];x.direction.setFromMatrixPosition(A.matrixWorld),x.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function wu(n){const t=new Wv(n),e=[],i=[];function r(u){c.camera=u,e.length=0,i.length=0}function a(u){e.push(u)}function s(u){i.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:s}}function Xv(n){let t=new WeakMap;function e(r,a=0){const s=t.get(r);let o;return s===void 0?(o=new wu(n),t.set(r,[o])):a>=s.length?(o=new wu(n),s.push(o)):o=s[a],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class vd extends Ai{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=wp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class qv extends Ai{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Yv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$v=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function jv(n,t,e){let i=new nc;const r=new bt,a=new bt,s=new he,o=new vd({depthPacking:ed}),l=new qv,c={},u=e.maxTextureSize,h={[Si]:Ye,[Ye]:Si,[An]:An},f=new Ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:Yv,fragmentShader:$v}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new Oe;_.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new De(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fh;let d=this.type;this.render=function(T,C,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const y=n.getRenderTarget(),S=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),G=n.state;G.setBlending(Fn),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const B=d!==$n&&this.type===$n,$=d===$n&&this.type!==$n;for(let j=0,k=T.length;j<k;j++){const Z=T[j],V=Z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const rt=V.getFrameExtents();if(r.multiply(rt),a.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/rt.x),r.x=a.x*rt.x,V.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/rt.y),r.y=a.y*rt.y,V.mapSize.y=a.y)),V.map===null||B===!0||$===!0){const _t=this.type!==$n?{minFilter:Te,magFilter:Te}:{};V.map!==null&&V.map.dispose(),V.map=new gn(r.x,r.y,_t),V.map.texture.name=Z.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const ht=V.getViewportCount();for(let _t=0;_t<ht;_t++){const It=V.getViewport(_t);s.set(a.x*It.x,a.y*It.y,a.x*It.z,a.y*It.w),G.viewport(s),V.updateMatrices(Z,_t),i=V.getFrustum(),x(C,D,V.camera,Z,this.type)}V.isPointLightShadow!==!0&&this.type===$n&&E(V,D),V.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(y,S,R)};function E(T,C){const D=t.update(g);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new gn(r.x,r.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(C,null,D,f,g,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(C,null,D,p,g,null)}function A(T,C,D,y){let S=null;const R=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)S=R;else if(S=D.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const G=S.uuid,B=C.uuid;let $=c[G];$===void 0&&($={},c[G]=$);let j=$[B];j===void 0&&(j=S.clone(),$[B]=j,C.addEventListener("dispose",w)),S=j}if(S.visible=C.visible,S.wireframe=C.wireframe,y===$n?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:h[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const G=n.properties.get(S);G.light=D}return S}function x(T,C,D,y,S){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===$n)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);const B=t.update(T),$=T.material;if(Array.isArray($)){const j=B.groups;for(let k=0,Z=j.length;k<Z;k++){const V=j[k],rt=$[V.materialIndex];if(rt&&rt.visible){const ht=A(T,rt,y,S);T.onBeforeShadow(n,T,C,D,B,ht,V),n.renderBufferDirect(D,null,B,ht,T,V),T.onAfterShadow(n,T,C,D,B,ht,V)}}}else if($.visible){const j=A(T,$,y,S);T.onBeforeShadow(n,T,C,D,B,j,null),n.renderBufferDirect(D,null,B,j,T,null),T.onAfterShadow(n,T,C,D,B,j,null)}}const G=T.children;for(let B=0,$=G.length;B<$;B++)x(G[B],C,D,y,S)}function w(T){T.target.removeEventListener("dispose",w);for(const D in c){const y=c[D],S=T.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const Zv={[No]:Oo,[Fo]:Vo,[zo]:Go,[wr]:Bo,[Oo]:No,[Vo]:Fo,[Go]:zo,[Bo]:wr};function Kv(n,t){function e(){let L=!1;const st=new he;let H=null;const Y=new he(0,0,0,0);return{setMask:function(ut){H!==ut&&!L&&(n.colorMask(ut,ut,ut,ut),H=ut)},setLocked:function(ut){L=ut},setClear:function(ut,lt,Nt,Me,Fe){Fe===!0&&(ut*=Me,lt*=Me,Nt*=Me),st.set(ut,lt,Nt,Me),Y.equals(st)===!1&&(n.clearColor(ut,lt,Nt,Me),Y.copy(st))},reset:function(){L=!1,H=null,Y.set(-1,0,0,0)}}}function i(){let L=!1,st=!1,H=null,Y=null,ut=null;return{setReversed:function(lt){if(st!==lt){const Nt=t.get("EXT_clip_control");st?Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.ZERO_TO_ONE_EXT):Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.NEGATIVE_ONE_TO_ONE_EXT);const Me=ut;ut=null,this.setClear(Me)}st=lt},getReversed:function(){return st},setTest:function(lt){lt?at(n.DEPTH_TEST):Et(n.DEPTH_TEST)},setMask:function(lt){H!==lt&&!L&&(n.depthMask(lt),H=lt)},setFunc:function(lt){if(st&&(lt=Zv[lt]),Y!==lt){switch(lt){case No:n.depthFunc(n.NEVER);break;case Oo:n.depthFunc(n.ALWAYS);break;case Fo:n.depthFunc(n.LESS);break;case wr:n.depthFunc(n.LEQUAL);break;case zo:n.depthFunc(n.EQUAL);break;case Bo:n.depthFunc(n.GEQUAL);break;case Vo:n.depthFunc(n.GREATER);break;case Go:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Y=lt}},setLocked:function(lt){L=lt},setClear:function(lt){ut!==lt&&(st&&(lt=1-lt),n.clearDepth(lt),ut=lt)},reset:function(){L=!1,H=null,Y=null,ut=null,st=!1}}}function r(){let L=!1,st=null,H=null,Y=null,ut=null,lt=null,Nt=null,Me=null,Fe=null;return{setTest:function(ae){L||(ae?at(n.STENCIL_TEST):Et(n.STENCIL_TEST))},setMask:function(ae){st!==ae&&!L&&(n.stencilMask(ae),st=ae)},setFunc:function(ae,xn,Gn){(H!==ae||Y!==xn||ut!==Gn)&&(n.stencilFunc(ae,xn,Gn),H=ae,Y=xn,ut=Gn)},setOp:function(ae,xn,Gn){(lt!==ae||Nt!==xn||Me!==Gn)&&(n.stencilOp(ae,xn,Gn),lt=ae,Nt=xn,Me=Gn)},setLocked:function(ae){L=ae},setClear:function(ae){Fe!==ae&&(n.clearStencil(ae),Fe=ae)},reset:function(){L=!1,st=null,H=null,Y=null,ut=null,lt=null,Nt=null,Me=null,Fe=null}}}const a=new e,s=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],_=null,g=!1,m=null,d=null,E=null,A=null,x=null,w=null,T=null,C=new Pt(0,0,0),D=0,y=!1,S=null,R=null,G=null,B=null,$=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,Z=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(V)[1]),k=Z>=1):V.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),k=Z>=2);let rt=null,ht={};const _t=n.getParameter(n.SCISSOR_BOX),It=n.getParameter(n.VIEWPORT),jt=new he().fromArray(_t),W=new he().fromArray(It);function Q(L,st,H,Y){const ut=new Uint8Array(4),lt=n.createTexture();n.bindTexture(L,lt),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Nt=0;Nt<H;Nt++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(st,0,n.RGBA,1,1,Y,0,n.RGBA,n.UNSIGNED_BYTE,ut):n.texImage2D(st+Nt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ut);return lt}const mt={};mt[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),mt[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),mt[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),at(n.DEPTH_TEST),s.setFunc(wr),Xt(!1),qt(Ic),at(n.CULL_FACE),N(Fn);function at(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function Et(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Ut(L,st){return h[L]!==st?(n.bindFramebuffer(L,st),h[L]=st,L===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=st),L===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=st),!0):!1}function Gt(L,st){let H=p,Y=!1;if(L){H=f.get(st),H===void 0&&(H=[],f.set(st,H));const ut=L.textures;if(H.length!==ut.length||H[0]!==n.COLOR_ATTACHMENT0){for(let lt=0,Nt=ut.length;lt<Nt;lt++)H[lt]=n.COLOR_ATTACHMENT0+lt;H.length=ut.length,Y=!0}}else H[0]!==n.BACK&&(H[0]=n.BACK,Y=!0);Y&&n.drawBuffers(H)}function xe(L){return _!==L?(n.useProgram(L),_=L,!0):!1}const Zt={[Ni]:n.FUNC_ADD,[cp]:n.FUNC_SUBTRACT,[up]:n.FUNC_REVERSE_SUBTRACT};Zt[hp]=n.MIN,Zt[dp]=n.MAX;const Se={[fp]:n.ZERO,[pp]:n.ONE,[mp]:n.SRC_COLOR,[Io]:n.SRC_ALPHA,[Sp]:n.SRC_ALPHA_SATURATE,[xp]:n.DST_COLOR,[gp]:n.DST_ALPHA,[_p]:n.ONE_MINUS_SRC_COLOR,[Uo]:n.ONE_MINUS_SRC_ALPHA,[Mp]:n.ONE_MINUS_DST_COLOR,[vp]:n.ONE_MINUS_DST_ALPHA,[Ep]:n.CONSTANT_COLOR,[yp]:n.ONE_MINUS_CONSTANT_COLOR,[Ap]:n.CONSTANT_ALPHA,[bp]:n.ONE_MINUS_CONSTANT_ALPHA};function N(L,st,H,Y,ut,lt,Nt,Me,Fe,ae){if(L===Fn){g===!0&&(Et(n.BLEND),g=!1);return}if(g===!1&&(at(n.BLEND),g=!0),L!==lp){if(L!==m||ae!==y){if((d!==Ni||x!==Ni)&&(n.blendEquation(n.FUNC_ADD),d=Ni,x=Ni),ae)switch(L){case Vi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rr:n.blendFunc(n.ONE,n.ONE);break;case Uc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Nc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Vi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rr:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Uc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Nc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}E=null,A=null,w=null,T=null,C.set(0,0,0),D=0,m=L,y=ae}return}ut=ut||st,lt=lt||H,Nt=Nt||Y,(st!==d||ut!==x)&&(n.blendEquationSeparate(Zt[st],Zt[ut]),d=st,x=ut),(H!==E||Y!==A||lt!==w||Nt!==T)&&(n.blendFuncSeparate(Se[H],Se[Y],Se[lt],Se[Nt]),E=H,A=Y,w=lt,T=Nt),(Me.equals(C)===!1||Fe!==D)&&(n.blendColor(Me.r,Me.g,Me.b,Fe),C.copy(Me),D=Fe),m=L,y=!1}function dn(L,st){L.side===An?Et(n.CULL_FACE):at(n.CULL_FACE);let H=L.side===Ye;st&&(H=!H),Xt(H),L.blending===Vi&&L.transparent===!1?N(Fn):N(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),a.setMask(L.colorWrite);const Y=L.stencilWrite;o.setTest(Y),Y&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),me(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?at(n.SAMPLE_ALPHA_TO_COVERAGE):Et(n.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(L){S!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),S=L)}function qt(L){L!==ap?(at(n.CULL_FACE),L!==R&&(L===Ic?n.cullFace(n.BACK):L===sp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Et(n.CULL_FACE),R=L}function At(L){L!==G&&(k&&n.lineWidth(L),G=L)}function me(L,st,H){L?(at(n.POLYGON_OFFSET_FILL),(B!==st||$!==H)&&(n.polygonOffset(st,H),B=st,$=H)):Et(n.POLYGON_OFFSET_FILL)}function yt(L){L?at(n.SCISSOR_TEST):Et(n.SCISSOR_TEST)}function b(L){L===void 0&&(L=n.TEXTURE0+j-1),rt!==L&&(n.activeTexture(L),rt=L)}function v(L,st,H){H===void 0&&(rt===null?H=n.TEXTURE0+j-1:H=rt);let Y=ht[H];Y===void 0&&(Y={type:void 0,texture:void 0},ht[H]=Y),(Y.type!==L||Y.texture!==st)&&(rt!==H&&(n.activeTexture(H),rt=H),n.bindTexture(L,st||mt[L]),Y.type=L,Y.texture=st)}function O(){const L=ht[rt];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function q(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function X(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Mt(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ot(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function dt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Kt(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ft(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Tt(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Rt(L){jt.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),jt.copy(L))}function pt(L){W.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),W.copy(L))}function Yt(L,st){let H=c.get(st);H===void 0&&(H=new WeakMap,c.set(st,H));let Y=H.get(L);Y===void 0&&(Y=n.getUniformBlockIndex(st,L.name),H.set(L,Y))}function Bt(L,st){const Y=c.get(st).get(L);l.get(st)!==Y&&(n.uniformBlockBinding(st,Y,L.__bindingPointIndex),l.set(st,Y))}function fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},rt=null,ht={},h={},f=new WeakMap,p=[],_=null,g=!1,m=null,d=null,E=null,A=null,x=null,w=null,T=null,C=new Pt(0,0,0),D=0,y=!1,S=null,R=null,G=null,B=null,$=null,jt.set(0,0,n.canvas.width,n.canvas.height),W.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:at,disable:Et,bindFramebuffer:Ut,drawBuffers:Gt,useProgram:xe,setBlending:N,setMaterial:dn,setFlipSided:Xt,setCullFace:qt,setLineWidth:At,setPolygonOffset:me,setScissorTest:yt,activeTexture:b,bindTexture:v,unbindTexture:O,compressedTexImage2D:q,compressedTexImage3D:K,texImage2D:ft,texImage3D:Tt,updateUBOMapping:Yt,uniformBlockBinding:Bt,texStorage2D:Kt,texStorage3D:tt,texSubImage2D:X,texSubImage3D:Mt,compressedTexSubImage2D:ot,compressedTexSubImage3D:dt,scissor:Rt,viewport:pt,reset:fe}}function Pu(n,t,e,i){const r=Jv(i);switch(e){case jh:return n*t;case Kh:return n*t;case Jh:return n*t*2;case $l:return n*t/r.components*r.byteLength;case jl:return n*t/r.components*r.byteLength;case Qh:return n*t*2/r.components*r.byteLength;case Zl:return n*t*2/r.components*r.byteLength;case Zh:return n*t*3/r.components*r.byteLength;case Tn:return n*t*4/r.components*r.byteLength;case Kl:return n*t*4/r.components*r.byteLength;case rs:case as:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ss:case os:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Yo:case jo:return Math.max(n,16)*Math.max(t,8)/4;case qo:case $o:return Math.max(n,8)*Math.max(t,8)/2;case Zo:case Ko:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Jo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Qo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case tl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case el:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case nl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case il:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case rl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case al:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case sl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ol:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ll:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case cl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ul:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case hl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case dl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ls:case fl:case pl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case td:case ml:return Math.ceil(n/4)*Math.ceil(t/4)*8;case _l:case gl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jv(n){switch(n){case ti:case qh:return{byteLength:1,components:1};case pa:case Yh:case zn:return{byteLength:2,components:1};case ql:case Yl:return{byteLength:2,components:4};case Gi:case Xl:case On:return{byteLength:4,components:1};case $h:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Qv(n,t,e,i,r,a,s){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new bt,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,v){return p?new OffscreenCanvas(b,v):_a("canvas")}function g(b,v,O){let q=1;const K=yt(b);if((K.width>O||K.height>O)&&(q=O/Math.max(K.width,K.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const X=Math.floor(q*K.width),Mt=Math.floor(q*K.height);h===void 0&&(h=_(X,Mt));const ot=v?_(X,Mt):h;return ot.width=X,ot.height=Mt,ot.getContext("2d").drawImage(b,0,0,X,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+X+"x"+Mt+")."),ot}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),b;return b}function m(b){return b.generateMipmaps}function d(b){n.generateMipmap(b)}function E(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(b,v,O,q,K=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let X=v;if(v===n.RED&&(O===n.FLOAT&&(X=n.R32F),O===n.HALF_FLOAT&&(X=n.R16F),O===n.UNSIGNED_BYTE&&(X=n.R8)),v===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(X=n.R8UI),O===n.UNSIGNED_SHORT&&(X=n.R16UI),O===n.UNSIGNED_INT&&(X=n.R32UI),O===n.BYTE&&(X=n.R8I),O===n.SHORT&&(X=n.R16I),O===n.INT&&(X=n.R32I)),v===n.RG&&(O===n.FLOAT&&(X=n.RG32F),O===n.HALF_FLOAT&&(X=n.RG16F),O===n.UNSIGNED_BYTE&&(X=n.RG8)),v===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(X=n.RG8UI),O===n.UNSIGNED_SHORT&&(X=n.RG16UI),O===n.UNSIGNED_INT&&(X=n.RG32UI),O===n.BYTE&&(X=n.RG8I),O===n.SHORT&&(X=n.RG16I),O===n.INT&&(X=n.RG32I)),v===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(X=n.RGB8UI),O===n.UNSIGNED_SHORT&&(X=n.RGB16UI),O===n.UNSIGNED_INT&&(X=n.RGB32UI),O===n.BYTE&&(X=n.RGB8I),O===n.SHORT&&(X=n.RGB16I),O===n.INT&&(X=n.RGB32I)),v===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),O===n.UNSIGNED_INT&&(X=n.RGBA32UI),O===n.BYTE&&(X=n.RGBA8I),O===n.SHORT&&(X=n.RGBA16I),O===n.INT&&(X=n.RGBA32I)),v===n.RGB&&O===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),v===n.RGBA){const Mt=K?As:$t.getTransfer(q);O===n.FLOAT&&(X=n.RGBA32F),O===n.HALF_FLOAT&&(X=n.RGBA16F),O===n.UNSIGNED_BYTE&&(X=Mt===oe?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function x(b,v){let O;return b?v===null||v===Gi||v===Dr?O=n.DEPTH24_STENCIL8:v===On?O=n.DEPTH32F_STENCIL8:v===pa&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Gi||v===Dr?O=n.DEPTH_COMPONENT24:v===On?O=n.DEPTH_COMPONENT32F:v===pa&&(O=n.DEPTH_COMPONENT16),O}function w(b,v){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Te&&b.minFilter!==Nn?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function T(b){const v=b.target;v.removeEventListener("dispose",T),D(v),v.isVideoTexture&&u.delete(v)}function C(b){const v=b.target;v.removeEventListener("dispose",C),S(v)}function D(b){const v=i.get(b);if(v.__webglInit===void 0)return;const O=b.source,q=f.get(O);if(q){const K=q[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&y(b),Object.keys(q).length===0&&f.delete(O)}i.remove(b)}function y(b){const v=i.get(b);n.deleteTexture(v.__webglTexture);const O=b.source,q=f.get(O);delete q[v.__cacheKey],s.memory.textures--}function S(b){const v=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let K=0;K<v.__webglFramebuffer[q].length;K++)n.deleteFramebuffer(v.__webglFramebuffer[q][K]);else n.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)n.deleteFramebuffer(v.__webglFramebuffer[q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=b.textures;for(let q=0,K=O.length;q<K;q++){const X=i.get(O[q]);X.__webglTexture&&(n.deleteTexture(X.__webglTexture),s.memory.textures--),i.remove(O[q])}i.remove(b)}let R=0;function G(){R=0}function B(){const b=R;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),R+=1,b}function $(b){const v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function j(b,v){const O=i.get(b);if(b.isVideoTexture&&At(b),b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){const q=b.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(O,b,v);return}}e.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+v)}function k(b,v){const O=i.get(b);if(b.version>0&&O.__version!==b.version){W(O,b,v);return}e.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+v)}function Z(b,v){const O=i.get(b);if(b.version>0&&O.__version!==b.version){W(O,b,v);return}e.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+v)}function V(b,v){const O=i.get(b);if(b.version>0&&O.__version!==b.version){Q(O,b,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+v)}const rt={[Wo]:n.REPEAT,[gi]:n.CLAMP_TO_EDGE,[Xo]:n.MIRRORED_REPEAT},ht={[Te]:n.NEAREST,[Xh]:n.NEAREST_MIPMAP_NEAREST,[aa]:n.NEAREST_MIPMAP_LINEAR,[Nn]:n.LINEAR,[Os]:n.LINEAR_MIPMAP_NEAREST,[Fi]:n.LINEAR_MIPMAP_LINEAR},_t={[Lp]:n.NEVER,[Fp]:n.ALWAYS,[Dp]:n.LESS,[id]:n.LEQUAL,[Ip]:n.EQUAL,[Op]:n.GEQUAL,[Up]:n.GREATER,[Np]:n.NOTEQUAL};function It(b,v){if(v.type===On&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Nn||v.magFilter===Os||v.magFilter===aa||v.magFilter===Fi||v.minFilter===Nn||v.minFilter===Os||v.minFilter===aa||v.minFilter===Fi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,rt[v.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,rt[v.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,rt[v.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,ht[v.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,ht[v.minFilter]),v.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,_t[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Te||v.minFilter!==aa&&v.minFilter!==Fi||v.type===On&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");n.texParameterf(b,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function jt(b,v){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",T));const q=v.source;let K=f.get(q);K===void 0&&(K={},f.set(q,K));const X=$(v);if(X!==b.__cacheKey){K[X]===void 0&&(K[X]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,O=!0),K[X].usedTimes++;const Mt=K[b.__cacheKey];Mt!==void 0&&(K[b.__cacheKey].usedTimes--,Mt.usedTimes===0&&y(v)),b.__cacheKey=X,b.__webglTexture=K[X].texture}return O}function W(b,v,O){let q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=n.TEXTURE_3D);const K=jt(b,v),X=v.source;e.bindTexture(q,b.__webglTexture,n.TEXTURE0+O);const Mt=i.get(X);if(X.version!==Mt.__version||K===!0){e.activeTexture(n.TEXTURE0+O);const ot=$t.getPrimaries($t.workingColorSpace),dt=v.colorSpace===mi?null:$t.getPrimaries(v.colorSpace),Kt=v.colorSpace===mi||ot===dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let tt=g(v.image,!1,r.maxTextureSize);tt=me(v,tt);const ft=a.convert(v.format,v.colorSpace),Tt=a.convert(v.type);let Rt=A(v.internalFormat,ft,Tt,v.colorSpace,v.isVideoTexture);It(q,v);let pt;const Yt=v.mipmaps,Bt=v.isVideoTexture!==!0,fe=Mt.__version===void 0||K===!0,L=X.dataReady,st=w(v,tt);if(v.isDepthTexture)Rt=x(v.format===Ir,v.type),fe&&(Bt?e.texStorage2D(n.TEXTURE_2D,1,Rt,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,Rt,tt.width,tt.height,0,ft,Tt,null));else if(v.isDataTexture)if(Yt.length>0){Bt&&fe&&e.texStorage2D(n.TEXTURE_2D,st,Rt,Yt[0].width,Yt[0].height);for(let H=0,Y=Yt.length;H<Y;H++)pt=Yt[H],Bt?L&&e.texSubImage2D(n.TEXTURE_2D,H,0,0,pt.width,pt.height,ft,Tt,pt.data):e.texImage2D(n.TEXTURE_2D,H,Rt,pt.width,pt.height,0,ft,Tt,pt.data);v.generateMipmaps=!1}else Bt?(fe&&e.texStorage2D(n.TEXTURE_2D,st,Rt,tt.width,tt.height),L&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,tt.width,tt.height,ft,Tt,tt.data)):e.texImage2D(n.TEXTURE_2D,0,Rt,tt.width,tt.height,0,ft,Tt,tt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Bt&&fe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,st,Rt,Yt[0].width,Yt[0].height,tt.depth);for(let H=0,Y=Yt.length;H<Y;H++)if(pt=Yt[H],v.format!==Tn)if(ft!==null)if(Bt){if(L)if(v.layerUpdates.size>0){const ut=Pu(pt.width,pt.height,v.format,v.type);for(const lt of v.layerUpdates){const Nt=pt.data.subarray(lt*ut/pt.data.BYTES_PER_ELEMENT,(lt+1)*ut/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,H,0,0,lt,pt.width,pt.height,1,ft,Nt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,H,0,0,0,pt.width,pt.height,tt.depth,ft,pt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,H,Rt,pt.width,pt.height,tt.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?L&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,H,0,0,0,pt.width,pt.height,tt.depth,ft,Tt,pt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,H,Rt,pt.width,pt.height,tt.depth,0,ft,Tt,pt.data)}else{Bt&&fe&&e.texStorage2D(n.TEXTURE_2D,st,Rt,Yt[0].width,Yt[0].height);for(let H=0,Y=Yt.length;H<Y;H++)pt=Yt[H],v.format!==Tn?ft!==null?Bt?L&&e.compressedTexSubImage2D(n.TEXTURE_2D,H,0,0,pt.width,pt.height,ft,pt.data):e.compressedTexImage2D(n.TEXTURE_2D,H,Rt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?L&&e.texSubImage2D(n.TEXTURE_2D,H,0,0,pt.width,pt.height,ft,Tt,pt.data):e.texImage2D(n.TEXTURE_2D,H,Rt,pt.width,pt.height,0,ft,Tt,pt.data)}else if(v.isDataArrayTexture)if(Bt){if(fe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,st,Rt,tt.width,tt.height,tt.depth),L)if(v.layerUpdates.size>0){const H=Pu(tt.width,tt.height,v.format,v.type);for(const Y of v.layerUpdates){const ut=tt.data.subarray(Y*H/tt.data.BYTES_PER_ELEMENT,(Y+1)*H/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Y,tt.width,tt.height,1,ft,Tt,ut)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ft,Tt,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Rt,tt.width,tt.height,tt.depth,0,ft,Tt,tt.data);else if(v.isData3DTexture)Bt?(fe&&e.texStorage3D(n.TEXTURE_3D,st,Rt,tt.width,tt.height,tt.depth),L&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ft,Tt,tt.data)):e.texImage3D(n.TEXTURE_3D,0,Rt,tt.width,tt.height,tt.depth,0,ft,Tt,tt.data);else if(v.isFramebufferTexture){if(fe)if(Bt)e.texStorage2D(n.TEXTURE_2D,st,Rt,tt.width,tt.height);else{let H=tt.width,Y=tt.height;for(let ut=0;ut<st;ut++)e.texImage2D(n.TEXTURE_2D,ut,Rt,H,Y,0,ft,Tt,null),H>>=1,Y>>=1}}else if(Yt.length>0){if(Bt&&fe){const H=yt(Yt[0]);e.texStorage2D(n.TEXTURE_2D,st,Rt,H.width,H.height)}for(let H=0,Y=Yt.length;H<Y;H++)pt=Yt[H],Bt?L&&e.texSubImage2D(n.TEXTURE_2D,H,0,0,ft,Tt,pt):e.texImage2D(n.TEXTURE_2D,H,Rt,ft,Tt,pt);v.generateMipmaps=!1}else if(Bt){if(fe){const H=yt(tt);e.texStorage2D(n.TEXTURE_2D,st,Rt,H.width,H.height)}L&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft,Tt,tt)}else e.texImage2D(n.TEXTURE_2D,0,Rt,ft,Tt,tt);m(v)&&d(q),Mt.__version=X.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Q(b,v,O){if(v.image.length!==6)return;const q=jt(b,v),K=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+O);const X=i.get(K);if(K.version!==X.__version||q===!0){e.activeTexture(n.TEXTURE0+O);const Mt=$t.getPrimaries($t.workingColorSpace),ot=v.colorSpace===mi?null:$t.getPrimaries(v.colorSpace),dt=v.colorSpace===mi||Mt===ot?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Kt=v.isCompressedTexture||v.image[0].isCompressedTexture,tt=v.image[0]&&v.image[0].isDataTexture,ft=[];for(let Y=0;Y<6;Y++)!Kt&&!tt?ft[Y]=g(v.image[Y],!0,r.maxCubemapSize):ft[Y]=tt?v.image[Y].image:v.image[Y],ft[Y]=me(v,ft[Y]);const Tt=ft[0],Rt=a.convert(v.format,v.colorSpace),pt=a.convert(v.type),Yt=A(v.internalFormat,Rt,pt,v.colorSpace),Bt=v.isVideoTexture!==!0,fe=X.__version===void 0||q===!0,L=K.dataReady;let st=w(v,Tt);It(n.TEXTURE_CUBE_MAP,v);let H;if(Kt){Bt&&fe&&e.texStorage2D(n.TEXTURE_CUBE_MAP,st,Yt,Tt.width,Tt.height);for(let Y=0;Y<6;Y++){H=ft[Y].mipmaps;for(let ut=0;ut<H.length;ut++){const lt=H[ut];v.format!==Tn?Rt!==null?Bt?L&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ut,0,0,lt.width,lt.height,Rt,lt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ut,Yt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ut,0,0,lt.width,lt.height,Rt,pt,lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ut,Yt,lt.width,lt.height,0,Rt,pt,lt.data)}}}else{if(H=v.mipmaps,Bt&&fe){H.length>0&&st++;const Y=yt(ft[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,st,Yt,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(tt){Bt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ft[Y].width,ft[Y].height,Rt,pt,ft[Y].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Yt,ft[Y].width,ft[Y].height,0,Rt,pt,ft[Y].data);for(let ut=0;ut<H.length;ut++){const Nt=H[ut].image[Y].image;Bt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ut+1,0,0,Nt.width,Nt.height,Rt,pt,Nt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ut+1,Yt,Nt.width,Nt.height,0,Rt,pt,Nt.data)}}else{Bt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Rt,pt,ft[Y]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Yt,Rt,pt,ft[Y]);for(let ut=0;ut<H.length;ut++){const lt=H[ut];Bt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ut+1,0,0,Rt,pt,lt.image[Y]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ut+1,Yt,Rt,pt,lt.image[Y])}}}m(v)&&d(n.TEXTURE_CUBE_MAP),X.__version=K.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function mt(b,v,O,q,K,X){const Mt=a.convert(O.format,O.colorSpace),ot=a.convert(O.type),dt=A(O.internalFormat,Mt,ot,O.colorSpace),Kt=i.get(v),tt=i.get(O);if(tt.__renderTarget=v,!Kt.__hasExternalTextures){const ft=Math.max(1,v.width>>X),Tt=Math.max(1,v.height>>X);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,X,dt,ft,Tt,v.depth,0,Mt,ot,null):e.texImage2D(K,X,dt,ft,Tt,0,Mt,ot,null)}e.bindFramebuffer(n.FRAMEBUFFER,b),qt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,K,tt.__webglTexture,0,Xt(v)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,K,tt.__webglTexture,X),e.bindFramebuffer(n.FRAMEBUFFER,null)}function at(b,v,O){if(n.bindRenderbuffer(n.RENDERBUFFER,b),v.depthBuffer){const q=v.depthTexture,K=q&&q.isDepthTexture?q.type:null,X=x(v.stencilBuffer,K),Mt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=Xt(v);qt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot,X,v.width,v.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,X,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,X,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Mt,n.RENDERBUFFER,b)}else{const q=v.textures;for(let K=0;K<q.length;K++){const X=q[K],Mt=a.convert(X.format,X.colorSpace),ot=a.convert(X.type),dt=A(X.internalFormat,Mt,ot,X.colorSpace),Kt=Xt(v);O&&qt(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Kt,dt,v.width,v.height):qt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Kt,dt,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,dt,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Et(b,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j(v.depthTexture,0);const K=q.__webglTexture,X=Xt(v);if(v.depthTexture.format===yr)qt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(v.depthTexture.format===Ir)qt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ut(b){const v=i.get(b),O=b.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==b.depthTexture){const q=b.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",K)};q.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=q}if(b.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Et(v.__webglFramebuffer,b)}else if(O){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=n.createRenderbuffer(),at(v.__webglDepthbuffer[q],b,!1);else{const K=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,X)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),at(v.__webglDepthbuffer,b,!1);else{const q=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,K)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(b,v,O){const q=i.get(b);v!==void 0&&mt(q.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Ut(b)}function xe(b){const v=b.texture,O=i.get(b),q=i.get(v);b.addEventListener("dispose",C);const K=b.textures,X=b.isWebGLCubeRenderTarget===!0,Mt=K.length>1;if(Mt||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=v.version,s.memory.textures++),X){O.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[ot]=[];for(let dt=0;dt<v.mipmaps.length;dt++)O.__webglFramebuffer[ot][dt]=n.createFramebuffer()}else O.__webglFramebuffer[ot]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let ot=0;ot<v.mipmaps.length;ot++)O.__webglFramebuffer[ot]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Mt)for(let ot=0,dt=K.length;ot<dt;ot++){const Kt=i.get(K[ot]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=n.createTexture(),s.memory.textures++)}if(b.samples>0&&qt(b)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ot=0;ot<K.length;ot++){const dt=K[ot];O.__webglColorRenderbuffer[ot]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[ot]);const Kt=a.convert(dt.format,dt.colorSpace),tt=a.convert(dt.type),ft=A(dt.internalFormat,Kt,tt,dt.colorSpace,b.isXRRenderTarget===!0),Tt=Xt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Tt,ft,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ot,n.RENDERBUFFER,O.__webglColorRenderbuffer[ot])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),at(O.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(X){e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),It(n.TEXTURE_CUBE_MAP,v);for(let ot=0;ot<6;ot++)if(v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)mt(O.__webglFramebuffer[ot][dt],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,dt);else mt(O.__webglFramebuffer[ot],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(v)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let ot=0,dt=K.length;ot<dt;ot++){const Kt=K[ot],tt=i.get(Kt);e.bindTexture(n.TEXTURE_2D,tt.__webglTexture),It(n.TEXTURE_2D,Kt),mt(O.__webglFramebuffer,b,Kt,n.COLOR_ATTACHMENT0+ot,n.TEXTURE_2D,0),m(Kt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let ot=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ot=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ot,q.__webglTexture),It(ot,v),v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)mt(O.__webglFramebuffer[dt],b,v,n.COLOR_ATTACHMENT0,ot,dt);else mt(O.__webglFramebuffer,b,v,n.COLOR_ATTACHMENT0,ot,0);m(v)&&d(ot),e.unbindTexture()}b.depthBuffer&&Ut(b)}function Zt(b){const v=b.textures;for(let O=0,q=v.length;O<q;O++){const K=v[O];if(m(K)){const X=E(b),Mt=i.get(K).__webglTexture;e.bindTexture(X,Mt),d(X),e.unbindTexture()}}}const Se=[],N=[];function dn(b){if(b.samples>0){if(qt(b)===!1){const v=b.textures,O=b.width,q=b.height;let K=n.COLOR_BUFFER_BIT;const X=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Mt=i.get(b),ot=v.length>1;if(ot)for(let dt=0;dt<v.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let dt=0;dt<v.length;dt++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),ot){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[dt]);const Kt=i.get(v[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Kt,0)}n.blitFramebuffer(0,0,O,q,0,0,O,q,K,n.NEAREST),l===!0&&(Se.length=0,N.length=0,Se.push(n.COLOR_ATTACHMENT0+dt),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Se.push(X),N.push(X),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,N)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Se))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ot)for(let dt=0;dt<v.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[dt]);const Kt=i.get(v[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,Kt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const v=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Xt(b){return Math.min(r.maxSamples,b.samples)}function qt(b){const v=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function At(b){const v=s.render.frame;u.get(b)!==v&&(u.set(b,v),b.update())}function me(b,v){const O=b.colorSpace,q=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||O!==Br&&O!==mi&&($t.getTransfer(O)===oe?(q!==Tn||K!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function yt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=G,this.setTexture2D=j,this.setTexture2DArray=k,this.setTexture3D=Z,this.setTextureCube=V,this.rebindTextures=Gt,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=Zt,this.updateMultisampleRenderTarget=dn,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=qt}function tx(n,t){function e(i,r=mi){let a;const s=$t.getTransfer(r);if(i===ti)return n.UNSIGNED_BYTE;if(i===ql)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Yl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$h)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===qh)return n.BYTE;if(i===Yh)return n.SHORT;if(i===pa)return n.UNSIGNED_SHORT;if(i===Xl)return n.INT;if(i===Gi)return n.UNSIGNED_INT;if(i===On)return n.FLOAT;if(i===zn)return n.HALF_FLOAT;if(i===jh)return n.ALPHA;if(i===Zh)return n.RGB;if(i===Tn)return n.RGBA;if(i===Kh)return n.LUMINANCE;if(i===Jh)return n.LUMINANCE_ALPHA;if(i===yr)return n.DEPTH_COMPONENT;if(i===Ir)return n.DEPTH_STENCIL;if(i===$l)return n.RED;if(i===jl)return n.RED_INTEGER;if(i===Qh)return n.RG;if(i===Zl)return n.RG_INTEGER;if(i===Kl)return n.RGBA_INTEGER;if(i===rs||i===as||i===ss||i===os)if(s===oe)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===rs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===as)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ss)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===os)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===rs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===as)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ss)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===os)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===qo||i===Yo||i===$o||i===jo)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===qo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Yo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$o)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===jo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Zo||i===Ko||i===Jo)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Zo||i===Ko)return s===oe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Jo)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Qo||i===tl||i===el||i===nl||i===il||i===rl||i===al||i===sl||i===ol||i===ll||i===cl||i===ul||i===hl||i===dl)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Qo)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===tl)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===el)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===nl)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===il)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===rl)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===al)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===sl)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ol)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ll)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===cl)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ul)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hl)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===dl)return s===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ls||i===fl||i===pl)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===ls)return s===oe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===fl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===pl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===td||i===ml||i===_l||i===gl)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===ls)return a.COMPRESSED_RED_RGTC1_EXT;if(i===ml)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_l)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===gl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Dr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class ex extends un{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Sr extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nx={type:"move"};class co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Sr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Sr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Sr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,a=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){s=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,i),d=this._getHandJoint(c,g);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nx)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Sr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const ix=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ax{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Ne,a=t.properties.get(r);a.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ue({vertexShader:ix,fragmentShader:rx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new De(new qi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sx extends Vr{constructor(t,e){super();const i=this;let r=null,a=1,s=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,_=null;const g=new ax,m=e.getContextAttributes();let d=null,E=null;const A=[],x=[],w=new bt;let T=null;const C=new un;C.viewport=new he;const D=new un;D.viewport=new he;const y=[C,D],S=new ex;let R=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Q=A[W];return Q===void 0&&(Q=new co,A[W]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(W){let Q=A[W];return Q===void 0&&(Q=new co,A[W]=Q),Q.getGripSpace()},this.getHand=function(W){let Q=A[W];return Q===void 0&&(Q=new co,A[W]=Q),Q.getHandSpace()};function B(W){const Q=x.indexOf(W.inputSource);if(Q===-1)return;const mt=A[Q];mt!==void 0&&(mt.update(W.inputSource,W.frame,c||s),mt.dispatchEvent({type:W.type,data:W.inputSource}))}function $(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",j);for(let W=0;W<A.length;W++){const Q=x[W];Q!==null&&(x[W]=null,A[W].disconnect(Q))}R=null,G=null,g.reset(),t.setRenderTarget(d),p=null,f=null,h=null,r=null,E=null,jt.stop(),i.isPresenting=!1,t.setPixelRatio(T),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(d=t.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",$),r.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(w),r.renderState.layers===void 0){const Q={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,e,Q),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new gn(p.framebufferWidth,p.framebufferHeight,{format:Tn,type:ti,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let Q=null,mt=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=m.stencil?Ir:yr,mt=m.stencil?Dr:Gi);const Et={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:a};h=new XRWebGLBinding(r,e),f=h.createProjectionLayer(Et),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),E=new gn(f.textureWidth,f.textureHeight,{format:Tn,type:ti,depthTexture:new fd(f.textureWidth,f.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await r.requestReferenceSpace(o),jt.setContext(r),jt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(W){for(let Q=0;Q<W.removed.length;Q++){const mt=W.removed[Q],at=x.indexOf(mt);at>=0&&(x[at]=null,A[at].disconnect(mt))}for(let Q=0;Q<W.added.length;Q++){const mt=W.added[Q];let at=x.indexOf(mt);if(at===-1){for(let Ut=0;Ut<A.length;Ut++)if(Ut>=x.length){x.push(mt),at=Ut;break}else if(x[Ut]===null){x[Ut]=mt,at=Ut;break}if(at===-1)break}const Et=A[at];Et&&Et.connect(mt)}}const k=new P,Z=new P;function V(W,Q,mt){k.setFromMatrixPosition(Q.matrixWorld),Z.setFromMatrixPosition(mt.matrixWorld);const at=k.distanceTo(Z),Et=Q.projectionMatrix.elements,Ut=mt.projectionMatrix.elements,Gt=Et[14]/(Et[10]-1),xe=Et[14]/(Et[10]+1),Zt=(Et[9]+1)/Et[5],Se=(Et[9]-1)/Et[5],N=(Et[8]-1)/Et[0],dn=(Ut[8]+1)/Ut[0],Xt=Gt*N,qt=Gt*dn,At=at/(-N+dn),me=At*-N;if(Q.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(me),W.translateZ(At),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Et[10]===-1)W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const yt=Gt+At,b=xe+At,v=Xt-me,O=qt+(at-me),q=Zt*xe/b*yt,K=Se*xe/b*yt;W.projectionMatrix.makePerspective(v,O,q,K,yt,b),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function rt(W,Q){Q===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Q.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let Q=W.near,mt=W.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(mt=g.depthFar)),S.near=D.near=C.near=Q,S.far=D.far=C.far=mt,(R!==S.near||G!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),R=S.near,G=S.far),C.layers.mask=W.layers.mask|2,D.layers.mask=W.layers.mask|4,S.layers.mask=C.layers.mask|D.layers.mask;const at=W.parent,Et=S.cameras;rt(S,at);for(let Ut=0;Ut<Et.length;Ut++)rt(Et[Ut],at);Et.length===2?V(S,C,D):S.projectionMatrix.copy(C.projectionMatrix),ht(W,S,at)};function ht(W,Q,mt){mt===null?W.matrix.copy(Q.matrixWorld):(W.matrix.copy(mt.matrixWorld),W.matrix.invert(),W.matrix.multiply(Q.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=ma*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(S)};let _t=null;function It(W,Q){if(u=Q.getViewerPose(c||s),_=Q,u!==null){const mt=u.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let at=!1;mt.length!==S.cameras.length&&(S.cameras.length=0,at=!0);for(let Ut=0;Ut<mt.length;Ut++){const Gt=mt[Ut];let xe=null;if(p!==null)xe=p.getViewport(Gt);else{const Se=h.getViewSubImage(f,Gt);xe=Se.viewport,Ut===0&&(t.setRenderTargetTextures(E,Se.colorTexture,f.ignoreDepthValues?void 0:Se.depthStencilTexture),t.setRenderTarget(E))}let Zt=y[Ut];Zt===void 0&&(Zt=new un,Zt.layers.enable(Ut),Zt.viewport=new he,y[Ut]=Zt),Zt.matrix.fromArray(Gt.transform.matrix),Zt.matrix.decompose(Zt.position,Zt.quaternion,Zt.scale),Zt.projectionMatrix.fromArray(Gt.projectionMatrix),Zt.projectionMatrixInverse.copy(Zt.projectionMatrix).invert(),Zt.viewport.set(xe.x,xe.y,xe.width,xe.height),Ut===0&&(S.matrix.copy(Zt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),at===!0&&S.cameras.push(Zt)}const Et=r.enabledFeatures;if(Et&&Et.includes("depth-sensing")){const Ut=h.getDepthInformation(mt[0]);Ut&&Ut.isValid&&Ut.texture&&g.init(t,Ut,r.renderState)}}for(let mt=0;mt<A.length;mt++){const at=x[mt],Et=A[mt];at!==null&&Et!==void 0&&Et.update(at,Q,c||s)}_t&&_t(W,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),_=null}const jt=new dd;jt.setAnimationLoop(It),this.setAnimationLoop=function(W){_t=W},this.dispose=function(){}}}const Li=new vn,ox=new re;function lx(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,cd(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,E,A,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?a(m,d):d.isMeshToonMaterial?(a(m,d),h(m,d)):d.isMeshPhongMaterial?(a(m,d),u(m,d)):d.isMeshStandardMaterial?(a(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,x)):d.isMeshMatcapMaterial?(a(m,d),_(m,d)):d.isMeshDepthMaterial?a(m,d):d.isMeshDistanceMaterial?(a(m,d),g(m,d)):d.isMeshNormalMaterial?a(m,d):d.isLineBasicMaterial?(s(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,E,A):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function a(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Ye&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Ye&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const E=t.get(d),A=E.envMap,x=E.envMapRotation;A&&(m.envMap.value=A,Li.copy(x),Li.x*=-1,Li.y*=-1,Li.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),m.envMapRotation.value.setFromMatrix4(ox.makeRotationFromEuler(Li)),m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function s(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,E,A){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*E,m.scale.value=A*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,E){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ye&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function g(m,d){const E=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function cx(n,t,e,i){let r={},a={},s=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,A){const x=A.program;i.uniformBlockBinding(E,x)}function c(E,A){let x=r[E.id];x===void 0&&(_(E),x=u(E),r[E.id]=x,E.addEventListener("dispose",m));const w=A.program;i.updateUBOMapping(E,w);const T=t.render.frame;a[E.id]!==T&&(f(E),a[E.id]=T)}function u(E){const A=h();E.__bindingPointIndex=A;const x=n.createBuffer(),w=E.__size,T=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,w,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,x),x}function h(){for(let E=0;E<o;E++)if(s.indexOf(E)===-1)return s.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const A=r[E.id],x=E.uniforms,w=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let T=0,C=x.length;T<C;T++){const D=Array.isArray(x[T])?x[T]:[x[T]];for(let y=0,S=D.length;y<S;y++){const R=D[y];if(p(R,T,y,w)===!0){const G=R.__offset,B=Array.isArray(R.value)?R.value:[R.value];let $=0;for(let j=0;j<B.length;j++){const k=B[j],Z=g(k);typeof k=="number"||typeof k=="boolean"?(R.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,G+$,R.__data)):k.isMatrix3?(R.__data[0]=k.elements[0],R.__data[1]=k.elements[1],R.__data[2]=k.elements[2],R.__data[3]=0,R.__data[4]=k.elements[3],R.__data[5]=k.elements[4],R.__data[6]=k.elements[5],R.__data[7]=0,R.__data[8]=k.elements[6],R.__data[9]=k.elements[7],R.__data[10]=k.elements[8],R.__data[11]=0):(k.toArray(R.__data,$),$+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,G,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(E,A,x,w){const T=E.value,C=A+"_"+x;if(w[C]===void 0)return typeof T=="number"||typeof T=="boolean"?w[C]=T:w[C]=T.clone(),!0;{const D=w[C];if(typeof T=="number"||typeof T=="boolean"){if(D!==T)return w[C]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function _(E){const A=E.uniforms;let x=0;const w=16;for(let C=0,D=A.length;C<D;C++){const y=Array.isArray(A[C])?A[C]:[A[C]];for(let S=0,R=y.length;S<R;S++){const G=y[S],B=Array.isArray(G.value)?G.value:[G.value];for(let $=0,j=B.length;$<j;$++){const k=B[$],Z=g(k),V=x%w,rt=V%Z.boundary,ht=V+rt;x+=rt,ht!==0&&w-ht<Z.storage&&(x+=w-ht),G.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=x,x+=Z.storage}}}const T=x%w;return T>0&&(x+=w-T),E.__size=x,E.__cache={},this}function g(E){const A={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(A.boundary=4,A.storage=4):E.isVector2?(A.boundary=8,A.storage=8):E.isVector3||E.isColor?(A.boundary=16,A.storage=12):E.isVector4?(A.boundary=16,A.storage=16):E.isMatrix3?(A.boundary=48,A.storage=48):E.isMatrix4?(A.boundary=64,A.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),A}function m(E){const A=E.target;A.removeEventListener("dispose",m);const x=s.indexOf(A.__bindingPointIndex);s.splice(x,1),n.deleteBuffer(r[A.id]),delete r[A.id],delete a[A.id]}function d(){for(const E in r)n.deleteBuffer(r[E]);s=[],r={},a={}}return{bind:l,update:c,dispose:d}}class ux{constructor(t={}){const{canvas:e=tm(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=s;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,d=null;const E=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=cn,this.toneMapping=vi,this.toneMappingExposure=1;const x=this;let w=!1,T=0,C=0,D=null,y=-1,S=null;const R=new he,G=new he;let B=null;const $=new Pt(0);let j=0,k=e.width,Z=e.height,V=1,rt=null,ht=null;const _t=new he(0,0,k,Z),It=new he(0,0,k,Z);let jt=!1;const W=new nc;let Q=!1,mt=!1;const at=new re,Et=new re,Ut=new P,Gt=new he,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Zt=!1;function Se(){return D===null?V:1}let N=i;function dn(M,I){return e.getContext(M,I)}try{const M={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${kl}`),e.addEventListener("webglcontextlost",Y,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",lt,!1),N===null){const I="webgl2";if(N=dn(I,M),N===null)throw dn(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Xt,qt,At,me,yt,b,v,O,q,K,X,Mt,ot,dt,Kt,tt,ft,Tt,Rt,pt,Yt,Bt,fe,L;function st(){Xt=new _0(N),Xt.init(),Bt=new tx(N,Xt),qt=new u0(N,Xt,t,Bt),At=new Kv(N,Xt),qt.reverseDepthBuffer&&f&&At.buffers.depth.setReversed(!0),me=new x0(N),yt=new Fv,b=new Qv(N,Xt,At,yt,qt,Bt,me),v=new d0(x),O=new m0(x),q=new Tm(N),fe=new l0(N,q),K=new g0(N,q,me,fe),X=new S0(N,K,q,me),Rt=new M0(N,qt,b),tt=new h0(yt),Mt=new Ov(x,v,O,Xt,qt,fe,tt),ot=new lx(x,yt),dt=new Bv,Kt=new Xv(Xt),Tt=new o0(x,v,O,At,X,p,l),ft=new jv(x,X,qt),L=new cx(N,me,qt,At),pt=new c0(N,Xt,me),Yt=new v0(N,Xt,me),me.programs=Mt.programs,x.capabilities=qt,x.extensions=Xt,x.properties=yt,x.renderLists=dt,x.shadowMap=ft,x.state=At,x.info=me}st();const H=new sx(x,N);this.xr=H,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const M=Xt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Xt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(M){M!==void 0&&(V=M,this.setSize(k,Z,!1))},this.getSize=function(M){return M.set(k,Z)},this.setSize=function(M,I,F=!0){if(H.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=M,Z=I,e.width=Math.floor(M*V),e.height=Math.floor(I*V),F===!0&&(e.style.width=M+"px",e.style.height=I+"px"),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(k*V,Z*V).floor()},this.setDrawingBufferSize=function(M,I,F){k=M,Z=I,V=F,e.width=Math.floor(M*F),e.height=Math.floor(I*F),this.setViewport(0,0,M,I)},this.getCurrentViewport=function(M){return M.copy(R)},this.getViewport=function(M){return M.copy(_t)},this.setViewport=function(M,I,F,z){M.isVector4?_t.set(M.x,M.y,M.z,M.w):_t.set(M,I,F,z),At.viewport(R.copy(_t).multiplyScalar(V).round())},this.getScissor=function(M){return M.copy(It)},this.setScissor=function(M,I,F,z){M.isVector4?It.set(M.x,M.y,M.z,M.w):It.set(M,I,F,z),At.scissor(G.copy(It).multiplyScalar(V).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(M){At.setScissorTest(jt=M)},this.setOpaqueSort=function(M){rt=M},this.setTransparentSort=function(M){ht=M},this.getClearColor=function(M){return M.copy(Tt.getClearColor())},this.setClearColor=function(){Tt.setClearColor.apply(Tt,arguments)},this.getClearAlpha=function(){return Tt.getClearAlpha()},this.setClearAlpha=function(){Tt.setClearAlpha.apply(Tt,arguments)},this.clear=function(M=!0,I=!0,F=!0){let z=0;if(M){let U=!1;if(D!==null){const nt=D.texture.format;U=nt===Kl||nt===Zl||nt===jl}if(U){const nt=D.texture.type,ct=nt===ti||nt===Gi||nt===pa||nt===Dr||nt===ql||nt===Yl,gt=Tt.getClearColor(),vt=Tt.getClearAlpha(),Lt=gt.r,Ot=gt.g,xt=gt.b;ct?(_[0]=Lt,_[1]=Ot,_[2]=xt,_[3]=vt,N.clearBufferuiv(N.COLOR,0,_)):(g[0]=Lt,g[1]=Ot,g[2]=xt,g[3]=vt,N.clearBufferiv(N.COLOR,0,g))}else z|=N.COLOR_BUFFER_BIT}I&&(z|=N.DEPTH_BUFFER_BIT),F&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Y,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),dt.dispose(),Kt.dispose(),yt.dispose(),v.dispose(),O.dispose(),X.dispose(),fe.dispose(),L.dispose(),Mt.dispose(),H.dispose(),H.removeEventListener("sessionstart",dc),H.removeEventListener("sessionend",fc),bi.stop()};function Y(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const M=me.autoReset,I=ft.enabled,F=ft.autoUpdate,z=ft.needsUpdate,U=ft.type;st(),me.autoReset=M,ft.enabled=I,ft.autoUpdate=F,ft.needsUpdate=z,ft.type=U}function lt(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Nt(M){const I=M.target;I.removeEventListener("dispose",Nt),Me(I)}function Me(M){Fe(M),yt.remove(M)}function Fe(M){const I=yt.get(M).programs;I!==void 0&&(I.forEach(function(F){Mt.releaseProgram(F)}),M.isShaderMaterial&&Mt.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,F,z,U,nt){I===null&&(I=xe);const ct=U.isMesh&&U.matrixWorld.determinant()<0,gt=kd(M,I,F,z,U);At.setMaterial(z,ct);let vt=F.index,Lt=1;if(z.wireframe===!0){if(vt=K.getWireframeAttribute(F),vt===void 0)return;Lt=2}const Ot=F.drawRange,xt=F.attributes.position;let Qt=Ot.start*Lt,pe=(Ot.start+Ot.count)*Lt;nt!==null&&(Qt=Math.max(Qt,nt.start*Lt),pe=Math.min(pe,(nt.start+nt.count)*Lt)),vt!==null?(Qt=Math.max(Qt,0),pe=Math.min(pe,vt.count)):xt!=null&&(Qt=Math.max(Qt,0),pe=Math.min(pe,xt.count));const _e=pe-Qt;if(_e<0||_e===1/0)return;fe.setup(U,z,gt,F,vt);let je,ne=pt;if(vt!==null&&(je=q.get(vt),ne=Yt,ne.setIndex(je)),U.isMesh)z.wireframe===!0?(At.setLineWidth(z.wireframeLinewidth*Se()),ne.setMode(N.LINES)):ne.setMode(N.TRIANGLES);else if(U.isLine){let St=z.linewidth;St===void 0&&(St=1),At.setLineWidth(St*Se()),U.isLineSegments?ne.setMode(N.LINES):U.isLineLoop?ne.setMode(N.LINE_LOOP):ne.setMode(N.LINE_STRIP)}else U.isPoints?ne.setMode(N.POINTS):U.isSprite&&ne.setMode(N.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)ne.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Xt.get("WEBGL_multi_draw"))ne.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const St=U._multiDrawStarts,Hn=U._multiDrawCounts,ie=U._multiDrawCount,Mn=vt?q.get(vt).bytesPerElement:1,ji=yt.get(z).currentProgram.getUniforms();for(let rn=0;rn<ie;rn++)ji.setValue(N,"_gl_DrawID",rn),ne.render(St[rn]/Mn,Hn[rn])}else if(U.isInstancedMesh)ne.renderInstances(Qt,_e,U.count);else if(F.isInstancedBufferGeometry){const St=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Hn=Math.min(F.instanceCount,St);ne.renderInstances(Qt,_e,Hn)}else ne.render(Qt,_e)};function ae(M,I,F){M.transparent===!0&&M.side===An&&M.forceSinglePass===!1?(M.side=Ye,M.needsUpdate=!0,Ea(M,I,F),M.side=Si,M.needsUpdate=!0,Ea(M,I,F),M.side=An):Ea(M,I,F)}this.compile=function(M,I,F=null){F===null&&(F=M),d=Kt.get(F),d.init(I),A.push(d),F.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),M!==F&&M.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),d.setupLights();const z=new Set;return M.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const nt=U.material;if(nt)if(Array.isArray(nt))for(let ct=0;ct<nt.length;ct++){const gt=nt[ct];ae(gt,F,U),z.add(gt)}else ae(nt,F,U),z.add(nt)}),A.pop(),d=null,z},this.compileAsync=function(M,I,F=null){const z=this.compile(M,I,F);return new Promise(U=>{function nt(){if(z.forEach(function(ct){yt.get(ct).currentProgram.isReady()&&z.delete(ct)}),z.size===0){U(M);return}setTimeout(nt,10)}Xt.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let xn=null;function Gn(M){xn&&xn(M)}function dc(){bi.stop()}function fc(){bi.start()}const bi=new dd;bi.setAnimationLoop(Gn),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(M){xn=M,H.setAnimationLoop(M),M===null?bi.stop():bi.start()},H.addEventListener("sessionstart",dc),H.addEventListener("sessionend",fc),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(H.cameraAutoUpdate===!0&&H.updateCamera(I),I=H.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,I,D),d=Kt.get(M,A.length),d.init(I),A.push(d),Et.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),W.setFromProjectionMatrix(Et),mt=this.localClippingEnabled,Q=tt.init(this.clippingPlanes,mt),m=dt.get(M,E.length),m.init(),E.push(m),H.enabled===!0&&H.isPresenting===!0){const nt=x.xr.getDepthSensingMesh();nt!==null&&Ps(nt,I,-1/0,x.sortObjects)}Ps(M,I,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(rt,ht),Zt=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,Zt&&Tt.addToRenderList(m,M),this.info.render.frame++,Q===!0&&tt.beginShadows();const F=d.state.shadowsArray;ft.render(F,M,I),Q===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,U=m.transmissive;if(d.setupLights(),I.isArrayCamera){const nt=I.cameras;if(U.length>0)for(let ct=0,gt=nt.length;ct<gt;ct++){const vt=nt[ct];mc(z,U,M,vt)}Zt&&Tt.render(M);for(let ct=0,gt=nt.length;ct<gt;ct++){const vt=nt[ct];pc(m,M,vt,vt.viewport)}}else U.length>0&&mc(z,U,M,I),Zt&&Tt.render(M),pc(m,M,I);D!==null&&(b.updateMultisampleRenderTarget(D),b.updateRenderTargetMipmap(D)),M.isScene===!0&&M.onAfterRender(x,M,I),fe.resetDefaultState(),y=-1,S=null,A.pop(),A.length>0?(d=A[A.length-1],Q===!0&&tt.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Ps(M,I,F,z){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)F=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLight)d.pushLight(M),M.castShadow&&d.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||W.intersectsSprite(M)){z&&Gt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Et);const ct=X.update(M),gt=M.material;gt.visible&&m.push(M,ct,gt,F,Gt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||W.intersectsObject(M))){const ct=X.update(M),gt=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Gt.copy(M.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Gt.copy(ct.boundingSphere.center)),Gt.applyMatrix4(M.matrixWorld).applyMatrix4(Et)),Array.isArray(gt)){const vt=ct.groups;for(let Lt=0,Ot=vt.length;Lt<Ot;Lt++){const xt=vt[Lt],Qt=gt[xt.materialIndex];Qt&&Qt.visible&&m.push(M,ct,Qt,F,Gt.z,xt)}}else gt.visible&&m.push(M,ct,gt,F,Gt.z,null)}}const nt=M.children;for(let ct=0,gt=nt.length;ct<gt;ct++)Ps(nt[ct],I,F,z)}function pc(M,I,F,z){const U=M.opaque,nt=M.transmissive,ct=M.transparent;d.setupLightsView(F),Q===!0&&tt.setGlobalState(x.clippingPlanes,F),z&&At.viewport(R.copy(z)),U.length>0&&Sa(U,I,F),nt.length>0&&Sa(nt,I,F),ct.length>0&&Sa(ct,I,F),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function mc(M,I,F,z){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[z.id]===void 0&&(d.state.transmissionRenderTarget[z.id]=new gn(1,1,{generateMipmaps:!0,type:Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float")?zn:ti,minFilter:Fi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const nt=d.state.transmissionRenderTarget[z.id],ct=z.viewport||R;nt.setSize(ct.z,ct.w);const gt=x.getRenderTarget();x.setRenderTarget(nt),x.getClearColor($),j=x.getClearAlpha(),j<1&&x.setClearColor(16777215,.5),x.clear(),Zt&&Tt.render(F);const vt=x.toneMapping;x.toneMapping=vi;const Lt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),d.setupLightsView(z),Q===!0&&tt.setGlobalState(x.clippingPlanes,z),Sa(M,F,z),b.updateMultisampleRenderTarget(nt),b.updateRenderTargetMipmap(nt),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let xt=0,Qt=I.length;xt<Qt;xt++){const pe=I[xt],_e=pe.object,je=pe.geometry,ne=pe.material,St=pe.group;if(ne.side===An&&_e.layers.test(z.layers)){const Hn=ne.side;ne.side=Ye,ne.needsUpdate=!0,_c(_e,F,z,je,ne,St),ne.side=Hn,ne.needsUpdate=!0,Ot=!0}}Ot===!0&&(b.updateMultisampleRenderTarget(nt),b.updateRenderTargetMipmap(nt))}x.setRenderTarget(gt),x.setClearColor($,j),Lt!==void 0&&(z.viewport=Lt),x.toneMapping=vt}function Sa(M,I,F){const z=I.isScene===!0?I.overrideMaterial:null;for(let U=0,nt=M.length;U<nt;U++){const ct=M[U],gt=ct.object,vt=ct.geometry,Lt=z===null?ct.material:z,Ot=ct.group;gt.layers.test(F.layers)&&_c(gt,I,F,vt,Lt,Ot)}}function _c(M,I,F,z,U,nt){M.onBeforeRender(x,I,F,z,U,nt),M.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),U.onBeforeRender(x,I,F,z,M,nt),U.transparent===!0&&U.side===An&&U.forceSinglePass===!1?(U.side=Ye,U.needsUpdate=!0,x.renderBufferDirect(F,I,z,U,M,nt),U.side=Si,U.needsUpdate=!0,x.renderBufferDirect(F,I,z,U,M,nt),U.side=An):x.renderBufferDirect(F,I,z,U,M,nt),M.onAfterRender(x,I,F,z,U,nt)}function Ea(M,I,F){I.isScene!==!0&&(I=xe);const z=yt.get(M),U=d.state.lights,nt=d.state.shadowsArray,ct=U.state.version,gt=Mt.getParameters(M,U.state,nt,I,F),vt=Mt.getProgramCacheKey(gt);let Lt=z.programs;z.environment=M.isMeshStandardMaterial?I.environment:null,z.fog=I.fog,z.envMap=(M.isMeshStandardMaterial?O:v).get(M.envMap||z.environment),z.envMapRotation=z.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,Lt===void 0&&(M.addEventListener("dispose",Nt),Lt=new Map,z.programs=Lt);let Ot=Lt.get(vt);if(Ot!==void 0){if(z.currentProgram===Ot&&z.lightsStateVersion===ct)return vc(M,gt),Ot}else gt.uniforms=Mt.getUniforms(M),M.onBeforeCompile(gt,x),Ot=Mt.acquireProgram(gt,vt),Lt.set(vt,Ot),z.uniforms=gt.uniforms;const xt=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(xt.clippingPlanes=tt.uniform),vc(M,gt),z.needsLights=Xd(M),z.lightsStateVersion=ct,z.needsLights&&(xt.ambientLightColor.value=U.state.ambient,xt.lightProbe.value=U.state.probe,xt.directionalLights.value=U.state.directional,xt.directionalLightShadows.value=U.state.directionalShadow,xt.spotLights.value=U.state.spot,xt.spotLightShadows.value=U.state.spotShadow,xt.rectAreaLights.value=U.state.rectArea,xt.ltc_1.value=U.state.rectAreaLTC1,xt.ltc_2.value=U.state.rectAreaLTC2,xt.pointLights.value=U.state.point,xt.pointLightShadows.value=U.state.pointShadow,xt.hemisphereLights.value=U.state.hemi,xt.directionalShadowMap.value=U.state.directionalShadowMap,xt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,xt.spotShadowMap.value=U.state.spotShadowMap,xt.spotLightMatrix.value=U.state.spotLightMatrix,xt.spotLightMap.value=U.state.spotLightMap,xt.pointShadowMap.value=U.state.pointShadowMap,xt.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=Ot,z.uniformsList=null,Ot}function gc(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=cs.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function vc(M,I){const F=yt.get(M);F.outputColorSpace=I.outputColorSpace,F.batching=I.batching,F.batchingColor=I.batchingColor,F.instancing=I.instancing,F.instancingColor=I.instancingColor,F.instancingMorph=I.instancingMorph,F.skinning=I.skinning,F.morphTargets=I.morphTargets,F.morphNormals=I.morphNormals,F.morphColors=I.morphColors,F.morphTargetsCount=I.morphTargetsCount,F.numClippingPlanes=I.numClippingPlanes,F.numIntersection=I.numClipIntersection,F.vertexAlphas=I.vertexAlphas,F.vertexTangents=I.vertexTangents,F.toneMapping=I.toneMapping}function kd(M,I,F,z,U){I.isScene!==!0&&(I=xe),b.resetTextureUnits();const nt=I.fog,ct=z.isMeshStandardMaterial?I.environment:null,gt=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Br,vt=(z.isMeshStandardMaterial?O:v).get(z.envMap||ct),Lt=z.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ot=!!F.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),xt=!!F.morphAttributes.position,Qt=!!F.morphAttributes.normal,pe=!!F.morphAttributes.color;let _e=vi;z.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(_e=x.toneMapping);const je=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ne=je!==void 0?je.length:0,St=yt.get(z),Hn=d.state.lights;if(Q===!0&&(mt===!0||M!==S)){const fn=M===S&&z.id===y;tt.setState(z,M,fn)}let ie=!1;z.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Hn.state.version||St.outputColorSpace!==gt||U.isBatchedMesh&&St.batching===!1||!U.isBatchedMesh&&St.batching===!0||U.isBatchedMesh&&St.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&St.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&St.instancing===!1||!U.isInstancedMesh&&St.instancing===!0||U.isSkinnedMesh&&St.skinning===!1||!U.isSkinnedMesh&&St.skinning===!0||U.isInstancedMesh&&St.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&St.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&St.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&St.instancingMorph===!1&&U.morphTexture!==null||St.envMap!==vt||z.fog===!0&&St.fog!==nt||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==tt.numPlanes||St.numIntersection!==tt.numIntersection)||St.vertexAlphas!==Lt||St.vertexTangents!==Ot||St.morphTargets!==xt||St.morphNormals!==Qt||St.morphColors!==pe||St.toneMapping!==_e||St.morphTargetsCount!==ne)&&(ie=!0):(ie=!0,St.__version=z.version);let Mn=St.currentProgram;ie===!0&&(Mn=Ea(z,I,U));let ji=!1,rn=!1,Wr=!1;const ge=Mn.getUniforms(),Ln=St.uniforms;if(At.useProgram(Mn.program)&&(ji=!0,rn=!0,Wr=!0),z.id!==y&&(y=z.id,rn=!0),ji||S!==M){At.buffers.depth.getReversed()?(at.copy(M.projectionMatrix),nm(at),im(at),ge.setValue(N,"projectionMatrix",at)):ge.setValue(N,"projectionMatrix",M.projectionMatrix),ge.setValue(N,"viewMatrix",M.matrixWorldInverse);const ei=ge.map.cameraPosition;ei!==void 0&&ei.setValue(N,Ut.setFromMatrixPosition(M.matrixWorld)),qt.logarithmicDepthBuffer&&ge.setValue(N,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ge.setValue(N,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,rn=!0,Wr=!0)}if(U.isSkinnedMesh){ge.setOptional(N,U,"bindMatrix"),ge.setOptional(N,U,"bindMatrixInverse");const fn=U.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),ge.setValue(N,"boneTexture",fn.boneTexture,b))}U.isBatchedMesh&&(ge.setOptional(N,U,"batchingTexture"),ge.setValue(N,"batchingTexture",U._matricesTexture,b),ge.setOptional(N,U,"batchingIdTexture"),ge.setValue(N,"batchingIdTexture",U._indirectTexture,b),ge.setOptional(N,U,"batchingColorTexture"),U._colorsTexture!==null&&ge.setValue(N,"batchingColorTexture",U._colorsTexture,b));const Xr=F.morphAttributes;if((Xr.position!==void 0||Xr.normal!==void 0||Xr.color!==void 0)&&Rt.update(U,F,Mn),(rn||St.receiveShadow!==U.receiveShadow)&&(St.receiveShadow=U.receiveShadow,ge.setValue(N,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Ln.envMap.value=vt,Ln.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&I.environment!==null&&(Ln.envMapIntensity.value=I.environmentIntensity),rn&&(ge.setValue(N,"toneMappingExposure",x.toneMappingExposure),St.needsLights&&Wd(Ln,Wr),nt&&z.fog===!0&&ot.refreshFogUniforms(Ln,nt),ot.refreshMaterialUniforms(Ln,z,V,Z,d.state.transmissionRenderTarget[M.id]),cs.upload(N,gc(St),Ln,b)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(cs.upload(N,gc(St),Ln,b),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ge.setValue(N,"center",U.center),ge.setValue(N,"modelViewMatrix",U.modelViewMatrix),ge.setValue(N,"normalMatrix",U.normalMatrix),ge.setValue(N,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const fn=z.uniformsGroups;for(let ei=0,ni=fn.length;ei<ni;ei++){const xc=fn[ei];L.update(xc,Mn),L.bind(xc,Mn)}}return Mn}function Wd(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function Xd(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(M,I,F){yt.get(M.texture).__webglTexture=I,yt.get(M.depthTexture).__webglTexture=F;const z=yt.get(M);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=F===void 0,z.__autoAllocateDepthBuffer||Xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,I){const F=yt.get(M);F.__webglFramebuffer=I,F.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,F=0){D=M,T=I,C=F;let z=!0,U=null,nt=!1,ct=!1;if(M){const vt=yt.get(M);if(vt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(N.FRAMEBUFFER,null),z=!1;else if(vt.__webglFramebuffer===void 0)b.setupRenderTarget(M);else if(vt.__hasExternalTextures)b.rebindTextures(M,yt.get(M.texture).__webglTexture,yt.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const xt=M.depthTexture;if(vt.__boundDepthTexture!==xt){if(xt!==null&&yt.has(xt)&&(M.width!==xt.image.width||M.height!==xt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(M)}}const Lt=M.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(ct=!0);const Ot=yt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ot[I])?U=Ot[I][F]:U=Ot[I],nt=!0):M.samples>0&&b.useMultisampledRTT(M)===!1?U=yt.get(M).__webglMultisampledFramebuffer:Array.isArray(Ot)?U=Ot[F]:U=Ot,R.copy(M.viewport),G.copy(M.scissor),B=M.scissorTest}else R.copy(_t).multiplyScalar(V).floor(),G.copy(It).multiplyScalar(V).floor(),B=jt;if(At.bindFramebuffer(N.FRAMEBUFFER,U)&&z&&At.drawBuffers(M,U),At.viewport(R),At.scissor(G),At.setScissorTest(B),nt){const vt=yt.get(M.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,vt.__webglTexture,F)}else if(ct){const vt=yt.get(M.texture),Lt=I||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,vt.__webglTexture,F||0,Lt)}y=-1},this.readRenderTargetPixels=function(M,I,F,z,U,nt,ct){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=yt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ct!==void 0&&(gt=gt[ct]),gt){At.bindFramebuffer(N.FRAMEBUFFER,gt);try{const vt=M.texture,Lt=vt.format,Ot=vt.type;if(!qt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-z&&F>=0&&F<=M.height-U&&N.readPixels(I,F,z,U,Bt.convert(Lt),Bt.convert(Ot),nt)}finally{const vt=D!==null?yt.get(D).__webglFramebuffer:null;At.bindFramebuffer(N.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(M,I,F,z,U,nt,ct){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=yt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ct!==void 0&&(gt=gt[ct]),gt){const vt=M.texture,Lt=vt.format,Ot=vt.type;if(!qt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=M.width-z&&F>=0&&F<=M.height-U){At.bindFramebuffer(N.FRAMEBUFFER,gt);const xt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,xt),N.bufferData(N.PIXEL_PACK_BUFFER,nt.byteLength,N.STREAM_READ),N.readPixels(I,F,z,U,Bt.convert(Lt),Bt.convert(Ot),0);const Qt=D!==null?yt.get(D).__webglFramebuffer:null;At.bindFramebuffer(N.FRAMEBUFFER,Qt);const pe=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await em(N,pe,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,xt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,nt),N.deleteBuffer(xt),N.deleteSync(pe),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,I=null,F=0){M.isTexture!==!0&&(sa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,M=arguments[1]);const z=Math.pow(2,-F),U=Math.floor(M.image.width*z),nt=Math.floor(M.image.height*z),ct=I!==null?I.x:0,gt=I!==null?I.y:0;b.setTexture2D(M,0),N.copyTexSubImage2D(N.TEXTURE_2D,F,0,0,ct,gt,U,nt),At.unbindTexture()},this.copyTextureToTexture=function(M,I,F=null,z=null,U=0){M.isTexture!==!0&&(sa("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,M=arguments[1],I=arguments[2],U=arguments[3]||0,F=null);let nt,ct,gt,vt,Lt,Ot,xt,Qt,pe;const _e=M.isCompressedTexture?M.mipmaps[U]:M.image;F!==null?(nt=F.max.x-F.min.x,ct=F.max.y-F.min.y,gt=F.isBox3?F.max.z-F.min.z:1,vt=F.min.x,Lt=F.min.y,Ot=F.isBox3?F.min.z:0):(nt=_e.width,ct=_e.height,gt=_e.depth||1,vt=0,Lt=0,Ot=0),z!==null?(xt=z.x,Qt=z.y,pe=z.z):(xt=0,Qt=0,pe=0);const je=Bt.convert(I.format),ne=Bt.convert(I.type);let St;I.isData3DTexture?(b.setTexture3D(I,0),St=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(b.setTexture2DArray(I,0),St=N.TEXTURE_2D_ARRAY):(b.setTexture2D(I,0),St=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);const Hn=N.getParameter(N.UNPACK_ROW_LENGTH),ie=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Mn=N.getParameter(N.UNPACK_SKIP_PIXELS),ji=N.getParameter(N.UNPACK_SKIP_ROWS),rn=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,_e.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,_e.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,vt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Lt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ot);const Wr=M.isDataArrayTexture||M.isData3DTexture,ge=I.isDataArrayTexture||I.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){const Ln=yt.get(M),Xr=yt.get(I),fn=yt.get(Ln.__renderTarget),ei=yt.get(Xr.__renderTarget);At.bindFramebuffer(N.READ_FRAMEBUFFER,fn.__webglFramebuffer),At.bindFramebuffer(N.DRAW_FRAMEBUFFER,ei.__webglFramebuffer);for(let ni=0;ni<gt;ni++)Wr&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,yt.get(M).__webglTexture,U,Ot+ni),M.isDepthTexture?(ge&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,yt.get(I).__webglTexture,U,pe+ni),N.blitFramebuffer(vt,Lt,nt,ct,xt,Qt,nt,ct,N.DEPTH_BUFFER_BIT,N.NEAREST)):ge?N.copyTexSubImage3D(St,U,xt,Qt,pe+ni,vt,Lt,nt,ct):N.copyTexSubImage2D(St,U,xt,Qt,pe+ni,vt,Lt,nt,ct);At.bindFramebuffer(N.READ_FRAMEBUFFER,null),At.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ge?M.isDataTexture||M.isData3DTexture?N.texSubImage3D(St,U,xt,Qt,pe,nt,ct,gt,je,ne,_e.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(St,U,xt,Qt,pe,nt,ct,gt,je,_e.data):N.texSubImage3D(St,U,xt,Qt,pe,nt,ct,gt,je,ne,_e):M.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,xt,Qt,nt,ct,je,ne,_e.data):M.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,xt,Qt,_e.width,_e.height,je,_e.data):N.texSubImage2D(N.TEXTURE_2D,U,xt,Qt,nt,ct,je,ne,_e);N.pixelStorei(N.UNPACK_ROW_LENGTH,Hn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ie),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Mn),N.pixelStorei(N.UNPACK_SKIP_ROWS,ji),N.pixelStorei(N.UNPACK_SKIP_IMAGES,rn),U===0&&I.generateMipmaps&&N.generateMipmap(St),At.unbindTexture()},this.copyTextureToTexture3D=function(M,I,F=null,z=null,U=0){return M.isTexture!==!0&&(sa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,z=arguments[1]||null,M=arguments[2],I=arguments[3],U=arguments[4]||0),sa('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,I,F,z,U)},this.initRenderTarget=function(M){yt.get(M).__webglFramebuffer===void 0&&b.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?b.setTextureCube(M,0):M.isData3DTexture?b.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?b.setTexture2DArray(M,0):b.setTexture2D(M,0),At.unbindTexture()},this.resetState=function(){T=0,C=0,D=null,At.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class ac{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Pt(t),this.density=e}clone(){return new ac(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class hx extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class dx{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=vl,this.updateRanges=[],this.version=0,this.uuid=Jn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,a=this.stride;r<a;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const He=new P;class ps{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=bn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=bn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=bn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=bn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=bn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,a){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array),a=le(a,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=a,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)e.push(this.data.array[r+a])}return new $e(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ps(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)e.push(this.data.array[r+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ms extends Ai{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ur;const Kr=new P,hr=new P,dr=new P,fr=new bt,Jr=new bt,xd=new re,Wa=new P,Qr=new P,Xa=new P,Lu=new bt,uo=new bt,Du=new bt;class Ml extends Ce{constructor(t=new ms){if(super(),this.isSprite=!0,this.type="Sprite",ur===void 0){ur=new Oe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new dx(e,5);ur.setIndex([0,1,2,0,2,3]),ur.setAttribute("position",new ps(i,3,0,!1)),ur.setAttribute("uv",new ps(i,2,3,!1))}this.geometry=ur,this.material=t,this.center=new bt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hr.setFromMatrixScale(this.matrixWorld),xd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),dr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hr.multiplyScalar(-dr.z);const i=this.material.rotation;let r,a;i!==0&&(a=Math.cos(i),r=Math.sin(i));const s=this.center;qa(Wa.set(-.5,-.5,0),dr,s,hr,r,a),qa(Qr.set(.5,-.5,0),dr,s,hr,r,a),qa(Xa.set(.5,.5,0),dr,s,hr,r,a),Lu.set(0,0),uo.set(1,0),Du.set(1,1);let o=t.ray.intersectTriangle(Wa,Qr,Xa,!1,Kr);if(o===null&&(qa(Qr.set(-.5,.5,0),dr,s,hr,r,a),uo.set(0,1),o=t.ray.intersectTriangle(Wa,Xa,Qr,!1,Kr),o===null))return;const l=t.ray.origin.distanceTo(Kr);l<t.near||l>t.far||e.push({distance:l,point:Kr.clone(),uv:hn.getInterpolation(Kr,Wa,Qr,Xa,Lu,uo,Du,new bt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function qa(n,t,e,i,r,a){fr.subVectors(n,e).addScalar(.5).multiply(i),r!==void 0?(Jr.x=a*fr.x-r*fr.y,Jr.y=r*fr.x+a*fr.y):Jr.copy(fr),n.copy(t),n.x+=Jr.x,n.y+=Jr.y,n.applyMatrix4(xd)}class fx extends Ne{constructor(t=null,e=1,i=1,r,a,s,o,l,c=Te,u=Te,h,f){super(null,s,o,l,c,u,r,a,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Iu extends $e{constructor(t,e,i,r=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const pr=new re,Uu=new re,Ya=[],Nu=new Wi,px=new re,ta=new De,ea=new Xi;class mx extends De{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Iu(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,px)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Wi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,pr),Nu.copy(t.boundingBox).applyMatrix4(pr),this.boundingBox.union(Nu)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Xi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,pr),ea.copy(t.boundingSphere).applyMatrix4(pr),this.boundingSphere.union(ea)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,s=t*a+1;for(let o=0;o<i.length;o++)i[o]=r[s+o]}raycast(t,e){const i=this.matrixWorld,r=this.count;if(ta.geometry=this.geometry,ta.material=this.material,ta.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ea.copy(this.boundingSphere),ea.applyMatrix4(i),t.ray.intersectsSphere(ea)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,pr),Uu.multiplyMatrices(i,pr),ta.matrixWorld=Uu,ta.raycast(t,Ya);for(let s=0,o=Ya.length;s<o;s++){const l=Ya[s];l.instanceId=a,l.object=this,e.push(l)}Ya.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Iu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new fx(new Float32Array(r*this.count),r,this.count,$l,On));const a=this.morphTexture.source.data.data;let s=0;for(let c=0;c<i.length;c++)s+=i[c];const o=this.geometry.morphTargetsRelative?1:1-s,l=r*t;a[l]=o,a.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Md extends Ai{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const _s=new P,gs=new P,Ou=new re,na=new Ql,$a=new Xi,ho=new P,Fu=new P;class _x extends Ce{constructor(t=new Oe,e=new Md){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,a=e.count;r<a;r++)_s.fromBufferAttribute(e,r-1),gs.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=_s.distanceTo(gs);t.setAttribute("lineDistance",new ye(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,a=t.params.Line.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$a.copy(i.boundingSphere),$a.applyMatrix4(r),$a.radius+=a,t.ray.intersectsSphere($a)===!1)return;Ou.copy(r).invert(),na.copy(t.ray).applyMatrix4(Ou);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,s.start),_=Math.min(u.count,s.start+s.count);for(let g=p,m=_-1;g<m;g+=c){const d=u.getX(g),E=u.getX(g+1),A=ja(this,t,na,l,d,E);A&&e.push(A)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(p),d=ja(this,t,na,l,g,m);d&&e.push(d)}}else{const p=Math.max(0,s.start),_=Math.min(f.count,s.start+s.count);for(let g=p,m=_-1;g<m;g+=c){const d=ja(this,t,na,l,g,g+1);d&&e.push(d)}if(this.isLineLoop){const g=ja(this,t,na,l,_-1,p);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function ja(n,t,e,i,r,a){const s=n.geometry.attributes.position;if(_s.fromBufferAttribute(s,r),gs.fromBufferAttribute(s,a),e.distanceSqToSegment(_s,gs,ho,Fu)>i)return;ho.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ho);if(!(l<t.near||l>t.far))return{distance:l,point:Fu.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const zu=new P,Bu=new P;class gx extends _x{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let r=0,a=e.count;r<a;r+=2)zu.fromBufferAttribute(e,r),Bu.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+zu.distanceTo(Bu);t.setAttribute("lineDistance",new ye(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ts extends Ai{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Vu=new re,Sl=new Ql,Za=new Xi,Ka=new P;class sc extends Ce{constructor(t=new Oe,e=new Ts){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,a=t.params.Points.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Za.copy(i.boundingSphere),Za.applyMatrix4(r),Za.radius+=a,t.ray.intersectsSphere(Za)===!1)return;Vu.copy(r).invert(),Sl.copy(t.ray).applyMatrix4(Vu);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,s.start),p=Math.min(c.count,s.start+s.count);for(let _=f,g=p;_<g;_++){const m=c.getX(_);Ka.fromBufferAttribute(h,m),Gu(Ka,m,l,r,t,e,this)}}else{const f=Math.max(0,s.start),p=Math.min(h.count,s.start+s.count);for(let _=f,g=p;_<g;_++)Ka.fromBufferAttribute(h,_),Gu(Ka,_,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Gu(n,t,e,i,r,a,s){const o=Sl.distanceSqToPoint(n);if(o<e){const l=new P;Sl.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:s})}}class oc extends Ne{constructor(t,e,i,r,a,s,o,l,c){super(t,e,i,r,a,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}const Ja=new P,Qa=new P,fo=new P,ts=new hn;class vx extends Oe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const r=Math.pow(10,4),a=Math.cos(Ar*e),s=t.getIndex(),o=t.getAttribute("position"),l=s?s.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},p=[];for(let _=0;_<l;_+=3){s?(c[0]=s.getX(_),c[1]=s.getX(_+1),c[2]=s.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:g,b:m,c:d}=ts;if(g.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),d.fromBufferAttribute(o,c[2]),ts.getNormal(fo),h[0]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,h[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,h[2]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let E=0;E<3;E++){const A=(E+1)%3,x=h[E],w=h[A],T=ts[u[E]],C=ts[u[A]],D=`${x}_${w}`,y=`${w}_${x}`;y in f&&f[y]?(fo.dot(f[y].normal)<=a&&(p.push(T.x,T.y,T.z),p.push(C.x,C.y,C.z)),f[y]=null):D in f||(f[D]={index0:c[E],index1:c[A],normal:fo.clone()})}}for(const _ in f)if(f[_]){const{index0:g,index1:m}=f[_];Ja.fromBufferAttribute(o,g),Qa.fromBufferAttribute(o,m),p.push(Ja.x,Ja.y,Ja.z),p.push(Qa.x,Qa.y,Qa.z)}this.setAttribute("position",new ye(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class lc extends Oe{constructor(t=1,e=32,i=16,r=0,a=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:a,thetaStart:s,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(s+o,Math.PI);let c=0;const u=[],h=new P,f=new P,p=[],_=[],g=[],m=[];for(let d=0;d<=i;d++){const E=[],A=d/i;let x=0;d===0&&s===0?x=.5/e:d===i&&l===Math.PI&&(x=-.5/e);for(let w=0;w<=e;w++){const T=w/e;h.x=-t*Math.cos(r+T*a)*Math.sin(s+A*o),h.y=t*Math.cos(s+A*o),h.z=t*Math.sin(r+T*a)*Math.sin(s+A*o),_.push(h.x,h.y,h.z),f.copy(h).normalize(),g.push(f.x,f.y,f.z),m.push(T+x,1-A),E.push(c++)}u.push(E)}for(let d=0;d<i;d++)for(let E=0;E<e;E++){const A=u[d][E+1],x=u[d][E],w=u[d+1][E],T=u[d+1][E+1];(d!==0||s>0)&&p.push(A,x,T),(d!==i-1||l<Math.PI)&&p.push(x,w,T)}this.setIndex(p),this.setAttribute("position",new ye(_,3)),this.setAttribute("normal",new ye(g,3)),this.setAttribute("uv",new ye(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class xx extends Ue{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class ca extends Ai{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nd,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Hu={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(this.files[n]=t)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class Mx{constructor(t,e,i){const r=this;let a=!1,s=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(u){o++,a===!1&&r.onStart!==void 0&&r.onStart(u,s,o),a=!0},this.itemEnd=function(u){s++,r.onProgress!==void 0&&r.onProgress(u,s,o),s===o&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const p=c[h],_=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return _}return null}}}const Sx=new Mx;class cc{constructor(t){this.manager=t!==void 0?t:Sx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const i=this;return new Promise(function(r,a){i.load(t,r,e,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}cc.DEFAULT_MATERIAL_NAME="__DEFAULT";class Ex extends cc{constructor(t){super(t)}load(t,e,i,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const a=this,s=Hu.get(t);if(s!==void 0)return a.manager.itemStart(t),setTimeout(function(){e&&e(s),a.manager.itemEnd(t)},0),s;const o=_a("img");function l(){u(),Hu.add(t,this),e&&e(this),a.manager.itemEnd(t)}function c(h){u(),r&&r(h),a.manager.itemError(t),a.manager.itemEnd(t)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),a.manager.itemStart(t),o.src=t,o}}class yx extends cc{constructor(t){super(t)}load(t,e,i,r){const a=new Ne,s=new Ex(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(t,function(o){a.image=o,a.needsUpdate=!0,e!==void 0&&e(a)},i,r),a}}class uc extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const po=new re,ku=new P,Wu=new P;class Sd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new nc,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;ku.setFromMatrixPosition(t.matrixWorld),e.position.copy(ku),Wu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Wu),e.updateMatrixWorld(),po.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(po),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(po)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Xu=new re,ia=new P,mo=new P;class Ax extends Sd{constructor(){super(new un(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new bt(4,2),this._viewportCount=6,this._viewports=[new he(2,1,1,1),new he(0,1,1,1),new he(3,1,1,1),new he(1,1,1,1),new he(3,0,1,1),new he(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,r=this.matrix,a=t.distance||i.far;a!==i.far&&(i.far=a,i.updateProjectionMatrix()),ia.setFromMatrixPosition(t.matrixWorld),i.position.copy(ia),mo.copy(i.position),mo.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(mo),i.updateMatrixWorld(),r.makeTranslation(-ia.x,-ia.y,-ia.z),Xu.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xu)}}class es extends uc{constructor(t,e,i=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Ax}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class bx extends Sd{constructor(){super(new ic(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tx extends uc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new bx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Cx extends uc{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Rx{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=qu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=qu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function qu(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:kl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=kl);const wx={resolucion:{bajo:{ancho:Dt.CALIDAD.bajo.ancho,alto:Dt.CALIDAD.bajo.alto},medio:{ancho:Dt.CALIDAD.medio.ancho,alto:Dt.CALIDAD.medio.alto},alto:{ancho:Dt.CALIDAD.alto.ancho,alto:Dt.CALIDAD.alto.alto}}};function Px(n,t,e){const r=wx.resolucion[n].alto;return{ancho:Math.max(1,Math.round(r*t/Math.max(1,e))),alto:r}}class Lx{grupo=new Sr;volcan;direccionLuna=new P(-.35,.75,-.55).normalize();constructor(t){const e=new De(new lc(100,24,16),new Ue({side:Ye,depthWrite:!1,fog:!1,uniforms:{arriba:{value:new Pt(526876)},medio:{value:new Pt(1712978)},horizonte:{value:new Pt(2784128)}},vertexShader:"varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`varying vec3 vP; uniform vec3 arriba; uniform vec3 medio; uniform vec3 horizonte;
          void main(){ float h = normalize(vP).y;
            vec3 c = mix(horizonte, medio, smoothstep(-0.05, 0.22, h));
            c = mix(c, arriba, smoothstep(0.18, 0.85, h));
            c = mix(c * 0.5, c, step(0.0, h));
            gl_FragColor = vec4(c, 1.0); }`}));e.renderOrder=-10,e.frustumCulled=!1,this.grupo.add(e);const i=vs(99),r=[],a=[];for(let f=0;f<Dt.ESTRELLAS;f++){const p=i(),_=i(),g=p*Math.PI*2,m=Math.acos(1-_*.95);r.push(Math.sin(m)*Math.cos(g)*95,Math.cos(m)*95,Math.sin(m)*Math.sin(g)*95);const d=.5+i()*.5;a.push(.91*d,.83*d,.63*d+.2)}const s=new Oe;s.setAttribute("position",new ye(r,3)),s.setAttribute("color",new ye(a,3));const o=new sc(s,new Ts({size:2,sizeAttenuation:!1,vertexColors:!0,fog:!1,depthWrite:!1}));o.renderOrder=-9,o.frustumCulled=!1,this.grupo.add(o);const l=document.createElement("canvas");l.width=l.height=64;const c=l.getContext("2d"),u=c.createRadialGradient(32,32,6,32,32,32);u.addColorStop(0,"rgba(232,211,160,1)"),u.addColorStop(.35,"rgba(138,160,207,0.9)"),u.addColorStop(.5,"rgba(138,160,207,0.15)"),u.addColorStop(1,"rgba(138,160,207,0)"),c.fillStyle=u,c.fillRect(0,0,64,64);const h=new Ml(new ms({map:new oc(l),fog:!1,depthWrite:!1,transparent:!0}));h.position.copy(this.direccionLuna).multiplyScalar(90),h.scale.set(22,22,1),h.renderOrder=-8,this.grupo.add(h),this.volcan=new De(new qi(170,64),new xa({map:t.sprites.volcan,transparent:!0,alphaTest:.5,fog:!1,depthWrite:!1})),this.volcan.position.set(0,8,-96),this.volcan.renderOrder=-7,this.volcan.frustumCulled=!1,this.grupo.add(this.volcan)}actualizar(t){this.grupo.position.set(t.x,t.y,t.z),this.volcan.position.y=zt.SUELO_Y-t.y+22}}class _o{constructor(t,e,i,r,a=!0){this.max=t,this.gravedad=r,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*3),this.base=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.vida=new Float32Array(t),this.vidaMax=new Float32Array(t).fill(1);for(let o=0;o<t;o++)this.pos[o*3+1]=-1e3;const s=new Oe;s.setAttribute("position",new $e(this.pos,3)),s.setAttribute("color",new $e(this.col,3)),this.puntos=new sc(s,new Ts({map:e,size:i,sizeAttenuation:!0,vertexColors:!0,transparent:!0,alphaTest:.05,depthWrite:!1,blending:a?Rr:Vi})),this.puntos.frustumCulled=!1}puntos;pos;col;vel;vida;vidaMax;base;siguiente=0;emitir(t,e,i,r,a,s,o,l,c,u){const h=this.siguiente;this.siguiente=(h+1)%this.max,this.pos[h*3]=t,this.pos[h*3+1]=e,this.pos[h*3+2]=i,this.vel[h*3]=r,this.vel[h*3+1]=a,this.vel[h*3+2]=s,this.base[h*3]=l,this.base[h*3+1]=c,this.base[h*3+2]=u,this.vida[h]=o,this.vidaMax[h]=o}actualizar(t){for(let e=0;e<this.max;e++){if(this.vida[e]<=0){this.col[e*3]=this.col[e*3+1]=this.col[e*3+2]=0,this.pos[e*3+1]=-1e3;continue}this.vida[e]-=t,this.vel[e*3+1]-=this.gravedad*t,this.pos[e*3]+=this.vel[e*3]*t,this.pos[e*3+1]+=this.vel[e*3+1]*t,this.pos[e*3+2]+=this.vel[e*3+2]*t;const i=Math.max(0,this.vida[e]/this.vidaMax[e]);this.col[e*3]=this.base[e*3]*i,this.col[e*3+1]=this.base[e*3+1]*i,this.col[e*3+2]=this.base[e*3+2]*i}this.puntos.geometry.attributes.position.needsUpdate=!0,this.puntos.geometry.attributes.color.needsUpdate=!0}vaciar(){this.vida.fill(0)}}class Dx{constructor(t,e){this.n=t;const i=vs(5);this.pos=new Float32Array(t*3),this.fase=new Float32Array(t);for(let a=0;a<t;a++)this.pos[a*3]=(i()-.5)*12,this.pos[a*3+1]=(i()-.5)*6,this.pos[a*3+2]=(i()-.5)*12,this.fase[a]=i()*6.28;const r=new Oe;r.setAttribute("position",new $e(new Float32Array(t*3),3)),this.puntos=new sc(r,new Ts({map:e,size:.035,sizeAttenuation:!0,transparent:!0,opacity:.55,color:9085135,alphaTest:.05,depthWrite:!1,blending:Rr})),this.puntos.frustumCulled=!1}puntos;pos;fase;actualizar(t,e,i){const r=this.puntos.geometry.attributes.position,a=r.array;for(let s=0;s<this.n;s++){const o=s<i,l=((this.pos[s*3]+Math.sin(e*.2+this.fase[s])*.5-t.x+6)%12+12)%12-6,c=((this.pos[s*3+1]+e*.05*(1+s%3)-t.y+3)%6+6)%6-3,u=((this.pos[s*3+2]+Math.cos(e*.17+this.fase[s])*.5-t.z+6)%12+12)%12-6;a[s*3]=t.x+l,a[s*3+1]=o?t.y+c:-1e3,a[s*3+2]=t.z+u}r.needsUpdate=!0}}class Ix{constructor(t,e){this.n=t,this.malla=new mx(new Ei(.9,.9,.9),e,t),this.malla.frustumCulled=!1,this.malla.visible=!1;for(let i=0;i<t;i++)this.estado.push({x:0,y:-1e3,z:0,vy:0,giro:0,ry:0})}malla;estado=[];m=new re;q=new Gr;e=new vn;activo=!1;iniciar(){this.activo=!0,this.malla.visible=!0;for(let t=0;t<this.n;t++)this.estado[t].y=-1e3}detener(){this.activo=!1,this.malla.visible=!1}actualizar(t,e,i){if(this.activo){for(let r=0;r<this.n;r++){const a=this.estado[r];a.y<e.y-14||a.y>1e5||a.y===-1e3?Math.random()<i*t*20&&(a.x=e.x+(Math.random()-.5)*8,a.z=e.z+(Math.random()-.5)*8,a.y=e.y+6+Math.random()*4,a.vy=-2-Math.random()*3,a.giro=(Math.random()-.5)*4,a.ry=Math.random()*6):(a.vy-=20*t,a.y+=a.vy*t,a.ry+=a.giro*t),this.e.set(a.ry*.7,a.ry,a.ry*.3),this.q.setFromEuler(this.e),this.m.compose(new P(a.x,a.y,a.z),this.q,new P(1,1,1)),this.malla.setMatrixAt(r,this.m)}this.malla.instanceMatrix.needsUpdate=!0}}}class Ux{valor=0;añadir(t,e=.6){this.valor=Math.min(e,this.valor+t)}actualizar(t,e){this.valor=Math.max(0,this.valor-this.valor/Math.max(.001,e)*t-5e-4)}}function El(n){switch(n){case"azufre":return[.96,.72,.26];case"oro":return[.89,.73,.33];case"esmeralda":return[.18,.75,.44];case"rubi":return[.84,.22,.31];case"zafiro":return[.24,.55,1];default:return[1,1,1]}}function Nx(){const n=document.createElement("canvas");n.width=n.height=8;const t=n.getContext("2d");t.fillStyle="#fff",t.fillRect(3,1,2,6),t.fillRect(1,3,6,2);const e=new oc(n);return e.magFilter=Te,e.minFilter=Te,e}const mr=zt.CHUNK,Ox=[{n:[1,0,0],eje:0,v:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]]},{n:[-1,0,0],eje:0,v:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]]},{n:[0,1,0],eje:1,v:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]]},{n:[0,-1,0],eje:1,v:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]]},{n:[0,0,1],eje:2,v:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]]},{n:[0,0,-1],eje:2,v:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]]}],Yu=[[0,0],[1,0],[1,1],[0,1]];function go(n,t,e,i){return n.get(t,e,i)!==et.aire?1:0}function Fx(n,t,e,i){const r=new Map,a=t*mr,s=e*mr,o=i*mr,l=Math.min(a+mr,Le),c=Math.min(s+mr,_i),u=Math.min(o+mr,tn);for(let x=s;x<c;x++)for(let w=o;w<u;w++)for(let T=a;T<l;T++){const C=n.bloques[T+w*Le+x*Le*tn];if(C!==et.aire)for(const D of Ox){const y=T+D.n[0],S=x+D.n[1],R=w+D.n[2];if(y<0||R<0||S<0||y>=Le||R>=tn||S<_i&&n.bloques[y+R*Le+S*Le*tn]!==et.aire)continue;let G=r.get(C);G||(G={pos:[],nor:[],uv:[],col:[],idx:[],nv:0},r.set(C,G));const B=[],$=(D.eje+1)%3,j=(D.eje+2)%3;for(let Z=0;Z<4;Z++){const V=D.v[Z],rt=V[$]?1:-1,ht=V[j]?1:-1,_t=[y,S,R],It=[y,S,R],jt=[y,S,R];_t[$]+=rt,It[j]+=ht,jt[$]+=rt,jt[j]+=ht;const W=go(n,_t[0],_t[1],_t[2]),Q=go(n,It[0],It[1],It[2]),mt=go(n,jt[0],jt[1],jt[2]),at=W&&Q?0:3-(W+Q+mt);B.push(at),G.pos.push(T+V[0],x+V[1],w+V[2]),G.nor.push(D.n[0],D.n[1],D.n[2]);const Et=Dt.AO[at];G.col.push(Et,Et,Et),G.uv.push(Yu[Z][0],Yu[Z][1])}const k=G.nv;B[0]+B[2]>B[1]+B[3]?G.idx.push(k+1,k+2,k+3,k+1,k+3,k):G.idx.push(k,k+1,k+2,k,k+2,k+3),G.nv+=4}}if(r.size===0)return{geometria:null,materiales:[],triangulos:0};let h=[],f=[],p=[],_=[];const g=[],m=[],d=new Oe;let E=0,A=0;for(const[x,w]of[...r.entries()].sort((T,C)=>T[0]-C[0])){h=h.concat(w.pos),f=f.concat(w.nor),p=p.concat(w.uv),_=_.concat(w.col);for(const T of w.idx)g.push(T+E);d.addGroup(A,w.idx.length,m.length),m.push(x),A+=w.idx.length,E+=w.nv}return d.setAttribute("position",new ye(h,3)),d.setAttribute("normal",new ye(f,3)),d.setAttribute("uv",new ye(p,2)),d.setAttribute("color",new ye(_,3)),d.setIndex(g.length>65535?new ec(g,1):new tc(g,1)),d.computeBoundingSphere(),d.computeBoundingBox(),{geometria:d,materiales:m,triangulos:g.length/3}}class Yi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const zx=new ic(-1,1,1,-1,0,1);class Bx extends Oe{constructor(){super(),this.setAttribute("position",new ye([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ye([0,2,0,0,2,0],2))}}const Vx=new Bx;class Cs{constructor(t){this._mesh=new De(Vx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,zx)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}const Gx={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class Hx extends Yi{constructor(t,e,i){super(),this.scene=t,this.camera=e;const r=i.focus!==void 0?i.focus:1,a=i.aperture!==void 0?i.aperture:.025,s=i.maxblur!==void 0?i.maxblur:1;this.renderTargetDepth=new gn(1,1,{minFilter:Te,magFilter:Te,type:zn}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new vd,this.materialDepth.depthPacking=ed,this.materialDepth.blending=Fn;const o=Gx,l=Nr.clone(o.uniforms);l.tDepth.value=this.renderTargetDepth.texture,l.focus.value=r,l.aspect.value=e.aspect,l.aperture.value=a,l.maxblur.value=s,l.nearClip.value=e.near,l.farClip.value=e.far,this.materialBokeh=new Ue({defines:Object.assign({},o.defines),uniforms:l,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.uniforms=l,this.fsQuad=new Cs(this.materialBokeh),this._oldClearColor=new Pt}render(t,e,i){this.scene.overrideMaterial=this.materialDepth,t.getClearColor(this._oldClearColor);const r=t.getClearAlpha(),a=t.autoClear;t.autoClear=!1,t.setClearColor(16777215),t.setClearAlpha(1),t.setRenderTarget(this.renderTargetDepth),t.clear(),t.render(this.scene,this.camera),this.uniforms.tColor.value=i.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),t.clear(),this.fsQuad.render(t)),this.scene.overrideMaterial=null,t.setClearColor(this._oldClearColor),t.setClearAlpha(r),t.autoClear=a}setSize(t,e){this.materialBokeh.uniforms.aspect.value=t/e,this.renderTargetDepth.setSize(t,e)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}}const Ed={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class yd extends Yi{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ue?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Nr.clone(t.uniforms),this.material=new Ue({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Cs(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class $u extends Yi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const r=t.getContext(),a=t.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let s,o;this.inverse?(s=0,o=1):(s=1,o=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),a.buffers.stencil.setFunc(r.ALWAYS,s,4294967295),a.buffers.stencil.setClear(o),a.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(r.EQUAL,1,4294967295),a.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),a.buffers.stencil.setLocked(!0)}}class kx extends Yi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Wx{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new bt);this._width=i.width,this._height=i.height,e=new gn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:zn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new yd(Ed),this.copyPass.material.blending=Fn,this.clock=new Rx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let r=0,a=this.passes.length;r<a;r++){const s=this.passes[r];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),s.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),s.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}$u!==void 0&&(s instanceof $u?i=!0:s instanceof kx&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new bt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(i,r)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Xx={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class qx extends Yi{constructor(){super();const t=Xx;this.uniforms=Nr.clone(t.uniforms),this.material=new xx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Cs(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},$t.getTransfer(this._outputColorSpace)===oe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===zh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Bh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Vh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Gh?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Hh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===kh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Yx extends Yi{constructor(t,e,i=null,r=null,a=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Pt}render(t,e,i){const r=t.autoClear;t.autoClear=!1;let a,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(a=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),t.autoClear=r}}const $x={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Pt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Or extends Yi{constructor(t,e,i,r){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=r,this.resolution=t!==void 0?new bt(t.x,t.y):new bt(256,256),this.clearColor=new Pt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new gn(a,s,{type:zn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const f=new gn(a,s,{type:zn});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const p=new gn(a,s,{type:zn});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),a=Math.round(a/2),s=Math.round(s/2)}const o=$x;this.highPassUniforms=Nr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ue({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new bt(1/a,1/s),a=Math.round(a/2),s=Math.round(s/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Ed;this.copyUniforms=Nr.clone(u.uniforms),this.blendMaterial=new Ue({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Rr,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Pt,this.oldClearAlpha=1,this.basic=new xa,this.fsQuad=new Cs(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),r=Math.round(e/2);this.renderTargetBright.setSize(i,r);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(i,r),this.renderTargetsVertical[a].setSize(i,r),this.separableBlurMaterials[a].uniforms.invSize.value=new bt(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(t,e,i,r,a){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const s=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Or.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Or.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=s}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new Ue({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new bt(.5,.5)},direction:{value:new bt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new Ue({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Or.BlurDirectionX=new bt(1,0);Or.BlurDirectionY=new bt(0,1);const jx={uniforms:{tDiffuse:{value:null},fuerza:{value:Dt.VINETA.fuerza},suavidad:{value:Dt.VINETA.suavidad}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform sampler2D tDiffuse; uniform float fuerza; uniform float suavidad; varying vec2 vUv;
    void main(){ vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = vUv - 0.5; float v = smoothstep(0.85, 0.85 - suavidad, length(d) * 1.35);
      c.rgb *= mix(1.0 - fuerza, 1.0, v);
      gl_FragColor = c; }`};class Zx{constructor(t,e,i,r,a){this.renderer=t,this.camera=i,this.composer=new Wx(t),this.composer.addPass(new Yx(e,i)),this.bokeh=new Hx(e,i,{focus:7,aperture:12e-5,maxblur:.006}),this.composer.addPass(this.bokeh),this.bloom=new Or(new bt(r,a),Dt.BLOOM.fuerza,Dt.BLOOM.radio,Dt.BLOOM.umbral),this.composer.addPass(this.bloom),this.vineta=new yd(jx),this.composer.addPass(this.vineta),this.salida=new qx,this.composer.addPass(this.salida),this.redimensionar(r,a)}composer;bloom;bokeh;vineta;salida;aplicarCalidad(t){const e=Dt.CALIDAD[t];this.bloom.enabled=e.bloom,this.bokeh.enabled=e.dof}redimensionar(t,e){this.composer.setPixelRatio(1),this.composer.setSize(t,e),this.bloom.setSize(t,e)}renderizar(t){this.composer.render(t)}get camara(){return this.camera}}const ju=new vn;function ui(n,t,e,i=.35){const r=new qi(t,e);r.translate(0,e/2,0);const a=new ca({map:n,alphaTest:.5,side:An,emissive:16777215,emissiveMap:n,emissiveIntensity:i}),s=new De(r,a);return s.frustumCulled=!1,s}function hi(n,t){ju.set(0,Math.atan2(t.x-n.position.x,t.z-n.position.z),0),n.rotation.copy(ju)}function Kx(){const n=document.createElement("canvas");n.width=n.height=32;const t=n.getContext("2d"),e=t.createRadialGradient(16,16,0,16,16,16);return e.addColorStop(0,"rgba(255,255,255,0.9)"),e.addColorStop(.4,"rgba(255,255,255,0.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,32,32),new oc(n)}class Jx{grupo=new Sr;tex;momias=new Map;sueltos=new Map;chepe;vendedor;farolSalita;fogata;faroles=[];naturaleza=[];torogoz;auraTex=Kx();torogozEstado={modo:"orbita",reloj:14,dur:0};posFogata=new P(de.FOGATA.x,zt.SUELO_Y,de.FOGATA.z);constructor(t){this.tex=t,this.fogata=ui(t.sprites.fogata_0,1.5,1.5,.9),this.fogata.position.copy(this.posFogata),this.grupo.add(this.fogata);for(const a of de.FAROLES){const s=ui(t.sprites.farol_0,.9,1.8,.9);s.position.set(a.x,zt.SUELO_Y,a.z),this.faroles.push(s),this.grupo.add(s)}const e=new De(new qi(4.4,1.1),new ca({map:t.sprites.rotulo,alphaTest:.5,side:An,emissive:16777215,emissiveMap:t.sprites.rotulo,emissiveIntensity:.55}));e.position.set((de.TIENDA.x0+de.TIENDA.x1+1)/2,zt.SUELO_Y+4.65,de.TIENDA.z0-.45),e.rotation.y=Math.PI,this.grupo.add(e);const i=vs(7),r=(a,s,o,l,c)=>{for(let u=0;u<a;u++){const h=Math.floor(i()*4),f=1.5+i()*(zt.ANCHO-3),p=c[0]+i()*(c[1]-c[0]),_=h===0?p:h===1?zt.ANCHO-p:f,g=h===2?p:h===3?zt.LARGO-p:f,m=ui(t.sprites[s],o,l,.45);m.position.set(_,zt.SUELO_Y,g),this.naturaleza.push(m),this.grupo.add(m)}};r(de.ARBOLES,"pino",5,7.5,[1.5,4.2]),r(de.IZOTES,"izote",2,4,[1.2,4.6]),this.vendedor=ui(t.sprites.vendedor,1.2,1.8,.4),this.grupo.add(this.vendedor),this.farolSalita=ui(t.sprites.farol_0,.6,1.2,.9),this.grupo.add(this.farolSalita),this.chepe=ui(t.sprites.chepe_0,1.2,1.8,.45),this.chepe.visible=!1,this.grupo.add(this.chepe),this.torogoz=ui(t.sprites.torogoz_0,.6,.6,.6),this.torogoz.geometry.translate(0,-.3,0),this.torogoz.visible=!1,this.grupo.add(this.torogoz)}cantar(){this.torogozEstado.modo="cuadro",this.torogozEstado.dur=2.2,this.torogozEstado.reloj=14+Math.random()*10}posicionSalita(t){const e=zt.SUELO_Y-30;return new P(ce.SALITA_X+.5,e,ce.SALITA_Z+2.3)}actualizar(t,e,i,r){this.fogata.material=this.fogata.material;const a=Math.floor(r*8)%3;this.fogata.material.map=this.tex.sprites[`fogata_${a}`],this.fogata.material.emissiveMap=this.tex.sprites[`fogata_${a}`],hi(this.fogata,e);const s=Math.floor(r*4)%2;for(const l of this.faroles){const c=l.material;c.map=c.emissiveMap=this.tex.sprites[`farol_${s}`],hi(l,e)}for(const l of this.naturaleza)hi(l,e);const o=_h();this.vendedor.position.set(o.x,zt.SUELO_Y-30,o.z),hi(this.vendedor,e),this.farolSalita.position.copy(this.posicionSalita(t)),this.farolSalita.position.x=ce.SALITA_X+.4,this.farolSalita.position.z=ce.SALITA_Z+2.6,hi(this.farolSalita,e),this.actualizarMomias(t,e,r),this.actualizarChepe(t,e,r),this.actualizarSueltos(t,e,r),this.actualizarTorogoz(t,e,i,r)}actualizarMomias(t,e,i){const r=new Set;for(const a of t.momias){r.add(a.uid);let s=this.momias.get(a.uid);s||(s=ui(this.tex.sprites.momia_0,1.2,kt.ALTO,.35),this.grupo.add(s),this.momias.set(a.uid,s));const o=s.material,l=a.dano>0?"momia_dano":Math.floor(i*2.5+a.uid)%2===0?"momia_0":"momia_1";o.map=o.emissiveMap=this.tex.sprites[l],s.position.set(a.x,a.y,a.z),hi(s,e)}for(const[a,s]of this.momias)r.has(a)||(this.grupo.remove(s),s.geometry.dispose(),s.material.dispose(),this.momias.delete(a))}actualizarChepe(t,e,i){const r=t.chepe;if(this.chepe.visible=r.activo,!r.activo)return;const a=this.chepe.material;a.map=a.emissiveMap=this.tex.sprites[Math.floor(i*3)%2===0?"chepe_0":"chepe_1"],this.chepe.position.set(r.x,r.y,r.z),hi(this.chepe,e)}actualizarSueltos(t,e,i){const r=new Set;for(const a of t.sueltos){r.add(a.uid);let s=this.sueltos.get(a.uid);if(!s){const[l,c,u]=El(a.mineral),h=new Ml(new ms({map:this.tex.sprites[`mineral_${a.mineral}`],alphaTest:.5,fog:!0}));h.scale.set(.55,.55,1);const f=new Ml(new ms({map:this.auraTex,color:new Pt(l,c,u),blending:Rr,transparent:!0,depthWrite:!1,opacity:.7,fog:!0}));f.scale.set(1.5,1.5,1),this.grupo.add(h,f),s={icono:h,aura:f},this.sueltos.set(a.uid,s)}const o=a.y+Math.sin(i*3+a.uid)*.07;s.icono.position.set(a.x,o,a.z),s.aura.position.set(a.x,o,a.z),s.aura.material.opacity=.55+Math.sin(i*5+a.uid)*.2}for(const[a,s]of this.sueltos)r.has(a)||(this.grupo.remove(s.icono,s.aura),s.icono.material.dispose(),s.aura.material.dispose(),this.sueltos.delete(a))}actualizarTorogoz(t,e,i,r){const a=this.torogoz;if(a.visible=t.mascota.comprada,!t.mascota.comprada)return;const s=this.torogozEstado;s.reloj-=i,s.modo==="orbita"&&s.reloj<=0&&(s.modo="cuadro",s.dur=3,s.reloj=16+Math.random()*12),s.modo==="cuadro"&&(s.dur-=i,s.dur<=0&&(s.modo="orbita"));const o=t.jugador,l=Cr(o),c=new P;if(s.modo==="cuadro")c.set(o.pos.x+l.x*1.6+Math.cos(o.guinada)*.5,o.pos.y+1.55+l.y*1.6+.1+Math.sin(r*9)*.05,o.pos.z+l.z*1.6-Math.sin(o.guinada)*.5);else{const f=r*.9;c.set(o.pos.x+Math.cos(f)*1.5,o.pos.y+2.1+Math.sin(r*2.3)*.25,o.pos.z+Math.sin(f)*1.5)}t.mundo.esSolido(Math.floor(c.x),Math.floor(c.y),Math.floor(c.z))&&c.set(o.pos.x,o.pos.y+1.9,o.pos.z);const u=1-Math.exp(-6*i);(a.position.lengthSq()===0||a.position.distanceTo(c)>12)&&a.position.copy(c),a.position.lerp(c,u);const h=a.material;h.map=h.emissiveMap=this.tex.sprites[Math.floor(r*10)%2===0?"torogoz_0":"torogoz_1"],hi(a,e)}reiniciar(){for(const[,t]of this.momias)this.grupo.remove(t);this.momias.clear();for(const[,t]of this.sueltos)this.grupo.remove(t.icono,t.aura);this.sueltos.clear()}}const Qx={[et.piedra_azufre]:Dt.EMISION_MINERAL,[et.piedra_oro]:Dt.EMISION_MINERAL,[et.piedra_esmeralda]:Dt.EMISION_MINERAL,[et.piedra_rubi]:Dt.EMISION_MINERAL,[et.piedra_zafiro]:Dt.EMISION_MINERAL,[et.fosil_0]:Dt.EMISION_FOSIL,[et.fosil_1]:Dt.EMISION_FOSIL,[et.fosil_2]:Dt.EMISION_FOSIL,[et.arenisca_jeroglificos]:Dt.EMISION_FONDO},tM={[et.tierra]:[.54,.42,.29],[et.piedra]:[.34,.44,.68],[et.obsidiana]:[.42,.25,.56],[et.estrato_0]:[.62,.42,.74],[et.estrato_1]:[.38,.71,.65],[et.estrato_2]:[.89,.73,.33]},Zu=[[.62,.42,.74],[.38,.71,.65],[.89,.73,.33]];class eM{constructor(t,e,i){this.canvas=t,this.tex=i,this.juego=e,this.renderer=new ux({canvas:t,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.camara=new un(e.ajustes.fov,16/9,Dt.CERCA,Dt.LEJOS),this.camara.rotation.order="YXZ",this.escena.fog=new ac(1054010,Dt.NIEBLA_SUPERFICIE),this.materiales[0]=new ca;for(let o=1;o<Co.length;o++){const l=Co[o],c=Qx[o];this.materiales[o]=new ca({map:i.bloques[l],vertexColors:!0,...c?{emissive:16777215,emissiveMap:i.emision[l],emissiveIntensity:c}:{}})}this.escena.add(this.luzAmbiente,this.luna,this.farol,this.luzFogata,this.luzSalita),this.escena.add(this.luna.target);for(const o of de.FAROLES){const l=new es(16103746,9,14,1.6);l.position.set(o.x,zt.SUELO_Y+1.5,o.z),this.lucesFaroles.push(l),this.escena.add(l)}this.luzFogata.position.set(de.FOGATA.x,zt.SUELO_Y+.9,de.FOGATA.z),this.cielo=new Lx(i),this.escena.add(this.cielo.grupo),this.sprites=new Jx(i),this.escena.add(this.sprites.grupo);const r=Dt.CALIDAD.alto,a=Nx();this.chispas=new _o(r.particulas,a,.08,9),this.polvo=new _o(r.particulas,i.sprites.polvo,.14,2.5),this.fosilP=new _o(r.particulas,a,.1,-.4),this.flotante=new Dx(r.polvo,i.sprites.polvo),this.caida=new Ix(70,new ca({map:i.bloques.piedra})),this.escena.add(this.chispas.puntos,this.polvo.puntos,this.fosilP.puntos,this.flotante.puntos,this.caida.malla),this.contorno=new gx(new vx(new Ei(1.006,1.006,1.006)),new Md({color:16773299,transparent:!0,opacity:.75,fog:!1})),this.contorno.visible=!1,this.escena.add(this.contorno);const s=i.grietas.map(o=>new xa({map:o,transparent:!0,alphaTest:.5,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));this.grieta=new De(new Ei(1.004,1.004,1.004),s[0]),this.grieta.userData.materiales=s,this.grieta.visible=!1,this.escena.add(this.grieta),this.post=new Zx(this.renderer,this.escena,this.camara,640,360),this.reducirMovimiento=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,this.conectarEventos(),this.aplicarCalidad(e.ajustes.calidad),this.redimensionar(window.innerWidth,window.innerHeight)}renderer;escena=new hx;camara;post;cielo;sprites;materiales=[];chunks=new Map;luzAmbiente=new Cx(4875176,1);luna=new Tx(9085135,1);farol=new es(16761972,Dt.LUZ_FAROL.intensidad,Dt.LUZ_FAROL.distancia,Dt.LUZ_FAROL.decae);luzFogata=new es(14250794,20,22,1.5);lucesFaroles=[];luzSalita=new es(16103746,0,12,1.6);chispas;polvo;fosilP;flotante;caida;sacudida=new Ux;contorno;grieta;fovActual=Dt.FOV_DEFECTO;previo={x:0,y:0,z:0,guinada:0,cabeceo:0};reconstruirTodo=!0;calidad="medio";reducirMovimiento=!1;juego;stats={llamadas:0,triangulos:0,chunks:0,geometrias:0};alImpacto=null;usarJuego(t){this.juego=t,this.reconstruirTodo=!0,this.sprites.reiniciar()}aplicarCalidad(t){this.calidad=t,this.post.aplicarCalidad(t),this.redimensionar(window.innerWidth,window.innerHeight)}redimensionar(t,e){const{ancho:i,alto:r}=Px(this.calidad,t,e);this.renderer.setSize(i,r,!1),this.camara.aspect=i/r,this.camara.updateProjectionMatrix(),this.post.redimensionar(i,r)}asignarPrevio(){const t=this.juego.jugador;this.previo={x:t.pos.x,y:t.pos.y,z:t.pos.z,guinada:t.guinada,cabeceo:t.cabeceo}}conectarEventos(){Ct("bloque:golpeado",()=>{const t=this.juego,e=t.picado.objetivo;if(!e)return;const i=Lf[e.cara>=0?e.cara:2],r=t.jugador.pos,a=Cr(t.jugador),s=r.x+a.x*e.distancia,o=r.y+be.OJOS+a.y*e.distancia,l=r.z+a.z*e.distancia,c=t.mundo.get(e.x,e.y,e.z),u=Tr(c),[h,f,p]=u?El(u):[1,.75,.3];for(let _=0;_<6;_++)this.chispas.emitir(s+i.x*.05,o+i.y*.05,l+i.z*.05,i.x*2+(Math.random()-.5)*3,i.y*2+Math.random()*2,i.z*2+(Math.random()-.5)*3,.4+Math.random()*.3,h,f,p);this.sacudida.añadir(ve.SACUDIDA_GOLPE)}),Ct("bloque:roto",t=>{const e=tM[t.bloque]??[.4,.5,.7],i=Tr(t.bloque);for(let r=0;r<12;r++)this.polvo.emitir(t.x+.5,t.y+.5,t.z+.5,(Math.random()-.5)*2.5,Math.random()*2,(Math.random()-.5)*2.5,.6+Math.random()*.5,e[0]*.8,e[1]*.8,e[2]*.8);if(i){const[r,a,s]=El(i);for(let o=0;o<10;o++)this.chispas.emitir(t.x+.5,t.y+.5,t.z+.5,(Math.random()-.5)*4,Math.random()*4,(Math.random()-.5)*4,.7,r,a,s);this.sacudida.añadir(ve.SACUDIDA_MINERAL),this.alImpacto?.("mineral")}else t.fosilId?(this.sacudida.añadir(ve.SACUDIDA_MINERAL*2),this.alImpacto?.("fosil")):this.sacudida.añadir(ve.SACUDIDA_ROTURA)}),Ct("momia:golpe",()=>this.sacudida.añadir(ve.SACUDIDA_GOLPE_MOMIA)),Ct("jugador:golpeado",()=>this.sacudida.añadir(ve.SACUDIDA_GOLPE_MOMIA*3)),Ct("venta:hecha",()=>this.sprites.cantar()),Ct("colapso:inicio",()=>{this.caida.iniciar()}),Ct("colapso:fin",()=>{this.caida.detener()}),Ct("mundo:regenerado",()=>{this.reconstruirTodo=!0,this.sprites.reiniciar()})}reconstruirMallas(t){const e=this.juego.mundo;if(this.reconstruirTodo){for(const[,r]of this.chunks)this.escena.remove(r),r.geometry.dispose();this.chunks.clear(),e.marcarTodoSucio(),this.reconstruirTodo=!1,t=1/0}if(e.sucios.size===0)return;let i=0;for(const r of[...e.sucios]){if(i++>=t)break;e.sucios.delete(r);const{cx:a,cy:s,cz:o}=ef(r),l=Fx(e,a,s,o),c=this.chunks.get(r);if(c&&(this.escena.remove(c),c.geometry.dispose(),this.chunks.delete(r)),!l.geometria)continue;const u=new De(l.geometria,l.materiales.map(h=>this.materiales[h]));this.escena.add(u),this.chunks.set(r,u)}}dibujar(t,e,i){const r=this.juego,a=r.jugador;this.reconstruirMallas(6);let s=a.pos.x,o=a.pos.y,l=a.pos.z,c=a.guinada,u=a.cabeceo;const h=this.previo;Math.hypot(a.pos.x-h.x,a.pos.y-h.y,a.pos.z-h.z)<3&&(s=h.x+(a.pos.x-h.x)*t,o=h.y+(a.pos.y-h.y)*t,l=h.z+(a.pos.z-h.z)*t,c=h.guinada+(a.guinada-h.guinada)*t,u=h.cabeceo+(a.cabeceo-h.cabeceo)*t),this.sacudida.actualizar(e,ve.SACUDIDA_DECAE_SEG);let f=this.reducirMovimiento?0:this.sacudida.valor;r.pantalla==="colapso"&&(f=this.reducirMovimiento?0:ve.SACUDIDA_COLAPSO*Math.min(1,r.colapso.reloj/1.2));const p=Math.hypot(a.vel.x,a.vel.z),_=this.reducirMovimiento||!a.enSuelo?0:Math.sin(i*9)*ve.BALANCEO_CAMARA*Math.min(1,p/4.3);this.camara.position.set(s+(Math.random()-.5)*f*.25,o+be.OJOS+_*.6+(Math.random()-.5)*f*.25,l+(Math.random()-.5)*f*.25),this.camara.rotation.set(u+(Math.random()-.5)*f*.5,c+(Math.random()-.5)*f*.5,_*.4);const g=r.ajustes.fov+(!this.reducirMovimiento&&p>be.CAMINA+.6?ve.FOV_CORRER:0);this.fovActual+=(g-this.fovActual)*Math.min(1,ve.FOV_SUAVIZADO*e),Math.abs(this.camara.fov-this.fovActual)>.01&&(this.camara.fov=this.fovActual,this.camara.updateProjectionMatrix());const m=Math.max(0,zt.SUELO_Y-o),d=Math.max(0,Math.min(1,1-(m-1)/5)),E=this.escena.fog;E.color.setRGB(.063,.082,.227).lerp(new Pt(.031,.04,.11),1-d),E.density=Bc.lerp(Math.min(Dt.NIEBLA_MAX,Dt.NIEBLA_MINA+m*Dt.NIEBLA_POR_METRO),Dt.NIEBLA_SUPERFICIE,d),this.renderer.setClearColor(E.color),this.luzAmbiente.intensity=Bc.lerp(Dt.LUZ_AMBIENTE_MINA,Dt.LUZ_AMBIENTE_SUPERFICIE,d),this.luna.intensity=Dt.LUZ_LUNA*d,this.luna.position.copy(this.camara.position).addScaledVector(this.cielo.direccionLuna,30),this.luna.target.position.copy(this.camara.position);{const T=Cr(a);this.farol.position.set(this.camara.position.x-T.x*.3,this.camara.position.y-T.y*.3,this.camara.position.z-T.z*.3)}this.farol.intensity=Dt.LUZ_FAROL.intensidad*(.96+Math.sin(i*13)*.02+Math.sin(i*7.3)*.02),this.luzFogata.intensity=18+Math.sin(i*17)*3+Math.sin(i*29)*2+Math.random()*2,this.lucesFaroles.forEach((T,C)=>{T.intensity=8+Math.sin(i*5+C*2)*1.2});const A=this.sprites.posicionSalita(r);this.luzSalita.position.set(ce.SALITA_X+.6,A.y+1.4,ce.SALITA_Z+2.4),this.luzSalita.intensity=Math.abs(o-A.y)<14?9+Math.sin(i*6):0,this.cielo.actualizar(this.camara.position),this.sprites.actualizar(r,this.camara.position,e,i);const x=r.picado.objetivo;let w=!1;if(x&&r.pantalla==="jugando"){const T=r.mundo.vidaMax(x.x,x.y,x.z);if(T>0){w=!0,this.contorno.position.set(x.x+.5,x.y+.5,x.z+.5);const C=r.mundo.vidaRestante(x.x,x.y,x.z);if(C<T-1e-6){const D=Math.min(4,Math.floor((1-C/T)*5));this.grieta.material=this.grieta.userData.materiales[D],this.grieta.position.copy(this.contorno.position),this.grieta.visible=!0}else this.grieta.visible=!1}}this.contorno.visible=w,w||(this.grieta.visible=!1);for(const T of r.fosilesMapa){if(Math.hypot(T.x+.5-s,T.y+.5-o,T.z+.5-l)>Dt.ALCANCE_PARTICULAS_FOSIL*2||Math.random()>e*14)continue;const D=r.mundo.get(T.x,T.y,T.z),y=Zu[Math.max(0,D-et.fosil_0)%3]??Zu[0];this.fosilP.emitir(T.x+Math.random(),T.y+.5+Math.random()*.6,T.z+Math.random(),(Math.random()-.5)*.3,.9+Math.random()*.8,(Math.random()-.5)*.3,1.8,y[0]*1.2,y[1]*1.2,y[2]*1.2)}if(r.pantalla==="colapso"){const T=Math.min(1,r.colapso.reloj/1.5);for(let C=0;C<3*T;C++)this.polvo.emitir(s+(Math.random()-.5)*8,o+3+Math.random()*3,l+(Math.random()-.5)*8,0,-1-Math.random(),0,1.4,.5,.55,.7);this.caida.actualizar(e,this.camara.position,T)}this.chispas.actualizar(e),this.polvo.actualizar(e),this.fosilP.actualizar(e),this.flotante.actualizar(this.camara.position,i,Dt.CALIDAD[this.calidad].polvo),this.renderer.info.reset(),this.post.renderizar(e),this.stats.chunks=this.chunks.size,this.stats.llamadas=this.renderer.info.render.calls,this.stats.triangulos=this.renderer.info.render.triangles,this.stats.geometrias=this.renderer.info.memory.geometries}medirEscena(){return this.renderer.info.reset(),this.renderer.render(this.escena,this.camara),{llamadas:this.renderer.info.render.calls,triangulos:this.renderer.info.render.triangles}}}function nM(){const n=new URLSearchParams(location.search).get("filtro");return n==="mipcercano"?"nearestMipmapNearest":n==="sin"?"nearest":"nearestMipmapLinear"}const iM={nearestMipmapNearest:Xh,nearestMipmapLinear:aa,nearest:Te},rM=["piedra_azufre","piedra_oro","piedra_esmeralda","piedra_rubi","piedra_zafiro","fosil_0","fosil_1","fosil_2","arenisca_jeroglificos"],aM=[["momia_0","enemigos/momia_idle_0"],["momia_1","enemigos/momia_idle_1"],["momia_dano","enemigos/momia_dano"],["torogoz_0","mascotas/torogoz_0"],["torogoz_1","mascotas/torogoz_1"],["chepe_0","personajes/chepe_0"],["chepe_1","personajes/chepe_1"],["vendedor","personajes/vendedor"],["pino","naturaleza/pino"],["izote","naturaleza/izote"],["fogata_0","fuego/fogata_0"],["fogata_1","fuego/fogata_1"],["fogata_2","fuego/fogata_2"],["rotulo","rotulos/tienda"],["volcan","cielo/volcan"],["farol_0","props/farol_0"],["farol_1","props/farol_1"],["chispa","particulas/chispa"],["polvo","particulas/polvo"],["mineral_azufre","iconos/mineral_azufre"],["mineral_oro","iconos/mineral_oro"],["mineral_esmeralda","iconos/mineral_esmeralda"],["mineral_rubi","iconos/mineral_rubi"],["mineral_zafiro","iconos/mineral_zafiro"]];function ns(n,t,e){return new Promise((i,r)=>{new yx().load(n,a=>{a.colorSpace=cn,a.magFilter=Te,a.generateMipmaps=e&&t!=="nearest",a.minFilter=e?iM[t]:Te,a.wrapS=a.wrapT=gi,a.anisotropy=1,i(a)},void 0,()=>r(new Error("No se pudo cargar "+n)))})}async function sM(){const n=nM(),t="./",e={bloques:{},emision:{},grietas:[],sprites:{},modo:n},i=[];for(const r of Co)r!=="aire"&&i.push(ns(`${t}bloques/${r}.png`,n,!0).then(a=>{e.bloques[r]=a}));for(const r of rM)i.push(ns(`${t}emision/${r}.png`,n,!0).then(a=>{e.emision[r]=a}));for(let r=0;r<5;r++)i.push(ns(`${t}grietas/grieta_${r}.png`,n,!1).then(a=>{e.grietas[r]=a}));for(const[r,a]of aM)i.push(ns(`${t}${a}.png`,n,!1).then(s=>{e.sprites[r]=s}));return await Promise.all(i),e}const oM=3;function Ad(){return document.getElementById("avisos")}function bd(n,t){setTimeout(()=>{n.dataset.saliendo="",setTimeout(()=>n.remove(),420)},t)}function _n(n,t="info",e=2800){const i=Ad();for(const a of Array.from(i.querySelectorAll(".aviso")))if(a.textContent===n)return;const r=document.createElement("div");for(r.className="aviso",r.dataset.tipo=t,r.textContent=n,i.appendChild(r);i.querySelectorAll(".aviso").length>oM;)i.querySelector(".aviso")?.remove();bd(r,e)}function Td(n,t,e=4200){const i=Ad(),r=document.createElement("div");r.className="cartel",r.setAttribute("role","status");const a=document.createElement("h3");a.textContent=n;const s=document.createElement("p");s.textContent=t,r.append(a,s),i.appendChild(r),bd(r,e)}function is(n,t={}){const e=document.getElementById("hud"),i=document.createElement("div");i.className="numero-flotante",i.textContent=n,t.mineral&&(i.dataset.mineral=t.mineral),t.venta&&(i.dataset.venta=""),i.style.marginLeft=`${Math.round((Math.random()-.5)*120)}px`,e.appendChild(i),setTimeout(()=>i.remove(),800)}const Ke=n=>document.getElementById(n),pi={};function di(n,t,e){pi[t]!==e&&(pi[t]=e,n.textContent=e)}function lM(n){const t=[],e=Ke("hud-mochila");for(let i=0;i<16;i++){const r=document.createElement("span");e.appendChild(r),t.push(r)}e._cuadros=t,Ct("record:nuevo",i=>_n(i.tipo==="bloques"?`${en.record} ${i.valor} bloques en una partida`:`${en.record} ${i.valor} m de profundidad`,"record")),Ct("mochila:llena",()=>_n(en.mochilaLlena,"alerta")),Ct("mineral:recogido",i=>is(`+${Ee(i.valor)} ${Hl(i.mineral)}`,{mineral:i.mineral})),Ct("venta:hecha",i=>is(`+${Ee(i.total)}`,{venta:!0})),Ct("chepe:venta",i=>is(`+${Ee(i.total)} Don Chepe`)),Ct("momia:muerta",i=>is(`+${Ee(i.colones)}`,{venta:!0})),Ct("calor:desmayo",()=>_n(en.desmayo,"malo",4500)),Ct("silbido:cancelado",()=>_n(en.silbidoCancelado,"malo")),Ct("jugador:golpeado",()=>_n("La momia te golpeó: +20 % de calor","malo",1800)),Ct("ascensor:viaje",i=>_n(i.parada===0?"Llegaste a la superficie":`Llegaste a la parada de ${i.parada} m`,"info",2200))}function cM(n){const t=n.jugador,e=Math.max(0,zt.SUELO_Y-t.pos.y);di(Ke("hud-colones"),"col",Ee(n.colones)),di(Ke("hud-prof"),"prof",`${Math.floor(e)} m`);const i=yi(n),r=Ke("hud-mult");r.hidden=i<=1,di(r,"mult",`x${i.toLocaleString("es-SV")}`),di(Ke("hud-record"),"rec",`Récord: ${n.records.profundidadMax} m, ${n.records.bloquesTotal} bloques picados`);const a=Ke("hud-calor"),s=t.calor>=Zn.CRITICO?"critico":t.calor>=Zn.ALTO?"alto":"normal";a.dataset.nivel!==s&&(a.dataset.nivel=s,Ke("vineta-calor").dataset.nivel=s);const o=Math.round(t.calor);pi.calor!==String(o)&&(pi.calor=String(o),a.querySelector(".relleno").style.transform=`scaleX(${t.calor/100})`,a.setAttribute("aria-valuenow",String(o)));const l=Ke("hud-mochila"),c=Rc(n).map(E=>E??"").join(",");pi.mini!==c&&(pi.mini=c,Rc(n).forEach((E,A)=>{E?l._cuadros[A].dataset.mineral=E:delete l._cuadros[A].dataset.mineral}),l.dataset.llena=String(bh(n)));const u=n.fosilesActivos.join(",");if(pi.fosiles!==u){pi.fosiles=u;const E=Ke("hud-fosiles");E.replaceChildren();for(const A of Pl){if(!n.fosilesActivos.includes(A))continue;const x=document.createElement("li");x.title=Do[A].nombre;const w=document.createElement("img");w.src=`./iconos/fosil_${A}.png`,w.alt=Do[A].nombre,x.appendChild(w),E.appendChild(x)}}Ke("hud-mascota").hidden=!n.mascota.comprada;const h=Ke("bloque-info"),f=n.pantalla==="jugando"?n.picado.objetivo:null;if(f){const E=n.mundo.get(f.x,f.y,f.z),A=n.mundo.vidaMax(f.x,f.y,f.z),x=n.mundo.vidaRestante(f.x,f.y,f.z),w=jf[E]??"Bloque";di(h.querySelector(".nombre"),"bn",w),di(h.querySelector(".vida"),"bv",A>0?`${Math.ceil(x)} / ${Math.ceil(A)}`:"indestructible"),h.hidden=!1}else h.hidden=!0;const p=Ke("interaccion"),_=n.pantalla==="jugando"?gh(n):null;_?(di(p,"inter",_.texto),p.hidden=!1):p.hidden=!0;const g=Ke("silbido");if(g.hidden=!t.silbando,t.silbando){const E=1-n.silbido.reloj/ih.SEG;g.querySelector(".relleno").style.transform=`scaleX(${Math.max(0,Math.min(1,E))})`,g.setAttribute("aria-valuenow",String(Math.round(E*100)))}const m=Ke("pista");let d="";n.pantalla==="jugando"&&(e>n.mundo.profundidadMina-6&&e>8?d=en.algoDuerme:n.tutorial.movio?n.tutorial.pico?!n.tutorial.vendio&&n.mochila.piezas.length>0&&(d=en.pistaVender):d=en.pistaPicar:d=en.pistaMoverse),m.hidden=d==="",d&&di(m,"pista",d)}let Je,Cd,Rd,yl=68,Fr=-1,Bn,Ve=null;function wd(n,t){const e=Ss(n.mineral,t),i=document.createElement("button");i.type="button",i.className="pieza",i.dataset.mineral=n.mineral,i.dataset.uid=String(n.uid),i.setAttribute("aria-label",`${Hl(n.mineral)}, vale ${Ee(n.valor)}, columna ${n.x+1}, fila ${n.y+1}`),i.style.setProperty("--px",String(n.x)),i.style.setProperty("--py",String(n.y)),i.style.setProperty("--pw",String(e[0].length));for(const r of e)for(const a of r){const s=document.createElement("span");if(a){s.dataset.lleno="";const o=document.createElement("img");o.src=`./iconos/mineral_${n.mineral}.png`,o.alt="",s.appendChild(o)}i.appendChild(s)}return i}function ua(){if(Ve)return;const n=Bn(),t=document.activeElement instanceof HTMLElement?document.activeElement.dataset.uid:void 0;Je.querySelectorAll(".pieza").forEach(i=>i.remove());let e=0;for(const i of n.mochila.piezas)e+=i.valor,Je.appendChild(wd(i,i.rot));t&&Je.querySelector(`.pieza[data-uid="${t}"]`)?.focus(),Rd.hidden=n.mochila.piezas.length>0,Cd.textContent=n.mochila.piezas.length>0?`${Ah(n)} de ${Un.COLUMNAS*Un.FILAS} espacios. Llevás ${Ee(e)}.`:`0 de ${Un.COLUMNAS*Un.FILAS} espacios.`}function Rs(n){return Bn().mochila.piezas.find(t=>t.uid===n)}function Pd(n,t,e){const i=Rs(n.uid);n.cx=i.x+Math.round(t/yl),n.cy=i.y+Math.round(e/yl),n.valida=vf(Bn(),{...i,x:n.cx,y:n.cy,rot:n.rot}),n.el.dataset.arrastre=n.valida?"valida":"invalida"}function uM(n){const t=n.target.closest(".pieza");if(!t||n.button!==0)return;const e=Number(t.dataset.uid),i=Rs(e);i&&(Fr=e,Ve={uid:e,el:t,x0:n.clientX,y0:n.clientY,rot:i.rot,cx:i.x,cy:i.y,valida:!0},t.dataset.arrastre="valida",Je.setPointerCapture(n.pointerId))}function hM(n){if(!Ve)return;const t=n.clientX-Ve.x0,e=n.clientY-Ve.y0;Ve.el.style.transform=`translate(${t}px, ${e-4}px)`,Pd(Ve,t,e)}function Ku(n){if(!Ve)return;const t=Ve;Ve=null,Je.hasPointerCapture(n.pointerId)&&Je.releasePointerCapture(n.pointerId),t.valida&&zl(Bn(),t.uid,t.cx,t.cy,t.rot)?se("clic"):(se("error"),ua()),Je.querySelector(`.pieza[data-uid="${t.uid}"]`)?.focus()}function dM(){const n=Bn();if(Ve){const t=Ve,e=Rs(t.uid);t.rot=(t.rot+1)%4;const i=wd(e,t.rot);i.style.transform=t.el.style.transform,t.el.replaceWith(i),t.el=i,Pd(t,0,0);return}Fr<0||(xf(n,Fr)?se("clic"):se("error"))}function fM(){const n=Ve?Ve.uid:Fr;n<0||(Ve=null,Mf(Bn(),n)&&(_n(en.tiraste),Fr=-1),ua())}function Ld(){const n=Bn();n.mochila.piezas.length!==0&&(Sf(n)?se("compra"):_n(en.sinAcomodo))}function pM(n){if(Bn().pantalla!=="mochila")return;if(n.code==="KeyR"){dM();return}if(n.code==="Delete"||n.code==="Backspace"){n.preventDefault(),fM();return}const t=document.activeElement;if(!t?.classList.contains("pieza"))return;const e=Rs(Number(t.dataset.uid));if(!e)return;const r={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[n.code];r&&(n.preventDefault(),zl(Bn(),e.uid,e.x+r[0],e.y+r[1],e.rot)?se("clic"):se("error"))}function mM(n){Bn=n,Je=document.getElementById("rejilla-mochila"),Cd=document.getElementById("mochila-resumen"),Rd=document.getElementById("mochila-vacia");for(let r=0;r<Un.COLUMNAS*Un.FILAS;r++){const a=document.createElement("div");a.className="celda",Je.appendChild(a)}const t=getComputedStyle(document.documentElement),e=parseFloat(t.getPropertyValue("--celda")),i=parseFloat(t.getPropertyValue("--sp-1"));!Number.isNaN(e)&&!Number.isNaN(i)&&(yl=e+i),Je.addEventListener("pointerdown",uM),Je.addEventListener("pointermove",hM),Je.addEventListener("pointerup",Ku),Je.addEventListener("pointercancel",Ku),Je.addEventListener("focusin",r=>{const a=r.target.dataset.uid;a&&(Fr=Number(a))}),window.addEventListener("keydown",pM),document.getElementById("btn-acomodar").addEventListener("click",Ld),Ct("mochila:cambio",ua),Ct("pantalla:cambio",r=>{r.a==="mochila"&&(Ve=null,ua())}),ua()}const wt=n=>document.getElementById(n),_M={titulo:"pantalla-titulo",pausa:"pantalla-pausa",mochila:"pantalla-mochila",tienda:"pantalla-tienda",colapso:"pantalla-colapso",desmayo:"pantalla-desmayo"},gM={titulo:"btn-empezar",pausa:"btn-continuar-pausa",mochila:"btn-acomodar",tienda:"btn-vender",desmayo:""};function Dd(n){const t=wt("titulo-mensaje");t.textContent=n,t.hidden=n===""}function Id(n){wt("btn-continuar").hidden=!n,wt("btn-nueva").hidden=!n,wt("btn-empezar").hidden=n,wt("confirmar-nueva").hidden=!0,wt(n?"btn-continuar":"btn-empezar").dataset.principal=""}function vM(n){const t=wt("pausa-records");t.replaceChildren();const e=(r,a)=>{const s=document.createElement("dt");s.textContent=r;const o=document.createElement("dd");o.textContent=a,t.append(s,o)},i=n.records;e("Profundidad de esta partida",`${i.profundidadPartida} m`),e("Profundidad máxima",`${i.profundidadMax} m`),e("Bloques de esta partida",String(i.bloquesPartida)),e("Bloques en total",String(i.bloquesTotal)),e("Mejor partida",`${i.mejorPartida} bloques`),e("Colapsos",String(n.colapsos))}function xM(n){const t=wt("ajuste-sensibilidad"),e=wt("ajuste-invertir"),i=wt("ajuste-fov"),r=wt("ajuste-volumen"),a=()=>{const s=n.juego().ajustes;t.value=String(s.sensibilidad),wt("salida-sensibilidad").textContent=`x${s.sensibilidad.toFixed(2)}`,e.checked=s.invertirY,i.min=String(Dt.FOV_MIN),i.max=String(Dt.FOV_MAX),i.value=String(s.fov),wt("salida-fov").textContent=`${s.fov}°`,r.value=String(s.volumen),wt("salida-volumen").textContent=`${Math.round(s.volumen*100)} %`,document.querySelectorAll('input[name="calidad"]').forEach(o=>{o.checked=o.value===s.calidad})};t.addEventListener("input",()=>{n.juego().ajustes.sensibilidad=Number(t.value),a()}),e.addEventListener("change",()=>{n.juego().ajustes.invertirY=e.checked}),i.addEventListener("input",()=>{n.juego().ajustes.fov=Number(i.value),a()}),r.addEventListener("input",()=>{n.juego().ajustes.volumen=Number(r.value),n.ponerVolumen(Number(r.value)),a()}),document.querySelectorAll('input[name="calidad"]').forEach(s=>s.addEventListener("change",()=>{s.checked&&(n.juego().ajustes.calidad=s.value,n.aplicarCalidad(s.value))})),Ct("pantalla:cambio",s=>{s.a==="pausa"&&a()}),a()}function MM(n){const t=wt("app");xM(n),Ct("pantalla:cambio",e=>{t.dataset.pantalla=e.a;for(const[r,a]of Object.entries(_M))wt(a).dataset.state=r===e.a?"abierta":"cerrada";e.a==="jugando"&&document.activeElement instanceof HTMLElement&&document.activeElement.blur(),e.a==="pausa"&&(vM(n.juego()),wt("confirmar-borrar").hidden=!0),e.a==="titulo"&&Id(n.hayGuardado()),e.a==="colapso"&&(wt("pantalla-colapso").dataset.fase="temblor",wt("colapso-etiqueta").textContent="",wt("colapso-mult").textContent=""),e.a==="desmayo"&&(wt("desmayo-texto").textContent=`${en.desmayo} ${en.despertas}`);const i=gM[e.a];i&&setTimeout(()=>document.getElementById(i)?.focus(),30)}),wt("btn-empezar").addEventListener("click",()=>n.empezar(!1)),wt("btn-continuar").addEventListener("click",()=>n.empezar(!1)),wt("btn-nueva").addEventListener("click",()=>{wt("confirmar-nueva").hidden=!1,wt("btn-nueva-no").focus()}),wt("btn-nueva-no").addEventListener("click",()=>{wt("confirmar-nueva").hidden=!0,wt("btn-continuar").focus()}),wt("btn-nueva-si").addEventListener("click",()=>n.empezar(!0)),wt("btn-continuar-pausa").addEventListener("click",()=>n.reanudar()),wt("btn-salir").addEventListener("click",()=>n.salirAlTitulo()),wt("btn-borrar").addEventListener("click",()=>{wt("confirmar-borrar").hidden=!1,wt("btn-borrar-no").focus()}),wt("btn-borrar-no").addEventListener("click",()=>{wt("confirmar-borrar").hidden=!0,wt("btn-borrar").focus()}),wt("btn-borrar-si").addEventListener("click",()=>n.borrarPartida()),Ct("estrato:entrada",e=>{const i=n.juego().estratos.find(r=>r.id===e.estratoId);i&&_n(Qf(i),"alerta",5e3)}),Ct("colapso:inicio",e=>{wt("colapso-etiqueta").dataset.texto=tp(e.estrato)}),Ct("colapso:fin",()=>Td("Mina nueva",`Multiplicador x${yi(n.juego()).toLocaleString("es-SV")}. Buscá tus fósiles en los estratos.`,3200))}function SM(n){if(n.pantalla!=="colapso")return;const t=wt("pantalla-colapso"),e=n.colapso.reloj,i=e<Cn.FASE_FUNDIDO?"temblor":e<Cn.FASE_TARJETA?"fundido":"tarjeta";t.dataset.fase!==i&&(t.dataset.fase=i),i==="tarjeta"&&wt("colapso-etiqueta").textContent===""&&(wt("colapso-etiqueta").textContent=wt("colapso-etiqueta").dataset.texto??"",wt("colapso-mult").textContent=`Multiplicador nuevo: x${(yi(n)+Cn.MULT_POR_COLAPSO).toLocaleString("es-SV")}`)}let ha,vo=0,xo=0,Ud=!1;function EM(){ha=document.getElementById("pico"),Ud=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,Ju(),window.addEventListener("resize",Ju)}function Ju(){const n=Math.max(1,Math.round(window.innerHeight*.5/96));ha.style.setProperty("--pico-escala",String(n))}let Qu=-1;function yM(n,t,e,i,r){const a=n.picado.fase;if(a!==Qu&&(Qu=a,ha.dataset.cuadro=String(a)),Ud){ha.style.transform="";return}const s=n.jugador,o=Math.hypot(s.vel.x,s.vel.z),l=s.enSuelo?Math.min(1,o/4.3):0,c=Math.sin(t*ve.BALANCEO_PICO_FREC*.5)*ve.BALANCEO_PICO_PX*l,u=Math.abs(Math.sin(t*ve.BALANCEO_PICO_FREC*.5))*ve.BALANCEO_PICO_PX*l;vo+=(-e*1.2-vo)*Math.min(1,r/Math.max(.001,ve.RETRASO_PICO)),xo+=(-i*1.2-xo)*Math.min(1,r/Math.max(.001,ve.RETRASO_PICO));const h=ve.RETRASO_PICO_MAX_PX,f=Math.max(-h,Math.min(h,vo)),p=Math.max(-h,Math.min(h,xo)),_=a===3?ve.GOLPE_PICO_RETROCESO_PX:0;ha.style.transform=`translate(${(c+f).toFixed(1)}px, ${(u+p*.5+_).toFixed(1)}px)`}function AM(n){return n.mascota.comprada||n.colones<We.costo?!1:(n.colones-=We.costo,n.mascota.comprada=!0,Wt("mascota:comprada",{}),!0)}const ue=n=>document.getElementById(n);let jn;const us={};function Qe(n,t="",e=""){const i=document.createElement(n);return t&&(i.className=t),e&&(i.textContent=e),i}function _r(n,t,e,i,r,a,s){const o=Qe("span","nombre",t);e&&o.appendChild(Qe("small","",e));const l=Qe("span","costo",r);a&&(l.appendChild(document.createElement("br")),l.appendChild(Qe("small","",a)));const c=Qe("span","efecto");c.append(...i),n.replaceChildren(o,l,c),n.dataset.estado=s,n.setAttribute("aria-disabled",String(s!=="disponible"))}function Mo(n,t,e){const i=t===0?"Sin efecto todavía":Tc(n,t);if(e)return[document.createTextNode(`Ahora: ${i}. Es el máximo.`)];const r=Qe("b","",Tc(n,t+1));return[document.createTextNode(`${Zf(n)} Ahora: ${i}. Siguiente: `),r]}function bM(n){const t=n.tiendaActual,e=Ch(n,t),i=ue("lista-venta");i.replaceChildren();for(const s of Er){const o=n.mochila.piezas.filter(f=>f.mineral===s);if(o.length===0)continue;const l=n.saturacion[t][s],c=o.reduce((f,p)=>f+p.valor*(1-l),0)*e.tiendaMult,u=Qe("li");u.dataset.mineral=s;const h=Qe("span","",`${Hl(s)} x${o.length}`);h.appendChild(Qe("small","",l>0?`Precio bajo por saturación: -${Math.round(l*100)} %`:"Precio completo")),u.append(h,Qe("b","",Ee(c))),i.appendChild(u)}ue("venta-vacia").hidden=e.piezas>0,ue("btn-vender").disabled=e.piezas===0;const r=ue("venta-desglose");r.replaceChildren();const a=(s,o,l,c="")=>{const u=Qe("dt",c,s),h=Qe("dd",c,o);l&&(u.dataset.activo="",h.dataset.activo=""),r.append(u,h)};r.hidden=e.piezas===0,a("Minerales",Ee(e.base),!1),e.perdidaSaturacion>0&&a("Saturación",`-${Ee(e.perdidaSaturacion)}`,!1),e.tiendaMult!==1&&a("Precio de la tienda",`x${e.tiendaMult}`,!0),a("Mochila sin huecos",e.bonusLlena?"+50 %":"no aplica",e.bonusLlena),n.mascota.comprada&&a(We.nombre,`+${Math.round(We.BONUS_VENTA*100)} %`,!0),e.multiplicador>1&&a("Multiplicador de colapso",`x${e.multiplicador.toLocaleString("es-SV")}`,!0),a("Te pago",Ee(e.total),!1,"total")}function TM(n){for(const i of wl){const r=Vn[i],a=n.mejoras[i],s=Ms(n,i),o=`nivel ${a} de ${r.max}`;Fl(n,i)?_r(us[i],r.nombre,o,Mo(i,a,!0),"Al máximo","","maximo"):Mh(n,i)?_r(us[i],r.nombre,o,Mo(i,a,!1),Ee(s),"","disponible"):_r(us[i],r.nombre,o,Mo(i,a,!1),Ee(s),`faltan ${Ee(s-n.colones)}`,"caro")}const t=ue("btn-mascota"),e=[document.createTextNode(np())];n.mascota.comprada?_r(t,We.nombre,"",e,"Ya te acompaña","","maximo"):n.colones>=We.costo?_r(t,We.nombre,"",e,Ee(We.costo),"","disponible"):_r(t,We.nombre,"",e,Ee(We.costo),`faltan ${Ee(We.costo-n.colones)}`,"caro")}function CM(n){const t=Bl(n);ue("btn-colapsar").disabled=!t;const e=(yi(n)+Cn.MULT_POR_COLAPSO).toLocaleString("es-SV");ue("colapso-texto").textContent=t?`Derrumbás todo y volvés con multiplicador x${e}. Tu mina de hoy queda enterrada como estrato.`:`Llegá a ${wh(n)} m para colapsar. Tu marca en esta partida: ${n.records.profundidadPartida} m.`}function gr(){const n=jn(),t=n.tiendaActual==="abajo";ue("pantalla-tienda").dataset.tienda=n.tiendaActual,ue("tienda-titulo").textContent=t?`${nn.NOMBRE_ABAJO}, comprador de la mina`:`Tienda de la ${nn.NOMBRE_TERE}`;const e=ue("tienda-frase");e.hidden=!t,t&&(e.textContent=ep()),ue("tienda-colones").textContent=Ee(n.colones),bM(n),t||(TM(n),CM(n))}function th(n){delete n.dataset.comprada,n.offsetWidth,n.dataset.comprada=""}function RM(){const n=jn();if(!Bl(n))return;const t=ue("col-conserva"),e=ue("col-pierde");t.replaceChildren(),e.replaceChildren();const i=r=>Qe("li","",r);t.append(i(n.mascota.comprada?"El Torogoz":"Tu mascota, si la comprás"),i("Tus récords"),i("Tu multiplicador"),i(`Tus estratos (${n.estratos.length} en la mina)`)),e.append(i(`Tus ${Ee(n.colones)}`),i("Las mejoras del pico"),i("La mochila y lo que lleva"),i(`Los fósiles activos (${n.fosilesActivos.length})`)),ue("col-nuevo").textContent=`x${(yi(n)+Cn.MULT_POR_COLAPSO).toLocaleString("es-SV")}`,ue("col-estrato").textContent=`Esta partida queda como estrato: ${n.records.profundidadPartida} m, ${n.records.bloquesPartida} bloques.`,ue("confirmar-colapso").hidden=!1,ue("btn-colapso-no").focus()}function Nd(){const n=ue("confirmar-colapso");return n.hidden?!1:(n.hidden=!0,ue("btn-colapsar").focus(),!0)}function wM(n){jn=n;const t=ue("lista-mejoras");wl.forEach(e=>{const i=Qe("button","mejora");i.type="button",i.addEventListener("click",()=>{const r=jn();Sh(r,e)?(gr(),th(i)):(se("error"),Fl(r,e)||_n(`Te faltan ${Ee(Ms(r,e)-r.colones)} para ${Vn[e].nombre}.`,"malo"))}),us[e]=i,t.appendChild(i)}),ue("btn-vender").addEventListener("click",()=>{const e=jn();Rh(e,e.tiendaActual)>0&&gr()}),ue("btn-mascota").addEventListener("click",()=>{const e=jn();e.mascota.comprada||(AM(e)?(gr(),th(ue("btn-mascota"))):(se("error"),_n(`Te faltan ${Ee(We.costo-e.colones)} para el ${We.nombre}.`,"malo")))}),ue("btn-colapsar").addEventListener("click",RM),ue("btn-colapso-no").addEventListener("click",()=>{Nd()}),ue("btn-colapso-si").addEventListener("click",()=>{ue("confirmar-colapso").hidden=!0,Ph(jn())}),Ct("pantalla:cambio",e=>{e.a==="tienda"&&(ue("confirmar-colapso").hidden=!0,gr())}),Ct("mochila:cambio",()=>{jn().pantalla==="tienda"&&gr()}),Ct("chepe:venta",()=>{jn().pantalla==="tienda"&&gr()})}const Od=new URLSearchParams(location.search),PM=Od.has("debug"),hc=Od.has("sinbloqueo"),Fd=document.getElementById("app"),ws=document.getElementById("lienzo");let kr=!1,Ma=!1;function $i(){if(Ma)try{localStorage.setItem(xi.CLAVE,JSON.stringify(Wf(J))),kr=!0}catch{}}function LM(){let n=null;try{n=localStorage.getItem(xi.CLAVE)}catch{}if(!n)return{juego:fa(),danado:!1};try{const t=$f(JSON.parse(n));if(t)return kr=!0,Ma=!0,{juego:t,danado:!1}}catch{}try{localStorage.removeItem(xi.CLAVE)}catch{}return{juego:fa(),danado:!0}}const zd=LM();let J=zd.juego;J.pantalla="titulo";Fd.dataset.calidad=J.ajustes.calidad;const Hi=new rp(ws,hc);let Ie=null;const Ge=new ip({elemento:ws,sinBloqueo:hc,alGanar:()=>{eh=!1},alPerder:()=>{J.pantalla==="jugando"&&Bd()},alRechazar:()=>{eh=!0}});let eh=!1;Hi.jugando=()=>J.pantalla==="jugando";Hi.mouseActivo=()=>J.pantalla==="jugando"&&(hc||Ge.bloqueado);Hi.tabEsMochila=()=>J.pantalla==="jugando"||J.pantalla==="mochila";function Bd(){J.pantalla==="jugando"&&(qe(J,"pausa"),Ge.soltar(),$i())}function Vd(){qe(J,"jugando"),Ge.pedir()}function nh(){J.pantalla==="tienda"&&Nd()||(J.pantalla==="tienda"||J.pantalla==="mochila")&&(qe(J,"jugando"),Ge.pedir())}Hi.globales={tab:()=>{J.pantalla==="jugando"?qe(J,"mochila"):J.pantalla==="mochila"&&nh()},escape:()=>{J.pantalla==="jugando"?Bd():J.pantalla==="pausa"?Vd():nh()},silenciar:()=>{J.ajustes.silencio=!J.ajustes.silencio,uh(J.ajustes.silencio),J.pantalla!=="titulo"&&_n(J.ajustes.silencio?"Sonido apagado":"Sonido encendido","info",1500)},diagnostico:()=>{const n=document.getElementById("diagnostico");n.hidden=!n.hidden},acomodar:()=>{J.pantalla==="mochila"&&Ld()}};document.addEventListener("visibilitychange",()=>{document.hidden&&Hi.soltarTodo()});ws.addEventListener("mousedown",()=>{J.pantalla==="jugando"&&Ge.activo&&!Ge.bloqueado&&Ge.pedir()});document.getElementById("clic-seguir").addEventListener("click",()=>{Ge.pedir()});Ct("pantalla:cambio",n=>{(n.a==="mochila"||n.a==="tienda")&&Ge.soltar(),n.a==="titulo"&&Ge.soltar(),n.a==="jugando"&&(n.de==="mochila"||n.de==="tienda")&&Ge.pedir()});function DM(n){if(jd(),n){try{localStorage.removeItem(xi.CLAVE)}catch{}kr=!1,Oh(J)}Ma=!0,Dd(""),qe(J,"jugando"),Ge.pedir()}function IM(){try{localStorage.removeItem(xi.CLAVE)}catch{}kr=!1,Ma=!1,Oh(J),qe(J,"titulo")}function UM(){$i(),qe(J,"titulo")}const NM={juego:()=>J,hayGuardado:()=>kr,empezar:DM,reanudar:Vd,salirAlTitulo:UM,borrarPartida:IM,aplicarCalidad:n=>{Fd.dataset.calidad=n,Ie?.aplicarCalidad(n)},ponerVolumen:ch,guardar:$i};MM(NM);lM();mM(()=>J);wM(()=>J);EM();Jd(()=>J);uh(J.ajustes.silencio);ch(J.ajustes.volumen);Id(kr);zd.danado&&Dd(en.guardadoDanado);Ct("fosil:hallado",n=>{const t=Do[n.id];Td(t.nombre,t.detalle,5500)});for(const n of["venta:hecha","mejora:comprada","mascota:comprada","colapso:fin"])Ct(n,()=>$i());window.addEventListener("beforeunload",$i);let vr=0,hs=performance.now(),Al=0,Gd=0,So=0,Eo=0,yo=0,Ao=performance.now(),bl=0,Tl=0,ra=0,bo=0,To=0;const OM=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function FM(){const n=J.pantalla;return!(n==="titulo"||n==="pausa"||n==="jugando"&&Ge.activo&&!Ge.bloqueado)}function Hd(n){requestAnimationFrame(Hd);const t=Math.min(.1,(n-hs)/1e3);Tl=n-hs,hs=n,So+=t,yo++,n-Ao>=500&&(bl=Math.round(yo*1e3/(n-Ao)),yo=0,Ao=n);const e=FM(),i=document.getElementById("clic-seguir");if(i.hidden=!(J.pantalla==="jugando"&&Ge.activo&&!Ge.bloqueado),ra=0,bo=To=0,e&&n>=Al){const r=n<Gd?ve.CAMARA_LENTA_ESCALA:1;for(vr+=t*r;vr>=Dn.PASO&&ra<Dn.MAX_PASOS;){Ie?.asignarPrevio();const a=Hi.leer();bo+=a.mirarDX,To+=a.mirarDY,Lo(J,a,Dn.PASO),vr-=Dn.PASO,ra++}ra===Dn.MAX_PASOS&&(vr=0),J.pantalla!=="titulo"&&(Eo+=t,Eo>=Dn.GUARDAR_CADA_SEG&&(Eo=0,$i()))}else Hi.leer(),e||(vr=0);if(Ie){Ie.dibujar(Math.min(1,vr/Dn.PASO),t,So),Kd(J),cM(J),yM(J,So,bo,To,t),SM(J);const r=document.getElementById("diagnostico");r.hidden||(r.textContent=`fps ${bl}
ms ${Tl.toFixed(1)}
llamadas ${Ie.stats.llamadas}
triangulos ${Ie.stats.triangulos}
chunks ${Ie.stats.chunks}
pasos ${ra}`)}}async function zM(){const n=await sM();Ie=new eM(ws,J,n),Ie.alImpacto=t=>{if(OM)return;const e=performance.now();t==="fosil"?(Gd=e+ve.CAMARA_LENTA_FOSIL_SEG*1e3,Al=e+ve.PAUSA_IMPACTO_FOSIL_MS):Al=e+ve.PAUSA_IMPACTO_MINERAL_MS},Ie.aplicarCalidad(J.ajustes.calidad),window.addEventListener("resize",()=>Ie?.redimensionar(window.innerWidth,window.innerHeight)),window.__listo=!0,requestAnimationFrame(t=>{hs=t,Hd(t)})}if(PM){const t={get juego(){return J},get render(){return Ie},estado:()=>({pantalla:J.pantalla,pos:{x:+J.jugador.pos.x.toFixed(2),y:+J.jugador.pos.y.toFixed(2),z:+J.jugador.pos.z.toFixed(2)},guinada:+J.jugador.guinada.toFixed(3),cabeceo:+J.jugador.cabeceo.toFixed(3),profundidad:+(zt.SUELO_Y-J.jugador.pos.y).toFixed(2),calor:Math.round(J.jugador.calor),colones:J.colones,mochila:J.mochila.piezas.length,sueltos:J.sueltos.length,momias:J.momias.length,mejoras:{...J.mejoras},mascota:J.mascota.comprada,fosilesActivos:[...J.fosilesActivos],fosilesEnMapa:J.fosilesMapa.length,colapsos:J.colapsos,estratos:J.estratos.length,semilla:J.semilla,records:{...J.records},paradas:[...J.paradas],cambios:J.mundo.cambios.size,profundidadMina:J.mundo.profundidadMina,tiendaActual:J.tiendaActual}),stats:()=>({fps:bl,ms:+Tl.toFixed(1),...Ie?{llamadas:Ie.stats.llamadas,triangulos:Ie.stats.triangulos,chunks:Ie.stats.chunks,escena:Ie.medirEscena()}:{}}),teletransportar:(e,i,r)=>ds(J,e,i,r),mirar:(e,i)=>{J.jugador.guinada=e,J.jugador.cabeceo=i},darColones:e=>{J.colones+=e,Wt("mochila:cambio",{})},darMineral:(e,i)=>{for(let r=0;r<i;r++)yh(J,e,Vl(e,Math.max(0,zt.SUELO_Y-J.jugador.pos.y)))},ponerCalor:e=>{J.jugador.calor=e},picarSeg:e=>{const i=Dh();i.picar=!0;for(let r=0;r<Math.round(e*60);r++)Lo(J,i,Dn.PASO);i.picar=!1,Lo(J,i,Dn.PASO)},abrir:(e,i)=>{i&&(J.tiendaActual=i),qe(J,e)},cerrar:()=>qe(J,"jugando"),vender:(e="tere")=>Rh(J,e),comprar:e=>Sh(J,e),colapsar:()=>Ph(J),saltarCinematica:()=>{J.colapso.reloj=99},aparecerMomia:()=>{const e=Cr(J.jugador),i=J.jugador.pos;let r=i.x+e.x*4,a=i.z+e.z*4;return J.mundo.esSolido(Math.floor(r),Math.floor(i.y+.5),Math.floor(a))&&(r=i.x-e.x*2,a=i.z-e.z*2),Nh(J,r,i.y,a).uid},buscarFosil:()=>{let e=null,i=1/0;for(const r of J.fosilesMapa){const a=Math.hypot(r.x-J.jugador.pos.x,r.y-J.jugador.pos.y,r.z-J.jugador.pos.z);a<i&&(i=a,e=r)}return e},viajar:e=>vh(J,e),guardar:()=>{Ma=!0,$i()}};window.__estratos=t}zM();
