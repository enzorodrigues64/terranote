// TerraNote v14 — catalogue préchargé automatiquement
const typeLabels={reptile:'Reptiles',amphibian:'Amphibiens',gastropod:'Gastéropodes',arthropod:'Arthropodes'};

const SPECIES_CATALOG=[
{"name":"Cranidium gibbosum","type":"arthropod"},
{"name":"Brancsikia freyi","type":"arthropod"},
{"name":"Blaptica dubia","type":"arthropod"},
{"name":"Compsodes schwarzi","type":"arthropod"},
{"name":"Elliptorhina chopardi","type":"arthropod"},
{"name":"Elliptorhina javanica","type":"arthropod"},
{"name":"Eustegasta buprestoides","type":"arthropod"},
{"name":"Gyna caffrorum","type":"arthropod"},
{"name":"Gyna centurio","type":"arthropod"},
{"name":"Hemiblabera granulata","type":"arthropod"},
{"name":"Hormetica sp.","type":"arthropod"},
{"name":"Lucihormetica subcincta","type":"arthropod"},
{"name":"Lucihormetica verrucosa","type":"arthropod"},
{"name":"Macropanesthia rhinoceros","type":"arthropod"},
{"name":"Megaloblatta blaberoides","type":"arthropod"},
{"name":"Nauphoeta cinerea","type":"arthropod"},
{"name":"Nocticola vagus","type":"arthropod"},
{"name":"Oxyhaloa deusta","type":"arthropod"},
{"name":"Panchlora sp.","type":"arthropod"},
{"name":"Paraplecta minutissima","type":"arthropod"},
{"name":"Paratemnopteryx coloniana","type":"arthropod"},
{"name":"Periplaneta lateralis","type":"arthropod"},
{"name":"Phoetalia pallida","type":"arthropod"},
{"name":"Pseudoglomeris magnifica","type":"arthropod"},
{"name":"Pycnoscelus striatus","type":"arthropod"},
{"name":"Symploce pallens","type":"arthropod"},
{"name":"Therea bernhardti","type":"arthropod"},
{"name":"Therea olegrandjeani","type":"arthropod"},
{"name":"Therea regularis","type":"arthropod"},
{"name":"Therea sp.","type":"arthropod"},
{"name":"Ancylecha fenestrata","type":"arthropod"},
{"name":"Lirometopum coronatum","type":"arthropod"},
{"name":"Luzarida sp.","type":"arthropod"},
{"name":"Melanonotus powellorum","type":"arthropod"},
{"name":"Nesonotus reticulatus","type":"arthropod"},
{"name":"Orocharis sp.","type":"arthropod"},
{"name":"Phalangopsis cf. longipes","type":"arthropod"},
{"name":"Phymateus saxosus","type":"arthropod"},
{"name":"Teleutias aduncus","type":"arthropod"},
{"name":"Vestria sp.","type":"arthropod"},
{"name":"Xerophyllopteryx fumosa","type":"arthropod"},
{"name":"Anadenobolus leucostigma","type":"arthropod"},
{"name":"Aphistogoniulus hova","type":"arthropod"},
{"name":"Atopochetus caudulanus","type":"arthropod"},
{"name":"Centrobolus richardi","type":"arthropod"},
{"name":"Orthoporus lomontii","type":"arthropod"},
{"name":"Orthoporus sp.","type":"arthropod"},
{"name":"Sechelleptus sp.","type":"arthropod"},
{"name":"Zoosphaerium neptunus","type":"arthropod"},
{"name":"Charinus acosta","type":"arthropod"},
{"name":"Charinus sp.","type":"arthropod"},
{"name":"Heterophrynus alces","type":"arthropod"},
{"name":"Heterophrynus longicornis","type":"arthropod"},
{"name":"Paraphrynus laevifrons","type":"arthropod"},
{"name":"Phrynus goesii","type":"arthropod"},
{"name":"Armadillidae sp.","type":"arthropod"},
{"name":"Armadillidium gestroi","type":"arthropod"},
{"name":"Cubaris sp.","type":"arthropod"},
{"name":"Leptotrichus panzeri","type":"arthropod"},
{"name":"Porcellio dilatatus","type":"arthropod"},
{"name":"Porcellio hoffmannseggii","type":"arthropod"},
{"name":"Porcellio sp.","type":"arthropod"},
{"name":"Trichorrhina tomentosa","type":"arthropod"},
{"name":"Trichorrhina sp.","type":"arthropod"},
{"name":"Venezillo sp.","type":"arthropod"},
{"name":"Platymeris biguttatus","type":"arthropod"},
{"name":"Psytalla horrida","type":"arthropod"},
{"name":"Lophosaurus boydii","type":"reptile"},
{"name":"Ouroborus cataphractus","type":"reptile"},
{"name":"Saurodactylus brosseti","type":"reptile"},
{"name":"Saurodactylus harrisii","type":"reptile"},
{"name":"Sphaerodactylus elegans","type":"reptile"},
{"name":"Sphaerodactylus torrei","type":"reptile"},
{"name":"Ceratophrys cranwelli","type":"amphibian"},
{"name":"Pyxicephalus adspersus","type":"amphibian"}
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

let db=JSON.parse(localStorage.getItem(KEY)||'{"animals":[],"events":[],"speciesRoutines":[],"reminders":[]}');

if(!Array.isArray(db.animals))db.animals=[];
if(!Array.isArray(db.events))db.events=[];
if(!Array.isArray(db.speciesRoutines))db.speciesRoutines=[];
if(!Array.isArray(db.reminders))db.reminders=[];

if(db.animals.length===0){
  db.animals=INITIAL_ANIMALS.map(a=>({...a}));
  localStorage.setItem(KEY,JSON.stringify(db));
}

const icons={
  reptile:"🦎",
  amphibian:"🐸",
  gastropod:"🐌",
  arthropod:"🪲"
};

const labels={
  feeding:"Nourrissage",
  watering:"Arrosage / brumisation",
  weight:"Pesée",
  waterChange:"Changement de l’eau",
  note:"Note",
  cleaning:"Nettoyage",
  treatment:"Traitement",
  molt:"Mue"
};

db.animals.forEach(a=>{
  if(a.type==="invertebrate"||a.type==="insect"){
    a.type="arthropod";
  }
});

const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({
  "&":"&amp;",
  "<":"&lt;",
  ">":"&gt;",
  '"':"&quot;",
  "'":"&#39;"
}[c]));

