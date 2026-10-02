/* SeedWave «Мой Гид» — ДВИЖОК (слой 1). Один на все гиды.
   Подключается оболочкой: корень g.seedwave.pt/ (Мадейра, ?guide=…) или папка гида /{slug}/.
   Оболочка папки задаёт ДО подключения: window.GUIDE_ID='…'; window.GUIDE_BASE='../'; window.GUIDE_STATIC=true;
   (свой статичный манифест, иконки и OG — в оболочке; так iOS/Android сохраняют гид отдельным приложением). */
document.body.insertAdjacentHTML('afterbegin',`<div class="top"><div class="top-in">
  <span class="mark" id="mark" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M72 36 A26 26 0 1 0 72 64 L72 50 L54 50"/><path d="M20 84 Q30 78 40 84 Q50 90 60 84 Q70 78 80 84"/></svg></span>
  <span class="brandtext">Мой Гид<span id="brandcity"></span><small>SeedWave</small></span>
  <span class="top-sp"></span>
  <div class="topctrl">
    <div class="langwrap">
      <button class="ctrl" id="langBtn" aria-haspopup="true" aria-expanded="false" aria-label="Язык / Language">RU</button>
      <div class="langmenu" id="langMenu" role="menu" hidden></div>
    </div>
    <button class="ctrl" id="theme" aria-label="Тема / Theme">☾</button>
  </div>
</div></div>

<div class="wrap">
  <header class="hero">
    <p class="eyebrow" data-i="eyebrow"></p>
    <h1 class="h1" data-i="title"></h1>
    <p class="sub" data-i="sub"></p>
    <p class="by" id="by"></p>
    <p class="install" id="installHint" hidden></p>
  </header>

  <div id="map"></div>

  <!-- УРОВЕНЬ 2: план на день -->
  <section id="plan">
  <h2 class="st"><span data-p="title"></span><small data-p="sub"></small></h2>
  <div class="picker plan-f">
    <div class="pgrp"><span class="plab" data-p="day"></span><div class="popts" id="planDays"></div></div>
    <div class="pgrp"><span class="plab" data-p="from"></span><input type="time" id="planFrom" class="ptime" step="900"></div>
    <div class="pgrp"><span class="plab" data-p="to"></span><input type="time" id="planTo" class="ptime" step="900"></div>
    <div class="pgrp"><span class="plab" data-p="want"></span><div class="popts" id="planWant"></div></div>
    <div class="pgrp" style="justify-content:flex-end"><button class="btn" id="planGo" data-p="go"></button></div>
  </div>
  <div id="planOut"></div>
  </section>

  <!-- HERO: scenarios -->
  <h2 class="st"><span data-i="sc_title"></span><small data-i="sc_sub"></small></h2>
  <div class="picker" id="picker"></div>
  <div id="scns"></div>

  <!-- base: all places -->
  <h2 class="st"><span data-i="places_title"></span><small data-i="places_sub"></small></h2>
  <div class="tags" id="tags"></div>
  <div class="grid" id="grid"></div>

  <footer class="foot">
    <div class="cta"><div class="cta-t"><span data-i="foot_t"></span><small data-i="foot_s"></small></div>
      <a class="btn" id="hublink" data-i="foot_btn" href="#"></a></div>
    <div class="sig"><span>© <a href="#" id="lk">Igor Kartuzov</a> · <a href="#" id="hub2">SeedWave</a></span>
      <span data-i="data_note"></span></div>
  </footer>
</div>`);
const LANGS=["ru","en","pt","es","de"];
/* ===== СЛОЙ 2 — ЛОКАЛИ (в проде ui.{lang}.json). Интерфейс на 5 языках. ===== */
const UI={
 ru:{eyebrow:"Гид · мои секретные точки",title:"Моя Неизведанная Мадейра",sub:"Места без толп — закаты, деревни, секреты острова от того, кто здесь живёт.",by:"Собрал {a} · {n} мест · {s} секретных",
   sc_title:"Сценарии из моих точек",sc_sub:"Скажи, что у тебя есть — соберу вечер или маршрут",
   time:"Время",half:"Полдня",day:"День",multi:"2–3 дня",car:"Машина",cy:"Есть",cn:"Нет",light:"Свет",sunset:"Закат",sunrise:"Восход",dayl:"Днём",act:"Хочу",walk:"Прогулка",hike:"Хайк",swim:"Купаться",food:"Гастро",any:"Любое",
   secrets:"Секретные места рядом",park:"Парковка",wear:"Что надеть",why:"Почему ехать",sunset_t:"Закат сегодня",sunrise_t:"Восход сегодня",noscn:"Под этот набор сценария нет — поменяй фильтры.",
   places_title:"Все мои места",places_sub:"База: к секретным точкам — по пути",all:"Все",secret:"секрет",reviews:"отзывов",dir:"Проложить маршрут",gmaps:"Маршрут в Google Maps",onmap:"Показать на карте",share:"Поделиться маршрутом",copied:"Ссылка скопирована ✓",
   foot_t:"Понравился гид?",foot_s:"Сделай свой — из своих точек на карте.",foot_btn:"Сделать свой гид →",data_note:"Данные мест · Google · снимок"},
 en:{eyebrow:"Guide · my secret spots",title:"My Undiscovered Madeira",sub:"Places without crowds — sunsets, villages, island secrets from someone who lives here.",by:"By {a} · {n} places · {s} secret",
   sc_title:"Scenarios from my spots",sc_sub:"Tell me what you've got — I'll build your evening or route",
   time:"Time",half:"Half-day",day:"Day",multi:"2–3 days",car:"Car",cy:"Yes",cn:"No",light:"Light",sunset:"Sunset",sunrise:"Sunrise",dayl:"Daytime",act:"I want",walk:"Stroll",hike:"Hike",swim:"Swim",food:"Food & drink",any:"Any",
   secrets:"Secret spots nearby",park:"Parking",wear:"What to wear",why:"Why go",sunset_t:"Sunset today",sunrise_t:"Sunrise today",noscn:"No scenario for this set — change the filters.",
   places_title:"All my places",places_sub:"The base — on the way to the secret spots",all:"All",secret:"secret",reviews:"reviews",dir:"Get directions",gmaps:"Route in Google Maps",onmap:"Show on map",share:"Share this route",copied:"Link copied ✓",
   foot_t:"Liked this guide?",foot_s:"Make your own — from your pins on the map.",foot_btn:"Make your guide →",data_note:"Place data · Google · snapshot"},
 pt:{eyebrow:"Guia · os meus lugares secretos",title:"A Minha Madeira Secreta",sub:"Lugares sem multidões — pores do sol, aldeias e segredos da ilha de quem cá vive.",by:"Por {a} · {n} lugares · {s} secretos",
   sc_title:"Cenários dos meus lugares",sc_sub:"Diz-me o que tens — monto a tua tarde ou rota",
   time:"Tempo",half:"Meio-dia",day:"Um dia",multi:"2–3 dias",car:"Carro",cy:"Sim",cn:"Não",light:"Luz",sunset:"Pôr do sol",sunrise:"Nascer do sol",dayl:"De dia",act:"Quero",walk:"Passeio",hike:"Caminhada",swim:"Nadar",food:"Gastronomia",any:"Qualquer",
   secrets:"Lugares secretos perto",park:"Estacionamento",wear:"O que vestir",why:"Porquê ir",sunset_t:"Pôr do sol hoje",sunrise_t:"Nascer do sol hoje",noscn:"Sem cenário para esta seleção — muda os filtros.",
   places_title:"Todos os meus lugares",places_sub:"A base — a caminho dos lugares secretos",all:"Todos",secret:"secreto",reviews:"avaliações",dir:"Como chegar",gmaps:"Rota no Google Maps",onmap:"Mostrar no mapa",share:"Partilhar a rota",copied:"Link copiado ✓",
   foot_t:"Gostaste do guia?",foot_s:"Cria o teu — a partir dos teus pontos no mapa.",foot_btn:"Criar o meu guia →",data_note:"Dados dos locais · Google · captura"},
 es:{eyebrow:"Guía · mis lugares secretos",title:"Mi Madeira Inexplorada",sub:"Lugares sin multitudes — atardeceres, pueblos y secretos de la isla de quien vive aquí.",by:"Por {a} · {n} lugares · {s} secretos",
   sc_title:"Escenarios de mis lugares",sc_sub:"Dime qué tienes — te armo la tarde o la ruta",
   time:"Tiempo",half:"Medio día",day:"Un día",multi:"2–3 días",car:"Coche",cy:"Sí",cn:"No",light:"Luz",sunset:"Atardecer",sunrise:"Amanecer",dayl:"De día",act:"Quiero",walk:"Paseo",hike:"Senderismo",swim:"Nadar",food:"Gastronomía",any:"Cualquiera",
   secrets:"Lugares secretos cerca",park:"Aparcamiento",wear:"Qué llevar",why:"Por qué ir",sunset_t:"Atardecer hoy",sunrise_t:"Amanecer hoy",noscn:"Sin escenario para esta selección — cambia los filtros.",
   places_title:"Todos mis lugares",places_sub:"La base — de camino a los secretos",all:"Todos",secret:"secreto",reviews:"reseñas",dir:"Cómo llegar",gmaps:"Ruta en Google Maps",onmap:"Ver en el mapa",share:"Compartir la ruta",copied:"Enlace copiado ✓",
   foot_t:"¿Te gustó la guía?",foot_s:"Crea la tuya — desde tus puntos en el mapa.",foot_btn:"Crear mi guía →",data_note:"Datos de lugares · Google · captura"},
 de:{eyebrow:"Guide · meine geheimen Orte",title:"Mein Unentdecktes Madeira",sub:"Orte ohne Menschenmassen — Sonnenuntergänge, Dörfer und Inselgeheimnisse von einem, der hier lebt.",by:"Von {a} · {n} Orte · {s} geheim",
   sc_title:"Szenarien aus meinen Orten",sc_sub:"Sag, was du hast — ich baue deinen Abend oder die Route",
   time:"Zeit",half:"Halber Tag",day:"Ein Tag",multi:"2–3 Tage",car:"Auto",cy:"Ja",cn:"Nein",light:"Licht",sunset:"Sonnenuntergang",sunrise:"Sonnenaufgang",dayl:"Tagsüber",act:"Ich will",walk:"Spaziergang",hike:"Wandern",swim:"Baden",food:"Essen & Trinken",any:"Egal",
   secrets:"Geheime Orte in der Nähe",park:"Parken",wear:"Was anziehen",why:"Warum hin",sunset_t:"Sonnenuntergang heute",sunrise_t:"Sonnenaufgang heute",noscn:"Kein Szenario für diese Auswahl — ändere die Filter.",
   places_title:"Alle meine Orte",places_sub:"Die Basis — auf dem Weg zu den geheimen Orten",all:"Alle",secret:"geheim",reviews:"Bewertungen",dir:"Route",gmaps:"Route in Google Maps",onmap:"Auf der Karte zeigen",share:"Route teilen",copied:"Link kopiert ✓",
   foot_t:"Guide gefallen?",foot_s:"Mach deinen eigenen — aus deinen Punkten auf der Karte.",foot_btn:"Meinen Guide erstellen →",data_note:"Ortsdaten · Google · Snapshot"}
};

