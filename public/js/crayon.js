// import tiny-webaudio library for synth

function randint(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
}

var abacabindex = 0
var abacab = ["70", "30", "60", "40", "50", "90", "99", "99", "100", "30", "60", "90"]

var nextabacab = function() {
  abacabindex++
  if (abacabindex > abacab.length-1) {
    abacabindex = 0
  }
  return abacab[abacabindex]
}
var abacabmode = false
var everabacab = false
var toggleabacab = function() {
  if (!everabacab) {
    abacab = ["70", "30", "60", "40", "50", "90", "99", "99", "100", "30", "60", "90"]
    everabacab = true
  }
  else {
    var arre = []
    var arretar = randint(3,15)
    for (let i=0;i<arretar;i++) {
      arre.push(randint(30,100))
    }
    abacab = arre
  }
  var firstitemifexists = document.querySelectorAll("a.box.new-block:not(.person)")[0]  
  if (firstitemifexists) {
    abacabmode = !abacabmode
    firstitemifexists.classList.toggle("toggle")
  }
  
}
var playing = false
function phase() {
  document.body.insertAdjacentHTML(`afterbegin`, `
    <style>
      body.dim a {
        filter: brightness(30%)
      }
      body.dim #filters {
        filter:brightness(30%)!important
      }
      body.xdim a, body.xdim #filters {
        filter: brightness(0%)
      }
      body.xdim div#filters {
        filter: brightness(0%)!important;
      }
      * {
        user-select:none!important
      }
      a {
        color:black
      }
      a:active {
        color:black
      }
      a.lit {
        animation: .4s roggle infinite linear!important
      }
      .jit {
        animation: .4s roggle infinite linear!important
      }
      .jjit {
        animation: .8s rroggle infinite linear!important
      }
      a.hit {
        filter:brightness(100%) hue-rotate(180deg)!important
      }
      a.toggle {
        animation: .1s toggle infinite linear
      }
      a.lit.toggle {
        animation:none
      }
      a.paintbrush {
        background:lime
      }
      a.sloppy {
        background:cyan;filter:brightness(70%)!important
      }
      a.painting {
        background:lime;filter:brightness(100%)!important
      }
      a.moggle {
        animation: .4s moggle infinite linear;
      }
      a.foggle {
        animation: .4s moggle infinite linear;
      }

      div.filter {
        pointer-events:none!important
      }
      a.lit.person:nth-of-type(6) {
        filter:hue-rotate(180deg)
      }
      @keyframes toggle {
        0% {filter:brightness(100%)}
        50% {filter:brightness(100%)}
        51% {filter:brightness(50%)}
        100% {filter:brightness(50%)}
      }    
      @keyframes moggle {
        0% {filter:brightness(100%) hue-rotate(0deg)}
        50% {filter:brightness(100%) hue-rotate(0deg)}
        51% {filter:brightness(50%) hue-rotate(180deg)}
        100% {filter:brightness(50%) hue-rotate(180deg)}
      }    
      @keyframes roggle {
        0% {filter:brightness(100%)}
        50% {filter:brightness(100%)}
        51% {filter:brightness(20%)}
        100% {filter:brightness(20%)}
      }    
      @keyframes rroggle {
        0% {filter:brightness(100%)}
        10% {filter:brightness(100%)}
        15% {filter:brightness(20%)}
        100% {filter:brightness(20%)}
      }    
      
    </style>
  `)
    document.querySelectorAll("nav a.box")[0].style.backgroundColor = "lime"
    setTimeout(()=>{
      document.querySelectorAll("nav a.box")[0].classList.add("jjit")      
    },1000)
    document.querySelectorAll("nav a.box")[0].addEventListener("click", ()=>{
      if (!playing) {
        document.querySelectorAll("nav a.box")[0].classList.remove("jjit")
        document.querySelectorAll("nav a.box")[0].style.backgroundColor = "#090"
        playing = true
        play()
      }
      else if (playing) {
        document.querySelectorAll("nav a.box")[0].classList.add("jjit")
        document.querySelectorAll("nav a.box")[0].style.backgroundColor = "lime"
        
        playing = false
        play()
      }
    })
    document.body.classList.add("grim")
    document.body.classList.add("dim")
    document.body.parentElement.style.background = "#414141"      

    var persons = document.querySelectorAll("a.person")
    function randhsl() {
      return `hsl(${randint(0,360)}, ${randint(30,100)}%, ${randint(45,75)}%)`
    }
    for (let i=0;i<persons.length;i++) {
      persons[i].style.backgroundColor = randhsl()
      persons[i].dataset.note = i
    }
    var npersons = document.querySelectorAll("a")
    for (let i=0;i<npersons.length;i++) {
      npersons[i].href = "#"
    }  
  // gossips easter egg
  var eversynthvar = false
  var noteoffset = 0
  var persons = document.querySelectorAll('a.box.person')
  var personslength = persons.length
  var activenotes = new Set()
  var ndropsplash = false
  var ddropsplash = false
  var ndropsplashed = false
  var notepersonstate = -1 + noteoffset
  var entropymode = false
  var basemute = false
  var everhihatready = false
  var everhihat = false
  var everkick = false
  var beam = 1
  var afront = false
  var beamer = false
  function beams() {
    beam += beam
    if (beam > 32) {
      beam = 1
    }
  }
  document.addEventListener("click", (e) => {
    var target = e.target

    if (target.tagName.toLowerCase() === "a" && target.classList.contains("person")) {
      
      var numbernote = Number(target.dataset.note)
      if (numbernote === personslength - 1) {
        synthslopntoggle()
        target.classList.toggle("moggle")
        return
      }
      if (numbernote === personslength - 2) {
        synthvariationtoggle()
        target.classList.toggle("foggle")
        return
      }
      
      if (numbernote === 0 && activenotes.has(1)) {
        synthsloptoggle()
      }
      if (!target.classList.contains("stas") && numbernote === 0) {
        target.classList.add("stas")
      }
      else if (target.classList.contains("stas") && numbernote === 0) {
        target.classList.remove("stas")
        everkick = true
        kicktracktoggle()
      }
      if (!target.classList.contains("stas") && numbernote === 1) {
        target.classList.add("stas")
      }
      else if (target.classList.contains("stas") && numbernote === 1) {
        target.classList.remove("stas")
        everhihat = true
        hihattracktoggle()
      }
      if (target.classList.contains("toggle")) {
        if (numbernote === notepersonstate) {
          if (!everkick) {
            everkick = true
            kicktracktoggle()
          }
          else {
            kicktrack = true
          }
          
        }      
        if (numbernote === notepersonstate && everhihatready) {
          everhihatready = false
          everhihat = true
          hihattracktoggle()
        }      
        activenotes.delete(numbernote)
        
      }
      else {
        activenotes.add(numbernote)
      }
      if (activenotes.size === personslength - 2) {
        activenotes.clear()
        dropsplashed()
        target.classList.toggle("toggle")
      }
      if (activenotes.size > 5 && !eversynthvar) {
        eversynthvar = true
        document.querySelectorAll(".person")[document.querySelectorAll(".person").length - 2].classList.add("foggle")
        synthvariationtoggle()
      }
      if (activenotes.size > 6) {
        sloppymode = 2
      }
      else if (activenotes.size > 3) {
        sloppymode = 1
      }
      else {
        sloppymode = false
      }
      target.classList.toggle("toggle")
    }

    
    var gfirst = document.querySelectorAll(".box.small.new-block:not(.person)")[4]
    if (gfirst) {
      gfirst.addEventListener("click", increasetempo)
    }
    var gsecond = document.querySelectorAll(".box.small.new-block:not(.person)")[5]
    if (gsecond) {
      gsecond.addEventListener("click", decreasetempo)
    }
  })

  var lastrealnote = {
    a:60,
    b:5
  }

  var topnote = 2
  var bottomnote = 5
  var sloppymode = false
  var cyclesn = 0
  var cyclenote = () => {
    cyclesn++
    if (cyclesn > 80) {
      cyclesn = 0
    }
  }
  function randfloat(min, max) {
    return Math.random() * (max - min) + min
  }

  var startTempo = 90
  var globalTempo = startTempo
  var noteTempo = globalTempo;			
  var drumTempo = globalTempo * 2;			
  var synthvariation = false
  var synthslop = false
  var synthslopn = false
  var synthslopq = false
  var slopnotemax = 0
  function resettempo() {
    globalTempo = startTempo
  }
  function decreasetempo() {
    if (globalTempo < 10) {
      return
    }
    globalTempo -= 2
    
  }
  function increasetempo() {
    if (globalTempo > 170) {
      return
    }
    globalTempo += 2
  }
  var kicktrack = false
  var hihattrack = false
  function kicktracktoggle() {
    if (!everkick) {
      return
    }
    kicktrack = !kicktrack
  }
  function hihattracktoggle() {
    if (!everhihat) {
      return
    }
    if (hihattrack === false) {
      hihattrack = 1
    }
    else if (hihattrack === 1) {
      hihattrack = 2
    }
    else if (hihattrack === 2) {
      hihattrack = 3
    }
    else if (hihattrack === 3) {
      hihattrack = false
    }
  }
  function synthsloptoggle() {
    if (synthslop === false) {
      synthslop = 1
    }
    else if (synthslop === 1) {
      synthslop = 2
    }
    else if (synthslop === 2) {
      noteTempo = globalTempo
      synthslop = false
    }


  }
  function synthslopntoggle() {
    if (synthslopn === false) {
      synthslopn = 1
    }
    else if (synthslopn === 1) {
      synthslopn = false
    }

  }
  function synthslopqtoggle() {
    if (synthslopq === false) {
      synthslopq = 1
    }
    else if (synthslopq === 1) {
      synthslopq = false
    }

  }

  function synthvariationtoggle() {
    eversynthvar = true
    synthvariation = !synthvariation
  }
  function sloppymodetoggle() {
    if (sloppymode === false) {
      sloppymode = 2
    }
    else if (sloppymode = 2) {
      sloppymode = false
    }

  }


  ( function(window){
  "use strict";

  function WebAudioTinySynthCore(target) {
    Object.assign(target,{
      properties:{
        masterVol:  {type:Number, value:0.5, observer:"setMasterVol"},
        reverbLev:  {type:Number, value:0.3, observer:"setReverbLev"},
        quality:    {type:Number, value:1, observer:"setQuality"},
        debug:      {type:Number, value:0},
        src:        {type:String, value:null, observer:"loadMIDIfromSrc"},
        loop:       {type:Number, value:0},
        internalcontext: {type:Number, value:1},
        tsmode:     {type:Number, value:0},
        voices:     {type:Number, value:64},
        useReverb:  {type:Number, value:1},
      },
      program:[
  // 1-8 : Piano
        {name:"Acoustic Grand Piano"},    {name:"Bright Acoustic Piano"},
        {name:"Electric Grand Piano"},    {name:"Honky-tonk Piano"},
        {name:"Electric Piano 1"},        {name:"Electric Piano 2"},
        {name:"Harpsichord"},             {name:"Clavi"},
  /* 9-16 : Chromatic Perc*/
        {name:"Celesta"},                 {name:"Glockenspiel"},
        {name:"Music Box"},               {name:"Vibraphone"},
        {name:"Marimba"},                 {name:"Xylophone"},
        {name:"Tubular Bells"},           {name:"Dulcimer"},
  /* 17-24 : Organ */
        {name:"Drawbar Organ"},           {name:"Percussive Organ"},
        {name:"Rock Organ"},              {name:"Church Organ"},
        {name:"Reed Organ"},              {name:"Accordion"},
        {name:"Harmonica"},               {name:"Tango Accordion"},
  /* 25-32 : Guitar */
        {name:"Acoustic Guitar (nylon)"}, {name:"Acoustic Guitar (steel)"},
        {name:"Electric Guitar (jazz)"},  {name:"Electric Guitar (clean)"},
        {name:"Electric Guitar (muted)"}, {name:"Overdriven Guitar"},
        {name:"Distortion Guitar"},       {name:"Guitar harmonics"},
  /* 33-40 : Bass */
        {name:"Acoustic Bass"},           {name:"Electric Bass (finger)"},
        {name:"Electric Bass (pick)"},    {name:"Fretless Bass"},
        {name:"Slap Bass 1"},             {name:"Slap Bass 2"},
        {name:"Synth Bass 1"},            {name:"Synth Bass 2"},
  /* 41-48 : Strings */
        {name:"Violin"},                  {name:"Viola"},
        {name:"Cello"},                   {name:"Contrabass"},
        {name:"Tremolo Strings"},         {name:"Pizzicato Strings"},
        {name:"Orchestral Harp"},         {name:"Timpani"},
  /* 49-56 : Ensamble */
        {name:"String Ensemble 1"},       {name:"String Ensemble 2"},
        {name:"SynthStrings 1"},          {name:"SynthStrings 2"},
        {name:"Choir Aahs"},              {name:"Voice Oohs"},
        {name:"Synth Voice"},             {name:"Orchestra Hit"},
  /* 57-64 : Brass */
        {name:"Trumpet"},                 {name:"Trombone"},
        {name:"Tuba"},                    {name:"Muted Trumpet"},
        {name:"French Horn"},             {name:"Brass Section"},
        {name:"SynthBrass 1"},            {name:"SynthBrass 2"},
  /* 65-72 : Reed */
        {name:"Soprano Sax"},             {name:"Alto Sax"},
        {name:"Tenor Sax"},               {name:"Baritone Sax"},
        {name:"Oboe"},                    {name:"English Horn"},
        {name:"Bassoon"},                 {name:"Clarinet"},
  /* 73-80 : Pipe */
        {name:"Piccolo"},                 {name:"Flute"},
        {name:"Recorder"},                {name:"Pan Flute"},
        {name:"Blown Bottle"},            {name:"Shakuhachi"},
        {name:"Whistle"},                 {name:"Ocarina"},
  /* 81-88 : SynthLead */
        {name:"Lead 1 (square)"},         {name:"Lead 2 (sawtooth)"},
        {name:"Lead 3 (calliope)"},       {name:"Lead 4 (chiff)"},
        {name:"Lead 5 (charang)"},        {name:"Lead 6 (voice)"},
        {name:"Lead 7 (fifths)"},         {name:"Lead 8 (bass + lead)"},
  /* 89-96 : SynthPad */
        {name:"Pad 1 (new age)"},         {name:"Pad 2 (warm)"},
        {name:"Pad 3 (polysynth)"},       {name:"Pad 4 (choir)"},
        {name:"Pad 5 (bowed)"},           {name:"Pad 6 (metallic)"},
        {name:"Pad 7 (halo)"},            {name:"Pad 8 (sweep)"},
  /* 97-104 : FX */
        {name:"FX 1 (rain)"},             {name:"FX 2 (soundtrack)"},
        {name:"FX 3 (crystal)"},          {name:"FX 4 (atmosphere)"},
        {name:"FX 5 (brightness)"},       {name:"FX 6 (goblins)"},
        {name:"FX 7 (echoes)"},           {name:"FX 8 (sci-fi)"},
  /* 105-112 : Ethnic */
        {name:"Sitar"},                   {name:"Banjo"},
        {name:"Shamisen"},                {name:"Koto"},
        {name:"Kalimba"},                 {name:"Bag pipe"},
        {name:"Fiddle"},                  {name:"Shanai"},
  /* 113-120 : Percussive */
        {name:"Tinkle Bell"},             {name:"Agogo"},
        {name:"Steel Drums"},             {name:"Woodblock"},
        {name:"Taiko Drum"},              {name:"Melodic Tom"},
        {name:"Synth Drum"},              {name:"Reverse Cymbal"},
  /* 121-128 : SE */
        {name:"Guitar Fret Noise"},       {name:"Breath Noise"},
        {name:"Seashore"},                {name:"Bird Tweet"},
        {name:"Telephone Ring"},          {name:"Helicopter"},
        {name:"Applause"},                {name:"Gunshot"},
      ],
      drummap:[
  // 35
        {name:"Acoustic Bass Drum"},  {name:"Bass Drum 1"},      {name:"Side Stick"},     {name:"Acoustic Snare"},
        {name:"Hand Clap"},           {name:"Electric Snare"},   {name:"Low Floor Tom"},  {name:"Closed Hi Hat"},
        {name:"High Floor Tom"},      {name:"Pedal Hi-Hat"},     {name:"Low Tom"},        {name:"Open Hi-Hat"},
        {name:"Low-Mid Tom"},         {name:"Hi-Mid Tom"},       {name:"Crash Cymbal 1"}, {name:"High Tom"},
        {name:"Ride Cymbal 1"},       {name:"Chinese Cymbal"},   {name:"Ride Bell"},      {name:"Tambourine"},
        {name:"Splash Cymbal"},       {name:"Cowbell"},          {name:"Crash Cymbal 2"}, {name:"Vibraslap"},
        {name:"Ride Cymbal 2"},       {name:"Hi Bongo"},         {name:"Low Bongo"},      {name:"Mute Hi Conga"},
        {name:"Open Hi Conga"},       {name:"Low Conga"},        {name:"High Timbale"},   {name:"Low Timbale"},
        {name:"High Agogo"},          {name:"Low Agogo"},        {name:"Cabasa"},         {name:"Maracas"},
        {name:"Short Whistle"},       {name:"Long Whistle"},     {name:"Short Guiro"},    {name:"Long Guiro"},
        {name:"Claves"},              {name:"Hi Wood Block"},    {name:"Low Wood Block"}, {name:"Mute Cuica"},
        {name:"Open Cuica"},          {name:"Mute Triangle"},    {name:"Open Triangle"},
      ],
      program1:[
        // 1-8 : Piano
        [{w:"sine",v:.4,d:0.7,r:0.1,},{w:"triangle",v:3,d:0.7,s:0.1,g:1,k:-1.2}],
        [{w:"triangle",v:0.4,d:0.7,r:0.1,},{w:"triangle",v:4,t:3,d:0.4,s:0.1,g:1,k:-1}],
        [{w:"sine",d:0.7,r:0.1,},{w:"triangle",v:4,f:2,d:0.5,s:0.5,g:1,k:-1}],
        [{w:"sine",d:0.7,v:0.2,},{w:"triangle",v:4,t:3,f:2,d:0.3,g:1,k:-1,s:0.5,}],
        [{w:"sine",v:0.35,d:0.7,},{w:"sine",v:3,t:7,f:1,d:1,s:1,g:1,k:-.7}],
        [{w:"sine",v:0.35,d:0.7,},{w:"sine",v:8,t:7,f:1,d:0.5,s:1,g:1,k:-.7}],
        [{w:"sawtooth",v:0.34,d:2,},{w:"sine",v:8,f:0.1,d:2,s:1,r:2,g:1,}],
        [{w:"triangle",v:0.34,d:1.5,},{w:"square",v:6,f:0.1,d:1.5,s:0.5,r:2,g:1,}],
        /* 9-16 : Chromatic Perc*/
        [{w:"sine",v:0.3,d:0.3,r:0.3,},{w:"sine",v:7,t:11,d:0.03,g:1,}],
        [{w:"sine",v:0.3,d:0.3,r:0.3,},{w:"sine",v:11,t:6,d:0.2,s:0.4,g:1,}],
        [{w:"sine",v:0.2,d:0.3,r:0.3,},{w:"sine",v:11,t:5,d:0.1,s:0.4,g:1,}],
        [{w:"sine",v:0.2,d:0.6,r:0.6,},{w:"triangle",v:11,t:5,f:1,s:0.5,g:1,}],
        [{w:"sine",v:0.3,d:0.2,r:0.2,},{w:"sine",v:6,t:5,d:0.02,g:1,}],
        [{w:"sine",v:0.3,d:0.2,r:0.2,},{w:"sine",v:7,t:11,d:0.03,g:1,}],
        [{w:"sine",v:0.2,d:1,r:1,},{w:"sine",v:11,t:3.5,d:1,r:1,g:1,}],
        [{w:"triangle",v:0.2,d:0.5,r:0.2,},{w:"sine",v:6,t:2.5,d:0.2,s:0.1,r:0.2,g:1,}],
        /* 17-24 : Organ */
        [{w:"w9999",v:0.22,s:0.9,},{w:"w9999",v:0.22,t:2,f:2,s:0.9,}],
        [{w:"w9999",v:0.2,s:1,},{w:"sine",v:11,t:6,f:2,s:0.1,g:1,h:0.006,r:0.002,d:0.002,},{w:"w9999",v:0.2,t:2,f:1,h:0,s:1,}],
        [{w:"w9999",v:0.2,d:0.1,s:0.9,},{w:"w9999",v:0.25,t:4,f:2,s:0.5,}],
        [{w:"w9999",v:0.3,s:0.9,},{w:"w9999",v:0.2,t:8,f:2,s:0.9,}],
        [{w:"sine",v:0.2,d:0.05,s:1,},{w:"sine",v:6,t:3,f:1,d:0.05,s:1,g:1,}],
        [{w:"triangle",v:0.2,d:0.05,s:0.8,},{w:"square",v:7,t:3,f:1,d:0.05,s:1.5,g:1,}],
        [{w:"square",v:0.2,d:0.2,s:0.5,},{w:"square",v:1,d:0.03,s:2,g:1,}],
        [{w:"square",v:0.2,d:0.1,s:0.8,},{w:"square",v:1,d:0.1,s:2,g:1,}],
        /* 25-32 : Guitar */
        [{w:"sine",v:0.3,d:0.5,f:1,},{w:"triangle",v:5,t:3,f:-1,d:1,s:0.1,g:1,}],
        [{w:"sine",v:0.4,d:0.6,f:1,},{w:"triangle",v:12,t:3,d:0.6,s:0.1,g:1,f:-1,}],
        [{w:"triangle",v:0.3,d:1,f:1,},{w:"triangle",v:6,f:-1,d:0.4,s:0.5,g:1,t:3,}],
        [{w:"sine",v:0.3,d:1,f:-1,},{w:"triangle",v:11,f:1,d:0.4,s:0.5,g:1,t:3,}],
        [{w:"sine",v:0.4,d:0.1,r:0.01},{w:"sine",v:7,g:1,}],
        [{w:"triangle",v:0.4,d:1,f:1,},{w:"square",v:4,f:-1,d:1,s:0.7,g:1,}],//[{w:"triangle",v:0.35,d:1,f:1,},{w:"square",v:7,f:-1,d:0.3,s:0.5,g:1,}],
        [{w:"triangle",v:0.35,d:1,f:1,},{w:"square",v:7,f:-1,d:0.3,s:0.5,g:1,}],//[{w:"triangle",v:0.4,d:1,f:1,},{w:"square",v:4,f:-1,d:1,s:0.7,g:1,}],//[{w:"triangle",v:0.4,d:1,},{w:"square",v:4,f:2,d:1,s:0.7,g:1,}],
        [{w:"sine",v:0.2,t:1.5,h:0.2,d:0.6,},{w:"sine",v:11,t:5,f:2,d:1,s:0.5,g:1,}],
        /* 33-40 : Bass */
        [{w:"sine",d:0.3,},{w:"sine",v:4,t:3,d:1,s:1,g:1,}],
        [{w:"sine",d:0.3,},{w:"sine",v:4,t:3,d:1,s:1,g:1,}],
        [{w:"w9999",d:0.3,v:0.7,s:0.5,},{w:"sawtooth",v:1.2,d:0.02,s:0.5,g:1,h:0,r:0.02,}],
        [{w:"sine",d:0.3,},{w:"sine",v:4,t:3,d:1,s:1,g:1,}],
        [{w:"triangle",v:0.3,t:2,d:1,},{w:"triangle",v:15,t:2.5,d:0.04,s:0.1,g:1,}],
        [{w:"triangle",v:0.3,t:2,d:1,},{w:"triangle",v:15,t:2.5,d:0.04,s:0.1,g:1,}],
        [{w:"triangle",d:0.7,},{w:"square",v:0.4,t:0.5,f:1,d:0.2,s:10,g:1,}],
        [{w:"triangle",d:0.7,},{w:"square",v:0.4,t:0.5,f:1,d:0.2,s:10,g:1,}],
        /* 41-48 : Strings */
        [{w:"sawtooth",v:0.4,d:11,},{w:"sine",v:5,d:11,s:0.2,g:1,}],
        [{w:"sawtooth",v:0.4,d:11,},{w:"sine",v:5,d:11,s:0.2,g:1,}],
        [{w:"sawtooth",v:0.4,d:11,},{w:"sine",v:5,t:0.5,d:11,s:0.2,g:1,}],
        [{w:"sawtooth",v:0.4,d:11,},{w:"sine",v:5,t:0.5,d:11,s:0.2,g:1,}],
        [{w:"sine",v:0.4,d:11,},{w:"sine",v:6,f:2.5,d:0.05,s:1.1,g:1,}],
        [{w:"sine",v:0.3,d:0.1,r:0.1,},{w:"square",v:4,t:3,d:1,s:0.2,g:1,}],
        [{w:"sine",v:0.3,d:0.5,r:0.5,},{w:"sine",v:7,t:2,f:2,d:1,r:1,g:1,}],
        [{w:"triangle",v:0.6,h:0.03,d:0.3,r:0.3,t:0.5,},{w:"n0",v:8,t:1.5,d:0.08,r:0.08,g:1,}],
        /* 49-56 : Ensamble */
        [{w:"sawtooth",v:0.3,s:0.5,},{w:"sawtooth",v:0.2,t:2,f:2,d:1,s:2,}],
        [{w:"sawtooth",v:0.3,f:-2,s:0.5,},{w:"sawtooth",v:0.2,t:2,f:2,d:1,s:2,}],
        [{w:"sawtooth",v:0.2,s:1,},{w:"sawtooth",v:0.2,t:2,f:2,a:1,d:1,s:1,}],
        [{w:"sawtooth",v:0.2,s:1,},{w:"sawtooth",v:0.2,f:2,a:0.02,d:1,s:1,}],
        [{w:"triangle",v:0.3,s:1,},{w:"sine",v:3,t:5,f:1,d:1,s:1,g:1,}],
        [{w:"sine",v:0.4,s:0.9,},{w:"sine",v:1,t:2,f:3,d:0.03,s:0.2,g:1,}],
        [{w:"triangle",v:0.6,s:0.5,},{w:"sine",v:1,f:0.8,d:0.2,s:0.2,g:1,}],
        [{w:"square",v:0.15,d:0.2,r:0.2,t:0.5,h:0.03,},{w:"square",v:4,f:0.5,d:0.2,r:11,g:1,h:0.02,},{w:"square",v:0.15,t:4,f:1,d:0.15,r:0.15,h:0.03,},{g:3,w:"square",v:4,f:-0.5,h:0.02,d:0.15,r:11,}],
        /* 57-64 : Brass */
        [{w:"square",v:0.2,d:1,s:0.6,r:0.04,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
        [{w:"square",v:0.2,d:1,s:0.5,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
        [{w:"square",v:0.2,d:1,s:0.4,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
        [{w:"square",v:0.15,s:1,},{w:"sine",v:2,d:0.1,g:1,}],
        [{w:"square",v:0.2,d:1,s:0.5,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
        [{w:"square",v:0.2,d:1,s:0.6,r:0.08,},{w:"sine",v:1,f:0.2,d:0.1,s:4,g:1,}],
        [{w:"square",v:0.2,d:0.5,s:0.7,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
        [{w:"square",v:0.2,d:1,s:0.5,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
        /* 65-72 : Reed */
        [{w:"square",v:0.2,d:2,s:0.6,},{w:"sine",v:2,d:1,g:1,}],
        [{w:"square",v:0.2,d:2,s:0.6,},{w:"sine",v:2,d:1,g:1,}],
        [{w:"square",v:0.2,d:1,s:0.6,},{w:"sine",v:2,d:1,g:1,}],
        [{w:"square",v:0.2,d:1,s:0.6,},{w:"sine",v:2,d:1,g:1,}],
        [{w:"sine",v:0.4,d:0.7,s:0.5,},{w:"square",v:5,t:2,d:0.2,s:0.5,g:1,}],
        [{w:"sine",v:0.3,d:0.2,s:0.8,},{w:"sawtooth",v:6,f:0.1,d:0.1,s:0.3,g:1,}],
        [{w:"sine",v:0.3,d:0.2,s:0.4,},{w:"square",v:7,f:0.2,d:1,s:0.1,g:1,}],
        [{w:"square",v:0.2,d:0.1,s:0.8,},{w:"square",v:4,d:0.1,s:1.1,g:1,}],
        /* 73-80 : Pipe */
        [{w:"sine",a:0.02,d:2,},{w:"sine",v:6,t:2,d:0.04,g:1,}],
        [{w:"sine",v:0.7,d:0.4,s:0.4,},{w:"sine",v:4,t:2,f:0.2,d:0.4,g:1,}],
        [{w:"sine",v:0.7,d:0.4,s:0.6,},{w:"sine",v:3,t:2,d:0,s:1,g:1,}],
        [{w:"sine",v:0.4,a:0.06,d:0.3,s:0.3,},{w:"sine",v:7,t:2,d:0.2,s:0.2,g:1,}],
        [{w:"sine",a:0.02,d:0.3,s:0.3,},{w:"sawtooth",v:3,t:2,d:0.3,g:1,}],
        [{w:"sine",v:0.4,d:2,s:0.1,},{w:"sawtooth",v:8,t:2,f:1,d:0.5,g:1,}],
        [{w:"sine",v:0.7,d:0.5,s:0.3,},{w:"sine",v:0.003,t:0,f:4,d:0.1,s:0.002,g:1,}],
        [{w:"sine",v:0.7,d:2,},{w:"sine",v:1,t:2,f:1,d:0.02,g:1,}],
        /* 81-88 : SynthLead */
        [{w:"square",v:0.3,d:1,s:0.5,},{w:"square",v:1,f:0.2,d:1,s:0.5,g:1,}],
        [{w:"sawtooth",v:0.3,d:2,s:0.5,},{w:"square",v:2,f:0.1,s:0.5,g:1,}],
        [{w:"triangle",v:0.5,d:2,s:0.6,},{w:"sine",v:4,t:2,g:1,}],
        [{w:"triangle",v:0.3,d:2,s:0.3,},{w:"sine",v:22,t:2,f:1,d:0.03,s:0.2,g:1,}],
        [{w:"sawtooth",v:0.3,d:1,s:0.5,},{w:"sine",v:11,t:11,a:0.2,d:0.05,s:0.3,g:1,}],
        [{w:"sine",v:0.3,a:0.06,d:1,s:0.5,},{w:"sine",v:7,f:1,d:1,s:0.2,g:1,}],
        [{w:"sawtooth",v:0.3,d:0.7,s:0.3,r:0.2,},{w:"sawtooth",v:0.3,t:0.75,d:0.7,s:0.3,r:0.2,}],
        [{w:"triangle",v:0.3,d:0.7,s:0.5,},{w:"square",v:5,t:0.5,d:0.7,s:0.5,g:1,}],
        /* 89-96 : SynthPad */
        [{w:"triangle",v:0.3,d:0.3,s:0.3,r:0.3,},{w:"square",v:3,t:4,f:1,d:0.1,s:1,g:1,},{w:"triangle",v:0.08,t:0.5,h:0,d:0.1,s:0.5,r:0.1,b:0,c:0,}],
        [{w:"sine",v:0.3,a:0.05,d:1,s:0.7,r:0.3,},{w:"sine",v:2,f:1,d:0.3,s:1,g:1,}],
        [{w:"square",v:0.3,a:0.03,d:0.5,s:0.3,r:0.1,},{w:"square",v:4,f:1,a:0.03,d:0.1,g:1,}],
        [{w:"triangle",v:0.3,a:0.08,d:1,s:0.3,r:0.1,},{w:"square",v:2,f:1,d:0.3,s:0.3,g:1,t:4,a:0.08,}],
        [{w:"sine",v:0.3,d:1,s:0.3,r:0.1,},{w:"sine",v:0.1,t:2.001,f:1,d:1,s:50,g:1,}],
        [{w:"triangle",v:0.3,a:0.03,d:0.7,s:0.3,r:0.2,},{w:"sine",v:12,t:7,f:1,d:0.5,s:1.7,g:1,}],
        [{w:"sine",v:0.3,a:0.05,d:1,s:0.3,r:0.1,},{w:"sawtooth",v:22,t:6,d:0.06,s:0.3,g:1,}],
        [{w:"triangle",v:0.3,a:0.05,d:11,r:0.3,},{w:"triangle",v:1,d:1,s:8,g:1,}],
        /* 97-104 : FX */
        [{w:"sawtooth",v:0.3,d:4,s:0.8,r:0.1,},{w:"square",v:1,t:2,f:8,a:1,d:1,s:1,r:0.1,g:1,}],
        [{w:"triangle",v:0.3,d:1,s:0.5,t:0.8,a:0.2,p:1.25,q:0.2,},{w:"sawtooth",v:0.2,a:0.2,d:0.3,s:1,t:1.2,p:1.25,q:0.2,}],
        [{w:"sine",v:0.3,d:1,s:0.3,},{w:"square",v:22,t:11,d:0.5,s:0.1,g:1,}],
        [{w:"sawtooth",v:0.3,a:0.04,d:1,s:0.8,r:0.1,},{w:"square",v:1,t:0.5,d:1,s:2,g:1,}],
        [{w:"triangle",v:0.3,d:1,s:0.3,},{w:"sine",v:22,t:6,d:0.6,s:0.05,g:1,}],
        [{w:"sine",v:0.6,a:0.1,d:0.05,s:0.4,},{w:"sine",v:5,t:5,f:1,d:0.05,s:0.3,g:1,}],
        [{w:"sine",a:0.1,d:0.05,s:0.4,v:0.8,},{w:"sine",v:5,t:5,f:1,d:0.05,s:0.3,g:1,}],
        [{w:"square",v:0.3,a:0.1,d:0.1,s:0.4,},{w:"square",v:1,f:1,d:0.3,s:0.1,g:1,}],
        /* 105-112 : Ethnic */
        [{w:"sawtooth",v:0.3,d:0.5,r:0.5,},{w:"sawtooth",v:11,t:5,d:0.05,g:1,}],
        [{w:"square",v:0.3,d:0.2,r:0.2,},{w:"square",v:7,t:3,d:0.05,g:1,}],
        [{w:"triangle",d:0.2,r:0.2,},{w:"square",v:9,t:3,d:0.1,r:0.1,g:1,}],
        [{w:"triangle",d:0.3,r:0.3,},{w:"square",v:6,t:3,d:1,r:1,g:1,}],
        [{w:"triangle",v:0.4,d:0.2,r:0.2,},{w:"square",v:22,t:12,d:0.1,r:0.1,g:1,}],
        [{w:"sine",v:0.25,a:0.02,d:0.05,s:0.8,},{w:"square",v:1,t:2,d:0.03,s:11,g:1,}],
        [{w:"sine",v:0.3,a:0.05,d:11,},{w:"square",v:7,t:3,f:1,s:0.7,g:1,}],
        [{w:"square",v:0.3,a:0.05,d:0.1,s:0.8,},{w:"square",v:4,d:0.1,s:1.1,g:1,}],
        /* 113-120 : Percussive */
        [{w:"sine",v:0.4,d:0.3,r:0.3,},{w:"sine",v:7,t:9,d:0.1,r:0.1,g:1,}],
        [{w:"sine",v:0.7,d:0.1,r:0.1,},{w:"sine",v:22,t:7,d:0.05,g:1,}],
        [{w:"sine",v:0.6,d:0.15,r:0.15,},{w:"square",v:11,t:3.2,d:0.1,r:0.1,g:1,}],
        [{w:"sine",v:0.5,d:0.07,r:0.07,},{w:"square",v:11,t:7,r:0.01,g:1,}],
        [{w:"triangle",v:0.7,t:0.5,d:0.2,r:0.2,p:0.95,},{w:"n0",v:9,g:1,d:0.2,r:0.2,}],
        [{w:"sine",v:0.7,d:0.1,r:0.1,p:0.9,},{w:"square",v:14,t:2,d:0.005,r:0.005,g:1,}],
        [{w:"square",d:0.15,r:0.15,p:0.5,},{w:"square",v:4,t:5,d:0.001,r:0.001,g:1,}],
        [{w:"n1",v:0.3,a:1,s:1,d:0.15,r:0,t:0.5,}],
        /* 121-128 : SE */
        [{w:"sine",t:12.5,d:0,r:0,p:0.5,v:0.3,h:0.2,q:0.5,},{g:1,w:"sine",v:1,t:2,d:0,r:0,s:1,},{g:1,w:"n0",v:0.2,t:2,a:0.6,h:0,d:0.1,r:0.1,b:0,c:0,}],
        [{w:"n0",v:0.2,a:0.05,h:0.02,d:0.02,r:0.02,}],
        [{w:"n0",v:0.4,a:1,d:1,t:0.25,}],
        [{w:"sine",v:0.3,a:0.1,d:1,s:0.5,},{w:"sine",v:4,t:0,f:1.5,d:1,s:1,r:0.1,g:1,},{g:1,w:"sine",v:4,t:0,f:2,a:0.6,h:0,d:0.1,s:1,r:0.1,b:0,c:0,}],
        [{w:"square",v:0.3,t:0.25,d:11,s:1,},{w:"square",v:12,t:0,f:8,d:1,s:1,r:11,g:1,}],
        [{w:"n0",v:0.4,t:0.5,d:11,s:1,r:0.5,},{w:"square",v:1,t:0,f:14,d:1,s:1,r:11,g:1,}],
        [{w:"sine",t:0,f:1221,d:1,r:0.25,s:1,},{g:1,w:"n0",v:3,t:0.5,d:1,s:1,r:1,}],
        [{w:"sine",d:0.4,r:0.4,p:0.1,t:2.5,v:1,},{w:"n0",v:12,t:2,d:1,r:1,g:1,}],
      ],
      program0:[
  // 1-8 : Piano
        [{w:"triangle",v:.5,d:.7}],                   [{w:"triangle",v:.5,d:.7}],
        [{w:"triangle",v:.5,d:.7}],                   [{w:"triangle",v:.5,d:.7}],
        [{w:"triangle",v:.5,d:.7}],                   [{w:"triangle",v:.5,d:.7}],
        [{w:"sawtooth",v:.3,d:.7}],                   [{w:"sawtooth",v:.3,d:.7}],
  /* 9-16 : Chromatic Perc*/
        [{w:"sine",v:.5,d:.3,r:.3}],                  [{w:"triangle",v:.5,d:.3,r:.3}],
        [{w:"square",v:.2,d:.3,r:.3}],                [{w:"square",v:.2,d:.3,r:.3}],
        [{w:"sine",v:.5,d:.1,r:.1}],                  [{w:"sine",v:.5,d:.1,r:.1}],
        [{w:"square",v:.2,d:1,r:1}],                  [{w:"sawtooth",v:.3,d:.7,r:.7}],
  /* 17-24 : Organ */
        [{w:"sine",v:0.5,a:0.01,s:1}],                [{w:"sine",v:0.7,d:0.02,s:0.7}],
        [{w:"square",v:.2,s:1}],                      [{w:"triangle",v:.5,a:.01,s:1}],
        [{w:"square",v:.2,a:.02,s:1}],                [{w:"square",v:0.2,a:0.02,s:1}],
        [{w:"square",v:0.2,a:0.02,s:1}],              [{w:"square",v:.2,a:.05,s:1}],
  /* 25-32 : Guitar */
        [{w:"triangle",v:.5,d:.5}],                   [{w:"square",v:.2,d:.6}],
        [{w:"square",v:.2,d:.6}],                     [{w:"triangle",v:.8,d:.6}],
        [{w:"triangle",v:.4,d:.05}],                  [{w:"square",v:.2,d:1}],
        [{w:"square",v:.2,d:1}],                      [{w:"sine",v:.4,d:.6}],
  /* 33-40 : Bass */
        [{w:"triangle",v:.7,d:.4}],                   [{w:"triangle",v:.7,d:.7}],
        [{w:"triangle",v:.7,d:.7}],                   [{w:"triangle",v:.7,d:.7}],
        [{w:"square",v:.3,d:.2}],                     [{w:"square",v:.3,d:.2}],
        [{w:"square",v:.3,d:.1,s:.2}],                [{w:"sawtooth",v:.4,d:.1,s:.2}],
  /* 41-48 : Strings */
        [{w:"sawtooth",v:.2,a:.02,s:1}],              [{w:"sawtooth",v:.2,s:1}],
        [{w:"sawtooth",v:.2,a:.02,s:1}],              [{w:"sawtooth",v:.2,s:1}],
        [{w:"sawtooth",v:.2,a:.02,s:1}],              [{w:"sawtooth",v:.3,d:.1}],
        [{w:"sawtooth",v:.3,d:.5,r:.5}],              [{w:"triangle",v:.6,d:.1,r:.1,h:0.03,p:0.8}],
  /* 49-56 : Ensamble */
        [{w:"sawtooth",v:.2,a:.02,s:1}],              [{w:"sawtooth",v:.2,s:1}],
        [{w:"sawtooth",v:.2,a:.02,s:1}],              [{w:"sawtooth",v:.2,s:1}],
        [{w:"triangle",v:.3,a:.03,s:1}],              [{w:"sine",v:.3,a:.03,s:1}],
        [{w:"triangle",v:.3,a:.05,s:1}],              [{w:"sawtooth",v:.5,a:.01,d:.1}],
  /* 57-64 : Brass */
        [{w:"square",v:.3,d:.2,s:.6}],          [{w:"square",v:.3,d:.2,s:.6}],
        [{w:"square",v:.3,d:.2,s:.6}],          [{w:"square",v:0.2,d:0.01,s:1}],
        [{w:"square",v:.3,s:1}],                [{w:"square",v:.3,s:.7}],
        [{w:"square",v:.3,s:.7}],                     [{w:"square",v:.3,s:.7}],
  /* 65-72 : Reed */
        [{w:"square",v:.3,d:2}],                [{w:"square",v:.3,a:.02,d:2}],
        [{w:"square",v:.3,d:2}],                [{w:"square",v:.3,a:.04,d:2}],
        [{w:"square",v:.3,d:2}],                [{w:"square",v:.3,a:.05,d:2}],
        [{w:"square",v:.3,d:2}],                [{w:"square",v:.3,a:.03,d:2}],
  /* 73-80 : Pipe */
        [{w:"sine",v:.7,d:2}],                  [{w:"sine",v:.7,d:2}],
        [{w:"sine",v:.7,d:2}],                  [{w:"sine",v:.7,d:2}],
        [{w:"sine",v:.7,d:2}],                  [{w:"sine",v:.7,d:2}],
        [{w:"sine",v:.7,d:2}],                  [{w:"sine",v:.7,d:2}],
  /* 81-88 : SynthLead */
        [{w:"square",v:.3,s:.7}],                     [{w:"sawtooth",v:.4,s:.7}],
        [{w:"triangle",v:.5,s:.7}],                   [{w:"sawtooth",v:.4,s:.7}],
        [{w:"sawtooth",v:.4,d:12}],                   [{w:"sine",v:.4,a:.06,d:12}],
        [{w:"sawtooth",v:.4,d:12}],                   [{w:"sawtooth",v:.4,d:12}],
  /* 89-96 : SynthPad */
        [{w:"sawtooth",v:.3,d:12}],                   [{w:"triangle",v:.5,d:12}],
        [{w:"square",v:.3,d:12}],                     [{w:"triangle",v:.5,a:.08,d:11}],
        [{w:"sawtooth",v:.5,a:.05,d:11}],             [{w:"sawtooth",v:.5,d:11}],
        [{w:"triangle",v:.5,d:11}],                   [{w:"triangle",v:.5,d:11}],
  /* 97-104 : FX */
        [{w:"triangle",v:.5,d:11}],                   [{w:"triangle",v:.5,d:11}],
        [{w:"square",v:.3,d:11}],                     [{w:"sawtooth",v:0.5,a:0.04,d:11}],
        [{w:"sawtooth",v:.5,d:11}],                   [{w:"triangle",v:.5,a:.8,d:11}],
        [{w:"triangle",v:.5,d:11}],                   [{w:"square",v:.3,d:11}],
  /* 105-112 : Ethnic */
        [{w:"sawtooth",v:.3,d:1,r:1}],                [{w:"sawtooth",v:.5,d:.3}],
        [{w:"sawtooth",v:.5,d:.3,r:.3}],              [{w:"sawtooth",v:.5,d:.3,r:.3}],
        [{w:"square",v:.3,d:.2,r:.2}],                [{w:"square",v:.3,a:.02,d:2}],
        [{w:"sawtooth",v:.2,a:.02,d:.7}],             [{w:"triangle",v:.5,d:1}],
  /* 113-120 : Percussive */
        [{w:"sawtooth",v:.3,d:.3,r:.3}],              [{w:"sine",v:.8,d:.1,r:.1}],
        [{w:"square",v:.2,d:.1,r:.1,p:1.05}],         [{w:"sine",v:.8,d:.05,r:.05}],
        [{w:"triangle",v:0.5,d:0.1,r:0.1,p:0.96}],    [{w:"triangle",v:0.5,d:0.1,r:0.1,p:0.97}],
        [{w:"square",v:.3,d:.1,r:.1,}],               [{w:"n1",v:0.3,a:1,s:1,d:0.15,r:0,t:0.5,}],
  /* 121-128 : SE */
        [{w:"triangle",v:0.5,d:0.03,t:0,f:1332,r:0.001,p:1.1}],
        [{w:"n0",v:0.2,t:0.1,d:0.02,a:0.05,h:0.02,r:0.02}],
        [{w:"n0",v:0.4,a:1,d:1,t:0.25,}],
        [{w:"sine",v:0.3,a:0.8,d:1,t:0,f:1832}],
        [{w:"triangle",d:0.5,t:0,f:444,s:1,}],
        [{w:"n0",v:0.4,d:1,t:0,f:22,s:1,}],
        [{w:"n0",v:0.5,a:0.2,d:11,t:0,f:44}],
        [{w:"n0",v:0.5,t:0.25,d:0.4,r:0.4}],
      ],
      drummap1:[
  /*35*/  [{w:"triangle",t:0,f:70,v:1,d:0.05,h:0.03,p:0.9,q:0.1,},{w:"n0",g:1,t:6,v:17,r:0.01,h:0,p:0,}],
          [{w:"triangle",t:0,f:88,v:1,d:0.05,h:0.03,p:0.5,q:0.1,},{w:"n0",g:1,t:5,v:42,r:0.01,h:0,p:0,}],
          [{w:"n0",f:222,p:0,t:0,r:0.01,h:0,}],
          [{w:"triangle",v:0.3,f:180,d:0.05,t:0,h:0.03,p:0.9,q:0.1,},{w:"n0",v:0.6,t:0,f:70,h:0.02,r:0.01,p:0,},{g:1,w:"square",v:2,t:0,f:360,r:0.01,b:0,c:0,}],
          [{w:"square",f:1150,v:0.34,t:0,r:0.03,h:0.025,d:0.03,},{g:1,w:"n0",t:0,f:13,h:0.025,d:0.1,s:1,r:0.1,v:1,}],
  /*40*/  [{w:"triangle",f:200,v:1,d:0.06,t:0,r:0.06,},{w:"n0",g:1,t:0,f:400,v:12,r:0.02,d:0.02,}],
          [{w:"triangle",f:100,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.4,h:0.015,d:0.005,r:0.005,}],
          [{w:"n1",f:390,v:0.25,r:0.01,t:0,}],
          [{w:"triangle",f:120,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.5,h:0.015,d:0.005,r:0.005,}],
          [{w:"n1",v:0.25,f:390,r:0.03,t:0,h:0.005,d:0.03,}],
  /*45*/  [{w:"triangle",f:140,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.3,h:0.015,d:0.005,r:0.005,}],
          [{w:"n1",v:0.25,f:390,t:0,d:0.2,r:0.2,},{w:"n0",v:0.3,t:0,c:0,f:440,h:0.005,d:0.05,}],
          [{w:"triangle",f:155,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.3,h:0.015,d:0.005,r:0.005,}],
          [{w:"triangle",f:180,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.3,h:0.015,d:0.005,r:0.005,}],
          [{w:"n1",v:0.3,f:1200,d:0.2,r:0.2,h:0.05,t:0,},{w:"n1",t:0,v:1,d:0.1,r:0.1,p:1.2,f:440,}],
  /*50*/  [{w:"triangle",f:220,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.3,h:0.015,d:0.005,r:0.005,}],
          [{w:"n1",f:500,v:0.15,d:0.4,r:0.4,h:0,t:0,},{w:"n0",v:0.1,t:0,r:0.01,f:440,}],
          [{w:"n1",v:0.3,f:800,d:0.2,r:0.2,h:0.05,t:0,},{w:"square",t:0,v:1,d:0.1,r:0.1,p:0.1,f:220,g:1,}],
          [{w:"sine",f:1651,v:0.15,d:0.2,r:0.2,h:0,t:0,},{w:"sawtooth",g:1,t:1.21,v:7.2,d:0.1,r:11,h:1,},{g:1,w:"n0",v:3.1,t:0.152,d:0.002,r:0.002,}],
          null,
  /*55*/  [{w:"n1",v:.3,f:1200,d:0.2,r:0.2,h:0.05,t:0,},{w:"n1",t:0,v:1,d:0.1,r:0.1,p:1.2,f:440,}],
          null,
          [{w:"n1",v:0.3,f:555,d:0.25,r:0.25,h:0.05,t:0,},{w:"n1",t:0,v:1,d:0.1,r:0.1,f:440,a:0.005,h:0.02,}],
          [{w:"sawtooth",f:776,v:0.2,d:0.3,t:0,r:0.3,},{g:1,w:"n0",v:2,t:0,f:776,a:0.005,h:0.02,d:0.1,s:1,r:0.1,c:0,},{g:11,w:"sine",v:0.1,t:0,f:22,d:0.3,r:0.3,b:0,c:0,}],
          [{w:"n1",f:440,v:0.15,d:0.4,r:0.4,h:0,t:0,},{w:"n0",v:0.4,t:0,r:0.01,f:440,}],
  /*60*/  null,null,null,null,null,
  /*65*/  null,null,null,null,null,
  /*70*/  null,null,null,null,null,
  /*75*/  null,null,null,null,null,
  /*80*/  [{w:"sine",f:1720,v:0.3,d:0.02,t:0,r:0.02,},{w:"square",g:1,t:0,f:2876,v:6,d:0.2,s:1,r:0.2,}],
          [{w:"sine",f:1720,v:0.3,d:0.25,t:0,r:0.25,},{w:"square",g:1,t:0,f:2876,v:6,d:0.2,s:1,r:0.2,}],
      ],
      drummap0:[
  /*35*/[{w:"triangle",t:0,f:110,v:1,d:0.05,h:0.02,p:0.1,}],
        [{w:"triangle",t:0,f:150,v:0.8,d:0.1,p:0.1,h:0.02,r:0.01,}],
        [{w:"n0",f:392,v:0.5,d:0.01,p:0,t:0,r:0.05}],
        [{w:"n0",f:33,d:0.05,t:0,}],
        [{w:"n0",f:100,v:0.7,d:0.03,t:0,r:0.03,h:0.02,}],
  /*40*/[{w:"n0",f:44,v:0.7,d:0.02,p:0.1,t:0,h:0.02,}],
        [{w:"triangle",f:240,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
        [{w:"n0",f:440,v:0.2,r:0.01,t:0,}],
        [{w:"triangle",f:270,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
        [{w:"n0",f:440,v:0.2,d:0.04,r:0.04,t:0,}],
  /*45*/[{w:"triangle",f:300,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
        [{w:"n0",f:440,v:0.2,d:0.1,r:0.1,h:0.02,t:0,}],
        [{w:"triangle",f:320,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
        [{w:"triangle",f:360,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
        [{w:"n0",f:150,v:0.2,d:0.1,r:0.1,h:0.05,t:0,p:0.1,}],
  /*50*/[{w:"triangle",f:400,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
        [{w:"n0",f:150,v:0.2,d:0.1,r:0.01,h:0.05,t:0,p:0.1}],
        [{w:"n0",f:150,v:0.2,d:0.1,r:0.01,h:0.05,t:0,p:0.1}],
        [{w:"n0",f:440,v:0.3,d:0.1,p:0.9,t:0,r:0.1,}],
        [{w:"n0",f:200,v:0.2,d:0.05,p:0.9,t:0,}],
  /*55*/[{w:"n0",f:440,v:0.3,d:0.12,p:0.9,t:0,}],
        [{w:"sine",f:800,v:0.4,d:0.06,t:0,}],
        [{w:"n0",f:150,v:0.2,d:0.1,r:0.01,h:0.05,t:0,p:0.1}],
        [{w:"n0",f:33,v:0.3,d:0.2,p:0.9,t:0,}],
        [{w:"n0",f:300,v:0.3,d:0.14,p:0.9,t:0,}],
  /*60*/[{w:"sine",f:200,d:0.06,t:0,}],
        [{w:"sine",f:150,d:0.06,t:0,}],
        [{w:"sine",f:300,t:0,}],
        [{w:"sine",f:300,d:0.06,t:0,}],
        [{w:"sine",f:250,d:0.06,t:0,}],
  /*65*/[{w:"square",f:300,v:.3,d:.06,p:.8,t:0,}],
        [{w:"square",f:260,v:.3,d:.06,p:.8,t:0,}],
        [{w:"sine",f:850,v:.5,d:.07,t:0,}],
        [{w:"sine",f:790,v:.5,d:.07,t:0,}],
        [{w:"n0",f:440,v:0.3,a:0.05,t:0,}],
  /*70*/[{w:"n0",f:440,v:0.3,a:0.05,t:0,}],
        [{w:"triangle",f:1800,v:0.4,p:0.9,t:0,h:0.03,}],
        [{w:"triangle",f:1800,v:0.3,p:0.9,t:0,h:0.13,}],
        [{w:"n0",f:330,v:0.3,a:0.02,t:0,r:0.01,}],
        [{w:"n0",f:330,v:0.3,a:0.02,t:0,h:0.04,r:0.01,}],
  /*75*/[{w:"n0",f:440,v:0.3,t:0,}],
        [{w:"sine",f:800,t:0,}],
        [{w:"sine",f:700,t:0,}],
        [{w:"n0",f:330,v:0.3,t:0,}],
        [{w:"n0",f:330,v:0.3,t:0,h:0.1,r:0.01,p:0.7,}],
  /*80*/[{w:"sine",t:0,f:1200,v:0.3,r:0.01,}],
        [{w:"sine",t:0,f:1200,v:0.3,d:0.2,r:0.2,}],

      ],
      ready:()=>{
        return new Promise((resolv)=>{
          const timerid=setInterval(()=>{
  //          console.log("Initialize checking.");
            if(this.isReady){
              clearInterval(timerid);
              console.log("Initialized");
              resolv();
            }
          },100);
        });
      },
      init:()=>{
        this.pg=[]; this.vol=[]; this.ex=[]; this.bend=[]; this.rpnidx=[]; this.brange=[];
        this.sustain=[]; this.notetab=[]; this.rhythm=[];
        this.maxTick=0, this.playTick=0, this.playing=0; this.releaseRatio=3.5;
        for(let i=0;i<16;++i){
          this.pg[i]=0; this.vol[i]=3*100*100/(127*127);
          this.bend[i]=0; this.brange[i]=0x100;
          this.rhythm[i]=0;
        }
        this.rhythm[9]=1;
        this.preroll=0.2;
        this.relcnt=0;
        setInterval(
          function(){
            if(++this.relcnt>=3){
              this.relcnt=0;
              for(let i=this.notetab.length-1;i>=0;--i){
                var nt=this.notetab[i];
                if(this.actx.currentTime>nt.e){
                  this._pruneNote(nt);
                  this.notetab.splice(i,1);
                }
              }
            }
          }.bind(this),60
        );
        console.log("internalcontext:"+this.internalcontext)
        if(this.internalcontext){
          window.AudioContext = window.AudioContext || window.webkitAudioContext;
          this.setAudioContext(new AudioContext());
        }
        this.isReady=1;
      },
      setMasterVol:(v)=>{
        if(v!=undefined)
          this.masterVol=v;
        if(this.out)
          this.out.gain.value=this.masterVol;
      },
      setReverbLev:(v)=>{
        if(v!=undefined)
          this.reverbLev=v;
        var r=parseFloat(this.reverbLev);
        if(this.rev&&!isNaN(r))
          this.rev.gain.value=r*8;
      },
      reset:()=>{
        for(let i=0;i<16;++i){
          this.setProgram(i,0);
          this.setBendRange(i,0x100);
          this.setModulation(i,0);
          this.setChVol(i,100);
          this.setPan(i,64);
          this.resetAllControllers(i);
          this.allSoundOff(i);
          this.rhythm[i]=0;
        }
        this.rhythm[9]=1;
      },
      setQuality:(q)=>{
        if(q!=undefined)
          this.quality=q;
        for(let i=0;i<128;++i)
          this.setTimbre(0,i,this.program0[i]);
        for(let i=0;i<this.drummap0.length;++i)
          this.setTimbre(1,i+35,this.drummap0[i]);
        if(this.quality){
          for(let i=0;i<this.program1.length;++i)
            this.setTimbre(0,i,this.program1[i]);
          for(let i=0;i<this.drummap.length;++i){
            if(this.drummap1[i])
              this.setTimbre(1,i+35,this.drummap1[i]);
          }
        }
      },
      setTimbre:(m,n,p)=>{
        const defp={g:0,w:"sine",t:1,f:0,v:0.5,a:0,h:0.01,d:0.01,s:0,r:0.05,p:1,q:1,k:0};
        function filldef(p){
          for(n=0;n<p.length;++n){
            for(let k in defp){
              if(!p[n].hasOwnProperty(k) || typeof(p[n][k])=="undefined")
                p[n][k]=defp[k];
            }
          }
          return p;
        }
        if(m && n>=35 && n<=81)
          this.drummap[n-35].p=filldef(p);
        if(m==0 && n>=0 && n<=127)
          this.program[n].p=filldef(p);
      },
      _pruneNote:(nt)=>{
        for(let k=nt.o.length-1;k>=0;--k){
          if(nt.o[k].frequency){
            nt.o[k].frequency.cancelScheduledValues(0);
          }
          else{
            nt.o[k].playbackRate.cancelScheduledValues(0);
          }
          nt.g[k].gain.cancelScheduledValues(0);

          nt.o[k].stop();
          if(nt.o[k].detune) {
            try {
              this.chmod[nt.ch].disconnect(nt.o[k].detune);
            } catch (e) {}
          }
          nt.g[k].gain.value = 0;
        }
      },
      _limitVoices:(ch,n)=>{
        this.notetab.sort(function(n1,n2){
          if(n1.f!=n2.f) return n1.f-n2.f;
          if(n1.e!=n2.e) return n2.e-n1.e;
          return n2.t-n1.t;
        });
        for(let i=this.notetab.length-1;i>=0;--i){
          var nt=this.notetab[i];
          if(this.actx.currentTime>nt.e || i>=(this.voices-1)) {
            this._pruneNote(nt);
            this.notetab.splice(i,1);
          }
        }
      },
      _note:(t,ch,n,v,p)=>{
        let out,sc,pn;
        const o=[],g=[],vp=[],fp=[],r=[];
        const f=440*Math.pow(2,(n-69)/12);
        this._limitVoices(ch,n);
        for(let i=0;i<p.length;++i){
          pn=p[i];
          const dt=t+pn.a+pn.h;
          if(pn.g==0)
            out=this.chvol[ch], sc=v*v/16384, fp[i]=f*pn.t+pn.f;
          else if(pn.g>10)
            out=g[pn.g-11].gain, sc=1, fp[i]=fp[pn.g-11]*pn.t+pn.f;
          else if(o[pn.g-1].frequency)
            out=o[pn.g-1].frequency, sc=fp[pn.g-1], fp[i]=fp[pn.g-1]*pn.t+pn.f;
          else
            out=o[pn.g-1].playbackRate, sc=fp[pn.g-1]/440, fp[i]=fp[pn.g-1]*pn.t+pn.f;
          switch(pn.w[0]){
          case "n":
            o[i]=this.actx.createBufferSource();
            o[i].buffer=this.noiseBuf[pn.w];
            o[i].loop=true;
            o[i].playbackRate.value=fp[i]/440;
            if(pn.p!=1)
              this._setParamTarget(o[i].playbackRate,fp[i]/440*pn.p,t,pn.q);
            this.chmod[ch].connect(o[i].detune);
            o[i].detune.value=this.bend[ch];
            break;
          default:
            o[i]=this.actx.createOscillator();
            o[i].frequency.value=fp[i];
            if(pn.p!=1)
              this._setParamTarget(o[i].frequency,fp[i]*pn.p,t,pn.q);
            if(pn.w[0]=="w")
              o[i].setPeriodicWave(this.wave[pn.w]);
            else
              o[i].type=pn.w;
            this.chmod[ch].connect(o[i].detune);
            o[i].detune.value=this.bend[ch];
            break;
          }
          g[i]=this.actx.createGain();
          r[i]=pn.r;
          o[i].connect(g[i]); g[i].connect(out);
          vp[i]=sc*pn.v;
          if(pn.k)
            vp[i]*=Math.pow(2,(n-60)/12*pn.k);
          if(pn.a){
            g[i].gain.value=0;
            g[i].gain.setValueAtTime(0,t);
            g[i].gain.linearRampToValueAtTime(vp[i],t+pn.a);
          }
          else
            g[i].gain.setValueAtTime(vp[i],t);
          this._setParamTarget(g[i].gain,pn.s*vp[i],dt,pn.d);
          o[i].start(t);
          if(this.rhythm[ch]){

            o[i].onended = ()=>{
                this.chmod[ch].disconnect(o[i].detune);
            };
            o[i].stop(t+p[0].d*this.releaseRatio);
          }
        }
        if(!this.rhythm[ch])
          this.notetab.push({t:t,e:99999,ch:ch,n:n,o:o,g:g,t2:t+pn.a,v:vp,r:r,f:0});
      },
      _setParamTarget:(p,v,t,d)=>{
        if(d!=0)
          p.setTargetAtTime(v,t,d);
        else
          p.setValueAtTime(v,t);
      },
      _releaseNote:(nt,t)=>{
        if(nt.ch!=9){
          for(let k=nt.g.length-1;k>=0;--k){
            nt.g[k].gain.cancelScheduledValues(t);
            if(t==nt.t2)
              nt.g[k].gain.setValueAtTime(nt.v[k],t);
            else if(t<nt.t2)
              nt.g[k].gain.setValueAtTime(nt.v[k]*(t-nt.t)/(nt.t2-nt.t),t);
            this._setParamTarget(nt.g[k].gain,0,t,nt.r[k]);
          }
        }
        nt.e=t+nt.r[0]*this.releaseRatio;
        nt.f=1;
      },
      setModulation:(ch,v,t)=>{
        this.chmod[ch].gain.setValueAtTime(v*100/127,this._tsConv(t));
      },
      setChVol:(ch,v,t)=>{
        this.vol[ch]=3*v*v/(127*127);
        this.chvol[ch].gain.setValueAtTime(this.vol[ch]*this.ex[ch],this._tsConv(t));
      },
      setPan:(ch,v,t)=>{
        if(this.chpan[ch])
          this.chpan[ch].pan.setValueAtTime((v-64)/64,this._tsConv(t));
      },
      setExpression:(ch,v,t)=>{
        this.ex[ch]=v*v/(127*127);
        this.chvol[ch].gain.setValueAtTime(this.vol[ch]*this.ex[ch],this._tsConv(t));
      },
      setSustain:(ch,v,t)=>{
        this.sustain[ch]=v;
        t=this._tsConv(t);
        if(v<64){
          for(let i=this.notetab.length-1;i>=0;--i){
            const nt=this.notetab[i];
            if(t>=nt.t && nt.ch==ch && nt.f==1)
              this._releaseNote(nt,t);
          }
        }
      },
      allSoundOff:(ch)=>{
        for(let i=this.notetab.length-1;i>=0;--i){
          const nt=this.notetab[i];
          if(nt.ch==ch){
            this._pruneNote(nt);
            this.notetab.splice(i,1);
          }
        }
      },
      resetAllControllers:(ch)=>{
        this.bend[ch]=0; this.ex[ch]=1.0;
        this.rpnidx[ch]=0x3fff; this.sustain[ch]=0;
        if(this.chvol[ch]){
          this.chvol[ch].gain.value=this.vol[ch]*this.ex[ch];
          this.chmod[ch].gain.value=0;
        }
      },
      setBendRange:(ch,v)=>{
        this.brange[ch]=v;
      },
      setProgram:(ch,v)=>{
        if(this.debug)
          console.log("Pg("+ch+")="+v);
        this.pg[ch]=v;
      },
      _tsConv:(t)=>{
        if(t==undefined||t<=0){
          t=0;
          if(this.actx)
            t=this.actx.currentTime;
        }
        else{
          if(this.tsmode)
            t=t*.001-this.tsdiff;
        }
        return t;
      },
      setBend:(ch,v,t)=>{
        t=this._tsConv(t);
        const br=this.brange[ch]*100/127;
        this.bend[ch]=(v-8192)*br/8192;
        for(let i=this.notetab.length-1;i>=0;--i){
          const nt=this.notetab[i];
          if(nt.ch==ch){
            for(let k=nt.o.length-1;k>=0;--k){
              if(nt.o[k].frequency)
                nt.o[k].detune.setValueAtTime(this.bend[ch],t);
            }
          }
        }
      },
      noteOff:(ch,n,t)=>{
        if(this.rhythm[ch])
          return;
        t=this._tsConv(t);
        for(let i=this.notetab.length-1;i>=0;--i){
          const nt=this.notetab[i];
          if(t>=nt.t && nt.ch==ch && nt.n==n && nt.f==0){
            nt.f=1;
            if(this.sustain[ch]<64)
              this._releaseNote(nt,t);
          }
        }
      },
      noteOn:(ch,n,v,t)=>{
        if(v==0){
          this.noteOff(ch,n,t);
          return;
        }
        t=this._tsConv(t);
        if (this.rhythm[ch]) {
          if(n>=35&&n<=81)
            this._note(t,ch,n,v,this.drummap[n-35].p);
          return;
        }
        this._note(t,ch,n,v,this.program[this.pg[ch]].p);
      },
      setTsMode:(tsmode)=>{
        this.tsmode=tsmode;
      },
      send:(msg,t)=>{    /* send midi message */
        const ch=msg[0]&0xf;
        const cmd=msg[0]&~0xf;
        if(cmd<0x80||cmd>=0x100)
          return;
        if(this.audioContext.state=="suspended"){
          this.audioContext.resume();
        }
        switch(cmd){
        case 0xb0:  /* ctl change */
          switch(msg[1]){
          case 1:  this.setModulation(ch,msg[2],t); break;
          case 7:  this.setChVol(ch,msg[2],t); break;
          case 10: this.setPan(ch,msg[2],t); break;
          case 11: this.setExpression(ch,msg[2],t); break;
          case 64: this.setSustain(ch,msg[2],t); break;
          case 98:  case 98: this.rpnidx[ch]=0x3fff; break; /* nrpn lsb/msb */
          case 100: this.rpnidx[ch]=(this.rpnidx[ch]&0x380)|msg[2]; break; /* rpn lsb */
          case 101: this.rpnidx[ch]=(this.rpnidx[ch]&0x7f)|(msg[2]<<7); break; /* rpn msb */
          case 6:  /* data entry msb */
            if(this.rpnidx[ch]==0)
              this.brange[ch]=(msg[2]<<7)+(this.brange[ch]&0x7f);
            break;
          case 38:  /* data entry lsb */
            if(this.rpnidx[ch]==0)
              this.brange[ch]=(this.brange[ch]&0x380)|msg[2];
            break;
          case 120:  /* all sound off */
          case 123:  /* all notes off */
          case 124: case 125: case 126: case 127: /* omni off/on mono/poly */
            this.allSoundOff(ch);
            break;
          case 121: this.resetAllControllers(ch); break;
          }
          break;
        case 0xc0: this.setProgram(ch,msg[1]); break;
        case 0xe0: this.setBend(ch,(msg[1]+(msg[2]<<7)),t); break;
        case 0x90: this.noteOn(ch,msg[1],msg[2],t); break;
        case 0x80: this.noteOff(ch,msg[1],t); break;
        case 0xf0:
          if (msg[0] == 0xff) {
            this.reset();
            break;
          }
          if(msg[0]!=254 && this.debug){
            var ds=[];
            for(let ii=0;ii<msg.length;++ii)
              ds.push(msg[ii].toString(16));
          }
          if(msg[1]==0x41&&msg[2]==0x10&&msg[3]==0x42&&msg[4]==0x12&&msg[5]==0x40){
            if((msg[6]&0xf0)==0x10&&msg[7]==0x15){
              const c=[9,0,1,2,3,4,5,6,7,8,10,11,12,13,14,15][msg[6]&0xf];
              this.rhythm[c]=msg[8];
            }
          }
          break;
        }
      },
      _createWave:(w)=>{
        const imag=new Float32Array(w.length);
        const real=new Float32Array(w.length);
        for(let i=1;i<w.length;++i)
          imag[i]=w[i];
        return this.actx.createPeriodicWave(real,imag);
      },
      getAudioContext:()=>{
        return this.actx;
      },
      setAudioContext:(actx,dest)=>{
        this.audioContext=this.actx=actx;
        this.dest=dest;
        if(!dest)
          this.dest=actx.destination;
        this.tsdiff=performance.now()*.001-this.actx.currentTime;
        console.log("TSDiff:"+this.tsdiff);
        this.out=this.actx.createGain();
        this.comp=this.actx.createDynamicsCompressor();
        var blen=this.actx.sampleRate*.5|0;
        this.convBuf=this.actx.createBuffer(2,blen,this.actx.sampleRate);
        this.noiseBuf={};
        this.noiseBuf.n0=this.actx.createBuffer(1,blen,this.actx.sampleRate);
        this.noiseBuf.n1=this.actx.createBuffer(1,blen,this.actx.sampleRate);
        var d1=this.convBuf.getChannelData(0);
        var d2=this.convBuf.getChannelData(1);
        var dn=this.noiseBuf.n0.getChannelData(0);
        var dr=this.noiseBuf.n1.getChannelData(0);
        for(let i=0;i<blen;++i){
          if(i/blen<Math.random()){
            d1[i]=Math.exp(-3*i/blen)*(Math.random()-.5)*.5;
            d2[i]=Math.exp(-3*i/blen)*(Math.random()-.5)*.5;
          }
          dn[i]=Math.random()*2-1;
        }
        for(let jj=0;jj<64;++jj){
          const r1=Math.random()*10+1;
          const r2=Math.random()*10+1;
          for(let i=0;i<blen;++i){
            var dd=Math.sin((i/blen)*2*Math.PI*440*r1)*Math.sin((i/blen)*2*Math.PI*440*r2);
            dr[i]+=dd/8;
          }
        }
        if(this.useReverb){
          this.conv=this.actx.createConvolver();
          this.conv.buffer=this.convBuf;
          this.rev=this.actx.createGain();
          this.rev.gain.value=this.reverbLev;
          this.out.connect(this.conv);
          this.conv.connect(this.rev);
          this.rev.connect(this.comp);
        }
        this.setMasterVol();
        this.out.connect(this.comp);
        this.comp.connect(this.dest);
        this.chvol=[]; this.chmod=[]; this.chpan=[];
        this.wave={"w9999":this._createWave("w9999")};
        this.lfo=this.actx.createOscillator();
        this.lfo.frequency.value=5;
        this.lfo.start(0);
        for(let i=0;i<16;++i){
          this.chvol[i]=this.actx.createGain();
          if(this.actx.createStereoPanner){
            this.chpan[i]=this.actx.createStereoPanner();
            this.chvol[i].connect(this.chpan[i]);
            this.chpan[i].connect(this.out);
          }
          else{
            this.chpan[i]=null;
            this.chvol[i].connect(this.out);
          }
          this.chmod[i]=this.actx.createGain();
          this.lfo.connect(this.chmod[i]);
          this.pg[i]=0;
          this.resetAllControllers(i);
        }
        this.setReverbLev();
        this.reset();
        this.send([0x90,60,1]);
        this.send([0x90,60,0]);
      },
    });
  }
  if(window && window.customElements){
    class WebAudioTinySynthElement extends HTMLElement {
      constructor(){
        super();
      }
      connectedCallback(){


        this.getAttr = (n,def)=>{
          let v=this.getAttribute(n);
          if(v==""||v==null) return def;
          switch(typeof(def)){
          case "number":
            if(v=="true") return 1;
            v=+v;
            if(isNaN(v)) return 0;
            return v;
          }
          return v;
        };

        this.canvas = div.children[0];
        this.appendChild(div);
        WebAudioTinySynthCore.bind(this)(this);
        const plist=this.properties;
        for(let k in plist){
          const v = plist[k];
          if(v.observer){
            this["_"+k] = v.value;
            Object.defineProperty(this, k, {
              get:()=>{return this["_"+k]},
              set:(val)=>{
                this["_"+k] = val;
                this[v.observer]();
              }
            });
          }
          else{
            this[k]=v;
          }
        }
        for(let k in plist){
          const v = plist[k];
          this[k] = this.getAttr(k,v.value);
        }
        this.setQuality(1);
        this.init();
        this._guiInit.bind(this)();
        setInterval(this._guiUpdate.bind(this),100);
      }
    }
    window.customElements.define('webaudio-tinysynth', WebAudioTinySynthElement);
  }

  class WebAudioTinySynth {
    constructor(opt){
      WebAudioTinySynthCore.bind(this)(this);
      for(let k in this.properties){
        this[k]=this.properties[k].value;
      }
      this.setQuality(1);
      if(opt){
        if(opt.useReverb!=undefined)
          this.useReverb=opt.useReverb;
        if(opt.quality!=undefined)
          this.setQuality(opt.quality);
        if(opt.voices!=undefined)
          this.setVoices(opt.voices);
      }
      this.init();
    }
  }

  if(typeof exports === 'object' && typeof module !== 'undefined'){
    module.exports = WebAudioTinySynth;
  }
  else if(typeof define === 'function' && define.amd){
      define(function(){
        return WebAudioTinySynth;
      });
  }
  else{
    window.WebAudioTinySynth = WebAudioTinySynth;
  }

  })(this);

  window.synth = new WebAudioTinySynth({quality:1, useReverb:1});

  synth.setReverbLev(0)
  var isPlaying = false
  var startTime	
  var current16thNote		
  var current16thDrum		
  var lookahead = 25.0
  var noteTimerID = null
  var drumTimerID = null                
  var scheduleAheadTime = 0.1	
  var nextNoteTime = 0.0		
  var noteResolution = 0		
  var noteLength = 0.05		
  var nextDrumTime = 0.0		
  var drumResolution = 0		
  var drumLength = 0.05		
  var noteIntervalID = 0		
  var drumIntervalID = 0
  var last16thNoteDrawn = -1
  var notesInQueue = []  
  var last16thDrumDrawn = -1	
  var drumsInQueue = []  
                              
  function nextNote() {
    
      var missthis = 0
      if (synthslop === 1) {
        missthis = .1
      }
      else if (synthslop === 2) {
        missthis = .5
      }
      noteTempo = globalTempo / 4
      if (Math.random() > missthis) {
        noteTempo = globalTempo / 1
      }
        
    var secondsPerBeat = 60.0 / noteTempo
                      
    nextNoteTime += 0.25 * secondsPerBeat

    current16thNote++
    if (current16thNote == 16) {
      current16thNote = 0
    }
  }
  function nextDrum() {
    var duo = 2
    if (ddropsplash) {
      duo = randfloat(3,7)
    }
    drumTempo = globalTempo * duo
    var secondsPerBeat = 60.0 / drumTempo
                      
    nextDrumTime += 0.25 * secondsPerBeat

    current16thDrum++
    if (current16thDrum == 16) {
      current16thDrum = 0
    }
  }

  function scheduleNote( beatNumber, time ) {
    beams()
    var osc = synth.actx.createOscillator()
    osc.connect( synth.actx.destination )
    rand = topnote
    if (Math.random() > .8) {
      rand = bottomnote
    }
    if (synthvariation) {
      var rand = randint(0,127)
    }
    
    var mult = 0
    var notetarget
    if (abacabmode) {
      notetarget = nextabacab()
    }
    else {
      notetarget = 60
    }
    
    if (sloppymode === 1 && Math.random() > .73) {
      var mult = randfloat(.5,1.5)
      notetarget = notetarget*mult
    }
    else if (sloppymode === 2 && Math.random() > .2) {
      var mult = randfloat(.5,1.5)
      notetarget = notetarget*mult
    
    }
    else {
      
      var mult = 0
      var repmax = .9
      var charmax = .5
      var charmin = .3
      if (synthslopn) {
        repmax = .3
      }

      if (sloppymode || Math.random() > repmax) {
        if (Math.random() > charmax) {
          mult = 12
          if (Math.random() > charmax) {
            mult = 24
            if (synthslopn) {
              if (Math.random() > .5) {
                mult = 48
              }
              else if (Math.random() > .8) {
                mult = 36
              }
            }
          }
          if (Math.random() > charmin) {
            mult = -12
            if (synthslopn) {
              if (Math.random() > .5) {
                mult = -24
              }
              else if (Math.random() > .8) {
                mult = -36
              }
            }          
          }
        }
      }
      notetarget = notetarget-mult
    }
    
    var shift = 0
    if (synthslopq) {
      shift = 1
    }
    var lit = document.querySelector(".lit")
    
    notepersonstate++
    var undone = false
    var revertnote = false
    
    if (lit) {
      var lastnstate = notepersonstate - 1
      if (lastnstate < 0) {
        lastnstate = personslength - 1
      }
      if (persons[lastnstate].classList.contains("toggle")) {
        revertnote = true
        notepersonstate--
      }
      lit.classList.remove("lit")
    }

    var undone = notepersonstate < 0 ? personslength - 1 : notepersonstate
    var hues = false

    persons[undone].classList.add("lit")

    if (notepersonstate > personslength-2) {
      notepersonstate = -1 + noteoffset
    }
    
    if (revertnote) {
      notetarget = lastrealnote.a
      rand = lastrealnote.b
      if (Math.random() > .5) {
        notetarget++
      }
      if (activenotes.has(notepersonstate-1)) {
        entropymode = true
      }
      else {
        entropymode = false
      }
      if (activenotes.has(notepersonstate+1) && !everhihatready) {
        everhihatready = true
      }
      if (activenotes.has(notepersonstate-3) && activenotes.has(notepersonstate-2)) {
        basemute = 2
      }
      else if (activenotes.has(notepersonstate-2)) {
        basemute = 1
      }
      else {
        basemute = false
      }
    }
    else {
      entropymode = false
      basemute = false
      lastrealnote = {
        a:notetarget,
        b:rand
      }
    }
    
    if (entropymode && kicktrack) {
      sendkick(synth.actx, time)
    }
    synth.send([0xc0,rand])
    var superslack = 0
    if (ndropsplash) {
      superslack = randfloat(0,0.5)
      if (Math.random() > .5) {
        shift = shift - 12
        if (Math.random () > .3) {
          shift = shift + 1
        }
      }
      else {
        shift = shift + 12
        if (Math.random() > .5) {
          shift = shift + 1
        }
      }
      if (Math.random() > .2) {
        ndropsplash = false
      }
    }
    if (ndropsplashed) {
      if (Math.random() > .8) {
        ndropsplash = true
      }
    }
    if (!ndropsplash || (ndropsplash && Math.random() > .4)) {
      synth.send([0x90, notetarget+shift, 60], time + slopnotemax + superslack)
      synth.send([0x90, notetarget+shift, 0], time + slopnotemax)  
      if (basemute === 2) {
        if (Math.random() > .5) {
          synth.send([0xc0,rand])
          var offshift = 24
          synth.send([0x90, notetarget+shift-offshift, 60], time + slopnotemax)
          synth.send([0x90, notetarget+shift-offshift, 0], time + slopnotemax) 
        }
      }  
      else if (basemute === 1) {
        if (Math.random() > .5) {
          synth.send([0xc0,rand])
          var offshift = 12
          synth.send([0x90, notetarget+shift-offshift, 60], time + slopnotemax)
          synth.send([0x90, notetarget+shift-offshift, 0], time + slopnotemax) 
        }
      }  
    }
  }

  var noiseBuffer = synth.actx.createBuffer(1, 44100, 44100)
  var noiseBufferOutput = noiseBuffer.getChannelData(0);
  for (var i = 0; i < 44100; i++) {
      noiseBufferOutput[i] = Math.random() * 2 - 1;
  }

  var kick = function(context, time) {
    var osc = context.createOscillator();
    var gain = context.createGain();
    osc.frequency.setValueAtTime(130, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    gain.gain.setValueAtTime(randfloat(2,3), time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(time);
    osc.stop(time + 0.5);
  };
  function Snare(context) {
    this.context = context;
  };

  Snare.prototype.setup = function() {
    this.noise = this.context.createBufferSource();
    this.noise.buffer = this.noiseBuffer();

    var noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    this.noise.connect(noiseFilter);

    this.noiseEnvelope = this.context.createGain();
    noiseFilter.connect(this.noiseEnvelope);

    this.noiseEnvelope.connect(this.context.destination);

    this.osc = this.context.createOscillator();
    this.osc.type = 'triangle';

    this.oscEnvelope = this.context.createGain();
    this.osc.connect(this.oscEnvelope);
    this.oscEnvelope.connect(this.context.destination);
  };

  Snare.prototype.noiseBuffer = function() {
    var bufferSize = this.context.sampleRate;
    var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    var output = buffer.getChannelData(0);

    for (var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return buffer;
  };

  Snare.prototype.trigger = function(time) {
    this.setup();

    this.noiseEnvelope.gain.setValueAtTime(1, time);
    this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    this.noise.start(time)

    this.osc.frequency.setValueAtTime(100, time);
    this.oscEnvelope.gain.setValueAtTime(0.7, time);
    this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    this.osc.start(time)

    this.osc.stop(time + 0.2);
    this.noise.stop(time + 0.2);
  };

  var sendkick = (context, time) => {
    document.querySelectorAll("a.person")[0].classList.add("hit")
    if (notepersonstate === 0) {
      snare.trigger(time)
    }
    setTimeout(()=>{
      document.querySelectorAll("a.person")[0].classList.remove("hit")
    },60)
    kick(context, time)  
  }

  var hihat = function(context, time) {
    var noise = context.createBufferSource();
    noise.buffer = noiseBuffer;
    var noiseFilter = context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 16000;
    noise.connect(noiseFilter);
    var noiseEnvelope = context.createGain();
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(context.destination);
    noiseEnvelope.gain.setValueAtTime(0.8, time);
    noiseEnvelope.gain.exponentialRampToValueAtTime(0.5, time + 0.05);
    noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    noise.start(time);
    noise.stop(time + 0.01);
  };

  function scheduleDrum( beatNumber, time ) {
    
    drumResolution = 2
    
    if (hihattrack === 3) {
      if (Math.random () > .9) {
        drumResolution = 0
      }
      else if (Math.random () > .8) {
        drumResolution = 1
      }
      else {
        drumResolution = 2
      }
    }
    else if (hihattrack === 4) {
      if (Math.random () > .7) {
        drumResolution = 0
      }
      else {
        drumResolution = 2
      }
    }
    var beattwo = 4
    if (hihattrack === 2 || hihattrack === 4) {
      beattwo = 2
    }
    if ( (drumResolution==1) && (beatNumber%2)) {
      return	
    }
    if ( (drumResolution==2) && (beatNumber%beattwo)) {
      return
    }
    var playhihat = false
    var playkick = false

    if (beatNumber % 8 === 0)	{
      playkick = true
      playhihat = true
    }
    else {
      playhihat = true
    }
    if (hihattrack) {
      if (playhihat) {
        document.querySelectorAll("a.box.person")[1].classList.add("hit")
        setTimeout(()=>{
          document.querySelectorAll("a.box.person")[1].classList.remove("hit")
        },60)
        hihat(synth.actx, time)
      }
    }
    if (kicktrack && !entropymode) {
      if (playkick) {
        
        sendkick(synth.actx, time)
      }

    }
  }

  function noteScheduler() {
    while (nextNoteTime < synth.actx.currentTime + scheduleAheadTime ) {
      scheduleNote( current16thNote, nextNoteTime )
      nextNote()
    }
    noteTimerID = window.setTimeout( noteScheduler, lookahead )
  }

  function drumScheduler() {
    while (nextDrumTime < synth.actx.currentTime + scheduleAheadTime ) {
      scheduleDrum( current16thDrum, nextDrumTime )
      nextDrum()
    }
    drumTimerID = window.setTimeout( drumScheduler, lookahead )
  }
  
  var everplayed = false

  function play() {
    if (!everplayed) {
      toggleabacab()
      var firstitemifexists = document.querySelectorAll("a.box.new-block:not(.person)")[0]
      if (firstitemifexists) {
        // abacabtrigger
        firstitemifexists.addEventListener("click", (e)=>{
          toggleabacab()
        })
      }      
    }
    everplayed = true
    isPlaying = !isPlaying

    if (isPlaying) { // start playing
      current16thNote = 0
      current16thDrum = 0
      nextNoteTime = synth.actx.currentTime;
      nextDrumTime = synth.actx.currentTime;
      noteScheduler()
      drumScheduler()
      return "stop"
    } 
    else {
      window.clearTimeout( noteTimerID )
      window.clearTimeout( drumTimerID )
      return "play"
    }
  }

  function dropsplashed() {
    if (ndropsplashed) {
      return
    }
    ndropsplashed = true
    document.body.classList.add("xdim")
    document.body.parentElement.style.background = "#000"  
    var alllit = document.querySelectorAll(".person")
    for (let i=0;i<alllit.length;i++) {
      document.querySelectorAll(".person")[i].classList.remove("toggle")
      document.querySelectorAll(".person")[i].style.background = "red"
    }
    synth.setReverbLev(.6)
    startTempo = 25
    globalTempo = 25
    setTimeout(()=>{
      ddropsplash = true  
      ndropsplash = true  
    },1000)  
    
  }

  var snare = new Snare(synth.actx)
}