const animal=id=>db.animals.find(a=>String(a.id)===String(id));

function save(){
  try{
    localStorage.setItem(KEY,JSON.stringify(db));
    render();
  }catch(err){
    console.error(err);
    alert("Impossible d’enregistrer les données sur cet appareil.");
  }
}

function routineText(r){
  return r.frequency==="daily"
    ?`Tous les jours à ${r.time}`
    :r.frequency==="weekly"
      ?`Chaque semaine (${r.days||"à définir"}) à ${r.time}`
      :`Tous les ${r.interval||1} jours à ${r.time}`;
}

function empty(t,p){
  return `<div class="card"><b>${t}</b><p class="muted">${p}</p></div>`;
}

function openModal(html){
  const content=document.getElementById("modalContent");
  const modal=document.getElementById("modal");
  if(!content||!modal)return;
  content.innerHTML=html;
  modal.classList.remove("hidden");
}

function closeModal(){
  const modal=document.getElementById("modal");
  if(modal)modal.classList.add("hidden");
}

const closeButton=document.getElementById("closeModal");
if(closeButton)closeButton.onclick=closeModal;

document.querySelectorAll(".nav").forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");

    document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));

    const page=document.getElementById(b.dataset.page);
    if(page)page.classList.add("active");
  };
});

function eventHTML(arr){
  if(!arr.length){
    return empty(
      "Pas encore d’activité",
      "Tes nourrissages, arrosages et observations apparaîtront ici."
    );
  }

  return arr.map(e=>{
    const a=animal(e.animalId);

    return `<div class="event">
      <div>
        <b>${labels[e.kind]||e.kind} · ${esc(a?.name||"Animal supprimé")}</b>
        <span class="muted">
          ${esc(e.details||"")}
          ${e.value?` · ${esc(e.value)}`:""}
        </span>
      </div>
      <span class="muted">
        ${new Intl.DateTimeFormat("fr-FR",{
          day:"2-digit",
          month:"2-digit",
          hour:"2-digit",
          minute:"2-digit"
        }).format(new Date(e.date))}
      </span>
    </div>`;
  }).join("");
}