/* ===== СЛОЙ 3 — КОНТЕНТ (в проде data.madeira-igor.json). Голос автора — в note (RU). ===== */
let GUIDE=null;

/* ===== ДВИЖОК (Слой 1) ===== */
const TAGS={wine:{l:"wine",e:"🍷",c:"#B5476B"},food:{l:"food",e:"🍽",c:"#C25A3C"},coffee:{l:"coffee",e:"☕",c:"#9C6B3F"},bar:{l:"bar",e:"🍹",c:"#2E8B6B"},bakery:{l:"bakery",e:"🥐",c:"#C99A3B"},fine:{l:"fine",e:"✦",c:"#8E3B6E"},view:{l:"view",e:"🌅",c:"#E2772E"},hike:{l:"hike",e:"🥾",c:"#2E7D32"},shop:{l:"shop",e:"🛍",c:"#5B6ABF"},sight:{l:"sight",e:"🏛",c:"#7A6A8C"}};
const TAGLABEL={ru:{wine:"Вино",food:"Еда",coffee:"Кофе",bar:"Бары",bakery:"Пекарни",fine:"Fine dining",view:"Виды",hike:"Маршруты",shop:"Шопинг",sight:"Классика"},en:{wine:"Wine",food:"Food",coffee:"Coffee",bar:"Bars",bakery:"Bakeries",fine:"Fine dining",view:"Views",hike:"Hikes",shop:"Shopping",sight:"Sights"},pt:{wine:"Vinho",food:"Comida",coffee:"Café",bar:"Bares",bakery:"Padarias",fine:"Fine dining",view:"Vistas",hike:"Trilhos",shop:"Compras",sight:"Monumentos"},es:{wine:"Vino",food:"Comida",coffee:"Café",bar:"Bares",bakery:"Panaderías",fine:"Fine dining",view:"Vistas",hike:"Rutas",shop:"Compras",sight:"Monumentos"},de:{wine:"Wein",food:"Essen",coffee:"Kaffee",bar:"Bars",bakery:"Bäckereien",fine:"Fine dining",view:"Aussicht",hike:"Wandern",shop:"Shopping",sight:"Sehenswertes"}};
/* deriveTags/isSecret вынесены в data (поля tags/secret) */
function regionOf(p){const{lat,lon}=p;if(lon<-17.18)return"west";if(lat>32.80)return"northwest";if(lat>32.78)return"north";if(lon>-16.88)return"east";if(lat<32.70&&lon>-16.97)return"funchal";return"centre";}
/* post-process перенесён в bootGuide() */

