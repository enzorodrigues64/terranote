// TerraNote v17 — groupes d'espèces + activités groupées
const typeLabels={reptile:"Reptiles",amphibian:"Amphibiens",gastropod:"Gastéropodes",arthropod:"Arthropodes"};
const icons={reptile:"🦎",amphibian:"🐸",gastropod:"🐌",arthropod:"🪲"};
const labels={feeding:"Nourrissage",watering:"Arrosage / brumisation",weight:"Pesée",waterChange:"Changement de l’eau",note:"Note",cleaning:"Nettoyage",treatment:"Traitement",molt:"Mue"};

const SPECIES_CATALOG=[
{name:"Cranidium gibbosum",type:"arthropod"},
{name:"Brancsikia freyi",type:"arthropod"},
{name:"Blaptica dubia",type:"arthropod"},
{name:"Compsodes schwarzi",type:"arthropod"},
{name:"Elliptorhina chopardi",type:"arthropod"},
{name:"Elliptorhina javanica",type:"arthropod"},
{name:"Eustegasta buprestoides",type:"arthropod"},
{name:"Gyna caffrorum",type:"arthropod"},
{name:"Gyna centurio",type:"arthropod"},
{name:"Hemiblabera granulata",type:"arthropod"},
{name:"Hormetica sp.",type:"arthropod"},
{name:"Lucihormetica subcincta",type:"arthropod"},
{name:"Lucihormetica verrucosa",type:"arthropod"},
{name:"Macropanesthia rhinoceros",type:"arthropod"},
{name:"Megaloblatta blaberoides",type:"arthropod"},
{name:"Nauphoeta cinerea",type:"arthropod"},
{name:"Nocticola vagus",type:"arthropod"},
{name:"Oxyhaloa deusta",type:"arthropod"},
{name:"Panchlora sp.",type:"arthropod"},
{name:"Paraplecta minutissima",type:"arthropod"},
{name:"Paratemnopteryx coloniana",type:"arthropod"},
{name:"Periplaneta lateralis",type:"arthropod"},
{name:"Phoetalia pallida",type:"arthropod"},
{name:"Pseudoglomeris magnifica",type:"arthropod"},
{name:"Pycnoscelus striatus",type:"arthropod"},
{name:"Symploce pallens",type:"arthropod"},
{name:"Therea bernhardti",type:"arthropod"},
{name:"Therea olegrandjeani",type:"arthropod"},
{name:"Therea regularis",type:"arthropod"},
{name:"Therea sp.",type:"arthropod"},
{name:"Ancylecha fenestrata",type:"arthropod"},
{name:"Lirometopum coronatum",type:"arthropod"},
{name:"Luzarida sp.",type:"arthropod"},
{name:"Melanonotus powellorum",type:"arthropod"},
{name:"Nesonotus reticulatus",type:"arthropod"},
{name:"Orocharis sp.",type:"arthropod"},
{name:"Phalangopsis cf. longipes",type:"arthropod"},
{name:"Phymateus saxosus",type:"arthropod"},
{name:"Teleutias aduncus",type:"arthropod"},
{name:"Vestria sp.",type:"arthropod"},
{name:"Xerophyllopteryx fumosa",type:"arthropod"},
{name:"Anadenobolus leucostigma",type:"arthropod"},
{name:"Aphistogoniulus hova",type:"arthropod"},
{name:"Atopochetus caudulanus",type:"arthropod"},
{name:"Centrobolus richardi",type:"arthropod"},
{name:"Orthoporus lomontii",type:"arthropod"},
{name:"Orthoporus sp.",type:"arthropod"},
{name:"Sechelleptus sp.",type:"arthropod"},
{name:"Zoosphaerium neptunus",type:"arthropod"},
{name:"Charinus acosta",type:"arthropod"},
{name:"Charinus sp.",type:"arthropod"},
{name:"Heterophrynus alces",type:"arthropod"},
{name:"Heterophrynus longicornis",type:"arthropod"},
{name:"Paraphrynus laevifrons",type:"arthropod"},
{name:"Phrynus goesii",type:"arthropod"},
{name:"Armadillidae sp.",type:"arthropod"},
{name:"Armadillidium gestroi",type:"arthropod"},
{name:"Cubaris sp.",type:"arthropod"},
{name:"Leptotrichus panzeri",type:"arthropod"},
{name:"Porcellio dilatatus",type:"arthropod"},
{name:"Porcellio hoffmannseggii",type:"arthropod"},
{name:"Porcellio sp.",type:"arthropod"},
{name:"Trichorrhina tomentosa",type:"arthropod"},
{name:"Trichorrhina sp.",type:"arthropod"},
{name:"Venezillo sp.",type:"arthropod"},
{name:"Platymeris biguttatus",type:"arthropod"},
{name:"Psytalla horrida",type:"arthropod"},
{name:"Lophosaurus boydii",type:"reptile"},
{name:"Ouroborus cataphractus",type:"reptile"},
{name:"Saurodactylus brosseti",type:"reptile"},
{name:"Saurodactylus harrisii",type:"reptile"},
{name:"Sphaerodactylus elegans",type:"reptile"},
{name:"Sphaerodactylus torrei",type:"reptile"},
{name:"Ceratophrys cranwelli",type:"amphibian"},
{name:"Pyxicephalus adspersus",type:"amphibian"}
];

