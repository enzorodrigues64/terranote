const KEY="terranote_v1";
let db=JSON.parse(localStorage.getItem(KEY)||'{"animals":[],"events":[],"speciesRoutines":[],"reminders":[]}');
const icons={reptile:"🦎",amphibian:"🐸",insect:"🪲"};
const labels={feeding:"Nourrissage",watering:"Arrosage / brumisation",weight:"Pesée",note:"Note",cleaning:"Nettoyage",treatment:"Traitement",molt:"Mue"};
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
function card(a){return `<div class="card"><div class="animal"><div class="avatar">${icons[a.type]||"🐾"}</div><div><b>${esc(a.name)}</b><div class="muted">${esc(a.species)} · ${esc(a.type)}</div></div></div>${a.terrarium?`<p class="muted">🏠 ${esc(a.terrarium)}</p>`:""}<button class="ghost animalAction" data-id="${a.id}" style="margin-top:10px;width:100%">Ajouter une activité</button></div>`}
function eventHTML(arr){if(!arr.length)return empty("Pas encore d’activité","Tes nourrissages, arrosages et observations apparaîtront ici.");return arr.map(e=>{let a=animal(e.animalId);return `<div class="event"><div><b>${labels[e.kind]||e.kind} · ${esc(a?.name||"Animal supprimé")}</b><span class="muted">${esc(e.details||"")} ${e.value?`· ${esc(e.value)}`:""}</span></div><span class="muted">${new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e.date))}</span></div>`}).join("")}
function empty(t,p){return `<div class="card"><b>${t}</b><p class="muted">${p}</p></div>`}
function openModal(html){document.getElementById("modalContent").innerHTML=html;document.getElementById("modal").classList.remove("hidden")}
function close(){document.getElementById("modal").classList.add("hidden")}
document.getElementById("closeModal").onclick=close;
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));document.getElementById(b.dataset.page).classList.add("active");});
document.getElementById("addAnimal").onclick=()=>openModal(`<h2>Nouvel animal</h2><form id="animalForm"><label>Nom / identifiant</label><input name="name" required placeholder="Ex. Kiwi"><label>Espèce</label><input name="species" required placeholder="Ex. Pogona vitticeps"><label>Groupe</label><select name="type"><option value="reptile">Reptile</option><option value="amphibian">Amphibien</option><option value="insect">Insecte</option></select><label>Terrarium / installation</label><input name="terrarium" placeholder="Ex. T-03"><label>Notes</label><textarea name="notes"></textarea><div class="formActions"><button type="button" class="ghost" onclick="close()">Annuler</button><button class="primary">Créer</button></div></form>`);
document.addEventListener("submit",e=>{if(e.target.id!=="animalForm")return;e.preventDefault();let f=new FormData(e.target);db.animals.push({id:crypto.randomUUID(),name:f.get("name"),species:f.get("species"),type:f.get("type"),terrarium:f.get("terrarium"),notes:f.get("notes")});save();close()});

document.getElementById("addRoutine").onclick=()=>{
 if(!db.animals.length)return openModal("<h2>Ajoute d’abord un animal</h2><p class='muted'>Crée au moins un animal avant de programmer une routine.</p>");
 const species=[...new Set(db.animals.map(a=>a.species))];
 openModal(`<h2>Nouvelle routine</h2><form id="routineForm">
<label>Espèce</label><select name="species">${species.map(x=>`<option>${esc(x)}</option>`).join("")}</select>
<label>Action</label><select name="kind"><option value="feeding">Nourrissage</option><option value="watering">Arrosage / brumisation</option><option value="weight">Pesée</option><option value="cleaning">Nettoyage</option><option value="treatment">Traitement</option><option value="molt">Vérification de mue</option><option value="note">Observation</option></select>
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
function activity(kind,preselect=null){let opts=db.animals.map(a=>`<option value="${a.id}" ${a.id===preselect?"selected":""}>${esc(a.name)} — ${esc(a.species)}</option>`).join("");if(!opts)return openModal("<h2>Ajoute d’abord un animal</h2><p class='muted'>Il faut un animal pour enregistrer une activité.</p>");openModal(`<h2>${labels[kind]}</h2><form id="eventForm"><input type="hidden" name="kind" value="${kind}"><label>Animal</label><select name="animalId">${opts}</select><label>Détail</label><input name="details" placeholder="${kind==="feeding"?"Ex. 3 grillons":kind==="watering"?"Ex. brumisation 30 s":"Observation..."}"><label>Valeur (optionnel)</label><input name="value" placeholder="${kind==="weight"?"Ex. 482 g":"Quantité, durée…"}"><label>Date et heure</label><input type="datetime-local" name="date" value="${new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,16)}"><div class="formActions"><button type="button" class="ghost" onclick="close()">Annuler</button><button class="primary">Enregistrer</button></div></form>`)};
document.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>activity(b.dataset.action));
document.addEventListener("click",e=>{let b=e.target.closest(".animalAction");if(b)activity("note",b.dataset.id)});
document.addEventListener("submit",e=>{if(e.target.id!=="eventForm")return;e.preventDefault();let f=new FormData(e.target);db.events.push({id:crypto.randomUUID(),animalId:f.get("animalId"),kind:f.get("kind"),details:f.get("details"),value:f.get("value"),date:new Date(f.get("date")).toISOString()});save();close()});
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");
let deferred;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;document.getElementById("installBtn").classList.remove("hidden")});document.getElementById("installBtn").onclick=async()=>{if(deferred){deferred.prompt();deferred=null}};
render();