/* auto half-day scenarios from geo clusters (secret-led) */
const REGT={west:{ru:"Запад",en:"West",pt:"Oeste",es:"Oeste",de:"Westen"},northwest:{ru:"Северо-запад",en:"Northwest",pt:"Noroeste",es:"Noroeste",de:"Nordwesten"},north:{ru:"Север",en:"North",pt:"Norte",es:"Norte",de:"Norden"},east:{ru:"Восток",en:"East",pt:"Este",es:"Este",de:"Osten"},funchal:{ru:"Фуншал",en:"Funchal",pt:"Funchal",es:"Funchal",de:"Funchal"},centre:{ru:"Центр · горы",en:"Centre · mountains",pt:"Centro · montanhas",es:"Centro · montañas",de:"Mitte · Berge"}};
function autoScenarios(){
 const RT=Object.assign({},REGT,GUIDE.regions||{});
 const SKIP=GUIDE.autoSkip||["west","centre","north","northwest"];
 const g={};GUIDE.points.forEach(p=>{(g[p.reg]=g[p.reg]||[]).push(p)});
 const out=[];
 Object.entries(g).forEach(([k,pts])=>{
  if(SKIP.includes(k))return; // покрыто ручными героями
  if(pts.length<2)return;
  pts.sort((a,b)=>(b.secret-a.secret)||((b.rating||0)-(a.rating||0)));
  const light=GUIDE.regions?"day":(k==="east"?"sunrise":(k==="funchal"?"day":"sunset"));
  const car=GUIDE.regions?false:(k!=="funchal");
  out.push({id:"auto-"+k,title:{ru:"Полдня · "+RT[k].ru,en:"Half-day · "+RT[k].en,pt:"Meio-dia · "+RT[k].pt,es:"Medio día · "+RT[k].es,de:"Halber Tag · "+RT[k].de},
   duration:"half",car,light,act:[...new Set(pts.flatMap(p=>p.tags.map(t=>t==="view"?"walk":(t==="hike"?"hike":(t==="bar"||t==="wine"||t==="coffee"||t==="bakery"?"walk":"food")))))],
   why:"",auto:true,stops:pts.slice(0,4).map(p=>({n:p.name,m:Object.fromEntries(LANGS.map(l=>[l,(p.rating!=null?"★"+p.rating+" · ":"")+pick(p.hours,l)])),note:Object.fromEntries(LANGS.map(l=>[l,pick(p.note,l).replace(/^[^:]+:\s*/,'')]))})),sunLat:pts[0].lat,sunLon:pts[0].lon});
 });
 // multiday route (2–3 дня) by regions
 const order=(GUIDE.regionOrder||["funchal","east","north","northwest","west","centre"]).filter(k=>g[k]);
 out.push({id:"multi",title:{ru:"Маршрут на 2–3 дня",en:"2–3 day route",pt:"Rota de 2–3 dias",es:"Ruta de 2–3 días",de:"2–3-Tage-Route"},
  duration:"multi",car:!GUIDE.regions,light:"any",act:["walk","food","hike"],why:"",auto:true,multiday:order.map((k,i)=>({day:i+1,t:RT[k],pts:g[k]})),sunLat:32.75,sunLon:-17.0});
 return out;
}
let ALLSCN=[];

/* state */
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function detectLang(){
  const u=new URLSearchParams(location.search).get("lang");
  const s=lsGet("guide_lang");
  const n=(navigator.language||"ru").slice(0,2).toLowerCase();
  return [u,s,n,"ru"].find(x=>LANGS.includes(x))||"ru";
}
let L=detectLang(),active=null,filt={duration:null,car:null,light:null,act:null};

function t(k){return UI[L][k]}
function pick(v,l){return (v&&typeof v==='object')?(v[l]||v.ru||Object.values(v)[0]||''):(v||'')}
function raw(v){return pick(v,'ru')}
function tx(v){return pick(v,L)}
function fmtTime(d){return d.getHours().toString().padStart(2,'0')+":"+d.getMinutes().toString().padStart(2,'0')}

/* i18n apply */
function applyI18n(){
 document.documentElement.lang=L;
 renderLangMenu();
 setBridges();
 document.querySelectorAll('[data-i]').forEach(el=>{const k=el.dataset.i;if(UI[L][k]!==undefined)el.textContent=UI[L][k];});
 if(GUIDE.intro){['eyebrow','title','sub'].forEach(k=>{const el=document.querySelector('[data-i=\"'+k+'\"]');if(el&&GUIDE.intro[k])el.textContent=pick(GUIDE.intro[k],L);});}
 {const bc=document.getElementById('brandcity');if(bc)bc.textContent=GUIDE.meta.city?' · '+pick(GUIDE.meta.city,L):'';}
 document.title=(GUIDE.intro&&GUIDE.intro.title)?pick(GUIDE.intro.title,L):t('title');
 const sec=GUIDE.points.filter(p=>p.secret).length;
 document.getElementById('by').innerHTML=t('by').replace('{a}','<b>'+GUIDE.meta.author+'</b>').replace('{n}',GUIDE.points.length).replace('{s}',sec);
 renderPicker();renderScenarios();renderTags();renderCards();
 if(typeof renderPlan==='function'){renderPlan();renderInstall();}
}

/* picker */
const DIMS=[
 {k:"duration",lab:"time",opts:[["half","half"],["day","day"],["multi","multi"]]},
 {k:"car",lab:"car",opts:[["true","cy"],["false","cn"]]},
 {k:"light",lab:"light",opts:[["sunset","sunset"],["sunrise","sunrise"],["day","dayl"]]},
 {k:"act",lab:"act",opts:[["walk","walk"],["hike","hike"],["food","food"]]}
];
function renderPicker(){
 document.getElementById('picker').innerHTML=DIMS.map(d=>`<div class="pgrp"><span class="plab">${t(d.lab)}</span>
  <div class="popts" data-k="${d.k}"><button class="popt ${filt[d.k]===null?'on':''}" data-v="">${t('any')}</button>
  ${d.opts.map(([v,lk])=>`<button class="popt ${String(filt[d.k])===v?'on':''}" data-v="${v}">${t(lk)}</button>`).join('')}</div></div>`).join('');
}
document.getElementById('picker').addEventListener('click',e=>{const b=e.target.closest('.popt');if(!b)return;
 const k=b.parentElement.dataset.k,v=b.dataset.v;
 filt[k]=v===""?null:(k==="car"?(v==="true"):v);
 renderPicker();renderScenarios();});