const KEY="terranote_v14";

const INITIAL_ANIMALS=SPECIES_CATALOG.map((s,i)=>({
id:`catalog_v14_${i+1}`,
name:s.name,
species:s.name,
type:s.type,
birthDate:"",
location:"",
origin:"NC",
notes:""
}));

let db;

try{
db=JSON.parse(localStorage.getItem(KEY)||"null")
}catch(e){
db=null
}

if(!db||typeof db!=="object")db={};

for(const k of ["animals","events","speciesRoutines","reminders","speciesGroups"]){
if(!Array.isArray(db[k]))db[k]=[]
}

db.animals.forEach(a=>{
if(a.type==="invertebrate"||a.type==="insect"){
a.type="arthropod"
}
});

if(db.animals.length===0){
db.animals=INITIAL_ANIMALS.map(a=>({...a}))
}

const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#39;"
}[c]));

const uid=()=>{
if(crypto.randomUUID)return crypto.randomUUID();
return "id_"+Date.now()+"_"+Math.random().toString(36).slice(2)
};

const animal=id=>db.animals.find(a=>String(a.id)===String(id));

const getGroup=id=>db.speciesGroups.find(g=>String(g.id)===String(id));

const animalsForGroup=g=>{
if(!g)return[];

return db.animals.filter(a=>
(g.species||[]).some(s=>
String(s).trim().toLowerCase()===
String(a.species||"").trim().toLowerCase()
)
)
};

const groupNamesForSpecies=s=>
db.speciesGroups
.filter(g=>
(g.species||[]).some(x=>
x.toLowerCase()===String(s).toLowerCase()
)
)
.map(g=>g.name);

function save(){
localStorage.setItem(KEY,JSON.stringify(db));
render()
}

function openModal(html){
const m=document.getElementById("modal");
const c=document.getElementById("modalContent");

if(!m||!c)return;

c.innerHTML=html;
m.classList.remove("hidden")
}

function closeModal(){
document.getElementById("modal")?.classList.add("hidden")
}

document.getElementById("closeModal")?.addEventListener(
"click",
closeModal
);

document.querySelectorAll(".nav").forEach(b=>
b.addEventListener("click",()=>{
document.querySelectorAll(".nav")
.forEach(x=>x.classList.remove("active"));

b.classList.add("active");

document.querySelectorAll(".page")
.forEach(x=>x.classList.remove("active"));

document.getElementById(b.dataset.page)
?.classList.add("active");
})
);

function card(a){

const groups=groupNamesForSpecies(a.species);

return `
<div
class="card animalCard"
data-id="${esc(a.id)}"
style="cursor:pointer"
>

<div style="
display:flex;
justify-content:space-between;
gap:10px
">

<div>

<div style="font-size:24px">
${icons[a.type]||"🪲"}
</div>

<h3 style="margin:4px 0">
${esc(a.name||a.species)}
</h3>

<p class="muted">
${esc(a.species)}
</p>

</div>

<span class="pill">
${esc(typeLabels[a.type]||a.type)}
</span>

</div>

${
a.location
?`<p>📍 ${esc(a.location)}</p>`
:`<p class="muted">📍 Localisation non renseignée</p>`
}

${
groups.length
?`<p class="muted">
📦 ${groups.map(esc).join(" · ")}
</p>`
:""
}

<div class="formActions">

<button
type="button"
class="ghost animalAction"
data-kind="feeding"
data-id="${esc(a.id)}"
>
🍽️
</button>

<button
type="button"
class="ghost animalAction"
data-kind="watering"
data-id="${esc(a.id)}"
>
💧
</button>

<button
type="button"
class="ghost animalAction"
data-kind="note"
data-id="${esc(a.id)}"
>
📝
</button>

</div>

</div>
`
}