function card(a){
  const meta=[
    a.birthDate
      ?`🎂 ${new Intl.DateTimeFormat("fr-FR").format(new Date(a.birthDate+"T00:00:00"))}`
      :"",
    a.location
      ?`📍 ${esc(a.location)}`
      :"",
    a.origin
      ?`📄 ${esc(a.origin)}`
      :""
  ].filter(Boolean).join(" · ");

  return `<div class="card animalCard" data-id="${esc(a.id)}" style="cursor:pointer">
    <div class="animal">
      <div class="avatar">${icons[a.type]||"🐾"}</div>
      <div>
        <b>${esc(a.name||"Sans nom")}</b>
        <div class="muted">
          ${esc(a.species||"")} · ${esc(typeLabels[a.type]||a.type||"")}
        </div>
      </div>
    </div>

    ${meta?`<p class="muted">${meta}</p>`:""}

    ${a.notes?`<p class="muted">📝 ${esc(a.notes)}</p>`:""}

    <div style="display:flex;gap:8px;margin-top:10px">
      <button
        type="button"
        class="primary editAnimal"
        data-id="${esc(a.id)}"
        style="flex:1"
      >
        Modifier
      </button>

      <button
        type="button"
        class="ghost animalAction"
        data-id="${esc(a.id)}"
        style="flex:1"
      >
        Ajouter une activité
      </button>

      <button
        type="button"
        class="ghost deleteAnimal"
        data-id="${esc(a.id)}"
        title="Supprimer cet animal"
      >
        🗑️
      </button>
    </div>
  </div>`;
}

function renderRoutines(){
  const el=document.getElementById("routineList");
  if(!el)return;

  el.innerHTML=db.speciesRoutines.length
    ?db.speciesRoutines.map(r=>`
      <div class="event">
        <div>
          <b>${esc(labels[r.kind]||r.kind)} · ${esc(r.species)}</b>
          <span class="muted">${esc(routineText(r))}</span>
        </div>
        <button type="button" class="ghost deleteRoutine" data-id="${esc(r.id)}">
          Supprimer
        </button>
      </div>
    `).join("")
    :empty(
      "Aucune routine",
      "Crée une routine pour programmer automatiquement tes rappels."
    );
}

function dueForRoutine(r,a){
  const now=new Date();
  const key=`${a.id}_${r.id}`;

  const existing=db.reminders.find(
    x=>x.key===key&&!x.done
  );

  if(existing)return existing;

  let due=new Date(now);

  const [h,m]=(r.time||"18:00").split(":").map(Number);

  due.setHours(h,m,0,0);

  if(r.frequency==="interval"){
    due.setDate(
      due.getDate()+(Number(r.interval)||1)-1
    );
  }

  if(due>now){
    due.setDate(due.getDate()-1);
  }

  if(r.frequency==="weekly"&&r.days){
    due.setDate(
      due.getDate()-((due.getDay()+6)%7)
    );
  }

  return {
    id:crypto.randomUUID(),
    key,
    animalId:a.id,
    routineId:r.id,
    due:due.toISOString(),
    done:false
  };
}

function renderToday(){
  const el=document.getElementById("todayReminders");
  if(!el)return;

  db.animals.forEach(a=>{
    db.speciesRoutines
      .filter(r=>
        String(r.species||"").toLowerCase()===
        String(a.species||"").toLowerCase()
      )
      .forEach(r=>{
        const x=dueForRoutine(r,a);

        if(!db.reminders.some(
          z=>z.key===x.key&&!z.done
        )){
          db.reminders.push(x);
        }
      });
  });

  const now=Date.now();

  const active=db.reminders.filter(
    x=>!x.done&&new Date(x.due).getTime()<=now
  );

  el.innerHTML=active.length
    ?active.map(x=>{
      const a=animal(x.animalId);
      const r=db.speciesRoutines.find(
        z=>z.id===x.routineId
      );

      return `<div class="event">
        <div>
          <b>
            ⏰ ${esc(labels[r?.kind]||r?.kind)} ·
            ${esc(a?.name||"")}
          </b>
          <span class="muted">
            ${esc(r?.species||"")} ·
            ${new Date(x.due).toLocaleTimeString(
              "fr-FR",
              {hour:"2-digit",minute:"2-digit"}
            )}
          </span>
        </div>

        <button
          type="button"
          class="primary doneReminder"
          data-id="${esc(x.id)}"
        >
          ✓ Fait
        </button>
      </div>`;
    }).join("")
    :empty(
      "Rien à faire",
      "Tous les rappels sont à jour."
    );
}

