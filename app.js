const typeLabels={reptile:'Reptile',amphibian:'Amphibien',invertebrate:'Invertébré',insect:'Insecte'};
const SPECIES_CATALOG=[{"name":"Cranidium gibbosum","type":"invertebrate"},{"name":"Brancsikia freyi","type":"invertebrate"},{"name":"Blaptica dubia","type":"invertebrate"},{"name":"Compsodes schwarzi","type":"invertebrate"},{"name":"Elliptorhina chopardi","type":"invertebrate"},{"name":"Elliptorhina javanica","type":"invertebrate"},{"name":"Eustegasta buprestoides","type":"invertebrate"},{"name":"Gyna caffrorum","type":"invertebrate"},{"name":"Gyna centurio","type":"invertebrate"},{"name":"Hemiblabera granulata","type":"invertebrate"},{"name":"Hormetica sp.","type":"invertebrate"},{"name":"Lucihormetica subcincta","type":"invertebrate"},{"name":"Lucihormetica verrucosa","type":"invertebrate"},{"name":"Macropanesthia rhinoceros","type":"invertebrate"},{"name":"Megaloblatta blaberoides","type":"invertebrate"},{"name":"Nauphoeta cinerea","type":"invertebrate"},{"name":"Nocticola vagus","type":"invertebrate"},{"name":"Oxyhaloa deusta","type":"invertebrate"},{"name":"Panchlora sp.","type":"invertebrate"},{"name":"Paraplecta minutissima","type":"invertebrate"},{"name":"Paratemnopteryx coloniana","type":"invertebrate"},{"name":"Periplaneta lateralis","type":"invertebrate"},{"name":"Phoetalia pallida","type":"invertebrate"},{"name":"Pseudoglomeris magnifica","type":"invertebrate"},{"name":"Pycnoscelus striatus","type":"invertebrate"},{"name":"Symploce pallens","type":"invertebrate"},{"name":"Therea bernhardti","type":"invertebrate"},{"name":"Therea olegrandjeani","type":"invertebrate"},{"name":"Therea regularis","type":"invertebrate"},{"name":"Therea sp.","type":"invertebrate"},{"name":"Ancylecha fenestrata","type":"invertebrate"},{"name":"Lirometopum coronatum","type":"invertebrate"},{"name":"Luzarida sp.","type":"invertebrate"},{"name":"Melanonotus powellorum","type":"invertebrate"},{"name":"Nesonotus reticulatus","type":"invertebrate"},{"name":"Orocharis sp.","type":"invertebrate"},{"name":"Phalangopsis cf. longipes","type":"invertebrate"},{"name":"Phymateus saxosus","type":"invertebrate"},{"name":"Teleutias aduncus","type":"invertebrate"},{"name":"Vestria sp.","type":"invertebrate"},{"name":"Xerophyllopteryx fumosa","type":"invertebrate"},{"name":"Anadenobolus leucostigma","type":"invertebrate"},{"name":"Aphistogoniulus hova","type":"invertebrate"},{"name":"Atopochetus caudulanus","type":"invertebrate"},{"name":"Centrobolus richardi","type":"invertebrate"},{"name":"Orthoporus lomontii","type":"invertebrate"},{"name":"Orthoporus sp.","type":"invertebrate"},{"name":"Sechelleptus sp.","type":"invertebrate"},{"name":"Zoosphaerium neptunus","type":"invertebrate"},{"name":"Charinus acosta","type":"invertebrate"},{"name":"Charinus sp.","type":"invertebrate"},{"name":"Heterophrynus alces","type":"invertebrate"},{"name":"Heterophrynus longicornis","type":"invertebrate"},{"name":"Paraphrynus laevifrons","type":"invertebrate"},{"name":"Phrynus goesii","type":"invertebrate"},{"name":"Armadillidae sp.","type":"invertebrate"},{"name":"Armadillidium gestroi","type":"invertebrate"},{"name":"Cubaris sp.","type":"invertebrate"},{"name":"Leptotrichus panzeri","type":"invertebrate"},{"name":"Porcellio dilatatus","type":"invertebrate"},{"name":"Porcellio hoffmannseggii","type":"invertebrate"},{"name":"Porcellio sp.","type":"invertebrate"},{"name":"Trichorrhina tomentosa","type":"invertebrate"},{"name":"Trichorrhina sp.","type":"invertebrate"},{"name":"Venezillo sp.","type":"invertebrate"},{"name":"Platymeris biguttatus","type":"invertebrate"},{"name":"Psytalla horrida","type":"invertebrate"},{"name":"Lophosaurus boydii","type":"reptile"},{"name":"Ouroborus cataphractus","type":"reptile"},{"name":"Saurodactylus brosseti","type":"reptile"},{"name":"Saurodactylus harrisii","type":"reptile"},{"name":"Sphaerodactylus elegans","type":"reptile"},{"name":"Sphaerodactylus torrei","type":"reptile"},{"name":"Ceratophrys cranwelli","type":"amphibian"},{"name":"Pyxicephalus adspersus","type":"amphibian"}];
const KEY="terranote_v1";
let db=JSON.parse(localStorage.getItem(KEY)||'{"animals":[],"events":[],"speciesRoutines":[],"reminders":[]}');
const icons={reptile:"🦎",amphibian:"🐸",insect:"🪲"};
const labels={feeding:"Nourrissage",watering:"Arrosage / brumisation",weight:"Pesée",waterChange:"Changement de l’eau",note:"Note",cleaning:"Nettoyage",treatment:"Traitement",molt:"Mue"};
db.speciesRoutines ||= []; db.reminders ||= [];
const save=()=>{localStorage.setItem(KEY,JSON.stringify(db));render()};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const animal=id=>db.animals.find(a=>a.id===id);