function renderGroups(){

const all=document.getElementById("allAnimals");

if(!all)return;

let html=`

<div class="card">

<div
class="sectionHead"
style="margin:0"
>

<div>

<h3 style="margin:0">
📦 Groupes d’espèces
</h3>

<p
class="muted"
style="margin:4px 0 0"
>
Crée des groupes pour nourrir, arroser
ou enregistrer une activité sur plusieurs
espèces en une seule fois.
</p>

</div>

<button
type="button"
class="primary"
id="newSpeciesGroup"
>
+ Groupe
</button>

</div>
`;

if(db.speciesGroups.length){

html+=`

<div style="margin-top:12px">

${db.speciesGroups.map(g=>{

const n=animalsForGroup(g).length;

return `

<div
class="event"
style="margin-bottom:8px"
>

<div style="flex:1">

<b>
📦 ${esc(g.name)}
</b>

<div class="muted">
${n} animal${n>1?"aux":""}
·
${(g.species||[]).length}
espèce${(g.species||[]).length>1?"s":""}
</div>

${
g.description
?`<div class="muted">
${esc(g.description)}
</div>`
:""
}

</div>

<div
style="display:flex;gap:6px"
>

<button
type="button"
class="ghost editGroup"
data-id="${esc(g.id)}"
>
Modifier
</button>

<button
type="button"
class="ghost deleteGroup"
data-id="${esc(g.id)}"
>
🗑️
</button>

</div>

</div>
`

}).join("")}

</div>
`

}else{

html+=`

<p class="muted" style="margin-top:12px">
Aucun groupe pour le moment.
</p>
`
}

html+=`

</div>

<h3 style="margin-top:18px">
Mes animaux
</h3>

<div class="grid">
${db.animals.map(card).join("")}
</div>
`;

all.innerHTML=html
}

function openGroupEditor(id=null){

const g=id?getGroup(id):null;

let catalog=[...SPECIES_CATALOG];

db.animals.forEach(a=>{

if(
a.species &&
!catalog.some(
s=>s.name.toLowerCase()===
a.species.toLowerCase()
)
){

catalog.push({
name:a.species,
type:a.type||"arthropod"
})

}

});

openModal(`

<h2>
${g?"Modifier le groupe":"Nouveau groupe d’espèces"}
</h2>

<label>
Nom du groupe
</label>

<input
id="groupName"
value="${esc(g?.name||"")}"
placeholder="Ex. Blattes"
>

<label>
Description
</label>

<input
id="groupDescription"
value="${esc(g?.description||"")}"
placeholder="Ex. Nourrissage tous les 3 jours"
>

<label>
Espèces du groupe
</label>

<div
style="
max-height:360px;
overflow:auto;
border:1px solid rgba(128,128,128,.3);
border-radius:10px;
padding:8px
"
>

${catalog.map(s=>`

<label
style="
display:flex;
gap:9px;
align-items:center;
padding:7px 4px
"
>

<input
type="checkbox"
class="groupSpecies"
value="${esc(s.name)}"
${
(g?.species||[])
.some(
x=>x.toLowerCase()===
s.name.toLowerCase()
)
?"checked":""
}
>

${esc(s.name)}

</label>

`).join("")}

</div>

<div class="formActions">

<button
type="button"
class="ghost"
id="cancelGroup"
>
Annuler
</button>

<button
type="button"
class="primary"
id="saveGroup"
>
${g?"Enregistrer":"Créer le groupe"}
</button>

</div>
`);

document.getElementById("cancelGroup")
?.addEventListener(
"click",
closeModal
);

document.getElementById("saveGroup")
?.addEventListener(
"click",
()=>{

const name=
document.getElementById("groupName")
?.value.trim();

const description=
document.getElementById("groupDescription")
?.value.trim();

const species=
[...document.querySelectorAll(".groupSpecies:checked")]
.map(x=>x.value);

if(!name){
alert("Donne un nom au groupe.");
return
}

if(!species.length){
alert("Sélectionne au moins une espèce.");
return
}

if(g){

g.name=name;
g.description=description;
g.species=species

}else{

db.speciesGroups.push({
id:uid(),
name,
description,
species
})

}

save();
closeModal()

}
)
}