function scnMatch(s){
 if(filt.duration&&(({half:1,day:2,multi:3})[s.duration]||9)>({half:1,day:2,multi:3})[filt.duration])return false;
 if(filt.car!==null&&s.car!==filt.car)return false;
 if(filt.light&&s.light!=="any"&&s.light!==filt.light)return false;
 if(filt.act&&!(s.act||[]).includes(filt.act))return false;
 return true;
}
function sunLine(s){
 if(!s.sunLat)return"";
 const times=SunCalc.getTimes(new Date(),s.sunLat,s.sunLon);
 if(s.light==="sunset")return `<span class="mtag sun">🌅 ${t('sunset_t')} ${fmtTime(times.sunset)}</span>`;
 if(s.light==="sunrise")return `<span class="mtag sun">🌄 ${t('sunrise_t')} ${fmtTime(times.sunrise)}</span>`;
 return"";
}
function metaTags(s){
 const m=[];m.push(`<span class="mtag">⏱ ${t(s.duration)}</span>`);
 m.push(`<span class="mtag">🚗 ${s.car?t('cy'):t('cn')}</span>`);
 if(s.light&&s.light!=="any")m.push(`<span class="mtag">${s.light==="sunset"?"🌅":s.light==="sunrise"?"🌄":"☀️"} ${t(s.light==="day"?"dayl":s.light)}</span>`);
 (s.act||[]).forEach(a=>m.push(`<span class="mtag">${t(a)}</span>`));
 const sl=sunLine(s);if(sl)m.push(sl);
 return m.join('');
}
function renderScenarios(){
 const DR={half:1,day:2,multi:3};
 const list=ALLSCN.filter(scnMatch).sort((a,b)=>((b.feat?1:0)-(a.feat?1:0))||((DR[a.duration]||9)-(DR[b.duration]||9)));
 const box=document.getElementById('scns');
 if(!list.length){box.innerHTML=`<p style="color:var(--muted)">${t('noscn')}</p>`;return;}
 box.innerHTML=list.map(s=>{
  const title=s.title[L]||s.title.ru;
  let body;
  if(s.multiday){
   body=s.multiday.map(d=>`<div class="stop"><span class="stop-i">${d.day}</span><div>
     <div class="stop-n">${t('day')} ${d.day} · ${tx(d.t)}</div>
     <div class="stop-note">${d.pts.map(p=>p.name).join(' · ')}</div></div></div>`).join('');
  }else{
   body=s.stops.map((st,i)=>`<div class="stop"><span class="stop-i">${i+1}</span><div>
     <div class="stop-n">${tx(st.n)} ${st.m?`<span class="stop-m">· ${tx(st.m)}</span>`:''}</div>
     ${st.note?`<div class="stop-note">${tx(st.note)}</div>`:''}</div></div>`).join('');
  }
  let extra="";
  if(s.secrets||s.park||s.wear){
   extra=`<div class="scn-x">
    ${s.secrets?`<div class="xblock"><h4>🤫 ${t('secrets')}</h4><ul>${s.secrets.map(x=>`<li>${tx(x)}</li>`).join('')}</ul></div>`:''}
    <div class="xblock">
      ${s.park?`<h4>🅿 ${t('park')}</h4><p>${tx(s.park)}</p>`:''}
      ${s.wear?`<h4 style="margin-top:10px">👕 ${t('wear')}</h4><p>${tx(s.wear)}</p>`:''}
    </div></div>`;
  }
  return `<article class="scn ${s.feat?'feat':''}">
    <div class="scn-h"><div class="scn-meta">${metaTags(s)}</div>
      <h3 class="scn-t">${title}</h3>
      ${s.why?`<p class="scn-why">${tx(s.why)}</p>`:''}</div>
    <div class="scn-b">${body}</div>${extra}
    <div class="scn-act">${s.route?`<a class="dir" href="${gmapsUrl(s)}" target="_blank" rel="noopener">🗺 ${t('gmaps')}</a><button class="dir btnlike" data-onmap="${s.id}">📍 ${t('onmap')}</button>`:''}${s.multiday?'':`<button class="dir btnlike" data-share="${s.id}">🔗 ${t('share')}</button>`}</div></article>`;
 }).join('');
}

/* tags + cards */
function renderTags(){
 const used=[...new Set(GUIDE.points.flatMap(p=>p.tags))];
 const box=document.getElementById('tags');
 box.innerHTML=`<button class="chip ${active===null?'on':''}" data-t="">${t('all')} <span class="ct">${GUIDE.points.length}</span></button>`+
  used.map(tg=>{const n=GUIDE.points.filter(p=>p.tags.includes(tg)).length;
   return `<button class="chip ${active===tg?'on':''}" data-t="${tg}">${TAGS[tg].e} ${TAGLABEL[L][tg]} <span class="ct">${n}</span></button>`}).join('');
}
document.getElementById('tags').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;active=b.dataset.t||null;renderTags();renderCards();drawMarkers();});
function visible(){return active?GUIDE.points.filter(p=>p.tags.includes(active)):GUIDE.points;}
function card(p){const tg=TAGS[p.tags[0]];
 const ph=p.photo?`style="background-image:url('${asset(p.photo)}')"`:"";
 const vid=p.video?`<video src="${asset(p.video)}" ${p.photo?`poster="${asset(p.photo)}"`:''} autoplay muted loop playsinline preload="metadata" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>`:'';
 return `<article class="card"><div class="ph" ${ph}>${vid}${p.photo||p.video?'':`<span class="ph-e">${tg.e}</span>`}
   <span class="tag-dot">${tg.e} ${TAGLABEL[L][p.tags[0]]}</span>
   ${p.secret?`<span class="secret">🤫 ${t('secret')}</span>`:''}</div>
  <div class="cbody"><h3 class="cname">${p.name}</h3>
   <div class="rate">${p.rating!=null?`<span class="star">★ ${p.rating.toFixed(1)}</span>`:''}${p.count!=null?`<span>${p.count.toLocaleString(L)} ${t('reviews')}</span>`:''}<span>${p.rating!=null||p.count!=null?'· ':''}${p.addr}</span></div>
   <div class="hours">🕑 ${tx(p.hours)}</div>
   <p class="note">${tx(p.note).replace(/^[^:]+:\s*/,'')}</p>
   <div class="cfoot"><a class="dir" href="${p.dir}" target="_blank" rel="noopener">↗ ${t('dir')}</a></div>
  </div></article>`;}
function renderCards(){document.getElementById('grid').innerHTML=visible().map(card).join('');}