function routineText(r){
 return r.frequency==="daily"?`Tous les jours à ${r.time}`:
 r.frequency==="weekly"?`Chaque semaine (${r.days||"à définir"}) à ${r.time}`:
 `Tous les ${r.interval||1} jours à ${r.time}`;
}
function renderRoutines(){
 const el=document.getElementById("routineList"); if(!el)return;
 el.innerHTML=db.speciesRoutines.length
 ?db.speciesRoutines.map(r=>`<div class="event"><div><b>${esc(labels[r.kind]||r.kind)} · ${esc(r.species)}</b><span class="muted">${routineText(r)}</span></div><button class="ghost deleteRoutine" data-id="${r.id}">Supprimer</button></div>`).join("")
 :empty("Aucune routine","Crée une routine pour programmer automatiquement tes rappels.");
}
function dueForRoutine(r,a){
 const now=new Date(), key=`${a.id}_${r.id}`;
 let existing=db.reminders.find(x=>x.key===key&&!x.done);
 if(existing)return existing;
 let due=new Date(now); const [h,m]=(r.time||"18:00").split(":").map(Number);
 due.setHours(h,m,0,0);
 if(r.frequency==="interval") due.setDate(due.getDate()+(r.interval||1)-1);
 if(due>now) due.setDate(due.getDate()-1);
 if(r.frequency==="weekly" && r.days){
   // The routine becomes due once per week; "days" is displayed as the user's schedule.
   due.setDate(due.getDate()-((due.getDay()+6)%7));
 }
 return {id:crypto.randomUUID(),key,animalId:a.id,routineId:r.id,due:due.toISOString(),done:false};
}
function renderToday(){
 const el=document.getElementById("todayReminders"); if(!el)return;
 db.animals.forEach(a=>db.speciesRoutines.filter(r=>r.species.toLowerCase()===a.species.toLowerCase()).forEach(r=>{
   const x=dueForRoutine(r,a);
   if(!db.reminders.some(z=>z.key===x.key&&!z.done))db.reminders.push(x);
 }));
 const now=Date.now();
 const active=db.reminders.filter(x=>!x.done&&new Date(x.due).getTime()<=now);
 el.innerHTML=active.length?active.map(x=>{
   const a=animal(x.animalId),r=db.speciesRoutines.find(z=>z.id===x.routineId);
   return `<div class="event"><div><b>⏰ ${esc(labels[r?.kind]||r?.kind)} · ${esc(a?.name||"")}</b><span class="muted">${esc(r?.species||"")} · ${new Date(x.due).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</span></div><button class="primary doneReminder" data-id="${x.id}">✓ Fait</button></div>`;
 }).join(""):empty("Rien à faire","Tous les rappels sont à jour.");
}
function render(){
 document.getElementById("todayTitle").textContent=new Intl.DateTimeFormat("fr-FR",{weekday:"long",day:"numeric",month:"long"}).format(new Date());
 const today=new Date().toDateString(), due=db.animals.length;
 document.getElementById("summary").textContent=`${db.animals.length} animal${db.animals.length>1?"aux":""} suivi${db.animals.length>1?"s":""} · ${db.events.filter(e=>new Date(e.date).toDateString()===today).length} activité(s) aujourd’hui`;
 const cards=db.animals.map(a=>card(a)).join("")||empty("Aucun animal","Ajoute ton premier animal pour commencer.");
 document.getElementById("animalGrid").innerHTML=cards;
 document.getElementById("allAnimals").innerHTML=cards;
 document.getElementById("recent").innerHTML=eventHTML(db.events.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,6));
 document.getElementById("historyList").innerHTML=eventHTML(db.events.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)));
 renderRoutines(); renderToday();
}
function card(a){const meta=[a.birthDate?`🎂 ${new Intl.DateTimeFormat("fr-FR").format(new Date(a.birthDate+"T00:00:00"))}`:"",a.location?`📍 ${esc(a.location)}`:"",a.origin?`📄 ${esc(a.origin)}`:""].filter(Boolean).join(" · ");return `<div class="card"><div class="animal"><div class="avatar">${icons[a.type]||"🐾"}</div><div><b>${esc(a.name||"Sans nom")}</b><div class="muted">${esc(a.species)} · ${esc(typeLabels[a.type]||a.type)}</div></div></div>${meta?`<p class="muted">${meta}</p>`:""}<div style="display:flex;gap:8px;margin-top:10px"><button class="ghost animalAction" data-id="${a.id}" style="flex:1">Ajouter une activité</button><button class="ghost deleteAnimal" data-id="${a.id}" title="Supprimer cet animal">🗑️</button></div></div>`}
function eventHTML(arr){if(!arr.length)return empty("Pas encore d’activité","Tes nourrissages, arrosages et observations apparaîtront ici.");return arr.map(e=>{let a=animal(e.animalId);return `<div class="event"><div><b>${labels[e.kind]||e.kind} · ${esc(a?.name||"Animal supprimé")}</b><span class="muted">${esc(e.details||"")} ${e.value?`· ${esc(e.value)}`:""}</span></div><span class="muted">${new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e.date))}</span></div>`}).join("")}
function empty(t,p){return `<div class="card"><b>${t}</b><p class="muted">${p}</p></div>`}
function openModal(html){document.getElementById("modalContent").innerHTML=html;document.getElementById("modal").classList.remove("hidden")}
function close(){document.getElementById("modal").classList.add("hidden")}
document.getElementById("closeModal").onclick=close;
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));document.getElementById(b.dataset.page).classList.add("active");});
document.getElementById("addAnimal").onclick=()=>openModal(`<h2>Nouvel animal</h2><form id="animalForm"><label>Nom / identifiant <span class="muted">(optionnel)</span></label><input name="name" placeholder="Ex. Kiwi"><label>Espèce</label><input id="speciesSearch" name="species" required list="speciesSuggestions" autocomplete="off" placeholder="Ex. Pogona vitticeps"><datalist id="speciesSuggestions">${SPECIES_CATALOG.map(x=>`<option value="${esc(x.name)}"></option>`).join("")}</datalist><small class="muted">Choisis une espèce de ton catalogue ou tape un autre nom.</small><label>Groupe</label><select id="animalType" name="type"><option value="reptile">Reptile</option><option value="amphibian">Amphibien</option><option value="invertebrate">Invertébré</option><option value="insect">Insecte</option></select><label>Date de naissance <span class="muted">(optionnel)</span></label><input name="birthDate" type="date"><label>Localisation</label><input name="location" placeholder="Ex. Salle reptiles, terrarium 3..."><label>Certificat d’origine</label><select name="origin"><option value="NC">NC</option><option value="WC">WC</option></select><label>Notes <span class="muted">(optionnel)</span></label><textarea name="notes" placeholder="Informations supplémentaires..."></textarea><div class="formActions"><button type="button" class="ghost" onclick="close()">Annuler</button><button class="primary">Créer</button></div></form>`);
document.addEventListener("input",async e=>{
 if(e.target.id!=="speciesSearch")return;
 const q=String(e.target.value||"").trim();
 const list=document.getElementById("speciesSuggestions");
 const type=document.getElementById("animalType");
 if(!list)return;
 const local=SPECIES_CATALOG.filter(x=>x.name.toLowerCase().includes(q.toLowerCase())).slice(0,30);
 list.innerHTML=local.map(x=>`<option value="${esc(x.name)}"></option>`).join("");
 const match=SPECIES_CATALOG.find(x=>x.name.toLowerCase()===q.toLowerCase());
 if(match&&type)type.value=match.type;
 if(q.length<2)return;
 clearTimeout(window._speciesTimer);
 window._speciesTimer=setTimeout(async()=>{
   try{
     const r=await fetch("https://api.gbif.org/v1/species/suggest?q="+encodeURIComponent(q)+"&rank=SPECIES&limit=20");
     const data=await r.json();
     const names=[...new Set([...local.map(x=>x.name),...data.filter(x=>x.rank==="SPECIES").map(x=>x.canonicalName||x.scientificName||"").filter(Boolean)])].slice(0,40);
     list.innerHTML=names.map(x=>`<option value="${esc(x)}"></option>`).join("");
   }catch(err){}
 },300);
});
document.addEventListener("submit",e=>{if(e.target.id!=="animalForm")return;e.preventDefault();if(e.target.dataset.saving==="1")return;e.target.dataset.saving="1";const submit=e.target.querySelector('button[type="submit"]');if(submit)submit.disabled=true;const f=new FormData(e.target);const name=String(f.get("name")||"").trim();const species=String(f.get("species")||"").trim();if(!species){e.target.dataset.saving="0";if(submit)submit.disabled=false;return;}db.animals.push({id:crypto.randomUUID(),name,species,type:f.get("type"),birthDate:String(f.get("birthDate")||""),location:String(f.get("location")||"").trim(),origin:String(f.get("origin")||"NC"),notes:String(f.get("notes")||"").trim()});save();close()});