function openAnimalEditor(id){

const a=animal(id);

if(!a)return;

openModal(`

<h2>
Modifier l’animal
</h2>

<label>
Nom / identifiant
</label>

<input
id="editName"
value="${esc(a.name||"")}"
>

<label>
Espèce
</label>

<input
id="editSpecies"
value="${esc(a.species||"")}"
required
>

<label>
Catégorie
</label>

<select id="editType">

<option
value="reptile"
${a.type==="reptile"?"selected":""}
>
Reptiles
</option>

<option
value="amphibian"
${a.type==="amphibian"?"selected":""}
>
Amphibiens
</option>

<option
value="gastropod"
${a.type==="gastropod"?"selected":""}
>
Gastéropodes
</option>

<option
value="arthropod"
${a.type==="arthropod"?"selected":""}
>
Arthropodes
</option>

</select>

<label>
Date de naissance
</label>

<input
id="editBirth"
type="date"
value="${esc(a.birthDate||"")}"
>

<label>
Localisation
</label>

<input
id="editLocation"
value="${esc(a.location||"")}"
placeholder="Ex. Salle reptiles, terrarium 3"
>

<label>
Certificat d’origine
</label>

<select id="editOrigin">

<option
value="NC"
${a.origin!=="WC"?"selected":""}
>
NC
</option>

<option
value="WC"
${a.origin==="WC"?"selected":""}
>
WC
</option>

</select>

<label>
Notes
</label>

<textarea id="editNotes">
${esc(a.notes||"")}
</textarea>

<div class="formActions">

<button
type="button"
class="ghost"
id="cancelEdit"
>
Annuler
</button>

<button
type="button"
class="primary"
id="saveEdit"
>
Enregistrer
</button>

</div>
`);

document.getElementById("cancelEdit")
?.addEventListener(
"click",
closeModal
);

document.getElementById("saveEdit")
?.addEventListener(
"click",
()=>{

const species=
document.getElementById("editSpecies")
.value.trim();

if(!species){
alert("L’espèce est obligatoire.");
return
}

a.name=
document.getElementById("editName")
.value.trim();

a.species=species;

a.type=
document.getElementById("editType")
.value;

a.birthDate=
document.getElementById("editBirth")
.value;

a.location=
document.getElementById("editLocation")
.value.trim();

a.origin=
document.getElementById("editOrigin")
.value;

a.notes=
document.getElementById("editNotes")
.value.trim();

save();
closeModal()

}
)
}

function openAddAnimal(){

openModal(`

<h2>
Ajouter un animal
</h2>

<label>
Nom / identifiant
</label>

<input
id="addName"
placeholder="Ex. Kiwi"
>

<label>
Espèce
</label>

<input
id="addSpecies"
list="speciesList"
placeholder="Ex. Blaptica dubia"
>

<datalist id="speciesList">

${SPECIES_CATALOG.map(s=>
`<option value="${esc(s.name)}">`
).join("")}

</datalist>

<label>
Catégorie
</label>

<select id="addType">

<option value="reptile">
Reptiles
</option>

<option value="amphibian">
Amphibiens
</option>

<option value="gastropod">
Gastéropodes
</option>

<option
value="arthropod"
selected
>
Arthropodes
</option>

</select>

<label>
Localisation
</label>

<input id="addLocation">

<label>
Origine
</label>

<select id="addOrigin">

<option>
NC
</option>

<option>
WC
</option>

</select>

<label>
Notes
</label>

<textarea id="addNotes"></textarea>

<div class="formActions">

<button
type="button"
class="ghost"
id="cancelAdd"
>
Annuler
</button>

<button
type="button"
class="primary"
id="saveAdd"
>
Ajouter
</button>

</div>
`);

document.getElementById("cancelAdd")
?.addEventListener(
"click",
closeModal
);

document.getElementById("saveAdd")
?.addEventListener(
"click",
()=>{

const species=
document.getElementById("addSpecies")
.value.trim();

if(!species){
alert("L’espèce est obligatoire.");
return
}

db.animals.push({

id:uid(),

name:
document.getElementById("addName")
.value.trim()||species,

species,

type:
document.getElementById("addType")
.value,

birthDate:"",

location:
document.getElementById("addLocation")
.value.trim(),

origin:
document.getElementById("addOrigin")
.value,

notes:
document.getElementById("addNotes")
.value.trim()

});

save();
closeModal()

}
)
}