function render(){
  const todayTitle=document.getElementById("todayTitle");

  if(todayTitle){
    todayTitle.textContent=
      new Intl.DateTimeFormat("fr-FR",{
        weekday:"long",
        day:"numeric",
        month:"long"
      }).format(new Date());
  }

  const today=new Date().toDateString();

  const summary=document.getElementById("summary");

  if(summary){
    summary.textContent=
      `${db.animals.length} animaux suivi${db.animals.length>1?"s":""} · `+
      `${db.events.filter(e=>new Date(e.date).toDateString()===today).length} activité(s) aujourd’hui`;
  }

  const cards=
    db.animals.map(a=>card(a)).join("")||
    empty(
      "Aucun animal",
      "Ajoute ton premier animal pour commencer."
    );

  const animalGrid=document.getElementById("animalGrid");
  const allAnimals=document.getElementById("allAnimals");

  if(animalGrid)animalGrid.innerHTML=cards;
  if(allAnimals)allAnimals.innerHTML=cards;

  const sortedEvents=db.events
    .slice()
    .sort((a,b)=>new Date(b.date)-new Date(a.date));

  const recent=document.getElementById("recent");
  const history=document.getElementById("historyList");

  if(recent){
    recent.innerHTML=
      eventHTML(sortedEvents.slice(0,6));
  }

  if(history){
    history.innerHTML=
      eventHTML(sortedEvents);
  }

  renderRoutines();
  renderToday();
}

const addAnimal=document.getElementById("addAnimal");

if(addAnimal){
  addAnimal.onclick=()=>{
    openModal(`
      <h2>Nouvel animal</h2>

      <form id="animalForm">

        <label>
          Nom / identifiant
          <span class="muted">(optionnel)</span>
        </label>

        <input
          name="name"
          placeholder="Ex. Kiwi"
        >

        <label>Espèce</label>

        <input
          id="speciesSearch"
          name="species"
          required
          list="speciesSuggestions"
          autocomplete="off"
          placeholder="Ex. Pogona vitticeps"
        >

        <datalist id="speciesSuggestions">
          ${SPECIES_CATALOG.map(x=>
            `<option value="${esc(x.name)}"></option>`
          ).join("")}
        </datalist>

        <small class="muted">
          Choisis une espèce de ton catalogue ou tape un autre nom.
        </small>

        <label>Groupe</label>

        <select id="animalType" name="type">
          <option value="reptile">Reptiles</option>
          <option value="amphibian">Amphibiens</option>
          <option value="gastropod">Gastéropodes</option>
          <option value="arthropod">Arthropodes</option>
        </select>

        <label>
          Date de naissance
          <span class="muted">(optionnel)</span>
        </label>

        <input name="birthDate" type="date">

        <label>Localisation</label>

        <input
          name="location"
          placeholder="Ex. Salle reptiles, terrarium 3..."
        >

        <label>Certificat d’origine</label>

        <select name="origin">
          <option value="NC">NC</option>
          <option value="WC">WC</option>
        </select>

        <label>
          Notes
          <span class="muted">(optionnel)</span>
        </label>

        <textarea
          name="notes"
          placeholder="Informations supplémentaires..."
        ></textarea>

        <div class="formActions">
          <button
            type="button"
            class="ghost"
            onclick="closeModal()"
          >
            Annuler
          </button>

          <button
            type="submit"
            class="primary"
          >
            Créer
          </button>
        </div>

      </form>
    `);
  };
}

document.addEventListener("input",async e=>{
  if(e.target.id!=="speciesSearch")return;

  const q=String(e.target.value||"").trim();

  const list=document.getElementById("speciesSuggestions");
  const type=document.getElementById("animalType");

  if(!list)return;

  const local=SPECIES_CATALOG
    .filter(x=>
      x.name.toLowerCase().includes(
        q.toLowerCase()
      )
    )
    .slice(0,30);

  list.innerHTML=
    local.map(x=>
      `<option value="${esc(x.name)}"></option>`
    ).join("");

  const match=SPECIES_CATALOG.find(x=>
    x.name.toLowerCase()===q.toLowerCase()
  );

  if(match&&type){
    type.value=match.type;
  }

  if(q.length<2)return;

  clearTimeout(window._speciesTimer);

  window._speciesTimer=setTimeout(async()=>{
    try{
      const r=await fetch(
        "https://api.gbif.org/v1/species/suggest?q="+
        encodeURIComponent(q)+
        "&rank=SPECIES&limit=20"
      );

      const data=await r.json();

      const names=[
        ...new Set([
          ...local.map(x=>x.name),
          ...data
            .filter(x=>x.rank==="SPECIES")
            .map(x=>x.canonicalName||x.scientificName||"")
            .filter(Boolean)
        ])
      ].slice(0,40);

      list.innerHTML=
        names.map(x=>
          `<option value="${esc(x)}"></option>`
        ).join("");

    }catch(err){}
  },300);
});