if(document.getElementById("addRoutine")) document.getElementById("addRoutine").onclick=()=>{
 if(!db.animals.length)return openModal("<h2>Ajoute d’abord un animal</h2><p class='muted'>Crée au moins un animal avant de programmer une routine.</p>");
 const species=[...new Set(db.animals.map(a=>a.species))];
 openModal(`<h2>Nouvelle routine</h2><form id="routineForm">
<label>Espèce</label><select name="species">${species.map(x=>`<option>${esc(x)}</option>`).join("")}</select>
<label>Action</label><select name="kind"><option value="feeding">Nourrissage</option><option value="watering">Arrosage / brumisation</option><option value="waterChange">Changement de l’eau</option><option value="cleaning">Nettoyage</option><option value="note">Observation</option></select>
<label>Fréquence</label><select name="frequency"><option value="daily">Tous les jours</option><option value="weekly">Chaque semaine</option><option value="interval">Tous les X jours</option></select>
<label>Intervalle (si X jours)</label><input name="interval" type="number" min="1" value="2">
<label>Heure</label><input name="time" type="time" value="18:00">
<label>Jours (si hebdomadaire)</label><input name="days" placeholder="Lundi, mercredi, vendredi">
<div class="formActions"><button type="button" class="ghost" onclick="close()">Annuler</button><button class="primary">Créer</button></div></form>`);
};
document.addEventListener("submit",e=>{
 if(e.target.id==="routineForm"){e.preventDefault();const f=new FormData(e.target);
 db.speciesRoutines.push({id:crypto.randomUUID(),species:f.get("species"),kind:f.get("kind"),frequency:f.get("frequency"),interval:Number(f.get("interval")||1),time:f.get("time"),days:f.get("days")});
 db.reminders=db.reminders.filter(x=>db.speciesRoutines.some(r=>r.id===x.routineId));save();close();}
});
document.addEventListener("click",e=>{
 const d=e.target.closest(".doneReminder");
 if(d){const r=db.reminders.find(x=>x.id===d.dataset.id);if(r){r.done=true;db.events.push({id:crypto.randomUUID(),animalId:r.animalId,kind:db.speciesRoutines.find(x=>x.id===r.routineId)?.kind||"note",details:"Rappel effectué",date:new Date().toISOString()});save();}}
 const del=e.target.closest(".deleteRoutine");
 if(del){db.speciesRoutines=db.speciesRoutines.filter(x=>x.id!==del.dataset.id);db.reminders=db.reminders.filter(x=>x.routineId!==del.dataset.id);save();}
});
document.addEventListener("click",e=>{const b=e.target.closest(".deleteAnimal");if(!b)return;const a=animal(b.dataset.id);if(!a)return;if(!confirm(`Supprimer ${a.name} ?\nSes activités seront aussi supprimées.`))return;db.animals=db.animals.filter(x=>x.id!==a.id);db.events=db.events.filter(x=>x.animalId!==a.id);db.reminders=db.reminders.filter(x=>x.animalId!==a.id);save();});
function activity(kind,preselect=null){
  let opts=db.animals.map(a=>`<option value="${a.id}" ${a.id===preselect?"selected":""}>${esc(a.name)} — ${esc(a.species)}</option>`).join("");
  if(!opts)return openModal("<h2>Ajoute d’abord un animal</h2><p class='muted'>Il faut un animal pour enregistrer une activité.</p>");
  const now=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,16);
  const water=kind==="waterChange";
  const detailField=water?"":`<label>Détail</label><input name="details" placeholder="${kind==="feeding"?"Ex. 3 grillons":kind==="watering"?"Ex. brumisation 30 s":"Observation..."}">`;
  const valueField=kind==="feeding"?`<label>Complément (optionnel)</label><select name="value"><option value="">Aucun</option><option value="Calcium">Calcium</option><option value="Vitamine D3">Vitamine D3</option><option value="Vitamine">Vitamine</option></select>`:(water?"":`<label>Valeur (optionnel)</label><input name="value" placeholder="${kind==="weight"?"Ex. 482 g":"Quantité, durée…"}">`);
  openModal(`<h2>${labels[kind]}</h2><form id="eventForm"><input type="hidden" name="kind" value="${kind}"><label>Animal</label><select name="animalId">${opts}</select>${detailField}${valueField}<label>Date et heure</label><input type="datetime-local" name="date" value="${now}"><div class="formActions"><button type="button" class="ghost" onclick="close()">Annuler</button><button class="primary">Enregistrer</button></div></form>`);
};
document.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>activity(b.dataset.action));
document.addEventListener("click",e=>{let b=e.target.closest(".animalAction");if(b)activity("note",b.dataset.id)});
document.addEventListener("submit",e=>{if(e.target.id!=="eventForm")return;e.preventDefault();let f=new FormData(e.target);db.events.push({id:crypto.randomUUID(),animalId:f.get("animalId"),kind:f.get("kind"),details:f.get("details"),value:f.get("value"),date:new Date(f.get("date")).toISOString()});save();close()});
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");
let deferred;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;document.getElementById("installBtn").classList.remove("hidden")});document.getElementById("installBtn").onclick=async()=>{if(deferred){deferred.prompt();deferred=null}};
render();