/* map */
let map,markers=[];
function initMap(){map=L_.map('map',{scrollWheelZoom:false}).setView([32.75,-17.05],10);
 L_.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap',maxZoom:18}).addTo(map);drawMarkers();}
function drawMarkers(){markers.forEach(m=>map.removeLayer(m));markers=[];const grp=[];
 visible().forEach(p=>{const tg=TAGS[p.tags[0]];
  const ic=L_.divIcon({className:'',html:`<div style="background:${tg.c};width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4);display:grid;place-items:center"><span style="transform:rotate(45deg);font-size:12px">${p.secret?'🤫':tg.e}</span></div>`,iconSize:[26,26],iconAnchor:[13,26]});
  const m=L_.marker([p.lat,p.lon],{icon:ic}).addTo(map).bindPopup(`<div class="pop-n">${p.name}</div>${p.rating!=null?`<div class="pop-r">★ ${p.rating}${p.count!=null?' · '+p.count.toLocaleString(L):''}</div>`:''}<div class="pop-note">${tx(p.note).replace(/^[^:]+:\s*/,'')}</div>`);
  markers.push(m);grp.push([p.lat,p.lon]);});
 if(grp.length)map.fitBounds(grp,{padding:[40,40],maxZoom:11});}
const L_=window.L; // Leaflet (переменная L занята языком интерфейса)
/* маршрут сценария: Google Maps + полилиния на карте + шер */
let routeLayer=[];
function scnPts(s){return (s.route||[]).map(id=>GUIDE.points.find(p=>p.id===id)).filter(Boolean);}
function gmapsUrl(s){const pts=scnPts(s);if(pts.length<2)return'#';
 const c=p=>p.lat+','+p.lon;
 const wp=pts.slice(1,-1).map(c).join('|');
 return'https://www.google.com/maps/dir/?api=1&origin='+c(pts[0])+'&destination='+c(pts[pts.length-1])+(wp?'&waypoints='+encodeURIComponent(wp):'')+'&travelmode=walking';}
function showRoute(s){const pts=scnPts(s);if(pts.length<2)return;
 routeLayer.forEach(x=>map.removeLayer(x));routeLayer=[];
 const acc=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#C13A57';
 const line=L_.polyline(pts.map(p=>[p.lat,p.lon]),{color:acc,weight:4,opacity:.85,dashArray:'1 8',lineCap:'round'}).addTo(map);
 routeLayer.push(line);
 pts.forEach((p,i)=>{const ic=L_.divIcon({className:'',html:`<div style="background:${acc};color:#fff;width:24px;height:24px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4);display:grid;place-items:center;font:700 12px 'Mulish'">${i+1}</div>`,iconSize:[24,24],iconAnchor:[12,12]});
  routeLayer.push(L_.marker([p.lat,p.lon],{icon:ic,zIndexOffset:1000}).addTo(map).bindPopup(`<div class="pop-n">${i+1}. ${p.name}</div>`));});
 map.fitBounds(pts.map(p=>[p.lat,p.lon]),{padding:[46,46]});
 document.getElementById('map').scrollIntoView({behavior:'smooth',block:'center'});}
function shareUrl(s){const u=new URL(location.href.split('?')[0].split('#')[0]);
 const qs=new URLSearchParams();const gid=new URLSearchParams(location.search).get('guide');
 if(GUIDE.meta.shareBase){const su=new URL(BASE+GUIDE.meta.shareBase+s.id+'.html',u);su.searchParams.set('lang',L);return su.toString();}
 if(gid)qs.set('guide',gid);qs.set('s',s.id);qs.set('lang',L);return u.toString()+'?'+qs.toString();}
async function doShare(s,btn){const url=shareUrl(s);const title=(s.title[L]||s.title.ru);
 const text=s.why?(typeof s.why==='string'?s.why:(s.why[L]||s.why.ru)):'';
 if(navigator.share){try{await navigator.share({title,text,url});return;}catch(e){}}
 try{await navigator.clipboard.writeText(url);const old=btn.innerHTML;btn.innerHTML='✓ '+t('copied');setTimeout(()=>btn.innerHTML=old,1800);}catch(e){prompt('URL:',url);}}
document.getElementById('scns').addEventListener('click',e=>{
 const om=e.target.closest('[data-onmap]');if(om){const s=ALLSCN.find(x=>x.id===om.dataset.onmap);if(s)showRoute(s);return;}
 const sh=e.target.closest('[data-share]');if(sh){const s=ALLSCN.find(x=>x.id===sh.dataset.share);if(s)doShare(s,sh);}});


/* footer links + controls */
function bridge(base){const p=new URLSearchParams();p.set('lang',L);const th=document.documentElement.dataset.theme;if(th)p.set('theme',th);return base+(base.includes('?')?'&':'?')+p.toString();}
function setBridges(){
  const hu=GUIDE.meta.hubUrl;
  const set=(id,u)=>{const el=document.getElementById(id);if(el)el.href=u;};
  set('hublink',bridge(hu));set('hub2',bridge(hu));set('lk',GUIDE.meta.linkedin);
}
/* язык — кнопка-кружок с кодом + выпадающее меню (§7.8) */
const LANGNAMES={ru:"Русский",en:"English",pt:"Português",es:"Español",de:"Deutsch"};
const langBtn=document.getElementById('langBtn'),langMenu=document.getElementById('langMenu');
function renderLangMenu(){
  langBtn.textContent=L.toUpperCase();
  langMenu.innerHTML=LANGS.map(c=>`<button class="langopt ${c===L?'on':''}" role="menuitem" data-l="${c}"><span class="lc">${c.toUpperCase()}</span>${LANGNAMES[c]}</button>`).join('');
}
function closeLangMenu(){langMenu.hidden=true;langBtn.setAttribute('aria-expanded','false');}
langBtn.addEventListener('click',e=>{e.stopPropagation();const willOpen=langMenu.hidden;langMenu.hidden=!willOpen;langBtn.setAttribute('aria-expanded',String(willOpen));});
langMenu.addEventListener('click',e=>{const b=e.target.closest('.langopt');if(!b)return;L=b.dataset.l;lsSet('guide_lang',L);applyI18n();closeLangMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('.langwrap'))closeLangMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLangMenu();});
const themeBtn=document.getElementById('theme');
(function initTheme(){
  const u=new URLSearchParams(location.search).get('theme');
  const s=lsGet('guide_theme');
  const th=(u==='light'||u==='')?u:(s!==null?s:'');
  if(th==='light')document.documentElement.dataset.theme='light';
  themeBtn.textContent=document.documentElement.dataset.theme==='light'?'☀':'☾';
})();
themeBtn.addEventListener('click',()=>{
  const cur=document.documentElement.dataset.theme==='light'?'':'light';
  if(cur)document.documentElement.dataset.theme=cur;else delete document.documentElement.dataset.theme;
  lsSet('guide_theme',cur);
  themeBtn.textContent=cur==='light'?'☀':'☾';
  setBridges();
  setTimeout(()=>{map&&map.invalidateSize()},60);
});


/* ===== УРОВЕНЬ 2 — «ПЛАН НА ДЕНЬ»: окно времени + часы работы + погода (Open-Meteo, без ключей) =====
   Данные (необязательные поля точки): open {"0".."6"|"*": [["HH:MM","HH:MM"],…]} (0 = вс), indoor true|false, dwell минуты.
   meta.planStart — id точки старта (по умолчанию первая точка маршрута первого героя). */