document.addEventListener("submit",e=>{
  if(e.target.id!=="animalForm")return;

  e.preventDefault();
  e.stopPropagation();

  if(e.target.dataset.saving==="1")return;

  e.target.dataset.saving="1";

  const submit=
    e.target.querySelector('button[type="submit"]');

  if(submit)submit.disabled=true;

  const f=new FormData(e.target);

  const name=
    String(f.get("name")||"").trim();

  const species=
    String(f.get("species")||"").trim();

  if(!species){
    e.target.dataset.saving="0";
    if(submit)submit.disabled=false;
    return;
  }

  db.animals.push({
    id:crypto.randomUUID(),
    name,
    species,
    type:String(f.get("type")||"arthropod"),
    birthDate:String(f.get("birthDate")||""),
    location:String(f.get("location")||"").trim(),
    origin:String(f.get("origin")||"NC"),
    notes:String(f.get("notes")||"").trim()
  });

  save();
  closeModal();
});

if(document.getElementById("addRoutine")){
  document.getElementById("addRoutine").onclick=()=>{

    if(!db.animals.length){
      return openModal(`
        <h2>Ajoute d’abord un animal</h2>
        <p class="muted">
          Crée au moins un animal avant de programmer une routine.
        </p>
      `);
    }

    const species=[
      ...new Set(
        db.animals.map(a=>a.species)
      )
    ];

    openModal(`
      <h2>Nouvelle routine</h2>

      <form id="routineForm">

        <label>Espèce</label>

        <select name="species">
          ${species.map(x=>
            `<option>${esc(x)}</option>`
          ).join("")}
        </select>

        <label>Action</label>

        <select name="kind">
          <option value="feeding">Nourrissage</option>
          <option value="watering">Arrosage / brumisation</option>
          <option value="waterChange">Changement de l’eau</option>
          <option value="cleaning">Nettoyage</option>
          <option value="note">Observation</option>
        </select>

        <label>Fréquence</label>

        <select name="frequency">
          <option value="daily">Tous les jours</option>
          <option value="weekly">Chaque semaine</option>
          <option value="interval">Tous les X jours</option>
        </select>

        <label>Intervalle (si X jours)</label>

        <input
          name="interval"
          type="number"
          min="1"
          value="2"
        >

        <label>Heure</label>

        <input
          name="time"
          type="time"
          value="18:00"
        >

        <label>Jours (si hebdomadaire)</label>

        <input
          name="days"
          placeholder="Lundi, mercredi, vendredi"
        >

        <div class="formActions">

          <button
            type="button"
            class="ghost"
            onclick="closeModal()"
          >
            Annuler
          </button>

          <button
            type="submit"
            class="primary"
          >
            Créer
          </button>

        </div>

      </form>
    `);
  };
}

document.addEventListener("submit",e=>{
  if(e.target.id!=="routineForm")return;

  e.preventDefault();
  e.stopPropagation();

  const f=new FormData(e.target);

  db.speciesRoutines.push({
    id:crypto.randomUUID(),
    species:String(f.get("species")||""),
    kind:String(f.get("kind")||"note"),
    frequency:String(f.get("frequency")||"daily"),
    interval:Number(f.get("interval")||1),
    time:String(f.get("time")||"18:00"),
    days:String(f.get("days")||"")
  });

  db.reminders=db.reminders.filter(x=>
    db.speciesRoutines.some(
      r=>r.id===x.routineId
    )
  );

  save();
  closeModal();
});

