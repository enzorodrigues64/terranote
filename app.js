// TerraNote v15
// Gestion complète des animaux, activités et rappels

const KEY = "terranote_v14";

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
  waterChange: "Changement de l’eau",
  weight: "Pesée",
  note: "Note",
  cleaning: "Nettoyage",
  treatment: "Traitement",
  molt: "Mue"
};

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

const INITIAL_ANIMALS = SPECIES_CATALOG.map((s,i)=>({
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
    '{"animals":[],"events":[],"speciesRoutines":[],"reminders":[]}'
  );
} catch(e) {
  db = {
    animals:[],
    events:[],
    speciesRoutines:[],
    reminders:[]
  };
}

if(!Array.isArray(db.animals)) db.animals=[];
if(!Array.isArray(db.events)) db.events=[];
if(!Array.isArray(db.speciesRoutines)) db.speciesRoutines=[];
if(!Array.isArray(db.reminders)) db.reminders=[];

// Conversion des anciens groupes
db.animals.forEach(a=>{
  if(a.type==="insect" || a.type==="invertebrate"){
    a.type="arthropod";
  }
});

// Si aucune donnée n'existe, charger les 75 animaux
if(db.animals.length===0){
  db.animals = INITIAL_ANIMALS.map(a=>({...a}));
  persist();
}

// --------------------------------------------------
// OUTILS
// --------------------------------------------------

function persist(){
  try{
    localStorage.setItem(KEY,JSON.stringify(db));
    return true;
  }catch(error){
    console.error("Erreur localStorage :",error);
    alert("Impossible d’enregistrer les données sur cet appareil.");
    return false;
  }
}

function esc(value){
  return String(value ?? "").replace(/[&<>"']/g,char=>{
    return {
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#39;"
    }[char];
  });
}

function getAnimal(id){
  return db.animals.find(
    a=>String(a.id)===String(id)
  );
}

function newId(){
  if(window.crypto && crypto.randomUUID){
    return crypto.randomUUID();
  }
  return "animal_"+Date.now()+"_"+Math.random().toString(36).slice(2);
}

function closeModal(){
  const modal=document.getElementById("modal");
  if(modal){
    modal.classList.add("hidden");
  }
}

function openModal(content){
  const modal=document.getElementById("modal");
  const box=document.getElementById("modalContent");

  if(!modal || !box){
    console.error("Modal introuvable.");
    return;
  }

  box.innerHTML=content;
  modal.classList.remove("hidden");
}

function empty(title,text){
  return `
    <div class="card">
      <b>${esc(title)}</b>
      <p class="muted">${esc(text)}</p>
    </div>
  `;
}

// --------------------------------------------------
// NAVIGATION
// --------------------------------------------------

document.querySelectorAll(".nav").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".nav")
      .forEach(b=>b.classList.remove("active"));

    button.classList.add("active");

    document.querySelectorAll(".page")
      .forEach(page=>page.classList.remove("active"));

    const page=document.getElementById(
      button.dataset.page
    );

    if(page){
      page.classList.add("active");
    }
  });
});

// --------------------------------------------------
// MODAL
// --------------------------------------------------

const closeButton=document.getElementById("closeModal");

if(closeButton){
  closeButton.addEventListener("click",closeModal);
}

const modal=document.getElementById("modal");

if(modal){
  modal.addEventListener("click",event=>{
    if(event.target===modal){
      closeModal();
    }
  });
}

// --------------------------------------------------
// CARTES ANIMAUX
// --------------------------------------------------

function animalCard(a){

  const birth=a.birthDate
    ? `🎂 ${new Intl.DateTimeFormat("fr-FR").format(
        new Date(a.birthDate+"T00:00:00")
      )}`
    : "";

  const location=a.location
    ? `📍 ${esc(a.location)}`
    : "";

  const origin=a.origin
    ? `📄 ${esc(a.origin)}`
    : "";

  const meta=[
    birth,
    location,
    origin
  ].filter(Boolean).join(" · ");

  return `
    <div
      class="card animalCard"
      data-id="${esc(a.id)}"
      style="cursor:pointer"
    >

      <div class="animal">

        <div class="avatar">
          ${icons[a.type] || "🐾"}
        </div>

        <div>
          <b>${esc(a.name || "Sans nom")}</b>

          <div class="muted">
            ${esc(a.species || "")}
            ·
            ${esc(typeLabels[a.type] || "Arthropodes")}
          </div>
        </div>

      </div>

      ${
        meta
          ? `<p class="muted">${meta}</p>`
          : ""
      }

      ${
        a.notes
          ? `<p class="muted">📝 ${esc(a.notes)}</p>`
          : ""
      }

      <div
        style="
          display:flex;
          gap:8px;
          margin-top:10px;
          flex-wrap:wrap;
        "
      >

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
          Activité
        </button>

        <button
          type="button"
          class="ghost deleteAnimal"
          data-id="${esc(a.id)}"
        >
          🗑️
        </button>

      </div>

    </div>
  `;
}