const PL={
 ru:{title:"План на день",sub:"Скажи, когда ты здесь — соберу маршрут по часам работы и погоде",day:"День",from:"С",to:"До",want:"Хочется",go:"Собрать план",today:"Сегодня",tomorrow:"Завтра",walkmin:"{n} мин пешком",drivemin:"{n} мин на машине",back:"Обратно к старту · {s}",rain:"дождь {p}%",rainy:"Похоже на дождь — в плане больше мест под крышей",nowx:"Прогноз недоступен — план без учёта погоды",start:"Старт · {s}",empty:"В это окно ничего не открыто — сдвинь время",plan_for:"План · {d}, {a}–{b}",install_ios:"📲 Сохрани гид на телефон: «Поделиться» → «На экран Домой»",install_and:"📲 Сохрани гид на телефон: ⋮ → «Добавить на главный экран»",install_btn:"Установить"},
 en:{title:"Plan my day",sub:"Tell me when you're here — I'll build a route around opening hours and the weather",day:"Day",from:"From",to:"To",want:"I'd like",go:"Build my plan",today:"Today",tomorrow:"Tomorrow",walkmin:"{n} min walk",drivemin:"{n} min drive",back:"Back to the start · {s}",rain:"rain {p}%",rainy:"Rain likely — the plan leans on indoor places",nowx:"Forecast unavailable — the plan ignores the weather",start:"Start · {s}",empty:"Nothing is open in this window — shift the time",plan_for:"Plan · {d}, {a}–{b}",install_ios:"📲 Save this guide to your phone: Share → Add to Home Screen",install_and:"📲 Save this guide to your phone: ⋮ → Add to Home screen",install_btn:"Install"},
 pt:{title:"Plano para o dia",sub:"Diz quando estás cá — monto a rota pelo horário e pelo tempo",day:"Dia",from:"Das",to:"Até",want:"Apetece",go:"Montar o plano",today:"Hoje",tomorrow:"Amanhã",walkmin:"{n} min a pé",drivemin:"{n} min de carro",back:"Regresso ao início · {s}",rain:"chuva {p}%",rainy:"Parece que vai chover — o plano privilegia sítios cobertos",nowx:"Previsão indisponível — plano sem meteorologia",start:"Partida · {s}",empty:"Nada aberto neste intervalo — muda a hora",plan_for:"Plano · {d}, {a}–{b}",install_ios:"📲 Guarda o guia no telemóvel: Partilhar → Adicionar ao ecrã principal",install_and:"📲 Guarda o guia no telemóvel: ⋮ → Adicionar ao ecrã principal",install_btn:"Instalar"},
 es:{title:"Plan del día",sub:"Dime cuándo estás aquí — armo la ruta según horarios y el tiempo",day:"Día",from:"Desde",to:"Hasta",want:"Me apetece",go:"Armar el plan",today:"Hoy",tomorrow:"Mañana",walkmin:"{n} min a pie",drivemin:"{n} min en coche",back:"Vuelta al inicio · {s}",rain:"lluvia {p}%",rainy:"Parece que lloverá — el plan prioriza sitios a cubierto",nowx:"Previsión no disponible — plan sin tener en cuenta el tiempo",start:"Salida · {s}",empty:"Nada abierto en esta franja — cambia la hora",plan_for:"Plan · {d}, {a}–{b}",install_ios:"📲 Guarda la guía en el móvil: Compartir → Añadir a pantalla de inicio",install_and:"📲 Guarda la guía en el móvil: ⋮ → Añadir a pantalla de inicio",install_btn:"Instalar"},
 de:{title:"Tagesplan",sub:"Sag, wann du hier bist — ich plane nach Öffnungszeiten und Wetter",day:"Tag",from:"Von",to:"Bis",want:"Lust auf",go:"Plan erstellen",today:"Heute",tomorrow:"Morgen",walkmin:"{n} Min. zu Fuß",drivemin:"{n} Min. Fahrt",back:"Zurück zum Start · {s}",rain:"Regen {p}%",rainy:"Regen wahrscheinlich — der Plan setzt auf überdachte Orte",nowx:"Vorhersage nicht verfügbar — Plan ohne Wetter",start:"Start · {s}",empty:"In diesem Zeitfenster hat nichts offen — verschieb die Zeit",plan_for:"Plan · {d}, {a}–{b}",install_ios:"📲 Guide aufs Handy: Teilen → Zum Home-Bildschirm",install_and:"📲 Guide aufs Handy: ⋮ → Zum Startbildschirm hinzufügen",install_btn:"Installieren"}
};
function pl(k){return (PL[L]||PL.ru)[k]}
const PLAN={day:0,from:"10:00",to:"17:00",wants:new Set(),wx:null,wxKey:null,last:null};
const DWELL={coffee:30,bakery:20,sight:40,view:30,hike:150,food:75,fine:120,wine:45,bar:45,shop:30};
/* типовые часы по тегу — когда у точки нет поля open (честная прикидка, не факт) */
const DEFHRS={coffee:[["08:00","19:00"]],bakery:[["08:00","19:00"]],food:[["12:00","23:00"]],fine:[["12:30","15:00"],["19:00","23:00"]],wine:[["11:00","24:00"]],bar:[["12:00","02:00"]],shop:[["09:30","20:00"]]};
const INDOOR=["food","wine","bar","coffee","bakery","fine","shop"];
function toMin(s){const[h,m]=String(s).split(':').map(Number);return h*60+(m||0);}
function fmtMin(n){n=Math.round(n);const h=Math.floor(n/60)%24,m=n%60;return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');}
function hav(a,b){const R=6371,r=x=>x*Math.PI/180,dl=r(b.lat-a.lat),dn=r(b.lon-a.lon);
 const q=Math.sin(dl/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(q));}
function planDate(i){const d=new Date();d.setDate(d.getDate()+i);return d;}
function isoDate(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function dayLabel(i){if(i===0)return pl('today');if(i===1)return pl('tomorrow');
 try{return planDate(i).toLocaleDateString(L,{weekday:'short',day:'numeric'});}catch(e){return isoDate(planDate(i));}}
function openAt(p,dow,a,b){
 const rng=p.open?(p.open[String(dow)]||p.open['*']):DEFHRS[p.tags[0]];
 if(!rng)return true; // часы на этот день не заданы — не исключаем (пустой массив [] = выходной)
 return rng.some(([s,e])=>{let S=toMin(s),E=toMin(e);if(E<=S)E+=1440;return a>=S&&b<=E;});
}
function isIndoor(p){return p.indoor!=null?!!p.indoor:p.tags.some(t=>INDOOR.includes(t));}
function dwellOf(p){return p.dwell||DWELL[p.tags[0]]||40;}
function wxAt(min){const w=PLAN.wx;if(!w)return null;const h=Math.min(23,Math.floor(min/60));return w[h]||null;}
function planStart(){
 const id=(GUIDE.meta&&GUIDE.meta.planStart)||((GUIDE.scenarios.find(s=>s.feat&&s.route)||{}).route||[])[0];
 return GUIDE.points.find(p=>p.id===id)||null;
}
function buildPlan(){
 const date=planDate(PLAN.day),dow=date.getDay();
 const walk=!!GUIDE.regions,speed=walk?4.5:35,maxHop=walk?2.2:45;
 let from=toMin(PLAN.from),to=toMin(PLAN.to);if(to<=from)to+=1440;
 if(PLAN.day===0){const n=new Date(),nm=n.getHours()*60+n.getMinutes();if(nm>from&&nm<to)from=Math.ceil(nm/15)*15;}
 const start=planStart();let cur=start,t=from;const used=new Set(),out=[];
 const featIds=new Set(GUIDE.scenarios.filter(s=>s.feat).flatMap(s=>s.route||[]));
 if(start)used.add(start.id);
 const had={};
 while(t<to-20&&out.length<8){
  let best=null;
  for(const p of GUIDE.points){
   if(used.has(p.id))continue;
   const dist=cur?hav(cur,p):0;if(dist>maxHop)continue;
   const travel=Math.max(walk?3:8,Math.round(dist*(walk?1.25:1.4)/speed*60)+(walk?0:8));
   const arrive=t+(cur?travel:0),dw=dwellOf(p);
   if(arrive+Math.min(dw,30)>to)continue;
   if(!openAt(p,dow,arrive,arrive+Math.min(dw,30)))continue;
   const tg=p.tags[0],h=arrive/60,w=wxAt(arrive);
   let sc=((p.rating||4.3)-4)*2+(p.secret?0.6:0)+(featIds.has(p.id)?0.4:0);
   if(h<12){if(tg==='coffee'||tg==='bakery')sc+=2;if(['sight','view','hike'].includes(tg))sc+=1;if(['food','fine'].includes(tg))sc-=1;if(['wine','bar'].includes(tg))sc-=1.5;}
   else if(h<15.5){if(tg==='food')sc+=2.5;if(tg==='fine')sc+=2;if(tg==='wine')sc+=0.8;if(tg==='coffee')sc-=0.5;}
   else if(h<19){if(['wine','bar'].includes(tg))sc+=1.5;if(['sight','view'].includes(tg))sc+=1;if(tg==='coffee')sc+=0.5;if(had.food)sc-=(tg==='food'?1:0);}
   else{if(['food','fine'].includes(tg))sc+=2;if(['bar','wine'].includes(tg))sc+=1.5;}
   if(had[tg])sc-=had[tg]*(tg==='food'?1.2:1.6);
   if(out.length&&out[out.length-1].p.tags[0]===tg)sc-=1.5;
   if(PLAN.wants.size&&p.tags.some(x=>PLAN.wants.has(x)))sc+=2;
   if(w&&w.rain>=60&&!isIndoor(p))continue; // ливень — улица не в плане
   if(w&&w.rain>=40)sc+=isIndoor(p)?1.5:-3;
   sc-=dist*(walk?1.5:0.05);
   if(!best||sc>best.sc)best={p,sc,arrive,dw,travel:cur?travel:0,w};
  }
  if(!best){t+=15;continue;} // всё закрыто — ждём открытия
  const leave=Math.min(best.arrive+best.dw,to);
  out.push({p:best.p,arrive:best.arrive,leave,travel:best.travel,w:best.w});
  used.add(best.p.id);had[best.p.tags[0]]=(had[best.p.tags[0]]||0)+1;cur=best.p;t=leave;
 }
 let back=null;
 if(start&&out.length){const last=out[out.length-1].p,d=hav(last,start);back=Math.max(walk?3:8,Math.round(d*(walk?1.25:1.4)/speed*60)+(walk?0:8));}
 return {date,from,to,start,out,back,walk};
}
function wxSummary(){
 const w=PLAN.wx;if(!w)return '';
 const f=toMin(PLAN.from),e=toMin(PLAN.to)>f?toMin(PLAN.to):toMin(PLAN.to)+1440;
 const hrs=w.filter((x,i)=>i*60>=f-59&&i*60<=e);if(!hrs.length)return '';
 const tmin=Math.round(Math.min(...hrs.map(x=>x.t))),tmax=Math.round(Math.max(...hrs.map(x=>x.t))),rmax=Math.max(...hrs.map(x=>x.rain||0));
 return `<span class="mtag sun">${rmax>=50?'🌧':rmax>=25?'🌦':'☀️'} ${tmin===tmax?tmin:tmin+'–'+tmax}° · ${pl('rain').replace('{p}',rmax)}</span>`;
}
function renderPlanResult(){
 const box=document.getElementById('planOut');if(!box)return;
 const r=PLAN.last;if(!r){box.innerHTML='';return;}
 if(!r.out.length){box.innerHTML=`<p style="color:var(--muted)">${pl('empty')}</p>`;return;}
 const dl=r.date.toLocaleDateString(L,{weekday:'long',day:'numeric',month:'short'});
 const rainy=PLAN.wx&&r.out.some(x=>x.w&&x.w.rain>=50);
 const route=r.out.map(x=>x.p.id);if(r.start)route.unshift(r.start.id);
 const sc={id:'plan-day',route,title:{},stops:[]};
 PLAN.scn=sc;
 const meta=`<span class="mtag">⏱ ${fmtMin(r.from)}–${fmtMin(r.to)}</span>`+(PLAN.wx?wxSummary():`<span class="mtag">${pl('nowx')}</span>`);
 const stops=(r.start?`<div class="stop"><span class="stop-i">◎</span><div><div class="stop-n">${pl('start').replace('{s}',r.start.name)} <span class="stop-m">· ${fmtMin(r.from)}</span></div></div></div>`:'')+
  r.out.map((x,i)=>`<div class="stop"><span class="stop-i">${i+1}</span><div>
   <div class="stop-n">${x.p.name} <span class="stop-m">· ${fmtMin(x.arrive)}–${fmtMin(x.leave)}${x.travel?' · '+pl(r.walk?'walkmin':'drivemin').replace('{n}',x.travel):''}${x.w&&x.w.rain>=25?' · '+(x.w.rain>=50?'🌧 ':'🌦 ')+x.w.rain+'%':''}</span></div>
   <div class="stop-note">${TAGS[x.p.tags[0]].e} ${planNote(x.p)}</div></div></div>`).join('')+
  (r.back!=null?`<div class="stop"><span class="stop-i">↩</span><div><div class="stop-n">${pl('back').replace('{s}',r.start.name)} <span class="stop-m">· ${pl(r.walk?'walkmin':'drivemin').replace('{n}',r.back)}</span></div></div></div>`:'');
 box.innerHTML=`<article class="scn feat hl"><div class="scn-h"><div class="scn-meta">${meta}</div>
   <h3 class="scn-t">${pl('plan_for').replace('{d}',dl).replace('{a}',fmtMin(r.from)).replace('{b}',fmtMin(r.to))}</h3>
   ${rainy?`<p class="scn-why">${pl('rainy')}</p>`:''}</div>
  <div class="scn-b">${stops}</div>
  <div class="scn-act"><a class="dir" href="${gmapsUrl(sc)}" target="_blank" rel="noopener">🗺 ${t('gmaps')}</a><button class="dir btnlike" data-planmap="1">📍 ${t('onmap')}</button></div></article>`;
}
function planNote(p){let n=tx(p.note);const m=n.match(/^([^:]{1,30}):\s*/);if(m)n=n.slice(m[0].length);const c=n.search(/[.!?](\s|$)|\s—\s|:\s/);return c>20?n.slice(0,c):n;}
function guideCenter(){const ps=GUIDE.points;return{lat:ps.reduce((s,p)=>s+p.lat,0)/ps.length,lon:ps.reduce((s,p)=>s+p.lon,0)/ps.length};}
async function loadWx(){
 const d=isoDate(planDate(PLAN.day));if(PLAN.wxKey===d)return;
 PLAN.wxKey=d;PLAN.wx=null;
 try{const c=guideCenter();
  const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat.toFixed(3)}&longitude=${c.lon.toFixed(3)}&hourly=precipitation_probability,temperature_2m&timezone=auto&start_date=${d}&end_date=${d}`);
  if(!r.ok)throw new Error(r.status);const j=await r.json();
  PLAN.wx=j.hourly.time.map((x,i)=>({rain:j.hourly.precipitation_probability[i]||0,t:j.hourly.temperature_2m[i]}));
 }catch(e){PLAN.wx=null;console.warn('weather unavailable',e);}
}
function renderPlan(){
 const sec=document.getElementById('plan');if(!sec)return;
 sec.querySelectorAll('[data-p]').forEach(el=>{el.textContent=pl(el.dataset.p);});
 document.getElementById('planDays').innerHTML=[0,1,2,3,4,5,6].map(i=>`<button class="popt ${PLAN.day===i?'on':''}" data-d="${i}">${dayLabel(i)}</button>`).join('');
 const used=[...new Set(GUIDE.points.flatMap(p=>p.tags))];
 document.getElementById('planWant').innerHTML=used.map(tg=>`<button class="popt ${PLAN.wants.has(tg)?'on':''}" data-w="${tg}">${TAGS[tg].e} ${TAGLABEL[L][tg]}</button>`).join('');
 renderPlanResult();
}
async function runPlan(){
 const btn=document.getElementById('planGo');if(btn)btn.disabled=true;
 await loadWx();PLAN.last=buildPlan();renderPlanResult();if(btn)btn.disabled=false;
 const o=document.getElementById('planOut');if(o)o.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function initPlan(){
 const sec=document.getElementById('plan');if(!sec)return;
 const f=document.getElementById('planFrom'),e=document.getElementById('planTo');
 if(GUIDE.meta&&GUIDE.meta.planFrom){PLAN.from=GUIDE.meta.planFrom;}
 if(GUIDE.meta&&GUIDE.meta.planTo){PLAN.to=GUIDE.meta.planTo;}
 f.value=PLAN.from;e.value=PLAN.to;
 f.addEventListener('change',()=>{PLAN.from=f.value||PLAN.from;});
 e.addEventListener('change',()=>{PLAN.to=e.value||PLAN.to;});
 sec.addEventListener('click',ev=>{
  const d=ev.target.closest('[data-d]');if(d){PLAN.day=+d.dataset.d;renderPlan();return;}
  const w=ev.target.closest('[data-w]');if(w){const k=w.dataset.w;PLAN.wants.has(k)?PLAN.wants.delete(k):PLAN.wants.add(k);renderPlan();return;}
  if(ev.target.closest('#planGo')){runPlan();return;}
  if(ev.target.closest('[data-planmap]')&&PLAN.scn){showRoute(PLAN.scn);}
 });
 renderPlan();
}
/* подсказка «сохрани на экран» — только в папке гида (свой статичный манифест) */
let deferredInstall=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;renderInstall();});
function renderInstall(){
 const el=document.getElementById('installHint');if(!el)return;
 const standalone=window.navigator.standalone===true||matchMedia('(display-mode: standalone)').matches;
 if(!window.GUIDE_STATIC||standalone){el.hidden=true;return;}
 const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
 el.hidden=false;
 el.innerHTML=(ios?pl('install_ios'):pl('install_and'))+(deferredInstall?` <button class="popt on" id="installBtn">${pl('install_btn')}</button>`:'');
 const b=document.getElementById('installBtn');if(b)b.onclick=async()=>{deferredInstall.prompt();try{await deferredInstall.userChoice;}catch(e){}deferredInstall=null;renderInstall();};
}

/* ===== ЗАГРУЗЧИК ГИДА (?guide= или window.GUIDE_ID в папке гида) ===== */
const BASE=window.GUIDE_BASE||'';
function asset(u){return (!u||/^(https?:|data:|blob:|\/)/.test(u))?u:BASE+u;}
function guideId(){return (window.GUIDE_ID||new URLSearchParams(location.search).get('guide')||'madeira-igor').replace(/[^a-z0-9_-]/gi,'')||'madeira-igor';}
function applyGuideChrome(){
  const m=GUIDE.meta||{};
  const cssVars=o=>Object.entries(o).map(([k,v])=>'--'+k+':'+v).join(';');
  if(m.theme||m.themeLight){
    let css='';
    if(m.theme)css+=':root{'+cssVars(m.theme)+'}';
    if(m.themeLight)css+=':root[data-theme="light"]{'+cssVars(m.themeLight)+'}';
    let st=document.getElementById('guide-theme');
    if(!st){st=document.createElement('style');st.id='guide-theme';document.head.appendChild(st);}
    st.textContent=css;
  }
  if(window.GUIDE_STATIC)return; // папка гида: иконки и манифест статичные в оболочке
  if(m.icon){document.querySelectorAll('link[rel="icon"]').forEach(l=>l.href=m.icon+'?v=1');}
  // apple-touch (домашний экран iOS) требует PNG — SVG iOS игнорирует
  var appleIcon=m.appleIcon||m.icon;
  if(appleIcon){document.querySelectorAll('link[rel="apple-touch-icon"]').forEach(l=>l.href=appleIcon+'?v=3');}
  // динамический PWA-манифест под текущий гид (иначе iOS ставит дефолтную Мадейру)
  try{
    const gid=guideId();
    const nm=(GUIDE.intro&&GUIDE.intro.title)?pick(GUIDE.intro.title,L):(UI[L]&&UI[L].title)||'Мой Гид';
    const acc=(m.themeLight&&m.themeLight.accent)||'#C13A57';
    const bg=(m.theme&&m.theme.bg)||'#1a1014';
    const icon=m.appleIcon||m.icon||'icon.svg';
    const mf={name:nm,short_name:(m.city?pick(m.city,L):nm),start_url:'./?guide='+gid,scope:'.',display:'standalone',orientation:'portrait',background_color:bg,theme_color:acc,icons:[{src:icon,sizes:'any',type:icon.endsWith('.svg')?'image/svg+xml':'image/png',purpose:'any maskable'}]};
    const blob=new Blob([JSON.stringify(mf)],{type:'application/manifest+json'});
    const url=URL.createObjectURL(blob);
    let ln=document.querySelector('link[rel="manifest"]');
    if(!ln){ln=document.createElement('link');ln.rel='manifest';document.head.appendChild(ln);}
    ln.href=url;
    let tc=document.querySelector('meta[name="theme-color"]');
    if(!tc){tc=document.createElement('meta');tc.name='theme-color';document.head.appendChild(tc);}
    tc.content=acc;
    let at=document.querySelector('meta[name="apple-mobile-web-app-title"]');
    if(!at){at=document.createElement('meta');at.name='apple-mobile-web-app-title';document.head.appendChild(at);}
    at.content=(m.city?pick(m.city,L):nm);
  }catch(e){console.warn('manifest gen skipped',e);}
}
function bootGuide(data){
  GUIDE=data;
  applyGuideChrome();
  GUIDE.points.forEach(p=>{p.reg=p.reg||regionOf(p);
    p.dir=`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}&destination_place_id=${p.place_id}`;});
  ALLSCN=[...GUIDE.scenarios,...autoScenarios()];
  initPlan();applyI18n();initMap();
  const dl=new URLSearchParams(location.search).get('s');
  if(dl){const el=[...document.querySelectorAll('.scn')];const s=ALLSCN.filter(scnMatch).map(x=>x.id);const i=s.indexOf(dl);
   if(i>=0&&el[i]){el[i].classList.add('hl');setTimeout(()=>el[i].scrollIntoView({behavior:'smooth',block:'start'}),400);
    const sc=ALLSCN.find(x=>x.id===dl);if(sc&&sc.route)setTimeout(()=>showRoute(sc),900);}}
  const mk=document.getElementById('mark');
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){mk.classList.add('reveal');mk.addEventListener('animationend',()=>mk.classList.remove('reveal'),{once:true});}
}
fetch(BASE+'data/'+guideId()+'.json',{cache:'no-cache'})
  .then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
  .then(bootGuide)
  .catch(err=>{console.error('guide load failed:',err);
    var g=document.getElementById('grid'); if(g)g.innerHTML='<p style="padding:28px 18px;color:var(--muted)">Guide not found — check ?guide= and data/{id}.json.</p>';});