document.addEventListener("click",e=>{

  const done=e.target.closest(".doneReminder");

  if(done){
    const r=db.reminders.find(
      x=>x.id===done.dataset.id
    );

    if(r){
      r.done=true;

      const routine=db.speciesRoutines.find(
        x=>x.id===r.routineId
      );

      db.events.push({
        id:crypto.randomUUID(),
        animalId:r.animalId,
        kind:routine?.kind||"note",
        details:"Rappel effectué",
        date:new Date().toISOString()
      });

      save();
    }
  }

  const del=e.target.closest(".deleteRoutine");

  if(del){
    db.speciesRoutines=
      db.speciesRoutines.filter(
        x=>x.id!==del.dataset.id
      );

    db.reminders=
      db.reminders.filter(
        x=>x.routineId!==del.dataset.id
      );

    save();
  }
});

function openAnimalEditor(id){

  const a=animal(id);

  if(!a)return;

  openModal(`
    <h2>Modifier l’animal</h2>

    <form id="editAnimalForm">

      <input
        type="hidden"
        name="id"
        value="${esc(a.id)}"
      >

      <label>Nom / identifiant</label>

      <input
        name="name"
        value="${esc(a.name||"")}"
        placeholder="Ex. Kiwi"
      >

      <label>Espèce</label>

      <input
        name="species"
        value="${esc(a.species||"")}"
        required
        list="editSpeciesSuggestions"
        autocomplete="off"
      >

      <datalist id="editSpeciesSuggestions">
        ${SPECIES_CATALOG.map(x=>
          `<option value="${esc(x.name)}"></option>`
        ).join("")}
      </datalist>

      <label>Groupe</label>

      <select name="type">

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
          ${
            a.type==="arthropod"||
            a.type==="invertebrate"||
            a.type==="insect"
              ?"selected":""
          }
        >
          Arthropodes
        </option>

      </select>

      <label>Date de naissance</label>

      <input
        name="birthDate"
        type="date"
        value="${esc(a.birthDate||"")}"
      >

      <label>Localisation</label>

      <input
        name="location"
        value="${esc(a.location||"")}"
        placeholder="Ex. Salle reptiles, terrarium 3..."
      >

      <label>Certificat d’origine</label>

      <select name="origin">

        <option
          value="NC"
          ${a.origin==="NC"?"selected":""}
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

      <label>Notes</label>

      <textarea
        name="notes"
        placeholder="Informations supplémentaires..."
      >${esc(a.notes||"")}</textarea>

      <div class="formActions">

        <button
          type="button"
          class="ghost"
          onclick="closeModal()"
        >
          Annuler
        </button>

        <button
          type="submit"
          class="primary"
        >
          Enregistrer
        </button>

      </div>

    </form>
  `);
}

document.addEventListener("click",e=>{

  const editBtn=e.target.closest(".editAnimal");

  if(editBtn){
    e.preventDefault();
    e.stopPropagation();
    openAnimalEditor(editBtn.dataset.id);
    return;
  }

  const action=e.target.closest(".animalAction");

  if(action)return;

  const deleteBtn=e.target.closest(".deleteAnimal");

  if(deleteBtn)return;

  const animalCard=e.target.closest(".animalCard");

  if(animalCard){
    openAnimalEditor(animalCard.dataset.id);
  }
});

document.addEventListener("submit",e=>{

  if(e.target.id!=="editAnimalForm")return;

  e.preventDefault();
  e.stopPropagation();

  const f=new FormData(e.target);

  const id=String(f.get("id")||"");

  const a=db.animals.find(
    x=>String(x.id)===id
  );

  if(!a){
    alert("Animal introuvable.");
    return;
  }

  const species=
    String(f.get("species")||"").trim();

  if(!species){
    alert("L’espèce est obligatoire.");
    return;
  }

  // Modification directe de l'animal existant.
  a.name=
    String(f.get("name")||"").trim();

  a.species=species;

  a.type=
    String(f.get("type")||"arthropod");

  a.birthDate=
    String(f.get("birthDate")||"");

  a.location=
    String(f.get("location")||"").trim();

  a.origin=
    String(f.get("origin")||"NC");

  a.notes=
    String(f.get("notes")||"").trim();

  // Enregistrement DIRECT dans le stockage local.
  try{

    localStorage.setItem(
      KEY,
      JSON.stringify(db)
    );

  }catch(err){

    console.error(err);

    alert(
      "Impossible d’enregistrer les modifications sur cet appareil."
    );

    return;
  }

  render();
  closeModal();
});