// --------------------------------------------------
// AFFICHAGE
// --------------------------------------------------

function render(){

  const title=document.getElementById("todayTitle");

  if(title){
    title.textContent=
      new Intl.DateTimeFormat("fr-FR",{
        weekday:"long",
        day:"numeric",
        month:"long"
      }).format(new Date());
  }

  const today=new Date().toDateString();

  const todayEvents=db.events.filter(event=>{
    return new Date(event.date).toDateString()===today;
  });

  const summary=document.getElementById("summary");

  if(summary){
    summary.textContent=
      `${db.animals.length} animaux suivis · `+
      `${todayEvents.length} activité(s) aujourd’hui`;
  }

  const cards=db.animals
    .map(animalCard)
    .join("");

  const animalGrid=document.getElementById("animalGrid");
  const allAnimals=document.getElementById("allAnimals");

  if(animalGrid){
    animalGrid.innerHTML=
      cards ||
      empty(
        "Aucun animal",
        "Ajoute ton premier animal pour commencer."
      );
  }

  if(allAnimals){
    allAnimals.innerHTML=
      cards ||
      empty(
        "Aucun animal",
        "Ajoute ton premier animal pour commencer."
      );
  }

  renderEvents();
  renderRoutines();
  renderReminders();
}

// --------------------------------------------------
// HISTORIQUE
// --------------------------------------------------

function renderEvents(){

  const sorted=[...db.events].sort(
    (a,b)=>new Date(b.date)-new Date(a.date)
  );

  const html=sorted.length
    ? sorted.map(event=>{
        const a=getAnimal(event.animalId);

        const date=new Date(event.date);

        return `
          <div class="event">

            <div>

              <b>
                ${esc(labels[event.kind] || event.kind)}
                ·
                ${esc(a?.name || a?.species || "Animal")}
              </b>

              <span class="muted">
                ${esc(event.details || "")}
                ${event.value
                  ? ` · ${esc(event.value)}`
                  : ""
                }
              </span>

            </div>

            <span class="muted">
              ${new Intl.DateTimeFormat("fr-FR",{
                day:"2-digit",
                month:"2-digit",
                hour:"2-digit",
                minute:"2-digit"
              }).format(date)}
            </span>

          </div>
        `;
      }).join("")
    : empty(
        "Pas encore d’activité",
        "Tes activités apparaîtront ici."
      );

  const recent=document.getElementById("recent");
  const history=document.getElementById("historyList");

  if(recent){
    recent.innerHTML=
      sorted.slice(0,6).map(event=>{
        const a=getAnimal(event.animalId);

        return `
          <div class="event">

            <div>
              <b>
                ${esc(labels[event.kind] || event.kind)}
                ·
                ${esc(a?.name || a?.species || "Animal")}
              </b>

              <span class="muted">
                ${esc(event.details || "")}
              </span>
            </div>

            <span class="muted">
              ${new Intl.DateTimeFormat("fr-FR",{
                day:"2-digit",
                month:"2-digit",
                hour:"2-digit",
                minute:"2-digit"
              }).format(new Date(event.date))}
            </span>

          </div>
        `;
      }).join("") ||
      empty(
        "Pas encore d’activité",
        "Tes activités apparaîtront ici."
      );
  }

  if(history){
    history.innerHTML=html;
  }
}

// --------------------------------------------------
// FICHE ANIMAL
// --------------------------------------------------