document.getElementById("addAnimal")
?.addEventListener(
"click",
openAddAnimal
);

function activity(kind,preselect=null){

if(!db.animals.length){
alert("Ajoute d’abord un animal.");
return
}

const now=
new Date(
Date.now()-
new Date().getTimezoneOffset()*60000
)
.toISOString()
.slice(0,16);

const groupOptions=
db.speciesGroups.map(g=>{

const n=animalsForGroup(g).length;

return `
<option value="${esc(g.id)}">
${esc(g.name)}
—
${n} animal${n>1?"aux":""}
</option>
`

}).join("");

const animalOptions=
db.animals.map(a=>`

<option
value="${esc(a.id)}"
${a.id===preselect?"selected":""}
>
${esc(a.name||a.species)}
—
${esc(a.species)}
</option>

`).join("");

openModal(`

<h2>
${esc(labels[kind]||kind)}
</h2>

<label>
Appliquer à
</label>

<select id="targetType">

<option value="animal">
Un animal
</option>

${
db.speciesGroups.length
?`
<option value="group">
Un groupe d’espèces
</option>
`
:""
}

</select>

<div id="animalBox">

<label>
Animal
</label>

<select id="targetAnimal">
${animalOptions}
</select>

</div>

${
db.speciesGroups.length
?`

<div
id="groupBox"
style="display:none"
>

<label>
Groupe d’espèces
</label>

<select id="targetGroup">
${groupOptions}
</select>

<p
id="groupInfo"
class="muted"
></p>

</div>

`
:""
}

<label>
Détail
</label>

<input
id="activityDetails"
placeholder="Ex. 3 grillons, brumisation 30 s..."
>

<label>
Valeur / complément
</label>

<input
id="activityValue"
placeholder="Quantité, calcium, durée…"
>

<label>
Date et heure
</label>

<input
id="activityDate"
type="datetime-local"
value="${now}"
>

<div class="formActions">

<button
type="button"
class="ghost"
id="cancelActivity"
>
Annuler
</button>

<button
type="button"
class="primary"
id="saveActivity"
>
Enregistrer
</button>

</div>
`);

const tt=
document.getElementById("targetType");

const ab=
document.getElementById("animalBox");

const gb=
document.getElementById("groupBox");

const gs=
document.getElementById("targetGroup");

const info=
document.getElementById("groupInfo");

function update(){

const group=tt.value==="group";

ab.style.display=
group?"none":"block";

if(gb)
gb.style.display=
group?"block":"none";

if(group&&gs&&info){

const g=getGroup(gs.value);

const n=animalsForGroup(g).length;

info.textContent=
`${n} animal${n>1?"aux":""} concerné${n>1?"s":""}.`

}

}

tt.onchange=update;

if(gs)
gs.onchange=update;

document.getElementById("cancelActivity")
.onclick=closeModal;

document.getElementById("saveActivity")
.onclick=()=>{

let targets=[];
let group=null;

if(tt.value==="group"){

group=getGroup(gs.value);

targets=animalsForGroup(group);

if(!targets.length){

alert(
"Aucun animal ne correspond aux espèces de ce groupe."
);

return
}

}else{

const a=
animal(
document.getElementById("targetAnimal")
.value
);

if(a)
targets=[a]

}

if(!targets.length){

alert("Animal introuvable.");

return
}

const dateValue=
document.getElementById("activityDate")
.value;

const date=
dateValue
?new Date(dateValue).toISOString()
:new Date().toISOString();

const details=
document.getElementById("activityDetails")
.value.trim();

const value=
document.getElementById("activityValue")
.value.trim();

targets.forEach(a=>{

db.events.push({

id:uid(),

animalId:a.id,

kind,

details:
group
?(
details
?`${details} · Groupe : ${group.name}`
:`Groupe : ${group.name}`
)
:details,

value,

date

})

});

save();
closeModal();

if(group){

alert(
`${targets.length} animal${targets.length>1?"aux":""} mis à jour.`
)

}

};

update()
}