document.addEventListener("click",e=>{

  const b=e.target.closest(".deleteAnimal");

  if(!b)return;

  e.preventDefault();
  e.stopPropagation();

  const a=animal(b.dataset.id);

  if(!a)return;

  if(!confirm(
    `Supprimer ${a.name||a.species} ?\nSes activités seront aussi supprimées.`
  )){
    return;
  }

  db.animals=
    db.animals.filter(
      x=>x.id!==a.id
    );

  db.events=
    db.events.filter(
      x=>x.animalId!==a.id
    );

  db.reminders=
    db.reminders.filter(
      x=>x.animalId!==a.id
    );

  save();
});

function activity(kind,preselect=null){

  const opts=db.animals.map(a=>
    `<option
      value="${esc(a.id)}"
      ${a.id===preselect?"selected":""}
    >
      ${esc(a.name||"Sans nom")} — ${esc(a.species)}
    </option>`
  ).join("");

  if(!opts){
    return openModal(`
      <h2>Ajoute d’abord un animal</h2>
      <p class="muted">
        Il faut un animal pour enregistrer une activité.
      </p>
    `);
  }

  const now=
    new Date(
      Date.now()-
      new Date().getTimezoneOffset()*60000
    )
    .toISOString()
    .slice(0,16);

  const water=kind==="waterChange";

  const detailField=water
    ?""
    :`
      <label>Détail</label>

      <input
        name="details"
        placeholder="${
          kind==="feeding"
            ?"Ex. 3 grillons"
            :kind==="watering"
              ?"Ex. brumisation 30 s"
              :"Observation..."
        }"
      >
    `;

  const valueField=
    kind==="feeding"
      ?`
        <label>Complément (optionnel)</label>

        <select name="value">
          <option value="">Aucun</option>
          <option value="Calcium">Calcium</option>
          <option value="Vitamine D3">Vitamine D3</option>
          <option value="Vitamine">Vitamine</option>
        </select>
      `
      :(water
        ?""
        :`
          <label>Valeur (optionnel)</label>

          <input
            name="value"
            placeholder="${
              kind==="weight"
                ?"Ex. 482 g"
                :"Quantité, durée…"
            }"
          >
        `
      );

  openModal(`
    <h2>${labels[kind]||kind}</h2>

    <form id="eventForm">

      <input
        type="hidden"
        name="kind"
        value="${esc(kind)}"
      >

      <label>Animal</label>

      <select name="animalId">
        ${opts}
      </select>

      ${detailField}

      ${valueField}

      <label>Date et heure</label>

      <input
        type="datetime-local"
        name="date"
        value="${now}"
      >

      <div class="formActions">

        <button
          type="button"
          class="ghost"
          onclick="closeModal()"
        >
          Annuler
        </button>

        <button
          type="submit"
          class="primary"
        >
          Enregistrer
        </button>

      </div>

    </form>
  `);
}

document.querySelectorAll("[data-action]").forEach(b=>{
  b.onclick=()=>{
    activity(b.dataset.action);
  };
});

document.addEventListener("click",e=>{
  const b=e.target.closest(".animalAction");

  if(!b)return;

  e.preventDefault();
  e.stopPropagation();

  activity("note",b.dataset.id);
});

document.addEventListener("submit",e=>{

  if(e.target.id!=="eventForm")return;

  e.preventDefault();
  e.stopPropagation();

  const f=new FormData(e.target);

  const dateValue=
    String(f.get("date")||"");

  const date=
    dateValue
      ?new Date(dateValue).toISOString()
      :new Date().toISOString();

  db.events.push({
    id:crypto.randomUUID(),
    animalId:String(f.get("animalId")||""),
    kind:String(f.get("kind")||"note"),
    details:String(f.get("details")||""),
    value:String(f.get("value")||""),
    date
  });

  save();
  closeModal();
});

if("serviceWorker"in navigator){

  navigator.serviceWorker
    .getRegistrations()
    .then(rs=>{
      if(rs.length){
        return Promise.all(
          rs.map(r=>r.unregister())
        );
      }
    })
    .catch(()=>{});

}

let deferred;

window.addEventListener(
  "beforeinstallprompt",
  e=>{
    e.preventDefault();

    deferred=e;

    const installBtn=
      document.getElementById("installBtn");

    if(installBtn){
      installBtn.classList.remove("hidden");
    }
  }
);

const installBtn=
  document.getElementById("installBtn");

if(installBtn){

  installBtn.onclick=async()=>{

    if(deferred){

      deferred.prompt();

      deferred=null;

    }

  };

}

render();