function openAnimalEditor(id){

  const a=getAnimal(id);

  if(!a){
    alert("Animal introuvable.");
    return;
  }

  const speciesOptions=SPECIES_CATALOG
    .map(s=>`
      <option value="${esc(s.name)}"></option>
    `)
    .join("");

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
        value="${esc(a.name || "")}"
        placeholder="Ex. Kiwi"
      >

      <label>Espèce</label>

      <input
        name="species"
        value="${esc(a.species || "")}"
        list="editSpeciesList"
        required
        autocomplete="off"
      >

      <datalist id="editSpeciesList">
        ${speciesOptions}
      </datalist>

      <label>Groupe</label>

      <select name="type">

        <option
          value="reptile"
          ${a.type==="reptile" ? "selected" : ""}
        >
          Reptiles
        </option>

        <option
          value="amphibian"
          ${a.type==="amphibian" ? "selected" : ""}
        >
          Amphibiens
        </option>

        <option
          value="gastropod"
          ${a.type==="gastropod" ? "selected" : ""}
        >
          Gastéropodes
        </option>

        <option
          value="arthropod"
          ${
            a.type==="arthropod" ||
            a.type==="insect" ||
            a.type==="invertebrate"
              ? "selected"
              : ""
          }
        >
          Arthropodes
        </option>

      </select>

      <label>Date de naissance</label>

      <input
        name="birthDate"
        type="date"
        value="${esc(a.birthDate || "")}"
      >

      <label>Localisation</label>

      <input
        name="location"
        value="${esc(a.location || "")}"
        placeholder="Ex. Terrarium 3"
      >

      <label>Certificat d’origine</label>

      <select name="origin">

        <option
          value="NC"
          ${a.origin==="NC" || !a.origin ? "selected" : ""}
        >
          NC
        </option>

        <option
          value="WC"
          ${a.origin==="WC" ? "selected" : ""}
        >
          WC
        </option>

      </select>

      <label>Notes</label>

      <textarea
        name="notes"
        placeholder="Informations supplémentaires..."
      >${esc(a.notes || "")}</textarea>

      <div class="formActions">

        <button
          type="button"
          class="ghost"
          id="cancelEditAnimal"
        >
          Annuler
        </button>

        <button
          type="button"
          class="primary"
          id="saveAnimalButton"
        >
          Enregistrer
        </button>

      </div>

    </form>
  `);

  // ------------------------------------------------
  // SAUVEGARDE DIRECTE DE LA FICHE
  // ------------------------------------------------

  const saveButton=
    document.getElementById("saveAnimalButton");

  if(!saveButton){
    console.error("Bouton saveAnimalButton introuvable.");
    return;
  }

  saveButton.addEventListener("click",()=>{

    const form=
      document.getElementById("editAnimalForm");

    if(!form){
      alert("Formulaire introuvable.");
      return;
    }

    const nameInput=
      form.querySelector('[name="name"]');

    const speciesInput=
      form.querySelector('[name="species"]');

    const typeInput=
      form.querySelector('[name="type"]');

    const birthInput=
      form.querySelector('[name="birthDate"]');

    const locationInput=
      form.querySelector('[name="location"]');

    const originInput=
      form.querySelector('[name="origin"]');

    const notesInput=
      form.querySelector('[name="notes"]');

    const species=
      speciesInput
        ? speciesInput.value.trim()
        : "";

    if(!species){
      alert("L’espèce est obligatoire.");
      return;
    }

    // Modification directe de l'objet existant
    a.name=
      nameInput
        ? nameInput.value.trim()
        : "";

    a.species=species;

    a.type=
      typeInput
        ? typeInput.value
        : "arthropod";

    a.birthDate=
      birthInput
        ? birthInput.value
        : "";

    a.location=
      locationInput
        ? locationInput.value.trim()
        : "";

    a.origin=
      originInput
        ? originInput.value
        : "NC";

    a.notes=
      notesInput
        ? notesInput.value.trim()
        : "";

    // Ecriture immédiate dans localStorage
    try{

      const data=JSON.stringify(db);

      localStorage.setItem(KEY,data);

      // Vérification réelle de l'écriture
      const verification=
        localStorage.getItem(KEY);

      if(!verification){
        throw new Error(
          "localStorage vide après sauvegarde"
        );
      }

      const check=JSON.parse(verification);

      const saved=check.animals.find(
        x=>String(x.id)===String(a.id)
      );

      if(!saved){
        throw new Error(
          "Animal absent après sauvegarde"
        );
      }

      if(saved.location!==a.location){
        throw new Error(
          "Localisation non sauvegardée"
        );
      }

    }catch(error){

      console.error(
        "ERREUR SAUVEGARDE ANIMAL:",
        error
      );

      alert(
        "La sauvegarde a échoué.\n\n"+
        error.message
      );

      return;
    }

    // Mise à jour immédiate de l'écran
    render();

    closeModal();

  });

  const cancelButton=
    document.getElementById("cancelEditAnimal");

  if(cancelButton){
    cancelButton.addEventListener(
      "click",
      closeModal
    );
  }
}

// --------------------------------------------------
// CLIC SUR UN ANIMAL
// --------------------------------------------------

document.addEventListener("click",event=>{

  const editButton=
    event.target.closest(".editAnimal");

  if(editButton){

    event.preventDefault();
    event.stopPropagation();

    openAnimalEditor(
      editButton.dataset.id
    );

    return;
  }

  const card=
    event.target.closest(".animalCard");

  if(card){

    const ignored=
      event.target.closest(
        ".animalAction,.deleteAnimal"
      );

    if(!ignored){

      openAnimalEditor(
        card.dataset.id
      );

    }
  }

});

// --------------------------------------------------
// SUPPRESSION ANIMAL
// --------------------------------------------------

document.addEventListener("click",event=>{

  const button=
    event.target.closest(".deleteAnimal");

  if(!button)return;

  event.preventDefault();
  event.stopPropagation();

  const a=getAnimal(button.dataset.id);

  if(!a)return;

  const ok=confirm(
    `Supprimer ${a.name || a.species} ?\n\n`+
    "Ses activités seront également supprimées."
  );

  if(!ok)return;

  db.animals=db.animals.filter(
    x=>String(x.id)!==String(a.id)
  );

  db.events=db.events.filter(
    x=>String(x.animalId)!==String(a.id)
  );

  db.reminders=db.reminders.filter(
    x=>String(x.animalId)!==String(a.id)
  );

  persist();
  render();
});

// --------------------------------------------------
// AJOUT D'UN ANIMAL
// --------------------------------------------------

const addAnimalButton=
  document.getElementById("addAnimal");

if(addAnimalButton){

  addAnimalButton.addEventListener("click",()=>{

    openModal(`

      <h2>Nouvel animal</h2>

      <form id="newAnimalForm">

        <label>Nom / identifiant</label>

        <input
          name="name"
          placeholder="Ex. Kiwi"
        >

        <label>Espèce</label>

        <input
          name="species"
          id="newSpecies"
          list="newSpeciesList"
          required
          placeholder="Ex. Pogona vitticeps"
        >

        <datalist id="newSpeciesList">

          ${SPECIES_CATALOG.map(s=>`
            <option value="${esc(s.name)}"></option>
          `).join("")}

        </datalist>

        <label>Groupe</label>

        <select name="type" id="newAnimalType">

          <option value="reptile">
            Reptiles
          </option>

          <option value="amphibian">
            Amphibiens
          </option>

          <option value="gastropod">
            Gastéropodes
          </option>

          <option value="arthropod" selected>
            Arthropodes
          </option>

        </select>

        <label>Date de naissance</label>

        <input
          name="birthDate"
          type="date"
        >

        <label>Localisation</label>

        <input
          name="location"
          placeholder="Ex. Terrarium 3"
        >

        <label>Certificat d’origine</label>

        <select name="origin">

          <option value="NC">
            NC
          </option>

          <option value="WC">
            WC
          </option>

        </select>

        <label>Notes</label>

        <textarea
          name="notes"
          placeholder="Informations supplémentaires..."
        ></textarea>

        <div class="formActions">

          <button
            type="button"
            class="ghost"
            id="cancelNewAnimal"
          >
            Annuler
          </button>

          <button
            type="button"
            class="primary"
            id="createAnimalButton"
          >
            Créer
          </button>

        </div>

      </form>
    `);

    const createButton=
      document.getElementById(
        "createAnimalButton"
      );

    if(createButton){

      createButton.addEventListener("click",()=>{

        const form=
          document.getElementById("newAnimalForm");

        if(!form)return;

        const name=
          form.querySelector('[name="name"]').value.trim();

        const species=
          form.querySelector('[name="species"]').value.trim();

        if(!species){
          alert("L’espèce est obligatoire.");
          return;
        }

        const animal={
          id:newId(),
          name:name,
          species:species,
          type:form.querySelector('[name="type"]').value,
          birthDate:form.querySelector('[name="birthDate"]').value,
          location:form.querySelector('[name="location"]').value.trim(),
          origin:form.querySelector('[name="origin"]').value,
          notes:form.querySelector('[name="notes"]').value.trim()
        };

        db.animals.push(animal);

        if(!persist()){
          return;
        }

        render();
        closeModal();

      });

    }

    const cancel=
      document.getElementById("cancelNewAnimal");

    if(cancel){
      cancel.addEventListener(
        "click",
        closeModal
      );
    }

  });
}

// --------------------------------------------------
// AUTO-GROUPEMENT PAR ESPÈCE
// --------------------------------------------------

document.addEventListener("input",event=>{

  if(event.target.id!=="newSpecies")return;

  const value=
    event.target.value.trim().toLowerCase();

  const match=
    SPECIES_CATALOG.find(
      s=>s.name.toLowerCase()===value
    );

  if(match){

    const type=
      document.getElementById(
        "newAnimalType"
      );

    if(type){
      type.value=match.type;
    }

  }

});

// --------------------------------------------------
// ACTIVITÉS
// --------------------------------------------------

function openActivity(kind,animalId=null){

  if(!db.animals.length){

    openModal(`
      <h2>Aucun animal</h2>
      <p class="muted">
        Ajoute d’abord un animal.
      </p>
    `);

    return;
  }

  const options=db.animals.map(a=>`
    <option
      value="${esc(a.id)}"
      ${
        String(a.id)===String(animalId)
          ? "selected"
          : ""
      }
    >
      ${esc(a.name || "Sans nom")}
      — ${esc(a.species)}
    </option>
  `).join("");

  const now=new Date();

  const localDate=
    new Date(
      now.getTime()-
      now.getTimezoneOffset()*60000
    )
    .toISOString()
    .slice(0,16);

  openModal(`

    <h2>${esc(labels[kind] || "Activité")}</h2>

    <form id="activityForm">

      <label>Animal</label>

      <select name="animalId">
        ${options}
      </select>

      <label>Détail</label>

      <input
        name="details"
        placeholder="Ex. 3 grillons"
      >

      <label>Valeur</label>

      <input
        name="value"
        placeholder="Ex. 480 g"
      >

      <label>Date et heure</label>

      <input
        name="date"
        type="datetime-local"
        value="${localDate}"
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

    </form>
  `);

  const saveActivity=
    document.getElementById("saveActivity");

  if(saveActivity){

    saveActivity.addEventListener("click",()=>{

      const form=
        document.getElementById("activityForm");

      if(!form)return;

      const dateValue=
        form.querySelector('[name="date"]').value;

      let date;

      if(dateValue){
        date=new Date(dateValue).toISOString();
      }else{
        date=new Date().toISOString();
      }

      db.events.push({
        id:newId(),
        animalId:
          form.querySelector('[name="animalId"]').value,
        kind:kind,
        details:
          form.querySelector('[name="details"]').value.trim(),
        value:
          form.querySelector('[name="value"]').value.trim(),
        date:date
      });

      persist();
      render();
      closeModal();

    });

  }

  const cancel=
    document.getElementById("cancelActivity");

  if(cancel){
    cancel.addEventListener(
      "click",
      closeModal
    );
  }
}

// Boutons rapides
document.querySelectorAll("[data-action]").forEach(button=>{

  button.addEventListener("click",()=>{
    openActivity(
      button.dataset.action
    );
  });

});

// Bouton activité sur carte
document.addEventListener("click",event=>{

  const button=
    event.target.closest(".animalAction");

  if(!button)return;

  event.preventDefault();
  event.stopPropagation();

  openActivity(
    "note",
    button.dataset.id
  );

});

// --------------------------------------------------
// ROUTINES
// --------------------------------------------------

function routineText(r){

  if(r.frequency==="daily"){
    return `Tous les jours à ${r.time}`;
  }

  if(r.frequency==="weekly"){
    return `Chaque semaine à ${r.time}`;
  }

  return `Tous les ${r.interval || 1} jours à ${r.time}`;
}

function renderRoutines(){

  const list=
    document.getElementById("routineList");

  if(!list)return;

  if(!db.speciesRoutines.length){

    list.innerHTML=empty(
      "Aucune routine",
      "Crée une routine pour programmer tes rappels."
    );

    return;
  }

  list.innerHTML=
    db.speciesRoutines.map(r=>`

      <div class="event">

        <div>

          <b>
            ${esc(labels[r.kind] || r.kind)}
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

const addRoutine=
  document.getElementById("addRoutine");

if(addRoutine){

  addRoutine.addEventListener("click",()=>{

    const species=[
      ...new Set(
        db.animals.map(a=>a.species)
      )
    ];

    if(!species.length){

      openModal(`
        <h2>Aucun animal</h2>
        <p class="muted">
          Ajoute d’abord un animal.
        </p>
      `);

      return;
    }

    openModal(`

      <h2>Nouvelle routine</h2>

      <form id="routineForm">

        <label>Espèce</label>

        <select name="species">

          ${species.map(s=>`
            <option value="${esc(s)}">
              ${esc(s)}
            </option>
          `).join("")}

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

        <div class="formActions">

          <button
            type="button"
            class="ghost"
            id="cancelRoutine"
          >
            Annuler
          </button>

          <button
            type="button"
            class="primary"
            id="saveRoutine"
          >
            Créer
          </button>

        </div>

      </form>
    `);

    const saveRoutine=
      document.getElementById("saveRoutine");

    if(saveRoutine){

      saveRoutine.addEventListener("click",()=>{

        const form=
          document.getElementById("routineForm");

        if(!form)return;

        db.speciesRoutines.push({

          id:newId(),

          species:
            form.querySelector('[name="species"]').value,

          kind:
            form.querySelector('[name="kind"]').value,

          frequency:
            form.querySelector('[name="frequency"]').value,

          interval:
            Number(
              form.querySelector('[name="interval"]').value
            ) || 1,

          time:
            form.querySelector('[name="time"]').value ||
            "18:00"

        });

        persist();
        render();
        closeModal();

      });

    }

    const cancel=
      document.getElementById("cancelRoutine");

    if(cancel){
      cancel.addEventListener(
        "click",
        closeModal
      );
    }

  });

}

// Suppression routine
document.addEventListener("click",event=>{

  const button=
    event.target.closest(".deleteRoutine");

  if(!button)return;

  const id=button.dataset.id;

  db.speciesRoutines=
    db.speciesRoutines.filter(
      r=>String(r.id)!==String(id)
    );

  db.reminders=
    db.reminders.filter(
      r=>String(r.routineId)!==String(id)
    );

  persist();
  render();

});

// --------------------------------------------------
// RAPPELS
// --------------------------------------------------

function renderReminders(){

  const container=
    document.getElementById("todayReminders");

  if(!container)return;

  const now=Date.now();

  const active=db.reminders.filter(r=>{
    return !r.done &&
      new Date(r.due).getTime()<=now;
  });

  if(!active.length){

    container.innerHTML=empty(
      "Rien à faire",
      "Tous les rappels sont à jour."
    );

    return;
  }

  container.innerHTML=
    active.map(r=>{

      const a=getAnimal(r.animalId);

      const routine=
        db.speciesRoutines.find(
          x=>x.id===r.routineId
        );

      return `

        <div class="event">

          <div>

            <b>
              ⏰
              ${esc(
                labels[routine?.kind] ||
                routine?.kind ||
                "Rappel"
              )}
              ·
              ${esc(a?.name || a?.species || "")}
            </b>

            <span class="muted">
              ${new Date(r.due).toLocaleTimeString(
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
            data-id="${esc(r.id)}"
          >
            ✓ Fait
          </button>

        </div>
      `;

    }).join("");
}

// --------------------------------------------------
// INSTALLATION PWA
// --------------------------------------------------

let deferredPrompt=null;

window.addEventListener(
  "beforeinstallprompt",
  event=>{

    event.preventDefault();

    deferredPrompt=event;

    const button=
      document.getElementById("installBtn");

    if(button){
      button.classList.remove("hidden");
    }

  }
);

const installButton=
  document.getElementById("installBtn");

if(installButton){

  installButton.addEventListener(
    "click",
    async()=>{

      if(!deferredPrompt)return;

      deferredPrompt.prompt();

      try{
        await deferredPrompt.userChoice;
      }catch(e){}

      deferredPrompt=null;

      installButton.classList.add("hidden");

    }
  );

}

// --------------------------------------------------
// DEMANDE DE RECHARGE DE L'ANCIEN SERVICE WORKER
// --------------------------------------------------

// On désactive les anciens service workers pour éviter
// qu'une ancienne version de TerraNote bloque app.js.
if("serviceWorker" in navigator){

  navigator.serviceWorker
    .getRegistrations()
    .then(registrations=>{
      registrations.forEach(registration=>{
        registration.unregister().catch(()=>{});
      });
    })
    .catch(()=>{});

}

// --------------------------------------------------
// DÉMARRAGE
// --------------------------------------------------

render();

console.log(
  "TerraNote v15 chargé —",
  db.animals.length,
  "animaux"
);