document.querySelectorAll("[data-action]")
.forEach(b=>
b.addEventListener(
"click",
()=>activity(b.dataset.action)
)
);

function render(){

const today=
new Date()
.toLocaleDateString(
"fr-FR",
{
weekday:"long",
day:"numeric",
month:"long"
}
);

const title=
document.getElementById("todayTitle");

if(title)
title.textContent=today;

const summary=
document.getElementById("summary");

if(summary){

summary.textContent=
`${db.animals.length} animaux suivis · ${db.events.length} activités enregistrées`

}

const grid=
document.getElementById("animalGrid");

if(grid)
grid.innerHTML=
db.animals
.slice(0,12)
.map(card)
.join("");

renderGroups();
renderHistory();
renderReminders()
}

function renderHistory(){

const el=
document.getElementById("historyList");

if(!el)return;

const rows=
[...db.events]
.sort(
(a,b)=>
new Date(b.date)-new Date(a.date)
);

el.innerHTML=
rows.length
?rows.slice(0,100).map(e=>{

const a=animal(e.animalId);

return `

<div class="event">

<div>

<b>
${esc(labels[e.kind]||e.kind)}
</b>

—
${esc(a?.name||a?.species||"Animal supprimé")}

<div class="muted">
${new Date(e.date).toLocaleString("fr-FR")}
</div>

${
e.details
?`<div>${esc(e.details)}</div>`
:""
}

${
e.value
?`<div>${esc(e.value)}</div>`
:""
}

</div>

</div>

`

}).join("")
:"<p class='muted'>Aucune activité.</p>"
}

function renderReminders(){

const today=
document.getElementById("todayReminders");

const list=
document.getElementById("routineList");

if(today){

today.innerHTML=
db.reminders.length
?db.reminders.map(r=>`

<div class="event">

<div>

<b>
${esc(r.title||r.kind||"Rappel")}
</b>

<div class="muted">
${esc(r.date||"")}
</div>

</div>

</div>

`).join("")
:"<p class='muted'>Aucun rappel aujourd’hui.</p>"

}

if(list){

list.innerHTML=
db.speciesRoutines.length
?db.speciesRoutines.map(r=>`

<div class="event">

<div>

<b>
${esc(r.name||r.title||"Routine")}
</b>

<div class="muted">
${esc(r.frequency||"")}
</div>

</div>

</div>

`).join("")
:"<p class='muted'>Aucune routine.</p>"

}

}

document.addEventListener(
"click",
e=>{

const g=
e.target.closest(
"#newSpeciesGroup,.editGroup,.deleteGroup"
);

if(g){

if(g.id==="newSpeciesGroup")
return openGroupEditor();

if(g.classList.contains("editGroup"))
return openGroupEditor(g.dataset.id);

if(g.classList.contains("deleteGroup")){

const group=
getGroup(g.dataset.id);

if(
group&&
confirm(
`Supprimer le groupe « ${group.name} » ?\n\nLes animaux et leurs activités seront conservés.`
)
){

db.speciesGroups=
db.speciesGroups.filter(
x=>x.id!==group.id
);

save()

}

return
}

}

const aa=
e.target.closest(".animalAction");

if(aa){

e.stopPropagation();

return activity(
aa.dataset.kind,
aa.dataset.id
)

}

const c=
e.target.closest(".animalCard");

if(c)
return openAnimalEditor(
c.dataset.id
)

}
);

let deferred;

window.addEventListener(
"beforeinstallprompt",
e=>{

e.preventDefault();

deferred=e;

document.getElementById("installBtn")
?.classList.remove("hidden")

}
);

document.getElementById("installBtn")
?.addEventListener(
"click",
async()=>{
if(deferred){
deferred.prompt();
deferred=null
}
}
);

if("serviceWorker" in navigator){

window.addEventListener(
"load",
()=>{

navigator.serviceWorker
.register("sw.js")
.catch(()=>{})

}
)

}

render();
