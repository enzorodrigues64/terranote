// ============================================================
// TerraNote v16
// Groupes d'espèces + activités par groupe
// ============================================================

const typeLabels = {
  reptile: "Reptiles",
  amphibian: "Amphibiens",
  gastropod: "Gastéropodes",
  arthropod: "Arthropodes"
};

const icons = {
  reptile: "🦎",
  amphibian: "🐸",
  gastropod: "🐌",
  arthropod: "🪲"
};

const labels = {
  feeding: "Nourrissage",
  watering: "Arrosage / brumisation",
  weight: "Pesée",
  waterChange: "Changement de l’eau",
  note: "Note",
  cleaning: "Nettoyage",
  treatment: "Traitement",
  molt: "Mue"
};

// ============================================================
// CATALOGUE DES 75 ESPÈCES
// ============================================================

const SPECIES_CATALOG = [
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

// ============================================================
// DONNÉES
// ============================================================

const KEY = "terranote_v14";

const INITIAL_ANIMALS = SPECIES_CATALOG.map((s,i) => ({
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

try {
  db = JSON.parse(
    localStorage.getItem(KEY) ||
    '{"animals":[],"events":[],"speciesRoutines":[],"reminders":[],"speciesGroups":[]}'
  );
} catch(e) {
  db = {
    animals:[],
    events:[],
    speciesRoutines:[],
    reminders:[],
    speciesGroups:[]
  };
}

if(!Array.isArray(db.animals)) db.animals=[];
if(!Array.isArray(db.events)) db.events=[];
if(!Array.isArray(db.speciesRoutines)) db.speciesRoutines=[];
if(!Array.isArray(db.reminders)) db.reminders=[];
if(!Array.isArray(db.speciesGroups)) db.speciesGroups=[];
if(!Array.isArray(db.tasks)) db.tasks=[];
db.animals.forEach(a=>{ if(typeof a.active!=="boolean") a.active=true; });

// Migration des anciennes catégories
db.animals.forEach(a => {
  if(a.type==="invertebrate" || a.type==="insect") {
    a.type="arthropod";
  }
});

// Si aucune donnée animale n'existe, charger les 75 espèces.
if(db.animals.length===0) {
  db.animals=INITIAL_ANIMALS.map(a=>({...a}));
}

// ============================================================
// OUTILS
// ============================================================

const esc = s => String(s ?? "").replace(/[&<>"']/g,c => ({
  "&":"&amp;",
  "<":"&lt;",
  ">":"&gt;",
  '"':"&quot;",
  "'":"&#39;"
}[c]));

function animal(id) {
  return db.animals.find(a=>String(a.id)===String(id));
}

function save() {
  try {
    localStorage.setItem(KEY,JSON.stringify(db));
    render();
    renderTasksPage();
  } catch(err) {
    console.error(err);
    alert("Impossible d’enregistrer les données sur cet appareil.");
  }
}

function openModal(html) {
  const modal=document.getElementById("modal");
  const content=document.getElementById("modalContent");

  if(!modal || !content) return;

  content.innerHTML=html;
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal=document.getElementById("modal");
  if(modal) modal.classList.add("hidden");
}

const closeButton=document.getElementById("closeModal");

if(closeButton) {
  closeButton.onclick=closeModal;
}

// ============================================================
// NAVIGATION
// ============================================================

document.querySelectorAll(".nav").forEach(button => {
  button.onclick=()=>{
    document.querySelectorAll(".nav")
      .forEach(x=>x.classList.remove("active"));

    button.classList.add("active");

    document.querySelectorAll(".page")
      .forEach(x=>x.classList.remove("active"));

    const page=document.getElementById(button.dataset.page);

    if(page) page.classList.add("active");
  };
});

// ============================================================
// GROUPES D'ESPÈCES
// ============================================================

function getGroup(id) {
  return db.speciesGroups.find(
    g=>String(g.id)===String(id)
  );
}

function animalsForGroup(group) {
  if(!group) return [];

  const species=(group.species||[])
    .map(s=>String(s).trim().toLowerCase());

  return db.animals.filter(a =>
    species.includes(
      String(a.species||"").trim().toLowerCase()
    )
  );
}

function groupNamesForSpecies(species) {
  return db.speciesGroups
    .filter(g=>
      (g.species||[]).some(
        s=>String(s).toLowerCase()===String(species).toLowerCase()
      )
    )
    .map(g=>g.name);
}

function renderGroups() {

  const all=document.getElementById("allAnimals");

  if(!all) return;

  let groupHTML="";

  if(db.speciesGroups.length) {

    groupHTML=`
      <div class="card">
        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;
        ">
          <div>
            <h2 style="margin:0">📦 Groupes d'espèces</h2>
            <p class="muted" style="margin-bottom:0">
              Regroupe plusieurs espèces pour les nourrissages,
              arrosages et autres soins.
            </p>
          </div>

          <button
            type="button"
            class="primary"
            id="newSpeciesGroup"
          >
            + Nouveau groupe
          </button>
        </div>

        <div style="margin-top:14px">
          ${db.speciesGroups.map(group => {

            const members=animalsForGroup(group);

            return `
              <div class="event" style="margin-bottom:8px">

                <div style="flex:1">

                  <b>📦 ${esc(group.name)}</b>

                  <span class="muted">
                    ${members.length} animal${members.length>1?"aux":""}
                    · ${(group.species||[]).length}
                    espèce${(group.species||[]).length>1?"s":""}
                  </span>

                  ${
                    group.description
                    ?`<span class="muted">${esc(group.description)}</span>`
                    :""
                  }

                </div>

                <div style="
                  display:flex;
                  gap:6px;
                  flex-wrap:wrap;
                ">

                  <button
                    type="button"
                    class="ghost editGroup"
                    data-id="${esc(group.id)}"
                  >
                    Modifier
                  </button>

                  <button
                    type="button"
                    class="ghost deleteGroup"
                    data-id="${esc(group.id)}"
                  >
                    🗑️
                  </button>

                </div>

              </div>
            `;

          }).join("")}
        </div>
      </div>
    `;

  } else {

    groupHTML=`
      <div class="card">

        <h2>📦 Groupes d'espèces</h2>

        <p class="muted">
          Crée un groupe pour appliquer un nourrissage,
          un arrosage ou une autre activité à plusieurs espèces
          en une seule fois.
        </p>

        <button
          type="button"
          class="primary"
          id="newSpeciesGroup"
        >
          + Créer mon premier groupe
        </button>

      </div>
    `;
  }

  const activeAnimals=db.animals.filter(a=>a.active!==false);
  const inactiveAnimals=db.animals.filter(a=>a.active===false);
  const cards=activeAnimals.map(a=>card(a)).join("");

  all.innerHTML=
    groupHTML+
    `<h3 style="margin-top:18px">Mes animaux actifs (${activeAnimals.length})</h3>
     <div class="grid">${cards || '<p class="muted">Aucun animal actif.</p>'}</div>
     ${inactiveAnimals.length ? `<div class="card" style="margin-top:16px"><h3>⚪ Animaux désactivés (${inactiveAnimals.length})</h3>${inactiveAnimals.map(a=>`<div class="event" style="display:flex;gap:8px;align-items:center;margin:8px 0"><div style="flex:1"><b>${esc(a.name||a.species)}</b><div class="muted">${esc(a.species)}</div></div><button type="button" class="primary reactivateAnimal" data-id="${esc(a.id)}">🟢 Réactiver</button><button type="button" class="ghost deleteAnimal" data-id="${esc(a.id)}">🗑️</button></div>`).join('')}</div>` : ''}`;

  const button=document.getElementById("newSpeciesGroup");

  if(button) {
    button.onclick=()=>openGroupEditor();
  }
}

// ============================================================
// CRÉATION / MODIFICATION D'UN GROUPE
// ============================================================

function openGroupEditor(groupId=null) {

  const group=groupId ? getGroup(groupId) : null;

  const selected=group
    ?(group.species||[])
    :[];

  const catalog=[...SPECIES_CATALOG];

  // Ajoute aussi les espèces éventuellement créées manuellement.
  db.animals.forEach(a=>{
    if(
      a.species &&
      !catalog.some(
        x=>x.name.toLowerCase()===a.species.toLowerCase()
      )
    ) {
      catalog.push({
        name:a.species,
        type:a.type||"arthropod"
      });
    }
  });

  openModal(`

    <h2>
      ${group ? "Modifier le groupe" : "Nouveau groupe d'espèces"}
    </h2>

    <p class="muted">
      Sélectionne toutes les espèces qui doivent recevoir
      les mêmes soins.
    </p>

    <form id="groupForm">

      <input
        type="hidden"
        name="id"
        value="${group ? esc(group.id) : ""}"
      >

      <label>Nom du groupe</label>

      <input
        name="name"
        required
        value="${group ? esc(group.name) : ""}"
        placeholder="Ex. Blattes"
      >

      <label>Description</label>

      <input
        name="description"
        value="${group ? esc(group.description||"") : ""}"
        placeholder="Ex. Nourrissage tous les 3 jours"
      >

      <label>Espèces du groupe</label>

      <div style="
        max-height:360px;
        overflow-y:auto;
        border:1px solid rgba(128,128,128,.3);
        border-radius:10px;
        padding:8px;
        margin-top:6px;
      ">

        ${catalog.map((s,i)=>{

          const checked=selected.some(
            x=>String(x).toLowerCase()===
               String(s.name).toLowerCase()
          );

          return `
            <label style="
              display:flex;
              align-items:center;
              gap:9px;
              padding:7px 4px;
              margin:0;
              cursor:pointer;
            ">

              <input
                type="checkbox"
                name="species"
                value="${esc(s.name)}"
                ${checked?"checked":""}
              >

              <span>
                ${esc(s.name)}
              </span>

            </label>
          `;

        }).join("")}

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
          type="submit"
          class="primary"
        >
          ${group ? "Enregistrer" : "Créer le groupe"}
        </button>

      </div>

    </form>
  `);

  const cancel=document.getElementById("cancelGroup");

  if(cancel) cancel.onclick=closeModal;
}

// ============================================================
// CARTES ANIMAUX
// ============================================================

function card(a) {

  const meta=[
    a.birthDate
      ?`🎂 ${new Intl.DateTimeFormat("fr-FR")
          .format(new Date(a.birthDate+"T00:00:00"))}`
      :"",

    a.location
      ?`📍 ${esc(a.location)}`
      :"",

    a.origin
      ?`📄 ${esc(a.origin)}`
      :""
  ].filter(Boolean).join(" · ");

  const groups=groupNamesForSpecies(a.species);

  return `
    <div
      class="card animalCard"
      data-id="${esc(a.id)}"
      style="cursor:pointer"
    >

      <div class="animal">

        <div class="avatar">
          ${icons[a.type]||"🐾"}
        </div>

        <div>

          <b>${esc(a.name||"Sans nom")}</b>

          <div class="muted">
            ${esc(a.species||"")}
            ·
            ${esc(typeLabels[a.type]||a.type||"")}
          </div>

        </div>

      </div>

      ${
        groups.length
        ?`
          <p class="muted">
            📦 ${groups.map(esc).join(" · ")}
          </p>
        `
        :""
      }

      ${meta
        ?`<p class="muted">${meta}</p>`
        :""
      }

      ${
        a.notes
        ?`<p class="muted">📝 ${esc(a.notes)}</p>`
        :""
      }

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;">
        <button type="button" class="ghost deactivateAnimal" data-id="${esc(a.id)}" style="flex:1">⚪ Désactiver</button>

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

    </div>
  `;
}

// ============================================================
// ROUTINES
// ============================================================

function routineText(r) {

  if(r.frequency==="daily") {
    return `Tous les jours à ${r.time}`;
  }

  if(r.frequency==="weekly") {
    return `Chaque semaine (${r.days||"à définir"}) à ${r.time}`;
  }

  return `Tous les ${r.interval||1} jours à ${r.time}`;
}

function renderRoutines() {

  const el=document.getElementById("routineList");

  if(!el) return;

  if(!db.speciesRoutines.length) {

    el.innerHTML=`
      <div class="card">
        <b>Aucune routine</b>
        <p class="muted">
          Crée une routine pour programmer automatiquement
          tes rappels.
        </p>
      </div>
    `;

    return;
  }

  el.innerHTML=db.speciesRoutines.map(r=>`

    <div class="event">

      <div>

        <b>
          ${esc(labels[r.kind]||r.kind)}
          ·
          ${esc(r.species)}
        </b>

        <span class="muted">
          ${esc(routineText(r))}
        </span>

      </div>

      <button
        type="button"
        class="ghost deleteRoutine"
        data-id="${esc(r.id)}"
      >
        Supprimer
      </button>

    </div>

  `).join("");
}

// ============================================================
// RAPPELS
// ============================================================

function dueForRoutine(r,a) {

  const now=new Date();

  const key=`${a.id}_${r.id}`;

  const existing=db.reminders.find(
    x=>x.key===key&&!x.done
  );

  if(existing) return existing;

  let due=new Date(now);

  const parts=(r.time||"18:00").split(":");

  due.setHours(
    Number(parts[0])||18,
    Number(parts[1])||0,
    0,
    0
  );

  if(r.frequency==="interval") {
    due.setDate(
      due.getDate()+(Number(r.interval)||1)-1
    );
  }

  if(due>now) {
    due.setDate(due.getDate()-1);
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

function renderToday() {

  const el=document.getElementById("todayReminders");

  if(!el) return;

  db.animals.forEach(a=>{

    db.speciesRoutines
      .filter(r=>
        String(r.species||"").toLowerCase()===
        String(a.species||"").toLowerCase()
      )
      .forEach(r=>{

        const reminder=dueForRoutine(r,a);

        if(!db.reminders.some(
          x=>x.key===reminder.key&&!x.done
        )) {
          db.reminders.push(reminder);
        }

      });

  });

  const now=Date.now();

  const active=db.reminders.filter(
    x=>!x.done &&
       new Date(x.due).getTime()<=now
  );

  if(!active.length) {

    el.innerHTML=`
      <div class="card">

        <b>Rien à faire</b>

        <p class="muted">
          Tous les rappels sont à jour.
        </p>

      </div>
    `;

    return;
  }

  el.innerHTML=active.map(x=>{

    const a=animal(x.animalId);

    const r=db.speciesRoutines.find(
      z=>z.id===x.routineId
    );

    return `
      <div class="event">

        <div>

          <b>
            ⏰ ${esc(labels[r?.kind]||r?.kind)}
            ·
            ${esc(a?.name||"")}
          </b>

          <span class="muted">
            ${esc(r?.species||"")}
            ·
            ${new Date(x.due).toLocaleTimeString(
              "fr-FR",
              {
                hour:"2-digit",
                minute:"2-digit"
              }
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

      </div>
    `;

  }).join("");
}

// ============================================================
// HISTORIQUE
// ============================================================

function eventHTML(arr) {

  if(!arr.length) {

    return `
      <div class="card">

        <b>Pas encore d’activité</b>

        <p class="muted">
          Tes nourrissages, arrosages et observations
          apparaîtront ici.
        </p>

      </div>
    `;
  }

  return arr.map(e=>{

    const a=animal(e.animalId);

    return `
      <div class="event">

        <div>

          <b>
            ${esc(labels[e.kind]||e.kind)}
            ·
            ${esc(a?.name||"Animal supprimé")}
          </b>

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

      </div>
    `;

  }).join("");
}

// ============================================================
// AFFICHAGE PRINCIPAL
// ============================================================

function render() {

  const todayTitle=document.getElementById("todayTitle");

  if(todayTitle) {

    todayTitle.textContent=
      new Intl.DateTimeFormat("fr-FR",{
        weekday:"long",
        day:"numeric",
        month:"long"
      }).format(new Date());

  }

  const today=new Date().toDateString();

  const summary=document.getElementById("summary");

  if(summary) {

    summary.textContent=
      `${db.animals.length} animaux suivi${db.animals.length>1?"s":""} · `+
      `${db.events.filter(
        e=>new Date(e.date).toDateString()===today
      ).length} activité(s) aujourd’hui`;

  }

  const active=db.animals.filter(a=>a.active!==false);
  const inactive=db.animals.filter(a=>a.active===false);

  const cards=
    active.map(a=>card(a)).join("") ||
    `<div class="card"><b>Aucun animal actif</b><p class="muted">Tous les animaux sont désactivés.</p></div>`;

  const animalGrid=document.getElementById("animalGrid");

  if(animalGrid) {
    animalGrid.innerHTML=cards;
  }

  const allAnimals=document.getElementById("allAnimals");
  if(allAnimals) {
    const activeCount=active.length;
    const inactiveHtml=inactive.length?`<div class="card" style="margin-top:16px"><h3>⚪ Animaux désactivés (${inactive.length})</h3>${inactive.map(a=>`<div class="event" style="display:flex;gap:8px;align-items:center;margin:8px 0"><div style="flex:1"><b>${esc(a.name||a.species)}</b><div class="muted">${esc(a.species)}</div></div><button type="button" class="primary reactivateAnimal" data-id="${esc(a.id)}">🟢 Réactiver</button><button type="button" class="ghost deleteAnimal" data-id="${esc(a.id)}">🗑️</button></div>`).join("")}</div>`:"";
    allAnimals.innerHTML=`<div style="margin-bottom:12px"><b>${activeCount} animal${activeCount>1?"aux":""} actif${activeCount>1?"s":""}</b></div>`+document.getElementById("animalGrid")?.innerHTML+inactiveHtml;
  }

  renderGroups();

  const sortedEvents=db.events
    .slice()
    .sort(
      (a,b)=>new Date(b.date)-new Date(a.date)
    );

  const recent=document.getElementById("recent");

  const history=document.getElementById("historyList");

  if(recent) {
    recent.innerHTML=
      eventHTML(sortedEvents.slice(0,6));
  }

  if(history) {
    history.innerHTML=
      eventHTML(sortedEvents);
  }

  renderRoutines();
  renderToday();
}

// ============================================================
// AJOUT ANIMAL
// ============================================================

const addAnimal=document.getElementById("addAnimal");

if(addAnimal) {

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
          Choisis une espèce de ton catalogue
          ou tape un autre nom.
        </small>

        <label>Catégorie</label>

        <select name="type" id="animalType">

          <option value="reptile">
            Reptiles
          </option>

          <option value="amphibian">
            Amphibiens
          </option>

          <option value="gastropod">
            Gastéropodes
          </option>

          <option value="arthropod">
            Arthropodes
          </option>

        </select>

        <label>
          Date de naissance
          <span class="muted">(optionnel)</span>
        </label>

        <input
          name="birthDate"
          type="date"
        >

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
            id="cancelAnimal"
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

    const cancel=document.getElementById("cancelAnimal");

    if(cancel) cancel.onclick=closeModal;
  };
}

// ============================================================
// RECHERCHE D'ESPÈCES
// ============================================================

document.addEventListener("input",e=>{

  if(e.target.id!=="speciesSearch") return;

  const q=String(e.target.value||"").trim();

  const list=document.getElementById("speciesSuggestions");

  const type=document.getElementById("animalType");

  if(!list) return;

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

  if(match && type) {
    type.value=match.type;
  }

});

// ============================================================
// SAUVEGARDE NOUVEL ANIMAL
// ============================================================

document.addEventListener("submit",e=>{

  if(e.target.id!=="animalForm") return;

  e.preventDefault();
  e.stopPropagation();

  const f=new FormData(e.target);

  const species=
    String(f.get("species")||"").trim();

  if(!species) {

    alert("L’espèce est obligatoire.");

    return;
  }

  db.animals.push({

    id:crypto.randomUUID(),

    name:
      String(f.get("name")||"").trim(),

    species,

    type:
      String(f.get("type")||"arthropod"),

    birthDate:
      String(f.get("birthDate")||""),

    location:
      String(f.get("location")||"").trim(),

    origin:
      String(f.get("origin")||"NC"),

    notes:
      String(f.get("notes")||"").trim()

  });

  save();
  closeModal();

});

// ============================================================
// MODIFICATION ANIMAL
// ============================================================

function openAnimalEditor(id) {

  const a=animal(id);

  if(!a) return;

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
      >

      <datalist id="editSpeciesSuggestions">

        ${SPECIES_CATALOG.map(x=>
          `<option value="${esc(x.name)}"></option>`
        ).join("")}

      </datalist>

      <label>Catégorie</label>

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
          ${a.type==="arthropod"?"selected":""}
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
          id="cancelEditAnimal"
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

  const cancel=document.getElementById("cancelEditAnimal");

  if(cancel) cancel.onclick=closeModal;
}

document.addEventListener("submit",e=>{

  if(e.target.id!=="editAnimalForm") return;

  e.preventDefault();
  e.stopPropagation();

  const f=new FormData(e.target);

  const a=animal(
    String(f.get("id")||"")
  );

  if(!a) {

    alert("Animal introuvable.");

    return;
  }

  const species=
    String(f.get("species")||"").trim();

  if(!species) {

    alert("L’espèce est obligatoire.");

    return;
  }

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

  save();
  closeModal();

});

// ============================================================
// FORMULAIRE GROUPE
// ============================================================

document.addEventListener("submit",e=>{

  if(e.target.id!=="groupForm") return;

  e.preventDefault();
  e.stopPropagation();

  const f=new FormData(e.target);

  const id=
    String(f.get("id")||"").trim();

  const name=
    String(f.get("name")||"").trim();

  const description=
    String(f.get("description")||"").trim();

  const species=[
    ...new Set(
      f.getAll("species")
        .map(x=>String(x).trim())
        .filter(Boolean)
    )
  ];

  if(!name) {

    alert("Donne un nom au groupe.");

    return;
  }

  if(!species.length) {

    alert("Sélectionne au moins une espèce.");

    return;
  }

  if(id) {

    const group=getGroup(id);

    if(group) {

      group.name=name;
      group.description=description;
      group.species=species;

    }

  } else {

    db.speciesGroups.push({

      id:crypto.randomUUID(),

      name,

      description,

      species

    });

  }

  save();
  closeModal();

});

// ============================================================
// CLICS SUR GROUPES
// ============================================================

document.addEventListener("click",e=>{

  const edit=e.target.closest(".editGroup");

  if(edit) {

    e.preventDefault();
    e.stopPropagation();

    openGroupEditor(edit.dataset.id);

    return;
  }

  const del=e.target.closest(".deleteGroup");

  if(del) {

    e.preventDefault();
    e.stopPropagation();

    const group=getGroup(del.dataset.id);

    if(!group) return;

    const members=animalsForGroup(group);

    const ok=confirm(
      `Supprimer le groupe « ${group.name} » ?\n\n`+
      `${members.length} animal${members.length>1?"aux":""} `+
      `seront simplement retirés du groupe. `+
      `Les animaux et leurs activités ne seront pas supprimés.`
    );

    if(!ok) return;

    db.speciesGroups=
      db.speciesGroups.filter(
        g=>g.id!==group.id
      );

    save();

  }

});

// ============================================================
// ROUTINE
// ============================================================

const addRoutine=document.getElementById("addRoutine");

if(addRoutine) {

  addRoutine.onclick=()=>{

    if(!db.animals.length) {

      openModal(`
        <h2>Ajoute d’abord un animal</h2>

        <p class="muted">
          Crée au moins un animal avant de programmer
          une routine.
        </p>
      `);

      return;
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

          <option value="feeding">
            Nourrissage
          </option>

          <option value="watering">
            Arrosage / brumisation
          </option>

          <option value="waterChange">
            Changement de l’eau
          </option>

          <option value="cleaning">
            Nettoyage
          </option>

          <option value="note">
            Observation
          </option>

        </select>

        <label>Fréquence</label>

        <select name="frequency">

          <option value="daily">
            Tous les jours
          </option>

          <option value="weekly">
            Chaque semaine
          </option>

          <option value="interval">
            Tous les X jours
          </option>

        </select>

        <label>Intervalle</label>

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

        <label>Jours</label>

        <input
          name="days"
          placeholder="Lundi, mercredi, vendredi"
        >

        <div class="formActions">

          <button
            type="button"
            class="ghost"
            id="cancelRoutine"
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

    const cancel=document.getElementById("cancelRoutine");

    if(cancel) cancel.onclick=closeModal;
  };
}

document.addEventListener("submit",e=>{

  if(e.target.id!=="routineForm") return;

  e.preventDefault();
  e.stopPropagation();

  const f=new FormData(e.target);

  db.speciesRoutines.push({

    id:crypto.randomUUID(),

    species:
      String(f.get("species")||""),

    kind:
      String(f.get("kind")||"note"),

    frequency:
      String(f.get("frequency")||"daily"),

    interval:
      Number(f.get("interval")||1),

    time:
      String(f.get("time")||"18:00"),

    days:
      String(f.get("days")||"")

  });

  save();
  closeModal();

});

// ============================================================
// ACTIVITÉS
// ============================================================

function activity(kind,preselect=null) {

  if(!db.animals.length) {

    openModal(`

      <h2>Ajoute d’abord un animal</h2>

      <p class="muted">
        Il faut un animal pour enregistrer une activité.
      </p>

    `);

    return;
  }

  const now=
    new Date(
      Date.now()-
      new Date().getTimezoneOffset()*60000
    )
    .toISOString()
    .slice(0,16);

  const groups=db.speciesGroups;

  const animalOptions=db.animals.map(a=>`

    <option
      value="${esc(a.id)}"
      ${a.id===preselect?"selected":""}
    >
      ${esc(a.name||"Sans nom")}
      — ${esc(a.species)}
    </option>

  `).join("");

  const groupOptions=groups.map(g=>{

    const count=animalsForGroup(g).length;

    return `
      <option value="${esc(g.id)}">
        ${esc(g.name)}
        — ${count} animal${count>1?"aux":""}
      </option>
    `;

  }).join("");

  const detailField=
    kind==="waterChange"
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
      <label>Complément</label>

      <select name="value">

        <option value="">
          Aucun
        </option>

        <option value="Calcium">
          Calcium
        </option>

        <option value="Vitamine D3">
          Vitamine D3
        </option>

        <option value="Vitamine">
          Vitamine
        </option>

      </select>
    `
    :kind==="waterChange"
    ?""
    :`
      <label>Valeur</label>

      <input
        name="value"
        placeholder="${
          kind==="weight"
          ?"Ex. 482 g"
          :"Quantité, durée…"
        }"
      >
    `;

  openModal(`

    <h2>
      ${esc(labels[kind]||kind)}
    </h2>

    <form id="eventForm">

      <input
        type="hidden"
        name="kind"
        value="${esc(kind)}"
      >

      <label>Appliquer à</label>

      <select
        id="activityTargetType"
        name="targetType"
      >

        <option value="animal">
          Un animal
        </option>

        ${
          groups.length
          ?`
            <option value="group">
              Un groupe d'espèces
            </option>
          `
          :""
        }

      </select>

      <div id="animalTarget">

        <label>Animal</label>

        <select name="animalId">

          ${animalOptions}

        </select>

      </div>

      ${
        groups.length
        ?`
          <div
            id="groupTarget"
            style="display:none"
          >

            <label>Groupe d'espèces</label>

            <select name="groupId">

              ${groupOptions}

            </select>

            <p
              id="groupTargetInfo"
              class="muted"
            ></p>

          </div>
        `
        :""
      }

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
          id="cancelEvent"
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

  const targetType=
    document.getElementById("activityTargetType");

  const animalTarget=
    document.getElementById("animalTarget");

  const groupTarget=
    document.getElementById("groupTarget");

  const groupSelect=
    document.querySelector('#eventForm select[name="groupId"]');

  const groupInfo=
    document.getElementById("groupTargetInfo");

  function updateTarget() {

    const isGroup=
      targetType &&
      targetType.value==="group";

    if(animalTarget) {
      animalTarget.style.display=
        isGroup ? "none" : "block";
    }

    if(groupTarget) {
      groupTarget.style.display=
        isGroup ? "block" : "none";
    }

    if(isGroup && groupSelect && groupInfo) {

      const group=getGroup(groupSelect.value);

      if(group) {

        const count=animalsForGroup(group).length;

        groupInfo.textContent=
          `${count} animal${count>1?"aux":""} concerné${count>1?"s":""} `+
          `par cette activité.`;

      }

    }

  }

  if(targetType) {
    targetType.onchange=updateTarget;
  }

  if(groupSelect) {
    groupSelect.onchange=updateTarget;
  }

  const cancel=document.getElementById("cancelEvent");

  if(cancel) cancel.onclick=closeModal;

  updateTarget();
}

// ============================================================
// BOUTONS D'ACTIVITÉS EXISTANTS
// ============================================================

document.querySelectorAll("[data-action]").forEach(button=>{

  button.onclick=()=>{
    activity(button.dataset.action);
  };

});

// ============================================================
// ACTIVITÉ DEPUIS UN ANIMAL
// ============================================================

document.addEventListener("click",e=>{

  const button=e.target.closest(".animalAction");

  if(!button) return;

  e.preventDefault();
  e.stopPropagation();

  activity(
    "note",
    button.dataset.id
  );

});

// ============================================================
// ENREGISTRER UNE ACTIVITÉ
// ============================================================

document.addEventListener("submit",e=>{

  if(e.target.id!=="eventForm") return;

  e.preventDefault();
  e.stopPropagation();

  const f=new FormData(e.target);

  const targetType=
    String(f.get("targetType")||"animal");

  let targetAnimals=[];

  if(targetType==="group") {

    const group=getGroup(
      String(f.get("groupId")||"")
    );

    if(!group) {

      alert("Groupe introuvable.");

      return;
    }

    targetAnimals=animalsForGroup(group);

    if(!targetAnimals.length) {

      alert(
        "Aucun animal ne correspond aux espèces de ce groupe."
      );

      return;
    }

  } else {

    const a=animal(
      String(f.get("animalId")||"")
    );

    if(!a) {

      alert("Animal introuvable.");

      return;
    }

    targetAnimals=[a];
  }

  const dateValue=
    String(f.get("date")||"");

  const date=
    dateValue
    ?new Date(dateValue).toISOString()
    :new Date().toISOString();

  const kind=
    String(f.get("kind")||"note");

  const details=
    String(f.get("details")||"");

  const value=
    String(f.get("value")||"");

  const group=
    targetType==="group"
    ?getGroup(String(f.get("groupId")||""))
    :null;

  targetAnimals.forEach(a=>{

    db.events.push({

      id:crypto.randomUUID(),

      animalId:a.id,

      kind,

      details:
        targetType==="group"
        ?(
          details
          ?`${details} · Groupe : ${group.name}`
          :`Groupe : ${group.name}`
        )
        :details,

      value,

      date

    });

  });

  save();
  closeModal();

  if(targetType==="group") {

    alert(
      `${targetAnimals.length} animal${targetAnimals.length>1?"aux":""} `+
      `mis à jour.`
    );

  }

});

// ============================================================
// RAPPEL EFFECTUÉ
// ============================================================

document.addEventListener("click",e=>{

  const button=e.target.closest(".doneReminder");

  if(!button) return;

  const reminder=db.reminders.find(
    x=>x.id===button.dataset.id
  );

  if(!reminder) return;

  reminder.done=true;

  const routine=db.speciesRoutines.find(
    x=>x.id===reminder.routineId
  );

  db.events.push({

    id:crypto.randomUUID(),

    animalId:reminder.animalId,

    kind:routine?.kind||"note",

    details:"Rappel effectué",

    date:new Date().toISOString()

  });

  save();

});

// ============================================================
// SUPPRESSION ROUTINE
// ============================================================

document.addEventListener("click",e=>{

  const button=e.target.closest(".deleteRoutine");

  if(!button) return;

  const id=button.dataset.id;

  db.speciesRoutines=
    db.speciesRoutines.filter(
      x=>x.id!==id
    );

  db.reminders=
    db.reminders.filter(
      x=>x.routineId!==id
    );

  save();

});

// ============================================================
// CLICS ANIMAUX
// ============================================================

document.addEventListener("click",e=>{

  const edit=e.target.closest(".editAnimal");

  if(edit) {

    e.preventDefault();
    e.stopPropagation();

    openAnimalEditor(edit.dataset.id);

    return;
  }

  const off=e.target.closest(".deactivateAnimal");

  if(off) {
    e.preventDefault();
    e.stopPropagation();
    const a=animal(off.dataset.id);
    if(a && confirm(`Désactiver ${a.name||a.species} ?\n\nL'animal restera dans l'historique et pourra être réactivé.`)) {
      a.active=false;
      save();
    }
    return;
  }

  const on=e.target.closest(".reactivateAnimal");

  if(on) {
    e.preventDefault();
    e.stopPropagation();
    const a=animal(on.dataset.id);
    if(a) { a.active=true; save(); }
    return;
  }

  const del=e.target.closest(".deleteAnimal");

  if(del) {

    e.preventDefault();
    e.stopPropagation();

    const a=animal(del.dataset.id);

    if(!a) return;

    const ok=confirm(
      `Supprimer ${a.name||a.species} ?\n`+
      `Ses activités seront aussi supprimées.`
    );

    if(!ok) return;

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

    return;
  }

  const action=e.target.closest(".animalAction");

  if(action) return;

  const cardElement=e.target.closest(".animalCard");

  if(cardElement) {

    openAnimalEditor(
      cardElement.dataset.id
    );

  }

});

// ============================================================
// INSTALLATION PWA
// ============================================================

let deferred;

window.addEventListener(
  "beforeinstallprompt",
  e=>{

    e.preventDefault();

    deferred=e;

    const button=
      document.getElementById("installBtn");

    if(button) {
      button.classList.remove("hidden");
    }

  }
);

const installBtn=
  document.getElementById("installBtn");

if(installBtn) {

  installBtn.onclick=async()=>{

    if(!deferred) return;

    deferred.prompt();

    deferred=null;

  };

}

// ============================================================
// SERVICE WORKER
// ============================================================

// On ne désinstalle plus le service worker ici.
// Cela évite de casser le fonctionnement PWA.

if("serviceWorker" in navigator) {

  window.addEventListener(
    "load",
    ()=>{
      navigator.serviceWorker
        .register("sw.js")
        .catch(err=>{
          console.log(
            "Service worker non disponible:",
            err
          );
        });
    }
  );

}


// ============================================================
// TÂCHES : Aujourd'hui / Tableau / Calendrier / Recherche
// ============================================================
let taskView="today";
let taskDate=new Date();

function taskTargetName(t){
  if(t.targetType==="group") return getGroup(t.targetId)?.name||"Groupe supprimé";
  const a=animal(t.targetId); return a?.name||a?.species||"Animal supprimé";
}
function sameTaskDay(a,b){
  const x=new Date(a),y=new Date(b);
  return x.getFullYear()===y.getFullYear()&&x.getMonth()===y.getMonth()&&x.getDate()===y.getDate();
}
function openTaskEditor(){
  const aa=db.animals.filter(a=>a.active!==false);
  if(!aa.length){alert("Aucun animal actif.");return;}
  openModal(`
    <h2>Nouvelle tâche</h2>
    <label>Titre</label><input id="taskTitle" placeholder="Ex. Nourrir les blattes">
    <label>Type</label><select id="taskKind">${Object.entries(activityLabels).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select>
    <label>Pour</label><select id="taskTargetType"><option value="animal">Un animal</option>${db.speciesGroups.length?'<option value="group">Un groupe d’espèces</option>':''}</select>
    <div id="taskAnimalBox"><label>Animal</label><select id="taskAnimal">${aa.map(a=>`<option value="${esc(a.id)}">${esc(a.name||a.species)} — ${esc(a.species)}</option>`).join("")}</select></div>
    ${db.speciesGroups.length?`<div id="taskGroupBox" style="display:none"><label>Groupe</label><select id="taskGroup">${db.speciesGroups.map(g=>`<option value="${esc(g.id)}">${esc(g.name)}</option>`).join("")}</select></div>`:""}
    <label>Date et heure</label><input id="taskDate" type="datetime-local" value="${new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,16)}">
    <label>Détail</label><input id="taskDetail" placeholder="Détail facultatif">
    <div class="formActions"><button type="button" class="ghost" id="cancelTask">Annuler</button><button type="button" class="primary" id="saveTask">Créer</button></div>
  `);
  const tt=document.getElementById("taskTargetType"),ab=document.getElementById("taskAnimalBox"),gb=document.getElementById("taskGroupBox");
  tt.onchange=()=>{const g=tt.value==="group";ab.style.display=g?"none":"block";if(gb)gb.style.display=g?"block":"none"};
  document.getElementById("cancelTask").onclick=closeModal;
  document.getElementById("saveTask").onclick=()=>{
    const title=document.getElementById("taskTitle").value.trim()||activityLabels[document.getElementById("taskKind").value];
    const date=new Date(document.getElementById("taskDate").value);
    db.tasks.push({id:crypto.randomUUID(),title,kind:document.getElementById("taskKind").value,targetType:tt.value,targetId:tt.value==="group"?document.getElementById("taskGroup").value:document.getElementById("taskAnimal").value,date:date.toISOString(),detail:document.getElementById("taskDetail").value.trim(),status:"todo"});
    save();closeModal();renderTasksPage();
  };
}
function renderTasksPage(){
  const sec=document.getElementById("reminders"); if(!sec)return;
  const today=new Date(), start=new Date();start.setHours(0,0,0,0);
  const overdue=db.tasks.filter(t=>t.status!=="done"&&new Date(t.date)<start).length;
  const due=db.tasks.filter(t=>t.status!=="done"&&sameTaskDay(t.date,today)).length;
  const q=document.getElementById("taskSearch")?.value?.toLowerCase()||"";
  let ts=db.tasks.filter(t=>!q||`${t.title} ${taskTargetName(t)} ${t.detail||""}`.toLowerCase().includes(q));
  if(taskView==="today")ts=ts.filter(t=>sameTaskDay(t.date,taskDate));
  const item=t=>`<div class="event" style="display:flex;gap:8px;align-items:center;margin:8px 0"><button type="button" class="ghost taskDone" data-id="${esc(t.id)}">${t.status==="done"?"☑️":"⬜"}</button><div style="flex:1"><b>${esc(t.title)}</b><div class="muted">${new Date(t.date).toLocaleString("fr-FR")} · ${esc(taskTargetName(t))}</div>${t.detail?`<div>${esc(t.detail)}</div>`:""}</div><button type="button" class="ghost taskDelete" data-id="${esc(t.id)}">🗑️</button></div>`;
  let body="";
  if(taskView==="board") body=`<div style="display:flex;gap:10px;overflow:auto">${[["todo","À faire"],["progress","En cours"],["done","Terminé"]].map(([st,lab])=>`<div class="card" style="min-width:260px"><h3>${lab} (${ts.filter(t=>t.status===st).length})</h3>${ts.filter(t=>t.status===st).map(item).join("")||"<p class='muted'>Aucune tâche ici.</p>"}</div>`).join("")}</div>`;
  else if(taskView==="calendar") body=`<div style="display:flex;justify-content:space-between;align-items:center"><button class="ghost taskPrev">‹</button><h3>${taskDate.toLocaleDateString("fr-FR",{month:"long",year:"numeric"})}</h3><button class="ghost taskNext">›</button></div><div style="display:flex;gap:6px;overflow:auto;margin-bottom:12px">${[-3,-2,-1,0,1,2,3].map(n=>{const d=new Date(taskDate);d.setDate(d.getDate()+n);return `<button class="ghost taskDay" data-date="${d.toISOString()}">${d.toLocaleDateString("fr-FR",{weekday:"short",day:"numeric"})}</button>`}).join("")}</div>${ts.filter(t=>sameTaskDay(t.date,taskDate)).map(item).join("")||"<p class='muted'>Rien de prévu.</p>"}`;
  else body=ts.sort((a,b)=>new Date(a.date)-new Date(b.date)).map(item).join("")||"<p class='muted'>Aucune tâche.</p>";
  sec.innerHTML=`<div class="sectionHead"><div><span class="eyebrow">ORGANISATION</span><h2>Tâches & rappels</h2><p class="muted">${db.tasks.filter(t=>t.status!=="done").length} en cours · ${db.tasks.filter(t=>t.status==="done").length} terminées</p></div><button class="primary" id="newTask">+ Nouvelle</button></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px"><div class="card"><b>⚠️ En retard</b><h2>${overdue}</h2></div><div class="card"><b>🕒 À faire aujourd’hui</b><h2>${due}</h2></div></div><div style="display:flex;gap:6px;overflow:auto;margin-bottom:10px"><button class="ghost taskTab" data-view="today">☷ Aujourd’hui</button><button class="ghost taskTab" data-view="board">▥ Tableau</button><button class="ghost taskTab" data-view="calendar">▣ Calendrier</button><button class="ghost taskTab" data-view="all">Tous</button></div><input id="taskSearch" placeholder="🔎 Rechercher des tâches, animaux..." value="${esc(q)}"><div style="margin-top:12px">${body}</div>`;
  document.getElementById("newTask").onclick=openTaskEditor;
  document.querySelectorAll(".taskTab").forEach(b=>b.onclick=()=>{taskView=b.dataset.view;renderTasksPage()});
  document.getElementById("taskSearch").oninput=renderTasksPage;
}
function renderTasksHook(){renderTasksPage()}

document.addEventListener("click",e=>{
  const done=e.target.closest(".taskDone");
  if(done){const t=db.tasks.find(x=>x.id===done.dataset.id);if(t){t.status=t.status==="done"?"todo":"done";save();renderTasksPage()}return}
  const del=e.target.closest(".taskDelete");
  if(del){db.tasks=db.tasks.filter(x=>x.id!==del.dataset.id);save();renderTasksPage();return}
  const day=e.target.closest(".taskDay");
  if(day){taskDate=new Date(day.dataset.date);renderTasksPage();return}
  if(e.target.closest(".taskPrev")){taskDate.setDate(taskDate.getDate()-1);renderTasksPage();return}
  if(e.target.closest(".taskNext")){taskDate.setDate(taskDate.getDate()+1);renderTasksPage();return}
});

// ============================================================
// DÉMARRAGE
// ============================================================

render();
