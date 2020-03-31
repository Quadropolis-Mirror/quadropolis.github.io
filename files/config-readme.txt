file for Cube

This is a "sniper" config. add the bottom of this doc to autoexec.cfg
Set the zoom using the mouse's scroll button. Then use the right mouse button to 
zoom in and out of your selected zoom distance.

All of the code/script in this is stolen from the configs here:
www.intergate.com/~spentron




//you WILL need to change your keymap to this:
//keymap -1 MOUSE1 "attack"
//keymap -3 MOUSE2 "resetfov"
//keymap -2 MOUSE3 "weapon"



// this part is stolen from:
// Cube autoexec by Bill Spencer (spentron@draac.com) 7/03, or modified
// WASD + dedicated mousezoom version

alias preffov 120      
fov $preffov        

alias delta_game_0 [ if (= $arg1 1) [ weapon 2 3 1 ] [ weapon 4 1 2 ] ]

alias zfov 120
alias delta_game_1 [
alias zfov (+ $zfov (* $arg1 (div $zfov -5)))
if (< $zfov 10) [ alias zfov 10 ]
if (> $zfov 120) [ alias zfov 120 ]
fov $zfov
]

// set your mouse sensitivity here:
alias msens 10      // similar number to quake

// mouse3 is toggle normal zoom & sensitivity:
alias resetfov [if (= $fov $preffov) [ fov $zfov; sensitivity $zsensit] [ fov $preffov; sensitivity $msens ] ]  
bind mouse3 resetfov                                // (mousewheel during game is zoom)

// some code 
alias msplus [ if (< $msens 200) [ alias msens (+ $msens 1); chgsens ] 
 if (= (* (div $sensitivity 11) 11) $sensitivity) [ echo ... use sensitivity 1 for invert ]
]
alias msminus [ if (< $msens 2) [ invmouse (- 1 $invmouse)
  echo invmouse $invmouse 
  echo ... press minus to change invert ] [ 
  alias msens (- $msens 1) ; chgsens ]
  if (< $msens 2) [ echo ... press minus to change invert ]
  ]
alias chgsens [ echo mousesens $msens msinvert $invmouse 
  // recalc reference fov
     alias cmpfov (div (* $preffov $msens) (+ $msens 1)) 
     if (< $cmpfov 90) [ alias cmpfov 90 ] [ alias cmpfov (+ $cmpfov 1) ]  
  alias zsensit (div (* $msens $zfov) $cmpfov)
  if (< $zsensit 1) [ alias zsensit 1 ]
  sensitivity $zsensit
  ]

// Aard's zoom + Bill's sensit. compensation
// initializations ... 
sensitivity $msens       // loads it 
alias zsensit $msens
alias zfov $preffov
// calculation of reference fov to avoid changing sensitivity for
//  small fov changes (since zoom can result in slight fov variations)
alias cmpfov (div (* $preffov $msens) (+ $msens 1)) 
if (< $cmpfov 90) [ alias cmpfov 90 ] [ alias cmpfov (+ $cmpfov 1) ]   // min is 90
// and the wheel script ...
alias delta_game_0 [
  alias zfov (+ $zfov (* $arg1 (div $zfov -10)))  // -5 is stock step factor
  if (< $zfov 10)  [ alias zfov 10 ]
  if (> $zfov 120) [ alias zfov 120 ]
  fov $zfov
  alias zsensit (div (* $msens $zfov) $cmpfov)
  if (< $zsensit 1) [ alias zsensit 1 ]
  sensitivity $zsensit
// uncomment next line to print zoom fov to screen:
//  echo fov $zfov
]


// * SETUP COMBO KEYS HERE * (keys Q Z E)
// ... change ingame function by changing only the part currently "weapon" commands 
alias xxz [ if $editing [ alias modifier 1 ] [ weapon 0 1 4 2 3 ] ]  // fist or least
alias xxq [ if $editing [ alias modifier 2 ] [ weapon 1 4 2 3 ] ]   // least effective guns
alias xxe [ if $editing [ alias modifier 3 ] [ weapon 2 4 1 0 ] ]   // best nonexplosive gun or fist