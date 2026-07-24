(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={crimson_double:{name:`Crimson Surge`,description:`Red bets deal 2.5x damage instead of 2.0x for the rest of the fight.`,cost:1,type:`payout`,rarity:`common`,effectId:`CRIMSON_SURGE`},dark_fury:{name:`Dark Fury`,description:`Black bets deal 2.5x damage instead of 2.0x for the rest of the fight.`,cost:1,type:`payout`,rarity:`common`,effectId:`DARK_FURY`},green_greed:{name:`Green Greed`,description:`Green bets deal 50x damage instead of 14x for the next 3 spins.`,cost:2,type:`payout`,rarity:`rare`,effectId:`GREEN_GREED`},lucky_seven:{name:`Lucky Number 7`,description:`Number 7 bets deal 200x damage for the rest of the fight.`,cost:2,type:`payout`,rarity:`rare`,effectId:`LUCKY_SEVEN`},scarlet_overflow:{name:`Scarlet Overflow`,description:`Red bets deal 3.0x damage, but Black bets deal 1.0x for the next 5 spins.`,cost:1,type:`payout`,rarity:`uncommon`,effectId:`SCARLET_OVERFLOW`},onyx_eclipse:{name:`Onyx Eclipse`,description:`Black bets deal 3.0x damage, but Red bets deal 1.0x for the next 5 spins.`,cost:1,type:`payout`,rarity:`uncommon`,effectId:`ONYX_ECLIPSE`},unlucky_thirteen:{name:`Unlucky 13`,description:`Number 13 bets deal 300x damage for the rest of the fight.`,cost:2,type:`payout`,rarity:`legendary`,effectId:`UNLUCKY_THIRTEEN`},prime_target:{name:`Prime Target`,description:`Prime number bets deal 3.5x damage for the next 3 spins.`,cost:2,type:`payout`,rarity:`uncommon`,effectId:`PRIME_TARGET`},high_roller:{name:`High Roller`,description:`High numbers (19-36) deal 2.5x damage for the next 3 spins.`,cost:1,type:`payout`,rarity:`common`,effectId:`HIGH_ROLLER`},low_sweep:{name:`Low Sweep`,description:`Low numbers (1-18) deal 2.5x damage for the next 3 spins.`,cost:1,type:`payout`,rarity:`common`,effectId:`LOW_SWEEP`},even_split:{name:`Even Split`,description:`Even numbers deal 2.5x damage for the next 3 spins.`,cost:1,type:`payout`,rarity:`common`,effectId:`EVEN_SPLIT`},odd_advantage:{name:`Odd Advantage`,description:`Odd numbers deal 2.5x damage for the next 3 spins.`,cost:1,type:`payout`,rarity:`common`,effectId:`ODD_ADVANTAGE`},first_dozen:{name:`First Dozen`,description:`Bets on Dozen 1-12 deal 3.5x damage for the next 3 spins.`,cost:2,type:`payout`,rarity:`uncommon`,effectId:`FIRST_DOZEN`},second_dozen:{name:`Second Dozen`,description:`Bets on Dozen 13-24 deal 3.5x damage for the next 3 spins.`,cost:2,type:`payout`,rarity:`uncommon`,effectId:`SECOND_DOZEN`},third_dozen:{name:`Third Dozen`,description:`Bets on Dozen 25-36 deal 3.5x damage for the next 3 spins.`,cost:2,type:`payout`,rarity:`uncommon`,effectId:`THIRD_DOZEN`},jackpot_trio:{name:`Jackpot Trio`,description:`Betting on 7, 11, or 21 deals 250x damage for the rest of the fight.`,cost:3,type:`payout`,rarity:`rare`,effectId:`JACKPOT_TRIO`},devils_trio:{name:`Devil's Trio`,description:`Betting on 6, 16, or 26 deals 250x damage for the rest of the fight.`,cost:3,type:`payout`,rarity:`rare`,effectId:`DEVILS_TRIO`},single_out:{name:`Single Out`,description:`Single number bets deal 40x damage for the next 3 spins.`,cost:2,type:`payout`,rarity:`common`,effectId:`SINGLE_OUT`},double_payout:{name:`Double Payout`,description:`Double the next successful number bet payout.`,cost:3,type:`payout`,rarity:`uncommon`,effectId:`DOUBLE_PAYOUT`},column_wave:{name:`Column Wave`,description:`Bets on Column 1 deal 4x damage for the next 3 spins.`,cost:2,type:`payout`,rarity:`uncommon`,effectId:`COLUMN_WAVE`},column_drift:{name:`Column Drift`,description:`Bets on Column 2 deal 4x damage for the next 3 spins.`,cost:2,type:`payout`,rarity:`uncommon`,effectId:`COLUMN_DRIFT`},column_apex:{name:`Column Apex`,description:`Bets on Column 3 deal 4x damage for the next 3 spins.`,cost:2,type:`payout`,rarity:`uncommon`,effectId:`COLUMN_APEX`},green_ripple:{name:`Green Ripple`,description:`Green bets deal +5x damage per active Green slot on the wheel.`,cost:1,type:`payout`,rarity:`uncommon`,effectId:`GREEN_RIPPLE`},golden_zero:{name:`Golden Zero`,description:`0 bets deal 300x damage for the rest of the fight.`,cost:3,type:`payout`,rarity:`rare`,effectId:`GOLDEN_ZERO`},friction_oil:{name:`Friction Oil`,description:`Halves friction for the next spin. Predicts a 7-slot sector (landed slots inside sector suffer a 70% payout penalty).`,cost:2,type:`physics`,rarity:`common`,effectId:`FRICTION_OIL`},lead_ball:{name:`Lead Ball`,description:`Double ball mass/friction. Bounces less and predicts a 5-slot landing sector.`,cost:2,type:`physics`,rarity:`uncommon`,effectId:`LEAD_BALL`},table_tilt:{name:`Wheel Tilt`,description:`Slightly tilts the roulette wheel, pulling the ball and predicting a 5-slot landing sector.`,cost:2,type:`physics`,rarity:`common`,effectId:`WHEEL_TILT`},magnetic_force:{name:`Lodestone Magnet`,description:`Grants 90% magnetic bias to land on a bet slot.`,cost:4,type:`physics`,rarity:`rare`,effectId:`LODESTONE_MAGNET`},predictive_sight:{name:`Predictive Sight`,description:`Predicts a 3-slot sector (landed slots inside sector suffer a 50% payout penalty).`,cost:3,type:`physics`,rarity:`uncommon`,effectId:`PREDICTIVE_SIGHT`},nudge_cheat:{name:`Nudge Cheat`,description:`Magnets shift outcome by up to ±3 slots towards bets to force a win.`,cost:3,type:`physics`,rarity:`rare`,effectId:`NUDGE_CHEAT`},ice_glaze:{name:`Ice Glaze`,description:`Reduces wheel friction to 0.1. Predicts a 9-slot sector (landed slots inside sector suffer a 70% payout penalty).`,cost:2,type:`physics`,rarity:`common`,effectId:`ICE_GLAZE`},sand_trap:{name:`Sand Trap`,description:`Quintuples friction. Ball stops almost instantly and predicts a tight 3-slot sector.`,cost:1,type:`physics`,rarity:`uncommon`,effectId:`SAND_TRAP`},heavy_core:{name:`Heavy Core`,description:`Increases ball mass by 5x (very low bounce). Predicts a tight 3-slot sector.`,cost:2,type:`physics`,rarity:`uncommon`,effectId:`HEAVY_CORE`},light_shell:{name:`Light Shell`,description:`Halves ball mass (heavy bounce). Predicts a wide 7-slot sector.`,cost:1,type:`physics`,rarity:`common`,effectId:`LIGHT_SHELL`},steep_slope:{name:`Steep Slope`,description:`Increases wheel tilt to maximum. Predicts a tight 3-slot sector.`,cost:2,type:`physics`,rarity:`uncommon`,effectId:`STEEP_SLOPE`},emp_pulse:{name:`Electromagnetic Pulse`,description:`100% bias to land in slots with bets, and draw 3 cards next turn.`,cost:4,type:`physics`,rarity:`rare`,effectId:`EMP_PULSE`},weak_magnet:{name:`Weak Magnet`,description:`20% bias to land in slots with bets. Predicts a 5-slot sector.`,cost:1,type:`physics`,rarity:`common`,effectId:`WEAK_MAGNET`},repulsion_coil:{name:`Repulsion Coil`,description:`Magnetically pushes ball away from Red slots. Predicts a 5-slot sector.`,cost:1,type:`physics`,rarity:`uncommon`,effectId:`REPULSION_COIL`},attraction_coil:{name:`Attraction Coil`,description:`Magnetically pulls ball towards Black slots. Predicts a 5-slot sector.`,cost:1,type:`physics`,rarity:`uncommon`,effectId:`ATTRACTION_COIL`},chaos_bounce:{name:`Chaos Bounce`,description:`Multiplies bounce randomness by 3x. Predicts a wide 9-slot sector.`,cost:1,type:`physics`,rarity:`common`,effectId:`CHAOS_BOUNCE`},sticky_track:{name:`Sticky Track`,description:`Reduces bounce randomness to 0. Predicts a tight 5-slot sector.`,cost:1,type:`physics`,rarity:`uncommon`,effectId:`STICKY_TRACK`},eagle_eye:{name:`Eagle Eye`,description:`Predicts a pinpoint 1-slot sector. Draw 1 card.`,cost:4,type:`physics`,rarity:`rare`,effectId:`EAGLE_EYE`},omniscience:{name:`Omniscience`,description:`Predicts a pinpoint 1-slot sector and deals 3x damage. Draw 2 cards and gain +3 actions (+12 Essence).`,cost:5,type:`physics`,rarity:`legendary`,effectId:`OMNISCIENCE`},broad_vision:{name:`Broad Vision`,description:`Highlights a wide 9-slot sector (landed slots inside sector suffer a 70% payout penalty).`,cost:2,type:`physics`,rarity:`common`,effectId:`BROAD_VISION`},focus_sight:{name:`Focus Sight`,description:`Highlights a 5-slot sector.`,cost:2,type:`physics`,rarity:`common`,effectId:`FOCUS_SIGHT`},predictive_sight_plus:{name:`Predictive Sight+`,description:`Highlights a tight 3-slot sector, but draw 1 less card next turn.`,cost:0,type:`physics`,rarity:`uncommon`,effectId:`PREDICTIVE_SIGHT_PLUS`},heavy_nudge:{name:`Heavy Nudge`,description:`Shifts outcome by up to ±5 slots to force a bet win. Gain 15 Essence on failure.`,cost:4,type:`physics`,rarity:`legendary`,effectId:`HEAVY_NUDGE`},micro_nudge:{name:`Micro Nudge`,description:`Shifts outcome by ±1 slot, but only if bet on that slot is >5.`,cost:1,type:`physics`,rarity:`uncommon`,effectId:`MICRO_NUDGE`},wind_tunnel:{name:`Wind Tunnel`,description:`Shifts final outcome in the direction of wheel rotation by +1 slot.`,cost:1,type:`physics`,rarity:`uncommon`,effectId:`WIND_TUNNEL`},triple_threat:{name:`Triple Threat`,description:`Spins 3 balls simultaneously on your wheel this turn.`,cost:3,type:`chaos`,rarity:`rare`,effectId:`TRIPLE_THREAT`},peg_splitter:{name:`Peg Splitter`,description:`When the ball hits a pin, it duplicates into 2 balls (max 6 active balls).`,cost:4,type:`chaos`,rarity:`legendary`,effectId:`PEG_SPLITTER`},shotgun_blast:{name:`Shotgun Blast`,description:`Spins 1 ball. After 1.5 seconds, it duplicates into a shotgun blast of 4 extra balls.`,cost:3,type:`chaos`,rarity:`rare`,effectId:`SHOTGUN_BLAST`},crimson_flood:{name:`Crimson Flood`,description:`Converts numbers 1 to 6 into Red on the wheel (increasing Red odds).`,cost:2,type:`board`,rarity:`uncommon`,effectId:`CRIMSON_FLOOD`},abyssal_darkness:{name:`Abyssal Darkness`,description:`Converts numbers 13 to 18 into Black on the wheel (increasing Black odds).`,cost:2,type:`board`,rarity:`uncommon`,effectId:`ABYSSAL_DARKNESS`},emerald_rift:{name:`Emerald Rift`,description:`Adds an extra Green slot (0 and 32 are both Green).`,cost:2,type:`board`,rarity:`uncommon`,effectId:`EMERALD_RIFT`},crimson_deluge:{name:`Crimson Deluge`,description:`Converts numbers 1 to 18 into Red on the wheel (half the wheel).`,cost:4,type:`board`,rarity:`rare`,effectId:`CRIMSON_DELUGE`},onyx_tsunami:{name:`Onyx Tsunami`,description:`Converts numbers 19 to 36 into Black on the wheel (half the wheel).`,cost:4,type:`board`,rarity:`rare`,effectId:`ONYX_TSUNAMI`},jade_path:{name:`Jade Path`,description:`Adds 4 extra Green slots (0, 5, 11, 17, 22, and 29 are Green).`,cost:5,type:`board`,rarity:`rare`,effectId:`JADE_PATH`},color_shift_red:{name:`Color Shift Red`,description:`Converts all Black slots under 15 to Red.`,cost:2,type:`board`,rarity:`uncommon`,effectId:`COLOR_SHIFT_RED`},color_shift_black:{name:`Color Shift Black`,description:`Converts all Red slots over 20 to Black.`,cost:2,type:`board`,rarity:`uncommon`,effectId:`COLOR_SHIFT_BLACK`},emerald_forest:{name:`Emerald Forest`,description:`Converts all prime numbers to Green and doubles Green payouts for this fight.`,cost:5,type:`board`,rarity:`legendary`,effectId:`EMERALD_FOREST`},monochrome:{name:`Monochrome`,description:`Swaps all colors: Red becomes Black, Black becomes Red.`,cost:1,type:`board`,rarity:`uncommon`,effectId:`MONOCHROME`},blood_spill:{name:`Blood Spill`,description:`Converts 3 random wheel slots to Red for the next 5 spins.`,cost:2,type:`board`,rarity:`uncommon`,effectId:`BLOOD_SPILL`},number_duplicate:{name:`Number Duplicate`,description:`Copies a neighboring number's bets onto another cell on the board.`,cost:1,type:`board`,rarity:`uncommon`,effectId:`NUMBER_DUPLICATE`},number_swap:{name:`Number Swap`,description:`Swaps values of two adjacent slots on the board.`,cost:1,type:`board`,rarity:`uncommon`,effectId:`NUMBER_SWAP`},lucky_zone:{name:`Lucky Zone`,description:`Mark a 3-slot zone on the board; bets on this zone deal +1.5x damage.`,cost:2,type:`board`,rarity:`uncommon`,effectId:`LUCKY_ZONE`},cursed_zone:{name:`Cursed Zone`,description:`Mark a 5-slot zone; if ball lands here, enemy is stunned for 2 turns.`,cost:3,type:`board`,rarity:`rare`,effectId:`CURSED_ZONE`},chip_mine:{name:`Chip Mine`,description:`Mark a number slot. If ball lands here, gain 15 chips.`,cost:2,type:`board`,rarity:`uncommon`,effectId:`CHIP_MINE`},zero_eclipse:{name:`Zero Eclipse`,description:`0 becomes a Black slot, and its payout becomes Red.`,cost:1,type:`board`,rarity:`uncommon`,effectId:`ZERO_ECLIPSE`},slot_expansion:{name:`Slot Expansion`,description:`Expands the landing sector width of all Green slots.`,cost:2,type:`board`,rarity:`uncommon`,effectId:`SLOT_EXPANSION`},mirror_slot:{name:`Mirror Slot`,description:`Mark one slot. If ball lands on the mirrored slot opposite it, you win too.`,cost:2,type:`board`,rarity:`uncommon`,effectId:`MIRROR_SLOT`},danger_zone:{name:`Danger Zone`,description:`Converts 5 slots into red spikes. If enemy lands there, they take 50 flat damage.`,cost:3,type:`board`,rarity:`rare`,effectId:`DANGER_ZONE`},gold_foil:{name:`Gold Foil`,description:`Mark 1 slot. Landing there multiplies that slot's damage by 10x.`,cost:4,type:`board`,rarity:`legendary`,effectId:`GOLD_FOIL`},copper_plate:{name:`Copper Plate`,description:`Mark 3 slots. Landing there multiplies their damage by 1.5x.`,cost:1,type:`board`,rarity:`common`,effectId:`COPPER_PLATE`},red_sea:{name:`Red Sea`,description:`Converts all Black slots into Red slots for the next spin.`,cost:3,type:`board`,rarity:`rare`,effectId:`RED_SEA`},onyx_void:{name:`Onyx Void`,description:`Converts all Red slots into Black slots for the next spin.`,cost:3,type:`board`,rarity:`rare`,effectId:`ONYX_VOID`},emerald_dream:{name:`Emerald Dream`,description:`Converts all Red and Black slots into Green slots for the next spin.`,cost:5,type:`board`,rarity:`legendary`,effectId:`EMERALD_DREAM`},double_down:{name:`Double Down`,description:`Double all bets placed, but double the enemy damage taken if you miss.`,cost:2,type:`utility`,rarity:`uncommon`,effectId:`DOUBLE_DOWN`},slow_spin:{name:`Calm Spin`,description:`Halves the wheel spin speed. Predicts a wide 7-slot sector.`,cost:1,type:`utility`,rarity:`common`,effectId:`CALM_SPIN`},essence_recycle:{name:`Identity Shift`,description:`Discard a card from your hand to draw 1 card for 0 cost.`,cost:1,type:`utility`,rarity:`uncommon`,effectId:`ESSENCE_RECYCLE`},risk_capital:{name:`Risk Capital`,description:`Gain 10 chips, but lose 2 chips per spin for the rest of the fight.`,cost:1,type:`utility`,rarity:`uncommon`,effectId:`RISK_CAPITAL`},insurance_policy:{name:`Insurance Policy`,description:`If you win this spin, gain 0 chips. If you lose, refund all chips bet.`,cost:1,type:`utility`,rarity:`uncommon`,effectId:`INSURANCE_POLICY`},compound_interest:{name:`Compound Interest`,description:`Gain chips equal to 50% of your current chip pool.`,cost:2,type:`utility`,rarity:`uncommon`,effectId:`COMPOUND_INTEREST`},quick_draw:{name:`Quick Draw`,description:`Draw 2 cards. Costs 1 chip instead of 2.`,cost:1,type:`utility`,rarity:`common`,effectId:`QUICK_DRAW`},heavy_draw:{name:`Heavy Draw`,description:`Draw 3 cards, but discard 1 card.`,cost:2,type:`utility`,rarity:`uncommon`,effectId:`HEAVY_DRAW`},deck_shuffle:{name:`Deck Shuffle`,description:`Shuffle discard pile back into draw pile. Draw 1 card.`,cost:0,type:`utility`,rarity:`common`,effectId:`DECK_SHUFFLE`},calculated_risk:{name:`Calculated Risk`,description:`Discard your entire hand. Draw that many cards.`,cost:1,type:`utility`,rarity:`uncommon`,effectId:`CALCULATED_RISK`},golden_mirror:{name:`Golden Mirror`,description:`Choose 1 card; add 2 temporary copies of it to hand with 0 cost.`,cost:3,type:`utility`,rarity:`rare`,effectId:`GOLDEN_MIRROR`},copy_paste:{name:`Copy Paste`,description:`Copy the last played non-utility card.`,cost:2,type:`utility`,rarity:`uncommon`,effectId:`COPY_PASTE`},recycle_bin:{name:`Recycle Bin`,description:`Retrieve 1 card from discard pile into your hand.`,cost:2,type:`utility`,rarity:`uncommon`,effectId:`RECYCLE_BIN`},retain_vision:{name:`Retain Vision`,description:`Choose 1 card in hand; it gets retained (stays in hand) permanently.`,cost:1,type:`utility`,rarity:`uncommon`,effectId:`RETAIN_VISION`},turbo_spin:{name:`Turbo Spin`,description:`Doubles wheel speed. Predicts 9-slot sector, but wins deal 1.5x damage.`,cost:1,type:`utility`,rarity:`uncommon`,effectId:`TURBO_SPIN`},stun_strike:{name:`Stun Strike`,description:`If you deal 5+ damage this turn, stun the enemy for 2 turns.`,cost:3,type:`utility`,rarity:`rare`,effectId:`STUN_STRIKE`},adrenaline_rush:{name:`Adrenaline Rush`,description:`Gain +3 actions/card plays this turn.`,cost:3,type:`utility`,rarity:`legendary`,effectId:`ADRENALINE_RUSH`},lucky_charm:{name:`Lucky Charm`,description:`Next spin outcome has 100% chance to be rerolled if it would result in a miss.`,cost:3,type:`utility`,rarity:`legendary`,effectId:`LUCKY_CHARM`},paint_red:{name:`Red Paint`,description:`Converts 5 random Black slots into Red slots for the round.`,cost:2,type:`paint`,rarity:`uncommon`,effectId:`PAINT_RED`},paint_black:{name:`Black Paint`,description:`Converts 5 random Red slots into Black slots for the round.`,cost:2,type:`paint`,rarity:`uncommon`,effectId:`PAINT_BLACK`},paint_green:{name:`Green Coat`,description:`Converts 3 random Red or Black slots into Green slots for the round.`,cost:3,type:`paint`,rarity:`uncommon`,effectId:`PAINT_GREEN`},paint_gold:{name:`Gold Glaze`,description:`Converts 2 random slots into Gold slots for the round.`,cost:4,type:`paint`,rarity:`rare`,effectId:`PAINT_GOLD`},paint_purple:{name:`Purple Dye`,description:`Converts 2 random slots into Purple slots for the round.`,cost:4,type:`paint`,rarity:`rare`,effectId:`PAINT_PURPLE`},paint_cyan:{name:`Cyan Tint`,description:`Converts 2 random slots into Cyan slots for the round.`,cost:4,type:`paint`,rarity:`rare`,effectId:`PAINT_CYAN`},paint_crimson:{name:`Crimson Spray`,description:`Converts 2 random slots into Crimson slots for the round.`,cost:4,type:`paint`,rarity:`rare`,effectId:`PAINT_CRIMSON`},paint_complementary:{name:`Complementary Splash`,description:`Converts all Black slots into Red slots for the round.`,cost:5,type:`paint`,rarity:`rare`,effectId:`PAINT_COMPLEMENTARY`},paint_inverse:{name:`Inverse Splash`,description:`Converts all Red slots into Black slots for the round.`,cost:5,type:`paint`,rarity:`rare`,effectId:`PAINT_INVERSE`},paint_single_digit:{name:`Single Digit Splash`,description:`Converts all single-digit slots (1-9) into Green slots for the round.`,cost:4,type:`paint`,rarity:`rare`,effectId:`PAINT_SINGLE_DIGIT`},paint_prime:{name:`Prime Coat`,description:`Converts all prime number slots on the wheel into Green slots for the round.`,cost:5,type:`paint`,rarity:`rare`,effectId:`PAINT_PRIME`},paint_high_gild:{name:`High Roller Gild`,description:`Converts all High slots (19-36) into Gold slots for the round.`,cost:6,type:`paint`,rarity:`legendary`,effectId:`PAINT_HIGH_GILD`},money_essence_chip:{name:`Essence Chip`,description:`Gain +4 action chips this turn. Exile.`,cost:0,type:`money`,rarity:`common`,effectId:`ESSENCE_CHIP`},money_chip_maker:{name:`Chip Maker`,description:`Add 3 temporary Essence Chips to your draw pile. Draw 1 card.`,cost:1,type:`money`,rarity:`common`,effectId:`CHIP_MAKER`},money_sacrifice:{name:`High Stakes Sacrifice`,description:`Gain +12 action chips, but sacrifices a random card in hand.`,cost:1,type:`money`,rarity:`uncommon`,effectId:`HIGH_STAKES_SACRIFICE`},money_tax_refund:{name:`Tax Refund`,description:`Gain +2 action chips for each Essence Chip card in your discard pile.`,cost:2,type:`money`,rarity:`uncommon`,effectId:`TAX_REFUND`},money_venture:{name:`Capital Venture`,description:`Add 5 temporary Essence Chips to your discard pile. Gain +25 shop chips at the end of the round if you win.`,cost:2,type:`money`,rarity:`rare`,effectId:`CAPITAL_VENTURE`},money_heist:{name:`Golden Heist`,description:`Add 2 temporary Essence Chips to your hand. When the ball lands on a Gold slot this turn, gain +30 shop chips.`,cost:3,type:`money`,rarity:`legendary`,effectId:`GOLDEN_HEIST`}};function t(){let t=Math.random(),n=`common`;n=t<.03?`legendary`:t<.12?`rare`:t<.4?`uncommon`:`common`;let r=Object.keys(e).filter(t=>e[t].rarity===n);if(r.length>0)return r[Math.floor(Math.random()*r.length)];let i=Object.keys(e);return i[Math.floor(Math.random()*i.length)]}function n(t){let n=e[t];if(!n)throw Error(`Card template not found: ${t}`);return{id:`${t}_${Math.random().toString(36).substr(2,9)}`,...n}}function r(e,t){let n=e;return t&&(n=n.replace(/\bincoming enemy damage\b/gi,`incoming opponent points`),n=n.replace(/\benemy damage\b/gi,`opponent points`),n=n.replace(/\bopponent damage\b/gi,`opponent points`),n=n.replace(/\bflat damage\b/gi,`flat PTS`),n=n.replace(/\bdealt damage\b/gi,`scored points`),n=n.replace(/\bdeal damage\b/gi,`score points`),n=n.replace(/\bdeals damage\b/gi,`scores points`),n=n.replace(/\bdeal (\d+x|\d+\+)?\s*damage\b/gi,(e,t)=>t?`score ${t} PTS`:`score PTS`),n=n.replace(/\bdeals (\d+x|\d+\+)?\s*damage\b/gi,(e,t)=>t?`scores ${t} PTS`:`scores PTS`),n=n.replace(/\bdamage dealt\b/gi,`points scored`),n=n.replace(/\bdamage taken\b/gi,`points taken`),n=n.replace(/\bdamage\b/g,`PTS`),n=n.replace(/\bDamage\b/g,`PTS`),n=n.replace(/\bdmg\b/gi,`PTS`),n=n.replace(/\bdeal\b/g,`score`),n=n.replace(/\bdeals\b/g,`scores`),n=n.replace(/\bdealt\b/g,`scored`),n=n.replace(/\bDeal\b/g,`Score`),n=n.replace(/\bDeals\b/g,`Scores`),n=n.replace(/\bDealt\b/g,`Scored`)),n}var i=class{static generateMap(e=7,t=3){let n=[];for(let r=0;r<e;r++){let i=[];if(r===e-1)i.push({id:`node_${r}_1`,type:`boss`,floor:r,lane:1,connections:[],completed:!1});else{let n=new Set,a=r===0?t:2+Math.floor(Math.random()*(t-1));for(;n.size<a;)n.add(Math.floor(Math.random()*t));Array.from(n).sort().forEach(t=>{let n=`combat`;if(r%4==3&&r<e-2)n=`elite`;else if(r%4==1&&r>1&&r<e-1)n=`shop`;else if(r>0){let e=Math.random();e<.2?n=`shop`:e<.4?n=`event`:e<.55&&(n=`forge`)}i.push({id:`node_${r}_${t}`,type:n,floor:r,lane:t,connections:[],completed:!1})})}n.push(i)}for(let t=0;t<e-1;t++){let e=n[t],r=n[t+1];e.forEach(e=>{let t=[...r].sort((t,n)=>Math.abs(t.lane-e.lane)-Math.abs(n.lane-e.lane));e.connections.push(t[0].id),t.length>1&&Math.random()<.4&&Math.abs(t[1].lane-e.lane)<=1&&e.connections.push(t[1].id)}),r.forEach(t=>{e.some(e=>e.connections.includes(t.id))||[...e].sort((e,n)=>Math.abs(e.lane-t.lane)-Math.abs(n.lane-t.lane))[0].connections.push(t.id)})}return n}},a=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26],o=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]),s=[2,3,5,7,11,13,17,19,23,29,31];function c(e,t,n){if(n){if(n.customSlotColors&&n.customSlotColors[e]!==void 0)return n.customSlotColors[e];if(n.convertAllToGold)return`gold`;if(n.convertAllToPurple)return`purple`;if(n.convertAllToCyan)return`cyan`;if(n.convertAllToCrimson)return`crimson`;if(n.convertNumbersToGold&&n.convertNumbersToGold.includes(e))return`gold`;if(n.convertNumbersToPurple&&n.convertNumbersToPurple.includes(e))return`purple`;if(n.convertNumbersToCyan&&n.convertNumbersToCyan.includes(e))return`cyan`;if(n.convertNumbersToCrimson&&n.convertNumbersToCrimson.includes(e))return`crimson`;if(n.convertNumbersToGreen&&n.convertNumbersToGreen.includes(e))return`green`;if(n.convertAllToRed){let n=c(e,t,void 0);if(n===`red`||n===`black`)return`red`}if(n.convertAllToBlack){let n=c(e,t,void 0);if(n===`red`||n===`black`)return`black`}if(n.convertAllToGreen){let n=c(e,t,void 0);if(n===`red`||n===`black`)return`green`}if(n.zeroEclipseActive&&e===0)return`black`;if(n.emeraldForestActive&&s.includes(e)||n.extraGreenSlots&&n.extraGreenSlots>3&&(e===5||e===17||e===29)||n.extraGreenSlots&&n.extraGreenSlots>1&&(e===11||e===22))return`green`;if(n.convertNumbersToRed&&n.convertNumbersToRed.includes(e))return n.monochromeActive?`black`:`red`;if(n.convertNumbersToBlack&&n.convertNumbersToBlack.includes(e))return n.monochromeActive?`red`:`black`;if(n.extraGreenSlots&&n.extraGreenSlots>0&&e===32)return`green`}let r=`green`;if(r=t&&t.colors&&t.colors[e]!==void 0?t.colors[e]:e===0?`green`:o.has(e)?`red`:`black`,n&&n.monochromeActive){if(r===`red`)return`black`;if(r===`black`)return`red`}return r}function l(e){return e}function u(e,t,n){return e===`red`||e===`black`||e===`green`?e:n.includes(t)||t===0||t===37?`green`:o.has(t)?`red`:`black`}function d(e,t){switch(e){case`gold`:return{description:`GOLD — Transformed slots to Gold and gained +15 PTS!`,type:`gold_points`};case`purple`:return{description:`PURPLE CURSE — Gained +20 PTS and stunned opponent!`,type:`purple_curse`};case`cyan`:return{description:`CYAN ESSENCE — Gained +10 PTS, refilled chips, and drew 2 cards!`,type:`cyan_shield`};case`crimson`:return t?{description:`CRIMSON — Currently losing! 12x payout multiplier!`,type:`crimson_active`}:{description:`CRIMSON — Currently winning/tied. 6x payout multiplier`,type:`crimson_inactive`};default:return null}}var f={id:`classic`,name:`Default`,description:``,numbers:a,greenNumbers:[0],colors:{},payoutMultipliers:{red:2,black:2,green:14,number:36,odd:2,even:2},upgrades:[]},p=class{wheelAngle=0;wheelOmega=0;ballAngle=0;ballOmega=0;ballRadius=1;ballHeight=.1;isSettled=!1;settledSlotIndex=-1;balls=[];nextBallId=1;justHitPin=!1;justHitDivider=!1;ballRadVel=0;ballHeightVel=0;R_OUTER=1;R_INNER=.65;BALL_DECAY=2.4;WHEEL_DECAY=.45;phase=`outer`;mods;biasTargetAngle=-1;winningTargets=[];wheelNumbers=a;slotCount=37;greenNumbers=[0];random=Math.random;constructor(){this.reset(f,{spinSpeed:1,ballMass:1,friction:1,bounceRandomness:.1,wheelTilt:0,targetZoneBias:0,predictionSize:0,nudgeCheatActive:!1})}reset(e,t,n,r,i,a,o,s){this.mods=t,this.winningTargets=n||[],this.wheelNumbers=e.numbers,this.slotCount=e.numbers.length,this.greenNumbers=e.greenNumbers,this.isSettled=!1,this.settledSlotIndex=-1,this.justHitPin=!1,this.justHitDivider=!1,this.ballRadVel=0,this.ballHeightVel=0,this.phase=`outer`,this.ballRadius=this.R_OUTER,this.ballHeight=.15,this.balls=[],this.nextBallId=1;let l=r===void 0?Math.random()*Math.PI*2:r,u=i===void 0?Math.random()*Math.PI*2:i,d=a===void 0?2+Math.random()*1.5:a,f=o===void 0?-10-Math.random()*5:o,p=l+u*100,m=d*1e3+f*1e5,h=Math.abs(p+m),g=Math.floor(h)%2147483647;g<=0&&(g=12345),this.random=()=>{let e=g+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296},this.wheelOmega=d*t.spinSpeed,this.wheelAngle=l,this.biasTargetAngle=-1;let _=[...this.winningTargets];if(t.biasRedOnly&&(_=_.filter(t=>c(t,e,s)===`red`)),t.biasBlackOnly&&(_=_.filter(t=>c(t,e,s)===`black`)),t.targetZoneBias>0&&_.length>0){let e=_[Math.floor(this.random()*_.length)],t=this.wheelNumbers.indexOf(e);t>=0&&(this.biasTargetAngle=t*(Math.PI*2/this.slotCount))}let v=t.multiballCount||1,y=f/Math.sqrt(t.ballMass);for(let e=0;e<v;e++){let n=(u+e*(Math.PI*2/v))%(Math.PI*2);this.balls.push({id:this.nextBallId++,ballAngle:n,ballOmega:y,ballRadius:this.R_OUTER,ballHeight:.15,ballRadVel:0,ballHeightVel:0,isSettled:!1,settledSlotIndex:-1,phase:`outer`,shotgunTimer:t.shotgunTime?t.shotgunTime:void 0})}if(this.balls.length>0){let e=this.balls[0];this.ballAngle=e.ballAngle,this.ballOmega=e.ballOmega,this.ballRadius=e.ballRadius,this.ballHeight=e.ballHeight,this.ballRadVel=e.ballRadVel,this.ballHeightVel=e.ballHeightVel,this.isSettled=!1,this.settledSlotIndex=-1,this.phase=e.phase}}update(e){this.wheelAngle=(this.wheelAngle+this.wheelOmega*e)%(Math.PI*2),this.balls.length>0&&this.balls.every(e=>e.isSettled)?this.wheelOmega=Math.max(0,this.wheelOmega-this.WHEEL_DECAY*this.mods.friction*e):this.wheelOmega=Math.max(.15,this.wheelOmega-this.WHEEL_DECAY*this.mods.friction*e),this.justHitPin=!1,this.justHitDivider=!1;let t=this.balls.length;for(let n=0;n<t;n++){let t=this.balls[n];if(t.isSettled){let e=Math.PI*2/this.slotCount,n=t.settledSlotIndex*e;t.ballAngle=(this.wheelAngle+n)%(Math.PI*2),t.ballAngle<0&&(t.ballAngle+=Math.PI*2),t.ballRadius=this.R_INNER,t.ballHeight=.02,t.ballOmega=this.wheelOmega;continue}if(t.splitCooldown!==void 0&&t.splitCooldown>0&&(t.splitCooldown-=e),t.shotgunTimer!==void 0&&(t.shotgunTimer-=e,t.shotgunTimer<=0)){t.shotgunTimer=void 0;for(let e=0;e<4&&!(this.balls.length>=8);e++){let n=(e-1.5)*.15,r=(t.ballAngle+n)%(Math.PI*2),i=t.ballOmega*(.8+this.random()*.4),a=t.ballRadVel+(this.random()-.5)*1.5,o=t.ballHeightVel+this.random()*2+1;this.balls.push({id:this.nextBallId++,ballAngle:r,ballOmega:i,ballRadius:t.ballRadius,ballHeight:t.ballHeight,ballRadVel:a,ballHeightVel:o,isSettled:!1,settledSlotIndex:-1,phase:`dropping`})}}let r=this.BALL_DECAY*this.mods.friction;if(t.ballRadius>.88)t.ballOmega>0?t.ballOmega=Math.max(0,t.ballOmega-r*e):t.ballOmega=Math.min(0,t.ballOmega+r*e);else{let n=t.ballOmega-this.wheelOmega,r=1.8*this.mods.friction;t.ballOmega-=n*r*e}if(this.mods.wheelTilt>0){let n=Math.PI*.5-t.ballAngle,r=Math.sin(n)*this.mods.wheelTilt*6.5;t.ballOmega+=r*e}let i=t.ballOmega*t.ballOmega*t.ballRadius,a=9;if(t.ballRadius>.92?a=3:t.ballRadius>.78&&(a=4.5),this.mods.targetZoneBias>0&&this.biasTargetAngle>=0&&t.ballRadius<.9){let n=t.ballAngle-this.wheelAngle;n<0&&(n+=Math.PI*2),n%=Math.PI*2;let r=this.biasTargetAngle-n;r=Math.atan2(Math.sin(r),Math.cos(r)),t.ballOmega+=Math.sin(r)*this.mods.targetZoneBias*25*e,a+=this.mods.targetZoneBias*8}t.ballRadVel+=(i-a)*e,t.ballRadVel=Math.max(-4,Math.min(4,t.ballRadVel)),t.ballRadius+=t.ballRadVel*e,t.ballRadius>=this.R_OUTER?(t.ballRadius=this.R_OUTER,t.ballRadVel=-Math.abs(t.ballRadVel)*.15):t.ballRadius<=this.R_INNER&&(t.ballRadius=this.R_INNER,t.ballRadVel=Math.abs(t.ballRadVel)*.25),t.ballHeightVel-=18*e,t.ballHeight+=t.ballHeightVel*e;let o=.02;if(t.ballRadius>.88?o=.15:t.ballRadius>this.R_INNER&&(o=.02+.13*((t.ballRadius-this.R_INNER)/(.88-this.R_INNER))),t.ballHeight<=o){t.ballHeight=o;let e=.35/Math.sqrt(this.mods.ballMass);t.ballHeightVel=-t.ballHeightVel*e,t.ballRadVel*=.7}let s=t.ballAngle;if(t.ballAngle+=t.ballOmega*e,t.ballAngle<0&&(t.ballAngle+=Math.PI*2),t.ballAngle%=Math.PI*2,t.ballRadius>.88){let e=Math.PI/8;Math.floor(s/e)!==Math.floor(t.ballAngle/e)&&(this.justHitDivider=!0,t.phase=`outer`)}let c=this.mods.splitPegActive?.93:.9,l=this.mods.splitPegActive?.75:.78;if(t.ballRadius<c&&t.ballRadius>l){let e=Math.PI*2/8,n=.82,r=(this.mods.splitPegActive?.065:.035)+(this.mods.splitPegActive?.025:.015);for(let i=0;i<8;i++){let a=i*e,o=n*Math.cos(a),s=n*Math.sin(a),c=t.ballRadius*Math.cos(t.ballAngle),l=t.ballRadius*Math.sin(t.ballAngle),u=c-o,d=l-s,f=Math.sqrt(u*u+d*d);if(f<r){this.justHitPin=!0,t.phase=`dropping`;let e=u/f,n=d/f,i=o+e*r*1.05,a=s+n*r*1.05;t.ballRadius=Math.sqrt(i*i+a*a),t.ballAngle=Math.atan2(a,i),t.ballAngle<0&&(t.ballAngle+=Math.PI*2);let c=(Math.abs(t.ballOmega)*.35+.5)/Math.sqrt(this.mods.ballMass);if(t.ballRadVel=e*c*1.2,t.ballOmega=-t.ballOmega*.45+(this.random()-.5)*this.mods.bounceRandomness*18,t.ballHeightVel=c*.8,this.mods.splitPegActive&&this.balls.length<6&&(!t.splitCooldown||t.splitCooldown<=0)){t.splitCooldown=.3;let e=-t.ballOmega,n=-t.ballRadVel,r=t.ballHeightVel*.9,i=(t.ballAngle+.05)%(Math.PI*2);this.balls.push({id:this.nextBallId++,ballAngle:i,ballOmega:e,ballRadius:t.ballRadius,ballHeight:t.ballHeight,ballRadVel:n,ballHeightVel:r,isSettled:!1,settledSlotIndex:-1,phase:`bouncing`,splitCooldown:.3})}break}}}let u=Math.PI*2/this.slotCount;if(t.ballRadius<.78){let e=t.ballAngle-this.wheelAngle;e<0&&(e+=Math.PI*2),e%=Math.PI*2;let n=((e-u*.5)%u+u)%u,r=.04,i=n<r,a=n>u-r;if((i||a)&&t.ballHeight-o<.025){this.justHitDivider=!0,t.phase=`bouncing`;let n=t.ballOmega-this.wheelOmega,a=.4/Math.sqrt(this.mods.ballMass);if(t.ballOmega=this.wheelOmega-n*a+(this.random()-.5)*this.mods.bounceRandomness*8,t.ballHeightVel=Math.max(.1,Math.abs(n)*.15),t.ballRadVel=Math.max(.1,Math.abs(n)*.2),i?e+=r*1.05:e-=r*1.05,t.ballAngle=(this.wheelAngle+e)%(Math.PI*2),t.ballAngle<0&&(t.ballAngle+=Math.PI*2),this.mods.splitPegActive&&this.balls.length<6&&(!t.splitCooldown||t.splitCooldown<=0)){t.splitCooldown=.35;let e=-t.ballOmega,n=-t.ballRadVel,r=t.ballHeightVel*.9,i=(t.ballAngle+.05)%(Math.PI*2);this.balls.push({id:this.nextBallId++,ballAngle:i,ballOmega:e,ballRadius:t.ballRadius,ballHeight:t.ballHeight,ballRadVel:n,ballHeightVel:r,isSettled:!1,settledSlotIndex:-1,phase:`bouncing`,splitCooldown:.35})}}}let d=Math.abs(t.ballOmega-this.wheelOmega);if(t.ballRadius<=this.R_INNER+.04&&t.ballHeight<=.021&&d<.8&&Math.abs(t.ballRadVel)<.15){let e=t.ballAngle-this.wheelAngle;e<0&&(e+=Math.PI*2),e%=Math.PI*2;let n=(Math.floor((e+u*.5)/u)%this.slotCount+this.slotCount)%this.slotCount;if(this.mods.nudgeCheatActive&&this.winningTargets.length>0){let e=this.wheelNumbers[n];if(!this.winningTargets.includes(e)){let e=this.mods.nudgeDistance||1,t=-1;for(let r=1;r<=e;r++){let e=(n-r+this.slotCount)%this.slotCount,i=this.wheelNumbers[e];if(this.winningTargets.includes(i)){t=e;break}let a=(n+r+this.slotCount)%this.slotCount,o=this.wheelNumbers[a];if(this.winningTargets.includes(o)){t=a;break}}t!==-1&&(n=t)}}t.settledSlotIndex=n,t.isSettled=!0,t.phase=`settled`}}if(this.balls.length>0){let e=this.balls[0];this.ballAngle=e.ballAngle,this.ballOmega=e.ballOmega,this.ballRadius=e.ballRadius,this.ballHeight=e.ballHeight,this.ballRadVel=e.ballRadVel,this.ballHeightVel=e.ballHeightVel,this.isSettled=this.balls.every(e=>e.isSettled),this.settledSlotIndex=e.settledSlotIndex,this.phase=e.phase}else this.isSettled=!0}getWinningNumber(){return!this.isSettled||this.balls.length===0?-1:this.wheelNumbers[this.balls[0].settledSlotIndex]}getWinningNumbers(){return this.isSettled?this.balls.map(e=>this.wheelNumbers[e.settledSlotIndex]):[]}},m=[2,3,5,7,11,13,17,19,23,29,31],h=class{static applyEffect(e,t,r){let i=r.boardModifiers.freeCardsActive?0:e.cost;if(r.chipsPool<i)return!1;switch(r.chipsPool-=i,r.boardModifiers.dozenMultipliers||(r.boardModifiers.dozenMultipliers={}),r.boardModifiers.columnMultipliers||(r.boardModifiers.columnMultipliers={}),r.boardModifiers.customNumberMultipliers||(r.boardModifiers.customNumberMultipliers={}),r.boardModifiers.luckyZones||(r.boardModifiers.luckyZones=[]),r.boardModifiers.cursedZones||(r.boardModifiers.cursedZones=[]),r.boardModifiers.chipMines||(r.boardModifiers.chipMines={}),r.boardModifiers.lifeFountains||(r.boardModifiers.lifeFountains={}),r.boardModifiers.dangerZones||(r.boardModifiers.dangerZones={}),r.boardModifiers.goldFoils||(r.boardModifiers.goldFoils=[]),r.boardModifiers.copperPlates||(r.boardModifiers.copperPlates=[]),r.boardModifiers.mirrorSlots||(r.boardModifiers.mirrorSlots={}),r.boardModifiers.convertNumbersToGreen||(r.boardModifiers.convertNumbersToGreen=[]),r.boardModifiers.convertNumbersToGold||(r.boardModifiers.convertNumbersToGold=[]),r.boardModifiers.convertNumbersToPurple||(r.boardModifiers.convertNumbersToPurple=[]),r.boardModifiers.convertNumbersToCyan||(r.boardModifiers.convertNumbersToCyan=[]),r.boardModifiers.convertNumbersToCrimson||(r.boardModifiers.convertNumbersToCrimson=[]),e.effectId){case`CRIMSON_SURGE`:r.boardModifiers.payoutMultipliers.red=2.5;break;case`DARK_FURY`:r.boardModifiers.payoutMultipliers.black=2.5;break;case`GREEN_GREED`:r.boardModifiers.payoutMultipliers.green=50,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.greenMultiplier=3;break;case`LUCKY_SEVEN`:r.boardModifiers.customNumberMultipliers[7]=200;break;case`SCARLET_OVERFLOW`:r.boardModifiers.payoutMultipliers.red=3,r.boardModifiers.payoutMultipliers.black=1,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.scarletOverflow=5;break;case`ONYX_ECLIPSE`:r.boardModifiers.payoutMultipliers.black=3,r.boardModifiers.payoutMultipliers.red=1,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.onyxEclipse=5;break;case`UNLUCKY_THIRTEEN`:r.boardModifiers.customNumberMultipliers[13]=300;break;case`PRIME_TARGET`:r.boardModifiers.primeMultiplier=3.5,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.primeMultiplier=3;break;case`HIGH_ROLLER`:r.boardModifiers.highMultiplier=2.5,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.highMultiplier=3;break;case`LOW_SWEEP`:r.boardModifiers.lowMultiplier=2.5,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.lowMultiplier=3;break;case`EVEN_SPLIT`:r.boardModifiers.payoutMultipliers.even=2.5,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.evenMultiplier=3;break;case`ODD_ADVANTAGE`:r.boardModifiers.payoutMultipliers.odd=2.5,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.oddMultiplier=3;break;case`FIRST_DOZEN`:r.boardModifiers.dozenMultipliers[1]=3.5,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.dozenMultiplier_1=3;break;case`SECOND_DOZEN`:r.boardModifiers.dozenMultipliers[2]=3.5,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.dozenMultiplier_2=3;break;case`THIRD_DOZEN`:r.boardModifiers.dozenMultipliers[3]=3.5,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.dozenMultiplier_3=3;break;case`JACKPOT_TRIO`:r.boardModifiers.customNumberMultipliers[7]=250,r.boardModifiers.customNumberMultipliers[11]=250,r.boardModifiers.customNumberMultipliers[21]=250;break;case`DEVILS_TRIO`:r.boardModifiers.customNumberMultipliers[6]=250,r.boardModifiers.customNumberMultipliers[16]=250,r.boardModifiers.customNumberMultipliers[26]=250;break;case`SINGLE_OUT`:r.boardModifiers.payoutMultipliers.number=40,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.singleOutMultiplier=3;break;case`DOUBLE_PAYOUT`:r.boardModifiers.doubleNextPayout=!0;break;case`COLUMN_WAVE`:r.boardModifiers.columnMultipliers[1]=4,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.columnMultiplier_1=3;break;case`COLUMN_DRIFT`:r.boardModifiers.columnMultipliers[2]=4,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.columnMultiplier_2=3;break;case`COLUMN_APEX`:r.boardModifiers.columnMultipliers[3]=4,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.columnMultiplier_3=3;break;case`GREEN_RIPPLE`:break;case`GOLDEN_ZERO`:r.boardModifiers.customNumberMultipliers[0]=300;break;case`LUCKY_INDEX`:r.boardModifiers.globalMultiplier=1.2,r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.globalMultiplier=3;break;case`RED_STREAK`:r.boardModifiers.redStreakActive=!0,r.boardModifiers.redStreakCount=r.boardModifiers.redStreakCount||0;break;case`BLACK_STREAK`:r.boardModifiers.blackStreakActive=!0,r.boardModifiers.blackStreakCount=r.boardModifiers.blackStreakCount||0;break;case`SPLIT_BETS`:break;case`FRICTION_OIL`:r.physicsModifiers.friction=Math.max(.3,r.physicsModifiers.friction*.65),r.physicsModifiers.predictionSize=7;break;case`LEAD_BALL`:r.physicsModifiers.ballMass=2,r.physicsModifiers.friction*=2,r.physicsModifiers.predictionSize=5;break;case`WHEEL_TILT`:r.physicsModifiers.wheelTilt=.15,r.physicsModifiers.predictionSize=5;break;case`LODESTONE_MAGNET`:r.physicsModifiers.targetZoneBias=Math.max(r.physicsModifiers.targetZoneBias,.9);break;case`PREDICTIVE_SIGHT`:r.physicsModifiers.predictionSize=3;break;case`NUDGE_CHEAT`:r.physicsModifiers.nudgeCheatActive=!0,r.physicsModifiers.nudgeDistance=3;break;case`ICE_GLAZE`:r.physicsModifiers.friction=.3,r.physicsModifiers.predictionSize=9;break;case`SAND_TRAP`:r.physicsModifiers.friction=5,r.physicsModifiers.predictionSize=3;break;case`HEAVY_CORE`:r.physicsModifiers.ballMass=5,r.physicsModifiers.predictionSize=3;break;case`LIGHT_SHELL`:r.physicsModifiers.ballMass=.5,r.physicsModifiers.predictionSize=7;break;case`STEEP_SLOPE`:r.physicsModifiers.wheelTilt=.35,r.physicsModifiers.predictionSize=3;break;case`EMP_PULSE`:r.physicsModifiers.targetZoneBias=1,r.discardPile.push(...r.hand),r.hand=[],r.boardModifiers.empPulseDrawNext=3;break;case`WEAK_MAGNET`:r.physicsModifiers.targetZoneBias=.2,r.physicsModifiers.predictionSize=5;break;case`REPULSION_COIL`:r.physicsModifiers.biasBlackOnly=!0,r.physicsModifiers.predictionSize=5;break;case`ATTRACTION_COIL`:r.physicsModifiers.biasRedOnly=!0,r.physicsModifiers.predictionSize=5;break;case`CHAOS_BOUNCE`:r.physicsModifiers.bounceRandomness=.3,r.physicsModifiers.predictionSize=9;break;case`STICKY_TRACK`:r.physicsModifiers.bounceRandomness=0,r.physicsModifiers.predictionSize=5;break;case`EAGLE_EYE`:r.physicsModifiers.predictionSize=1,r.drawPile.length===0&&r.discardPile.length>0&&(r.drawPile=[...r.discardPile].sort(()=>Math.random()-.5),r.discardPile=[]),r.drawPile.length>0&&r.hand.push(r.drawPile.pop());break;case`OMNISCIENCE`:r.physicsModifiers.predictionSize=1,r.boardModifiers.omniscienceDamageMult=3,r.chipsPool+=12;for(let e=0;e<2;e++)r.drawPile.length===0&&r.discardPile.length>0&&(r.drawPile=[...r.discardPile].sort(()=>Math.random()-.5),r.discardPile=[]),r.drawPile.length>0&&r.hand.push(r.drawPile.pop());break;case`BROAD_VISION`:r.physicsModifiers.predictionSize=9;break;case`FOCUS_SIGHT`:r.physicsModifiers.predictionSize=5;break;case`PREDICTIVE_SIGHT_PLUS`:r.physicsModifiers.predictionSize=3,r.boardModifiers.predictiveSightPlusActive=!0;break;case`HEAVY_NUDGE`:r.physicsModifiers.nudgeCheatActive=!0,r.physicsModifiers.nudgeDistance=5;break;case`MICRO_NUDGE`:r.physicsModifiers.nudgeCheatActive=!0,r.physicsModifiers.nudgeDistance=1;break;case`WIND_TUNNEL`:r.physicsModifiers.nudgeCheatActive=!0,r.physicsModifiers.nudgeDistance=1;break;case`TRIPLE_THREAT`:r.physicsModifiers.multiballCount=3;break;case`PEG_SPLITTER`:r.physicsModifiers.splitPegActive=!0;break;case`SHOTGUN_BLAST`:r.physicsModifiers.shotgunTime=1.5;break;case`CRIMSON_FLOOD`:for(let e=1;e<=6;e++)r.boardModifiers.convertNumbersToRed.includes(e)||r.boardModifiers.convertNumbersToRed.push(e);break;case`ABYSSAL_DARKNESS`:for(let e=13;e<=18;e++)r.boardModifiers.convertNumbersToBlack.includes(e)||r.boardModifiers.convertNumbersToBlack.push(e);break;case`EMERALD_RIFT`:r.boardModifiers.extraGreenSlots+=1,r.boardModifiers.convertNumbersToRed=r.boardModifiers.convertNumbersToRed.filter(e=>e!==32),r.boardModifiers.convertNumbersToBlack=r.boardModifiers.convertNumbersToBlack.filter(e=>e!==32);break;case`CRIMSON_DELUGE`:for(let e=1;e<=18;e++)r.boardModifiers.convertNumbersToRed.includes(e)||r.boardModifiers.convertNumbersToRed.push(e);break;case`ONYX_TSUNAMI`:for(let e=19;e<=36;e++)r.boardModifiers.convertNumbersToBlack.includes(e)||r.boardModifiers.convertNumbersToBlack.push(e);break;case`JADE_PATH`:r.boardModifiers.extraGreenSlots+=4;break;case`COLOR_SHIFT_RED`:for(let e=1;e<15;e++)r.boardModifiers.convertNumbersToRed.includes(e)||r.boardModifiers.convertNumbersToRed.push(e);break;case`COLOR_SHIFT_BLACK`:for(let e=20;e<=36;e++)r.boardModifiers.convertNumbersToBlack.includes(e)||r.boardModifiers.convertNumbersToBlack.push(e);break;case`EMERALD_FOREST`:r.boardModifiers.emeraldForestActive=!0;break;case`MONOCHROME`:r.boardModifiers.monochromeActive=!0;break;case`BLOOD_SPILL`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<3;e++){let e=Math.floor(Math.random()*37);t.includes(e)||t.push(e)}e.markedSlots=t}r.boardModifiers.bloodSpillSlots||(r.boardModifiers.bloodSpillSlots=[]),e.markedSlots.forEach(e=>{r.boardModifiers.convertNumbersToRed.includes(e)||(r.boardModifiers.convertNumbersToRed.push(e),r.boardModifiers.bloodSpillSlots.push(e))}),r.boardModifiers.tempDurations||(r.boardModifiers.tempDurations={}),r.boardModifiers.tempDurations.bloodSpill=5;break;case`NUMBER_DUPLICATE`:break;case`NUMBER_SWAP`:break;case`LUCKY_ZONE`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<3;e++)t.push(Math.floor(Math.random()*37));e.markedSlots=t}r.boardModifiers.luckyZones.push(...e.markedSlots);break;case`CURSED_ZONE`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<5;e++)t.push(Math.floor(Math.random()*37));e.markedSlots=t}r.boardModifiers.cursedZones.push(...e.markedSlots);break;case`CHIP_MINE`:(!e.markedSlots||e.markedSlots.length===0)&&(e.markedSlots=[Math.floor(Math.random()*37)]),r.boardModifiers.chipMines[e.markedSlots[0]]=15;break;case`ZERO_ECLIPSE`:r.boardModifiers.zeroEclipseActive=!0;break;case`SLOT_EXPANSION`:break;case`MIRROR_SLOT`:r.boardModifiers.mirrorSlots[0]=36,r.boardModifiers.mirrorSlots[36]=0;break;case`DANGER_ZONE`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<5;e++)t.push(Math.floor(Math.random()*37));e.markedSlots=t}e.markedSlots.forEach(e=>{r.boardModifiers.dangerZones[e]=50});break;case`GOLD_FOIL`:(!e.markedSlots||e.markedSlots.length===0)&&(e.markedSlots=[Math.floor(Math.random()*37)]),r.boardModifiers.goldFoils.push(...e.markedSlots);break;case`COPPER_PLATE`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<3;e++)t.push(Math.floor(Math.random()*37));e.markedSlots=t}r.boardModifiers.copperPlates.push(...e.markedSlots);break;case`RED_SEA`:r.boardModifiers.convertAllToRed=!0;break;case`ONYX_VOID`:r.boardModifiers.convertAllToBlack=!0;break;case`EMERALD_DREAM`:r.boardModifiers.convertAllToGreen=!0;break;case`DOUBLE_DOWN`:r.boardModifiers.payoutMultipliers.red*=2,r.boardModifiers.payoutMultipliers.black*=2,r.boardModifiers.payoutMultipliers.green*=2,r.boardModifiers.payoutMultipliers.number*=2,r.boardModifiers.payoutMultipliers.odd*=2,r.boardModifiers.payoutMultipliers.even*=2,r.enemy.intent.value*=2,r.enemy.intent.description+=` (Doubled Down!)`;break;case`CALM_SPIN`:r.physicsModifiers.spinSpeed=.5,r.physicsModifiers.predictionSize=7;break;case`ESSENCE_RECYCLE`:if(r.hand.length>0){let e=Math.floor(Math.random()*r.hand.length),t=r.hand.splice(e,1)[0];if(r.discardPile.push(t),r.drawPile.length===0&&r.discardPile.length>0&&(r.drawPile=[...r.discardPile].sort(()=>Math.random()-.5),r.discardPile=[]),r.drawPile.length>0){let e=r.drawPile.pop();r.hand.push(e)}}else return!1;break;case`RISK_CAPITAL`:r.chipsPool+=10,r.boardModifiers.riskCapitalActive=!0;break;case`INSURANCE_POLICY`:r.boardModifiers.insuranceActive=!0;break;case`COMPOUND_INTEREST`:r.chipsPool+=Math.floor(r.chipsPool*.5);break;case`QUICK_DRAW`:for(let e=0;e<2;e++)r.drawPile.length===0&&r.discardPile.length>0&&(r.drawPile=[...r.discardPile].sort(()=>Math.random()-.5),r.discardPile=[]),r.drawPile.length>0&&r.hand.push(r.drawPile.pop());break;case`HEAVY_DRAW`:for(let e=0;e<3;e++)r.drawPile.length===0&&r.discardPile.length>0&&(r.drawPile=[...r.discardPile].sort(()=>Math.random()-.5),r.discardPile=[]),r.drawPile.length>0&&r.hand.push(r.drawPile.pop());if(r.hand.length>0){let e=Math.floor(Math.random()*r.hand.length);r.discardPile.push(r.hand.splice(e,1)[0])}break;case`DECK_SHUFFLE`:r.discardPile.length>0&&(r.drawPile.push(...r.discardPile),r.drawPile.sort(()=>Math.random()-.5),r.discardPile=[]),r.drawPile.length>0&&r.hand.push(r.drawPile.pop());break;case`CALCULATED_RISK`:let t=r.hand.length;r.discardPile.push(...r.hand),r.hand=[];for(let e=0;e<t;e++)r.drawPile.length===0&&r.discardPile.length>0&&(r.drawPile=[...r.discardPile].sort(()=>Math.random()-.5),r.discardPile=[]),r.drawPile.length>0&&r.hand.push(r.drawPile.pop());break;case`GOLDEN_MIRROR`:if(r.hand.length>0){let e=Math.floor(Math.random()*r.hand.length),t=r.hand[e];for(let e=0;e<2;e++)r.hand.push({...t,cost:0,id:`${t.effectId}_temp_${Math.random().toString(36).substr(2,9)}`})}break;case`COPY_PASTE`:let i=r.activePlayedCards&&r.activePlayedCards.length>0?r.activePlayedCards[r.activePlayedCards.length-1]:null;i&&r.hand.push({...i,id:`${i.effectId}_copy_${Math.random().toString(36).substr(2,9)}`});break;case`RECYCLE_BIN`:if(r.discardPile.length>0){let e=Math.floor(Math.random()*r.discardPile.length);r.hand.push(r.discardPile.splice(e,1)[0])}break;case`RETAIN_VISION`:r.hand.length>0&&(r.hand[0].isRetained=!0);break;case`TURBO_SPIN`:r.physicsModifiers.spinSpeed=2,r.physicsModifiers.predictionSize=9;break;case`STUN_STRIKE`:break;case`ADRENALINE_RUSH`:r.chipsPool+=12;break;case`LUCKY_CHARM`:break;case`PAINT_RED`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<=36;e++)c(e,r.playerWheel,r.boardModifiers)===`black`&&t.push(e);e.markedSlots=[...t].sort(()=>Math.random()-.5).slice(0,5)}e.markedSlots.forEach(e=>{r.boardModifiers.convertNumbersToRed.includes(e)||r.boardModifiers.convertNumbersToRed.push(e)});break;case`PAINT_BLACK`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<=36;e++)c(e,r.playerWheel,r.boardModifiers)===`red`&&t.push(e);e.markedSlots=[...t].sort(()=>Math.random()-.5).slice(0,5)}e.markedSlots.forEach(e=>{r.boardModifiers.convertNumbersToBlack.includes(e)||r.boardModifiers.convertNumbersToBlack.push(e)});break;case`PAINT_GREEN`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<=36;e++){let n=c(e,r.playerWheel,r.boardModifiers);(n===`red`||n===`black`)&&t.push(e)}e.markedSlots=[...t].sort(()=>Math.random()-.5).slice(0,3)}e.markedSlots.forEach(e=>{r.boardModifiers.convertNumbersToGreen.includes(e)||r.boardModifiers.convertNumbersToGreen.push(e)});break;case`PAINT_GOLD`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<=36;e++)c(e,r.playerWheel,r.boardModifiers)!==`gold`&&t.push(e);e.markedSlots=[...t].sort(()=>Math.random()-.5).slice(0,2)}e.markedSlots.forEach(e=>{r.boardModifiers.convertNumbersToGold.includes(e)||r.boardModifiers.convertNumbersToGold.push(e)});break;case`PAINT_PURPLE`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<=36;e++)c(e,r.playerWheel,r.boardModifiers)!==`purple`&&t.push(e);e.markedSlots=[...t].sort(()=>Math.random()-.5).slice(0,2)}e.markedSlots.forEach(e=>{r.boardModifiers.convertNumbersToPurple.includes(e)||r.boardModifiers.convertNumbersToPurple.push(e)});break;case`PAINT_CYAN`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<=36;e++)c(e,r.playerWheel,r.boardModifiers)!==`cyan`&&t.push(e);e.markedSlots=[...t].sort(()=>Math.random()-.5).slice(0,2)}e.markedSlots.forEach(e=>{r.boardModifiers.convertNumbersToCyan.includes(e)||r.boardModifiers.convertNumbersToCyan.push(e)});break;case`PAINT_CRIMSON`:if(!e.markedSlots||e.markedSlots.length===0){let t=[];for(let e=0;e<=36;e++)c(e,r.playerWheel,r.boardModifiers)!==`crimson`&&t.push(e);e.markedSlots=[...t].sort(()=>Math.random()-.5).slice(0,2)}e.markedSlots.forEach(e=>{r.boardModifiers.convertNumbersToCrimson.includes(e)||r.boardModifiers.convertNumbersToCrimson.push(e)});break;case`PAINT_COMPLEMENTARY`:r.boardModifiers.convertAllToRed=!0;break;case`PAINT_INVERSE`:r.boardModifiers.convertAllToBlack=!0;break;case`PAINT_SINGLE_DIGIT`:for(let e=1;e<=9;e++)r.boardModifiers.convertNumbersToGreen.includes(e)||r.boardModifiers.convertNumbersToGreen.push(e);break;case`PAINT_PRIME`:m.forEach(e=>{r.boardModifiers.convertNumbersToGreen.includes(e)||r.boardModifiers.convertNumbersToGreen.push(e)});break;case`PAINT_HIGH_GILD`:for(let e=19;e<=36;e++)r.boardModifiers.convertNumbersToGold.includes(e)||r.boardModifiers.convertNumbersToGold.push(e);break;case`ESSENCE_CHIP`:r.chipsPool+=4;break;case`CHIP_MAKER`:for(let e=0;e<3;e++){let e=n(`money_essence_chip`);e.isTemp=!0,r.drawPile.push(e)}r.drawPile.sort(()=>Math.random()-.5),r.hand.length<8&&(r.drawPile.length===0&&r.discardPile.length>0&&(r.drawPile=[...r.discardPile].sort(()=>Math.random()-.5),r.discardPile=[]),r.drawPile.length>0&&r.hand.push(r.drawPile.pop()));break;case`HIGH_STAKES_SACRIFICE`:if(r.chipsPool+=12,r.hand.length>0){let e=Math.floor(Math.random()*r.hand.length);r.hand.splice(e,1)}break;case`TAX_REFUND`:let a=r.discardPile.filter(e=>e.effectId===`ESSENCE_CHIP`).length;r.chipsPool+=a*2;break;case`CAPITAL_VENTURE`:for(let e=0;e<5;e++){let e=n(`money_essence_chip`);e.isTemp=!0,r.discardPile.push(e)}r.boardModifiers.capitalVentureCount||(r.boardModifiers.capitalVentureCount=0),r.boardModifiers.capitalVentureCount+=25;break;case`GOLDEN_HEIST`:for(let e=0;e<2;e++)if(r.hand.length<8){let e=n(`money_essence_chip`);e.isTemp=!0,r.hand.push(e)}r.boardModifiers.goldenHeistActive=!0;break;default:return console.warn(`Unhandled card effect: ${e.effectId}`),!1}return!0}},g=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26],_=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);function v(e){e.payoutMultipliers.gold===void 0&&(e.payoutMultipliers.gold=4),e.payoutMultipliers.purple===void 0&&(e.payoutMultipliers.purple=4),e.payoutMultipliers.cyan===void 0&&(e.payoutMultipliers.cyan=4),e.payoutMultipliers.crimson===void 0&&(e.payoutMultipliers.crimson=6),!(e.colors&&Object.keys(e.colors).length>0)&&(e.colors={},e.numbers.forEach(t=>{e.greenNumbers.includes(t)?e.colors[t]=`green`:e.colors[t]=_.has(t)?`red`:`black`}))}function y(e,t){for(let[n,r]of Object.entries(t)){let t=Number(n);e.numbers.includes(t)&&(e.colors[t]=r)}}var b=[{id:`classic`,name:`The Gilded Classic`,description:`Standard 37-slot European layout. Balanced and reliable.`,numbers:g,greenNumbers:[0],colors:{},payoutMultipliers:{red:2,black:2,green:14,number:36,odd:2,even:2},upgrades:[],rarity:`common`,pointsCost:0},{id:`dozen`,name:`The Devil's Dozen`,description:`13-slot mini-wheel. High volatility, rapid payout cycle.`,numbers:[0,9,2,7,4,5,12,1,10,3,8,11,6],greenNumbers:[0],colors:{},payoutMultipliers:{red:2,black:2,green:6,number:12,odd:2,even:2},upgrades:[],rarity:`common`,pointsCost:0},{id:`half_wheel`,name:`The Split`,description:`19-slot half-wheel (0-18). Fast spins, good for low-number strategies.`,numbers:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],greenNumbers:[0],colors:{},payoutMultipliers:{red:2,black:2,green:8,number:18,odd:2,even:2},upgrades:[],rarity:`common`,pointsCost:0},{id:`double_zero`,name:`American Dread`,description:`38-slot wheel with 0 and 00. Two green slots for extra risk.`,numbers:[...g,37],greenNumbers:[0,37],colors:{},payoutMultipliers:{red:2,black:2,green:12,number:37,odd:2,even:2},upgrades:[],rarity:`common`,pointsCost:0},{id:`red_heavy`,name:`Scarlet Table`,description:`37-slot wheel with extra red slots. Good for red betting strategies.`,numbers:g,greenNumbers:[0],colors:{},payoutMultipliers:{red:1.8,black:2.4,green:14,number:36,odd:2,even:2},upgrades:[],rarity:`common`,pointsCost:0},{id:`black_heavy`,name:`Obsidian Slab`,description:`37-slot wheel with extra black slots. Good for black betting strategies.`,numbers:g,greenNumbers:[0],colors:{},payoutMultipliers:{red:2.4,black:1.8,green:14,number:36,odd:2,even:2},upgrades:[],rarity:`common`,pointsCost:0}],x=[{id:`midas_touch`,name:`The Midas Touch`,description:`37 slots with 2 GOLD slots. Gold heals 3 HP and pays 3x.`,numbers:g,greenNumbers:[0],colors:{},payoutMultipliers:{red:2,black:2,green:14,number:36,odd:2,even:2},upgrades:[],rarity:`uncommon`,pointsCost:5},{id:`lucky_streak`,name:`Lucky Streak`,description:`25 slots, extra green, 1 GOLD slot. Compact and rewarding.`,numbers:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],greenNumbers:[0,12],colors:{},payoutMultipliers:{red:2,black:2,green:10,number:24,odd:2,even:2},upgrades:[],rarity:`uncommon`,pointsCost:5},{id:`merchant`,name:`The Merchant`,description:`13 slots with 1 GOLD slot and boosted number payouts.`,numbers:[0,1,2,3,4,5,6,7,8,9,10,11,12],greenNumbers:[0],colors:{},payoutMultipliers:{red:2,black:2,green:6,number:15,odd:2,even:2},upgrades:[],rarity:`uncommon`,pointsCost:5},{id:`verdant`,name:`Verdant Fortune`,description:`37 slots with 3 green and 1 GOLD. High green hit rate.`,numbers:g,greenNumbers:[0,18,36],colors:{},payoutMultipliers:{red:2,black:2,green:10,number:36,odd:2,even:2},upgrades:[],rarity:`uncommon`,pointsCost:5},{id:`crimson_tide`,name:`Crimson Tide`,description:`37 slots. Extra red slots (6 blacks become red) with boosted black payout.`,numbers:g,greenNumbers:[0],colors:{},payoutMultipliers:{red:1.8,black:2.5,green:14,number:36,odd:2,even:2},upgrades:[],rarity:`uncommon`,pointsCost:5}],S=[{id:`phantom`,name:`The Phantom`,description:`37 slots with 2 PURPLE curse slots and 1 CYAN shield slot. Risk and reward.`,numbers:g,greenNumbers:[0],colors:{},payoutMultipliers:{red:2.2,black:2.2,green:16,number:36,odd:2.2,even:2.2},upgrades:[],rarity:`rare`,pointsCost:10},{id:`shieldwall`,name:`Shieldwall`,description:`25 slots with 3 CYAN shield slots. Defensive powerhouse.`,numbers:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],greenNumbers:[0],colors:{},payoutMultipliers:{red:2,black:2,green:10,number:24,odd:2,even:2},upgrades:[],rarity:`rare`,pointsCost:10},{id:`gambler`,name:`The Gambler's Edge`,description:`13 slots, 2 GOLD, 1 PURPLE. Extreme risk/reward in a compact wheel.`,numbers:[0,1,2,3,4,5,6,7,8,9,10,11,12],greenNumbers:[0],colors:{},payoutMultipliers:{red:2.5,black:2.5,green:8,number:14,odd:2.5,even:2.5},upgrades:[],rarity:`rare`,pointsCost:10},{id:`chaos_engine`,name:`Chaos Engine`,description:`37 slots with randomized high payouts. 1 GOLD, 1 PURPLE, 1 CYAN.`,numbers:g,greenNumbers:[0],colors:{},payoutMultipliers:{red:2.5,black:1.5,green:18,number:40,odd:3,even:1.5},upgrades:[],rarity:`rare`,pointsCost:10}],C=[{id:`bloodletter`,name:`Bloodletter`,description:`37 slots with 3 CRIMSON and 2 PURPLE slots. Enormous damage potential.`,numbers:g,greenNumbers:[0],colors:{},payoutMultipliers:{red:2.5,black:2.5,green:18,number:40,odd:2.5,even:2.5},upgrades:[],rarity:`legendary`,pointsCost:15},{id:`alchemist`,name:`The Alchemist`,description:`25 slots with 2 GOLD, 2 CYAN, 1 CRIMSON. Perfectly balanced power.`,numbers:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],greenNumbers:[0],colors:{},payoutMultipliers:{red:2.2,black:2.2,green:12,number:28,odd:2.2,even:2.2},upgrades:[],rarity:`legendary`,pointsCost:15},{id:`deaths_roulette`,name:`Death's Roulette`,description:`13 slots with 1 CRIMSON, 1 PURPLE, 1 GOLD. Insane payouts but dangerous.`,numbers:[0,1,2,3,4,5,6,7,8,9,10,11,12],greenNumbers:[0],colors:{},payoutMultipliers:{red:3,black:3,green:10,number:16,odd:3,even:3},upgrades:[],rarity:`legendary`,pointsCost:15}];function w(){for(let e of b)v(e);y(b.find(e=>e.id===`classic`),{7:`gold`}),y(b.find(e=>e.id===`dozen`),{6:`purple`}),y(b.find(e=>e.id===`half_wheel`),{13:`cyan`}),y(b.find(e=>e.id===`double_zero`),{11:`gold`});let e=b.find(e=>e.id===`red_heavy`);[2,4,6,8,10,11].forEach(t=>{e.colors[t]!==void 0&&(e.colors[t]=`red`)});let t=b.find(e=>e.id===`black_heavy`);[1,3,5,7,9,12].forEach(e=>{t.colors[e]!==void 0&&(t.colors[e]=`black`)});for(let e of x)v(e);y(x.find(e=>e.id===`midas_touch`),{7:`gold`,28:`gold`}),y(x.find(e=>e.id===`lucky_streak`),{7:`gold`}),y(x.find(e=>e.id===`merchant`),{7:`gold`}),y(x.find(e=>e.id===`verdant`),{7:`gold`});let n=x.find(e=>e.id===`crimson_tide`);[2,4,6,8,10,11].forEach(e=>{n.colors[e]!==void 0&&(n.colors[e]=`red`)});for(let e of S)v(e);y(S.find(e=>e.id===`phantom`),{13:`purple`,31:`purple`,17:`cyan`}),y(S.find(e=>e.id===`shieldwall`),{5:`cyan`,12:`cyan`,20:`cyan`}),y(S.find(e=>e.id===`gambler`),{3:`gold`,9:`gold`,6:`purple`}),y(S.find(e=>e.id===`chaos_engine`),{7:`gold`,13:`purple`,25:`cyan`});for(let e of C)v(e);y(C.find(e=>e.id===`bloodletter`),{7:`crimson`,17:`crimson`,30:`crimson`,13:`purple`,31:`purple`}),y(C.find(e=>e.id===`alchemist`),{3:`gold`,15:`gold`,8:`cyan`,20:`cyan`,12:`crimson`}),y(C.find(e=>e.id===`deaths_roulette`),{7:`crimson`,4:`purple`,10:`gold`})}w();function T(){return[...b,...x,...S,...C]}function E(){let e=[...x],t=[...S];for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return[JSON.parse(JSON.stringify(e[0])),JSON.parse(JSON.stringify(e[1])),JSON.parse(JSON.stringify(t[0]))]}function D(){let e=Math.floor(Math.random()*b.length);return JSON.parse(JSON.stringify(b[e]))}var O={};for(let e of T())O[e.id]=e;var k={red_boost:{id:`red_boost`,name:`Red Iron Polish`,description:`Permanently increases Red bet payout by +0.2x.`,cost:10,effectType:`multiplier_boost`,value:{type:`red`,amount:.2}},black_boost:{id:`black_boost`,name:`Obsidian Coating`,description:`Permanently increases Black bet payout by +0.2x.`,cost:10,effectType:`multiplier_boost`,value:{type:`black`,amount:.2}},green_boost:{id:`green_boost`,name:`Jade Encrustation`,description:`Permanently increases Green bet payout by +2.0x.`,cost:15,effectType:`multiplier_boost`,value:{type:`green`,amount:2}},add_green:{id:`add_green`,name:`Verdant Corruption`,description:`Permanently converts a random Black slot into a Green slot.`,cost:25,effectType:`add_green_slot`,value:null},convert_red:{id:`convert_red`,name:`Coagulating Mist`,description:`Permanently converts a random Black slot into a Red slot.`,cost:16,effectType:`convert_to_red`,value:null},lucky_seven:{id:`lucky_seven`,name:`Sinner's Seven`,description:`Number 7 becomes a Golden Lucky slot: landing on it heals 6 HP.`,cost:20,effectType:`lucky_number`,value:{number:7,heal:6}},light_ball:{id:`light_ball`,name:`Hollow Ivory Ball`,description:`Reduces ball mass by 20% (increases spin velocity and bounce height).`,cost:12,effectType:`physics_mod`,value:{field:`ballMass`,multiplier:.8}},heavy_friction:{id:`heavy_friction`,name:`Velvet Lining`,description:`Increases wheel friction by 25% (wheel and ball decelerate faster).`,cost:12,effectType:`physics_mod`,value:{field:`friction`,multiplier:1.25}},red_ability_unlock:{id:`red_ability_unlock`,name:`Fever Ignition`,description:`Unlock Red slot ability: consecutive Red landing builds Heat Combo (bets multiplier boosted to 3.5x).`,cost:18,effectType:`physics_mod`,value:null},black_ability_unlock:{id:`black_ability_unlock`,name:`Glacier Core`,description:`Unlock Black slot ability: consecutive Black landing builds Glacier Shield (drains score from opponent).`,cost:18,effectType:`physics_mod`,value:null},green_ability_unlock:{id:`green_ability_unlock`,name:`Synapse Link`,description:`Unlock Green slot ability: landing on Green sets all cards cost to 0 next turn.`,cost:22,effectType:`physics_mod`,value:null},level_red:{id:`level_red`,name:`Planet Mars`,description:`Level up Red slots. Increases Red payout multiplier by +0.2x and Fever combo power.`,cost:15,effectType:`physics_mod`,value:{color:`red`}},level_black:{id:`level_black`,name:`Planet Pluto`,description:`Level up Black slots. Increases Black payout multiplier by +0.2x and Glacier drain power.`,cost:15,effectType:`physics_mod`,value:{color:`black`}},level_green:{id:`level_green`,name:`Planet Earth`,description:`Level up Green slots. Increases Green payout multiplier by +2.0x and Synapse bonus power.`,cost:15,effectType:`physics_mod`,value:{color:`green`}},level_gold:{id:`level_gold`,name:`Planet Saturn`,description:`Level up Gold slots. Increases Gold payout multiplier by +0.5x, points and shop chips returns.`,cost:15,effectType:`physics_mod`,value:{color:`gold`}},level_purple:{id:`level_purple`,name:`Planet Neptune`,description:`Level up Purple slots. Increases Purple payout multiplier by +0.5x and corruption stun turns.`,cost:15,effectType:`physics_mod`,value:{color:`purple`}},level_cyan:{id:`level_cyan`,name:`Planet Uranus`,description:`Level up Cyan slots. Increases Cyan payout multiplier by +0.5x, points and card draw counts.`,cost:15,effectType:`physics_mod`,value:{color:`cyan`}},level_crimson:{id:`level_crimson`,name:`Planet Jupiter`,description:`Level up Crimson slots. Increases Crimson payout multiplier by +0.5x and points reward.`,cost:15,effectType:`physics_mod`,value:{color:`crimson`}}};function A(e,t){if(t.effectType===`multiplier_boost`){let{type:n,amount:r}=t.value;e.payoutMultipliers[n]=parseFloat((e.payoutMultipliers[n]+r).toFixed(1))}else if(t.effectType===`add_green_slot`){let t=e.numbers.filter(t=>e.colors[t]===`black`);if(t.length>0){let n=t[Math.floor(Math.random()*t.length)];e.colors[n]=`green`,e.greenNumbers.includes(n)||e.greenNumbers.push(n)}}else if(t.effectType===`convert_to_red`){let t=e.numbers.filter(t=>e.colors[t]===`black`);if(t.length>0){let n=t[Math.floor(Math.random()*t.length)];e.colors[n]=`red`}}e.upgrades.push(t.id)}var ee=[{id:`faraday`,name:`Faraday Curse`,description:`Magnetic cheats (Lodestones, Coils) are disabled.`,icon:`🧲`},{id:`fog`,name:`Fog Curse`,description:`Predictions are disabled (prediction size is 0).`,icon:`🌫️`},{id:`rust`,name:`Rust Curse`,description:`Double friction on all player spins.`,icon:`⚙️`},{id:`greed`,name:`Greed Curse`,description:`Turn chip pool is halved (gain 5 instead of 10).`,icon:`💰`},{id:`avarice`,name:`Avarice Curse`,description:`Drawing cards costs a flat 3 chips.`,icon:`💸`},{id:`fragile`,name:`Fragile Curse`,description:`You cannot heal HP (restoring HP is disabled).`,icon:`🏺`},{id:`eclipse`,name:`Eclipse Curse`,description:`All Green sector bets deal 0 damage.`,icon:`🌑`},{id:`curse`,name:`Curse of Blood`,description:`Lose 2 HP at the start of each round.`,icon:`💀`},{id:`lead`,name:`Lead Curse`,description:`Bets per slot are capped at 5 chips.`,icon:`🪨`},{id:`choked`,name:`Choked Curse`,description:`Maximum hand size is reduced by 3 (max 5).`,icon:`🎴`}],te=80,j=20,ne=class{runState;battleState=null;playerPhysics;enemyPhysics;get physics(){return this.getActivePhysics()}constructor(){this.playerPhysics=new p,this.enemyPhysics=new p,this.runState=this.getInitialRunState()}getColorLevel(e){return this.runState.colorLevels?.[e]||1}getScaledPayoutMultiplier(e,t){let n=this.getColorLevel(e);return e===`red`||e===`black`?parseFloat((t+(n-1)*.2).toFixed(1)):e===`green`?parseFloat((t+(n-1)*2).toFixed(1)):e===`gold`||e===`purple`||e===`cyan`||e===`crimson`?parseFloat((t+(n-1)*.5).toFixed(1)):t}getInitialRunState(e=7){return{hp:te,maxHp:te,chips:j,deck:[],relics:[],currentFloor:0,mapNodes:i.generateMap(e,3),currentNodeId:null,gameState:`MENU`,selectedWheelId:`classic`,playerWheel:JSON.parse(JSON.stringify(O.classic)),combatMode:`points`,colorLevels:{red:1,black:1,green:1,gold:1,purple:1,cyan:1,crimson:1},colorUnlocks:{red_ability:!1,black_ability:!1,green_ability:!1}}}startNewRun(e=7){this.runState=this.getInitialRunState(e),this.battleState=null,this.initStore()}selectNode(e){let t=this.runState.currentFloor,n=this.runState.mapNodes[t].find(t=>t.id===e);if(n){if(this.runState.currentNodeId!==null){let t=!1;for(let n of this.runState.mapNodes){let r=n.find(e=>e.id===this.runState.currentNodeId);if(r&&r.connections.includes(e)){t=!0;break}}if(!t)return}this.runState.currentNodeId=e,n.type===`combat`||n.type===`elite`||n.type===`boss`?this.initCombat(n.type):n.type===`shop`?this.runState.gameState=`SHOP`:n.type===`event`?this.runState.gameState=`EVENT`:n.type===`forge`&&(this.runState.gameState=`FORGE`,this.initForge())}}devStartTestCombat(){this.initCombat(`combat`),this.battleState&&(this.battleState.isTestCombatMode=!0,this.battleState.enemy.name=`DUMMY TARGET (TEST)`,this.battleState.enemy.maxHp=999,this.battleState.enemy.hp=999,this.battleState.enemy.intent={type:`attack`,value:0,description:`Test Dummy (does nothing)`})}initCombat(e){let t;(e===`elite`||e===`boss`)&&(t=ee[Math.floor(Math.random()*ee.length)]);let n=`Dread Gambler`,r=45,i=`gambler`;if(e===`combat`){let e=Math.random();e<.33?(n=`Decay Wheel`,r=50,i=`decay_wheel`):e<.66?(n=`Grave Croupier`,r=40,i=`croupier`):(n=`Blood Wraith`,r=60,i=`wraith`)}else e===`elite`?(n=`The Dealer's Claw`,r=95,i=`dealer_claw`):e===`boss`&&(n=`THE HOUSE`,r=220,i=`the_house`);let a=.25;e===`boss`?a=1:e===`elite`?a=.85:i===`wraith`?a=.7:i===`croupier`&&(a=.5);let o={id:`enemy_${Date.now()}`,name:n,maxHp:r,hp:r,intent:{type:`attack`,value:5,description:`Prepare to strike (5 damage)`},patternIndex:0,spriteName:i,isBoss:e===`boss`,isElite:e===`elite`,difficulty:a},s=[...this.runState.deck];this.shuffle(s);let c={spinSpeed:1,ballMass:1,friction:1,bounceRandomness:.1,wheelTilt:0,targetZoneBias:0,predictionSize:0,nudgeCheatActive:!1},l=this.runState.playerWheel,u={extraGreenSlots:0,convertNumbersToRed:[],convertNumbersToBlack:[],convertNumbersToGreen:[],convertNumbersToGold:[],convertNumbersToPurple:[],convertNumbersToCyan:[],convertNumbersToCrimson:[],capitalVentureCount:0,customSlotColors:{},payoutMultipliers:{red:this.getScaledPayoutMultiplier(`red`,l.payoutMultipliers.red),black:this.getScaledPayoutMultiplier(`black`,l.payoutMultipliers.black),green:this.getScaledPayoutMultiplier(`green`,l.payoutMultipliers.green),number:l.payoutMultipliers.number,odd:l.payoutMultipliers.odd,even:l.payoutMultipliers.even}},d;if(e===`boss`){let e=[...g];for(let t=37;t<=49;t++)e.push(t);d={id:`house_wheel`,name:`The Doomed House Wheel`,description:`A massive 50-slot wheel of pure despair.`,numbers:e,greenNumbers:[0,13,26,39],colors:{},payoutMultipliers:{red:2,black:2,green:10,number:50,odd:2,even:2},upgrades:[]},v(d)}else e===`elite`?(d={id:`elite_wheel`,name:`Claw Wheel`,description:`An elite 3-green slot wheel.`,numbers:g,greenNumbers:[0,17,34],colors:{},payoutMultipliers:{red:2,black:2,green:12,number:36,odd:2,even:2},upgrades:[]},v(d)):i===`decay_wheel`?(d=JSON.parse(JSON.stringify(O.dozen)),d.name=`The Decayed Dozen`,d.description=`A rusty, unstable 13-slot wheel.`):i===`wraith`?(d=JSON.parse(JSON.stringify(O.crimson_tide)),d.name=`The Wraith Reservoir`,d.description=`A blood-soaked wheel favoring red slots.`):i===`croupier`?(d=JSON.parse(JSON.stringify(O.verdant)),d.name=`The Grave Gateway`,d.description=`A dark wheel with multiple green slots.`):d=JSON.parse(JSON.stringify(O.classic));let f=Math.random()*Math.PI*2,p=Math.random()*Math.PI*2,m=2+Math.random()*1.5,h=-10-Math.random()*5;this.battleState={enemy:o,encounterType:e,curse:t,turn:1,playerScore:t?.id===`greed`?15:30,enemyScore:30,isSuddenDeath:!1,maxRounds:e===`elite`?5:e===`boss`?8:3,chipsPool:t?.id===`greed`?15:30,enemyChipsPool:30,hand:[],drawPile:s,discardPile:[],bets:[],lastSpinResult:null,playerWheel:JSON.parse(JSON.stringify(this.runState.playerWheel)),enemyWheel:d,physicsModifiers:c,boardModifiers:u,phase:`betting`,activeWheelOwner:`player`,predictionSector:[],predictionOffset:Math.random(),spinSeedAngle:f,ballSeedAngle:p,spinSeedSpeed:m,ballSeedSpeed:h,drawsThisTurn:0,isResolving:!1,activePlayedCards:[]},this.playerPhysics.reset(this.battleState.playerWheel,c),this.enemyPhysics.reset(this.battleState.enemyWheel,c),this.runState.gameState=`COMBAT`,this.updateEnemyIntent(),this.drawCard(),this.drawCard(),this.createTurnStartBackup()}shuffle(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}drawCard(){if(!this.battleState)return!1;this.battleState.drawPile.length===0&&(this.battleState.drawPile=[...this.battleState.discardPile],this.shuffle(this.battleState.drawPile),this.battleState.discardPile=[]);let e=this.battleState.curse?.id===`choked`?5:8;if(this.battleState.drawPile.length>0&&this.battleState.hand.length<e){let e=this.battleState.drawPile.pop();return this.battleState.hand.push(e),!0}return!1}getDrawCardCost(){if(!this.battleState)return 0;if(this.battleState.curse?.id===`avarice`)return 3;let e=this.battleState.drawsThisTurn||0;return e===0?0:e===1?3:e===2?5:e===3?7:9}buyCardDraw(){if(!this.battleState||this.battleState.phase!==`betting`||this.battleState.drawPile.length===0&&this.battleState.discardPile.length===0)return!1;let e=this.battleState.curse?.id===`choked`?5:8;if(this.battleState.hand.length>=e)return!1;let t=this.getDrawCardCost();if(this.battleState.chipsPool<t)return!1;this.battleState.chipsPool-=t;let n=this.drawCard();return n?this.battleState.drawsThisTurn=(this.battleState.drawsThisTurn||0)+1:this.battleState.chipsPool+=t,n}placeBet(e,t,n){if(!this.battleState||t<=0||this.battleState.chipsPool<t)return!1;let r=this.battleState.bets.find(t=>t.type===e&&(e!==`number`||t.numberValue===n)),i=t;if(this.battleState.curse?.id===`lead`){let e=r?r.amount:0;if(i=Math.min(t,5-e),i<=0)return!1}return this.battleState.chipsPool<i?!1:(this.battleState.chipsPool-=i,r?r.amount+=i:this.battleState.bets.push({type:e,amount:i,numberValue:n}),this.updatePrediction(),!0)}removeBet(e,t){if(!this.battleState)return!1;let n=this.battleState.bets.findIndex(n=>n.type===e&&(e!==`number`||n.numberValue===t));if(n!==-1){let e=this.battleState.bets[n];return this.battleState.chipsPool+=e.amount,this.battleState.bets.splice(n,1),this.updatePrediction(),!0}return!1}clearBets(){if(!this.battleState)return;let e=this.battleState.bets.reduce((e,t)=>e+t.amount,0);this.battleState.chipsPool+=e,this.battleState.bets=[],this.updatePrediction()}subtractBet(e,t,n){if(!this.battleState||t<=0)return!1;let r=this.battleState.bets.findIndex(t=>t.type===e&&(e!==`number`||t.numberValue===n));if(r===-1)return!1;let i=this.battleState.bets[r],a=Math.min(t,i.amount);return i.amount-=a,this.battleState.chipsPool+=a,i.amount<=0&&this.battleState.bets.splice(r,1),this.updatePrediction(),!0}rebet(){if(!this.battleState)return!1;let e=this.battleState.lastPlayerBetsBackup;if(!e||e.length===0)return!1;let t=e.reduce((e,t)=>e+t.amount,0);return this.battleState.chipsPool<t?!1:(this.clearBets(),e.forEach(e=>{this.placeBet(e.type,e.amount,e.numberValue)}),!0)}sacrificeForChips(){if(!this.battleState)return!1;if(this.runState.combatMode===`points`){let e=this.battleState.playerScore||0;if(e>=10)return this.battleState.playerScore=e-10,this.battleState.chipsPool+=5,!0}else{let e=this.runState.hp;if(e>5)return this.runState.hp=e-5,this.battleState.chipsPool+=5,!0}return!1}getWinningNumbers(e){if(!this.battleState)return[];let t=[];return this.battleState.bets.forEach(n=>{n.type===`number`&&n.numberValue!==void 0?t.push(n.numberValue):n.type===`green`?e.greenNumbers.forEach(e=>t.push(e)):n.type===`red`?e.numbers.forEach(n=>{c(n,e,this.battleState.boardModifiers)===`red`&&t.push(n)}):n.type===`black`?e.numbers.forEach(n=>{c(n,e,this.battleState.boardModifiers)===`black`&&t.push(n)}):n.type===`odd`?e.numbers.forEach(n=>{!e.greenNumbers.includes(n)&&n%2!=0&&t.push(n)}):n.type===`even`&&e.numbers.forEach(n=>{!e.greenNumbers.includes(n)&&n%2==0&&t.push(n)})}),t}runPredictionDryRun(e,t){if(!this.battleState)return[];let n=this.battleState.physicsModifiers.predictionSize;if(n<=0)return[];let r=new p;r.reset(e,this.battleState.physicsModifiers,t,this.battleState.spinSeedAngle,this.battleState.ballSeedAngle,this.battleState.spinSeedSpeed,this.battleState.ballSeedSpeed,this.battleState.boardModifiers);for(let e=0;e<7200&&(r.update(.008333333333333333),!r.isSettled);e++);if(!r.isSettled)return[];let i=r.settledSlotIndex,a=e.numbers.length,o=[],s=this.battleState.predictionOffset??.5,c=Math.floor(s*n);for(let t=0;t<n;t++){let n=((i+(t-c))%a+a)%a;o.push(e.numbers[n])}return o}spinWheel(){if(!this.battleState)return null;this.battleState.phase=`spinning`;let e=this.battleState.activeWheelOwner===`enemy`,t=e?this.battleState.enemyWheel:this.battleState.playerWheel,n=this.getWinningNumbers(t);!e&&this.battleState.physicsModifiers.predictionSize>0?this.battleState.predictionSector=this.runPredictionDryRun(t,n):this.battleState.predictionSector=[],this.battleState.activePlayedCards&&this.battleState.activePlayedCards.forEach(e=>{e.isLocked=!0});let r=this.getActivePhysics(),i=this.battleState.physicsModifiers,a=this.battleState.boardModifiers;return r.reset(t,i,n,this.battleState.spinSeedAngle,this.battleState.ballSeedAngle,this.battleState.spinSeedSpeed,this.battleState.ballSeedSpeed,a),r}healHp(e){this.battleState?.curse?.id!==`fragile`&&(this.runState.hp=Math.min(this.runState.maxHp,this.runState.hp+e))}resolveSpin(){if(!this.battleState)return;this.battleState.phase=`resolved`;let e=this.playerPhysics.getWinningNumbers();if(e.length===0)return;let t=this.battleState.playerWheel,n=this.battleState.boardModifiers,r=this.battleState.activePlayedCards?.some(e=>e.effectId===`LUCKY_CHARM`),i=0,a=[],o=this.runState.combatMode===`points`,s=(this.battleState.playerScore||0)<(this.battleState.enemyScore||0);this.runState.hp/this.runState.maxHp;let u=!0,f=0,p=0,m=0;for(let h=0;h<e.length;h++){let g=e[h],_=c(g,t,n),v=l(_),y=this.calculateSpinDamage(g,_,v);if(y===0&&r){let e=this.battleState.bets.filter(e=>e.type===`number`);g=e.length>0?e[Math.floor(Math.random()*e.length)].numberValue:t.numbers[Math.floor(Math.random()*t.numbers.length)],_=c(g,t,n),v=l(_),y=this.calculateSpinDamage(g,_,v)}y>0&&(u=!1),v===`red`?f++:v===`black`?p++:v===`green`&&m++,t.upgrades.includes(`lucky_seven`)&&g===7&&this.healHp(6);let b=d(_,s);if(b){let e=b.description;switch(b.type){case`gold_points`:let r=t.numbers.indexOf(g);if(r!==-1){t.colors[g]=`gold`;let e=(r+1)%t.numbers.length,n=t.numbers[e];t.colors[n]=`gold`}let i=this.getColorLevel(`gold`),a=15+(i-1)*5,o=15+(i-1)*5;this.runState.chips+=a,this.battleState.chipsPool+=o,e=`GOLD — Transformed slots to Gold, gained +${o} PTS and +${a} Shop Chips!`,n&&n.goldenHeistActive&&(this.runState.chips+=30,e+=` (+30 Golden Heist Chips!)`);break;case`purple_curse`:let s=this.getColorLevel(`purple`),c=20+(s-1)*5,l=1+Math.floor((s-1)/2);this.battleState.chipsPool+=c,n.enemyNextStun=!0,l>1&&(n.enemyStunTurns=(n.enemyStunTurns||0)+(l-1)),e=`PURPLE CURSE — Gained +${c} PTS and stunned opponent for ${l} turn${l>1?`s`:``}!`;break;case`cyan_shield`:let u=this.getColorLevel(`cyan`),d=10+(u-1)*3,f=2+(u-1);this.battleState.chipsPool+=d,this.battleState.turnStartBackup&&(this.battleState.chipsPool=Math.max(this.battleState.chipsPool,this.battleState.turnStartBackup.chipsPool));for(let e=0;e<f;e++)this.drawCard();e=`CYAN ESSENCE — Gained +${d} PTS, refilled chips, and drew ${f} cards!`;break;case`crimson_active`:let p=15+(this.getColorLevel(`crimson`)-1)*5;this.battleState.chipsPool+=p,e=`CRIMSON — Currently losing! Gained +${p} PTS and 12x payout multiplier!`;break;case`crimson_inactive`:let m=5+(this.getColorLevel(`crimson`)-1)*2;this.battleState.chipsPool+=m,e=`CRIMSON — Currently winning/tied. Gained +${m} PTS and 6x payout multiplier`;break}a.push(e)}let x=!!this.runState.colorUnlocks?.green_ability;if(v===`green`&&x){n.freeCardsNextTurn=!0;let e=this.getColorLevel(`green`),t=``;if(e>1){let n=e-1,r=(e-1)*5;for(let e=0;e<n;e++)this.drawCard();this.battleState.chipsPool+=r,t=` (+${n} card draw, +${r} chips)`}a.push(`SYNAPSE SYNERGY! All cards cost 0 next turn!${t}`)}if(n.chipMines&&n.chipMines[g]!==void 0&&(this.battleState.chipsPool+=n.chipMines[g]),n.lifeFountains&&n.lifeFountains[g]!==void 0&&this.healHp(n.lifeFountains[g]),n.dangerZones&&n.dangerZones[g]!==void 0){let e=n.dangerZones[g];o?this.battleState.chipsPool+=e:this.battleState.enemy.hp=Math.max(0,this.battleState.enemy.hp-e)}n.cursedZones&&n.cursedZones.includes(g)&&(n.enemyStunTurns=(n.enemyStunTurns||0)+2),i+=y,this.battleState.chipsPool+=y,this.battleState.activePlayedCards?.some(e=>e.effectId===`STUN_STRIKE`)&&y>=5&&(n.enemyStunTurns=(n.enemyStunTurns||0)+2)}if(o||(this.battleState.enemy.hp=Math.max(0,this.battleState.enemy.hp-i)),this.battleState.activePlayedCards?.some(e=>e.effectId===`HEAVY_NUDGE`)&&u&&(this.battleState.chipsPool+=15),n.insuranceActive){if(u){let e=0;this.battleState.bets.forEach(t=>e+=t.amount),this.battleState.chipsPool+=e}n.insuranceActive=!1}let h=!!this.runState.colorUnlocks?.red_ability,g=!!this.runState.colorUnlocks?.black_ability;if(n.redStreakActive||h||n.blackStreakActive||g)if(f>0&&p===0&&m===0)if(n.redStreakActive||h){if(n.redStreakCount=(n.redStreakCount||0)+1,n.blackStreakCount=0,n.redStreakCount>=3){let e=this.getColorLevel(`red`);n.payoutMultipliers.red=parseFloat((3.5+(e-1)*.5).toFixed(1)),a.push(`HEAT COMBO! Red bets multiplier boosted to ${n.payoutMultipliers.red}x!`)}}else n.blackStreakCount=0;else if(p>0&&f===0&&m===0)if(n.blackStreakActive||g){if(n.blackStreakCount=(n.blackStreakCount||0)+1,n.redStreakCount=0,n.blackStreakCount>=3){let e=this.battleState.enemyChipsPool===void 0?this.battleState.enemyScore||30:this.battleState.enemyChipsPool,t=10+(this.getColorLevel(`black`)-1)*3;this.battleState.enemyChipsPool=Math.max(0,e-t),a.push(`GLACIER SHIELD! Drained ${t} PTS from opponent's score!`)}}else n.redStreakCount=0;else n.redStreakCount=0,n.blackStreakCount=0;let _=e[0],v=c(_,t,n),y=l(v),b=e.map(e=>({number:e,color:c(e,t,n)}));this.battleState.lastSpinResult={number:_,color:v,betColor:y,damageDealt:i,playerDamageTaken:0,betsEvaluated:this.battleState.bets.map(e=>({...e})),cardsActive:[...this.battleState.activePlayedCards||[]],slotEffect:a.join(`, `)||void 0,allOutcomes:b},this.battleState.lastPlayerBetsBackup=this.battleState.bets.map(e=>({...e})),this.battleState.bets=[]}calculateSpinDamage(e,t,n,r){if(!this.battleState)return 0;let i=r||this.battleState.playerWheel,a=this.battleState.boardModifiers,o=[2,3,5,7,11,13,17,19,23,29,31],s=a.dozenMultipliers||{},c=a.columnMultipliers||{},l=a.customNumberMultipliers||{},d=a.luckyZones||[],f=a.goldFoils||[],p=a.copperPlates||[],m=a.mirrorSlots||{},h=0,g=1;if(this.battleState.predictionSector&&this.battleState.predictionSector.includes(e)){let e=this.battleState.predictionSector.length;e===9||e===7?g=.3:e===5||e===3?g=.5:e===1?g=1:e>0&&(e>=7?g=.3:e>=3&&(g=.5))}let _=(this.battleState.activePlayedCards||[]).some(e=>e.type===`physics`&&(e.rarity===`common`||e.rarity===`uncommon`))?.3:1,v=Math.min(g,_);if(this.battleState.bets.forEach(n=>{let r=!1,g=0,_=u(t,e,i.greenNumbers);if(n.type===`red`&&_===`red`)r=!0,g=a.payoutMultipliers.red;else if(n.type===`black`&&_===`black`)r=!0,g=a.payoutMultipliers.black;else if(n.type===`green`){if(i.greenNumbers.includes(e)||a.extraGreenSlots&&a.extraGreenSlots>0&&e===32||a.extraGreenSlots&&a.extraGreenSlots>1&&(e===11||e===22)||a.extraGreenSlots&&a.extraGreenSlots>3&&(e===5||e===17||e===29)||a.emeraldForestActive&&o.includes(e)||t===`green`){r=!0;let e=a.payoutMultipliers.green;if(a.emeraldForestActive&&(e*=2),g=e,this.battleState?.activePlayedCards?.some(e=>e.effectId===`GREEN_RIPPLE`)){let e=i.greenNumbers.length+(a.extraGreenSlots||0);g+=5*e}}}else if(n.type===`gold`&&t===`gold`){r=!0;let e=i.payoutMultipliers.gold||4;g=this.getScaledPayoutMultiplier(`gold`,e)}else if(n.type===`purple`&&t===`purple`){r=!0;let e=i.payoutMultipliers.purple||4;g=this.getScaledPayoutMultiplier(`purple`,e)}else if(n.type===`cyan`&&t===`cyan`){r=!0;let e=i.payoutMultipliers.cyan||4;g=this.getScaledPayoutMultiplier(`cyan`,e)}else if(n.type===`crimson`&&t===`crimson`){r=!0;let e=i.payoutMultipliers.crimson||6,t=this.getScaledPayoutMultiplier(`crimson`,e);g=(this.battleState?.playerScore||0)<(this.battleState?.enemyScore||0)?t*2:t}else n.type===`number`&&(n.numberValue===e||m[e]===n.numberValue)?(r=!0,g=l[e]||a.payoutMultipliers.number,this.battleState?.activePlayedCards?.some(e=>e.effectId===`SPLIT_BETS`)&&(g+=2)):n.type===`odd`&&!i.greenNumbers.includes(e)&&e%2!=0?(r=!0,g=a.payoutMultipliers.odd):n.type===`even`&&!i.greenNumbers.includes(e)&&e%2==0&&(r=!0,g=a.payoutMultipliers.even);if(this.battleState?.curse?.id===`eclipse`&&n.type===`green`&&(r=!1),r){let t=n.amount*g;e>=1&&e<=18&&a.lowMultiplier!==void 0&&(t*=a.lowMultiplier),e>=19&&e<=36&&a.highMultiplier!==void 0&&(t*=a.highMultiplier);let r=Math.ceil(e/12);s[r]!==void 0&&(t*=s[r]);let i=e>0?(e-1)%3+1:0;c[i]!==void 0&&(t*=c[i]),o.includes(e)&&a.primeMultiplier!==void 0&&(t*=a.primeMultiplier),d.includes(e)&&(t*=1.5),f.includes(e)&&(t*=10),p.includes(e)&&(t*=1.5),t*=v,h+=t}}),a.doubleNextPayout&&h>0&&(h*=2,a.doubleNextPayout=!1),a.redStreakActive&&n===`red`&&a.redStreakCount){let e=Math.min(4,1+a.redStreakCount*.5);h*=e}if(a.blackStreakActive&&n===`black`&&a.blackStreakCount){let e=Math.min(4,1+a.blackStreakCount*.5);h*=e}return a.globalMultiplier!==void 0&&(h*=a.globalMultiplier),this.battleState?.activePlayedCards?.some(e=>e.effectId===`TURBO_SPIN`)&&(h*=1.5),a.omniscienceDamageMult!==void 0&&this.battleState.predictionSector&&this.battleState.predictionSector.includes(e)&&(h*=a.omniscienceDamageMult),Math.floor(h)}passPlayerTurn(){this.battleState&&(this.battleState.phase=`resolved`,this.battleState.activePlayedCards&&this.battleState.activePlayedCards.forEach(e=>{e.isLocked=!0}),this.battleState.lastSpinResult={number:0,color:`green`,betColor:`green`,damageDealt:0,playerDamageTaken:0,betsEvaluated:[],cardsActive:[...this.battleState.activePlayedCards||[]]})}resolveEnemySpin(){if(!this.battleState)return;this.battleState.phase=`resolved`;let e=this.enemyPhysics.getWinningNumber();if(e<0)return;let t=this.battleState.enemyWheel,n=c(e,t,this.battleState.boardModifiers),r=l(n),i=this.calculateSpinDamage(e,n,r,t),a=i>0,o=this.battleState.enemy.intent,s=0;if(this.runState.combatMode===`points`){if(a)if(o.type===`attack`)s=o.value,this.battleState.enemyChipsPool=(this.battleState.enemyChipsPool||0)+s+i;else if(o.type===`steal_chips`){let e=Math.min(this.battleState.chipsPool,o.value);this.battleState.chipsPool=Math.max(0,this.battleState.chipsPool-e),s=e,this.battleState.enemyChipsPool=(this.battleState.enemyChipsPool||0)+e+i}else this.battleState.enemyChipsPool=(this.battleState.enemyChipsPool||0)+i}else a&&(o.type===`attack`?(s=o.value,this.runState.hp=Math.max(0,this.runState.hp-s)):o.type===`steal_chips`?this.battleState.chipsPool=Math.max(0,this.battleState.chipsPool-o.value):o.type===`physics_debuff`&&(this.battleState.physicsModifiers.friction*=2));let u=this.enemyPhysics.getWinningNumbers(),d=u.length>0?u.map(e=>({number:e,color:c(e,t,this.battleState.boardModifiers)})):[{number:e,color:n}];this.battleState.lastSpinResult={number:e,color:n,betColor:r,damageDealt:i,playerDamageTaken:s,betsEvaluated:this.battleState.bets.map(e=>({...e})),cardsActive:[...this.battleState.activePlayedCards||[]],enemyWon:a,allOutcomes:d},this.battleState.bets=[]}resolveEnemyTurn(){if(!this.battleState)return;if(this.battleState.playerTurnModifiersBackup){let e=this.battleState.playerTurnModifiersBackup;this.battleState.physicsModifiers=e.physicsModifiers,this.battleState.boardModifiers=e.boardModifiers,this.battleState.predictionSector=e.predictionSector,delete this.battleState.playerTurnModifiersBackup}let e=this.runState.combatMode===`points`;if(this.runState.hp<=0){this.runState.gameState=`GAME_OVER`;return}if(!this.battleState.isTestCombatMode){if(e){if(this.battleState.turn>=(this.battleState.maxRounds||3)){let e=this.battleState.playerScore||0,t=this.battleState.enemyScore||0;if(e>t){this.handleCombatVictory();return}else if(e<t){this.runState.hp=0,this.runState.gameState=`GAME_OVER`;return}else this.battleState.isSuddenDeath=!0,this.battleState.maxRounds=(this.battleState.maxRounds||3)+1}}else if(this.battleState.enemy.hp<=0){this.handleCombatVictory();return}}let t=this.battleState.boardModifiers;if(t.tempDurations&&Object.keys(t.tempDurations).forEach(e=>{if(t.tempDurations[e]>0&&(t.tempDurations[e]--,t.tempDurations[e]===0)){let n=this.battleState.playerWheel.payoutMultipliers;e===`greenMultiplier`?t.payoutMultipliers.green=this.getScaledPayoutMultiplier(`green`,n.green):e===`primeMultiplier`?delete t.primeMultiplier:e===`highMultiplier`?delete t.highMultiplier:e===`lowMultiplier`?delete t.lowMultiplier:e===`evenMultiplier`?t.payoutMultipliers.even=n.even:e===`oddMultiplier`?t.payoutMultipliers.odd=n.odd:e===`dozenMultiplier_1`?t.dozenMultipliers&&delete t.dozenMultipliers[1]:e===`dozenMultiplier_2`?t.dozenMultipliers&&delete t.dozenMultipliers[2]:e===`dozenMultiplier_3`?t.dozenMultipliers&&delete t.dozenMultipliers[3]:e===`singleOutMultiplier`?t.payoutMultipliers.number=n.number:e===`columnMultiplier_1`?t.columnMultipliers&&delete t.columnMultipliers[1]:e===`columnMultiplier_2`?t.columnMultipliers&&delete t.columnMultipliers[2]:e===`columnMultiplier_3`?t.columnMultipliers&&delete t.columnMultipliers[3]:e===`globalMultiplier`?delete t.globalMultiplier:e===`scarletOverflow`||e===`onyxEclipse`?(t.payoutMultipliers.red=this.getScaledPayoutMultiplier(`red`,n.red),t.payoutMultipliers.black=this.getScaledPayoutMultiplier(`black`,n.black)):e===`bloodSpill`&&t.bloodSpillSlots&&(t.convertNumbersToRed=t.convertNumbersToRed.filter(e=>!t.bloodSpillSlots.includes(e)),delete t.bloodSpillSlots),delete t.tempDurations[e]}}),this.battleState.activePlayedCards){let e=[],t=[];this.battleState.activePlayedCards.forEach(n=>{n.isLocked=!0,this.isCardActive(n)?t.push(n):(delete n.markedSlots,e.push(n))});let n=e.filter(e=>!e.id.includes(`_temp`)&&!e.isTemp);this.battleState.discardPile.push(...n),this.battleState.activePlayedCards=t}this.battleState.boardModifiers.freeCardsNextTurn?(this.battleState.boardModifiers.freeCardsActive=!0,this.battleState.boardModifiers.freeCardsNextTurn=!1):this.battleState.boardModifiers.freeCardsActive=!1,this.battleState.turn+=1,delete this.battleState.enemy.simulatedHand,delete this.battleState.enemy.simulatedPlays,delete this.battleState.enemy.lastChosenPlay,this.battleState.curse?.id===`curse`&&(this.runState.hp=Math.max(1,this.runState.hp-2));let n=8;this.battleState.boardModifiers.riskCapitalActive&&(n-=2),this.battleState.boardModifiers.predictiveSightPlusActive&&(n-=2,this.battleState.boardModifiers.predictiveSightPlusActive=!1),this.battleState.chipsPool=this.battleState.chipsPool||0,this.battleState.phase=`betting`,this.battleState.activeWheelOwner=`player`,this.battleState.drawsThisTurn=0,this.battleState.physicsModifiers={spinSpeed:1,ballMass:1,friction:1,bounceRandomness:.1,wheelTilt:0,targetZoneBias:0,predictionSize:0,nudgeCheatActive:!1},this.battleState.predictionSector=[],this.battleState.predictionOffset=Math.random(),this.battleState.spinSeedAngle=Math.random()*Math.PI*2,this.battleState.ballSeedAngle=Math.random()*Math.PI*2,this.battleState.spinSeedSpeed=2+Math.random()*1.5,this.battleState.ballSeedSpeed=-10-Math.random()*5,this.updateEnemyIntent();let r=this.battleState.boardModifiers.empPulseDrawNext||0;if(r>0){for(let e=0;e<r;e++)this.drawCard();this.battleState.boardModifiers.empPulseDrawNext=0}this.createTurnStartBackup()}updateEnemyIntent(){if(!this.battleState)return;let e=this.battleState.enemy;e.patternIndex=(e.patternIndex+1)%4;let t;t=e.spriteName===`decay_wheel`?[{type:`attack`,value:4,description:`Spin slam (4 damage)`},{type:`physics_debuff`,value:0,description:`Rusting Gaze (Doubles friction next turn)`},{type:`attack`,value:8,description:`Heavy Slam (8 damage)`},{type:`attack`,value:5,description:`Grinding edge (5 damage)`}][e.patternIndex]:e.spriteName===`croupier`?[{type:`steal_chips`,value:4,description:`Rake chips (Steals 4 chips)`},{type:`attack`,value:6,description:`Card slice (6 damage)`},{type:`attack`,value:8,description:`Cold gaze (8 damage)`},{type:`steal_chips`,value:3,description:`Taxation (Steals 3 chips)`}][e.patternIndex]:e.spriteName===`wraith`?[{type:`attack`,value:5,description:`Shriek (5 damage)`},{type:`attack`,value:10,description:`Soul drain (10 damage)`},{type:`attack`,value:5,description:`Essence siphon (5 damage)`},{type:`attack`,value:12,description:`Nightmare strike (12 damage)`}][e.patternIndex]:e.spriteName===`dealer_claw`?[{type:`attack`,value:9,description:`Crush (9 damage)`},{type:`steal_chips`,value:6,description:`Greedy clutch (Steals 6 chips)`},{type:`attack`,value:15,description:`Guillotine (15 damage)`},{type:`attack`,value:10,description:`Rend (10 damage)`}][e.patternIndex]:e.spriteName===`the_house`?[{type:`attack`,value:12,description:`Roof collapse (12 damage)`},{type:`steal_chips`,value:8,description:`Bankruptcy (Steals 8 chips)`},{type:`attack`,value:20,description:`Crushing Debt (20 damage)`},{type:`physics_debuff`,value:0,description:`Earthquake (Doubles friction next turn)`}][e.patternIndex]:[{type:`attack`,value:5,description:`Slash (5 damage)`},{type:`attack`,value:7,description:`Gamble slash (7 damage)`},{type:`attack`,value:4,description:`Weak poke (4 damage)`},{type:`attack`,value:8,description:`Heavy smash (8 damage)`}][e.patternIndex],e.intent={...t}}handleCombatVictory(){if(!this.battleState)return;let e=this.runState.currentFloor,t=this.runState.mapNodes[e].find(e=>e.id===this.runState.currentNodeId);t&&(t.completed=!0);let n=15+Math.floor(Math.random()*8);this.runState.chips+=n,this.battleState.boardModifiers&&this.battleState.boardModifiers.capitalVentureCount&&(this.runState.chips+=this.battleState.boardModifiers.capitalVentureCount),this.runState.currentFloor+=1,this.runState.currentFloor>=this.runState.mapNodes.length?this.runState.gameState=`VICTORY`:this.runState.gameState=`MAP`,this.battleState=null}createTurnStartBackup(){this.battleState&&(this.battleState.turnStartBackup={chipsPool:this.battleState.chipsPool,hp:this.runState.hp,physicsModifiers:JSON.parse(JSON.stringify(this.battleState.physicsModifiers)),boardModifiers:JSON.parse(JSON.stringify(this.battleState.boardModifiers)),enemyIntent:JSON.parse(JSON.stringify(this.battleState.enemy.intent)),playerWheel:JSON.parse(JSON.stringify(this.battleState.playerWheel)),enemyWheel:JSON.parse(JSON.stringify(this.battleState.enemyWheel)),spinSeedAngle:this.battleState.spinSeedAngle,ballSeedAngle:this.battleState.ballSeedAngle,spinSeedSpeed:this.battleState.spinSeedSpeed,ballSeedSpeed:this.battleState.ballSeedSpeed,hand:JSON.parse(JSON.stringify(this.battleState.hand)),drawPile:JSON.parse(JSON.stringify(this.battleState.drawPile)),discardPile:JSON.parse(JSON.stringify(this.battleState.discardPile))})}updatePrediction(){if(!this.battleState)return;let e=this.battleState.activeWheelOwner===`enemy`;if(this.battleState.physicsModifiers.predictionSize>0){let t=e?this.battleState.enemyWheel:this.battleState.playerWheel,n=this.getWinningNumbers(t);this.battleState.predictionSector=this.runPredictionDryRun(t,n)}else this.battleState.predictionSector=[]}reapplyActiveCards(){if(!this.battleState||!this.battleState.turnStartBackup)return!1;let e=this.battleState.turnStartBackup;this.battleState.chipsPool=e.chipsPool,this.runState.hp=e.hp,this.battleState.physicsModifiers=JSON.parse(JSON.stringify(e.physicsModifiers)),this.battleState.boardModifiers=JSON.parse(JSON.stringify(e.boardModifiers)),this.battleState.enemy.intent=JSON.parse(JSON.stringify(e.enemyIntent)),this.battleState.playerWheel=JSON.parse(JSON.stringify(e.playerWheel)),this.battleState.enemyWheel=JSON.parse(JSON.stringify(e.enemyWheel)),this.battleState.hand=JSON.parse(JSON.stringify(e.hand||[])),this.battleState.drawPile=JSON.parse(JSON.stringify(e.drawPile||[])),this.battleState.discardPile=JSON.parse(JSON.stringify(e.discardPile||[]));for(let e of this.battleState.activePlayedCards||[]){if(e.isLocked)continue;let t=this.battleState.hand.findIndex(t=>t.id===e.id);if(t!==-1&&this.battleState.hand.splice(t,1),!h.applyEffect(e,this.runState,this.battleState))return!1}if(this.battleState.curse){let e=this.battleState.curse.id;e===`faraday`&&(this.battleState.physicsModifiers.targetZoneBias=0,this.battleState.physicsModifiers.biasRedOnly=!1,this.battleState.physicsModifiers.biasBlackOnly=!1),e===`fog`&&(this.battleState.physicsModifiers.predictionSize=0),e===`rust`&&(this.battleState.physicsModifiers.friction*=2)}let t=this.battleState.bets.reduce((e,t)=>e+t.amount,0);return this.battleState.chipsPool-=t,this.battleState.chipsPool<0?!1:(this.updatePrediction(),!0)}playCard(e){if(!this.battleState||this.battleState.phase!==`betting`)return!1;let t=this.battleState.hand.findIndex(t=>t.id===e);if(t===-1)return!1;let n=this.battleState.hand[t],r=[...this.battleState.activePlayedCards||[]],i=[...this.battleState.hand],a=[...this.battleState.drawPile],o=[...this.battleState.discardPile],s=this.battleState.bets.map(e=>({...e})),c=this.battleState.chipsPool,l=this.runState.hp,u=JSON.parse(JSON.stringify(this.battleState.physicsModifiers)),d=JSON.parse(JSON.stringify(this.battleState.boardModifiers)),f=JSON.parse(JSON.stringify(this.battleState.enemy.intent));return this.battleState.hand.splice(t,1),this.battleState.activePlayedCards||(this.battleState.activePlayedCards=[]),this.battleState.activePlayedCards.push(n),this.reapplyActiveCards()?!0:(this.battleState.activePlayedCards=r,this.battleState.hand=i,this.battleState.drawPile=a,this.battleState.discardPile=o,this.battleState.bets=s,this.battleState.chipsPool=c,this.runState.hp=l,this.battleState.physicsModifiers=u,this.battleState.boardModifiers=d,this.battleState.enemy.intent=f,!1)}removeCard(e){if(!this.battleState||this.battleState.phase!==`betting`||!this.battleState.activePlayedCards)return!1;let t=this.battleState.activePlayedCards.findIndex(t=>t.id===e);if(t===-1)return!1;let n=this.battleState.activePlayedCards[t];if(n.isLocked)return!1;let r=[...this.battleState.activePlayedCards],i=[...this.battleState.hand],a=[...this.battleState.drawPile],o=[...this.battleState.discardPile],s=this.battleState.bets.map(e=>({...e})),c=this.battleState.chipsPool,l=this.runState.hp,u=JSON.parse(JSON.stringify(this.battleState.physicsModifiers)),d=JSON.parse(JSON.stringify(this.battleState.boardModifiers)),f=JSON.parse(JSON.stringify(this.battleState.enemy.intent));return this.battleState.activePlayedCards.splice(t,1),this.battleState.hand.push(n),this.reapplyActiveCards()?!0:(this.battleState.activePlayedCards=r,this.battleState.hand=i,this.battleState.drawPile=a,this.battleState.discardPile=o,this.battleState.bets=s,this.battleState.chipsPool=c,this.runState.hp=l,this.battleState.physicsModifiers=u,this.battleState.boardModifiers=d,this.battleState.enemy.intent=f,!1)}isCardActive(e){if(new Set([`CRIMSON_SURGE`,`DARK_FURY`,`LUCKY_SEVEN`,`UNLUCKY_THIRTEEN`,`JACKPOT_TRIO`,`DEVILS_TRIO`,`ZERO_HERO`,`EMERALD_FOREST`,`LOAN_SHARK`,`ZERO_ECLIPSE`,`MONOCHROME_EYE`,`CHIP_MINE`,`LIFE_FOUNTAIN`,`DANGER_ZONE`,`MIRROR_SLOT`]).has(e.effectId))return!0;let t={GREEN_GREED:`greenMultiplier`,PRIME_TARGET:`primeMultiplier`,HIGH_ROLLER:`highMultiplier`,LOW_SWEEP:`lowMultiplier`,EVEN_SPLIT:`evenMultiplier`,ODD_ADVANTAGE:`oddMultiplier`,FIRST_DOZEN:`dozenMultiplier_1`,SECOND_DOZEN:`dozenMultiplier_2`,THIRD_DOZEN:`dozenMultiplier_3`,SINGLE_OUT:`singleOutMultiplier`,COLUMN_WAVE:`columnMultiplier_1`,COLUMN_DRIFT:`columnMultiplier_2`,COLUMN_APEX:`columnMultiplier_3`,LUCKY_INDEX:`globalMultiplier`,SCARLET_OVERFLOW:`scarletOverflow`,ONYX_ECLIPSE:`onyxEclipse`,BLOOD_SPILL:`bloodSpill`}[e.effectId];return t&&this.battleState?.boardModifiers.tempDurations?.[t]!==void 0?this.battleState.boardModifiers.tempDurations[t]>0:!1}buyCardInShop(e,t){return this.runState.chips>=t?(this.runState.chips-=t,this.runState.deck.push(n(e)),!0):!1}healInShop(e,t){return this.runState.chips>=t&&this.runState.hp<this.runState.maxHp?(this.runState.chips-=t,this.runState.hp=Math.min(this.runState.maxHp,this.runState.hp+e),!0):!1}devAddChips(e){this.runState.chips+=e,this.battleState&&(this.battleState.chipsPool+=e)}devAdjustHp(e){this.runState.hp=Math.max(0,Math.min(this.runState.maxHp,this.runState.hp+e))}devDefeatEnemy(){this.battleState&&(this.battleState.enemy.hp=0,this.handleCombatVictory())}devDamageEnemy(e){this.battleState&&(this.runState.combatMode===`points`?this.battleState.playerScore=(this.battleState.playerScore||0)+e:(this.battleState.enemy.hp=Math.max(0,this.battleState.enemy.hp-e),this.battleState.enemy.hp===0&&this.handleCombatVictory()))}devSpawnCard(e){if(this.battleState&&this.battleState.hand.length<6){let t=n(e);this.battleState.hand.push(t)}}devAddCardToDeck(e){this.runState.deck.push(n(e))}devTeleport(e){this.battleState=null,e===`combat`||e===`elite`||e===`boss`?this.initCombat(e):e===`shop`?this.runState.gameState=`SHOP`:e===`event`?this.runState.gameState=`EVENT`:e===`forge`&&(this.runState.gameState=`FORGE`,this.initForge())}devSkipFloor(){this.runState.currentFloor+=1,this.runState.currentNodeId=null,this.battleState=null,this.runState.currentFloor>=this.runState.mapNodes.length?this.runState.gameState=`VICTORY`:this.runState.gameState=`MAP`}getActivePhysics(){return this.battleState&&this.battleState.activeWheelOwner===`enemy`?this.enemyPhysics:this.playerPhysics}initStore(){this.runState.deck=[];let t=Object.keys(e).filter(t=>e[t].rarity===`common`),r=[];for(let e=0;e<5;e++){let e=t.filter(e=>!r.includes(e));if(e.length>0){let t=e[Math.floor(Math.random()*e.length)];this.runState.deck.push(n(t)),r.push(t)}}let i=D();this.runState.selectedWheelId=i.id,this.runState.playerWheel=i;let a=[],o=Object.keys(e).filter(t=>e[t].rarity===`uncommon`),s=Object.keys(e).filter(t=>e[t].rarity===`rare`);this.shuffle(o),this.shuffle(s);for(let t=0;t<4&&t<o.length;t++){let n=o[t],r=e[n];a.push({id:`store_card_${t}`,type:`card`,itemId:n,name:r.name,description:r.description,rarity:`uncommon`,pointsCost:3,purchased:!1})}for(let t=0;t<2&&t<s.length;t++){let n=s[t],r=e[n];a.push({id:`store_card_rare_${t}`,type:`card`,itemId:n,name:r.name,description:r.description,rarity:`rare`,pointsCost:7,purchased:!1})}E().forEach((e,t)=>{a.push({id:`store_wheel_${t}`,type:`wheel`,itemId:e.id,name:e.name,description:e.description,rarity:e.rarity||`common`,pointsCost:e.pointsCost||5,purchased:!1})}),this.runState.storePoints=10,this.runState.storeItems=a,this.runState.gameState=`LOADOUT_STORE`}purchaseStoreItem(e){if(!this.runState.storeItems||this.runState.storePoints===void 0)return!1;let t=this.runState.storeItems.find(t=>t.id===e);if(!t||t.purchased||this.runState.storePoints<t.pointsCost)return!1;if(this.runState.storePoints-=t.pointsCost,t.purchased=!0,t.type===`card`)this.runState.deck.push(n(t.itemId));else if(t.type===`wheel`){let e=T().find(e=>e.id===t.itemId);e&&(this.runState.selectedWheelId=e.id,this.runState.playerWheel=JSON.parse(JSON.stringify(e)))}return!0}completeStore(){this.runState.storeItems=void 0,this.runState.storePoints=void 0,this.runState.gameState=`MAP`}selectStartingWheel(e){let t=O[e];return t&&(this.runState.selectedWheelId=e,this.runState.playerWheel=JSON.parse(JSON.stringify(t))),!1}static getAllCardTemplates(){return Object.keys(e).map(t=>{let n=e[t];return{key:t,name:n.name,description:n.description,cost:n.cost,type:n.type,rarity:n.rarity,effectId:n.effectId}})}buyBoardUpgrade(e){let t=k[e];if(!t)return!1;let n=t.cost;if(e.startsWith(`level_`)){let t=e.replace(`level_`,``);this.runState.colorLevels||(this.runState.colorLevels={red:1,black:1,green:1,gold:1,purple:1,cyan:1,crimson:1});let r=this.runState.colorLevels[t]||1;if(r>=10)return!1;n=15+(r-1)*5}if(this.runState.chips>=n){if(this.runState.chips-=n,e.startsWith(`level_`)){let t=e.replace(`level_`,``);this.runState.colorLevels[t]=(this.runState.colorLevels[t]||1)+1}else this.runState.colorUnlocks||(this.runState.colorUnlocks={red_ability:!1,black_ability:!1,green_ability:!1}),e===`red_ability_unlock`?this.runState.colorUnlocks.red_ability=!0:e===`black_ability_unlock`?this.runState.colorUnlocks.black_ability=!0:e===`green_ability_unlock`&&(this.runState.colorUnlocks.green_ability=!0),A(this.runState.playerWheel,t);return!0}return!1}initForge(){this.runState.forgeRerollCount=0,this.runState.forgeCards=this.generateForgeOffers()}generateForgeOffers(){let e=[],t=this.runState.playerWheel;for(;e.length<3;){let n=Math.random(),r=`bronze`;n<.15?r=`gold`:n<.5&&(r=`silver`);let i;if(r===`bronze`){let e=[`destroy_random`,`remove_color`,`add_color`,`upgrade_multiplier`];i=e[Math.floor(Math.random()*e.length)]}else if(r===`silver`){let e=[`destroy_random`,`remove_color`,`remove_green`,`add_color`,`convert_color`,`upgrade_multiplier`];i=e[Math.floor(Math.random()*e.length)]}else{let e=[`destroy_random`,`add_color`,`convert_color`,`upgrade_multiplier`];i=e[Math.floor(Math.random()*e.length)]}let a=``,o=``,s=10,l={},u=!0;if(i===`destroy_random`){let e=r===`bronze`?2:r===`silver`?3:4;s=r===`bronze`?10:r===`silver`?15:20,a=`${r.toUpperCase()} CRUCIBLE`,o=`Destroy ${e} random slots on your wheel.`,l={count:e},t.numbers.length-e<2&&(u=!1)}else if(i===`remove_color`){let e=r===`bronze`?1:r===`silver`?2:3;s=r===`bronze`?8:r===`silver`?12:18;let n=Math.random()<.5?`red`:`black`;a=`${n.toUpperCase()} PURGE`,o=`Destroy ${e} random ${n} slots on your wheel.`,l={count:e,color:n},(t.numbers.filter(e=>c(e,t)===n).length<e||t.numbers.length-e<2)&&(u=!1)}else if(i===`remove_green`)s=10,a=`GREEN EXORCISM`,o=`Destroy 1 random green or gold slot on your wheel.`,l={count:1,color:`green`},(t.numbers.filter(e=>c(e,t)===`green`||c(e,t)===`gold`).length<1||t.numbers.length-1<2)&&(u=!1);else if(i===`add_color`){let e=`red`,n=1;if(r===`bronze`)e=Math.random()<.5?`red`:`black`,n=Math.random()<.5?1:2,s=n===1?8:12,a=`${e.toUpperCase()} INJECTION`,o=`Add ${n} missing slots to your wheel as ${e}.`;else if(r===`silver`){let t=[`red`,`black`,`gold`,`purple`,`cyan`];e=t[Math.floor(Math.random()*t.length)],e===`red`||e===`black`?(n=2,s=12):(n=1,s=15),a=`${e.toUpperCase()} FORGE`,o=`Add ${n} missing slots to your wheel as ${e.toUpperCase()}.`}else{let t=[`gold`,`purple`,`cyan`,`crimson`];e=t[Math.floor(Math.random()*t.length)],n=e===`crimson`?1:2,s=22,a=`${e.toUpperCase()} INFUSION`,o=`Add ${n} missing slots to your wheel as ${e.toUpperCase()}.`}l={count:n,color:e};let i=[];for(let e=0;e<=36;e++)t.numbers.includes(e)||i.push(e);i.length<n&&(u=!1)}else if(i===`convert_color`){let e=`red`,n=`green`,i=2;if(r===`silver`){e=Math.random()<.5?`red`:`black`;let t=[`green`,`gold`,`purple`,`cyan`];n=t[Math.floor(Math.random()*t.length)],i=2,s=14,a=`${e.toUpperCase()} MUTATION`,o=`Convert ${i} random ${e.toUpperCase()} slots to ${n.toUpperCase()}.`}else{e=Math.random()<.5?`red`:`black`;let t=[`green`,`gold`,`purple`,`cyan`,`crimson`];n=t[Math.floor(Math.random()*t.length)],i=n===`crimson`?2:3,s=n===`crimson`?25:20,a=`${e.toUpperCase()} ALCHEMY`,o=`Convert ${i} random ${e.toUpperCase()} slots to ${n.toUpperCase()}.`}l={count:i,fromColor:e,toColor:n},t.numbers.filter(n=>c(n,t)===e).length<i&&(u=!1)}else if(i===`upgrade_multiplier`){s=r===`bronze`?10:r===`silver`?18:25;let e=[`red`,`black`,`green`,`number`,`odd`,`even`],t=e[Math.floor(Math.random()*e.length)];t=r===`gold`?Math.random()<.5?`green`:`number`:r===`silver`?Math.random()<.4?`green`:Math.random()<.8?`number`:`red`:Math.random()<.25?`red`:Math.random()<.5?`black`:Math.random()<.75?`odd`:`even`;let n=.2;n=t===`green`||t===`number`?r===`silver`?2:r===`gold`?5:1:r===`gold`?.5:.2,a=`${t.toUpperCase()} BOOST`,o=`Upgrade ${t} bet payout multiplier by +${n}x.`,l={upgradeType:t,upgradeAmount:n}}u&&(e.some(e=>e.name===a)||e.push({id:`forge-card-${e.length}-${Date.now()}`,name:a,description:o,rarity:r,cost:s,effect:{type:i,params:l},purchased:!1}))}return e}purchaseForgeCard(e){if(!this.runState.forgeCards)return!1;let t=this.runState.forgeCards.find(t=>t.id===e);if(!t||t.purchased||this.runState.chips<t.cost)return!1;this.runState.chips-=t.cost,t.purchased=!0;let n=this.runState.playerWheel,r=t.effect,i=(e,t)=>{n.colors[e]=t,t===`green`?n.greenNumbers.includes(e)||n.greenNumbers.push(e):n.greenNumbers=n.greenNumbers.filter(t=>t!==e)};if(r.type===`destroy_random`){let e=r.params.count||1,t=[...n.numbers];for(let r=0;r<e&&!(t.length<=2);r++){let e=Math.floor(Math.random()*t.length),r=t.splice(e,1)[0];n.numbers=n.numbers.filter(e=>e!==r),n.greenNumbers=n.greenNumbers.filter(e=>e!==r),delete n.colors[r]}}else if(r.type===`remove_color`){let e=r.params.count||1,t=r.params.color;for(let r=0;r<e;r++){let e=n.numbers.filter(e=>c(e,n)===t);if(e.length===0||n.numbers.length<=2)break;let r=e[Math.floor(Math.random()*e.length)];n.numbers=n.numbers.filter(e=>e!==r),n.greenNumbers=n.greenNumbers.filter(e=>e!==r),delete n.colors[r]}}else if(r.type===`remove_green`){let e=r.params.count||1;for(let t=0;t<e;t++){let e=n.numbers.filter(e=>c(e,n)===`green`||c(e,n)===`gold`);if(e.length===0||n.numbers.length<=2)break;let t=e[Math.floor(Math.random()*e.length)];n.numbers=n.numbers.filter(e=>e!==t),n.greenNumbers=n.greenNumbers.filter(e=>e!==t),delete n.colors[t]}}else if(r.type===`add_color`){let e=r.params.count||1,t=r.params.color;for(let r=0;r<e;r++){let e=[];for(let t=0;t<=36;t++)n.numbers.includes(t)||e.push(t);if(e.length===0)break;let r=e[Math.floor(Math.random()*e.length)];n.numbers.push(r),i(r,t)}}else if(r.type===`convert_color`){let e=r.params.count||1,t=r.params.fromColor,a=r.params.toColor;for(let r=0;r<e;r++){let e=n.numbers.filter(e=>c(e,n)===t);if(e.length===0)break;let r=e[Math.floor(Math.random()*e.length)];i(r,a)}}else if(r.type===`upgrade_multiplier`){let e=r.params.upgradeType,t=r.params.upgradeAmount;n.payoutMultipliers[e]=parseFloat((n.payoutMultipliers[e]+t).toFixed(1))}return!0}rerollForge(){return this.runState.chips<5?!1:(this.runState.chips-=5,this.runState.forgeRerollCount=(this.runState.forgeRerollCount||0)+1,this.runState.forgeCards=this.generateForgeOffers(),!0)}simulateEnemyPlay(){if(!this.battleState)return{hand:[],allPlays:[]};let e=this.battleState.enemy,t=this.battleState.enemyWheel,r=[];e.spriteName===`wraith`?r.push(`crimson_double`,`dark_fury`,`attraction_coil`,`repulsion_coil`):e.spriteName===`croupier`?r.push(`green_greed`,`steel_barricade`,`scrap_shield`):e.spriteName===`decay_wheel`?r.push(`friction_oil`,`focus_sight`):e.isBoss?r.push(`crimson_double`,`dark_fury`,`green_greed`,`predictive_sight`,`eagle_eye`,`fortress_shield`):e.isElite?r.push(`predictive_sight`,`steel_barricade`,`attraction_coil`,`repulsion_coil`):r.push(`scrap_shield`,`focus_sight`);let i=[];e.simulatedHand&&e.simulatedHand.length>0?i=e.simulatedHand:(i=[...r].sort(()=>Math.random()-.5).slice(0,2).map(e=>n(e)).filter(Boolean),e.simulatedHand=i);let a=[null,...i],o=this.runState.combatMode===`points`,s=.1,l=this.battleState.playerScore||0,u=this.battleState.enemyScore||0,d=this.battleState.turn,f=this.battleState.maxRounds||3;o&&(u<l&&(s=Math.min(1,.1+(l-u)*.08)),d>=f&&u<l&&(s=1));let p=(e,n,r)=>{let i=JSON.parse(JSON.stringify(this.battleState.physicsModifiers)),a=JSON.parse(JSON.stringify(this.battleState.boardModifiers));if(e){let t={...e,cost:0};h.applyEffect(t,this.runState,this.battleState)}let o=[];if(this.battleState.physicsModifiers.predictionSize>0){let e=this.getWinningNumbers(t);o=this.runPredictionDryRun(t,e)}let c=this.calculateBetEV(n,r,t,o,this.battleState.boardModifiers),l=.1;n===`number`?l=1:n===`green`?l=.8:[`gold`,`purple`,`cyan`,`crimson`].includes(n)&&(l=.5);let u=c*(1-Math.abs(l-s));return this.battleState.physicsModifiers=i,this.battleState.boardModifiers=a,u},m=[],g=[`red`,`black`,`green`,`odd`,`even`],_=e=>t.numbers.some(n=>c(n,t)===e);return _(`gold`)&&g.push(`gold`),_(`purple`)&&g.push(`purple`),_(`cyan`)&&g.push(`cyan`),_(`crimson`)&&g.push(`crimson`),a.forEach(e=>{g.forEach(t=>{let n=p(e,t);m.push({card:e,betType:t,score:n})});let n=JSON.parse(JSON.stringify(this.battleState.physicsModifiers)),r=JSON.parse(JSON.stringify(this.battleState.boardModifiers));if(e){let t={...e,cost:0};h.applyEffect(t,this.runState,this.battleState)}let i=[];if(this.battleState.physicsModifiers.predictionSize>0){let e=this.getWinningNumbers(t);i=this.runPredictionDryRun(t,e)}this.battleState.physicsModifiers=n,this.battleState.boardModifiers=r,i.forEach(t=>{let n=p(e,`number`,t);m.push({card:e,betType:`number`,numberValue:t,score:n})})}),m.sort((e,t)=>t.score-e.score),{hand:i,allPlays:m}}chooseEnemyPlay(){if(!this.battleState)return{bets:[{type:`red`,amount:1}],card:null,betType:`red`};let e=this.battleState.enemy,t=e.difficulty===void 0?.5:e.difficulty;this.battleState.playerTurnModifiersBackup={physicsModifiers:JSON.parse(JSON.stringify(this.battleState.physicsModifiers)),boardModifiers:JSON.parse(JSON.stringify(this.battleState.boardModifiers)),predictionSector:this.battleState.predictionSector?[...this.battleState.predictionSector]:[]},this.battleState.physicsModifiers={spinSpeed:1,ballMass:1,friction:1,bounceRandomness:.1,wheelTilt:0,targetZoneBias:0,predictionSize:0,nudgeCheatActive:!1},this.battleState.boardModifiers={extraGreenSlots:0,convertNumbersToRed:[],convertNumbersToBlack:[],convertNumbersToGreen:[],convertNumbersToGold:[],convertNumbersToPurple:[],convertNumbersToCyan:[],convertNumbersToCrimson:[],capitalVentureCount:0,customSlotColors:{},payoutMultipliers:{red:this.battleState.enemyWheel.payoutMultipliers.red,black:this.battleState.enemyWheel.payoutMultipliers.black,green:this.battleState.enemyWheel.payoutMultipliers.green,number:this.battleState.enemyWheel.payoutMultipliers.number,odd:this.battleState.enemyWheel.payoutMultipliers.odd,even:this.battleState.enemyWheel.payoutMultipliers.even},goldFoils:[],copperPlates:[],tempDurations:{},bloodSpillSlots:[]};let n=this.battleState.playerTurnModifiersBackup.boardModifiers;n&&(n.dangerZones&&(this.battleState.boardModifiers.dangerZones=JSON.parse(JSON.stringify(n.dangerZones))),n.cursedZones&&(this.battleState.boardModifiers.cursedZones=[...n.cursedZones])),this.battleState.predictionSector=[];let{hand:r,allPlays:i}=this.simulateEnemyPlay();e.simulatedHand=r,e.simulatedPlays=i;let a=i[0];Math.random()>t&&i.length>1&&(a=i[Math.floor(Math.random()*Math.min(10,i.length))]),e.lastChosenPlay=a,a.card?(this.applyEnemyCard(a.card),e.activeCard=a.card):e.activeCard=null;let o=this.battleState.enemyWheel,s=this.battleState.boardModifiers,l=this.runState.combatMode===`points`,u=.1,d=this.battleState.playerScore||0,f=this.battleState.enemyScore||0,p=this.battleState.turn,m=this.battleState.maxRounds||3;l&&(f<d&&(u=Math.min(1,.1+(d-f)*.08)),p>=m&&f<d&&(u=1));let h=[`red`,`black`,`green`,`odd`,`even`],g=e=>o.numbers.some(t=>c(t,o,s)===e);g(`gold`)&&h.push(`gold`),g(`purple`)&&h.push(`purple`),g(`cyan`)&&h.push(`cyan`),g(`crimson`)&&h.push(`crimson`);let _=[];if(this.battleState.physicsModifiers.predictionSize>0){let e=this.getWinningNumbers(o);_=this.runPredictionDryRun(o,e)}let v=[];h.forEach(e=>{let t=this.calculateBetEV(e,void 0,o,_,s),n=.1;e===`green`?n=.8:[`gold`,`purple`,`cyan`,`crimson`].includes(e)&&(n=.5);let r=t*(1-Math.abs(n-u));v.push({type:e,ev:t,score:r})}),_.forEach(e=>{let t=this.calculateBetEV(`number`,e,o,_,s),n=t*(1-Math.abs(1-u));v.push({type:`number`,numberValue:e,ev:t,score:n})}),v.sort((e,t)=>t.score-e.score);let y=[],b=new Set;for(let e of v){if(e.score<=0&&y.length>0)continue;let t=e.type===`number`?`number_${e.numberValue}`:e.type;if(!b.has(t)&&!(e.type===`red`&&b.has(`black`))&&!(e.type===`black`&&b.has(`red`))&&!(e.type===`odd`&&b.has(`even`))&&!(e.type===`even`&&b.has(`odd`))&&(b.add(t),y.push(e),y.length>=3))break}y.length===0&&v.length>0&&y.push(v[0]);let x=this.battleState.enemyChipsPool===void 0?1/0:this.battleState.enemyChipsPool,S=Math.max(0,Math.min(x,e.intent.value)),C=[],w=S,T=Math.min(3,y.length,S);for(let e=0;e<T;e++){let t=0;if(e===T-1)t=w;else{t=Math.max(1,Math.round(S*(T===3?e===0?.5:.3:.65)));let n=T-1-e;t>w-n&&(t=w-n)}t>0&&(C.push({type:y[e].type,amount:t,numberValue:y[e].numberValue}),w-=t)}return C.length===0&&S>0&&C.push({type:`red`,amount:S}),{bets:C,card:a.card,betType:C[0].type,numberValue:C[0].numberValue}}calculateBetEV(e,t,n,r,i){let a=2;e===`red`?a=i.payoutMultipliers.red:e===`black`?a=i.payoutMultipliers.black:e===`green`?a=i.payoutMultipliers.green:e===`number`?a=i.payoutMultipliers.number:e===`gold`?a=this.getScaledPayoutMultiplier(`gold`,n.payoutMultipliers.gold||4):e===`purple`?a=this.getScaledPayoutMultiplier(`purple`,n.payoutMultipliers.purple||4):e===`cyan`?a=this.getScaledPayoutMultiplier(`cyan`,n.payoutMultipliers.cyan||4):e===`crimson`?a=this.getScaledPayoutMultiplier(`crimson`,n.payoutMultipliers.crimson||6):e===`odd`?a=i.payoutMultipliers.odd:e===`even`&&(a=i.payoutMultipliers.even);let o=n.numbers.length;if(r.length>0){let o=0;r.forEach(r=>{this.isBetWinning(e,t,r,n,i)&&o++});let s=r.length,c=(this.battleState?.activePlayedCards||[]).some(e=>e.type===`physics`&&(e.rarity===`common`||e.rarity===`uncommon`))?.3:1,l=1;return s===9||s===7?l=.3:s===5||s===3?l=.5:s===1?l=1:s>0&&(s>=7?l=.3:s>=3&&(l=.5)),o/r.length*(a*Math.min(l,c))}else{let r=(this.battleState?.activePlayedCards||[]).some(e=>e.type===`physics`&&(e.rarity===`common`||e.rarity===`uncommon`))?.3:1,s=0;return n.numbers.forEach(r=>{this.isBetWinning(e,t,r,n,i)&&s++}),s/o*a*r}}isBetWinning(e,t,n,r,i){let a=c(n,r,i),o=u(a,n,r.greenNumbers);return e===`red`&&o===`red`||e===`black`&&o===`black`||e===`green`&&o===`green`||e===`number`&&t===n||e===`odd`&&!r.greenNumbers.includes(n)&&n%2!=0||e===`even`&&!r.greenNumbers.includes(n)&&n%2==0||e===`gold`&&a===`gold`||e===`purple`&&a===`purple`||e===`cyan`&&a===`cyan`||e===`crimson`&&a===`crimson`}applyEnemyCard(e){if(!this.battleState)return;let t={...e,cost:0};h.applyEffect(t,this.runState,this.battleState),this.updatePrediction()}},re=class{ctx=null;droneOsc=null;droneGain=null;titleBuffers=[];titleSources=[];titleGains=[];isTitleMusicLoading=!1;isTitleMusicPlaying=!1;titleLoopTimeout=null;titleLoopCount=0;titleLayersDirection=`up`;titleActiveLevel=1;musicVolume=.55;droneVolume=.15;sfxVolume=.8;constructor(){}initContext(){this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.startAmbientDrone()),this.ctx&&this.ctx.state===`suspended`&&this.ctx.resume().catch(e=>console.warn(`Failed to resume AudioContext:`,e))}setMusicVolume(e){this.musicVolume=Math.max(0,Math.min(1,e))}setDroneVolume(e){this.droneVolume=Math.max(0,Math.min(1,e)),this.droneGain&&this.ctx&&this.droneGain.gain.setValueAtTime(.006*this.droneVolume,this.ctx.currentTime)}setSfxVolume(e){this.sfxVolume=Math.max(0,Math.min(1,e))}startAmbientDrone(){if(!this.ctx)return;this.droneOsc=this.ctx.createOscillator(),this.droneGain=this.ctx.createGain(),this.droneOsc.type=`sawtooth`,this.droneOsc.frequency.value=45;let e=this.ctx.createBiquadFilter();e.type=`lowpass`,e.frequency.value=120,e.Q.value=3;let t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.value=.2,n.gain.value=.002*this.droneVolume,t.connect(n),n.connect(this.droneGain.gain),this.droneOsc.connect(e),e.connect(this.droneGain),this.droneGain.connect(this.ctx.destination),this.droneGain.gain.value=.006*this.droneVolume,this.droneOsc.start(0),t.start(0)}playCardSwoosh(){if(this.initContext(),!this.ctx)return;let e=this.ctx.sampleRate*.35,t=this.ctx.createBuffer(1,e,this.ctx.sampleRate),n=t.getChannelData(0);for(let t=0;t<e;t++)n[t]=Math.random()*2-1;let r=this.ctx.createBufferSource();r.buffer=t;let i=this.ctx.createBiquadFilter();i.type=`bandpass`,i.frequency.setValueAtTime(200,this.ctx.currentTime),i.frequency.exponentialRampToValueAtTime(1200,this.ctx.currentTime+.1),i.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.3),i.Q.value=2;let a=this.ctx.createGain();a.gain.setValueAtTime(.08*this.sfxVolume,this.ctx.currentTime),a.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),r.connect(i),i.connect(a),a.connect(this.ctx.destination),r.start()}playRouletteClick(e=1){if(this.initContext(),!this.ctx)return;let t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`triangle`,t.frequency.setValueAtTime(800*e,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.02),n.gain.setValueAtTime(.3*this.sfxVolume,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.025),t.connect(n),n.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.03)}playDraw(){if(this.initContext(),!this.ctx)return;let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type=`sine`,e.frequency.setValueAtTime(300,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(150,this.ctx.currentTime+.08),t.gain.setValueAtTime(.12*this.sfxVolume,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.09),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.1)}playChipPlace(){if(this.initContext(),!this.ctx)return;let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type=`triangle`,e.frequency.setValueAtTime(600,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(150,this.ctx.currentTime+.015),t.gain.setValueAtTime(.15*this.sfxVolume,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.02),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.025)}playDamageDealt(){if(this.initContext(),!this.ctx)return;let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type=`sawtooth`,e.frequency.setValueAtTime(120,this.ctx.currentTime),e.frequency.linearRampToValueAtTime(40,this.ctx.currentTime+.4);let n=this.ctx.createBiquadFilter();n.type=`lowpass`,n.frequency.value=150,t.gain.setValueAtTime(.4*this.sfxVolume,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),e.connect(n),n.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.5)}playBell(){if(this.initContext(),!this.ctx)return;let e=this.ctx.currentTime,t=[523.25,783.99,1046.5,1318.51],n=[.12,.08,.06,.04];t.forEach((t,r)=>{let i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`sine`,i.frequency.setValueAtTime(t,e),a.gain.setValueAtTime(n[r]*this.sfxVolume,e),a.gain.exponentialRampToValueAtTime(1e-4,e+2),i.frequency.linearRampToValueAtTime(t-2,e+2),i.connect(a),a.connect(this.ctx.destination),i.start(e),i.stop(e+2)})}playSpecialPhysicsClick(e,t=1){if(this.initContext(),!this.ctx)return;let n=this.ctx.createOscillator(),r=this.ctx.createGain();if(e===`magnetic`){n.type=`sine`,n.frequency.setValueAtTime(1400*t,this.ctx.currentTime),n.frequency.linearRampToValueAtTime(400,this.ctx.currentTime+.05),r.gain.setValueAtTime(.015*this.sfxVolume,this.ctx.currentTime),r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.06);let e=this.ctx.createOscillator(),i=this.ctx.createGain();e.type=`sine`,e.frequency.setValueAtTime(180*t,this.ctx.currentTime),e.connect(i),i.gain.setValueAtTime(.01*this.sfxVolume,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.06),i.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.06)}else e===`nudge`?(n.type=`triangle`,n.frequency.setValueAtTime(900*t,this.ctx.currentTime),n.frequency.setValueAtTime(1200*t,this.ctx.currentTime+.015),r.gain.setValueAtTime(.02*this.sfxVolume,this.ctx.currentTime),r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.035)):e===`friction`?(n.type=`triangle`,n.frequency.setValueAtTime(350*t,this.ctx.currentTime),n.frequency.exponentialRampToValueAtTime(30,this.ctx.currentTime+.04),r.gain.setValueAtTime(.03*this.sfxVolume,this.ctx.currentTime),r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.045)):e===`tilt`?(n.type=`triangle`,n.frequency.setValueAtTime(600*t,this.ctx.currentTime),n.frequency.exponentialRampToValueAtTime(250,this.ctx.currentTime+.05),r.gain.setValueAtTime(.02*this.sfxVolume,this.ctx.currentTime),r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.065)):e===`mass`?(n.type=`triangle`,n.frequency.setValueAtTime(140*t,this.ctx.currentTime),n.frequency.exponentialRampToValueAtTime(15,this.ctx.currentTime+.09),r.gain.setValueAtTime(.05*this.sfxVolume,this.ctx.currentTime),r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1)):(n.type=`triangle`,n.frequency.setValueAtTime(800*t,this.ctx.currentTime),n.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.02),r.gain.setValueAtTime(.05*this.sfxVolume,this.ctx.currentTime),r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.025));n.connect(r),r.connect(this.ctx.destination),n.start(),n.stop(this.ctx.currentTime+.11)}playPegBounce(e=1){if(this.initContext(),!this.ctx)return;let t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(1400*e,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(700*e,this.ctx.currentTime+.035);let r=this.ctx.createBiquadFilter();r.type=`highpass`,r.frequency.value=1e3,n.gain.setValueAtTime(.18*this.sfxVolume,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.045),t.connect(r),r.connect(n),n.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.05)}playHammerStrike(){if(this.initContext(),!this.ctx)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(1200,e),t.frequency.exponentialRampToValueAtTime(800,e+.3),n.gain.setValueAtTime(.15*this.sfxVolume,e),n.gain.exponentialRampToValueAtTime(.001,e+.3);let r=this.ctx.createBiquadFilter();r.type=`highpass`,r.frequency.value=600,t.connect(r),r.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.35);let i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`triangle`,i.frequency.setValueAtTime(150,e),i.frequency.exponentialRampToValueAtTime(40,e+.15),a.gain.setValueAtTime(.3*this.sfxVolume,e),a.gain.exponentialRampToValueAtTime(.001,e+.18),i.connect(a),a.connect(this.ctx.destination),i.start(e),i.stop(e+.2)}musicInterval=null;currentMusicType=null;currentStep=0;playSynthNote(e,t,n,r,i){if(this.initContext(),!this.ctx)return;let a=this.ctx.currentTime,o=this.ctx.createOscillator(),s=this.ctx.createGain();o.type=n,o.frequency.setValueAtTime(e,a),i&&o.frequency.exponentialRampToValueAtTime(i,a+t),s.gain.setValueAtTime(r*this.musicVolume,a),s.gain.exponentialRampToValueAtTime(1e-4,a+t),o.connect(s),s.connect(this.ctx.destination),o.start(a),o.stop(a+t+.05)}playEncounterMusic(e){if(this.initContext(),!this.ctx||this.currentMusicType===e)return;this.stopMusic(),this.currentMusicType=e,this.currentStep=0;let t=280;t=e===`combat`?280:e===`elite`?220:e===`boss`?180:1200;let n=e=>440*2**((e-69)/12);this.musicInterval=setInterval(()=>{if(!this.ctx)return;let t=this.currentStep;if(e===`ambient`){if(Math.random()<.4){let e=[57,60,62,64,67,69,72],t=e[Math.floor(Math.random()*e.length)];this.playSynthNote(n(t+12),2.5,`sine`,.04)}}else if(e===`combat`){if(t%2==0){let e=[45,45,48,50,45,45,52,48],r=e[t/2%e.length];this.playSynthNote(n(r),.35,`triangle`,.08)}let e=[57,64,60,69,62,69,65,67],r=e[t%e.length];this.playSynthNote(n(r),.2,`sine`,.035)}else if(e===`elite`){if(t%2==0){let e=[39,42,45,48],r=e[t/2%e.length];this.playSynthNote(n(r),.28,`triangle`,.09)}let e=[51,57,54,60,57,63,60,66],r=e[t%e.length];this.playSynthNote(n(r),.18,`triangle`,.04)}else if(e===`boss`){if(t%4==0){let e=[40,41,40,39],r=e[t/4%e.length];this.playSynthNote(n(r),.35,`sawtooth`,.06)}let e=[64,65,64,63,67,66,65,64,60,61,60,59,64,63,62,60],r=e[t%e.length];t%2==0?this.playSynthNote(n(r),.14,`square`,.02):t%7==0&&this.playSynthNote(n(r+12),.32,`sawtooth`,.02,n(r))}this.currentStep=(this.currentStep+1)%16},t)}stopMusic(){this.musicInterval&&=(clearInterval(this.musicInterval),null),this.currentMusicType=null}async loadAudioBuffer(e){if(this.initContext(),!this.ctx)throw Error(`AudioContext not initialized`);let t=await(await fetch(e)).arrayBuffer();return await this.ctx.decodeAudioData(t)}async loadTitleMusic(){if(!(this.titleBuffers.length>0||this.isTitleMusicLoading)){this.isTitleMusicLoading=!0;try{let e=[`/audio/music/title_layer1.ogg`,`/audio/music/title_layer2.ogg`,`/audio/music/title_layer3.ogg`,`/audio/music/title_layer4.ogg`];this.titleBuffers=await Promise.all(e.map(e=>this.loadAudioBuffer(e))),console.log(`Title music stems loaded successfully.`)}catch(e){console.warn(`Failed to load title music stems:`,e)}finally{this.isTitleMusicLoading=!1}}}scheduleFade(e,t,n,r){this.ctx&&(e.gain.setValueAtTime(e.gain.value,n),e.gain.linearRampToValueAtTime(t,n+r))}runTitleMusicScheduler(e){if(!this.isTitleMusicPlaying||!this.ctx)return;let t=[0,0,0,0];this.titleLoopCount++;let n=[3,1,2,0];if(this.titleLayersDirection===`up`){this.titleActiveLevel++,this.titleActiveLevel>=4&&(this.titleActiveLevel=4,this.titleLayersDirection=`down`);for(let e=0;e<this.titleActiveLevel;e++){let r=n[e];t[r]=1}}else if(Math.random()<.4){this.titleActiveLevel=1,this.titleLayersDirection=`up`;let e=[3,1,2][Math.floor(Math.random()*3)];t[e]=1}else{this.titleActiveLevel--,this.titleActiveLevel<=1&&(this.titleActiveLevel=1,this.titleLayersDirection=`up`);for(let e=0;e<this.titleActiveLevel;e++){let r=n[e];t[r]=1}}let r=this.ctx.currentTime;for(let e=0;e<4;e++)if(this.titleGains[e]){let n=this.titleGains[e].gain.value,i=t[e]*this.musicVolume;this.titleGains[e].gain.cancelScheduledValues(r),this.titleGains[e].gain.setValueAtTime(n,r),this.titleGains[e].gain.linearRampToValueAtTime(i,r+1.2)}this.titleLoopTimeout=setTimeout(()=>{this.runTitleMusicScheduler(e)},e*1e3)}playTitleMusic(){if(this.initContext(),this.ctx){if(this.isTitleMusicPlaying){this.ctx.state===`suspended`&&this.ctx.resume().catch(e=>console.warn(`Failed to resume AudioContext:`,e));return}this.loadTitleMusic().then(()=>{if(!this.ctx||this.titleBuffers.length<4||this.isTitleMusicPlaying)return;this.isTitleMusicPlaying=!0;let e=this.ctx.currentTime;this.titleSources=[],this.titleGains=[],this.titleLoopCount=0,this.titleLayersDirection=`up`,this.titleActiveLevel=1;for(let t=0;t<4;t++){let n=this.ctx.createBufferSource();n.buffer=this.titleBuffers[t],n.loop=!0;let r=this.ctx.createGain(),i=t===3?this.musicVolume:0;r.gain.setValueAtTime(i,e),n.connect(r),r.connect(this.ctx.destination),this.titleSources.push(n),this.titleGains.push(r),n.start(e)}let t=this.titleBuffers[0].duration;this.titleLoopTimeout=setTimeout(()=>{this.runTitleMusicScheduler(t)},t*1e3)})}}stopTitleMusic(e=0){if(this.titleLoopTimeout&&=(clearTimeout(this.titleLoopTimeout),null),e>0&&this.ctx&&this.titleSources.length>0){let t=this.ctx.currentTime;this.titleGains.forEach(n=>{if(n){let r=n.gain.value;n.gain.cancelScheduledValues(t),n.gain.setValueAtTime(r,t),n.gain.linearRampToValueAtTime(0,t+e)}});let n=[...this.titleSources];setTimeout(()=>{n.forEach(e=>{try{e.stop()}catch{}})},e*1e3),this.titleSources=[],this.titleGains=[],this.isTitleMusicPlaying=!1}else this.titleSources.forEach(e=>{try{e.stop()}catch{}}),this.titleSources=[],this.titleGains=[],this.isTitleMusicPlaying=!1}getAudioDiagnostics(){return{masterMusicVolume:this.musicVolume,masterDroneVolume:this.droneVolume,masterSfxVolume:this.sfxVolume,currentMusicType:this.currentMusicType,isTitleMusicPlaying:this.isTitleMusicPlaying,titleLoopCount:this.titleLoopCount,titleLayersDirection:this.titleLayersDirection,titleActiveLevel:this.titleActiveLevel,layerVolumes:this.titleGains.map(e=>e?e.gain.value:0)}}},ie=class{engine;sound;root;currentBetAmount=5;selectedBetType=`red`;selectedBetNumber=0;activeBrush=0;spinMessage=``;isSpinning=!1;showTurnEnd=!1;isEnemyResolutionReport=!1;shopCards=[];activeShopTab=`cards`;codexRarityFilter=`all`;codexTypeFilter=`all`;mobileModeActive=!1;isCombatIntroActive=!1;selectedFloors=7;hoveredForgeCardId=null;isCustomizingWheel=!1;customWheelData={id:`custom`,name:`Custom Destroyer`,description:`A bespoke engine of risk and reward.`,numbers:[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26],greenNumbers:[0],colors:{},payoutMultipliers:{red:2,black:2,green:10,number:12,odd:2,even:2,gold:4,purple:4,cyan:4,crimson:6},upgrades:[]};initCustomColors(){this.customWheelData.colors={};let e=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);for(let t=0;t<=36;t++)this.customWheelData.greenNumbers.includes(t)?this.customWheelData.colors[t]=`green`:this.customWheelData.colors[t]=e.has(t)?`red`:`black`}currentView=4;onViewChanged;renderer=null;lastWheelView=3;lastEncounterId=``;setRenderer(e){this.renderer=e,e.ui=this}purchaseShopCard(e){if(this.engine.runState,e===999)return this.engine.healInShop(25,12)?(this.sound.playDraw(),this.render(),!0):!1;let t=this.shopCards[e];return t&&this.engine.buyCardInShop(t.cardId,t.cost)?(this.sound.playDraw(),this.shopCards.splice(e,1),this.render(),!0):!1}purchaseBoardUpgrade(e){return this.engine.buyBoardUpgrade(e)?(this.sound.playDraw(),this.render(),!0):!1}makeEventChoice(t){let n=this.engine.runState;if(this.sound.playDraw(),t===`1`)n.hp=Math.max(1,n.hp-8),n.chips+=25;else if(t===`2`){let t=e.magnetic_force;n.deck.push({id:`magnetic_force_${Math.random()}`,name:t.name,description:t.description,cost:t.cost,type:t.type,rarity:t.rarity,effectId:t.effectId})}let r=n.currentFloor,i=n.mapNodes[r].find(e=>e.id===n.currentNodeId);i&&(i.completed=!0),n.currentFloor+=1,n.gameState=`MAP`,this.render()}updateShopDescriptionBox(){let e=this.root.querySelector(`#shop-card-desc-box`),t=this.root.querySelector(`#shop-confirm-buy-btn`);if(!e||!t)return;let n=this.renderer;if(!n||n.selectedShopItemId===null){e.innerHTML=`
        <div class="shop-desc-title">NO ITEM SELECTED</div>
        <div class="shop-desc-text">Click a card or upgrade to inspect it.</div>
        <div class="shop-desc-hint">Select an item to purchase</div>
      `,t.disabled=!0,t.textContent=`CONFIRM PURCHASE`;return}let i=n.selectedShopItemId,a=this.activeShopTab,o=this.engine.runState,s=o.combatMode===`points`;if(a===`cards`)if(i===`999`){let n=o.chips>=12&&o.hp<o.maxHp,i=o.hp>=o.maxHp;e.innerHTML=`
          <div class="shop-desc-title">HP TRANSFUSION</div>
          <div class="shop-desc-text">${r(`Transfuse essence back into your veins. Heals 25 HP.`,s)}</div>
          <div class="shop-desc-hint">Cost: 12 ⚡ · ${i?`Already Full HP`:n?`Click Bell or Confirm Button to Buy`:`Cannot Afford`}</div>
        `,t.disabled=!n,t.textContent=`BUY HEAL: 12 ⚡`}else{let a=parseInt(i),c=this.shopCards[a];if(c){let n=o.chips>=c.cost;e.innerHTML=`
            <div class="shop-desc-title">${c.name.toUpperCase()}</div>
            <div class="shop-desc-text">${r(c.desc,s)}</div>
            <div class="shop-desc-hint">Rarity: ${c.rarity.toUpperCase()} · Cost: ${c.cost} ⚡ | ${n?`Click Bell or Confirm Button to Buy`:`Cannot Afford`}</div>
          `,t.disabled=!n,t.textContent=`BUY CARD: ${c.cost} ⚡`}else n.selectedShopItemId=null,this.updateShopDescriptionBox()}else{let a=k[i];if(a){let n=o.playerWheel.upgrades.includes(i),c=a.cost,l=a.description,u=a.name;if(i.startsWith(`level_`)){let e=i.replace(`level_`,``),t=o.colorLevels?.[e]||1;c=15+(t-1)*5,t>=10&&(n=!0),u=`${u} (Lvl ${t})`,l=`${l} Currently: Lvl ${t}.`}let d=o.chips>=c&&!n;e.innerHTML=`
          <div class="shop-desc-title">${u.toUpperCase()}</div>
          <div class="shop-desc-text">${r(l,s)}</div>
          <div class="shop-desc-hint">Cost: ${c} ⚡ · ${n?i.startsWith(`level_`)?`MAXED`:`OWNED`:d?`Click Bell or Confirm to Buy`:`Cannot Afford`}</div>
        `,t.disabled=!d,t.textContent=n?i.startsWith(`level_`)?`MAXED`:`OWNED`:`BUY UPGRADE: ${c} ⚡`}else n.selectedShopItemId=null,this.updateShopDescriptionBox()}}updateEventDescriptionBox(){let e=this.root.querySelector(`#event-desc-box`),t=this.root.querySelector(`#event-confirm-choice-btn`);if(!e||!t)return;let n=this.renderer;if(!n||n.selectedEventChoiceId===null){e.innerHTML=`
        <div class="event-desc-title">NO TABLET SELECTED</div>
        <div class="event-desc-text">Click a floating stone tablet to inspect.</div>
        <div class="event-desc-hint">Select a choice to proceed</div>
      `,t.disabled=!0,t.textContent=`CONFIRM DECISION`;return}let r=n.selectedEventChoiceId,i=``,a=``,o=``;r===`1`?(i=`INJECT SYRINGE`,a=`Transfuse a high-concentration dose of volatile essence directly into your bloodstream. Risk of rupture is high, but the resource yield is substantial.`,o=`Consequence: Lose 8 HP · Gain 25 chips (Essence) | Click tablet again or Confirm to accept`):r===`2`?(i=`ACCEPT MAGNET`,a=`Draw a heavy iron lodging stone. Induces strong magnetic attractors inside the wheel slot channels to draw the ball towards copper pockets.`,o=`Consequence: Add Lodestone Magnet card to deck | Click tablet again or Confirm to accept`):r===`3`&&(i=`DECLINE & PASS`,a=`Refuse the transaction and ignore the hooded figure. Push past them. A safe path, devoid of both reward and harm.`,o=`Consequence: Gain nothing, lose nothing | Click tablet again or Confirm to accept`),e.innerHTML=`
      <div class="event-desc-title">${i}</div>
      <div class="event-desc-text">${a}</div>
      <div class="event-desc-hint">${o}</div>
    `,t.disabled=!1,t.textContent=`CONFIRM: ${i}`}constructor(e,t,n){this.engine=e,this.sound=t,this.root=n;try{if(this.sound.musicVolume=parseFloat(localStorage.getItem(`settings_musicVolume`)??`0.55`),this.sound.droneVolume=parseFloat(localStorage.getItem(`settings_droneVolume`)??`0.15`),this.sound.sfxVolume=parseFloat(localStorage.getItem(`settings_sfxVolume`)??`0.8`),localStorage.getItem(`settings_mobileModeActive`)!==null)this.mobileModeActive=localStorage.getItem(`settings_mobileModeActive`)===`true`;else{let e=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768;this.mobileModeActive=e,localStorage.setItem(`settings_mobileModeActive`,this.mobileModeActive.toString())}}catch(e){console.warn(`localStorage settings reading failed:`,e)}this.sound.setDroneVolume(this.sound.droneVolume),this.mobileModeActive?document.body.classList.add(`mobile-mode`):document.body.classList.remove(`mobile-mode`),this.setupLayout(),setInterval(()=>{this.updateSoundVisualizerDev()},250),this.render()}setupLayout(){this.root.innerHTML=`
      <div id="game-container">
        <!-- 3D Canvas goes here -->
        <div id="canvas-container"></div>
        
        <!-- CRT Screen Overlay Effect -->
        <div class="crt-overlay"></div>
        <div class="vignette-overlay"></div>

        <!-- HTML UI Overlay -->
        <div id="ui-overlay">
          <!-- DEBUG STATS OVERLAY -->
          <div id="debug-stats-overlay" class="hidden">
            <div class="debug-stats-header">SYSTEM PERFORMANCE</div>
            <div class="debug-stats-row">
              <span>FPS:</span>
              <span id="debug-fps-value" style="color: #64dd17; font-weight: bold;">--</span>
            </div>
            <canvas id="debug-fps-canvas" width="160" height="40" style="border: 1px solid #3d0e08; background: #0c0402; margin-top: 5px; display: block;"></canvas>
            <div class="debug-stats-row" style="margin-top: 4px; font-size: 10px; color: #888;">
              <span>FRAME TIME:</span>
              <span id="debug-frame-time-value">-- ms</span>
            </div>
          </div>

          <!-- TOP HUD (Global Stats) -->
          <div id="hud-panel" class="hidden">
            <div class="hud-item hp-display">
              <span class="label">HP:</span>
              <div class="bar-container">
                <div id="hud-hp-bar" class="bar hp-bar" style="width: 100%"></div>
                <span id="hud-hp-text" class="bar-text">80 / 80</span>
              </div>
            </div>
            <div class="hud-item chips-display">
              <span class="label">ESSENCE:</span>
              <span id="hud-chips-text" class="value text-gold">20 ⚡</span>
            </div>
            <div class="hud-item floor-display">
              <span class="label">FLOOR:</span>
              <span id="hud-floor-text" class="value">1 / 7</span>
            </div>
            <button id="hud-abandon-btn" class="abandon-btn">ABANDON</button>
            <button id="hud-settings-btn" class="debug-btn" style="border-color: #ffd700; color: #ffd700; margin-left: 4px;">SETTINGS</button>
            <button id="debug-toggle-btn" class="debug-btn">DEBUG UI: OFF</button>
            <button id="dev-tools-btn" class="debug-btn" style="border-color: #ffaa00; color: #ffaa00; margin-left: 4px;">DEV TOOLS</button>
          </div>

          <!-- FLOATING DEV TOOLS PANEL -->
          <div id="dev-tools-panel" class="hidden">
            <div class="dev-tools-header">DEV TOOLS DASHBOARD</div>
            
            <!-- Group: COMBAT STATS -->
            <div class="dev-group">
              <div class="dev-group-title">Combat Cheats</div>
              <div class="dev-row" style="margin-bottom: 6px;">
                <span style="font-size: 11px; color: #ffaa00; flex: 1; align-self: center;">Mode:</span>
                <select id="dev-combat-mode-select" class="dev-select" style="flex: 2; height: 22px; font-size: 11px;">
                  <option value="points">Points Duel</option>
                  <option value="damage">HP Damage</option>
                </select>
              </div>
              <div class="dev-row" style="margin-bottom: 6px;">
                <button id="dev-start-sandbox-btn" class="btn" style="border-color: #00ff64; color: #00ff64; width: 100%;">Start Sandbox Combat</button>
              </div>
              <div class="dev-row">
                <button id="dev-kill-enemy" class="btn">Finish Opponent</button>
              </div>
              <div class="dev-row">
                <button id="dev-drain-enemy" class="btn">Drain 10 HP</button>
              </div>
              <div class="dev-row">
                <button id="dev-add-chips-10" class="btn">+10 Chips</button>
                <button id="dev-add-chips-50" class="btn">+50 Chips</button>
              </div>
              <div class="dev-row">
                <button id="dev-draw-card-1" class="btn">Draw Card</button>
                <button id="dev-draw-card-4" class="btn">Draw 4</button>
              </div>
            </div>

            <!-- Group: CARD SANDBOX TOOLS -->
            <div class="dev-group">
              <div class="dev-group-title">Card Sandbox Filter/Sort</div>
              <div class="dev-row" style="margin-bottom: 4px;">
                <input type="text" id="dev-card-search" placeholder="Search cards..." class="dev-select" style="flex: 1; font-size: 11px; padding: 2px 4px; height: 24px; background: rgba(0,0,0,0.5); border: 1px solid rgba(197,159,81,0.3); color: #fff;" />
              </div>
              <div class="dev-row" style="gap: 4px; margin-bottom: 4px;">
                <select id="dev-card-filter-type" class="dev-select" style="flex: 1; font-size: 11px; height: 24px;">
                  <option value="all">All Types</option>
                  <option value="physics">Physics</option>
                  <option value="board">Board</option>
                  <option value="payout">Payout</option>
                  <option value="utility">Utility</option>
                  <option value="chaos">Chaos</option>
                  <option value="paint">Paint</option>
                  <option value="money">Money</option>
                </select>
                <select id="dev-card-filter-rarity" class="dev-select" style="flex: 1; font-size: 11px; height: 24px;">
                  <option value="all">All Rarities</option>
                  <option value="common">Common</option>
                  <option value="uncommon">Uncommon</option>
                  <option value="rare">Rare</option>
                  <option value="legendary">Legendary</option>
                </select>
              </div>
              <div class="dev-row" style="margin-bottom: 6px;">
                <select id="dev-card-sort" class="dev-select" style="flex: 1; font-size: 11px; height: 24px;">
                  <option value="default" selected>Sort: Type -> Rarity -> Cost</option>
                  <option value="name">Sort: Name (A-Z)</option>
                  <option value="cost-asc">Sort: Cost (Low-High)</option>
                  <option value="cost-desc">Sort: Cost (High-Low)</option>
                  <option value="rarity">Sort: Rarity</option>
                  <option value="type">Sort: Type</option>
                </select>
              </div>
              
              <div class="dev-group-title" style="margin-top: 4px;">Spawn Card In Hand</div>
              <div class="dev-row" style="margin-bottom: 6px;">
                <select id="dev-spawn-card-select" class="dev-select" style="flex: 1; font-size: 11px; height: 24px;">
                  <!-- Populated dynamically -->
                </select>
                <button id="dev-spawn-card-btn" class="btn" style="flex: 0 0 55px; font-size: 11px; height: 24px; padding: 0;">Spawn</button>
              </div>

              <div class="dev-group-title" style="margin-top: 4px;">Add Card to Deck</div>
              <div class="dev-row">
                <select id="dev-add-deck-select" class="dev-select" style="flex: 1; font-size: 11px; height: 24px;">
                  <!-- Populated dynamically -->
                </select>
                <button id="dev-add-deck-btn" class="btn" style="flex: 0 0 55px; font-size: 11px; height: 24px; padding: 0;">Add</button>
              </div>
            </div>

            <!-- Group: GLOBAL RUN STATS -->
            <div class="dev-group">
              <div class="dev-group-title">Run Cheats</div>
              <div class="dev-row">
                <button id="dev-add-run-essence" class="btn">+100 Essence</button>
              </div>
              <div class="dev-row">
                <button id="dev-full-heal" class="btn">Full Heal</button>
                <button id="dev-set-hp-1" class="btn">Set HP to 1</button>
              </div>
              <div class="dev-group-title" style="margin-top: 4px;">Inject Slot Color</div>
              <div class="dev-row">
                <select id="dev-color-slot-select" class="dev-select">
                  <option value="gold">Gold</option>
                  <option value="purple">Purple</option>
                  <option value="cyan">Cyan</option>
                  <option value="crimson">Crimson</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="black">Black</option>
                </select>
                <button id="dev-color-slot-btn" class="btn" style="flex: 0 0 70px;">Inject</button>
              </div>
            </div>

            <!-- Group: TELEPORTS & MAP -->
            <div class="dev-group">
              <div class="dev-group-title">Teleport & Navigation</div>
              <div class="dev-row">
                <button id="dev-skip-floor-btn" class="btn">Skip Floor</button>
              </div>
              <div class="dev-row">
                <button class="btn dev-teleport-btn" data-node="combat">Combat</button>
                <button class="btn dev-teleport-btn" data-node="elite">Elite</button>
              </div>
              <div class="dev-row">
                <button class="btn dev-teleport-btn" data-node="boss">Boss</button>
                <button class="btn dev-teleport-btn" data-node="shop">Shop</button>
                <button class="btn dev-teleport-btn" data-node="event">Event</button>
                <button class="btn dev-teleport-btn" data-node="forge" style="border-color: #ff5500; color: #ff5500;">Forge</button>
              </div>
            </div>

            <!-- Group: ENEMY DECISION PROCESS -->
            <div class="dev-group" id="dev-enemy-decision-group">
              <div class="dev-group-title">Enemy Decision Process</div>
              <div id="dev-enemy-decision-content" style="font-size: 11px; color: #ece0d8; line-height: 1.4;">
                Active combat required.
              </div>
            </div>

            <!-- Group: SOUND MANAGER VISUALIZER -->
            <div class="dev-group" id="dev-sound-visualizer-group">
              <div class="dev-group-title">Audio & Stems Monitor</div>
              <div id="dev-sound-visualizer-content" style="font-size: 11px; color: #ece0d8; line-height: 1.4; font-family: monospace;">
                Initializing...
              </div>
            </div>
          </div>

          <!-- SPIN RESOLUTION REPORT SCREEN -->
          <div id="resolution-overlay" class="hidden">
            <div class="resolution-card glass-panel">
              <h2 class="res-header">SPIN RESOLUTION REPORT</h2>
              
              <!-- Active Wheel Name display -->
              <div id="res-wheel-name" style="font-size: 14px; text-transform: uppercase; color: #ffb300; letter-spacing: 2px; text-align: center; margin-top: -5px; margin-bottom: 15px; font-family: 'Courier Prime', monospace; font-weight: bold;"></div>

              <!-- Result slot circle -->
              <div class="res-slot-row">
                <div id="res-slot-badge" class="res-badge">0</div>
              </div>
              
              <!-- Damage/Reward summary -->
              <div id="res-summary-text" class="res-summary">DEALT 45 DAMAGE!</div>
              
              <!-- Bets detail -->
              <div class="res-details-group">
                <div class="res-details-title">Bets Outcome</div>
                <div id="res-bets-list" class="res-details-list"></div>
              </div>
              
              <!-- Cards in effect detail -->
              <div class="res-details-group">
                <div class="res-details-title">Cards Active This Turn</div>
                <div id="res-cards-list" class="res-details-list"></div>
              </div>
              
              <!-- Action button to dismiss -->
              <button id="res-continue-btn" class="btn primary-btn pulse-glow" style="margin-top: 10px;">CONTINUE</button>
            </div>
          </div>

          <!-- SETTINGS OVERLAY -->
          <div id="settings-overlay" class="hidden">
            <div class="settings-card glass-panel" style="position: relative; padding: 24px; max-width: 420px; width: 90%; margin: auto; border: 1.5px solid var(--color-gold); background: rgba(18, 11, 8, 0.95); box-shadow: 0 0 30px rgba(0,0,0,0.8); text-align: left;">
              <button id="settings-close-btn" class="btn" style="position: absolute; top: 12px; right: 12px; background: transparent; border: none; font-size: 1.2rem; color: var(--color-gold); cursor: pointer; padding: 0 4px;">✕</button>
              <h2 class="res-header" style="text-align: center; margin-bottom: 20px; font-family: 'VT323', monospace; color: var(--color-gold); font-size: 2.2rem; border-bottom: 1px solid rgba(197, 159, 81, 0.3); padding-bottom: 8px;">SETTINGS</h2>
              
              <!-- Audio settings -->
              <div class="settings-group" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
                <label style="font-family: 'VT323', monospace; color: var(--color-gold); font-size: 1.3rem; border-left: 3px solid var(--color-gold); padding-left: 8px; margin-bottom: 4px;">AUDIO MIXER</label>
                <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'VT323', monospace; font-size: 1.1rem; color: #fff;">
                  <span>Music Volume:</span>
                  <div style="display: flex; align-items: center; gap: 10px; width: 60%;">
                    <input type="range" id="vol-music-slider" min="0" max="100" value="55" style="flex: 1; accent-color: var(--color-gold); height: 4px; cursor: pointer;">
                    <span id="vol-music-lbl" style="width: 35px; text-align: right;">55%</span>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'VT323', monospace; font-size: 1.1rem; color: #fff;">
                  <span>Drone/Hum:</span>
                  <div style="display: flex; align-items: center; gap: 10px; width: 60%;">
                    <input type="range" id="vol-drone-slider" min="0" max="100" value="15" style="flex: 1; accent-color: var(--color-gold); height: 4px; cursor: pointer;">
                    <span id="vol-drone-lbl" style="width: 35px; text-align: right;">15%</span>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'VT323', monospace; font-size: 1.1rem; color: #fff;">
                  <span>SFX Volume:</span>
                  <div style="display: flex; align-items: center; gap: 10px; width: 60%;">
                    <input type="range" id="vol-sfx-slider" min="0" max="100" value="80" style="flex: 1; accent-color: var(--color-gold); height: 4px; cursor: pointer;">
                    <span id="vol-sfx-lbl" style="width: 35px; text-align: right;">80%</span>
                  </div>
                </div>
              </div>

              <!-- Display settings -->
              <div class="settings-group" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; border-top: 1px solid rgba(197, 159, 81, 0.15); padding-top: 16px;">
                <label style="font-family: 'VT323', monospace; color: var(--color-gold); font-size: 1.3rem; border-left: 3px solid var(--color-gold); padding-left: 8px; margin-bottom: 4px;">DISPLAY CONFIG</label>
                <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'VT323', monospace; font-size: 1.1rem; color: #fff;">
                  <span>Mobile Layout Mode:</span>
                  <input type="checkbox" id="settings-mobile-checkbox" style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--color-gold);">
                </div>
                <p style="font-family: 'VT323', monospace; font-size: 0.85rem; color: rgba(236, 224, 216, 0.5); line-height: 1.3; margin: 4px 0 0 0;">
                  Forces vertical scrolling layouts and scales down elements for smaller screens.
                </p>
              </div>

              <button id="settings-apply-btn" class="btn primary-btn pulse-glow" style="width: 100%; font-family: 'VT323', monospace; font-size: 1.3rem; padding: 8px 0; margin-top: 8px;">APPLY SETTINGS</button>
            </div>
          </div>

          <!-- PANEL: MAIN MENU -->
          <div id="menu-panel" class="panel active">
            <h1 class="game-title">ROULETTE.OS</h1>
            
            <!-- Path Length Selector -->
            <div class="menu-selector-row">
              <span class="selector-label">PATH LENGTH SELECTOR:</span>
              <div class="selector-btns">
                <button class="selector-btn active" data-floors="7">SHORT</button>
                <button class="selector-btn" data-floors="11">MEDIUM</button>
                <button class="selector-btn" data-floors="15">LONG</button>
              </div>
            </div>

            <div class="menu-btn-group">
              <button id="start-run-btn" class="menu-btn primary">ENTER THE TAVERN</button>
              <button id="codex-btn" class="menu-btn secondary">CARD CODEX</button>
              <button id="menu-settings-btn" class="menu-btn secondary">SETTINGS</button>
            </div>
          </div>

          <!-- PANEL: CARD CODEX -->
          <div id="codex-panel" class="hidden">
            <button id="codex-close-btn" class="btn codex-close-btn">✕ CLOSE</button>
            <h2 class="codex-header">CARD CODEX</h2>
            <p class="codex-subtext">All cards available in the game. Study them before your next run.</p>
            
            <div class="codex-filters">
              <div class="filter-group">
                <span class="filter-label">Rarity:</span>
                <button class="filter-btn active" data-filter-type="rarity" data-value="all">All</button>
                <button class="filter-btn" data-filter-type="rarity" data-value="common">Common</button>
                <button class="filter-btn" data-filter-type="rarity" data-value="uncommon">Uncommon</button>
                <button class="filter-btn" data-filter-type="rarity" data-value="rare">Rare</button>
                <button class="filter-btn" data-filter-type="rarity" data-value="legendary">Legendary</button>
              </div>
              <div class="filter-group" style="margin-top: 8px;">
                <span class="filter-label">Type:</span>
                <button class="filter-btn active" data-filter-type="type" data-value="all">All</button>
                <button class="filter-btn" data-filter-type="type" data-value="payout">Payout</button>
                <button class="filter-btn" data-filter-type="type" data-value="physics">Physics</button>
                <button class="filter-btn" data-filter-type="type" data-value="board">Board</button>
                <button class="filter-btn" data-filter-type="type" data-value="utility">Utility</button>
                <button class="filter-btn" data-filter-type="type" data-value="chaos">Chaos</button>
                <button class="filter-btn" data-filter-type="type" data-value="paint">Paint</button>
                <button class="filter-btn" data-filter-type="type" data-value="money">Money</button>
              </div>
            </div>
            
            <div id="codex-grid" class="codex-grid"></div>
          </div>

          <!-- PANEL: LOADOUT STORE -->
          <div id="store-panel" class="panel hidden">
            <!-- Rendered dynamically in renderLoadoutStore -->
          </div>

          <!-- PANEL: WHEEL CUSTOMIZER -->
          <div id="wheel-customizer-panel" class="panel hidden">
            <h2 class="panel-header">CRAFT YOUR CUSTOM WHEEL</h2>
            <p class="flavor-text">Select your numbers, toggle colors, set payouts, and build your board.</p>
            
            <div class="customizer-layout">
              <!-- Left panel: Name & Payout multipliers -->
              <div class="customizer-sidebar glass-panel">
                <div class="input-group">
                  <label>Wheel Name:</label>
                  <input type="text" id="cust-wheel-name" value="Custom Destroyer" maxlength="24">
                </div>
                <div class="input-group" style="margin-top: 10px;">
                  <label>Description:</label>
                  <input type="text" id="cust-wheel-desc" value="A bespoke engine of risk and reward." maxlength="80">
                </div>
                
                <div class="payout-inputs-header">Payout Multipliers:</div>
                <div class="payout-inputs-grid">
                  <div class="input-group-inline">
                    <label>Red:</label>
                    <input type="number" id="cust-payout-red" value="2.0" step="0.1" min="1.0" max="10.0">
                  </div>
                  <div class="input-group-inline">
                    <label>Black:</label>
                    <input type="number" id="cust-payout-black" value="2.0" step="0.1" min="1.0" max="10.0">
                  </div>
                  <div class="input-group-inline">
                    <label>Green:</label>
                    <input type="number" id="cust-payout-green" value="10.0" step="0.5" min="2.0" max="50.0">
                  </div>
                  <div class="input-group-inline">
                    <label>Single #:</label>
                    <input type="number" id="cust-payout-number" value="12.0" step="1.0" min="5.0" max="100.0">
                  </div>
                  <div class="input-group-inline">
                    <label>Odd:</label>
                    <input type="number" id="cust-payout-odd" value="2.0" step="0.1" min="1.0" max="10.0">
                  </div>
                  <div class="input-group-inline">
                    <label>Even:</label>
                    <input type="number" id="cust-payout-even" value="2.0" step="0.1" min="1.0" max="10.0">
                  </div>
                </div>
                
                <div class="customizer-actions">
                  <button id="cust-cancel-btn" class="btn secondary-btn">✕ CANCEL</button>
                  <button id="cust-start-btn" class="btn primary-btn pulse-glow">✓ SAVE WHEEL</button>
                </div>
              </div>
              
              <!-- Right panel: Interactive slot editor -->
              <div class="customizer-board-editor glass-panel">
                <div class="editor-instructions">
                  Click cells to toggle inclusion on the wheel. Click active cell color dots to cycle: 
                  <span class="dot-desc color-green">Green</span> -> 
                  <span class="dot-desc color-red">Red</span> -> 
                  <span class="dot-desc color-black">Black</span> ->
                  <span class="dot-desc color-gold">Gold</span> ->
                  <span class="dot-desc color-purple">Purple</span> ->
                  <span class="dot-desc color-cyan">Cyan</span> ->
                  <span class="dot-desc color-crimson">Crimson</span>.
                </div>
                <div class="quick-templates">
                  Quick Templates:
                  <button class="template-btn" data-template="mini">Mini (0-12)</button>
                  <button class="template-btn" data-template="even">Even Only</button>
                  <button class="template-btn" data-template="reds">All Reds</button>
                  <button class="template-btn" data-template="classic">Classic (0-36)</button>
                </div>
                
                <div class="numbers-selector-grid" id="cust-numbers-grid">
                  <!-- Dynamic Grid will go here -->
                </div>
              </div>
            </div>
          </div>

          <!-- PANEL: MAP PROGRESSION -->
          <div id="map-panel" class="panel hidden">
            <h2 class="panel-header">THE BRANCHING PATHS</h2>
            <div id="map-scroll-container" class="map-container">
              <!-- Dynamically generated map SVG/HTML -->
            </div>
          </div>

          <!-- PANEL: SHOP -->
          <div id="shop-panel" class="panel hidden">
            <div class="shop-header-panel">
              <h2>THE CROUPIER'S SHOP</h2>
              <p class="shop-welcome">"Spend your essence wisely, mortal. Or bleed for it..."</p>
              
              <!-- Shop Tabs -->
              <div class="shop-tabs-bar">
                <button id="shop-tab-cards" class="shop-tab-btn active">CARDS & HEAL</button>
                <button id="shop-tab-upgrades" class="shop-tab-btn">BOARD UPGRADES</button>
              </div>
            </div>

            <!-- Tab View Panels (hidden, but populated in JS) -->
            <div id="shop-cards-view" class="shop-view-panel hidden">
              <div id="shop-items-container" class="shop-grid"></div>
            </div>
            
            <div id="shop-upgrades-view" class="shop-view-panel hidden">
              <div id="shop-upgrades-container" class="shop-grid"></div>
            </div>

            <div class="shop-bottom-hud">
              <div id="shop-card-desc-box" class="shop-card-desc-box"></div>
              <div class="shop-actions-row">
                <button id="shop-confirm-buy-btn" class="btn primary-btn" disabled>CONFIRM PURCHASE</button>
                <button id="shop-leave-btn" class="btn secondary-btn">RETURN TO PATHS</button>
              </div>
            </div>
          </div>

          <!-- PANEL: EVENT -->
          <div id="event-panel" class="panel hidden">
            <div class="event-header-panel">
              <h2 id="event-title">A DARK ENCOUNTER</h2>
              <p id="event-text" class="event-narrative"></p>
            </div>
            
            <!-- Hidden choice triggers (drawn in 3D now) -->
            <div id="event-options" class="event-choices-list hidden"></div>

            <div class="event-bottom-hud">
              <div id="event-desc-box" class="event-desc-box"></div>
              <div class="event-actions-row">
                <button id="event-confirm-choice-btn" class="btn primary-btn" disabled>CONFIRM DECISION</button>
              </div>
            </div>
          </div>

          <!-- PANEL: FORGE (BOARD/WHEEL BUILDER) -->
          <div id="forge-panel" class="panel hidden">
            <!-- Rendered dynamically in renderForge -->
          </div>

          <!-- PANEL: COMBAT PLAY OVERLAY -->
          <div id="combat-ui" class="hidden">
            <!-- Left Side: Enemy Status -->
            <div class="combat-left">
              <div class="enemy-hud glass-panel">
                <h3 id="enemy-name" class="enemy-title">DREAD GAMBLER</h3>
                <div class="bar-container enemy-hp-container">
                  <div id="enemy-hp-bar" class="bar hp-bar" style="width: 100%"></div>
                  <span id="enemy-hp-text" class="bar-text">50 / 50</span>
                </div>
                <div class="enemy-intent">
                  <span class="intent-label">INTENT:</span>
                  <span id="enemy-intent-text" class="intent-desc">Slash (5 damage)</span>
                </div>
              </div>
            </div>

            <!-- Right Side: Casino Betting Board -->
            <div class="combat-right glass-panel">
              <div class="betting-board">
                <div class="betting-header">BETTING BOARD</div>
                
                <!-- Quick Bet Selector -->
                <div class="bet-value-row">
                  <span class="sub-label">AMOUNT:</span>
                  <button class="bet-val-btn active" data-val="1">1</button>
                  <button class="bet-val-btn" data-val="5">5</button>
                  <button class="bet-val-btn" data-val="10">10</button>
                  <button class="bet-val-btn" data-val="25">25</button>
                  <button class="bet-val-btn" data-val="100">100</button>
                  <button class="bet-val-btn" data-val="max">MAX</button>
                  <input type="number" id="custom-bet-input" min="1" max="1000" value="1" style="width: 65px; background: rgba(0,0,0,0.6); border: 1.5px solid var(--color-gold); color: #fff; text-align: center; font-family: 'Courier Prime', monospace; font-size: 14px; border-radius: 4px; padding: 2px 0; margin-left: 8px;">
                </div>

                <!-- Colors & Category Bets -->
                <div class="bet-type-row">
                  <button class="bet-btn bet-red" data-type="red">RED (2x)</button>
                  <button class="bet-btn bet-black" data-type="black">BLACK (2x)</button>
                  <button class="bet-btn bet-green" data-type="green">GREEN (14x)</button>
                </div>
                <div class="bet-type-row" style="margin-top: 8px;">
                  <button class="bet-btn bet-odd" data-type="odd">ODD (2x)</button>
                  <button class="bet-btn bet-even" data-type="even">EVEN (2x)</button>
                </div>
                <div class="bet-type-row" style="margin-top: 8px;">
                  <button class="bet-btn bet-gold" data-type="gold" style="background: linear-gradient(135deg, #ffd700, #b8860b); color: #000;">GOLD (4x)</button>
                  <button class="bet-btn bet-purple" data-type="purple" style="background: linear-gradient(135deg, #9c27b0, #6a1b9a); color: #fff;">PURPLE (4x)</button>
                  <button class="bet-btn bet-cyan" data-type="cyan" style="background: linear-gradient(135deg, #00bcd4, #00838f); color: #fff;">CYAN (4x)</button>
                  <button class="bet-btn bet-crimson" data-type="crimson" style="background: linear-gradient(135deg, #ff007f, #4a0025); color: #fff;">CRIMSON (6x)</button>
                </div>

                <!-- Number Grid Bets 0-36 -->
                <div class="number-grid-label">OR BET SPECIFIC NUMBER (36x):</div>
                <div id="board-hover-info" class="board-hover-info">HOVER A SLOT TO VIEW PAYOUTS</div>
                <div class="number-grid-container">
                  <div class="num-cell num-green" data-num="0">0</div>
                  ${Array.from({length:36},(e,t)=>{let n=t+1;return`<div class="num-cell num-${c(n)}" data-num="${n}">${n}</div>`}).join(``)}
                </div>

                <!-- Placed Bets Readout -->
                <div class="placed-bets-panel">
                  <div class="sub-label">ACTIVE BETS:</div>
                  <div id="placed-bets-list" class="placed-bets-list">No bets placed</div>
                </div>

                <!-- Combat Primary Buttons -->
                <div class="combat-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <button id="clear-bets-btn" class="btn secondary-btn" style="flex: 1;">CLEAR</button>
                  <button id="rebet-btn" class="btn secondary-btn" style="flex: 1;">REBET</button>
                  <button id="sacrifice-btn" class="btn secondary-btn" style="flex: 1.5; border-color: #ff3b30; color: #ff3b30;">SACRIFICE</button>
                  <button id="spin-wheel-btn" class="btn primary-btn pulse-glow disabled" style="flex: 2;">SPIN WHEEL</button>
                  <button id="end-turn-btn" class="btn next-turn-btn hidden" style="flex: 2;">END TURN</button>
                </div>
              </div>
            </div>

            <!-- Center screen readout overlay for spin resolution -->
            <div id="spin-overlay" class="hidden">
              <div id="spin-text" class="spin-announcement">SPINNING...</div>
            </div>

            <!-- View Controller HUD (Bottom-left, always visible during combat) -->
            <div class="view-controller-hud glass-panel">
              <button class="view-btn active" data-view="4">OVERVIEW</button>
              <button class="view-btn" data-view="1">CARDS</button>
              <button class="view-btn" data-view="2">BOARD</button>
              <button class="view-btn" data-view="3">MY WHEEL</button>
              <button class="view-btn" data-view="6">OPP. WHEEL</button>
              <button class="view-btn" data-view="5">OPP. BOARD</button>
              <button class="view-btn" data-view="7">OPPONENT</button>
            </div>

            <!-- Draw Card & Deck Counters Panel -->
            <div class="combat-deck-panel">
              <button id="draw-card-btn" class="draw-card-btn">DRAW CARD (FREE)</button>
              <div class="deck-counters">
                <div class="deck-counter">
                  <span class="counter-label">DRAW:</span>
                  <span id="draw-pile-count" class="counter-value">0</span>
                </div>
                <div class="deck-counter">
                  <span class="counter-label">DISC:</span>
                  <span id="discard-pile-count" class="counter-value">0</span>
                </div>
                <div class="deck-counter">
                  <span class="counter-label">HAND:</span>
                  <span id="hand-count" class="counter-value">0</span>
                </div>
              </div>
            </div>

            <!-- Hand Instruction HUD -->
            <div class="combat-bottom-hud">
              <span class="tutorial-tip">Click DRAW CARD to buy cards from your deck. Click 3D Bell to SPIN / END TURN. Press 'C' to Clear Bets. Press '1'-'6' / Arrow keys to change camera view. Press 'D' to toggle Debug UI.</span>
              <div class="turn-chips-panel">
                <span>TURN CHIPS:</span>
                <span id="turn-chips-value" class="text-gold">10 ⚡</span>
              </div>
            </div>
            
            <!-- Mobile Action Bar (only visible in mobile mode) -->
            <div class="mobile-action-bar">
              <div class="mobile-deck-counters" style="flex: 1; display: flex; gap: 15px; justify-content: flex-start; align-items: center;">
                <div>DRAW: <span id="mobile-draw-count" style="font-weight: bold; color: var(--color-gold);">0</span></div>
                <div>DISC: <span id="mobile-disc-count" style="font-weight: bold; opacity: 0.8;">0</span></div>
              </div>
              <div class="mobile-essence-display" style="flex: 1; display: flex; gap: 8px; justify-content: flex-end; align-items: center; font-family: var(--font-header); font-size: 1.4rem;">
                <span class="label" style="opacity: 0.7; font-size: 0.9rem;">ESSENCE:</span>
                <span id="mobile-essence-val" class="text-gold" style="font-weight: bold; text-shadow: 0 0 8px rgba(197,159,81,0.4);">10 ⚡</span>
              </div>
            </div>
          </div>

          <!-- PANEL: GAME OVER -->
          <div id="gameover-panel" class="panel hidden">
            <h2 class="gameover-title">DEFEAT</h2>
            <p class="flavor-text">Your essence belongs to the House now.</p>
            <button id="restart-gameover-btn" class="btn primary-btn">PLAY AGAIN</button>
          </div>

          <!-- PANEL: VICTORY -->
          <div id="victory-panel" class="panel hidden">
            <h2 class="victory-title">VICTORY</h2>
            <p class="flavor-text">You successfully broke the wheel and escaped the Tavern.</p>
            <button id="restart-victory-btn" class="btn primary-btn">PLAY AGAIN</button>
          </div>
        </div>
      </div>
    `,this.bindEvents()}bindEvents(){this.root.querySelector(`#start-run-btn`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.engine.startNewRun(this.selectedFloors),this.render()});let e=this.root.querySelectorAll(`#menu-panel .selector-btn`);e.forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.getAttribute(`data-floors`)||`7`);this.selectedFloors=n,e.forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),this.sound.playRouletteClick(.7)})}),this.root.querySelector(`#codex-btn`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.codexRarityFilter=`all`,this.codexTypeFilter=`all`,this.root.querySelectorAll(`#codex-panel .filter-btn`).forEach(e=>{e.getAttribute(`data-value`)===`all`?e.classList.add(`active`):e.classList.remove(`active`)}),this.showCodex()}),this.root.querySelector(`#codex-close-btn`)?.addEventListener(`click`,()=>{this.sound.playCardSwoosh(),this.root.querySelector(`#codex-panel`)?.classList.add(`hidden`)}),this.root.querySelector(`#codex-panel`)?.addEventListener(`click`,e=>{let t=e.target;if(t.classList.contains(`filter-btn`)){let e=t.getAttribute(`data-filter-type`),n=t.getAttribute(`data-value`);(t.parentElement?.querySelectorAll(`.filter-btn`))?.forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),this.sound.playRouletteClick(.5),e===`rarity`?this.codexRarityFilter=n:e===`type`&&(this.codexTypeFilter=n),this.showCodex()}}),this.root.querySelector(`#draw-card-btn`)?.addEventListener(`click`,()=>{this.currentView!==4&&(this.engine.buyCardDraw()?(this.sound.playDraw(),this.render()):this.sound.playRouletteClick(.3))}),this.root.querySelector(`#hud-abandon-btn`)?.addEventListener(`click`,()=>{this.sound.playCardSwoosh(),this.engine.runState.gameState=`MENU`,this.render()}),this.root.querySelector(`#restart-gameover-btn`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.engine.startNewRun(),this.render()}),this.root.querySelector(`#restart-victory-btn`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.engine.startNewRun(),this.render()}),this.root.querySelector(`#shop-leave-btn`)?.addEventListener(`click`,()=>{this.sound.playCardSwoosh(),this.renderer&&(this.renderer.selectedShopItemId=null);let e=this.engine.runState,t=e.currentFloor,n=e.mapNodes[t].find(t=>t.id===e.currentNodeId);n&&(n.completed=!0),e.currentFloor+=1,this.shopCards=[],this.activeShopTab=`cards`,this.engine.runState.gameState=`MAP`,this.render()}),this.root.querySelector(`#shop-confirm-buy-btn`)?.addEventListener(`click`,()=>{if(!this.renderer||this.renderer.selectedShopItemId===null)return;let e=this.renderer.selectedShopItemId,t=this.activeShopTab,n=!1;if(t===`cards`){let t=parseInt(e);n=this.purchaseShopCard(t)}else n=this.purchaseBoardUpgrade(e);n&&(this.renderer.selectedShopItemId=null,this.updateShopDescriptionBox())}),this.root.querySelector(`#event-confirm-choice-btn`)?.addEventListener(`click`,()=>{if(!this.renderer||this.renderer.selectedEventChoiceId===null)return;let e=this.renderer.selectedEventChoiceId;this.makeEventChoice(e),this.renderer.selectedEventChoiceId=null});let t=this.root.querySelector(`#shop-tab-cards`),n=this.root.querySelector(`#shop-tab-upgrades`);t?.addEventListener(`click`,()=>{this.activeShopTab!==`cards`&&(this.sound.playDraw(),this.activeShopTab=`cards`,this.renderer&&(this.renderer.selectedShopItemId=null),this.render())}),n?.addEventListener(`click`,()=>{this.activeShopTab!==`upgrades`&&(this.sound.playDraw(),this.activeShopTab=`upgrades`,this.renderer&&(this.renderer.selectedShopItemId=null),this.render())});let r=this.root.querySelectorAll(`.bet-val-btn`),i=this.root.querySelector(`#custom-bet-input`);r.forEach(e=>{e.addEventListener(`click`,t=>{r.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let n=e.getAttribute(`data-val`);n===`max`?this.currentBetAmount=this.engine.battleState?.chipsPool||0:this.currentBetAmount=parseInt(n),this.sound.playDraw(),i&&n!==`max`&&(i.value=this.currentBetAmount.toString())})}),i&&i.addEventListener(`input`,()=>{r.forEach(e=>e.classList.remove(`active`));let e=parseInt(i.value)||1;this.currentBetAmount=Math.max(1,e)}),this.root.querySelectorAll(`.bet-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-type`);this.placeEngineBet(t,this.currentBetAmount)}),e.addEventListener(`contextmenu`,t=>{t.preventDefault();let n=e.getAttribute(`data-type`);this.sound.playCardSwoosh(),this.engine.subtractBet(n,this.currentBetAmount),this.render()})}),this.root.querySelectorAll(`.num-cell`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-num`));this.placeEngineBet(`number`,this.currentBetAmount,t)}),e.addEventListener(`contextmenu`,t=>{t.preventDefault();let n=parseInt(e.getAttribute(`data-num`));this.sound.playCardSwoosh(),this.engine.subtractBet(`number`,this.currentBetAmount,n),this.render()})}),this.root.querySelector(`#clear-bets-btn`)?.addEventListener(`click`,()=>{this.sound.playCardSwoosh(),this.engine.clearBets(),this.render()}),this.root.querySelector(`#rebet-btn`)?.addEventListener(`click`,()=>{this.engine.rebet()?(this.sound.playDraw(),this.render()):this.sound.playRouletteClick(.3)}),this.root.querySelector(`#sacrifice-btn`)?.addEventListener(`click`,()=>{this.engine.sacrificeForChips()?(this.sound.playBell(),this.render()):this.sound.playRouletteClick(.3)}),this.root.querySelector(`#spin-wheel-btn`)?.addEventListener(`click`,()=>{this.triggerSpin()}),this.root.querySelector(`#end-turn-btn`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.engine.resolveEnemyTurn(),this.showTurnEnd=!1,this.render()});let a=this.root.querySelector(`#debug-toggle-btn`);a?.addEventListener(`click`,()=>{this.sound.playDraw(),document.body.classList.toggle(`debug-ui-active`);let e=document.body.classList.contains(`debug-ui-active`);a&&(a.textContent=`DEBUG UI: ${e?`ON`:`OFF`}`);let t=this.root.querySelector(`#debug-stats-overlay`);t&&(e?t.classList.remove(`hidden`):t.classList.add(`hidden`))});let o=this.root.querySelector(`#dev-tools-btn`),s=this.root.querySelector(`#dev-tools-panel`);o?.addEventListener(`click`,()=>{this.sound.playDraw(),s?.classList.toggle(`hidden`);let e=!s?.classList.contains(`hidden`);o&&(o.textContent=`DEV TOOLS: ${e?`ON`:`OFF`}`,e?(o.style.borderColor=`#ffaa00`,o.style.color=`#ffaa00`,this.updateEnemyAIDecisionDev()):(o.style.borderColor=`#555`,o.style.color=`#888`))});let c=this.root.querySelector(`#dev-combat-mode-select`);c?.addEventListener(`change`,()=>{this.engine.runState.combatMode=c.value,this.sound.playDraw(),this.render()}),this.root.querySelector(`#dev-start-sandbox-btn`)?.addEventListener(`click`,()=>{this.sound.playBell(),this.engine.devStartTestCombat(),this.setCurrentView(2),this.render(),window.dispatchEvent(new Event(`resize`))});let l=this.root.querySelector(`#dev-card-search`),u=this.root.querySelector(`#dev-card-filter-type`),d=this.root.querySelector(`#dev-card-filter-rarity`),f=this.root.querySelector(`#dev-card-sort`),p=()=>{this.updateDevCardOptions()};l?.addEventListener(`input`,p),u?.addEventListener(`change`,p),d?.addEventListener(`change`,p),f?.addEventListener(`change`,p),this.updateDevCardOptions(),this.root.querySelector(`#dev-kill-enemy`)?.addEventListener(`click`,()=>{this.sound.playBell(),this.engine.devDefeatEnemy(),this.render()}),this.root.querySelector(`#dev-drain-enemy`)?.addEventListener(`click`,()=>{this.sound.playCardSwoosh(),this.engine.devDamageEnemy(10),this.engine.devAdjustHp(10),this.render()}),this.root.querySelector(`#dev-add-chips-10`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.engine.devAddChips(10),this.render()}),this.root.querySelector(`#dev-add-chips-50`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.engine.devAddChips(50),this.render()}),this.root.querySelector(`#dev-draw-card-1`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.engine.drawCard(),this.render()}),this.root.querySelector(`#dev-draw-card-4`)?.addEventListener(`click`,()=>{this.sound.playDraw();for(let e=0;e<4;e++)this.engine.drawCard();this.render()}),this.root.querySelector(`#dev-spawn-card-btn`)?.addEventListener(`click`,()=>{let e=this.root.querySelector(`#dev-spawn-card-select`);e&&(this.sound.playDraw(),this.engine.devSpawnCard(e.value),this.render())}),this.root.querySelector(`#dev-add-run-essence`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.engine.devAddChips(100),this.render()}),this.root.querySelector(`#dev-full-heal`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.engine.devAdjustHp(100),this.render()}),this.root.querySelector(`#dev-set-hp-1`)?.addEventListener(`click`,()=>{this.sound.playDraw();let e=1-this.engine.runState.hp;this.engine.devAdjustHp(e),this.render()}),this.root.querySelector(`#dev-add-deck-btn`)?.addEventListener(`click`,()=>{let e=this.root.querySelector(`#dev-add-deck-select`);e&&(this.sound.playDraw(),this.engine.devAddCardToDeck(e.value),this.render())}),this.root.querySelector(`#dev-color-slot-btn`)?.addEventListener(`click`,()=>{let e=this.root.querySelector(`#dev-color-slot-select`);if(e){this.sound.playBell();let t=e.value,n=this.engine.runState.playerWheel,r=[];for(let e=0;e<=36;e++)n.numbers.includes(e)||r.push(e);let i=0;r.length>0?(i=r[Math.floor(Math.random()*r.length)],n.numbers.push(i)):i=n.numbers[Math.floor(Math.random()*n.numbers.length)],n.colors[i]=t,t===`green`&&!n.greenNumbers.includes(i)&&n.greenNumbers.push(i),this.renderer&&this.renderer.wheelVis.rebuildWheel(!1,n),this.render()}}),this.root.querySelector(`#dev-skip-floor-btn`)?.addEventListener(`click`,()=>{this.sound.playDraw(),this.engine.devSkipFloor(),this.render()}),this.root.querySelectorAll(`.dev-teleport-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-node`);t&&(this.sound.playDraw(),this.engine.devTeleport(t),this.render())})}),this.root.querySelectorAll(`.view-controller-hud .view-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-view`)||`4`);this.sound.playDraw(),this.setCurrentView(t)})}),document.addEventListener(`keydown`,e=>{if(e.key==="`"||e.key===`~`){let e=this.root.querySelector(`#debug-toggle-btn`);e&&e.click()}if([`1`,`2`,`3`,`4`,`5`,`6`,`7`].includes(e.key)&&this.setCurrentView(parseInt(e.key)),!this.mobileModeActive){let t=e.key.toLowerCase();if(t===`w`){let e=this.currentView;this.currentView===4?e=1:this.currentView===1?e=2:this.currentView===2?e=this.lastWheelView===6?6:3:this.currentView===3||this.currentView===6?e=5:this.currentView===5&&(e=7),e!==this.currentView&&(this.sound.playCardSwoosh(),this.setCurrentView(e))}else if(t===`s`){let e=this.currentView;this.currentView===7?e=5:this.currentView===5?e=this.lastWheelView===6?6:3:this.currentView===3||this.currentView===6?e=2:this.currentView===2?e=1:this.currentView===1&&(e=4),e!==this.currentView&&(this.sound.playCardSwoosh(),this.setCurrentView(e))}else if(t===`a`)this.mobileModeActive?this.currentView===1&&this.renderer?this.renderer.cardVisuals.length>0&&(this.renderer.activeHandCardIndex=Math.max(0,this.renderer.activeHandCardIndex-1),this.sound.playCardSwoosh()):(this.currentView===3||this.currentView===6)&&(this.setCurrentView(this.currentView===3?6:3),this.sound.playCardSwoosh()):this.currentView===1||this.currentView===2?(this.lastPreDeckView=this.currentView,this.setCurrentView(9),this.sound.playCardSwoosh()):(this.currentView===3||this.currentView===6)&&(this.setCurrentView(this.currentView===3?6:3),this.sound.playCardSwoosh());else if(t===`d`)if(!this.mobileModeActive&&this.currentView===9)this.setCurrentView(this.lastPreDeckView||2),this.sound.playCardSwoosh();else if(this.currentView===1&&this.renderer){let e=this.renderer.cardVisuals.length;e>0&&(this.renderer.activeHandCardIndex=Math.min(e-1,this.renderer.activeHandCardIndex+1),this.sound.playCardSwoosh())}else (this.currentView===3||this.currentView===6)&&(this.setCurrentView(this.currentView===6?3:6),this.sound.playCardSwoosh())}if(e.key===`ArrowRight`||e.key===`ArrowLeft`){let t=this.currentView,n=[4,1,2,3,6,5,7],r=n.indexOf(this.currentView);t=e.key===`ArrowRight`?n[(r+1)%n.length]:n[(r-1+n.length)%n.length],this.setCurrentView(t)}if(e.key===`c`||e.key===`C`){if(this.currentView===4)return;this.engine.battleState&&!this.isSpinning&&(this.sound.playCardSwoosh(),this.engine.clearBets(),this.render())}}),this.root.querySelector(`#res-continue-btn`)?.addEventListener(`click`,()=>{if(this.sound.playDraw(),this.root.querySelector(`#resolution-overlay`)?.classList.add(`hidden`),this.engine.battleState&&(this.engine.battleState.isResolving=!1),!this.engine.battleState){this.render();return}this.isEnemyResolutionReport?(this.engine.resolveEnemyTurn(),this.setCurrentView(4),this.render()):this.engine.runState.combatMode!==`points`&&this.engine.battleState.enemy.hp<=0?(this.engine.resolveEnemyTurn(),this.render()):this.triggerOpponentTurnSequence()});let m=this.root.querySelector(`#settings-overlay`),h=()=>{this.sound.playDraw();let e=this.root.querySelector(`#vol-music-slider`),t=this.root.querySelector(`#vol-drone-slider`),n=this.root.querySelector(`#vol-sfx-slider`),r=this.root.querySelector(`#settings-mobile-checkbox`),i=this.root.querySelector(`#vol-music-lbl`),a=this.root.querySelector(`#vol-drone-lbl`),o=this.root.querySelector(`#vol-sfx-lbl`);e&&(e.value=Math.round(this.sound.musicVolume*100).toString(),i&&(i.innerText=`${e.value}%`)),t&&(t.value=Math.round(this.sound.droneVolume*100).toString(),a&&(a.innerText=`${t.value}%`)),n&&(n.value=Math.round(this.sound.sfxVolume*100).toString(),o&&(o.innerText=`${n.value}%`)),r&&(r.checked=this.mobileModeActive),m?.classList.remove(`hidden`)};this.root.querySelector(`#hud-settings-btn`)?.addEventListener(`click`,h),this.root.querySelector(`#menu-settings-btn`)?.addEventListener(`click`,h),this.root.querySelector(`#settings-close-btn`)?.addEventListener(`click`,()=>{this.sound.playCardSwoosh(),m?.classList.add(`hidden`)}),this.root.querySelector(`#vol-music-slider`)?.addEventListener(`input`,e=>{let t=e.target.value,n=this.root.querySelector(`#vol-music-lbl`);n&&(n.innerText=`${t}%`),this.sound.setMusicVolume(parseInt(t)/100)}),this.root.querySelector(`#vol-drone-slider`)?.addEventListener(`input`,e=>{let t=e.target.value,n=this.root.querySelector(`#vol-drone-lbl`);n&&(n.innerText=`${t}%`),this.sound.setDroneVolume(parseInt(t)/100)}),this.root.querySelector(`#vol-sfx-slider`)?.addEventListener(`input`,e=>{let t=e.target.value,n=this.root.querySelector(`#vol-sfx-lbl`);n&&(n.innerText=`${t}%`),this.sound.setSfxVolume(parseInt(t)/100)}),this.root.querySelector(`#settings-apply-btn`)?.addEventListener(`click`,()=>{let e=this.root.querySelector(`#settings-mobile-checkbox`);this.mobileModeActive=e?e.checked:!1,this.mobileModeActive?document.body.classList.add(`mobile-mode`):document.body.classList.remove(`mobile-mode`);try{localStorage.setItem(`settings_musicVolume`,this.sound.musicVolume.toString()),localStorage.setItem(`settings_droneVolume`,this.sound.droneVolume.toString()),localStorage.setItem(`settings_sfxVolume`,this.sound.sfxVolume.toString()),localStorage.setItem(`settings_mobileModeActive`,this.mobileModeActive.toString())}catch(e){console.warn(`Saving settings to localStorage failed:`,e)}this.sound.playBell(),m?.classList.add(`hidden`),this.render(),window.dispatchEvent(new Event(`resize`))}),this.root.querySelector(`#mobile-draw-btn`)?.addEventListener(`click`,()=>{this.engine.buyCardDraw()?(this.sound.playDraw(),this.render()):this.sound.playRouletteClick(.3)}),this.root.querySelector(`#mobile-clear-btn`)?.addEventListener(`click`,()=>{this.sound.playCardSwoosh(),this.engine.clearBets(),this.render()}),this.root.querySelector(`#mobile-spin-btn`)?.addEventListener(`click`,()=>{this.showTurnEnd?(this.sound.playDraw(),this.engine.resolveEnemyTurn(),this.showTurnEnd=!1,this.render()):this.triggerSpin()})}updateDevCardOptions(){let t=this.root.querySelector(`#dev-card-search`),n=this.root.querySelector(`#dev-card-filter-type`),r=this.root.querySelector(`#dev-card-filter-rarity`),i=this.root.querySelector(`#dev-card-sort`),a=this.root.querySelector(`#dev-add-deck-select`),o=this.root.querySelector(`#dev-spawn-card-select`),s=t?t.value.toLowerCase().trim():``,c=n?n.value:`all`,l=r?r.value:`all`,u=i?i.value:`default`,d=Object.keys(e);d=d.filter(t=>{let n=e[t];if(c!==`all`&&n.type!==c||l!==`all`&&n.rarity!==l)return!1;if(s){let e=n.name.toLowerCase().includes(s),r=n.description.toLowerCase().includes(s),i=t.toLowerCase().includes(s);if(!e&&!r&&!i)return!1}return!0}),d.sort((t,n)=>{let r=e[t],i=e[n];if(u===`cost-asc`)return r.cost-i.cost;if(u===`cost-desc`)return i.cost-r.cost;if(u===`rarity`){let e={common:0,uncommon:1,rare:2,legendary:3};return(e[r.rarity]??0)-(e[i.rarity]??0)}else if(u===`type`)return r.type.localeCompare(i.type);else if(u===`default`){let e={physics:0,board:1,payout:2,utility:3,chaos:4,paint:5,money:6},t={common:0,uncommon:1,rare:2,legendary:3},n=(e[r.type]??0)-(e[i.type]??0);if(n!==0)return n;let a=(t[r.rarity]??0)-(t[i.rarity]??0);return a===0?r.cost-i.cost:a}else return r.name.localeCompare(i.name)});let f=d.map(t=>{let n=e[t];return`<option value="${t}">${n.name} [Cost: ${n.cost}⚡, ${n.rarity.substring(0,4)}, ${n.type.substring(0,4)}]</option>`}).join(``);a&&(a.innerHTML=f),o&&(o.innerHTML=f)}placeEngineBet(e,t,n){if(!this.engine.battleState||this.engine.battleState.phase!==`betting`)return;this.sound.playDraw();let r=Math.min(t,this.engine.battleState.chipsPool);r<=0||(this.engine.placeBet(e,r,n),this.render())}triggerSpin(e=!1){!this.engine.battleState||this.isSpinning||!e&&this.engine.battleState.bets.length===0||(this.setCurrentView(e?6:3),this.isSpinning=!0,this.showTurnEnd=!1,this.spinMessage=e?`ENEMY WHEEL IS SPINNING...`:`THE WHEEL IS SPINNING...`,this.engine.battleState&&(this.engine.battleState.isResolving=!1),this.render(),this.engine.spinWheel(),this.renderer&&(this.renderer.onSpinSettled=()=>{e?this.resolveEnemySpinOutcome():this.resolveSpinOutcome()}))}resolveSpinOutcome(){this.engine.resolveSpin();let e=this.engine.battleState?.lastSpinResult;if(!e)return;this.isSpinning=!1,this.sound.playDamageDealt(),this.engine.battleState&&(this.engine.battleState.isResolving=!0);let t=e.allOutcomes&&e.allOutcomes.length>0?e.allOutcomes.map(e=>`${e.number} ${e.color.toUpperCase()}`).join(`, `):`${e.number} ${e.color.toUpperCase()}`;e.damageDealt>0?this.spinMessage=`LANDED ON: ${t}! <br><span class="text-green">HIT! DEALT ${e.damageDealt} DAMAGE!</span>`:this.spinMessage=`LANDED ON: ${t}. <br><span class="text-red">MISS. NO DAMAGE DEALT.</span>`,this.render(),setTimeout(()=>{this.showSpinReport(!1)},1800)}triggerOpponentTurnSequence(){let e=this.engine.battleState;if(!e)return;if(e.isTestCombatMode){this.spinMessage=`TEST MODE: SKIPPING OPPONENT TURN`,this.render(),setTimeout(()=>{this.engine.resolveEnemyTurn(),this.setCurrentView(2),this.render()},1200);return}if(e.boardModifiers.enemyStunTurns&&e.boardModifiers.enemyStunTurns>0){e.boardModifiers.enemyStunTurns--,this.spinMessage=`ENEMY IS STUNNED! TURN SKIPPED!`,this.render(),setTimeout(()=>{this.engine.resolveEnemyTurn(),this.setCurrentView(4),this.render()},2e3);return}else if(e.boardModifiers.enemyNextStun){e.boardModifiers.enemyNextStun=!1,this.spinMessage=`ENEMY IS STUNNED! TURN SKIPPED!`,this.render(),setTimeout(()=>{this.engine.resolveEnemyTurn(),this.setCurrentView(4),this.render()},2e3);return}e.activeWheelOwner=`enemy`,this.render(),this.setCurrentView(5);let t=this.engine.chooseEnemyPlay(),n=t.bets,r=t.card;setTimeout(()=>{this.engine.battleState&&(this.renderer&&this.renderer.playOpponentActionAnimation(e.enemy.intent,n,r||void 0),setTimeout(()=>{this.engine.battleState&&(this.setCurrentView(6),setTimeout(()=>{this.engine.battleState&&(e.bets=n,this.render(),this.triggerSpin(!0))},1e3))},5e3))},1e3)}resolveEnemySpinOutcome(){this.engine.resolveEnemySpin();let e=this.engine.battleState?.lastSpinResult;if(!e)return;this.isSpinning=!1,this.sound.playDamageDealt(),this.engine.battleState&&(this.engine.battleState.isResolving=!0);let t=e.allOutcomes&&e.allOutcomes.length>0?e.allOutcomes.map(e=>`${e.number} ${e.color.toUpperCase()}`).join(`, `):`${e.number} ${e.color.toUpperCase()}`,n=this.engine.battleState?.enemy.intent;e.enemyWon?n&&n.type===`attack`?e.playerDamageTaken>0?this.spinMessage=`ENEMY LANDED ON: ${t}! <br><span class="text-red">HIT! YOU TAKE ${e.playerDamageTaken} DAMAGE!</span>`:this.spinMessage=`ENEMY LANDED ON: ${t}! <br><span class="text-green">BLOCKED! Shield absorbed the attack!</span>`:n&&n.type===`steal_chips`?this.spinMessage=`ENEMY LANDED ON: ${t}! <br><span class="text-red">STEAL! THEY STOLE ${n.value} CHIPS!</span>`:n&&n.type===`physics_debuff`?this.spinMessage=`ENEMY LANDED ON: ${t}! <br><span class="text-red">DEBUFF! WHEEL FRICTION DOUBLED!</span>`:this.spinMessage=`ENEMY LANDED ON: ${t}! <br><span class="text-red">HIT! Effect triggered!</span>`:this.spinMessage=`ENEMY LANDED ON: ${t}. <br><span class="text-green">MISS! NO DAMAGE TAKEN.</span>`,this.render(),setTimeout(()=>{this.showSpinReport(!0)},1800)}showSpinReport(e){let t=this.engine.battleState;if(!t||!t.lastSpinResult)return;this.isEnemyResolutionReport=e;let n=t.lastSpinResult,r=this.root.querySelector(`#resolution-overlay`),i=this.root.querySelector(`#res-slot-badge`),a=this.root.querySelector(`#res-summary-text`),o=this.root.querySelector(`#res-bets-list`),s=this.root.querySelector(`#res-cards-list`),l=this.root.querySelector(`#res-wheel-name`);if(!r||!i||!a||!o||!s)return;let u=e?t.enemyWheel:t.playerWheel;l&&(l.innerText=u.name.toUpperCase(),l.style.color=e?`#ef5350`:`#ffca28`),n.allOutcomes&&n.allOutcomes.length>1?(i.innerHTML=n.allOutcomes.map(e=>{let t=`green-bg`;return e.color===`red`?t=`red-bg`:e.color===`black`?t=`black-bg`:e.color===`gold`?t=`gold-bg`:e.color===`purple`?t=`purple-bg`:e.color===`cyan`?t=`cyan-bg`:e.color===`crimson`&&(t=`crimson-bg`),`<span class="res-sub-badge ${t}" style="margin: 0 4px; padding: 2px 8px; border-radius: 4px; font-weight: bold; border: 1px solid rgba(255,255,255,0.2); font-size: 1.2rem;">${e.number}</span>`}).join(``),i.className=`res-badge-container`,i.style.border=`none`,i.style.boxShadow=`none`,i.style.background=`none`):(i.innerText=n.number.toString(),i.className=`res-badge`,i.style.border=``,i.style.boxShadow=``,i.style.background=``,n.color===`red`?i.classList.add(`red-bg`):n.color===`black`?i.classList.add(`black-bg`):n.color===`green`?i.classList.add(`green-bg`):n.color===`gold`?i.classList.add(`gold-bg`):n.color===`purple`?i.classList.add(`purple-bg`):n.color===`cyan`?i.classList.add(`cyan-bg`):n.color===`crimson`&&i.classList.add(`crimson-bg`));let d=this.engine.runState.combatMode===`points`;if(!e)n.damageDealt>0?d?a.innerHTML=`<span class="text-green" style="font-size: 22px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.4);">HIT! YOU SCORED ${n.damageDealt} POINTS!</span>`:a.innerHTML=`<span class="text-green" style="font-size: 22px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.4);">HIT! YOU DEALT ${n.damageDealt} DAMAGE!</span>`:d?a.innerHTML=`<span class="text-red" style="font-size: 18px;">MISS! NO POINTS SCORED.</span>`:a.innerHTML=`<span class="text-red" style="font-size: 18px;">MISS! NO DAMAGE DEALT.</span>`;else if(d){let e=(n.damageDealt||0)+(n.playerDamageTaken||0);if(e>0)a.innerHTML=`<span class="text-red" style="font-size: 22px; text-shadow: 0 0 10px rgba(255, 0, 0, 0.4);">HIT! OPPONENT SCORED ${e} PTS!</span>`;else{let e=t.enemy.intent;e.type===`steal_chips`?a.innerHTML=`<span class="text-red" style="font-size: 18px;">STEAL! OPPONENT STOLE ${e.value} CHIPS!</span>`:e.type===`physics_debuff`?a.innerHTML=`<span class="text-red" style="font-size: 18px;">DEBUFF! WHEEL FRICTION WAS DOUBLED!</span>`:a.innerHTML=`<span class="text-green" style="font-size: 18px;">MISS! NO POINTS SCORED.</span>`}}else if(n.playerDamageTaken>0)a.innerHTML=`<span class="text-red" style="font-size: 22px; text-shadow: 0 0 10px rgba(255, 0, 0, 0.4);">HIT! YOU TOOK ${n.playerDamageTaken} DAMAGE!</span>`;else{let e=t.enemy.intent;e.type===`steal_chips`?a.innerHTML=`<span class="text-red" style="font-size: 18px;">STEAL! OPPONENT STOLE ${e.value} CHIPS!</span>`:e.type===`physics_debuff`?a.innerHTML=`<span class="text-red" style="font-size: 18px;">DEBUFF! WHEEL FRICTION WAS DOUBLED!</span>`:a.innerHTML=`<span class="text-green" style="font-size: 18px;">MISS! NO DAMAGE TAKEN.</span>`}n.slotEffect&&(a.innerHTML+=`<div class="slot-effect-banner ${n.color}" style="margin-top: 10px; font-size: 12px; font-weight: bold; border-radius: 4px; padding: 4px 10px;">${n.slotEffect}</div>`);let f=n.betsEvaluated||[];f.length===0?o.innerHTML=`<span style="color: #666; font-style: italic;">No active bets evaluated</span>`:o.innerHTML=f.map(r=>{let i=r.type.toUpperCase();r.type===`number`&&(i=`NUMBER ${r.numberValue}`);let a=!1,o=0;if(r.type===`red`&&n.color===`red`)a=!0,o=u.payoutMultipliers.red;else if(r.type===`black`&&n.color===`black`)a=!0,o=u.payoutMultipliers.black;else if(r.type===`green`)c(n.number,u,t.boardModifiers)===`green`&&(a=!0,o=u.payoutMultipliers.green);else if(r.type===`gold`&&n.color===`gold`)a=!0,o=u.payoutMultipliers.gold||4;else if(r.type===`purple`&&n.color===`purple`)a=!0,o=u.payoutMultipliers.purple||4;else if(r.type===`cyan`&&n.color===`cyan`)a=!0,o=u.payoutMultipliers.cyan||4;else if(r.type===`crimson`&&n.color===`crimson`){a=!0;let e=u.payoutMultipliers.crimson||6;o=this.engine.runState.hp/this.engine.runState.maxHp<.5?e*2:e}else r.type===`number`&&r.numberValue===n.number?(a=!0,o=u.payoutMultipliers.number):r.type===`odd`&&!u.greenNumbers.includes(n.number)&&n.number%2!=0?(a=!0,o=u.payoutMultipliers.odd):r.type===`even`&&!u.greenNumbers.includes(n.number)&&n.number%2==0&&(a=!0,o=u.payoutMultipliers.even);if(a){let t=r.amount*o,n=``;return n=d?e?`OPPONENT SCORED ${t} PTS`:`SCORED ${t} PTS`:e?`TOOK ${t} DMG`:`DEALT ${t} DMG`,`
            <div class="res-details-item">
              <span>${i} (${r.amount} ⚡)</span>
              <span class="text-green" style="font-weight: bold;">WIN! (${n})</span>
            </div>
          `}else return`
            <div class="res-details-item" style="opacity: 0.5;">
              <span>${i} (${r.amount} ⚡)</span>
              <span class="text-red">LOSS</span>
            </div>
          `}).join(``);let p=n.cardsActive||[];p.length===0?s.innerHTML=`<span style="color: #666; font-style: italic;">No active cards in effect</span>`:s.innerHTML=p.map(e=>`
          <div class="res-details-item">
            <span class="res-card-name">${e.name}</span>
            <span style="font-size: 10px; color: #888;">${e.type.toUpperCase()}</span>
          </div>
        `).join(``),r.classList.remove(`hidden`)}playCard(e){!this.engine.battleState||this.engine.battleState.phase!==`betting`||(this.engine.playCard(e)?(this.sound.playCardSwoosh(),this.render()):this.sound.playRouletteClick(.3))}removePlayedCard(e){!this.engine.battleState||this.engine.battleState.phase!==`betting`||(this.engine.removeCard(e)?(this.sound.playCardSwoosh(),this.render()):this.sound.playRouletteClick(.3))}setCurrentView(e){this.currentView=e,(e===3||e===6)&&(this.lastWheelView=e),this.root.querySelectorAll(`.view-controller-hud .view-btn`).forEach(t=>{parseInt(t.getAttribute(`data-view`)||`4`)===e?t.classList.add(`active`):t.classList.remove(`active`)}),this.onViewChanged&&this.onViewChanged(e)}bellTrigger(){this.currentView!==4&&(!this.engine.battleState||this.engine.battleState.phase!==`betting`||this.isSpinning||(this.engine.battleState.bets.length>0?(this.sound.playBell(),setTimeout(()=>{this.triggerSpin()},150)):(this.sound.playBell(),this.spinMessage=`PASSING TURN... (NO BETS PLACED)`,this.engine.passPlayerTurn(),this.render(),setTimeout(()=>{this.triggerOpponentTurnSequence()},800))))}render(){let e=this.engine.runState,t=document.body.classList.contains(`debug-ui-active`),n=document.body.classList.contains(`sandbox-active`);if(document.body.className=this.mobileModeActive?`mobile-mode`:``,t&&document.body.classList.add(`debug-ui-active`),n&&e.gameState===`COMBAT`?document.body.classList.add(`sandbox-active`):this.activeBrush=0,document.body.classList.add(`state-${e.gameState.toLowerCase()}`),e.gameState===`COMBAT`){this.sound.stopTitleMusic();let e=this.engine.battleState?.encounterType||`combat`;e===`boss`?this.sound.playEncounterMusic(`boss`):e===`elite`?this.sound.playEncounterMusic(`elite`):this.sound.playEncounterMusic(`combat`)}else e.gameState===`GAME_OVER`||e.gameState===`VICTORY`?(this.sound.stopTitleMusic(),this.sound.stopMusic()):e.gameState===`MENU`?(this.sound.stopMusic(),this.sound.playTitleMusic()):e.gameState===`LOADOUT_STORE`?(this.sound.isTitleMusicPlaying&&this.sound.stopTitleMusic(2.5),this.sound.stopMusic()):(this.sound.stopTitleMusic(),this.sound.playEncounterMusic(`ambient`));this.togglePanel(`menu-panel`,e.gameState===`MENU`),this.togglePanel(`store-panel`,e.gameState===`LOADOUT_STORE`&&!this.isCustomizingWheel),this.togglePanel(`wheel-customizer-panel`,e.gameState===`LOADOUT_STORE`&&this.isCustomizingWheel),this.togglePanel(`map-panel`,e.gameState===`MAP`),this.togglePanel(`shop-panel`,e.gameState===`SHOP`),this.togglePanel(`event-panel`,e.gameState===`EVENT`),this.togglePanel(`forge-panel`,e.gameState===`FORGE`),this.togglePanel(`gameover-panel`,e.gameState===`GAME_OVER`),this.togglePanel(`victory-panel`,e.gameState===`VICTORY`);let r=e.gameState!==`MENU`&&e.gameState!==`LOADOUT_STORE`&&e.gameState!==`GAME_OVER`&&e.gameState!==`VICTORY`&&!(this.mobileModeActive&&e.gameState===`COMBAT`);if(this.togglePanel(`hud-panel`,r),this.togglePanel(`combat-ui`,e.gameState===`COMBAT`),e.gameState!==`MENU`&&e.gameState!==`LOADOUT_STORE`){let t=e.hp/e.maxHp*100,n=this.root.querySelector(`#hud-hp-bar`),r=this.root.querySelector(`#hud-hp-text`),i=this.root.querySelector(`#hud-chips-text`),a=this.root.querySelector(`#hud-floor-text`),o=this.root.querySelector(`.hp-display`);o&&(e.combatMode===`points`?o.classList.add(`hidden`):o.classList.remove(`hidden`)),n&&(n.style.width=`${t}%`),r&&(r.innerText=`${e.hp} / ${e.maxHp}`),i&&(i.innerText=`${e.chips} ⚡`),a&&(a.innerText=`${e.currentFloor+1} / 7`)}if(e.gameState===`LOADOUT_STORE`&&(this.isCustomizingWheel?this.renderWheelCustomizer():this.renderLoadoutStore()),e.gameState===`MAP`&&this.renderMap(),e.gameState===`SHOP`&&this.renderShop(),e.gameState===`EVENT`&&this.renderEvent(),e.gameState===`FORGE`&&this.renderForge(),e.gameState!==`COMBAT`&&(this.lastEncounterId=``),e.gameState===`COMBAT`&&this.engine.battleState){let e=this.engine.battleState;e.enemy.id!==this.lastEncounterId&&(this.lastEncounterId=e.enemy.id,this.showCombatIntroOverlay(e)),this.renderCombat()}let i=this.root.querySelector(`#dev-tools-panel`);if(i){let t=e.gameState===`COMBAT`;i.querySelectorAll(`.dev-group:first-of-type button, .dev-group:first-of-type select`).forEach(e=>{e.disabled=!t});let n=i.querySelector(`#dev-combat-mode-select`);n&&(n.value=e.combatMode||`points`)}}togglePanel(e,t){let n=this.root.querySelector(`#${e}`);n&&(t?(n.classList.remove(`hidden`),n.classList.add(`active`)):(n.classList.remove(`active`),n.classList.add(`hidden`)))}renderMap(){let e=this.root.querySelector(`#map-scroll-container`),t=this.engine.runState,n=t.mapNodes,r=n.length*90+100,i=`<div class="map-grid-view" style="width: 320px; margin: 0 auto; height: ${r}px; position: relative;">`;i+=`<svg class="map-connections-svg" style="width: 320px; height: ${r}px;">`;let a={};n.forEach((e,t)=>{let r=(n.length-1-t)*90+50;e.forEach(e=>{let t=160+(e.lane-1)*90;a[e.id]={x:t,y:r}})}),n.forEach(e=>{e.forEach(e=>{let t=a[e.id];e.connections.forEach(n=>{let r=a[n];if(r&&t){let n=e.completed?`completed-line`:``;i+=`<path d="M ${t.x} ${t.y} C ${t.x} ${t.y-40}, ${r.x} ${r.y+40}, ${r.x} ${r.y}" class="map-path ${n}" />`}})})}),i+=`</svg>`,n.forEach((e,r)=>{let o=r===t.currentFloor;e.forEach(e=>{let r=a[e.id],s=`locked`;if(e.completed)s=`completed`;else if(o)if(t.currentNodeId===null)s=`selectable`;else{let r=(n[t.currentFloor-1]||[]).find(e=>e.id===t.currentNodeId);r&&r.connections.includes(e.id)&&(s=`selectable`)}i+=`
          <button 
            class="map-node ${s} node-type-${e.type}" 
            style="left: ${r.x-22}px; top: ${r.y-22}px"
            data-id="${e.id}"
            ${s===`selectable`?``:`disabled`}
          >
            <span class="node-icon">${{combat:`💀`,elite:`👹`,shop:`⚡`,event:`❓`,boss:`👑`,forge:`🔥`}[e.type]}</span>
            <span class="node-tooltip">${e.type.toUpperCase()}</span>
          </button>
        `})}),i+=`</div>`,e.innerHTML=i,e.querySelectorAll(`.map-node.selectable`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);this.sound.playDraw(),this.engine.selectNode(t),this.render()})});let o=e;setTimeout(()=>{if(o){let e=o.clientHeight||450;o.scrollTop=(n.length-1-t.currentFloor)*90+50-e/2}},50)}setHoveredForgeCard(e){this.hoveredForgeCardId=e,this.updateForgeDescriptionBox()}updateForgeDescriptionBox(){let e=this.root.querySelector(`#forge-card-desc-box`);if(!e)return;if(!this.hoveredForgeCardId){e.className=`forge-card-desc-box`,e.innerHTML=`
        <div class="forge-desc-title" style="color: #888;">INSPECT OFFERS</div>
        <div class="forge-desc-text" style="color: rgba(255,255,255,0.4);">
          Hover your cursor over a 3D Forge Card to inspect its details...
        </div>
      `;return}let t=this.engine.runState,n=(t.forgeCards||[]).find(e=>e.id===this.hoveredForgeCardId);if(!n){e.className=`forge-card-desc-box`,e.innerHTML=`
        <div class="forge-desc-title" style="color: #888;">INSPECT OFFERS</div>
        <div class="forge-desc-text" style="color: rgba(255,255,255,0.4);">
          Hover your cursor over a 3D Forge Card to inspect its details...
        </div>
      `;return}e.className=`forge-card-desc-box has-hover`;let i=``;i=n.purchased?`<div class="forge-desc-status" style="color: #ffca28; font-weight: bold; text-shadow: 0 0 6px rgba(255, 202, 40, 0.4);">OWNED / INSTALLED</div>`:t.chips<n.cost?`<div class="forge-desc-status" style="color: #ff3333; font-weight: bold;">TOO EXPENSIVE (Costs ${n.cost} ⚡)</div>`:`<div class="forge-desc-status" style="color: #00ff66; font-weight: bold; text-shadow: 0 0 6px rgba(0, 255, 100, 0.4);">CLICK TO PURCHASE FOR ${n.cost} ⚡</div>`;let a=t.combatMode===`points`;e.innerHTML=`
      <div class="forge-desc-title rarity-${n.rarity}">${n.name}</div>
      <div class="forge-desc-text">${r(n.description,a)}</div>
      ${i}
    `}renderForge(){let e=this.root.querySelector(`#forge-panel`);if(!e)return;let t=this.engine.runState,n=t.playerWheel;if(!n)return;let r=n.payoutMultipliers,i=t.colorLevels||{red:1,black:1,green:1,gold:1,purple:1,cyan:1,crimson:1},a=this.engine.getScaledPayoutMultiplier(`red`,r.red),o=this.engine.getScaledPayoutMultiplier(`black`,r.black),s=this.engine.getScaledPayoutMultiplier(`green`,r.green),c=this.mobileModeActive?`Purchase upgrades to shape your wheel layout. Reroll for new offers.`:`Purchase upgrades to shape your wheel layout and bet payouts. Rerolling generates new offers.`,l=this.mobileModeActive?`style="font-size: 1.0rem; margin: 8px auto;"`:``,u=this.mobileModeActive?`style="flex-wrap: wrap; gap: 8px; justify-content: center;"`:``;e.innerHTML=`
      <div class="forge-hud">
        <div class="forge-title-panel">
          <h1>THE BLACKSMITH'S FORGE</h1>
          <p class="flavor-text">${c}</p>
        </div>

        <div class="forge-stats-panel" ${l}>
          <div>CHIPS: <span class="forge-stats-chips">${t.chips} ⚡</span></div>
          <div class="forge-stats-multipliers" ${u}>
            SLOTS: <span style="color:#fff;">${n.numbers.length}</span> | 
            RED (Lvl ${i.red}): <span style="color:#ef5350;">${a}x</span> | 
            BLACK (Lvl ${i.black}): <span style="color:#aaaaaa;">${o}x</span> | 
            GREEN (Lvl ${i.green}): <span style="color:#4caf50;">${s}x</span> | 
            SINGLE #: <span style="color:#ffd54f;">${r.number}x</span> | 
            ODD: <span style="color:#ffd54f;">${r.odd}x</span> | 
            EVEN: <span style="color:#0288d1;">${r.even}x</span>
          </div>
        </div>

        <div class="forge-bottom-hud">
          <div id="forge-card-desc-box" class="forge-card-desc-box">
            <!-- Updated dynamically on hover -->
          </div>

          <div class="forge-action-buttons">
            <button id="forge-reroll-btn" class="forge-btn" ${t.chips<5?`disabled`:``}>
              Reroll Offers (5 ⚡)
            </button>
            <button id="forge-leave-btn" class="forge-btn leave-btn">
              Return to Paths
            </button>
          </div>
        </div>

        <!-- Mobile Forge Offers List -->
        ${this.mobileModeActive&&t.forgeCards?`
          <div id="forge-mobile-container" class="shop-grid">
            ${t.forgeCards.map(e=>{let n=`shop-card-rarity-${e.rarity===`gold`?`legendary`:e.rarity===`silver`?`rare`:`common`}`,r=t.chips>=e.cost;return`
                <div class="shop-card-item glass-panel ${n}">
                  <div class="shop-card-meta">${e.rarity.toUpperCase()} UPGRADE</div>
                  <div class="card-title">${e.name}</div>
                  <div class="card-desc">${e.description}</div>
                  ${e.purchased?`
                    <span class="upgrade-badge">PURCHASED</span>
                    <button class="btn primary-btn buy-btn" style="opacity: 0.5;" disabled>
                      OWNED
                    </button>
                  `:`
                    <button class="btn primary-btn buy-btn forge-buy-btn" data-id="${e.id}" ${r?``:`disabled`}>
                      BUY: ${e.cost} ⚡
                    </button>
                  `}
                </div>
              `}).join(``)}
          </div>
        `:``}
      </div>
    `,this.updateForgeDescriptionBox();let d=e.querySelector(`#forge-reroll-btn`);d&&d.addEventListener(`click`,()=>{t.chips<5||(this.sound.playDraw(),this.engine.rerollForge(),this.renderer&&(this.renderer.hoveredForgeCardId=null,this.hoveredForgeCardId=null,this.renderer.syncForgeCards()),this.render())});let f=e.querySelector(`#forge-leave-btn`);f&&f.addEventListener(`click`,()=>{this.sound.playCardSwoosh(),t.gameState=`MAP`,this.render()}),this.mobileModeActive&&e.querySelectorAll(`.forge-buy-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);this.engine.purchaseForgeCard(t)&&(this.sound.playDraw(),this.renderer&&(this.renderer.hoveredForgeCardId=null,this.hoveredForgeCardId=null,this.renderer.syncForgeCards()),this.render())})})}renderShop(){let e=this.root.querySelector(`#shop-tab-cards`),t=this.root.querySelector(`#shop-tab-upgrades`),n=this.root.querySelector(`#shop-cards-view`),r=this.root.querySelector(`#shop-upgrades-view`);e&&t&&n&&r&&(this.activeShopTab===`cards`?(e.classList.add(`active`),t.classList.remove(`active`),n.classList.remove(`hidden`),r.classList.add(`hidden`)):(t.classList.add(`active`),e.classList.remove(`active`),r.classList.remove(`hidden`),n.classList.add(`hidden`)));let i=this.root.querySelector(`.shop-welcome`);i&&(i.innerText=this.mobileModeActive?`"Spend essence wisely, mortal..."`:`"Spend your essence wisely, mortal. Or bleed for it..."`),this.activeShopTab===`cards`?this.renderShopCards():this.renderShopUpgrades(),this.updateShopDescriptionBox()}renderShopCards(){let n=this.root.querySelector(`#shop-items-container`),i=this.engine.runState;if(this.shopCards.length===0)for(let n=0;n<3;n++){let n=t(),r=e[n],i=12+Math.floor(Math.random()*8);r.rarity===`common`?i=8+Math.floor(Math.random()*6):r.rarity===`uncommon`?i=14+Math.floor(Math.random()*8):r.rarity===`rare`?i=25+Math.floor(Math.random()*11):r.rarity===`legendary`&&(i=45+Math.floor(Math.random()*16)),this.shopCards.push({cardId:n,name:r.name,cost:i,desc:r.description,rarity:r.rarity,type:r.type})}let a=``,o=i.combatMode===`points`;this.shopCards.forEach((e,t)=>{let n=i.chips>=e.cost,s=`shop-card-rarity-${e.rarity}`,c=e.type===`paint`?`paint-card`:``,l=e.type===`money`?`money-card`:``;a+=`
        <div class="shop-card-item glass-panel ${s} ${c} ${l}">
          <div class="shop-card-meta">${e.type} · ${e.rarity}</div>
          <div class="card-title">${e.name}</div>
          <div class="card-desc">${r(e.desc,o)}</div>
          <button class="btn primary-btn buy-btn" data-idx="${t}" ${n?``:`disabled`}>
            BUY: ${e.cost} ⚡
          </button>
        </div>
      `});let s=i.chips>=12&&i.hp<i.maxHp;a+=`
      <div class="shop-card-item glass-panel shop-heal-item">
        <div class="card-title">Blood Infusion</div>
        <div class="card-desc">${r(`Transfuse essence back into your veins. Heals 25 HP.`,o)}</div>
        <button id="buy-heal-btn" class="btn primary-btn buy-btn" ${s?``:`disabled`}>
          HEAL: 12 ⚡
        </button>
      </div>
    `,n.innerHTML=a,n.querySelectorAll(`.buy-btn[data-idx]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-idx`)),n=this.shopCards[t];this.engine.buyCardInShop(n.cardId,n.cost)&&(this.sound.playDraw(),this.shopCards.splice(t,1),this.render())})}),n.querySelector(`#buy-heal-btn`)?.addEventListener(`click`,()=>{this.engine.healInShop(25,12)&&(this.sound.playDraw(),this.render())}),this.mobileModeActive?n.classList.remove(`hidden`):n.classList.add(`hidden`),this.renderer&&this.renderer.syncShopItems()}renderShopUpgrades(){let e=this.root.querySelector(`#shop-upgrades-container`);if(!e)return;let t=this.engine.runState,n=t.playerWheel,i=``,a=t.combatMode===`points`;Object.keys(k).forEach(e=>{let o=k[e],s=n.upgrades.includes(e),c=o.cost,l=o.name,u=o.description;if(e.startsWith(`level_`)){let n=e.replace(`level_`,``),r=t.colorLevels?.[n]||1;c=15+(r-1)*5,r>=10&&(s=!0),l=`${l} (Lvl ${r})`,u=`${u} Currently: Lvl ${r}.`}let d=t.chips>=c;i+=`
        <div class="shop-card-item glass-panel">
          <div class="card-title">${l}</div>
          <div class="card-desc">${r(u,a)}</div>
          ${s?`
            <span class="upgrade-badge">${e.startsWith(`level_`)?`MAXED`:`PURCHASED`}</span>
            <button class="btn primary-btn buy-upgrade-btn" style="opacity: 0.5;" disabled>
              ${e.startsWith(`level_`)?`MAXED`:`OWNED`}
            </button>
          `:`
            <button class="btn primary-btn buy-upgrade-btn animate-btn" data-id="${e}" ${d?``:`disabled`}>
              BUY: ${c} ⚡
            </button>
          `}
        </div>
      `}),e.innerHTML=i,e.querySelectorAll(`.buy-upgrade-btn[data-id]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);this.engine.buyBoardUpgrade(t)&&(this.sound.playDraw(),this.render())})}),this.mobileModeActive?e.classList.remove(`hidden`):e.classList.add(`hidden`),this.renderer&&this.renderer.syncShopItems()}renderLoadoutStore(){let e=this.root.querySelector(`#store-panel`);if(!e)return;let t=this.engine.runState,n=t.storePoints??10,i=t.storeItems??[],a=i.filter(e=>e.type===`card`),o=i.filter(e=>e.type===`wheel`),s=t.deck.length,c=t.playerWheel.name,l=t.playerWheel.rarity||`common`,u=t.deck.map(e=>`
      <span class="store-loadout-chip rarity-${e.rarity}">${e.name}</span>
    `).join(``),d=t.combatMode===`points`,f=``;a.forEach(e=>{let t=e.purchased,i=n<e.pointsCost,a=`store-item rarity-${e.rarity} ${t?`purchased`:``} ${i&&!t?`too-expensive`:``}`;f+=`
        <div class="${a}" data-id="${e.id}">
          <div class="store-item-header">
            <span class="store-item-name">${e.name}</span>
            <span class="store-item-cost">${e.pointsCost} PTS</span>
          </div>
          <div class="store-item-desc">${r(e.description,d)}</div>
          <div class="store-item-rarity ${e.rarity}">${e.rarity}</div>
          ${t?`<div class="purchased-badge">OWNED</div>`:``}
        </div>
      `});let p=``;o.forEach(e=>{let t=e.purchased,i=n<e.pointsCost,a=`store-item rarity-${e.rarity} ${t?`purchased`:``} ${i&&!t?`too-expensive`:``}`,o=T().find(t=>t.id===e.itemId),s=``;o&&(s=`
          <div class="store-wheel-stats">
            <span class="store-wheel-stat">${o.numbers.length} slots</span>
            <span class="store-wheel-stat">${o.greenNumbers.length} green</span>
            <span class="store-wheel-stat">${o.payoutMultipliers.red}x R / ${o.payoutMultipliers.black}x B</span>
          </div>
        `),p+=`
        <div class="${a}" data-id="${e.id}">
          <div class="store-item-header">
            <span class="store-item-name">${e.name}</span>
            <span class="store-item-cost">${e.pointsCost} PTS</span>
          </div>
          <div class="store-item-desc">${r(e.description,d)}</div>
          ${s}
          <div class="store-item-rarity ${e.rarity}">${e.rarity}</div>
          ${t?`<div class="purchased-badge">ACTIVE</div>`:``}
        </div>
      `}),e.innerHTML=`
      <div class="store-container">
        <div class="store-header">
          <h1>ROULETTE.OS Drafting Store</h1>
          <p class="flavor-text">Prepare your loadout. Choose your weapons and bind your wheel.</p>
          <div class="store-points-bar">
            <span>AVAILABLE POINTS:</span>
            <span class="store-points-value">${n}</span>
          </div>
        </div>

        <div class="store-sections">
          <div class="store-section">
            <h2>CARDS FOR SALE</h2>
            <div class="store-grid">
              ${f}
            </div>
          </div>
          <div class="store-section">
            <h2>WHEELS FOR SALE</h2>
            <div class="store-grid">
              ${p}
            </div>
          </div>
        </div>

        <div class="store-loadout">
          <h3>CURRENT LOADOUT</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span class="store-loadout-chip wheel-chip rarity-${l}" style="font-size: 1.1rem; padding: 6px 12px;">
                WHEEL: ${c} (${l})
              </span>
              <button id="store-customize-wheel-btn" class="btn secondary-btn" style="padding: 4px 12px; font-size: 0.9rem;">
                ⚙ CUSTOMIZE WHEEL
              </button>
            </div>
            <div>
              <span style="font-family: 'VT323', monospace; font-size: 0.95rem; color: #aaa; margin-right: 6px;">DECK (${s} cards):</span>
              <div class="store-loadout-items" style="display: inline-flex; vertical-align: middle;">
                ${u}
              </div>
            </div>
          </div>
        </div>

        <button id="store-continue-btn" class="store-continue-btn">
          CONTINUE TO MAP
        </button>
      </div>
    `,e.querySelectorAll(`.store-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);this.sound.playDraw(),this.engine.purchaseStoreItem(t)?this.render():this.sound.playRouletteClick(.3)})});let m=e.querySelector(`#store-customize-wheel-btn`);m&&m.addEventListener(`click`,()=>{this.sound.playCardSwoosh(),this.customWheelData=JSON.parse(JSON.stringify(t.playerWheel)),this.isCustomizingWheel=!0,this.render()}),e.querySelector(`#store-continue-btn`).addEventListener(`click`,()=>{this.sound.playCardSwoosh(),this.engine.completeStore(),this.render()})}renderWheelCustomizer(){let e=this.root.querySelector(`#cust-numbers-grid`);if(!e)return;let t=``,n=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);for(let e=0;e<=36;e++){let r=this.customWheelData.numbers.includes(e),i=this.customWheelData.colors[e]||(e===0?`green`:n.has(e)?`red`:`black`);t+=`
        <div class="cell-option ${r?`active`:``}" data-num="${e}">
          <span class="cell-num">${e}</span>
          ${r?`<span class="cell-color-indicator ${i}" data-num="${e}"></span>`:``}
        </div>
      `}e.innerHTML=t,e.querySelectorAll(`.cell-option`).forEach(e=>{e.addEventListener(`click`,t=>{let r=parseInt(e.getAttribute(`data-num`));if(t.target.classList.contains(`cell-color-indicator`)){t.stopPropagation();let e=this.customWheelData.colors[r]||`black`,n=`red`;e===`green`?(n=`red`,this.customWheelData.greenNumbers=this.customWheelData.greenNumbers.filter(e=>e!==r)):e===`red`?(n=`black`,this.customWheelData.greenNumbers=this.customWheelData.greenNumbers.filter(e=>e!==r)):e===`black`?(n=`gold`,this.customWheelData.greenNumbers=this.customWheelData.greenNumbers.filter(e=>e!==r)):e===`gold`?(n=`purple`,this.customWheelData.greenNumbers.includes(r)||this.customWheelData.greenNumbers.push(r)):e===`purple`?(n=`cyan`,this.customWheelData.greenNumbers=this.customWheelData.greenNumbers.filter(e=>e!==r)):e===`cyan`?(n=`crimson`,this.customWheelData.greenNumbers=this.customWheelData.greenNumbers.filter(e=>e!==r)):(n=`green`,this.customWheelData.greenNumbers.includes(r)||this.customWheelData.greenNumbers.push(r)),this.customWheelData.colors[r]=n,this.sound.playRouletteClick(.5),this.renderWheelCustomizer();return}let i=this.customWheelData.numbers.indexOf(r);if(i>=0){if(this.customWheelData.numbers.length<=1){this.sound.playRouletteClick(.3);return}this.customWheelData.numbers.splice(i,1),this.customWheelData.greenNumbers=this.customWheelData.greenNumbers.filter(e=>e!==r)}else this.customWheelData.numbers.push(r),r===0?(this.customWheelData.colors[r]=`green`,this.customWheelData.greenNumbers.includes(r)||this.customWheelData.greenNumbers.push(r)):this.customWheelData.colors[r]=n.has(r)?`red`:`black`;this.sound.playDraw(),this.renderWheelCustomizer()})}),this.root.querySelectorAll(`.quick-templates .template-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-template`);this.sound.playCardSwoosh(),t===`mini`?(this.customWheelData.numbers=[0,9,2,7,4,5,12,1,10,3,8,11,6],this.customWheelData.greenNumbers=[0],this.initCustomColors()):t===`even`?(this.customWheelData.numbers=[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36],this.customWheelData.greenNumbers=[0],this.initCustomColors()):t===`reds`?(this.customWheelData.numbers=[0,1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],this.customWheelData.greenNumbers=[0],this.customWheelData.colors={},this.customWheelData.numbers.forEach(e=>{this.customWheelData.colors[e]=e===0?`green`:`red`})):t===`classic`&&(this.customWheelData.numbers=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26],this.customWheelData.greenNumbers=[0],this.initCustomColors()),this.renderWheelCustomizer()})});let r=this.root.querySelector(`#cust-cancel-btn`);r?.replaceWith(r.cloneNode(!0)),this.root.querySelector(`#cust-cancel-btn`).addEventListener(`click`,()=>{this.sound.playCardSwoosh(),this.isCustomizingWheel=!1,this.render()});let i=this.root.querySelector(`#cust-start-btn`);i?.replaceWith(i.cloneNode(!0)),this.root.querySelector(`#cust-start-btn`).addEventListener(`click`,()=>{if(this.customWheelData.numbers.length===0){alert(`The wheel must contain at least 1 slot.`);return}let e=this.root.querySelector(`#cust-wheel-name`),t=this.root.querySelector(`#cust-wheel-desc`);this.customWheelData.name=e.value||`Custom Destroyer`,this.customWheelData.description=t.value||`A bespoke engine of risk and reward.`,this.customWheelData.payoutMultipliers.red=parseFloat(this.root.querySelector(`#cust-payout-red`).value)||2,this.customWheelData.payoutMultipliers.black=parseFloat(this.root.querySelector(`#cust-payout-black`).value)||2,this.customWheelData.payoutMultipliers.green=parseFloat(this.root.querySelector(`#cust-payout-green`).value)||10,this.customWheelData.payoutMultipliers.number=parseFloat(this.root.querySelector(`#cust-payout-number`).value)||12,this.customWheelData.payoutMultipliers.odd=parseFloat(this.root.querySelector(`#cust-payout-odd`).value)||2,this.customWheelData.payoutMultipliers.even=parseFloat(this.root.querySelector(`#cust-payout-even`).value)||2;let n=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);this.customWheelData.numbers.forEach(e=>{this.customWheelData.colors[e]||(this.customWheelData.colors[e]=this.customWheelData.greenNumbers.includes(e)?`green`:n.has(e)?`red`:`black`)}),this.sound.playBell(),this.isCustomizingWheel=!1,this.engine.runState.playerWheel=JSON.parse(JSON.stringify(this.customWheelData)),this.engine.runState.playerWheel.id=`custom`,this.engine.runState.selectedWheelId=`custom`,this.render()})}renderEvent(){let e=this.root.querySelector(`#event-title`),t=this.root.querySelector(`#event-text`),n=this.root.querySelector(`#event-options`);this.engine.runState,e.innerHTML=`THE HOODED SPECTRE`,this.mobileModeActive?t.innerHTML=`"A tribute to the wheel... or a transfusion to live. Your choice, mortal..."`:t.innerHTML=`
        An old croupier with glowing red stitching across their eyes block your path. 
        They extend a decaying, shaking palm holding a dark magnet and a rusty syringe.
        <br><br>
        "A tribute to the wheel... or a transfusion to live. Your choice, mortal..."
      `,n.innerHTML=`
      <button class="event-choice-btn" data-choice="1">
        <span class="choice-tag">[Inject Syringe]</span> Lose 8 HP, gain 25 Essence chips.
      </button>
      <button class="event-choice-btn" data-choice="2">
        <span class="choice-tag">[Accept Magnet]</span> Add Lodestone Magnet card to your deck.
      </button>
      <button class="event-choice-btn" data-choice="3">
        <span class="choice-tag">[Decline & Pass]</span> Push past them. Gain nothing, lose nothing.
      </button>
    `,n.querySelectorAll(`.event-choice-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-choice`);this.makeEventChoice(t)})}),this.mobileModeActive?n.classList.remove(`hidden`):n.classList.add(`hidden`),this.renderer&&this.renderer.syncEventChoices(),this.updateEventDescriptionBox()}renderCombat(){let e=this.engine.battleState;if(!e)return;let t=this.engine.runState,n=t.combatMode===`points`,r=this.root.querySelector(`.enemy-hud`),i=this.root.querySelector(`.color-levels-hud`);if(i){let n=t.colorLevels||{red:1,black:1,green:1,gold:1,purple:1,cyan:1,crimson:1},r=t.colorUnlocks||{red_ability:!1,black_ability:!1,green_ability:!1},a=[{name:`Red`,color:`#ff3b30`,lvl:n.red,mult:this.engine.getScaledPayoutMultiplier(`red`,t.playerWheel.payoutMultipliers.red),ability:r.red_ability?`🔥 FEVER`:`🔒 LOCKED`},{name:`Black`,color:`#888888`,lvl:n.black,mult:this.engine.getScaledPayoutMultiplier(`black`,t.playerWheel.payoutMultipliers.black),ability:r.black_ability?`❄️ GLACIER`:`🔒 LOCKED`},{name:`Green`,color:`#34c759`,lvl:n.green,mult:this.engine.getScaledPayoutMultiplier(`green`,t.playerWheel.payoutMultipliers.green),ability:r.green_ability?`⚡ SYNAPSE`:`🔒 LOCKED`},{name:`Gold`,color:`#ffcc00`,lvl:n.gold,mult:this.engine.getScaledPayoutMultiplier(`gold`,t.playerWheel.payoutMultipliers.gold||4),ability:`✨ MIDAS`},{name:`Purple`,color:`#af52de`,lvl:n.purple,mult:this.engine.getScaledPayoutMultiplier(`purple`,t.playerWheel.payoutMultipliers.purple||4),ability:`🔮 CURSE`},{name:`Cyan`,color:`#5ac8fa`,lvl:n.cyan,mult:this.engine.getScaledPayoutMultiplier(`cyan`,t.playerWheel.payoutMultipliers.cyan||4),ability:`🔋 CHARGE`},{name:`Crimson`,color:`#ff2d55`,lvl:n.crimson,mult:this.engine.getScaledPayoutMultiplier(`crimson`,t.playerWheel.payoutMultipliers.crimson||6),ability:`🩸 SURGE`}],o=e.chipsPool<(e.enemyChipsPool||0),s=`
        <div style="font-weight: bold; color: var(--color-gold); font-family: var(--font-header); font-size: 1.1rem; margin-bottom: 6px; letter-spacing: 1px; border-bottom: 1px solid rgba(197, 159, 81, 0.25); padding-bottom: 4px; display: flex; justify-content: space-between;">
          <span>COLOR LEVEL</span>
          <span style="font-size: 0.8rem; opacity: 0.7;">MAX 10</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px; font-family: var(--font-mono); font-size: 0.7rem;">
      `;a.forEach(e=>{let t=e.name===`Crimson`?`${e.mult}x${o?` (x2)`:``}`:`${e.mult}x`;s+=`
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${e.color}; box-shadow: 0 0 4px ${e.color}; border: 1px solid rgba(255,255,255,0.2);"></span>
              <span style="font-weight: bold; color: #fff;">${e.name.toUpperCase()}</span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span style="color: var(--color-gold);">Lvl ${e.lvl}</span>
              <span style="opacity: 0.85; width: 45px; text-align: right;">${t}</span>
              <span style="font-size: 0.6rem; font-family: var(--font-header); color: ${e.ability.includes(`LOCKED`)?`#888`:`#ffd54f`}; background: ${e.ability.includes(`LOCKED`)?`rgba(255,255,255,0.05)`:`rgba(197, 159, 81, 0.15)`}; padding: 1px 4px; border-radius: 2px; border: 1px solid ${e.ability.includes(`LOCKED`)?`rgba(255,255,255,0.1)`:`rgba(197, 159, 81, 0.3)`}; min-width: 50px; text-align: center;">${e.ability}</span>
            </div>
          </div>
        `}),s+=`</div>`,i.innerHTML=s}r&&(this.mobileModeActive?(r.innerHTML=`
          <div class="mobile-combined-hud">
            <!-- Top row: Stats & Menu Buttons -->
            <div class="mobile-hud-top-row" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(197, 159, 81, 0.25); padding-bottom: 4px; margin-bottom: 6px;">
              <span class="mobile-hud-stat text-gold" style="font-weight: bold; font-family: var(--font-header); font-size: 1.15rem;">${t.chips} ⚡</span>
              <span class="mobile-hud-stat" style="font-family: var(--font-header); font-size: 1rem; opacity: 0.85;">FLOOR ${t.currentFloor+1} / 7</span>
              <div class="mobile-hud-buttons" style="display: flex; gap: 6px;">
                <button class="mobile-hud-btn" id="mobile-hud-settings-btn" style="background: rgba(197,159,81,0.1); border: 1px solid var(--color-gold); color: var(--color-gold); font-size: 0.85rem; padding: 2px 6px; border-radius: 4px; cursor: pointer;">⚙ SETTINGS</button>
                <button class="mobile-hud-btn" id="mobile-hud-abandon-btn" style="background: rgba(229,57,53,0.1); border: 1px solid var(--color-red); color: var(--color-red); font-size: 0.85rem; padding: 2px 6px; border-radius: 4px; cursor: pointer;">🏳 ABANDON</button>
                <button class="mobile-hud-btn" id="mobile-hud-dev-btn" style="background: rgba(255,170,0,0.1); border: 1px solid #ffaa00; color: #ffaa00; font-size: 0.85rem; padding: 2px 6px; border-radius: 4px; cursor: pointer; display: block;">🛠 DEV</button>
              </div>
            </div>
            
            <!-- Middle row: Enemy details & intent -->
            <div class="mobile-hud-middle-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <div class="mobile-hud-enemy-info" style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; width: 100%;">
                <span class="enemy-name-label" style="font-family: var(--font-header); font-size: 1.1rem; color: #fff; font-weight: bold; text-shadow: 0 0 6px rgba(255,255,255,0.2);">${e.enemy.name}</span>
                <span class="enemy-intent-label" style="font-family: var(--font-header); font-size: 0.9rem; color: #ffaa00; margin-top: 1px;">INTENT: <span class="intent-desc-val" style="color: #fff;">${e.enemy.intent.description}</span></span>
              </div>
            </div>
            
            ${e.curse?`
              <div class="mobile-curse-info" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; padding: 4px; border: 1px dashed var(--color-gold); background: rgba(197,159,81,0.05); border-radius: 4px; font-family: var(--font-header);">
                <span style="font-size: 1.1rem;">${e.curse.icon}</span>
                <div style="display: flex; flex-direction: column; text-align: left;">
                  <span style="font-size: 0.85rem; font-weight: bold; color: var(--color-gold);">${e.curse.name}</span>
                  <span style="font-size: 0.75rem; color: #ece0d8; opacity: 0.85; line-height: 1.2;">${e.curse.description}</span>
                </div>
              </div>
            `:``}

            <!-- Bottom row: Scores or HP Bars -->
            <div class="mobile-hud-bottom-row">
              ${n?`
                <div class="mobile-hud-scores" style="display: flex; align-items: center; justify-content: space-between; width: 100%; font-family: var(--font-header);">
                  <div class="mobile-score-box" style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                    <span class="score-lbl" style="font-size: 0.75rem; opacity: 0.7;">PLAYER</span>
                    <span class="score-val" style="font-size: 1.5rem; font-weight: bold; color: var(--color-gold);">${e.chipsPool}</span>
                  </div>
                  <div class="mobile-score-vs" style="font-size: 0.9rem; opacity: 0.5; padding: 0 10px;">VS</div>
                  <div class="mobile-score-box" style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                    <span class="score-lbl" style="font-size: 0.75rem; opacity: 0.7;">ENEMY</span>
                    <span class="score-val" style="font-size: 1.5rem; font-weight: bold; color: var(--color-red);">${e.enemyChipsPool||0}</span>
                  </div>
                  <div class="mobile-score-round" style="display: flex; flex-direction: column; align-items: flex-end; padding-left: 10px; border-left: 1px solid rgba(255,255,255,0.15); margin-left: 10px; font-size: 0.95rem;">
                    <span>RD ${e.turn}/${e.maxRounds||3}</span>
                    ${e.isSuddenDeath?`<span class="sd-tag pulse-fast" style="color: var(--color-red); font-size: 0.7rem; font-weight: bold; letter-spacing: 0.5px;">SUDDEN DEATH</span>`:``}
                  </div>
                </div>
              `:`
                <div class="mobile-hud-hp-bars" style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
                  <div class="mobile-hp-bar-item" style="display: flex; align-items: center; gap: 8px;">
                    <span class="hp-bar-lbl" style="font-family: var(--font-header); font-size: 0.85rem; width: 50px; text-align: left; color: #ecdec0;">HP:</span>
                    <div class="bar-container player-hp-bar-container" style="flex: 1; height: 14px; position: relative;">
                      <div class="bar hp-bar" style="width: ${t.hp/t.maxHp*100}%; height: 100%; background: var(--color-red);"></div>
                      <span class="bar-text" style="font-size: 9px; line-height: 14px;">${t.hp} / ${t.maxHp}</span>
                    </div>
                  </div>
                  <div class="mobile-hp-bar-item" style="display: flex; align-items: center; gap: 8px;">
                    <span class="hp-bar-lbl" style="font-family: var(--font-header); font-size: 0.85rem; width: 50px; text-align: left; color: #ffaa00;">ENEMY:</span>
                    <div class="bar-container enemy-hp-bar-container" style="flex: 1; height: 14px; position: relative;">
                      <div class="bar hp-bar" style="width: ${e.enemy.hp/e.enemy.maxHp*100}%; height: 100%; background: #420a06; border: 1px solid var(--color-red);"></div>
                      <span class="bar-text" style="font-size: 9px; line-height: 14px;">${e.enemy.hp} / ${e.enemy.maxHp}</span>
                    </div>
                  </div>
                </div>
              `}
            </div>
          </div>
        `,r.querySelector(`#mobile-hud-settings-btn`)?.addEventListener(`click`,()=>{this.root.querySelector(`#hud-settings-btn`)?.dispatchEvent(new Event(`click`))}),r.querySelector(`#mobile-hud-abandon-btn`)?.addEventListener(`click`,()=>{this.root.querySelector(`#hud-abandon-btn`)?.dispatchEvent(new Event(`click`))}),r.querySelector(`#mobile-hud-dev-btn`)?.addEventListener(`click`,()=>{this.root.querySelector(`#dev-tools-btn`)?.dispatchEvent(new Event(`click`))})):n?r.innerHTML=`
            <div class="scoreboard-container">
              <div class="scoreboard-header">
                <h3 id="enemy-name" class="enemy-title" style="margin: 0; font-size: 15px;">${e.enemy.name}</h3>
                <div class="enemy-intent" style="margin-top: 2px;">
                  <span class="intent-label" style="font-size: 8px;">INTENT:</span>
                  <span id="enemy-intent-text" class="intent-desc" style="font-size: 11px;">${e.enemy.intent.description}</span>
                </div>
              </div>
              <div class="scoreboard-rounds">
                <span class="rounds-label">ROUND</span>
                <span class="rounds-value">${e.turn} / ${e.maxRounds||6}</span>
                ${e.isSuddenDeath?`<div class="sudden-death-glow pulse-fast">SUDDEN DEATH</div>`:``}
              </div>
              <div class="scoreboard-scores">
                <div class="score-box player-score-box">
                  <span class="score-label">PLAYER</span>
                  <span class="score-value">${e.chipsPool}</span>
                </div>
                <div class="score-box vs-box">VS</div>
                <div class="score-box enemy-score-box">
                  <span class="score-label">ENEMY</span>
                  <span class="score-value">${e.enemyChipsPool||0}</span>
                </div>
              </div>
              ${e.curse?`
                <div class="curse-box" style="margin-top: 10px; padding: 6px 10px; border: 1.5px solid var(--color-gold); background: rgba(18, 11, 8, 0.6); border-radius: 4px; display: flex; align-items: center; gap: 10px; text-align: left; font-family: var(--font-header);">
                  <span style="font-size: 1.5rem;">${e.curse.icon}</span>
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 0.95rem; font-weight: bold; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.5px;">${e.curse.name}</span>
                    <span style="font-size: 0.75rem; color: #ece0d8; opacity: 0.9; line-height: 1.3;">${e.curse.description}</span>
                  </div>
                </div>
              `:``}
            </div>
          `:r.innerHTML=`
            <h3 id="enemy-name" class="enemy-title">${e.enemy.name}</h3>
            <div class="bar-container enemy-hp-container">
              <div id="enemy-hp-bar" class="bar hp-bar" style="width: ${e.enemy.hp/e.enemy.maxHp*100}%"></div>
              <span id="enemy-hp-text" class="bar-text">${e.enemy.hp} / ${e.enemy.maxHp}</span>
            </div>
            <div class="enemy-intent">
              <span class="intent-label">INTENT:</span>
              <span id="enemy-intent-text" class="intent-desc">${e.enemy.intent.description}</span>
            </div>
            ${e.curse?`
              <div class="curse-box" style="margin-top: 10px; padding: 6px 10px; border: 1.5px solid var(--color-gold); background: rgba(18, 11, 8, 0.6); border-radius: 4px; display: flex; align-items: center; gap: 10px; text-align: left; font-family: var(--font-header);">
                <span style="font-size: 1.5rem;">${e.curse.icon}</span>
                <div style="display: flex; flex-direction: column;">
                  <span style="font-size: 0.95rem; font-weight: bold; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.5px;">${e.curse.name}</span>
                  <span style="font-size: 0.75rem; color: #ece0d8; opacity: 0.9; line-height: 1.3;">${e.curse.description}</span>
                </div>
              </div>
            `:``}
          `);let a=this.root.querySelector(`#turn-chips-value`);a&&(a.innerText=`${e.chipsPool} ⚡`);let o=this.root.querySelector(`#draw-pile-count`),s=this.root.querySelector(`#discard-pile-count`),l=this.root.querySelector(`#hand-count`);o&&(o.innerText=`${e.drawPile.length}`),s&&(s.innerText=`${e.discardPile.length}`),l&&(l.innerText=`${e.hand.length}`);let u=this.root.querySelector(`#draw-card-btn`);if(u){let t=this.engine.getDrawCardCost();u.innerText=`DRAW CARD (${t===0?`FREE`:`${t} ⚡`})`;let n=e.curse?.id===`choked`?5:8;u.disabled=!(e.chipsPool>=t&&e.phase===`betting`&&!this.isSpinning&&(e.drawPile.length>0||e.discardPile.length>0)&&e.hand.length<n&&this.currentView!==4)}let d=this.root.querySelector(`#mobile-draw-count`),f=this.root.querySelector(`#mobile-disc-count`);d&&(d.innerText=`${e.drawPile.length}`),f&&(f.innerText=`${e.discardPile.length}`);let p=this.root.querySelector(`#mobile-essence-val`);p&&(p.innerText=`${e.chipsPool} ⚡`);let m=this.root.querySelector(`.number-grid-container`);if(m&&e.playerWheel){let t=e.playerWheel,n=t.greenNumbers,r=t.numbers.filter(e=>!n.includes(e)).sort((e,t)=>e-t),i=e.predictionSector||[],a=e.boardModifiers.goldFoils||[],o=e.boardModifiers.copperPlates||[],s=``;n.forEach(e=>{let t=i.includes(e)?` predicted`:``,n=a.includes(e)?` gold-foil`:``,r=o.includes(e)?` copper-plate`:``;s+=`<div class="num-cell num-green${t}${n}${r}" data-num="${e}">${e}</div>`}),r.forEach(n=>{let r=c(n,t,e.boardModifiers),l=i.includes(n)?` predicted`:``,u=a.includes(n)?` gold-foil`:``,d=o.includes(n)?` copper-plate`:``;s+=`<div class="num-cell num-${r}${l}${u}${d}" data-num="${n}">${n}</div>`}),m.innerHTML=s,m.querySelectorAll(`.num-cell`).forEach(n=>{let r=parseInt(n.getAttribute(`data-num`)),i=c(r,t,e.boardModifiers),a=t.payoutMultipliers.number,o=i===`gold`?t.payoutMultipliers.gold||4:i===`purple`?t.payoutMultipliers.purple||4:i===`cyan`?t.payoutMultipliers.cyan||4:i===`crimson`?t.payoutMultipliers.crimson||6:i===`green`?t.payoutMultipliers.green:i===`red`?t.payoutMultipliers.red:t.payoutMultipliers.black;n.setAttribute(`title`,`Slot ${r}\nSingle Bet Payout: ${a}x\nColor Payout: ${o}x`),n.addEventListener(`click`,()=>{this.placeEngineBet(`number`,this.currentBetAmount,r)}),n.addEventListener(`contextmenu`,e=>{e.preventDefault(),this.sound.playCardSwoosh(),this.engine.subtractBet(`number`,this.currentBetAmount,r),this.render()}),n.addEventListener(`mouseenter`,()=>{let e=this.root.querySelector(`#board-hover-info`);e&&(e.innerText=`SLOT ${r}: ${i.toUpperCase()} | PAYOUTS: ${a}x SINGLE / ${o}x COLOR`,e.style.color=i===`red`?`#ef5350`:i===`crimson`?`#ff007f`:i===`black`?`#fff`:i===`green`?`#4caf50`:i===`gold`?`#ffd700`:i===`purple`?`#ce93d8`:`#80deea`)}),n.addEventListener(`mouseleave`,()=>{let e=this.root.querySelector(`#board-hover-info`);e&&(e.innerText=`HOVER A SLOT TO VIEW PAYOUTS`,e.style.color=`var(--color-gold)`)})})}if(e.playerWheel){let t=e.playerWheel,n=e.boardModifiers,r=t.payoutMultipliers,i=new Set,a=!1,o=!1,s=!1;for(let e of t.numbers)if(t.greenNumbers.includes(e))s=!0;else{let r=c(e,t,n);r&&i.add(r),e%2==0?o=!0:a=!0}let l=(e,t,n)=>{let r=this.root.querySelector(e);r&&(r.innerHTML=n,t?r.classList.remove(`hidden`):r.classList.add(`hidden`))};l(`.bet-red`,i.has(`red`),`RED (${r.red}x)`),l(`.bet-black`,i.has(`black`),`BLACK (${r.black}x)`),l(`.bet-green`,s,`GREEN (${r.green}x)`),l(`.bet-odd`,a,`ODD (${r.odd}x)`),l(`.bet-even`,o,`EVEN (${r.even}x)`),l(`.bet-gold`,i.has(`gold`),`GOLD (${r.gold||4}x)`),l(`.bet-purple`,i.has(`purple`),`PURPLE (${r.purple||4}x)`),l(`.bet-cyan`,i.has(`cyan`),`CYAN (${r.cyan||4}x)`),l(`.bet-crimson`,i.has(`crimson`),`CRIMSON (${r.crimson||6}x)`),this.root.querySelectorAll(`.bet-type-row`).forEach(e=>{let t=e.querySelectorAll(`.bet-btn`),n=0;t.forEach(e=>{e.classList.contains(`hidden`)||n++}),n===0?e.classList.add(`hidden`):e.classList.remove(`hidden`)})}let h=this.root.querySelector(`#placed-bets-list`);e.bets.length===0?h.innerHTML=`<span class="no-bets-text">No bets placed</span>`:(h.innerHTML=e.bets.map(t=>{let n=t.type.toUpperCase();if(t.type===`number`){let r=c(t.numberValue,e.playerWheel,e.boardModifiers);n=`NUMBER ${t.numberValue} (<span class="text-${r}">${r}</span>)`}return`
          <div class="active-bet-item" style="display: flex; justify-content: space-between; align-items: center; padding: 4px 8px; margin-bottom: 4px; background: rgba(255,255,255,0.03); border-radius: 4px;">
            <span>${n}: <span class="text-gold">${t.amount} ⚡</span></span>
            <button class="remove-bet-btn" data-type="${t.type}" ${t.numberValue===void 0?``:`data-num="${t.numberValue}"`} style="background: none; border: none; color: #ff5252; font-size: 14px; font-weight: bold; cursor: pointer; padding: 0 4px; display: inline-block;">×</button>
          </div>
        `}).join(``),h.querySelectorAll(`.remove-bet-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-type`),r=e.getAttribute(`data-num`),i=r===null?void 0:parseInt(r);this.sound.playCardSwoosh(),this.engine.removeBet(n,i),this.render()})}));let g=this.root.querySelector(`#spin-wheel-btn`);g&&(e.bets.length>0&&!this.isSpinning?(g.classList.remove(`disabled`),g.disabled=!1):(g.classList.add(`disabled`),g.disabled=!0));let _=this.root.querySelector(`#clear-bets-btn`);_&&(_.disabled=e.bets.length===0||this.isSpinning);let v=this.root.querySelector(`#rebet-btn`);v&&(v.disabled=!(e.backupBets&&e.backupBets.length>0)||e.bets.length>0||this.isSpinning);let y=this.root.querySelector(`#sacrifice-btn`);y&&(t.combatMode===`points`?(y.innerText=`SACRIFICE (10 pts -> 5 ⚡)`,y.disabled=(e.playerScore||0)<10||this.isSpinning):(y.innerText=`SACRIFICE (5 HP -> 5 ⚡)`,y.disabled=t.hp<=5||this.isSpinning));let b=this.root.querySelector(`#end-turn-btn`);b&&(this.showTurnEnd?(b.classList.remove(`hidden`),g&&g.classList.add(`hidden`)):(b.classList.add(`hidden`),g&&g.classList.remove(`hidden`)));let x=this.root.querySelector(`#spin-overlay`),S=this.root.querySelector(`#spin-text`);this.isSpinning||this.showTurnEnd?(x.classList.remove(`hidden`),S.innerHTML=this.spinMessage):x.classList.add(`hidden`),this.updateEnemyAIDecisionDev()}showCombatIntroOverlay(e){this.isCombatIntroActive=!0;let t=`Normal Combat`;e.encounterType===`boss`?t=`Boss Combat`:e.encounterType===`elite`&&(t=`Elite Combat`);let n=[],r=e.enemy.spriteName;n=r===`decay_wheel`?[`A creaking, rusted construct spins before you. The stench of dry rot and oil fills the air.`,`It rattles and spins, seeking to grind your bones into dust.`]:r===`croupier`?[`The dealer slides a decaying, skeletal hand across the felt. 'Place your bets, mortal...'`,`'The House always has another seat for a soul like yours...'`]:r===`wraith`?[`A crimson mist coalesces into a howling phantom. The table felt runs cold.`,`The smell of iron and copper rises. It hungers for your life-blood.`]:r===`dealer_claw`?[`A massive, mechanical hand made of gold and wire drops from the ceiling! 'Hand over your sanity, gambler!'`,`The gears grind. The Claw points at you. The stakes are raised!`]:r===`the_house`?[`The Tavern walls shake. The ceiling splits open. A giant, glowing red mask descends. 'I am the House, and I NEVER LOSE.'`,`A voice like grinding stone echoes: 'You broke my wheels... now I will break your skull.'`]:[`A dark presence looms before you. The air grows cold and thick.`,`The table is set. The stakes are your very soul.`];let i=n[Math.floor(Math.random()*n.length)],a=document.createElement(`div`);a.id=`combat-intro-overlay`;let o=`combat-intro-styles`;if(!document.getElementById(o)){let e=document.createElement(`style`);e.id=o,e.textContent=`
        #combat-intro-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(10, 5, 3, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          font-family: 'VT323', monospace;
          color: #c59f51;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
          animation: introFadeIn 0.4s ease-out forwards;
        }
        #combat-intro-overlay.fade-out {
          animation: introFadeOut 0.4s ease-in forwards;
        }
        .intro-content {
          max-width: 600px;
          transform: scale(0.8);
          animation: introScaleUp 0.4s ease-out forwards;
        }
        .intro-tier {
          font-size: 1.5rem;
          letter-spacing: 4px;
          color: #ff3333;
          text-transform: uppercase;
          margin-bottom: 10px;
          text-shadow: 0 0 10px rgba(255, 51, 51, 0.5);
        }
        .intro-name {
          font-size: 4rem;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 20px;
          letter-spacing: 2px;
          text-shadow: 0 0 20px rgba(197, 159, 81, 0.6);
        }
        .intro-quote {
          font-size: 1.6rem;
          line-height: 1.4;
          font-style: italic;
          color: #ece0d8;
          border-top: 1px solid rgba(197, 159, 81, 0.3);
          border-bottom: 1px solid rgba(197, 159, 81, 0.3);
          padding: 15px 0;
          margin-top: 20px;
        }
        @keyframes introFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes introFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes introScaleUp {
          from { transform: scale(0.8); }
          to { transform: scale(1); }
        }
      `,document.head.appendChild(e)}a.innerHTML=`
      <div class="intro-content">
        <div class="intro-tier">${t}</div>
        <div class="intro-name">${e.enemy.name}</div>
        <div class="intro-quote">"${i}"</div>
        <div style="font-size: 1.1rem; color: rgba(197, 159, 81, 0.7); margin-top: 25px; letter-spacing: 2px; text-transform: uppercase;">[ Click anywhere to continue ]</div>
      </div>
    `,document.body.appendChild(a),a.addEventListener(`click`,()=>{if(a.classList.add(`fade-out`),this.isCombatIntroActive=!1,this.renderer){let t=this.engine.getDrawCardCost(),n=e?e.chipsPool>=t&&e.phase===`betting`&&!this.isSpinning&&(e.drawPile.length>0||e.discardPile.length>0)&&e.hand.length<8:!1;e&&e.drawsThisTurn===0&&n?(this.renderer.manualView=9,this.renderer.hasFocusedDeckThisTurn=!0):this.renderer.manualView=1}setTimeout(()=>{a.remove()},400)})}calculateMoveEV(e,t){let n=t.chipsPool||0,r=t.turn||1;if(e.type===`attack`){let t=e.value||0,n=Math.max(.5,t);return n*=1+r*.08,parseFloat(n.toFixed(2))}else if(e.type===`steal_chips`){let i=e.value||0,a=Math.min(i,n)*1.5+1,o=t.maxRounds||3;return a*=1+Math.max(0,o-r)*.1,parseFloat(a.toFixed(2))}else if(e.type===`physics_debuff`){let e=4+n*.2+r*.4;return parseFloat(e.toFixed(2))}return 1}getEnemyPatterns(e){return e===`decay_wheel`?[{type:`attack`,value:4,description:`Spin slam (4 damage)`},{type:`physics_debuff`,value:0,description:`Rusting Gaze (Doubles friction next turn)`},{type:`attack`,value:8,description:`Heavy Slam (8 damage)`},{type:`attack`,value:5,description:`Grinding edge (5 damage)`}]:e===`croupier`?[{type:`steal_chips`,value:4,description:`Rake chips (Steals 4 chips)`},{type:`attack`,value:6,description:`Card slice (6 damage)`},{type:`attack`,value:8,description:`Cold gaze (8 damage)`},{type:`steal_chips`,value:3,description:`Taxation (Steals 3 chips)`}]:e===`wraith`?[{type:`attack`,value:5,description:`Shriek (5 damage)`},{type:`attack`,value:10,description:`Soul drain (10 damage)`},{type:`attack`,value:5,description:`Essence siphon (5 damage)`},{type:`attack`,value:12,description:`Nightmare strike (12 damage)`}]:e===`dealer_claw`?[{type:`attack`,value:9,description:`Crush (9 damage)`},{type:`steal_chips`,value:6,description:`Greedy clutch (Steals 6 chips)`},{type:`attack`,value:15,description:`Guillotine (15 damage)`},{type:`attack`,value:10,description:`Rend (10 damage)`}]:e===`the_house`?[{type:`attack`,value:12,description:`Roof collapse (12 damage)`},{type:`steal_chips`,value:8,description:`Bankruptcy (Steals 8 chips)`},{type:`attack`,value:20,description:`Crushing Debt (20 damage)`},{type:`physics_debuff`,value:0,description:`Earthquake (Doubles friction next turn)`}]:[{type:`attack`,value:5,description:`Slash (5 damage)`},{type:`attack`,value:7,description:`Gamble slash (7 damage)`},{type:`attack`,value:4,description:`Weak poke (4 damage)`},{type:`attack`,value:8,description:`Heavy smash (8 damage)`}]}updateEnemyAIDecisionDev(){let t=this.engine.battleState,n=this.root.querySelector(`#dev-enemy-decision-content`);if(!n)return;if(!t){n.innerHTML=`Active combat required.`;return}let r=t.enemy,i=this.engine.simulateEnemyPlay(),a=i.hand,o=i.allPlays,s=r.lastChosenPlay||o[0],c=[];r.spriteName===`wraith`?c.push(`crimson_double`,`dark_fury`,`attraction_coil`,`repulsion_coil`):r.spriteName===`croupier`?c.push(`green_greed`,`steel_barricade`,`scrap_shield`):r.spriteName===`decay_wheel`?c.push(`friction_oil`,`focus_sight`):r.isBoss?c.push(`crimson_double`,`dark_fury`,`green_greed`,`predictive_sight`,`eagle_eye`,`fortress_shield`):r.isElite?c.push(`predictive_sight`,`steel_barricade`,`attraction_coil`,`repulsion_coil`):c.push(`scrap_shield`,`focus_sight`);let l=c.map(t=>{let n=e[t];return n?n.name:t}),u=this.engine.battleState?.activeWheelOwner===`enemy`?this.engine.battleState.chipsPool:10,d=this.engine.battleState?.curse?.id===`greed`?5:10,f=``;f+=`<div style="margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.15); font-size: 10px; line-height: 1.4;">`,f+=`<div><strong>Enemy Name:</strong> ${r.name}</div>`,f+=`<div><strong>Available Chips:</strong> ${u} 🪙</div>`,f+=`<div><strong>Chips per Turn:</strong> ${d} 🪙</div>`,f+=`<div><strong>Deck Pool:</strong> ${l.join(`, `)}</div>`,f+=`</div>`,f+=`<div style="margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.15);">`,f+=`<strong>Simulated Hand:</strong> `,!a||a.length===0?f+=`<span style="color: #888; font-style: italic;">No cards</span>`:f+=a.map(e=>`<span class="dev-card-badge" style="background: #3e2723; padding: 2px 5px; border-radius: 3px; font-size: 10px; color: #ffca28; margin-right: 4px;">${e.name}</span>`).join(` `),f+=`</div>`,f+=`<div style="margin-bottom: 6px;"><strong>Potential Placements & EV (Top 6):</strong></div>`,f+=`<div style="display: flex; flex-direction: column; gap: 4px; max-height: 120px; overflow-y: auto; padding-right: 4px; margin-bottom: 8px;">`,o.slice(0,6).forEach(e=>{let t=e.card?e.card.name:`None`,n=e.betType.toUpperCase();e.betType===`number`&&(n=`Number ${e.numberValue}`);let r=`padding: 3px 6px; border-radius: 3px; background: rgba(255,255,255,0.03); font-size: 10px;`,i=``;s&&s.card===e.card&&s.betType===e.betType&&s.numberValue===e.numberValue&&(r=`padding: 3px 6px; border-radius: 3px; background: rgba(100, 221, 23, 0.1); border-left: 2px solid #64dd17;`,i=` <span style="color: #64dd17; font-weight: bold;">[SELECTED]</span>`),f+=`
        <div style="${r}">
          <div><strong>Play:</strong> ${t} + ${n} ${i}</div>
          <div style="color: #ffaa00; margin-top: 1px;">EV Score: <span style="color: #fff; font-weight: bold;">${e.score.toFixed(2)}</span></div>
        </div>
      `}),f+=`</div>`,f+=`<div style="padding-top: 6px; border-top: 1px dashed rgba(255,255,255,0.15);">`,f+=`<strong>Intent Pattern Loop:</strong>`;let p=this.getEnemyPatterns(r.spriteName),m=r.patternIndex,h=(m-1+4)%4;f+=`<div style="margin-top: 4px; display: flex; flex-direction: column; gap: 3px;">`,p.forEach((e,n)=>{let r=this.calculateMoveEV(e,t),i=``,a=`font-size: 10px;`;n===m?(i=` <span style="color: #64dd17; font-weight: bold;">[ACTIVE]</span>`,a+=` border-left: 2px solid #64dd17; padding-left: 4px; background: rgba(100, 221, 23, 0.05);`):n===h&&(i=` <span style="color: #ffaa00;">[PREV]</span>`,a+=` border-left: 2px solid #ffaa00; padding-left: 4px; background: rgba(255, 170, 0, 0.05);`),f+=`
        <div style="${a}">
          <strong>Move ${n+1}:</strong> ${e.description} ${i}
          <span style="color: #ffaa00; margin-left: 6px;">EV: ${r}</span>
        </div>
      `}),f+=`</div></div>`,n.innerHTML=f}updateSoundVisualizerDev(){let e=this.root.querySelector(`#dev-sound-visualizer-content`);if(!e)return;let t=this.root.querySelector(`#dev-tools-panel`);if(!t||t.classList.contains(`hidden`))return;let n=this.sound.getAudioDiagnostics(),r=e=>{let t=Math.round(e*10);return`[`+`=`.repeat(Math.max(0,Math.min(10,t)))+` `.repeat(Math.max(0,Math.min(10,10-t)))+`]`},i=`<div><strong>MUSIC TYPE:</strong> ${n.currentMusicType?n.currentMusicType.toUpperCase():`STOPPED`}</div>`;if(n.isTitleMusicPlaying){i+=`<div style="margin-top: 4px;"><strong>TITLE STEMS STATE:</strong></div>`,i+=`<div>Loop Count: ${n.titleLoopCount}</div>`,i+=`<div>Active Level: ${n.titleActiveLevel} / 4</div>`,i+=`<div>Direction: ${n.titleLayersDirection.toUpperCase()}</div>`,i+=`<div style="margin-top: 4px;"><strong>STEM VOLUMES:</strong></div>`;let e=[`Bass/Groove`,`Synth Pads`,`Percussion`,`Melody Lead`];for(let t=0;t<4;t++){let a=n.layerVolumes[t]||0,o=n.masterMusicVolume>0?a/n.masterMusicVolume:0,s=Math.round(o*100);i+=`<div style="font-size: 10px;">L${t+1} (${e[t]}): ${r(o)} ${s}%</div>`}}else i+=`<div style="margin-top: 4px; color: #888;">Title stems not playing.</div>`;i+=`<div style="margin-top: 6px; padding-top: 4px; border-top: 1px dashed rgba(255,255,255,0.15);"><strong>MASTER VOLUMES:</strong></div>`,i+=`<div style="font-size: 10px;">Music: ${r(n.masterMusicVolume)} ${Math.round(n.masterMusicVolume*100)}%</div>`,i+=`<div style="font-size: 10px;">Drone: ${r(n.masterDroneVolume)} ${Math.round(n.masterDroneVolume*100)}%</div>`,i+=`<div style="font-size: 10px;">SFX:   ${r(n.masterSfxVolume)} ${Math.round(n.masterSfxVolume*100)}%</div>`,e.innerHTML=i}showCodex(){let e=this.root.querySelector(`#codex-panel`),t=this.root.querySelector(`#codex-grid`);if(!e||!t)return;let n=ne.getAllCardTemplates(),i={legendary:0,rare:1,uncommon:2,common:3};if(n.sort((e,t)=>{let n=i[e.rarity]-i[t.rarity];if(n!==0)return n;let r=e.cost-t.cost;return r===0?e.name.localeCompare(t.name):r}),this.codexRarityFilter!==`all`&&(n=n.filter(e=>e.rarity===this.codexRarityFilter)),this.codexTypeFilter!==`all`&&(n=n.filter(e=>e.type===this.codexTypeFilter)),n.length===0){t.innerHTML=`<div class="codex-empty-message">No cards found matching the selected filters.</div>`;return}let a=this.engine.runState.combatMode===`points`;t.innerHTML=n.map(e=>`
        <div class="codex-card ${`codex-card-rarity-${e.rarity}`} ${e.type===`paint`?`paint-card`:``} ${e.type===`money`?`money-card`:``}">
          <div class="codex-card-header">
            <span class="codex-card-name">${e.name}</span>
            <span class="codex-card-cost">${e.cost} ⚡</span>
          </div>
          <div class="codex-card-desc">${r(e.description,a)}</div>
          <div class="codex-card-meta">
            <span>${e.type}</span>
            <span>${e.rarity}</span>
          </div>
        </div>
      `).join(``),e.classList.remove(`hidden`)}},ae=1e3,oe=1001,se=1002,M=1003,ce=1004,le=1005,N=1006,ue=1007,de=1008,fe=1009,pe=1010,me=1011,he=1012,ge=1013,_e=1014,ve=1015,ye=1016,be=1017,xe=1018,Se=1020,Ce=35902,we=35899,Te=1021,Ee=1022,De=1023,Oe=1026,P=1027,ke=1028,Ae=1029,F=1030,je=1031,Me=1033,Ne=33776,I=33777,Pe=33778,L=33779,R=35840,Fe=35841,Ie=35842,Le=35843,Re=36196,ze=37492,Be=37496,Ve=37488,He=37489,Ue=37490,We=37491,Ge=37808,Ke=37809,qe=37810,Je=37811,Ye=37812,Xe=37813,Ze=37814,Qe=37815,$e=37816,et=37817,tt=37818,nt=37819,rt=37820,it=37821,at=36492,ot=36494,st=36495,ct=36283,lt=36284,ut=36285,dt=36286,ft=2300,pt=2301,mt=2302,ht=2303,gt=2400,_t=2401,vt=2402,yt=3200,bt=`srgb`,xt=`srgb-linear`,St=`linear`,Ct=`srgb`,wt=7680,Tt=35044,Et=2e3;function Dt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ot(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function kt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function At(){let e=kt(`canvas`);return e.style.display=`block`,e}var jt={},Mt=null;function Nt(...e){let t=`THREE.`+e.shift();Mt?Mt(`log`,t,...e):console.log(t,...e)}function Pt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=Pt(e);let t=`THREE.`+e.shift();if(Mt)Mt(`warn`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=Pt(e);let t=`THREE.`+e.shift();if(Mt)Mt(`error`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ft(...e){let t=e.join(` `);t in jt||(jt[t]=!0,z(...e))}function It(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Lt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Rt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},zt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Bt=Math.PI/180,Vt=180/Math.PI;function Ht(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(zt[e&255]+zt[e>>8&255]+zt[e>>16&255]+zt[e>>24&255]+`-`+zt[t&255]+zt[t>>8&255]+`-`+zt[t>>16&15|64]+zt[t>>24&255]+`-`+zt[n&63|128]+zt[n>>8&255]+`-`+zt[n>>16&255]+zt[n>>24&255]+zt[r&255]+zt[r>>8&255]+zt[r>>16&255]+zt[r>>24&255]).toLowerCase()}function V(e,t,n){return Math.max(t,Math.min(n,e))}function Ut(e,t){return(e%t+t)%t}function Wt(e,t,n){return(1-n)*e+n*t}function Gt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function H(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var U=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Kt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(V(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qt.copy(this).projectOnVector(e),this.sub(qt)}reflect(e){return this.sub(qt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},qt=new W,Jt=new Kt,G=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Yt.makeScale(e,t)),this}rotate(e){return this.premultiply(Yt.makeRotation(-e)),this}translate(e,t){return this.premultiply(Yt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Yt=new G,Xt=new G().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zt=new G().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Qt(){let e={enabled:!0,workingColorSpace:xt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=$t(e.r),e.g=$t(e.g),e.b=$t(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=en(e.r),e.g=en(e.g),e.b=en(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?St:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ft(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ft(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[xt]:{primaries:t,whitePoint:r,transfer:St,toXYZ:Xt,fromXYZ:Zt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:bt},outputColorSpaceConfig:{drawingBufferColorSpace:bt}},[bt]:{primaries:t,whitePoint:r,transfer:Ct,toXYZ:Xt,fromXYZ:Zt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:bt}}}),e}var K=Qt();function $t(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function en(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var tn,nn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{tn===void 0&&(tn=kt(`canvas`)),tn.width=e.width,tn.height=e.height;let t=tn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=tn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=kt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=$t(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor($t(t[e]/255)*255):t[e]=$t(t[e]);return{data:t,width:e.width,height:e.height}}else return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},rn=0,an=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rn++}),this.uuid=Ht(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(on(r[t].image)):e.push(on(r[t]))}else e=on(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function on(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?nn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var sn=0,cn=new W,ln=class e extends Rt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=oe,i=oe,a=N,o=de,s=De,c=fe,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sn++}),this.uuid=Ht(),this.name=``,this.source=new an(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new U(0,0),this.repeat=new U(1,1),this.center=new U(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new G,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(cn).x}get height(){return this.source.getSize(cn).y}get depth(){return this.source.getSize(cn).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ae:e.x-=Math.floor(e.x);break;case oe:e.x=e.x<0?0:1;break;case se:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ae:e.y-=Math.floor(e.y);break;case oe:e.y=e.y<0?0:1;break;case se:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ln.DEFAULT_IMAGE=null,ln.DEFAULT_MAPPING=300,ln.DEFAULT_ANISOTROPY=1;var un=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this.w=V(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this.w=V(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},dn=class extends Rt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:N,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new un(0,0,e,t),this.scissorTest=!1,this.viewport=new un(0,0,e,t),this.textures=[];let r=new ln({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:N,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new an(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:`dispose`})}},fn=class extends dn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},pn=class extends ln{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=M,this.minFilter=M,this.wrapR=oe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},mn=class extends ln{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=M,this.minFilter=M,this.wrapR=oe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},hn=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,r=1/gn.setFromMatrixColumn(e,0).length(),i=1/gn.setFromMatrixColumn(e,1).length(),a=1/gn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vn,e,yn)}lookAt(e,t,n){let r=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),bn.crossVectors(n,Sn),bn.lengthSq()===0&&(Math.abs(n.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),bn.crossVectors(n,Sn)),bn.normalize(),xn.crossVectors(Sn,bn),r[0]=bn.x,r[4]=xn.x,r[8]=Sn.x,r[1]=bn.y,r[5]=xn.y,r[9]=Sn.y,r[2]=bn.z,r[6]=xn.z,r[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],j=r[3],ne=r[7],re=r[11],ie=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*A+c*ne,i[8]=a*C+o*D+s*ee+c*re,i[12]=a*w+o*O+s*te+c*ie,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*A+f*ne,i[9]=l*C+u*D+d*ee+f*re,i[13]=l*w+u*O+d*te+f*ie,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*A+g*ne,i[10]=p*C+m*D+h*ee+g*re,i[14]=p*w+m*O+h*te+g*ie,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*A+b*ne,i[11]=_*C+v*D+y*ee+b*re,i[15]=_*w+v*O+y*te+b*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinant();if(i===0)return n.set(1,1,1),t.identity(),this;let a=gn.set(r[0],r[1],r[2]).length(),o=gn.set(r[4],r[5],r[6]).length(),s=gn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),_n.copy(this);let c=1/a,l=1/o,u=1/s;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=l,_n.elements[5]*=l,_n.elements[6]*=l,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Et,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Et,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},gn=new W,_n=new hn,vn=new W(0,0,0),yn=new W(1,1,1),bn=new W,xn=new W,Sn=new W,Cn=new hn,wn=new Kt,Tn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(V(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-V(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(V(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-V(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(V(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-V(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Cn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wn.setFromEuler(this),this.setFromQuaternion(wn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Tn.DEFAULT_ORDER=`XYZ`;var En=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},Dn=0,On=new W,kn=new Kt,An=new hn,jn=new W,Mn=new W,Nn=new W,Pn=new Kt,Fn=new W(1,0,0),In=new W(0,1,0),Ln=new W(0,0,1),Rn={type:`added`},zn={type:`removed`},Bn={type:`childadded`,child:null},Vn={type:`childremoved`,child:null},Hn=class e extends Rt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dn++}),this.uuid=Ht(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new Tn,r=new Kt,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new hn},normalMatrix:{value:new G}}),this.matrix=new hn,this.matrixWorld=new hn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new En,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return kn.setFromAxisAngle(e,t),this.quaternion.multiply(kn),this}rotateOnWorldAxis(e,t){return kn.setFromAxisAngle(e,t),this.quaternion.premultiply(kn),this}rotateX(e){return this.rotateOnAxis(Fn,e)}rotateY(e){return this.rotateOnAxis(In,e)}rotateZ(e){return this.rotateOnAxis(Ln,e)}translateOnAxis(e,t){return On.copy(e).applyQuaternion(this.quaternion),this.position.add(On.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Fn,e)}translateY(e){return this.translateOnAxis(In,e)}translateZ(e){return this.translateOnAxis(Ln,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?jn.copy(e):jn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Mn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(Mn,jn,this.up):An.lookAt(jn,Mn,this.up),this.quaternion.setFromRotationMatrix(An),r&&(An.extractRotation(r.matrixWorld),kn.setFromRotationMatrix(An),this.quaternion.premultiply(kn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rn),Bn.child=e,this.dispatchEvent(Bn),Bn.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(zn),Vn.child=e,this.dispatchEvent(Vn),Vn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),An.multiply(e.parent.matrixWorld)),e.applyMatrix4(An),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rn),Bn.child=e,this.dispatchEvent(Bn),Bn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mn,e,Nn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mn,Pn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Hn.DEFAULT_UP=new W(0,1,0),Hn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Un=class extends Hn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Wn={type:`move`},Gn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Un;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Kn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},Jn={h:0,s:0,l:0};function Yn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,K.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=K.workingColorSpace){return this.r=e,this.g=t,this.b=n,K.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=K.workingColorSpace){if(e=Ut(e,1),t=V(t,0,1),n=V(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Yn(i,r,e+1/3),this.g=Yn(i,r,e),this.b=Yn(i,r,e-1/3)}return K.colorSpaceToWorking(this,r),this}setStyle(e,t=bt){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){let n=Kn[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$t(e.r),this.g=$t(e.g),this.b=$t(e.b),this}copyLinearToSRGB(e){return this.r=en(e.r),this.g=en(e.g),this.b=en(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return K.workingToColorSpace(Xn.copy(this),e),Math.round(V(Xn.r*255,0,255))*65536+Math.round(V(Xn.g*255,0,255))*256+Math.round(V(Xn.b*255,0,255))}getHexString(e=bt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=K.workingColorSpace){K.workingToColorSpace(Xn.copy(this),t);let n=Xn.r,r=Xn.g,i=Xn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=K.workingColorSpace){return K.workingToColorSpace(Xn.copy(this),t),e.r=Xn.r,e.g=Xn.g,e.b=Xn.b,e}getStyle(e=bt){K.workingToColorSpace(Xn.copy(this),e);let t=Xn.r,n=Xn.g,r=Xn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(qn),this.setHSL(qn.h+e,qn.s+t,qn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qn),e.getHSL(Jn);let n=Wt(qn.h,Jn.h,t),r=Wt(qn.s,Jn.s,t),i=Wt(qn.l,Jn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Xn=new q;q.NAMES=Kn;var Zn=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new q(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Qn=class extends Hn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},$n=new W,er=new W,tr=new W,nr=new W,rr=new W,ir=new W,ar=new W,or=new W,sr=new W,cr=new W,lr=new un,ur=new un,dr=new un,fr=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),$n.subVectors(e,t),r.cross($n);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){$n.subVectors(r,t),er.subVectors(n,t),tr.subVectors(e,t);let a=$n.dot($n),o=$n.dot(er),s=$n.dot(tr),c=er.dot(er),l=er.dot(tr),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,nr)===null?!1:nr.x>=0&&nr.y>=0&&nr.x+nr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,nr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,nr.x),s.addScaledVector(a,nr.y),s.addScaledVector(o,nr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return lr.setScalar(0),ur.setScalar(0),dr.setScalar(0),lr.fromBufferAttribute(e,t),ur.fromBufferAttribute(e,n),dr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(lr,i.x),a.addScaledVector(ur,i.y),a.addScaledVector(dr,i.z),a}static isFrontFacing(e,t,n,r){return $n.subVectors(n,t),er.subVectors(e,t),$n.cross(er).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $n.subVectors(this.c,this.b),er.subVectors(this.a,this.b),$n.cross(er).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;rr.subVectors(r,n),ir.subVectors(i,n),or.subVectors(e,n);let s=rr.dot(or),c=ir.dot(or);if(s<=0&&c<=0)return t.copy(n);sr.subVectors(e,r);let l=rr.dot(sr),u=ir.dot(sr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(rr,a);cr.subVectors(e,i);let f=rr.dot(cr),p=ir.dot(cr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(ir,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return ar.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(ar,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(rr,a).addScaledVector(ir,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},pr=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=hr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,hr):hr.fromBufferAttribute(r,t),hr.applyMatrix4(e.matrixWorld),this.expandByPoint(hr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),gr.copy(e.boundingBox)),gr.applyMatrix4(e.matrixWorld),this.union(gr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hr),hr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cr),wr.subVectors(this.max,Cr),_r.subVectors(e.a,Cr),vr.subVectors(e.b,Cr),yr.subVectors(e.c,Cr),br.subVectors(vr,_r),xr.subVectors(yr,vr),Sr.subVectors(_r,yr);let t=[0,-br.z,br.y,0,-xr.z,xr.y,0,-Sr.z,Sr.y,br.z,0,-br.x,xr.z,0,-xr.x,Sr.z,0,-Sr.x,-br.y,br.x,0,-xr.y,xr.x,0,-Sr.y,Sr.x,0];return!Dr(t,_r,vr,yr,wr)||(t=[1,0,0,0,1,0,0,0,1],!Dr(t,_r,vr,yr,wr))?!1:(Tr.crossVectors(br,xr),t=[Tr.x,Tr.y,Tr.z],Dr(t,_r,vr,yr,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},mr=[new W,new W,new W,new W,new W,new W,new W,new W],hr=new W,gr=new pr,_r=new W,vr=new W,yr=new W,br=new W,xr=new W,Sr=new W,Cr=new W,wr=new W,Tr=new W,Er=new W;function Dr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Er.fromArray(e,a);let o=i.x*Math.abs(Er.x)+i.y*Math.abs(Er.y)+i.z*Math.abs(Er.z),s=t.dot(Er),c=n.dot(Er),l=r.dot(Er);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Or=new W,kr=new U,Ar=0,jr=class extends Rt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ar++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Tt,this.updateRanges=[],this.gpuType=ve,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)kr.fromBufferAttribute(this,t),kr.applyMatrix3(e),this.setXY(t,kr.x,kr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyMatrix3(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyMatrix4(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyNormalMatrix(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.transformDirection(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Gt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=H(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Gt(t,this.array)),t}setX(e,t){return this.normalized&&(t=H(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Gt(t,this.array)),t}setY(e,t){return this.normalized&&(t=H(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Gt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=H(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Gt(t,this.array)),t}setW(e,t){return this.normalized&&(t=H(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=H(t,this.array),n=H(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=H(t,this.array),n=H(n,this.array),r=H(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=H(t,this.array),n=H(n,this.array),r=H(r,this.array),i=H(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},Mr=class extends jr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Nr=class extends jr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Pr=class extends jr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Fr=new pr,Ir=new W,Lr=new W,Rr=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Fr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ir.subVectors(e,this.center);let t=Ir.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Ir,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ir.copy(e.center).add(Lr)),this.expandByPoint(Ir.copy(e.center).sub(Lr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},zr=0,Br=new hn,Vr=new Hn,Hr=new W,Ur=new pr,Wr=new pr,Gr=new W,Kr=class e extends Rt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zr++}),this.uuid=Ht(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dt(e)?Nr:Mr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new G().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Br.makeRotationFromQuaternion(e),this.applyMatrix4(Br),this}rotateX(e){return Br.makeRotationX(e),this.applyMatrix4(Br),this}rotateY(e){return Br.makeRotationY(e),this.applyMatrix4(Br),this}rotateZ(e){return Br.makeRotationZ(e),this.applyMatrix4(Br),this}translate(e,t,n){return Br.makeTranslation(e,t,n),this.applyMatrix4(Br),this}scale(e,t,n){return Br.makeScale(e,t,n),this.applyMatrix4(Br),this}lookAt(e){return Vr.lookAt(e),Vr.updateMatrix(),this.applyMatrix4(Vr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hr).negate(),this.translate(Hr.x,Hr.y,Hr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Pr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ur.setFromBufferAttribute(n),this.morphTargetsRelative?(Gr.addVectors(this.boundingBox.min,Ur.min),this.boundingBox.expandByPoint(Gr),Gr.addVectors(this.boundingBox.max,Ur.max),this.boundingBox.expandByPoint(Gr)):(this.boundingBox.expandByPoint(Ur.min),this.boundingBox.expandByPoint(Ur.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new W,1/0);return}if(e){let n=this.boundingSphere.center;if(Ur.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Wr.setFromBufferAttribute(n),this.morphTargetsRelative?(Gr.addVectors(Ur.min,Wr.min),Ur.expandByPoint(Gr),Gr.addVectors(Ur.max,Wr.max),Ur.expandByPoint(Gr)):(Ur.expandByPoint(Wr.min),Ur.expandByPoint(Wr.max))}Ur.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Gr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Gr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Gr.fromBufferAttribute(a,t),o&&(Hr.fromBufferAttribute(e,t),Gr.add(Hr)),r=Math.max(r,n.distanceToSquared(Gr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new jr(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new W,s[e]=new W;let c=new W,l=new W,u=new W,d=new U,f=new U,p=new U,m=new W,h=new W;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new W,y=new W,b=new W,x=new W;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new jr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gr.fromBufferAttribute(e,t),Gr.normalize(),e.setXYZ(t,Gr.x,Gr.y,Gr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new jr(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},qr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Tt,this.updateRanges=[],this.version=0,this.uuid=Ht()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ht()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ht()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Jr=new W,Yr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Jr.fromBufferAttribute(this,t),Jr.applyMatrix4(e),this.setXYZ(t,Jr.x,Jr.y,Jr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jr.fromBufferAttribute(this,t),Jr.applyNormalMatrix(e),this.setXYZ(t,Jr.x,Jr.y,Jr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jr.fromBufferAttribute(this,t),Jr.transformDirection(e),this.setXYZ(t,Jr.x,Jr.y,Jr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Gt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=H(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=H(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=H(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=H(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=H(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Gt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Gt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Gt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Gt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=H(t,this.array),n=H(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=H(t,this.array),n=H(n,this.array),r=H(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=H(t,this.array),n=H(n,this.array),r=H(r,this.array),i=H(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Nt(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new jr(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Nt(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Xr=0,Zr=class extends Rt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xr++}),this.uuid=Ht(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wt,this.stencilZFail=wt,this.stencilZPass=wt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Qr=class extends Zr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$r,ei=new W,ti=new W,ni=new W,ri=new U,ii=new U,ai=new hn,oi=new W,si=new W,ci=new W,li=new U,ui=new U,di=new U,fi=class extends Hn{constructor(e=new Qr){if(super(),this.isSprite=!0,this.type=`Sprite`,$r===void 0){$r=new Kr;let e=new qr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);$r.setIndex([0,1,2,0,2,3]),$r.setAttribute(`position`,new Yr(e,3,0,!1)),$r.setAttribute(`uv`,new Yr(e,2,3,!1))}this.geometry=$r,this.material=e,this.center=new U(.5,.5),this.count=1}raycast(e,t){e.camera===null&&B(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),ti.setFromMatrixScale(this.matrixWorld),ai.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ni.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ti.multiplyScalar(-ni.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;pi(oi.set(-.5,-.5,0),ni,a,ti,r,i),pi(si.set(.5,-.5,0),ni,a,ti,r,i),pi(ci.set(.5,.5,0),ni,a,ti,r,i),li.set(0,0),ui.set(1,0),di.set(1,1);let o=e.ray.intersectTriangle(oi,si,ci,!1,ei);if(o===null&&(pi(si.set(-.5,.5,0),ni,a,ti,r,i),ui.set(0,1),o=e.ray.intersectTriangle(oi,ci,si,!1,ei),o===null))return;let s=e.ray.origin.distanceTo(ei);s<e.near||s>e.far||t.push({distance:s,point:ei.clone(),uv:fr.getInterpolation(ei,oi,si,ci,li,ui,di,new U),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function pi(e,t,n,r,i,a){ri.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?ii.copy(ri):(ii.x=a*ri.x-i*ri.y,ii.y=i*ri.x+a*ri.y),e.copy(t),e.x+=ii.x,e.y+=ii.y,e.applyMatrix4(ai)}var mi=new W,hi=new W,gi=new W,_i=new W,vi=new W,yi=new W,bi=new W,xi=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mi.copy(this.origin).addScaledVector(this.direction,t),mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){hi.copy(e).add(t).multiplyScalar(.5),gi.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(hi);let i=e.distanceTo(t)*.5,a=-this.direction.dot(gi),o=_i.dot(this.direction),s=-_i.dot(gi),c=_i.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(hi).addScaledVector(gi,d),f}intersectSphere(e,t){mi.subVectors(e.center,this.origin);let n=mi.dot(this.direction),r=mi.dot(mi)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,mi)!==null}intersectTriangle(e,t,n,r,i){vi.subVectors(t,e),yi.subVectors(n,e),bi.crossVectors(vi,yi);let a=this.direction.dot(bi),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_i.subVectors(this.origin,e);let s=o*this.direction.dot(yi.crossVectors(_i,yi));if(s<0)return null;let c=o*this.direction.dot(vi.cross(_i));if(c<0||s+c>a)return null;let l=-o*_i.dot(bi);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},J=class extends Zr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Si=new hn,Ci=new xi,wi=new Rr,Ti=new W,Ei=new W,Di=new W,Oi=new W,ki=new W,Ai=new W,ji=new W,Mi=new W,Y=class extends Hn{constructor(e=new Kr,t=new J){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Ai.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ki.fromBufferAttribute(s,e),a?Ai.addScaledVector(ki,r):Ai.addScaledVector(ki.sub(t),r))}t.add(Ai)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wi.copy(n.boundingSphere),wi.applyMatrix4(i),Ci.copy(e.ray).recast(e.near),!(wi.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(wi,Ti)===null||Ci.origin.distanceToSquared(Ti)>(e.far-e.near)**2))&&(Si.copy(i).invert(),Ci.copy(e.ray).applyMatrix4(Si),!(n.boundingBox!==null&&Ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ci)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Pi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Pi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Pi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Pi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function Ni(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Mi.copy(s),Mi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Mi);return l<n.near||l>n.far?null:{distance:l,point:Mi.clone(),object:e}}function Pi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ei),e.getVertexPosition(c,Di),e.getVertexPosition(l,Oi);let u=Ni(e,t,n,r,Ei,Di,Oi,ji);if(u){let e=new W;fr.getBarycoord(ji,Ei,Di,Oi,e),i&&(u.uv=fr.getInterpolatedAttribute(i,s,c,l,e,new U)),a&&(u.uv1=fr.getInterpolatedAttribute(a,s,c,l,e,new U)),o&&(u.normal=fr.getInterpolatedAttribute(o,s,c,l,e,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new W,materialIndex:0};fr.getNormal(Ei,Di,Oi,t.normal),u.face=t,u.barycoord=e}return u}var Fi=class extends ln{constructor(e=null,t=1,n=1,r,i,a,o,s,c=M,l=M,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ii=new W,Li=new W,Ri=new G,zi=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ii.subVectors(n,t).cross(Li.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ii),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ri.getNormalMatrix(e),r=this.coplanarPoint(Ii).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bi=new Rr,Vi=new U(.5,.5),Hi=new W,Ui=class{constructor(e=new zi,t=new zi,n=new zi,r=new zi,i=new zi,a=new zi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Et,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){return Bi.center.set(0,0,0),Bi.radius=.7071067811865476+Vi.distanceTo(e.center),Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Hi.x=r.normal.x>0?e.max.x:e.min.x,Hi.y=r.normal.y>0?e.max.y:e.min.y,Hi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Hi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Wi=class extends Zr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Gi=new hn,Ki=new xi,qi=new Rr,Ji=new W,Yi=class extends Hn{constructor(e=new Kr,t=new Wi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qi.copy(n.boundingSphere),qi.applyMatrix4(r),qi.radius+=i,e.ray.intersectsSphere(qi)===!1)return;Gi.copy(r).invert(),Ki.copy(e.ray).applyMatrix4(Gi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ji.fromBufferAttribute(l,n),Xi(Ji,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ji.fromBufferAttribute(l,a),Xi(Ji,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Xi(e,t,n,r,i,a,o){let s=Ki.distanceSqToPoint(e);if(s<n){let n=new W;Ki.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Zi=class extends ln{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Qi=class extends ln{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},$i=class extends ln{constructor(e,t,n=_e,r,i,a,o=M,s=M,c,l=Oe,u=1){if(l!==1026&&l!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new an(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ea=class extends $i{constructor(e,t=_e,n=301,r,i,a=M,o=M,s,c=Oe){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ta=class extends ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},na=class e extends Kr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Pr(c,3)),this.setAttribute(`normal`,new Pr(l,3)),this.setAttribute(`uv`,new Pr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ra=class e extends Kr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new W,l=new U;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Pr(a,3)),this.setAttribute(`normal`,new Pr(o,3)),this.setAttribute(`uv`,new Pr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},X=class e extends Kr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Pr(u,3)),this.setAttribute(`normal`,new Pr(d,3)),this.setAttribute(`uv`,new Pr(f,2));function _(){let a=new W,_=new W,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new U,m=new W,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ia=class e extends X{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},aa=class e extends Kr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Pr(i,3)),this.setAttribute(`normal`,new Pr(i.slice(),3)),this.setAttribute(`uv`,new Pr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new W,r=new W,i=new W;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new W;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new W;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new W,t=new W,n=new W,r=new W,o=new U,s=new U,c=new U;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},oa=class e extends aa{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},sa=class e extends Kr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Pr(p,3)),this.setAttribute(`normal`,new Pr(m,3)),this.setAttribute(`uv`,new Pr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ca=class e extends Kr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new W,p=new U;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Pr(s,3)),this.setAttribute(`normal`,new Pr(c,3)),this.setAttribute(`uv`,new Pr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},la=class e extends Kr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new W,d=new W,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=0;f===0&&a===0?v=.5/t:f===n&&s===Math.PI&&(v=-.5/t);for(let n=0;n<=t;n++){let s=n/t;u.x=-e*Math.cos(r+s*i)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(r+s*i)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(s+v,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Pr(p,3)),this.setAttribute(`normal`,new Pr(m,3)),this.setAttribute(`uv`,new Pr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},ua=class e extends Kr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new W,f=new W,p=new W;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Pr(c,3)),this.setAttribute(`normal`,new Pr(l,3)),this.setAttribute(`uv`,new Pr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};function da(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(pa(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i))if(pa(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice();else t[n][r]=i}}return t}function fa(e){let t={};for(let n=0;n<e.length;n++){let r=da(e[n]);for(let e in r)t[e]=r[e]}return t}function pa(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function ma(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ha(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:K.workingColorSpace}var ga={clone:da,merge:fa},_a=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,va=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ya=class extends Zr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_a,this.fragmentShader=va,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=da(e.uniforms),this.uniformsGroups=ma(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},ba=class extends ya{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},xa=class extends Zr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new q(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Z=class extends Zr{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type=`MeshPhongMaterial`,this.color=new q(16777215),this.specular=new q(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Sa=class extends Zr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ca=class extends Zr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=yt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},wa=class extends Zr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ta(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var Ea=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},Da=class extends Ea{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:gt,endingEnd:gt}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case _t:i=e,o=2*t-n;break;case vt:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case _t:a=e,s=2*n-t;break;case vt:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Oa=class extends Ea{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},ka=class extends Ea{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Aa=class extends Ea{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.settings||this.DefaultSettings_,u=l.inTangents,d=l.outTangents;if(!u||!d){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let f=o*2,p=e-1;for(let l=0;l!==o;++l){let o=a[c+l],m=a[s+l],h=p*f+l*2,g=d[h],_=d[h+1],v=e*f+l*2,y=u[v],b=u[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[l]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},ja=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ta(t,this.TimeBufferType),this.values=Ta(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ta(e.times,Array),values:Ta(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ka(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Oa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Aa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case ft:t=this.InterpolantFactoryMethodDiscrete;break;case pt:t=this.InterpolantFactoryMethodLinear;break;case mt:t=this.InterpolantFactoryMethodSmooth;break;case ht:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ft;case this.InterpolantFactoryMethodLinear:return pt;case this.InterpolantFactoryMethodSmooth:return mt;case this.InterpolantFactoryMethodBezier:return ht}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ot(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===mt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};ja.prototype.ValueTypeName=``,ja.prototype.TimeBufferType=Float32Array,ja.prototype.ValueBufferType=Float32Array,ja.prototype.DefaultInterpolation=pt;var Ma=class extends ja{constructor(e,t,n){super(e,t,n)}};Ma.prototype.ValueTypeName=`bool`,Ma.prototype.ValueBufferType=Array,Ma.prototype.DefaultInterpolation=ft,Ma.prototype.InterpolantFactoryMethodLinear=void 0,Ma.prototype.InterpolantFactoryMethodSmooth=void 0;var Na=class extends ja{constructor(e,t,n,r){super(e,t,n,r)}};Na.prototype.ValueTypeName=`color`;var Pa=class extends ja{constructor(e,t,n,r){super(e,t,n,r)}};Pa.prototype.ValueTypeName=`number`;var Fa=class extends Ea{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Kt.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ia=class extends ja{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Fa(this.times,this.values,this.getValueSize(),e)}};Ia.prototype.ValueTypeName=`quaternion`,Ia.prototype.InterpolantFactoryMethodSmooth=void 0;var La=class extends ja{constructor(e,t,n){super(e,t,n)}};La.prototype.ValueTypeName=`string`,La.prototype.ValueBufferType=Array,La.prototype.DefaultInterpolation=ft,La.prototype.InterpolantFactoryMethodLinear=void 0,La.prototype.InterpolantFactoryMethodSmooth=void 0;var Ra=class extends ja{constructor(e,t,n,r){super(e,t,n,r)}};Ra.prototype.ValueTypeName=`vector`;var za=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Ba=class{constructor(e){this.manager=e===void 0?za:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ba.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Va=class extends Hn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new q(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ha=new hn,Ua=new W,Wa=new W,Ga=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U(512,512),this.mapType=fe,this.map=null,this.mapPass=null,this.matrix=new hn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ui,this._frameExtents=new U(1,1),this._viewportCount=1,this._viewports=[new un(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ua.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ua),Wa.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wa),t.updateMatrixWorld(),Ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ha,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ha)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ka=new W,qa=new Kt,Ja=new W,Ya=class extends Hn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new hn,this.projectionMatrix=new hn,this.projectionMatrixInverse=new hn,this.coordinateSystem=Et,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ka,qa,Ja),Ja.x===1&&Ja.y===1&&Ja.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ka,qa,Ja.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ka,qa,Ja),Ja.x===1&&Ja.y===1&&Ja.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ka,qa,Ja.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Xa=new W,Za=new U,Qa=new U,$a=class extends Ya{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Bt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vt*2*Math.atan(Math.tan(Bt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xa.x,Xa.y).multiplyScalar(-e/Xa.z),Xa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xa.x,Xa.y).multiplyScalar(-e/Xa.z)}getViewSize(e,t){return this.getViewBounds(e,Za,Qa),t.subVectors(Qa,Za)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Bt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},eo=class extends Ga{constructor(){super(new $a(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Vt*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},to=class extends Va{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(Hn.DEFAULT_UP),this.updateMatrix(),this.target=new Hn,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new eo}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},no=class extends Ga{constructor(){super(new $a(90,1,.5,500)),this.isPointLightShadow=!0}},ro=class extends Va{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new no}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},io=class extends Ya{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ao=class extends Va{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},oo=-90,so=1,co=class extends Hn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new $a(oo,so,e,t);r.layers=this.layers,this.add(r);let i=new $a(oo,so,e,t);i.layers=this.layers,this.add(i);let a=new $a(oo,so,e,t);a.layers=this.layers,this.add(a);let o=new $a(oo,so,e,t);o.layers=this.layers,this.add(o);let s=new $a(oo,so,e,t);s.layers=this.layers,this.add(s);let c=new $a(oo,so,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},lo=class extends $a{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},uo=`\\[\\]\\.:\\/`,fo=RegExp(`[\\[\\]\\.:\\/]`,`g`),po=`[^\\[\\]\\.:\\/]`,mo=`[^`+uo.replace(`\\.`,``)+`]`,ho=`((?:WC+[\\/:])*)`.replace(`WC`,po),go=`(WCOD+)?`.replace(`WCOD`,mo),_o=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,po),vo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,po),yo=RegExp(`^`+ho+go+_o+vo+`$`),bo=[`material`,`materials`,`bones`,`map`],xo=class{constructor(e,t,n){let r=n||So.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},So=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(fo,``)}static parseTrackName(e){let t=yo.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);bo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};So.Composite=xo,So.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},So.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},So.prototype.GetterByBindingType=[So.prototype._getValue_direct,So.prototype._getValue_array,So.prototype._getValue_arrayElement,So.prototype._getValue_toArray],So.prototype.SetterByBindingTypeAndVersioning=[[So.prototype._setValue_direct,So.prototype._setValue_direct_setNeedsUpdate,So.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[So.prototype._setValue_array,So.prototype._setValue_array_setNeedsUpdate,So.prototype._setValue_array_setMatrixWorldNeedsUpdate],[So.prototype._setValue_arrayElement,So.prototype._setValue_arrayElement_setNeedsUpdate,So.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[So.prototype._setValue_fromArray,So.prototype._setValue_fromArray_setNeedsUpdate,So.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Co=new hn,wo=class{constructor(e,t,n=0,r=1/0){this.ray=new xi(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new En,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):B(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Co.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Co),this}intersectObject(e,t=!0,n=[]){return Eo(e,this,n,t),n.sort(To),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Eo(e[r],this,n,t);return n.sort(To),n}};function To(e,t){return e.distance-t.distance}function Eo(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Eo(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function Do(e,t,n,r){let i=Oo(r);switch(n){case Te:return e*t;case ke:return e*t/i.components*i.byteLength;case Ae:return e*t/i.components*i.byteLength;case F:return e*t*2/i.components*i.byteLength;case je:return e*t*2/i.components*i.byteLength;case Ee:return e*t*3/i.components*i.byteLength;case De:return e*t*4/i.components*i.byteLength;case Me:return e*t*4/i.components*i.byteLength;case Ne:case I:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Pe:case L:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Fe:case Le:return Math.max(e,16)*Math.max(t,8)/4;case R:case Ie:return Math.max(e,8)*Math.max(t,8)/2;case Re:case ze:case Ve:case He:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Be:case Ue:case We:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ge:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ke:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case qe:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Je:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Ye:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Xe:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Ze:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Qe:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case $e:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case et:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case tt:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case nt:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case rt:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case it:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case at:case ot:case st:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ct:case lt:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ut:case dt:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Oo(e){switch(e){case fe:case pe:return{byteLength:1,components:1};case he:case me:case ye:return{byteLength:2,components:1};case be:case xe:return{byteLength:2,components:4};case _e:case ge:case ve:return{byteLength:4,components:1};case Ce:case we:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`184`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`184`);function ko(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ao(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Q={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
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
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
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
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
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
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
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
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
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
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
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
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
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
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
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
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
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
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
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
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
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
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},$={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new G}},envmap:{envMap:{value:null},envMapRotation:{value:new G},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new G}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new G}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new G},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new G},normalScale:{value:new U(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new G},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new G}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new G}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new G}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0},uvTransform:{value:new G}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new U(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}}},jo={basic:{uniforms:fa([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Q.meshbasic_vert,fragmentShader:Q.meshbasic_frag},lambert:{uniforms:fa([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:Q.meshlambert_vert,fragmentShader:Q.meshlambert_frag},phong:{uniforms:fa([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Q.meshphong_vert,fragmentShader:Q.meshphong_frag},standard:{uniforms:fa([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag},toon:{uniforms:fa([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new q(0)}}]),vertexShader:Q.meshtoon_vert,fragmentShader:Q.meshtoon_frag},matcap:{uniforms:fa([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Q.meshmatcap_vert,fragmentShader:Q.meshmatcap_frag},points:{uniforms:fa([$.points,$.fog]),vertexShader:Q.points_vert,fragmentShader:Q.points_frag},dashed:{uniforms:fa([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Q.linedashed_vert,fragmentShader:Q.linedashed_frag},depth:{uniforms:fa([$.common,$.displacementmap]),vertexShader:Q.depth_vert,fragmentShader:Q.depth_frag},normal:{uniforms:fa([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Q.meshnormal_vert,fragmentShader:Q.meshnormal_frag},sprite:{uniforms:fa([$.sprite,$.fog]),vertexShader:Q.sprite_vert,fragmentShader:Q.sprite_frag},background:{uniforms:{uvTransform:{value:new G},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Q.background_vert,fragmentShader:Q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new G}},vertexShader:Q.backgroundCube_vert,fragmentShader:Q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Q.cube_vert,fragmentShader:Q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Q.equirect_vert,fragmentShader:Q.equirect_frag},distance:{uniforms:fa([$.common,$.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Q.distance_vert,fragmentShader:Q.distance_frag},shadow:{uniforms:fa([$.lights,$.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:Q.shadow_vert,fragmentShader:Q.shadow_frag}};jo.physical={uniforms:fa([jo.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new G},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new G},clearcoatNormalScale:{value:new U(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new G},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new G},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new G},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new G},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new G},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new G},transmissionSamplerSize:{value:new U},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new G},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new G},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new G},anisotropyVector:{value:new U},anisotropyMap:{value:null},anisotropyMapTransform:{value:new G}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag};var Mo={r:0,b:0,g:0},No=new hn,Po=new G;Po.set(-1,0,0,0,1,0,0,0,1);function Fo(e,t,n,r,i,a){let o=new q(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Y(new na(1,1,1),new ya({name:`BackgroundCubeMaterial`,uniforms:da(jo.backgroundCube.uniforms),vertexShader:jo.backgroundCube.vertexShader,fragmentShader:jo.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(No.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Po),l.material.toneMapped=K.getTransfer(i.colorSpace)!==Ct,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Y(new sa(2,2),new ya({name:`BackgroundMaterial`,uniforms:da(jo.background.uniforms),vertexShader:jo.background.vertexShader,fragmentShader:jo.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=K.getTransfer(i.colorSpace)!==Ct,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Mo,ha(e)),n.buffers.color.setClear(Mo.r,Mo.g,Mo.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Io(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Lo(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Ro(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return!(t!==1023&&r.convert(t)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function zo(e){let t=this,n=null,r=0,i=!1,a=!1,o=new zi,s=new G,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Bo=4,Vo=[.125,.215,.35,.446,.526,.582],Ho=20,Uo=256,Wo=new io,Go=new q,Ko=null,qo=0,Jo=0,Yo=!1,Xo=new W,Zo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Xo}=i;Ko=this._renderer.getRenderTarget(),qo=this._renderer.getActiveCubeFace(),Jo=this._renderer.getActiveMipmapLevel(),Yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=is(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ko,qo,Jo),this._renderer.xr.enabled=Yo,e.scissorTest=!1,es(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ko=this._renderer.getRenderTarget(),qo=this._renderer.getActiveCubeFace(),Jo=this._renderer.getActiveMipmapLevel(),Yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:N,minFilter:N,generateMipmaps:!1,type:ye,format:De,colorSpace:xt,depthBuffer:!1},r=$o(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$o(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Qo(r)),this._blurMaterial=ns(r,e,t),this._ggxMaterial=ts(r,e,t)}return r}_compileMaterial(e){let t=new Y(new Kr,e);this._renderer.compile(t,Wo)}_sceneToCubeUV(e,t,n,r,i){let a=new $a(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Go),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Y(new na,new J({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Go),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;es(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=is()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rs());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;es(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Wo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Bo?n-d+Bo:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,es(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Wo),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,es(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Wo)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&B(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/(2*Ho-1),p=i/f,m=isFinite(i)?1+Math.floor(3*p):Ho;m>Ho&&z(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ho}`);let h=[],g=0;for(let e=0;e<Ho;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];es(t,3*v*(r>_-Bo?r-_+Bo:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Wo)}};function Qo(e){let t=[],n=[],r=[],i=e,a=e-Bo+1+Vo.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Bo?s=Vo[o-e+Bo-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Kr;h.setAttribute(`position`,new jr(f,3)),h.setAttribute(`uv`,new jr(p,2)),h.setAttribute(`faceIndex`,new jr(m,1)),r.push(new Y(h,null)),i>Bo&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function $o(e,t,n){let r=new fn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function es(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function ts(e,t,n){return new ya({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Uo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:as(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ns(e,t,n){let r=new Float32Array(Ho),i=new W(0,1,0);return new ya({name:`SphericalGaussianBlur`,defines:{n:Ho,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:as(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function rs(){return new ya({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:as(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function is(){return new ya({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:as(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function as(){return`

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
	`}var os=class extends fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Zi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new na(5,5,5),i=new ya({name:`CubemapFromEquirect`,uniforms:da(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Y(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=N),new co(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function ss(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304)if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}else{let r=n.image;if(r&&r.height>0){let i=new os(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}else return null}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Zo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Zo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function cs(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ft(`WebGLRenderer: `+e+` extension not supported.`),t}}}function ls(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Nr:Mr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function us(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function ds(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function fs(e,t,n){let r=new WeakMap,i=new un;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new pn(h,p,m,u);g.type=ve,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new U(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function ps(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ms={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function hs(e,t,n,r,i){let a=new fn(t,n,{type:e,depthBuffer:r,stencilBuffer:i,depthTexture:r?new $i(t,n):void 0}),o=new fn(t,n,{type:ye,depthBuffer:!1,stencilBuffer:!1}),s=new Kr;s.setAttribute(`position`,new Pr([-1,3,0,-1,-1,0,3,-1,0],3)),s.setAttribute(`uv`,new Pr([0,2,0,0,2,0],2));let c=new ba({uniforms:{tDiffuse:{value:null}},vertexShader:`
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

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

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
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new Y(s,c),u=new io(-1,1,1,-1,0,1),d=null,f=null,p=!1,m,h=null,g=[],_=!1;this.setSize=function(e,t){a.setSize(e,t),o.setSize(e,t);for(let n=0;n<g.length;n++){let r=g[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){g=e,_=g.length>0&&g[0].isRenderPass===!0;let t=a.width,n=a.height;for(let e=0;e<g.length;e++){let r=g[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(p||e.toneMapping===0&&g.length===0)return!1;if(h=t,t!==null){let e=t.width,n=t.height;(a.width!==e||a.height!==n)&&this.setSize(e,n)}return _===!1&&e.setRenderTarget(a),m=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return _},this.end=function(e,t){e.toneMapping=m,p=!0;let n=a,r=o;for(let i=0;i<g.length;i++){let a=g[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(d!==e.outputColorSpace||f!==e.toneMapping){d=e.outputColorSpace,f=e.toneMapping,c.defines={},K.getTransfer(d)===`srgb`&&(c.defines.SRGB_TRANSFER=``);let t=ms[f];t&&(c.defines[t]=``),c.needsUpdate=!0}c.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(h),e.render(l,u),h=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),s.dispose(),c.dispose()}}var gs=new ln,_s=new $i(1,1),vs=new pn,ys=new mn,bs=new Zi,xs=[],Ss=[],Cs=new Float32Array(16),ws=new Float32Array(9),Ts=new Float32Array(4);function Es(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=xs[i];if(a===void 0&&(a=new Float32Array(i),xs[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Ds(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Os(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function ks(e,t){let n=Ss[t];n===void 0&&(n=new Int32Array(t),Ss[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function As(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function js(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ds(n,t))return;e.uniform2fv(this.addr,t),Os(n,t)}}function Ms(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ds(n,t))return;e.uniform3fv(this.addr,t),Os(n,t)}}function Ns(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ds(n,t))return;e.uniform4fv(this.addr,t),Os(n,t)}}function Ps(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ds(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Os(n,t)}else{if(Ds(n,r))return;Ts.set(r),e.uniformMatrix2fv(this.addr,!1,Ts),Os(n,r)}}function Fs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ds(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Os(n,t)}else{if(Ds(n,r))return;ws.set(r),e.uniformMatrix3fv(this.addr,!1,ws),Os(n,r)}}function Is(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ds(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Os(n,t)}else{if(Ds(n,r))return;Cs.set(r),e.uniformMatrix4fv(this.addr,!1,Cs),Os(n,r)}}function Ls(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Rs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ds(n,t))return;e.uniform2iv(this.addr,t),Os(n,t)}}function zs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ds(n,t))return;e.uniform3iv(this.addr,t),Os(n,t)}}function Bs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ds(n,t))return;e.uniform4iv(this.addr,t),Os(n,t)}}function Vs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Hs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ds(n,t))return;e.uniform2uiv(this.addr,t),Os(n,t)}}function Us(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ds(n,t))return;e.uniform3uiv(this.addr,t),Os(n,t)}}function Ws(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ds(n,t))return;e.uniform4uiv(this.addr,t),Os(n,t)}}function Gs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(_s.compareFunction=n.isReversedDepthBuffer()?518:515,a=_s):a=gs,n.setTexture2D(t||a,i)}function Ks(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ys,i)}function qs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||bs,i)}function Js(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||vs,i)}function Ys(e){switch(e){case 5126:return As;case 35664:return js;case 35665:return Ms;case 35666:return Ns;case 35674:return Ps;case 35675:return Fs;case 35676:return Is;case 5124:case 35670:return Ls;case 35667:case 35671:return Rs;case 35668:case 35672:return zs;case 35669:case 35673:return Bs;case 5125:return Vs;case 36294:return Hs;case 36295:return Us;case 36296:return Ws;case 35678:case 36198:case 36298:case 36306:case 35682:return Gs;case 35679:case 36299:case 36307:return Ks;case 35680:case 36300:case 36308:case 36293:return qs;case 36289:case 36303:case 36311:case 36292:return Js}}function Xs(e,t){e.uniform1fv(this.addr,t)}function Zs(e,t){let n=Es(t,this.size,2);e.uniform2fv(this.addr,n)}function Qs(e,t){let n=Es(t,this.size,3);e.uniform3fv(this.addr,n)}function $s(e,t){let n=Es(t,this.size,4);e.uniform4fv(this.addr,n)}function ec(e,t){let n=Es(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function tc(e,t){let n=Es(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function nc(e,t){let n=Es(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function rc(e,t){e.uniform1iv(this.addr,t)}function ic(e,t){e.uniform2iv(this.addr,t)}function ac(e,t){e.uniform3iv(this.addr,t)}function oc(e,t){e.uniform4iv(this.addr,t)}function sc(e,t){e.uniform1uiv(this.addr,t)}function cc(e,t){e.uniform2uiv(this.addr,t)}function lc(e,t){e.uniform3uiv(this.addr,t)}function uc(e,t){e.uniform4uiv(this.addr,t)}function dc(e,t,n){let r=this.cache,i=t.length,a=ks(n,i);Ds(r,a)||(e.uniform1iv(this.addr,a),Os(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?_s:gs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function fc(e,t,n){let r=this.cache,i=t.length,a=ks(n,i);Ds(r,a)||(e.uniform1iv(this.addr,a),Os(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ys,a[e])}function pc(e,t,n){let r=this.cache,i=t.length,a=ks(n,i);Ds(r,a)||(e.uniform1iv(this.addr,a),Os(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||bs,a[e])}function mc(e,t,n){let r=this.cache,i=t.length,a=ks(n,i);Ds(r,a)||(e.uniform1iv(this.addr,a),Os(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||vs,a[e])}function hc(e){switch(e){case 5126:return Xs;case 35664:return Zs;case 35665:return Qs;case 35666:return $s;case 35674:return ec;case 35675:return tc;case 35676:return nc;case 5124:case 35670:return rc;case 35667:case 35671:return ic;case 35668:case 35672:return ac;case 35669:case 35673:return oc;case 5125:return sc;case 36294:return cc;case 36295:return lc;case 36296:return uc;case 35678:case 36198:case 36298:case 36306:case 35682:return dc;case 35679:case 36299:case 36307:return fc;case 35680:case 36300:case 36308:case 36293:return pc;case 36289:case 36303:case 36311:case 36292:return mc}}var gc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ys(t.type)}},_c=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hc(t.type)}},vc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},yc=/(\w+)(\])?(\[|\.)?/g;function bc(e,t){e.seq.push(t),e.map[t.id]=t}function xc(e,t,n){let r=e.name,i=r.length;for(yc.lastIndex=0;;){let a=yc.exec(r),o=yc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){bc(n,l===void 0?new gc(s,e,t):new _c(s,e,t));break}else{let e=n.map[s];e===void 0&&(e=new vc(s),bc(n,e)),n=e}}}var Sc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);xc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Cc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var wc=37297,Tc=0;function Ec(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Dc=new G;function Oc(e){K._getMatrix(Dc,K.workingColorSpace,e);let t=`mat3( ${Dc.elements.map(e=>e.toFixed(4))} )`;switch(K.getTransfer(e)){case St:return[t,`LinearTransferOETF`];case Ct:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function kc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Ec(e.getShaderSource(t),r)}else return i}function Ac(e,t){let n=Oc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var jc={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Mc(e,t){let n=jc[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Nc=new W;function Pc(){return K.getLuminanceCoefficients(Nc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Nc.x.toFixed(4)}, ${Nc.y.toFixed(4)}, ${Nc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Fc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Rc).join(`
`)}function Ic(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Lc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Rc(e){return e!==``}function zc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Vc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hc(e){return e.replace(Vc,Wc)}var Uc=new Map;function Wc(e,t){let n=Q[t];if(n===void 0){let e=Uc.get(t);if(e!==void 0)n=Q[e],z(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return Hc(n)}var Gc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kc(e){return e.replace(Gc,qc)}function qc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Jc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Yc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Xc(e){return Yc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Zc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Qc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Zc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var $c={302:`ENVMAP_MODE_REFRACTION`};function el(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:$c[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var tl={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function nl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:tl[e.combine]||`ENVMAP_BLENDING_NONE`}function rl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function il(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Xc(n),l=Qc(n),u=el(n),d=nl(n),f=rl(n),p=Fc(n),m=Ic(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Rc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Rc).join(`
`),_.length>0&&(_+=`
`)):(g=[Jc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Rc).join(`
`),_=[Jc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Q.tonemapping_pars_fragment,n.toneMapping===0?``:Mc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Q.colorspace_pars_fragment,Ac(`linearToOutputTexel`,n.outputColorSpace),Pc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Rc).join(`
`)),o=Hc(o),o=zc(o,n),o=Bc(o,n),s=Hc(s),s=zc(s,n),s=Bc(s,n),o=Kc(o),s=Kc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Cc(i,i.VERTEX_SHADER,y),S=Cc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=kc(i,x,`vertex`),n=kc(i,S,`fragment`);B(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Sc(i,h),T=Lc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,wc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Tc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var al=0,ol=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new sl(e),t.set(e,n)),n}},sl=class{constructor(e){this.id=al++,this.code=e,this.usedTimes=0}};function cl(e){return e===1030||e===37490||e===36285}function ll(e,t,n,r,i,a){let o=new En,s=new ol,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=jo[C];D=e.vertexShader,O=e.fragmentShader}else D=i.vertexShader,O=i.fragmentShader,s.update(i),k=s.getVertexShaderID(i),A=s.getFragmentShaderID(i);let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,ne=h.isBatchedMesh===!0,re=!!i.map,ie=!!i.matcap,ae=!!x,oe=!!i.aoMap,se=!!i.lightMap,M=!!i.bumpMap,ce=!!i.normalMap,le=!!i.displacementMap,N=!!i.emissiveMap,ue=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=fe&&!!i.anisotropyMap,ye=pe&&!!i.clearcoatMap,be=pe&&!!i.clearcoatNormalMap,xe=pe&&!!i.clearcoatRoughnessMap,Se=he&&!!i.iridescenceMap,Ce=he&&!!i.iridescenceThicknessMap,we=ge&&!!i.sheenColorMap,Te=ge&&!!i.sheenRoughnessMap,Ee=!!i.specularMap,De=!!i.specularColorMap,Oe=!!i.specularIntensityMap,P=_e&&!!i.transmissionMap,ke=_e&&!!i.thicknessMap,Ae=!!i.gradientMap,F=!!i.alphaMap,je=i.alphaTest>0,Me=!!i.alphaHash,Ne=!!i.extensions,I=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(I=e.toneMapping);let Pe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ne,batchingColor:ne&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:K.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:re,matcap:ie,envMap:ae,envMapMode:ae&&x.mapping,envMapCubeUVHeight:S,aoMap:oe,lightMap:se,bumpMap:M,normalMap:ce,displacementMap:le,emissiveMap:N,normalMapObjectSpace:ce&&i.normalMapType===1,normalMapTangentSpace:ce&&i.normalMapType===0,packedNormalMap:ce&&i.normalMapType===0&&cl(i.normalMap.format),metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:ve,clearcoat:pe,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,dispersion:me,iridescence:he,iridescenceMap:Se,iridescenceThicknessMap:Ce,sheen:ge,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:De,specularIntensityMap:Oe,transmission:_e,transmissionMap:P,thicknessMap:ke,gradientMap:Ae,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:F,alphaTest:je,alphaHash:Me,combine:i.combine,mapUv:re&&m(i.map.channel),aoMapUv:oe&&m(i.aoMap.channel),lightMapUv:se&&m(i.lightMap.channel),bumpMapUv:M&&m(i.bumpMap.channel),normalMapUv:ce&&m(i.normalMap.channel),displacementMapUv:le&&m(i.displacementMap.channel),emissiveMapUv:N&&m(i.emissiveMap.channel),metalnessMapUv:ue&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ve&&m(i.anisotropyMap.channel),clearcoatMapUv:ye&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Te&&m(i.sheenRoughnessMap.channel),specularMapUv:Ee&&m(i.specularMap.channel),specularColorMapUv:De&&m(i.specularColorMap.channel),specularIntensityMapUv:Oe&&m(i.specularIntensityMap.channel),transmissionMapUv:P&&m(i.transmissionMap.channel),thicknessMapUv:ke&&m(i.thicknessMap.channel),alphaMapUv:F&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ce||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(re||F),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ce===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:I,decodeVideoTexture:re&&i.map.isVideoTexture===!0&&K.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:N&&i.emissiveMap.isVideoTexture===!0&&K.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ne&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ne&&i.extensions.multiDraw===!0||ne)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=jo[t];n=ga.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new il(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function ul(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function dl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function fl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function pl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||dl),r.length>1&&r.sort(t||fl),i.length>1&&i.sort(t||fl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function ml(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new pl,e.set(t,[i])):n>=r.length?(i=new pl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function hl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new W,color:new q};break;case`SpotLight`:n={position:new W,direction:new W,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new q,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new q,groundColor:new q};break;case`RectAreaLight`:n={color:new q,position:new W,halfWidth:new W,halfHeight:new W};break}return e[t.id]=n,n}}}function gl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var _l=0;function vl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function yl(e){let t=new hl,n=gl(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new hn,o=new hn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(vl);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=_l++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function bl(e){let t=new yl(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function xl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new bl(e),t.set(n,[a])):r>=i.length?(a=new bl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Sl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cl=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,wl=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Tl=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],El=new hn,Dl=new W,Ol=new W;function kl(e,t,n){let r=new Ui,i=new U,a=new U,o=new un,s=new Ca,c=new wa,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new ya({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U},radius:{value:4}},vertexShader:Sl,fragmentShader:Cl}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Kr;m.setAttribute(`position`,new jr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Y(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){z(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new fn(i.x,i.y,{format:F,type:ye,minFilter:N,magFilter:N,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new $i(i.x,i.y,ve),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Oe,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=M,d.map.depthTexture.magFilter=M}else l.isPointLight?(d.map=new os(i.x),d.map.depthTexture=new ea(i.x,_e)):(d.map=new fn(i.x,i.y),d.map.depthTexture=new $i(i.x,i.y,_e)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Oe,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=N,d.map.depthTexture.magFilter=N):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=M,d.map.depthTexture.magFilter=M);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Dl.setFromMatrixPosition(l.matrixWorld),e.position.copy(Dl),Ol.copy(e.position),Ol.add(wl[t]),e.up.copy(Tl[t]),e.lookAt(Ol),e.updateMatrixWorld(),n.makeTranslation(-Dl.x,-Dl.y,-Dl.z),El.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(El,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new fn(i.x,i.y,{format:F,type:ye})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Al(e,t){function n(){let t=!1,n=new un,r=null,i=new un(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ue(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Lt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ue(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ne=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),j=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(re)[1]),j=ne>=1);let ie=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),M=new un().fromArray(oe),ce=new un().fromArray(se);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let N={};N[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),N[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),N[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),N[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ue(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),ue(e.CULL_FACE),_e(0);function ue(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]===n?!1:(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h===t?!1:(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(de(e.BLEND),g=!1);return}if(g===!1&&(ue(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t);break}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t);break}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):ue(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(ue(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(j&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(ue(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?ue(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+te-1),ie!==t&&(e.activeTexture(t),ie=t)}function Te(t,n,r){r===void 0&&(r=ie===null?e.TEXTURE0+te-1:ie);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(ie!==r&&(e.activeTexture(r),ie=r),e.bindTexture(t,n||N[t]),i.type=t,i.texture=n)}function Ee(){let t=ae[ie];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function P(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function ke(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function F(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function je(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Me(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ne(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function I(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Pe(t){return d[t]===void 0?e.getParameter(t):d[t]}function L(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function R(t){M.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),M.copy(t))}function Fe(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function Ie(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Le(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Re(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ie=null,ae={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,M.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ue,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:Ne,texImage3D:I,pixelStorei:L,getParameter:Pe,updateUBOMapping:Ie,uniformBlockBinding:Le,texStorage2D:je,texStorage3D:Me,texSubImage2D:P,texSubImage3D:ke,compressedTexSubImage2D:Ae,compressedTexSubImage3D:F,scissor:R,viewport:Fe,reset:Re}}function jl(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new U,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):kt(`canvas`)}function g(e,t,n){let r=1,i=Pe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?St:K.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function ee(e){O=e}function te(){let e=O;return e>=i.maxTextures&&z(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function j(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ne(t,i){let a=r.get(t);if(t.isVideoTexture&&Ne(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{be(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){be(a,t,i);return}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){be(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function fe(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){xe(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let pe={[ae]:e.REPEAT,[oe]:e.CLAMP_TO_EDGE,[se]:e.MIRRORED_REPEAT},me={[M]:e.NEAREST,[ce]:e.NEAREST_MIPMAP_NEAREST,[le]:e.NEAREST_MIPMAP_LINEAR,[N]:e.LINEAR,[ue]:e.LINEAR_MIPMAP_NEAREST,[de]:e.LINEAR_MIPMAP_LINEAR},he={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ge(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,pe[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,pe[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,pe[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,me[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,me[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,he[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function _e(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=j(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ve(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ye(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ve(n.start,r.width,4),c=ve(t.start,r.width,4);n.start<=i+1&&a===c&&ve(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function be(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=_e(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=K.getPrimaries(K.workingColorSpace),r=o.colorSpace===``?null:K.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=I(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ge(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===P,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture)if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ye(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023)if(r!==null)if(C){if(T)if(o.layerUpdates.size>0){let t=Do(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0);else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}else if(o.isDataArrayTexture)if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T)if(o.layerUpdates.size>0){let i=Do(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w)if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}let r=e.RGBA,i=e.RGBA,a=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,r,i,a,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Pe(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Pe(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function xe(t,o,s){if(o.image.length!==6)return;let c=_e(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=K.getPrimaries(K.workingColorSpace),r=o.colorSpace===``?null:K.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=I(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);ge(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Pe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Se(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Me(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,je(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Me(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,je(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,je(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);Me(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,je(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,je(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function we(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ge(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ne(i.depthTexture,0);let u=l.__webglTexture,d=je(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Me(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Me(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`Unknown depthTexture format`)}function Te(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer)if(a)for(let e=0;e<6;e++)we(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?we(i.__webglFramebuffer[0],t,0):we(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Ce(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Ce(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(t,n,i){let a=r.get(t);n!==void 0&&Se(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Te(t)}function De(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Me(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=je(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Ce(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ge(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Se(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Se(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ge(c,a),Se(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ge(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Se(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Se(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&Te(t)}function Oe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let ke=[],Ae=[];function F(t){if(t.samples>0){if(Me(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(ke.length=0,Ae.length=0,ke.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(ke.push(l),Ae.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ae)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ke))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function je(e){return Math.min(i.maxSamples,e.samples)}function Me(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Ne(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function I(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(K.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function Pe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=te,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=ee,this.setTexture2D=ne,this.setTexture2DArray=re,this.setTexture3D=ie,this.setTextureCube=fe,this.rebindTextures=Ee,this.setupRenderTarget=De,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Me,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Ml(e,t){function n(n,r=``){let i,a=K.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Nl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pl=`
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

}`,Fl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ta(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ya({vertexShader:Nl,fragmentShader:Pl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Y(new sa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Il=class extends Rt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Fl,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new U,C=null,w=new $a;w.viewport=new un;let T=new $a;T.viewport=new un;let E=[w,T],D=new lo,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Gn,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Gn,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Gn,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,te);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,M.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,te),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?P:Oe,a=_.stencil?Se:_e);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new fn(d.textureWidth,d.textureHeight,{format:De,type:fe,depthTexture:new $i(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new fn(f.framebufferWidth,f.framebufferHeight,{format:De,type:fe,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),M.setContext(r),M.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function te(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let j=new W,ne=new W;function re(e,t,n){j.setFromMatrixPosition(t.matrixWorld),ne.setFromMatrixPosition(n.matrixWorld);let r=j.distanceTo(ne),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ie(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;ie(D,i);for(let e=0;e<a.length;e++)ie(a[e],i);a.length===2?re(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),ae(e,D,i)};function ae(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Vt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let oe=null;function se(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new $a,o.layers.enable(n),o.viewport=new un,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new ta,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}oe&&oe(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let M=new ko;M.setAnimationLoop(se),this.setAnimationLoop=function(e){oe=e},this.dispose=function(){}}},Ll=new hn,Rl=new G;Rl.set(-1,0,0,0,1,0,0,0,1);function zl(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ha(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Ll.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Rl),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Bl(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return B(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):ArrayBuffer.isView(o)?i.__data.set(new o.constructor(o.buffer,o.byteOffset,i.__data.length)):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return typeof i==`number`||typeof i==`boolean`?r[a]=i:ArrayBuffer.isView(i)?r[a]=i.slice():r[a]=i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var Vl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Hl=null;function Ul(){return Hl===null&&(Hl=new Fi(Vl,16,16,F,ye),Hl.name=`DFG_LUT`,Hl.minFilter=N,Hl.magFilter=N,Hl.wrapS=oe,Hl.wrapT=oe,Hl.generateMipmaps=!1,Hl.needsUpdate=!0),Hl}var Wl=class{constructor(e={}){let{canvas:t=At(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=fe}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Me,je,Ae]),g=new Set([fe,_e,he,Se,be,xe]),_=new Uint32Array(4),v=new Int32Array(4),y=new W,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null;this._outputColorSpace=bt;let O=0,k=0,A=null,ee=-1,te=null,j=new un,ne=new un,re=null,ie=new q(0),ae=0,oe=t.width,se=t.height,M=1,ce=null,le=null,N=new un(0,0,oe,se),ue=new un(0,0,oe,se),pe=!1,me=new Ui,ge=!1,ve=!1,Ce=new hn,we=new W,Te=new un,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},De=!1;function Oe(){return A===null?M:1}let P=n;function ke(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r184`),t.addEventListener(`webglcontextlost`,et,!1),t.addEventListener(`webglcontextrestored`,tt,!1),t.addEventListener(`webglcontextcreationerror`,nt,!1),P===null){let t=`webgl2`;if(P=ke(t,e),P===null)throw ke(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw B(`WebGLRenderer: `+e.message),e}let F,Ne,I,Pe,L,R,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze;function Qe(){F=new cs(P),F.init(),Ye=new Ml(P,F),Ne=new Ro(P,F,e,Ye),I=new Al(P,F),Ne.reversedDepthBuffer&&d&&I.buffers.depth.setReversed(!0),Pe=new ds(P),L=new ul,R=new jl(P,F,I,L,Ne,Ye,Pe),Fe=new ss(T),Ie=new Ao(P),Xe=new Io(P,Ie),Le=new ls(P,Ie,Pe,Xe),Re=new ps(P,Le,Ie,Xe,Pe),Ke=new fs(P,Ne,R),Ue=new zo(L),ze=new ll(T,Fe,F,Ne,Xe,Ue),Be=new zl(T,L),Ve=new ml,He=new xl(F),Ge=new Fo(T,Fe,I,Re,p,s),We=new kl(T,Re,Ne),Ze=new Bl(P,Pe,Ne,I),qe=new Lo(P,F,Pe),Je=new us(P,F,Pe),Pe.programs=ze.programs,T.capabilities=Ne,T.extensions=F,T.properties=L,T.renderLists=Ve,T.shadowMap=We,T.state=I,T.info=Pe}Qe(),m!==1009&&(w=new hs(m,t.width,t.height,r,i));let $e=new Il(T,P);this.xr=$e,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=F.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=F.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return M},this.setPixelRatio=function(e){e!==void 0&&(M=e,this.setSize(oe,se,!1))},this.getSize=function(e){return e.set(oe,se)},this.setSize=function(e,n,r=!0){if($e.isPresenting){z(`WebGLRenderer: Can't change size while VR device is presenting.`);return}oe=e,se=n,t.width=Math.floor(e*M),t.height=Math.floor(n*M),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(oe*M,se*M).floor()},this.setDrawingBufferSize=function(e,n,r){oe=e,se=n,M=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){B(`THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(j)},this.getViewport=function(e){return e.copy(N)},this.setViewport=function(e,t,n,r){e.isVector4?N.set(e.x,e.y,e.z,e.w):N.set(e,t,n,r),I.viewport(j.copy(N).multiplyScalar(M).round())},this.getScissor=function(e){return e.copy(ue)},this.setScissor=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),I.scissor(ne.copy(ue).multiplyScalar(M).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(e){I.setScissorTest(pe=e)},this.setOpaqueSort=function(e){ce=e},this.setTransparentSort=function(e){le=e},this.getClearColor=function(e){return e.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(A!==null){let t=A.texture.format;e=h.has(t)}if(e){let e=A.texture.type,t=g.has(e),n=Ge.getClearColor(),r=Ge.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,P.clearBufferuiv(P.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,P.clearBufferiv(P.COLOR,0,v))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,et,!1),t.removeEventListener(`webglcontextrestored`,tt,!1),t.removeEventListener(`webglcontextcreationerror`,nt,!1),Ge.dispose(),Ve.dispose(),He.dispose(),L.dispose(),Fe.dispose(),Re.dispose(),Xe.dispose(),Ze.dispose(),ze.dispose(),$e.dispose(),$e.removeEventListener(`sessionstart`,lt),$e.removeEventListener(`sessionend`,ut),dt.stop()};function et(e){e.preventDefault(),Nt(`WebGLRenderer: Context Lost.`),E=!0}function tt(){Nt(`WebGLRenderer: Context Restored.`),E=!1;let e=Pe.autoReset,t=We.enabled,n=We.autoUpdate,r=We.needsUpdate,i=We.type;Qe(),Pe.autoReset=e,We.enabled=t,We.autoUpdate=n,We.needsUpdate=r,We.type=i}function nt(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function rt(e){let t=e.target;t.removeEventListener(`dispose`,rt),it(t)}function it(e){at(e),L.remove(e)}function at(e){let t=L.get(e).programs;t!==void 0&&(t.forEach(function(e){ze.releaseProgram(e)}),e.isShaderMaterial&&ze.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ee);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=St(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Le.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Xe.setup(i,r,s,n,c);let h,g=qe;if(c!==null&&(h=Ie.get(c),g=Je,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*Oe()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*Oe()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh)if(F.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ie.get(c).bytesPerElement:1,o=L.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ot(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,_t(e,t,n),e.side=0,e.needsUpdate=!0,_t(e,t,n),e.side=2):_t(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=He.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];ot(a,n,e),r.add(a)}else ot(t,n,e),r.add(t)}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){L.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}F.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let st=null;function ct(e){st&&st(e)}function lt(){dt.stop()}function ut(){dt.start()}let dt=new ko;dt.setAnimationLoop(ct),typeof self<`u`&&dt.setContext(self),this.setAnimationLoop=function(e){st=e,$e.setAnimationLoop(e),e===null?dt.stop():dt.start()},$e.addEventListener(`sessionstart`,lt),$e.addEventListener(`sessionend`,ut),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=$e.enabled===!0&&$e.isPresenting===!0,r=w!==null&&(A===null||n)&&w.begin(T,A);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),$e.enabled===!0&&$e.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&($e.cameraAutoUpdate===!0&&$e.updateCamera(t),t=$e.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,A),x=He.get(e,C.length),x.init(t),x.state.textureUnits=R.getTextureUnits(),C.push(x),Ce.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),me.setFromProjectionMatrix(Ce,Et,t.reversedDepth),ve=this.localClippingEnabled,ge=Ue.init(this.clippingPlanes,ve),b=Ve.get(e,S.length),b.init(),S.push(b),$e.enabled===!0&&$e.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&ft(e,t,-1/0,T.sortObjects)}ft(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(ce,le),De=$e.enabled===!1||$e.isPresenting===!1||$e.hasDepthSensing()===!1,De&&Ge.addToRenderList(b,e),this.info.render.frame++,ge===!0&&Ue.beginShadows();let i=x.state.shadowsArray;if(We.render(i,e,t),ge===!0&&Ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];mt(n,r,e,a)}De&&Ge.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];pt(b,e,n,n.viewport)}}else r.length>0&&mt(n,r,e,t),De&&Ge.render(e),pt(b,e,t)}A!==null&&k===0&&(R.updateMultisampleRenderTarget(A),R.updateRenderTargetMipmap(A)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Xe.resetDefaultState(),ee=-1,te=null,C.pop(),C.length>0?(x=C[C.length-1],R.setTextureUnits(x.state.textureUnits),ge===!0&&Ue.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function ft(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||me.intersectsSprite(e)){r&&Te.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ce);let t=Re.update(e),i=e.material;i.visible&&b.push(e,t,i,n,Te.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||me.intersectsObject(e))){let t=Re.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),Te.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Te.copy(e.boundingSphere.center)),Te.applyMatrix4(e.matrixWorld).applyMatrix4(Ce)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,Te.z,o)}}else i.visible&&b.push(e,t,i,n,Te.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ft(i[e],t,n,r)}function pt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ge===!0&&Ue.setGlobalState(T.clippingPlanes,n),r&&I.viewport(j.copy(r)),i.length>0&&ht(i,t,n),a.length>0&&ht(a,t,n),o.length>0&&ht(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function mt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=F.has(`EXT_color_buffer_half_float`)||F.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new fn(1,1,{generateMipmaps:!0,type:e?ye:fe,minFilter:de,samples:Math.max(4,Ne.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:K.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||j;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),ae=T.getClearAlpha(),ae<1&&T.setClearColor(16777215,.5),T.clear(),De&&Ge.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ge===!0&&Ue.setGlobalState(T.clippingPlanes,r),ht(e,n,r),R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a),F.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,gt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ht(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&gt(o,t,n,s,l,c)}}function gt(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function _t(e,t,n){t.isScene!==!0&&(t=Ee);let r=L.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=ze.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=ze.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Fe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,rt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return yt(e,s),d}else s.uniforms=ze.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=ze.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ue.uniform),yt(e,s),r.needsLights=wt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function vt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Sc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function yt(e,t){let n=L.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function xt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function St(e,t,n,r,i){t.isScene!==!0&&(t=Ee),R.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=A===null?T.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:K.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Fe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=L.get(r),y=x.state.lights;if(ge===!0&&(ve===!0||e!==te)){let t=e===te&&r.id===ee;Ue.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ue.numPlanes||v.numIntersection!==Ue.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=_t(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(I.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==ee&&(ee=r.id,w=!0),v.needsLights){let e=xt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||te!==e){I.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(P,`projectionMatrix`,e.projectionMatrix),O.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(P,we.setFromMatrixPosition(e.matrixWorld)),Ne.logarithmicDepthBuffer&&O.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),te!==e&&(te=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,R),y.state.spotShadowMap.length>0&&O.setValue(P,`spotShadowMap`,y.state.spotShadowMap,R),y.state.pointShadowMap.length>0&&O.setValue(P,`pointShadowMap`,y.state.pointShadowMap,R)),i.isSkinnedMesh){O.setOptional(P,i,`bindMatrix`),O.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(P,`boneTexture`,e.boneTexture,R))}i.isBatchedMesh&&(O.setOptional(P,i,`batchingTexture`),O.setValue(P,`batchingTexture`,i._matricesTexture,R),O.setOptional(P,i,`batchingIdTexture`),O.setValue(P,`batchingIdTexture`,i._indirectTexture,R),O.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(P,`batchingColorTexture`,i._colorsTexture,R));let j=n.morphAttributes;if((j.position!==void 0||j.normal!==void 0||j.color!==void 0)&&Ke.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Ul()),w){if(O.setValue(P,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&Ct(k,E),a&&r.fog===!0&&Be.refreshFogUniforms(k,a),Be.refreshMaterialUniforms(k,r,M,se,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}Sc.upload(P,vt(v),k,R)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Sc.upload(P,vt(v),k,R),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(P,`center`,i.center),O.setValue(P,`modelViewMatrix`,i.modelViewMatrix),O.setValue(P,`normalMatrix`,i.normalMatrix),O.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ze.update(n,S),Ze.bind(n,S)}}return S}function Ct(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function wt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(e,t,n){let r=L.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),L.get(e.texture).__webglTexture=t,L.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=L.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0};let Tt=P.createFramebuffer();this.setRenderTarget=function(e,t=0,n=0){A=e,O=t,k=n;let r=null,i=!1,a=!1;if(e){let o=L.get(e);if(o.__useDefaultFramebuffer!==void 0){I.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),j.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,I.viewport(j),I.scissor(ne),I.setScissorTest(re),ee=-1;return}else if(o.__webglFramebuffer===void 0)R.setupRenderTarget(e);else if(o.__hasExternalTextures)R.rebindTextures(e,L.get(e.texture).__webglTexture,L.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&L.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);R.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=L.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&R.useMultisampledRTT(e)===!1?L.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,j.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else j.copy(N).multiplyScalar(M).floor(),ne.copy(ue).multiplyScalar(M).floor(),re=pe;if(n!==0&&(r=Tt),I.bindFramebuffer(P.FRAMEBUFFER,r)&&I.drawBuffers(e,r),I.viewport(j),I.scissor(ne),I.setScissorTest(re),i){let r=L.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=L.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=L.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}ee=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){I.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s),!Ne.textureFormatReadable(c)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Ne.textureTypeReadable(l)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,Ye.convert(c),Ye.convert(l),a)}finally{let e=A===null?null:L.get(A).__webglFramebuffer;I.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){I.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s),!Ne.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Ne.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,d),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,Ye.convert(l),Ye.convert(u),0);let f=A===null?null:L.get(A).__webglFramebuffer;I.bindFramebuffer(P.FRAMEBUFFER,f);let p=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await It(P,p,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,d),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.deleteBuffer(d),P.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;R.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),I.unbindTexture()};let Dt=P.createFramebuffer(),Ot=P.createFramebuffer();this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ye.convert(t.format),_=Ye.convert(t.type),v;t.isData3DTexture?(R.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(R.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(R.setTexture2D(t,0),v=P.TEXTURE_2D),I.activeTexture(P.TEXTURE0),I.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(P.UNPACK_ROW_LENGTH),b=I.getParameter(P.UNPACK_IMAGE_HEIGHT),x=I.getParameter(P.UNPACK_SKIP_PIXELS),S=I.getParameter(P.UNPACK_SKIP_ROWS),C=I.getParameter(P.UNPACK_SKIP_IMAGES);I.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(P.UNPACK_SKIP_PIXELS,l),I.pixelStorei(P.UNPACK_SKIP_ROWS,u),I.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=L.get(e),r=L.get(t),h=L.get(n.__renderTarget),g=L.get(r.__renderTarget);I.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,L.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,L.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);I.bindFramebuffer(P.READ_FRAMEBUFFER,null),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||L.has(e)){let n=L.get(e),r=L.get(t);I.bindFramebuffer(P.READ_FRAMEBUFFER,Dt),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,Ot);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);I.bindFramebuffer(P.READ_FRAMEBUFFER,null),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(P.UNPACK_ROW_LENGTH,y),I.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(P.UNPACK_SKIP_PIXELS,x),I.pixelStorei(P.UNPACK_SKIP_ROWS,S),I.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),I.unbindTexture()},this.initRenderTarget=function(e){L.get(e).__webglFramebuffer===void 0&&R.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?R.setTextureCube(e,0):e.isData3DTexture?R.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?R.setTexture2DArray(e,0):R.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){O=0,k=0,A=null,I.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Et}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=K._getDrawingBufferColorSpace(e),t.unpackColorSpace=K._getUnpackColorSpace()}},Gl=class{group;wheelBase;wheelCone;ballMesh;ringMesh;highlightMesh;trailGroup;ballLight;isEnemyWheel=!1;sharedTrailGeo;extraBallMeshes=new Map;lastBallX;lastBallZ;constructor(e,t){this.isEnemyWheel=e,this.group=new Un,this.buildWheel(e,t)}clearExtraBalls(){for(let e of this.extraBallMeshes.values())this.group.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(e=>e.dispose()):e.material.dispose();this.extraBallMeshes.clear()}rebuildWheel(e,t,n=[],r){for(this.clearExtraBalls(),this.isEnemyWheel=e,this.group.traverse(e=>{e instanceof Y&&(e.geometry&&e.geometry!==this.sharedTrailGeo&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>e.dispose()))}),this.sharedTrailGeo&&=(this.sharedTrailGeo.dispose(),void 0);this.group.children.length>0;)this.group.remove(this.group.children[0]);this.buildWheel(e,t,n,r)}setBallVisible(e){this.ballMesh&&(this.ballMesh.visible=e)}buildWheel(e,t,n=[],r){let i=t.numbers.length,a=Math.PI*2/i,o=new X(1.2,1,.3,16,1,!0),s=new Z({color:e?1579544:4861723,shininess:e?60:30,side:2});this.wheelBase=new Y(o,s),this.wheelBase.castShadow=!0,this.wheelBase.receiveShadow=!0,this.group.add(this.wheelBase);let c=new Y(new ua(1.05,.05,8,24),new Z({color:e?5922917:13938487,shininess:e?80:90}));c.rotation.x=Math.PI/2,c.position.y=.1,this.group.add(c),this.wheelCone=new Un,this.wheelCone.position.y=.02,this.group.add(this.wheelCone);let l=new ia(.3,.25,12),u=new Z({color:e?2236962:16766720,shininess:e?90:120}),d=new Y(l,u);d.position.y=.1,this.wheelCone.add(d);let f=new Y(new X(.8,.8,.05,24),new Z({color:e?1315860:2829099,shininess:40}));this.wheelCone.add(f);let p=new ra(.8,64),m=new J({map:this.createWheelTexture(e,t,n,r),side:2,fog:!1});this.ringMesh=new Y(p,m),this.ringMesh.rotation.x=-Math.PI/2,this.ringMesh.position.y=.026,this.ringMesh.receiveShadow=!0,this.ringMesh.castShadow=!0,this.wheelCone.add(this.ringMesh);for(let e=0;e<i;e++){let t=e*a,n=new Y(new X(.008,.008,.06,4),u);n.position.x=Math.cos(t+a/2)*.78,n.position.z=Math.sin(t+a/2)*.78,n.position.y=.035,this.wheelCone.add(n)}let h=new la(.035,8,8),g=new xa({color:e?16755370:15658734,roughness:.1,metalness:.1,emissive:e?10027008:3355443});this.ballMesh=new Y(h,g),this.ballMesh.castShadow=!0,this.group.add(this.ballMesh),this.ballLight=new ro(16777215,0,1.2),this.ballMesh.add(this.ballLight),this.trailGroup=new Un,this.group.add(this.trailGroup);let _=new ca(.7,.85,16,1,-a/2,a),v=new J({color:16777215,side:2,transparent:!0,opacity:0,depthWrite:!1,blending:2});this.highlightMesh=new Y(_,v),this.highlightMesh.rotation.x=-Math.PI/2,this.highlightMesh.position.y=.028,this.wheelCone.add(this.highlightMesh);let y=Math.PI*2/8,b=.82,x=new X(.016,.016,.03,6),S=new Z({color:e?10395294:16766720,shininess:100});for(let e=0;e<8;e++){let t=e*y,n=new Y(x,S);n.position.x=b*Math.cos(t),n.position.z=b*Math.sin(t),n.position.y=.05994285714285713,n.castShadow=!0,n.receiveShadow=!0,this.group.add(n)}}createWheelTexture(e,t,n=[],r){let i=document.createElement(`canvas`);i.width=512,i.height=512;let a=i.getContext(`2d`),o=t.numbers.length,s=Math.PI*2/o;for(let i=0;i<o;i++){let o=i*s-s/2,l=i*s+s/2,u=t.numbers[i],d=c(u,t,r),f=`#2ebd42`;f=d===`red`?e?`#b71c1c`:`#d32f2f`:d===`black`?e?`#111111`:`#222222`:d===`gold`?`#ffd700`:d===`purple`?`#9c27b0`:d===`cyan`?`#00bcd4`:d===`crimson`?`#ff007f`:e?`#64dd17`:`#2ebd42`,a.beginPath(),a.moveTo(256,256),a.arc(256,256,240,o,l),a.closePath(),a.fillStyle=f,a.fill(),n.length>0&&!n.includes(u)&&(a.beginPath(),a.moveTo(256,256),a.arc(256,256,240,o,l),a.closePath(),a.fillStyle=`rgba(0, 0, 0, 0.65)`,a.fill());let p=r&&r.goldFoils&&r.goldFoils.includes(u),m=r&&r.copperPlates&&r.copperPlates.includes(u);p?(a.save(),a.lineWidth=6,a.strokeStyle=`#ffd700`,a.beginPath(),a.arc(256,256,230,o,l),a.stroke(),a.beginPath(),a.arc(256,256,165,o,l),a.stroke(),a.restore()):m&&(a.save(),a.lineWidth=6,a.strokeStyle=`#ffffff`,a.beginPath(),a.arc(256,256,230,o,l),a.stroke(),a.beginPath(),a.arc(256,256,165,o,l),a.stroke(),a.restore())}a.beginPath(),a.arc(256,256,155,0,Math.PI*2),a.fillStyle=e?`#0c0f0d`:`#21140e`,a.fill(),a.strokeStyle=e?`rgba(90, 96, 101, 0.45)`:`rgba(197, 159, 81, 0.45)`,a.lineWidth=2.5;for(let e=0;e<o;e++){let t=e*s-s/2;a.beginPath(),a.moveTo(256+155*Math.cos(t),256+155*Math.sin(t)),a.lineTo(256+240*Math.cos(t),256+240*Math.sin(t)),a.stroke()}a.strokeStyle=e?`#5a6065`:`#8a703d`,a.lineWidth=4,a.beginPath(),a.arc(256,256,240,0,Math.PI*2),a.stroke(),a.beginPath(),a.arc(256,256,155,0,Math.PI*2),a.stroke();for(let r=0;r<o;r++){let i=r*s,o=t.numbers[r];a.save(),a.translate(256,256),a.rotate(i),a.translate(190,0),a.rotate(Math.PI/2),n.length>0&&!n.includes(o)?a.fillStyle=`rgba(255, 255, 255, 0.25)`:a.fillStyle=e?`#ffcccc`:`#ffffff`,a.font=`bold 22px "Courier Prime", monospace`,a.textAlign=`center`,a.textBaseline=`middle`,a.fillText(o.toString(),0,0),a.restore()}let l=new Qi(i);return l.minFilter=N,l.magFilter=N,l.colorSpace=bt,l.needsUpdate=!0,l}update(e,t,n,r,i,a,o,s,l){this.wheelCone.rotation.y=-e;let u=16777215,d=0,f=this.isEnemyWheel?16755370:15658734,p=this.isEnemyWheel?10027008:3355443;if(s&&(s.targetZoneBias>0?(u=54015,d=3.5,f=8448255,p=22015):s.nudgeCheatActive?(u=16711935,d=3.5,f=16744703,p=11141290):s.friction===1?s.wheelTilt>0?(u=11766015,d=3,f=13747433,p=5320104):s.ballMass!==1&&(s.ballMass>1?(u=58998,d=3,f=12187338,p=51283):(u=16771899,d=3,f=16775620,p=16088855)):s.friction<1?(u=8445674,d=3,f=14743546,p=24676):(u=16727296,d=3,f=16752256,p=12000284)),l&&l.length>0){this.ballMesh.visible=!1,this.ballLight&&(this.ballLight.intensity=0);let e=new Set(l.map(e=>e.id)),t=[];for(let n of this.extraBallMeshes.keys())e.has(n)||t.push(n);for(let e of t){let t=this.extraBallMeshes.get(e);t&&(this.group.remove(t),t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose(),this.extraBallMeshes.delete(e))}for(let e of l){let t=this.extraBallMeshes.get(e.id);if(!t){t=new Y(new la(.035,8,8),new xa({color:this.isEnemyWheel?16755370:15658734,roughness:.15,metalness:.9,emissive:this.isEnemyWheel?10027008:3355443})),t.castShadow=!0;let n=new ro(16777215,0,1.2);t.add(n),this.group.add(t),this.extraBallMeshes.set(e.id,t)}t.visible=!0,t.position.x=Math.cos(e.ballAngle)*e.ballRadius,t.position.z=Math.sin(e.ballAngle)*e.ballRadius;let n=.02;e.ballRadius>.88?n=.15:e.ballRadius>.65&&(n=.02+.13*((e.ballRadius-.65)/.22999999999999998));let r=Math.max(0,e.ballHeight-n),i=(e.ballRadius-.65)/.35,a=.061+.03900000000000001*Math.max(0,Math.min(1,i));t.position.y=a+r;let o=t.children[0];if(o&&(o.color.setHex(u),o.intensity=d),t.material){let e=t.material;e.color.setHex(f),e.emissive.setHex(p)}let c=s&&(s.targetZoneBias>0||s.nudgeCheatActive||s.friction!==1||s.wheelTilt>0||s.ballMass!==1),m=l.length>1?.25:.85;if(c&&Math.random()<m&&this.trailGroup){this.sharedTrailGeo||=new la(.018,4,4);let e=new J({color:u,transparent:!0,opacity:.8,fog:!1}),n=new Y(this.sharedTrailGeo,e);n.position.copy(t.position),n.userData={age:0,maxAge:12},this.trailGroup.add(n)}}}else{this.clearExtraBalls(),this.ballMesh.visible=!0,this.ballMesh.position.x=Math.cos(t)*n,this.ballMesh.position.z=Math.sin(t)*n;let e=.02;n>.88?e=.15:n>.65&&(e=.02+.13*((n-.65)/.22999999999999998));let i=Math.max(0,r-e),a=(n-.65)/.35,o=.061+.03900000000000001*Math.max(0,Math.min(1,a));if(this.ballMesh.position.y=o+i,this.ballLight&&(this.ballLight.color.setHex(u),this.ballLight.intensity=d),this.ballMesh&&this.ballMesh.material){let e=this.ballMesh.material;e.color.setHex(f),e.emissive.setHex(p)}let c=s&&(s.targetZoneBias>0||s.nudgeCheatActive||s.friction!==1||s.wheelTilt>0||s.ballMass!==1),l=Math.abs(this.ballMesh.position.x-(this.lastBallX||0))+Math.abs(this.ballMesh.position.z-(this.lastBallZ||0));if(this.lastBallX=this.ballMesh.position.x,this.lastBallZ=this.ballMesh.position.z,c&&l>.005&&Math.random()<.85&&this.trailGroup){this.sharedTrailGeo||=new la(.018,4,4);let e=new J({color:u,transparent:!0,opacity:.8,fog:!1}),t=new Y(this.sharedTrailGeo,e);t.position.copy(this.ballMesh.position),t.userData={age:0,maxAge:12},this.trailGroup.add(t)}}if(this.trailGroup)for(let e=this.trailGroup.children.length-1;e>=0;e--){let t=this.trailGroup.children[e];t.userData.age+=1;let n=t.userData.age/t.userData.maxAge,r=1-n;t.scale.set(r,r,r);let i=t.material;i.opacity=.8*(1-n),t.userData.age>=t.userData.maxAge&&(this.trailGroup.remove(t),t.geometry!==this.sharedTrailGeo&&t.geometry.dispose(),i.dispose())}if(this.highlightMesh)if(i&&a>=0&&a<o.numbers.length){let e=o.numbers[a],t=c(e,o),n=16777215;t===`red`?n=16711680:t===`green`?n=65280:t===`black`?n=4473924:t===`gold`?n=16766720:t===`purple`?n=10233776:t===`cyan`?n=48340:t===`crimson`&&(n=16711807);let r=this.highlightMesh.material;r.color.setHex(n);let i=Math.PI*2/o.numbers.length;this.highlightMesh.rotation.z=-a*i,r.opacity=.5+Math.sin(Date.now()*.01)*.3,this.highlightMesh.visible=!0}else{let e=this.highlightMesh.material;e.opacity=0,this.highlightMesh.visible=!1}}},Kl=class{mesh;targetPosition=new W;targetRotation=new Tn;canvas;ctx;texture;card;isPointsMode;lastTurnsLeft;constructor(e,t=!1){this.card=e,this.isPointsMode=t,this.canvas=document.createElement(`canvas`),this.canvas.width=512,this.canvas.height=720,this.ctx=this.canvas.getContext(`2d`),this.texture=new Qi(this.canvas),this.texture.colorSpace=bt,this.drawCardFace();let n=new na(.11,.16,.002),r=new J({color:e.rarity===`legendary`?2098988:e.rarity===`rare`?4007688:e.rarity===`uncommon`?989217:2955794,fog:!1}),i=new J({color:e.rarity===`legendary`?11877396:e.rarity===`rare`?9202963:e.rarity===`uncommon`?2245202:6045747,fog:!1}),a=[i,i,i,i,new J({map:this.texture,fog:!1}),r];this.mesh=new Y(n,a),this.mesh.castShadow=!0,this.mesh.userData={cardId:e.id}}drawCardFace(e){let t=this.ctx,n=this.canvas,i=this.card,a=this.isPointsMode;if(t.clearRect(0,0,n.width,n.height),i.rarity===`legendary`){let e=t.createLinearGradient(0,0,n.width,n.height);e.addColorStop(0,`#250830`),e.addColorStop(.5,`#09020d`),e.addColorStop(1,`#250830`),t.fillStyle=e}else if(i.rarity===`rare`){let e=t.createLinearGradient(0,0,n.width,n.height);e.addColorStop(0,`#2d1b06`),e.addColorStop(.5,`#120b02`),e.addColorStop(1,`#2d1b06`),t.fillStyle=e}else if(i.rarity===`uncommon`){let e=t.createLinearGradient(0,0,0,n.height);e.addColorStop(0,`#0c1520`),e.addColorStop(1,`#05080c`),t.fillStyle=e}else t.fillStyle=`#1e1610`;t.fillRect(0,0,n.width,n.height),i.rarity===`legendary`?t.strokeStyle=`#ff5722`:i.rarity===`rare`?t.strokeStyle=`#ffd700`:i.rarity===`uncommon`?t.strokeStyle=`#4fc3f7`:t.strokeStyle=i.type===`physics`?`#64b5f6`:i.type===`board`?`#81c784`:i.type===`payout`?`#e57373`:i.type===`chaos`?`#e040fb`:i.type===`paint`?`#ff9100`:i.type===`money`?`#00e676`:`#ffd54f`,t.lineWidth=24,t.strokeRect(12,12,n.width-24,n.height-24),t.fillStyle=i.rarity===`legendary`?`#380a47`:i.rarity===`rare`?`#3d2b0e`:i.rarity===`uncommon`?`#122030`:`#2d2218`,t.fillRect(24,24,n.width-48,120),t.fillStyle=i.rarity===`legendary`?`#ff5722`:i.rarity===`rare`?`#ffd700`:`#ffb300`,t.font=`bold 48px "Courier Prime", monospace`,t.fillText(`${i.cost}⚡`,n.width-120,96),t.fillStyle=`#ffffff`,t.font=`bold 36px "Courier Prime", monospace`,t.fillText(i.name.substring(0,16),48,96),t.fillStyle=i.rarity===`legendary`?`#ff5722`:i.rarity===`rare`?`#ffd700`:i.rarity===`uncommon`?`#4fc3f7`:`#aaaaaa`,t.font=`bold italic 26px "Courier Prime", monospace`,t.fillText(`${i.type.toUpperCase()} · ${i.rarity.toUpperCase()}`,48,190),t.fillStyle=i.rarity===`legendary`?`#1c0525`:i.rarity===`rare`?`#201608`:i.rarity===`uncommon`?`#0d131a`:`#17110c`,t.fillRect(48,220,n.width-96,220),t.strokeStyle=i.rarity===`legendary`?`#ff5722`:i.rarity===`rare`?`#ffd700`:i.rarity===`uncommon`?`#4fc3f7`:`#3e2f22`,t.lineWidth=8,t.strokeRect(60,230,n.width-120,200),t.fillStyle=t.strokeStyle,i.type===`physics`?(t.beginPath(),t.arc(256,330,60,0,Math.PI*2),t.stroke()):i.type===`chaos`?(t.beginPath(),t.arc(256,330,60,0,Math.PI*2),t.stroke(),t.beginPath(),t.arc(256,330,36,0,Math.PI*2),t.stroke(),t.beginPath(),t.arc(256,330,16,0,Math.PI*2),t.stroke()):i.type===`board`?t.fillRect(200,270,112,112):i.type===`payout`?(t.font=`bold 72px "Courier Prime", monospace`,t.fillStyle=i.rarity===`legendary`?`#ff5722`:i.rarity===`rare`?`#ffd700`:`#e57373`,t.fillText(`x2.5`,180,350)):i.type===`paint`?(t.beginPath(),t.arc(256,340,40,0,Math.PI),t.lineTo(256,260),t.closePath(),t.fill(),t.stroke()):i.type===`money`?(t.font=`bold 96px "Courier Prime", Courier, monospace`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(`$`,256,330),t.strokeText(`$`,256,330),t.textAlign=`left`):t.fillRect(216,290,80,80),i.rarity===`legendary`?(t.fillStyle=`#ff5722`,t.font=`32px "Courier Prime", monospace`,t.fillText(`★ ★ ★ ★`,n.width-200,270)):i.rarity===`rare`?(t.fillStyle=`#ffd700`,t.font=`32px "Courier Prime", monospace`,t.fillText(`★ ★ ★`,n.width-180,270)):i.rarity===`uncommon`&&(t.fillStyle=`#4fc3f7`,t.font=`32px "Courier Prime", monospace`,t.fillText(`★ ★`,n.width-160,270)),t.fillStyle=`#dddddd`,t.font=`28px "Courier Prime", monospace`;let o=r(i.description,a).split(` `),s=``,c=490;for(let e=0;e<o.length;e++){let r=s+o[e]+` `;t.measureText(r).width>n.width-96&&e>0?(t.fillText(s,48,c),s=o[e]+` `,c+=40):s=r}t.fillText(s,48,c);let l=new Set([`CRIMSON_SURGE`,`DARK_FURY`,`LUCKY_SEVEN`,`UNLUCKY_THIRTEEN`,`JACKPOT_TRIO`,`DEVILS_TRIO`,`ZERO_HERO`,`EMERALD_FOREST`,`LOAN_SHARK`,`ZERO_ECLIPSE`,`MONOCHROME_EYE`,`CHIP_MINE`,`SHIELD_GENERATOR`,`LIFE_FOUNTAIN`,`DANGER_ZONE`,`VOID_HOLE`,`MIRROR_SLOT`]).has(i.effectId);e!==void 0&&e>0?(t.fillStyle=`rgba(255, 87, 34, 0.85)`,t.fillRect(24,312*2,n.width-48,60),t.strokeStyle=`#ffffff`,t.lineWidth=1.5*2,t.strokeRect(24,312*2,n.width-48,60),t.fillStyle=`#ffffff`,t.font=`bold 24px "Courier Prime", monospace`,t.textAlign=`center`,t.fillText(`ACTIVE: ${e} SPINS LEFT`,n.width/2,330*2),t.textAlign=`left`):l&&(t.fillStyle=`rgba(156, 39, 176, 0.85)`,t.fillRect(24,312*2,n.width-48,60),t.strokeStyle=`#ffffff`,t.lineWidth=1.5*2,t.strokeRect(24,312*2,n.width-48,60),t.fillStyle=`#ffffff`,t.font=`bold 24px "Courier Prime", monospace`,t.textAlign=`center`,t.fillText(`ACTIVE: FIGHT-LONG`,n.width/2,330*2),t.textAlign=`left`)}updatePersistentState(e){this.lastTurnsLeft!==e&&(this.lastTurnsLeft=e,this.drawCardFace(e),this.texture.needsUpdate=!0)}update(e=.15){this.mesh.position.lerp(this.targetPosition,e);let t=new Kt().setFromEuler(this.targetRotation);this.mesh.quaternion.slerp(t,e)}},ql=class{group;head;leftEye;rightEye;currentSpriteName=``;constructor(){this.group=new Un,this.rebuildEnemy(`gambler`)}rebuildEnemy(e){if(this.currentSpriteName===e&&this.group.children.length>0)return;for(this.currentSpriteName=e;this.group.children.length>0;){let e=this.group.children[0];this.group.remove(e),e.geometry&&e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(e=>e.dispose()):e.material&&e.material.dispose()}let t=2236962,n=15655911,r=16711680,i=`box`,a=0,o=.8;e===`decay_wheel`?(t=4082229,n=8227959,r=65348,i=`sphere`):e===`croupier`?(t=1710618,n=15655911,r=10027008,i=`box`):e===`wraith`?(t=6164243,n=11018794,r=16777215,i=`cylinder`):e===`dealer_claw`?(t=4069470,n=16766720,r=65535,i=`box`,a=.85,o=.3):e===`the_house`&&(t=789517,n=1118481,r=16729088,i=`box`);let s=new Y(new ia(.4,1.8,4),new Z({color:t,shininess:a>0?50:10}));s.position.y=.9,s.rotation.y=Math.PI/4,s.castShadow=!0,s.receiveShadow=!0,this.group.add(s);let c=new Y(new X(.12,.15,.25,6),new Z({color:3355443,shininess:10}));c.position.y=1.8,this.group.add(c);let l;l=i===`sphere`?new la(.26,6,6):i===`cylinder`?new X(.2,.24,.5,6):new na(.5,.5,.5);let u=new xa({color:n,metalness:a,roughness:o});this.head=new Y(l,u),this.head.position.y=2.1,this.head.castShadow=!0,this.group.add(this.head);let d=new X(.04,.04,.08,6),f=new J({color:r});this.leftEye=new Y(d,f),this.leftEye.rotation.x=Math.PI/2,this.leftEye.position.set(-.13,2.15,.24),this.group.add(this.leftEye),this.rightEye=new Y(d,f),this.rightEye.rotation.x=Math.PI/2,this.rightEye.position.set(.13,2.15,.24),this.group.add(this.rightEye)}update(e){this.group.position.y=Math.sin(e*2)*.02,Math.sin(e*.5)>.95&&Math.random()<.05?(this.head.rotation.y=(Math.random()-.5)*.4,this.head.rotation.x=(Math.random()-.5)*.2):(this.head.rotation.y*=.95,this.head.rotation.x*=.95)}},Jl=class{mesh;targetPosition=new W;targetRotation=new Tn;cardId;rarity;purchased=!1;constructor(e,t=!1){this.cardId=e.id,this.rarity=e.rarity,this.purchased=e.purchased;let n=document.createElement(`canvas`);n.width=256,n.height=360;let i=n.getContext(`2d`),a=`#2d251e`,o=`#cd7f32`,s=`BRONZE`,c=.65,l=.6;e.rarity===`silver`?(a=`#1f2429`,o=`#aaaaaa`,s=`SILVER`,c=.55,l=.75):e.rarity===`gold`&&(a=`#2b2408`,o=`#ffd700`,s=`GOLD`,c=.45,l=.85),i.fillStyle=a,i.fillRect(0,0,n.width,n.height),i.strokeStyle=`rgba(255, 255, 255, 0.03)`,i.lineWidth=1;for(let e=0;e<n.width;e+=16)i.beginPath(),i.moveTo(e,0),i.lineTo(e,n.height),i.stroke();for(let e=0;e<n.height;e+=16)i.beginPath(),i.moveTo(0,e),i.lineTo(n.width,e),i.stroke();i.strokeStyle=o,i.lineWidth=14,i.strokeRect(7,7,n.width-14,n.height-14),i.strokeStyle=`rgba(255, 255, 255, 0.15)`,i.lineWidth=2,i.strokeRect(16,16,n.width-32,n.height-32),i.fillStyle=`rgba(0, 0, 0, 0.4)`,i.fillRect(18,18,n.width-36,56),i.fillStyle=`#ffffff`,i.font=`bold 15px Courier New`,i.textAlign=`left`,i.fillText(e.name,28,40),i.fillStyle=o,i.font=`bold 20px Courier New`,i.textAlign=`right`,i.fillText(`${e.cost}⚡`,n.width-28,62),i.fillStyle=o,i.font=`bold italic 13px Courier New`,i.textAlign=`left`,i.fillText(s,28,92),i.fillStyle=`rgba(0, 0, 0, 0.5)`,i.fillRect(24,110,n.width-48,110),i.strokeStyle=o,i.lineWidth=3,i.strokeRect(24,110,n.width-48,110),i.save(),i.fillStyle=`rgba(255, 255, 255, 0.08)`,i.fillRect(50,120,n.width-100,90),i.strokeStyle=o,i.lineWidth=4,i.beginPath(),i.moveTo(98,185),i.lineTo(158,185),i.lineTo(148,165),i.lineTo(108,165),i.closePath(),i.fillStyle=o,i.fill(),i.stroke(),i.strokeRect(118,185,20,15),i.translate(128,140),i.rotate(-Math.PI/6),i.fillStyle=`rgba(255,255,255,0.7)`,i.fillRect(-10,-5,20,10),i.fillStyle=`#8b5a2b`,i.fillRect(-2,5,4,15),i.restore(),i.fillStyle=`#dddddd`,i.font=`14px Courier New`,i.textAlign=`left`;let u=r(e.description,t).split(` `),d=``,f=245;for(let e=0;e<u.length;e++){let t=d+u[e]+` `;i.measureText(t).width>n.width-48&&e>0?(i.fillText(d,24,f),d=u[e]+` `,f+=20):d=t}i.fillText(d,24,f),e.purchased&&(i.fillStyle=`rgba(0, 0, 0, 0.75)`,i.fillRect(10,10,n.width-20,n.height-20),i.fillStyle=o,i.font=`bold 36px Courier New`,i.textAlign=`center`,i.fillText(`OWNED`,n.width/2,n.height/2+10));let p=new Qi(n);p.colorSpace=bt,p.needsUpdate=!0;let m=new na(.38,.54,.008),h=e.rarity===`gold`?16766720:e.rarity===`silver`?13421772:13467442,g=new xa({color:e.purchased?1118481:h,metalness:e.purchased?0:l,roughness:e.purchased?.9:c+.2,bumpScale:.05}),_=new xa({color:e.purchased?1118481:h,metalness:e.purchased?0:l,roughness:e.purchased?.9:c}),v=[_,_,_,_,new Sa({map:p}),g];this.mesh=new Y(m,v),this.mesh.castShadow=!0,this.mesh.userData={isForgeCard:!0,forgeCardId:e.id}}update(e=.15){this.mesh.position.lerp(this.targetPosition,e);let t=new Kt().setFromEuler(this.targetRotation);this.mesh.quaternion.slerp(t,e)}},Yl=class{mesh;targetPosition=new W;targetRotation=new Tn;itemId;itemType;cost;purchased=!1;constructor(e,t,n,i,a=!1){this.itemType=e,this.itemId=n,this.purchased=i,this.cost=t.cost;let o=document.createElement(`canvas`);o.width=256,o.height=360;let s=o.getContext(`2d`),c=`#181224`,l=`#6a4c9c`,u=.5,d=.5;if(e===`card`){let e=t.rarity||`common`;e===`common`?(c=`#22252a`,l=`#aaaaaa`,u=.6,d=.4):e===`uncommon`?(c=`#1e2836`,l=`#00bcd4`,u=.5,d=.6):e===`rare`?(c=`#2b271a`,l=`#ffd700`,u=.4,d=.8):e===`legendary`&&(c=`#331f24`,l=`#ff5722`,u=.35,d=.9)}else e===`upgrade`?(c=`#1a1329`,l=`#b388ff`,u=.45,d=.7):e===`heal`&&(c=`#2d0a06`,l=`#ff1744`,u=.7,d=.2);s.fillStyle=c,s.fillRect(0,0,o.width,o.height),s.strokeStyle=`rgba(255, 255, 255, 0.03)`,s.lineWidth=1;for(let e=0;e<o.width;e+=16)s.beginPath(),s.moveTo(e,0),s.lineTo(e,o.height),s.stroke();for(let e=0;e<o.height;e+=16)s.beginPath(),s.moveTo(0,e),s.lineTo(o.width,e),s.stroke();s.strokeStyle=l,s.lineWidth=12,s.strokeRect(6,6,o.width-12,o.height-12),s.strokeStyle=`rgba(255, 255, 255, 0.15)`,s.lineWidth=2,s.strokeRect(16,16,o.width-32,o.height-32),s.fillStyle=`rgba(0, 0, 0, 0.4)`,s.fillRect(18,18,o.width-36,50),s.fillStyle=`#ffffff`,s.font=`bold 15px "Courier Prime", monospace`,s.fillText(t.name.toUpperCase(),24,48),s.fillStyle=l,s.font=`bold 18px "Courier Prime", monospace`,s.textAlign=`right`,s.fillText(`${t.cost}⚡`,o.width-28,48),s.textAlign=`left`,s.fillStyle=`rgba(255, 255, 255, 0.4)`,s.font=`bold 11px "Courier Prime", monospace`;let f=e===`card`?`${t.type} · ${t.rarity}`.toUpperCase():e===`heal`?`RECOVERY`:`BOARD UPGRADE`;s.fillText(f,24,90),s.fillStyle=`#dddddd`,s.font=`bold 12px "Courier Prime", monospace`;let p=r(t.description||``,a).split(` `),m=``,h=120;for(let e=0;e<p.length;e++){let t=m+p[e]+` `;s.measureText(t).width>o.width-48&&e>0?(s.fillText(m,24,h),m=p[e]+` `,h+=18):m=t}s.fillText(m,24,h),s.fillStyle=`rgba(0, 0, 0, 0.2)`,s.fillRect(24,210,o.width-48,120),s.strokeStyle=`rgba(255, 255, 255, 0.05)`,s.strokeRect(28,214,o.width-56,112),s.fillStyle=l,s.font=`bold 42px "Courier Prime", monospace`,s.textAlign=`center`,s.textBaseline=`middle`;let g=e===`heal`?`🩸`:e===`upgrade`?`⚙️`:`🃏`;s.fillText(g,o.width/2,270),s.textBaseline=`alphabetic`,s.textAlign=`left`,this.purchased&&(s.save(),s.translate(o.width/2,o.height/2),s.rotate(-Math.PI/12),s.fillStyle=`rgba(255, 0, 80, 0.15)`,s.fillRect(-100,-30,200,60),s.strokeStyle=`#ff0050`,s.lineWidth=4,s.strokeRect(-100,-30,200,60),s.fillStyle=`#ff0050`,s.font=`bold 36px "Courier Prime", monospace`,s.textAlign=`center`,s.textBaseline=`middle`,s.fillText(e===`upgrade`?`OWNED`:`SOLD`,0,0),s.restore());let _=new Qi(o);_.colorSpace=bt,_.needsUpdate=!0;let v=new na(.18,.25,.004),y=e===`heal`?2951686:1577508,b=new Z({color:y,shininess:10,fog:!1}),x=new Z({color:y,shininess:10,fog:!1}),S=new xa({map:_,metalness:this.purchased?.1:d,roughness:this.purchased?.9:u,fog:!1});this.mesh=new Y(v,[x,x,x,x,S,b]),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.userData={isShopItem:!0,shopItemIdx:n,shopItemType:e}}update(e){this.mesh.position.lerp(this.targetPosition,.08);let t=new Kt().setFromEuler(this.targetRotation);this.mesh.quaternion.slerp(t,.08)}},Xl=class{mesh;targetPosition=new W;targetRotation=new Tn;choiceId;constructor(e,t,n,i,a=!1){this.choiceId=e;let o=document.createElement(`canvas`);o.width=256,o.height=360;let s=o.getContext(`2d`);s.fillStyle=`#242b27`,s.fillRect(0,0,o.width,o.height),s.strokeStyle=`rgba(255, 255, 255, 0.02)`,s.lineWidth=2;for(let e=0;e<6;e++)s.beginPath(),s.moveTo(Math.random()*256,0),s.lineTo(Math.random()*256,360),s.stroke();s.strokeStyle=`#4a594f`,s.lineWidth=14,s.strokeRect(7,7,o.width-14,o.height-14),s.strokeStyle=`rgba(255, 255, 255, 0.1)`,s.lineWidth=2,s.strokeRect(16,16,o.width-32,o.height-32),s.fillStyle=`rgba(0, 0, 0, 0.3)`,s.fillRect(18,18,o.width-36,52),s.fillStyle=`#ffffff`,s.font=`bold 15px "Courier Prime", monospace`,s.fillText(t.toUpperCase(),24,48),s.fillStyle=`#81c784`,(n.includes(`Lose`)||n.includes(`cost`))&&(s.fillStyle=`#e57373`),s.font=`bold 11px "Courier Prime", monospace`,s.fillText(n.toUpperCase(),24,90),s.fillStyle=`#dddddd`,s.font=`bold 12px "Courier Prime", monospace`;let c=r(i||``,a).split(` `),l=``,u=120;for(let e=0;e<c.length;e++){let t=l+c[e]+` `;s.measureText(t).width>o.width-48&&e>0?(s.fillText(l,24,u),l=c[e]+` `,u+=18):l=t}s.fillText(l,24,u),s.fillStyle=`rgba(255, 255, 255, 0.05)`,s.font=`bold 72px "Courier Prime", monospace`,s.textAlign=`center`,s.textBaseline=`middle`;let d=[`ᛗ`,`ᛟ`,`ᚦ`,`ᚱ`,`ᚺ`,`ᛊ`],f=d[parseInt(e)%d.length];s.fillText(f,o.width/2,270),s.textBaseline=`alphabetic`,s.textAlign=`left`;let p=new Qi(o);p.colorSpace=bt,p.needsUpdate=!0;let m=new na(.2,.28,.015),h=new Z({color:1975329,shininess:2,fog:!1}),g=new xa({map:p,roughness:.85,metalness:.1,fog:!1});this.mesh=new Y(m,[h,h,h,h,g,h]),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.userData={isEventChoice:!0,eventChoiceId:e}}update(e){this.mesh.position.lerp(this.targetPosition,.08);let t=new Kt().setFromEuler(this.targetRotation);this.mesh.quaternion.slerp(t,.08)}},Zl={uniforms:{tDiffuse:{value:null},uResolution:{value:new U(640,480)}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // 4x4 Bayer Dithering Matrix
    float getDither(vec2 pos) {
      int x = int(mod(pos.x, 4.0));
      int y = int(mod(pos.y, 4.0));
      int index = 0;
      
      if (y == 0) {
        if (x == 0) index = 0;
        else if (x == 1) index = 8;
        else if (x == 2) index = 2;
        else index = 10;
      } 
      else if (y == 1) {
        if (x == 0) index = 12;
        else if (x == 1) index = 4;
        else if (x == 2) index = 14;
        else index = 6;
      } 
      else if (y == 2) {
        if (x == 0) index = 3;
        else if (x == 1) index = 11;
        else if (x == 2) index = 1;
        else index = 9;
      } 
      else {
        if (x == 0) index = 15;
        else if (x == 1) index = 7;
        else if (x == 2) index = 13;
        else index = 5;
      }
      
      // Map index range 0..15 to centered weight [-0.5..0.5]
      return (float(index) / 16.0) - 0.5;
    }

    void main() {
      // 1. Pixelation: Snap UV coords to target low resolution
      vec2 uv = floor(vUv * uResolution) / uResolution;
      vec3 col = texture2D(tDiffuse, uv).rgb;
      
      // 2. Dithering: Apply Bayer matrix dither noise
      vec2 pixelPos = uv * uResolution;
      float ditherStrength = 0.04; // subtle noise to blend gradients
      float dither = getDither(pixelPos) * ditherStrength;
      col += vec3(dither);
      
      // 3. Color Depth Reduction: Banding to 6-bits per channel (64 levels)
      float colorSteps = 64.0;
      col = floor(col * colorSteps) / colorSteps;
      
      gl_FragColor = vec4(col, 1.0);
    }
  `},Ql=class{engine;container;sound;scene;handScene;camera;renderer;renderTarget;postScene;postCamera;postMaterial;wheelVis;enemyWheelVis;enemyVis;tableMesh;playerFeltMesh;enemyFeltMesh;bookMesh;bookTexture;bookCanvas;lastBookStateKey=``;isBookZoomed=!1;lastPlayerWheelId=null;lastBoardHash=``;handGroup;bellGroup;bellPlunger;bellShakeTime=0;bulbGroup;bulbLight;bulbMaterial;ambientLight;wheelSpotlight;feltSpotlight;dustGeometry;dustPoints;chipMeshes=[];lastBetsHash=``;lastDrawPileCount=-1;chipMaterials;cardVisuals=[];hoveredCardId=null;selectedCardId=null;heldCardId=null;heldCardTimer=null;playedCardVisuals=[];playedCardsGroup;forgeScene;forgeCardsGroup;forgeCardsVisuals=[];forgeSparksGroup;forgeSparks=[];forgeFurnaceLight;forgePedestal;hoveredForgeCardId=null;lastHoveredForgeCardId=null;onForgeCardHover;onForgeCardClicked;playerOutsideBets=[];enemyOutsideBets=[];shopScene;shopItemsVisuals=[];shopCardsGroup;hoveredShopItemId=null;eventScene;eventChoicesVisuals=[];eventChoicesGroup;hoveredEventChoiceId=null;selectedShopItemId=null;selectedEventChoiceId=null;shopBellGroup;shopBellPlunger;shopBellShakeTime=0;shopCandleLight;eventLeftTorchLight;eventRightTorchLight;ui=null;raycaster=new wo;mouse=new U(-999,-999);manualView=4;activeView=4;activeHandCardIndex=0;lastVerticalView=4;boardHorizontalOffset=0;dragStartOffset=0;isDraggingBoard=!1;isDraggingOverview=!1;labelsMesh=null;deckMeshes=[];overviewPanOffsetX=0;overviewPanOffsetY=0;deckCostMesh=null;lastDrawCardCost=-1;hasFocusedDeckThisTurn=!1;lastTurnIndex=-1;cameraTargetPos=new W(0,1.85,1.55);cameraTargetLookAt=new W(0,.15,-.2);cameraCurrentLookAt=new W(0,.15,-.2);wasInBattle=!1;curseGroup=null;lastCurseId=null;oppActionCardMesh=null;oppAnimTime=0;oppAnimType=`none`;oppAnimChips=[];oppAnimChipsStart=new W;oppAnimChipsEnd=new W;onSpinSettled;lastPhysicsTime=0;physicsAccumulator=0;fpsLastTime=0;fpsFrames=0;fpsHistory=[];maxFpsHistory=80;isDragging=!1;dragDenom=0;draggedDenomMesh=null;dragPlane=new zi(new W(0,1,0),-.02);activeHoveredCell=null;sliderHandle;displayPanelMesh;displayPanelTex;displayPanelCanvas;clearCoin;rebetCoin;doubleCoin;sacrificeCoin;activeBrush=1;isDraggingSlider=!1;isPainting=!1;paintMode=null;lastHoveredCellPaint=null;brushIndicatorMesh=null;brushIndicatorTextSprite=null;clearCoinShakeTime=0;rebetCoinShakeTime=0;doubleCoinShakeTime=0;sacrificeCoinShakeTime=0;RENDER_WIDTH=1920;RENDER_HEIGHT=1440;onCardClicked;onPlayedCardClicked;onBellClicked;onBetPlaced;onBounce;constructor(e,t,n){this.engine=e,this.container=t,this.sound=n,this.initThree(),this.buildScene(),this.buildForgeScene(),this.buildShopScene(),this.buildEventScene(),this.setupPostProcessing(),this.setupEvents(),this.animate(0)}initThree(){this.scene=new Qn,this.scene.fog=new Zn(656643,.08),this.camera=new $a(50,this.container.clientWidth/this.container.clientHeight,.01,100),this.camera.position.set(0,1.4,1.5),this.handScene=new Qn,this.handGroup=new Un,this.camera.add(this.handGroup),this.handScene.add(this.camera),this.playedCardsGroup=new Un,this.scene.add(this.playedCardsGroup),this.renderer=new Wl({antialias:!1}),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=2,this.container.appendChild(this.renderer.domElement)}setView(e){this.manualView=e}handleMobileSwipe(e){if(!(!this.ui||!this.ui.mobileModeActive)){if(e===`up`)this.activeView===7?(this.ui.setCurrentView(5),this.sound.playCardSwoosh()):this.activeView===5?(this.ui.setCurrentView(3),this.sound.playCardSwoosh()):this.activeView===3||this.activeView===6?(this.ui.setCurrentView(2),this.sound.playCardSwoosh()):this.activeView===2||this.activeView===9?(this.ui.setCurrentView(1),this.sound.playCardSwoosh()):this.activeView===1&&(this.ui.setCurrentView(4),this.sound.playCardSwoosh());else if(e===`down`)this.activeView===4?(this.ui.setCurrentView(1),this.sound.playCardSwoosh()):this.activeView===1?(this.ui.setCurrentView(2),this.sound.playCardSwoosh()):this.activeView===2||this.activeView===9?(this.ui.setCurrentView(3),this.sound.playCardSwoosh()):this.activeView===3||this.activeView===6?(this.ui.setCurrentView(5),this.sound.playCardSwoosh()):this.activeView===5&&(this.ui.setCurrentView(7),this.sound.playCardSwoosh());else if(e===`left`||e===`right`)if(this.activeView===1){let t=this.cardVisuals.length;t>0&&(e===`left`?this.activeHandCardIndex<t-1&&(this.activeHandCardIndex++,this.sound.playCardSwoosh()):this.activeHandCardIndex>0&&(this.activeHandCardIndex--,this.sound.playCardSwoosh()))}else this.activeView===3?e===`left`&&(this.ui.setCurrentView(6),this.sound.playCardSwoosh()):this.activeView===6&&e===`right`&&(this.ui.setCurrentView(3),this.sound.playCardSwoosh())}}getActiveWheel(){let e=this.engine.battleState;return e?e.activeWheelOwner===`enemy`?e.enemyWheel:e.playerWheel:this.engine.runState.playerWheel}rebuildWheelsForCombat(){let e=this.engine.battleState;if(!e)return;let t=e.activeWheelOwner===`enemy`,n={extraGreenSlots:0,convertNumbersToRed:[],convertNumbersToBlack:[],payoutMultipliers:{red:2,black:2,green:14,number:36,odd:2,even:2}};if(this.wheelVis.rebuildWheel(!1,e.playerWheel,t?[]:e.predictionSector||[],e.boardModifiers),this.enemyWheelVis.rebuildWheel(!0,e.enemyWheel,t&&e.predictionSector||[],n),this.enemyVis.rebuildEnemy(e.enemy.spriteName),this.wheelVis.setBallVisible(!0),this.enemyWheelVis.setBallVisible(!0),this.playerFeltMesh){let t=this.playerFeltMesh.material;t.map&&t.map.dispose(),t.dispose(),this.playerFeltMesh.material=new J({map:this.createFeltTexture(!1,e.boardModifiers),fog:!1})}if(this.enemyFeltMesh){let e=this.enemyFeltMesh.material;e.map&&e.map.dispose(),e.dispose(),this.enemyFeltMesh.material=new J({map:this.createFeltTexture(!0,n),fog:!1})}}updateCurseVisual(){let e=this.engine.battleState?.curse,t=e?e.id:null;if(t===this.lastCurseId||(this.lastCurseId=t,this.curseGroup&&=(this.scene.remove(this.curseGroup),this.curseGroup.traverse(e=>{e instanceof Y&&(e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.dispose()):e.material.dispose()))}),null),!e||!t))return;this.curseGroup=new Un,this.curseGroup.position.set(.45,.005,-2.35),this.scene.add(this.curseGroup);let n=new Y(new X(.08,.09,.1,8),new Z({color:1117192,shininess:5}));n.position.y=.05,n.castShadow=!0,n.receiveShadow=!0,this.curseGroup.add(n);let r=new Un;if(r.position.y=.22,r.name=`curseCore`,this.curseGroup.add(r),t===`faraday`){let e=new Y(new X(.015,.015,.14,6),new xa({color:12088115,metalness:.9,roughness:.1}));r.add(e);for(let e=0;e<3;e++){let t=new Y(new ua(.04,.006,4,12),new xa({color:8947848,metalness:.9,roughness:.1}));t.rotation.x=Math.PI/2+(e-1)*.4,t.rotation.y=(e-1)*.3,t.name=`ring_${e}`,r.add(t)}}else if(t===`fog`){let e=new Y(new la(.04,8,8),new Z({color:3355443,emissive:1118481,transparent:!0,opacity:.85}));r.add(e);for(let e=0;e<4;e++){let t=new Y(new na(.01,.01,.01),new J({color:7829367})),n=e/4*Math.PI*2;t.position.set(Math.cos(n)*.06,(Math.random()-.5)*.06,Math.sin(n)*.06),t.name=`dot_${e}`,r.add(t)}}else if(t===`rust`){let e=new X(.045,.045,.02,5),t=new Z({color:9127187,shininess:2}),n=new Y(e,t);n.rotation.x=Math.PI/2,r.add(n);let i=new Y(new X(.025,.025,.015,5),t);i.position.set(.03,.03,.02),i.rotation.x=Math.PI/2,i.name=`smallGear`,r.add(i)}else if(t===`greed`){let e=new Y(new na(.035,.01,.035),new xa({color:13938487,metalness:.9,roughness:.1}));e.position.set(-.01,-.02,.01),e.rotation.y=.5,r.add(e);let t=new Y(new na(.03,.012,.03),new xa({color:1118481,metalness:.5,roughness:.8}));t.position.set(.01,.01,-.01),t.rotation.y=-.4,r.add(t)}else if(t===`avarice`){let e=new Y(new ua(.03,.005,4,10),new Z({color:13373713}));e.name=`innerRing`;let t=new Y(new ua(.045,.005,4,10),new Z({color:1118668}));t.rotation.y=Math.PI/2,t.name=`outerRing`,r.add(e),r.add(t)}else if(t===`fragile`){let e=new Y(new X(.025,.035,.06,6),new Z({color:9132587}));e.position.y=-.02,r.add(e);let t=new Y(new X(.015,.025,.04,6),new Z({color:9132587}));t.position.y=.03,r.add(t)}else if(t===`eclipse`){let e=new Y(new la(.03,6,6),new J({color:1118481}));r.add(e);let t=new Y(new ua(.045,.004,3,12,Math.PI*1.5),new J({color:16724736}));t.rotation.x=Math.PI/4,t.name=`crescent`,r.add(t)}else if(t===`curse`){let e=new Z({color:11145489,shininess:80});for(let t=0;t<3;t++){let n=new Y(new ia(.015,.09,4),e);n.position.set((t-1)*.02,0,0),n.rotation.set((t-1)*.5,0,(t-1)*.3),n.name=`spike_${t}`,r.add(n)}}else if(t===`lead`){let e=new Y(new na(.045,.09,.035),new Z({color:5592412,shininess:5}));e.rotation.y=.3,r.add(e)}else if(t===`choked`){let e=new xa({color:3355443,metalness:.8,roughness:.2});for(let t=0;t<2;t++){let n=new Y(new ua(.035,.004,4,8),e);n.rotation.x=Math.PI/2,n.rotation.y=Math.PI/2*t,n.position.y=(t-.5)*.02,n.name=`cage_${t}`,r.add(n)}}}buildScene(){let e=new na(6,.1,6),t=new Z({color:4007194,shininess:15});this.tableMesh=new Y(e,t),this.tableMesh.position.y=-.05,this.tableMesh.receiveShadow=!0,this.scene.add(this.tableMesh);let n={id:`classic`,name:`Classic`,description:``,numbers:[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26],greenNumbers:[0],colors:{},payoutMultipliers:{red:2,black:2,green:14,number:36,odd:2,even:2},upgrades:[]};this.wheelVis=new Gl(!1,n),this.wheelVis.group.position.set(-.8,.05,-.75),this.wheelVis.group.scale.set(.55,.55,.55),this.scene.add(this.wheelVis.group),this.enemyWheelVis=new Gl(!0,n),this.enemyWheelVis.group.position.set(.8,.05,-.75),this.enemyWheelVis.group.scale.set(.55,.55,.55),this.scene.add(this.enemyWheelVis.group);let r=new sa(1.2,.55),i=new J({map:this.createFeltTexture(!1),fog:!1});this.playerFeltMesh=new Y(r,i),this.playerFeltMesh.rotation.x=-Math.PI/2,this.playerFeltMesh.position.set(0,.005,.45),this.scene.add(this.playerFeltMesh);let a=new J({map:this.createFeltTexture(!0),fog:!1});this.enemyFeltMesh=new Y(r,a),this.enemyFeltMesh.rotation.set(-Math.PI/2,0,Math.PI),this.enemyFeltMesh.position.set(0,.005,-1.95),this.scene.add(this.enemyFeltMesh),this.chipMaterials={red:new Z({color:15022389,shininess:40}),black:new Z({color:3355443,shininess:40}),green:new Z({color:4431943,shininess:40}),number:new Z({color:16766287,shininess:60}),blue:new Z({color:166097,shininess:40}),gold:new Z({color:16766720,shininess:60}),purple:new Z({color:10233776,shininess:40}),cyan:new Z({color:48340,shininess:40}),crimson:new Z({color:16711807,shininess:40})},this.bellGroup=new Un,this.bellGroup.position.set(.72,.005,.55),this.scene.add(this.bellGroup);let o=new Y(new X(.06,.065,.015,10),new Z({color:1710618,shininess:20}));o.receiveShadow=!0,o.castShadow=!0,o.userData={isBell:!0},this.bellGroup.add(o);let s=new Y(new X(.045,.05,.04,12),new Z({color:13467442,shininess:80}));s.position.y=.025,s.castShadow=!0,s.userData={isBell:!0},this.bellGroup.add(s);let c=new X(.006,.006,.03,8),l=new Z({color:10066329,shininess:70});this.bellPlunger=new Y(c,l),this.bellPlunger.position.y=.055,this.bellPlunger.castShadow=!0,this.bellPlunger.userData={isBell:!0},this.bellGroup.add(this.bellPlunger);let u=new Y(new X(.012,.012,.006,8),l);u.position.y=.015,u.userData={isBell:!0},this.bellPlunger.add(u);let d=document.createElement(`canvas`);d.width=1024,d.height=256;let f=d.getContext(`2d`);f.fillStyle=`#2b1b14`,f.fillRect(0,0,1024,256),f.strokeStyle=`#c59f51`,f.lineWidth=12,f.strokeRect(6,6,1012,244),f.fillStyle=`#ffffff`,f.font=`bold 72px "Courier Prime", monospace`,f.textAlign=`center`,f.textBaseline=`middle`,f.fillText(`10 ⚡`,1024/6,128),f.fillText(`5 ⚡`,1024/2,128),f.fillText(`1 ⚡`,1024*5/6,128);let p=new Qi(d);p.colorSpace=bt,p.needsUpdate=!0;let m=new sa(.32,.08),h=new J({map:p,fog:!1});this.labelsMesh=new Y(m,h),this.labelsMesh.rotation.x=-Math.PI/2,this.labelsMesh.position.set(.53,.006,.9),this.scene.add(this.labelsMesh);let g=new Y(new na(.38,.003,.05),new Z({color:2824980,shininess:20}));g.position.set(.1,.005,.9),g.receiveShadow=!0,g.castShadow=!0,this.scene.add(g);let _=new Y(new na(.32,.001,.005),new Z({color:12951377,shininess:80}));_.position.set(0,.002,0),_.userData={isSliderTrack:!0},g.add(_);let v=new X(.015,.015,.012,12),y=new Z({color:12951377,shininess:90});this.sliderHandle=new Y(v,y),this.sliderHandle.castShadow=!0,this.sliderHandle.receiveShadow=!0,this.sliderHandle.userData={isSliderHandle:!0},this.sliderHandle.position.set(-.16,.007,0),g.add(this.sliderHandle),this.displayPanelCanvas=document.createElement(`canvas`),this.displayPanelCanvas.width=512,this.displayPanelCanvas.height=128;let b=this.displayPanelCanvas.getContext(`2d`);b.fillStyle=`#2b1b14`,b.fillRect(0,0,512,128),b.strokeStyle=`#c59f51`,b.lineWidth=6,b.strokeRect(3,3,506,122),b.fillStyle=`#ffffff`,b.font=`bold 36px "Courier Prime", monospace`,b.textAlign=`center`,b.textBaseline=`middle`,b.fillText(`BRUSH: ⚡1`,256,64),this.displayPanelTex=new Qi(this.displayPanelCanvas),this.displayPanelTex.colorSpace=bt,this.displayPanelTex.needsUpdate=!0;let x=new sa(.2,.05),S=new J({map:this.displayPanelTex,fog:!1});this.displayPanelMesh=new Y(x,S),this.displayPanelMesh.rotation.x=-Math.PI/2,this.displayPanelMesh.position.set(.1,.006,.83),this.scene.add(this.displayPanelMesh);let C=(e,t,n)=>{let r=document.createElement(`canvas`);r.width=256,r.height=256;let i=r.getContext(`2d`);i.fillStyle=`#1e1e1e`,i.fillRect(0,0,256,256),i.fillStyle=`#`+t.toString(16).padStart(6,`0`),i.beginPath(),i.arc(128,128,110,0,Math.PI*2),i.fill(),i.strokeStyle=`#ffffff`,i.lineWidth=10,i.stroke(),i.fillStyle=`#ffffff`,i.font=`bold 44px "Courier Prime", monospace`,i.textAlign=`center`,i.textBaseline=`middle`,i.fillText(e,128,128);let a=new Qi(r);a.colorSpace=bt,a.needsUpdate=!0;let o=new Y(new X(.022,.022,.006,16),[new Z({color:6710886,shininess:40}),new Z({map:a,shininess:60}),new Z({color:3355443,shininess:20})]);return o.position.set(n,.008,.9),o.castShadow=!0,o.receiveShadow=!0,o};this.clearCoin=C(`CLEAR`,3355443,-.32),this.clearCoin.userData={isClearCoin:!0},this.scene.add(this.clearCoin),this.rebetCoin=C(`REBET`,4431943,-.22),this.rebetCoin.userData={isRebetCoin:!0},this.scene.add(this.rebetCoin),this.doubleCoin=C(`DOUBLE`,16766287,-.12),this.doubleCoin.userData={isDoubleCoin:!0},this.scene.add(this.doubleCoin),this.sacrificeCoin=C(`SACR`,15022389,.32),this.sacrificeCoin.userData={isSacrificeCoin:!0},this.scene.add(this.sacrificeCoin);let w=new X(.02,.02,.006,8),T=new J({color:15022389,transparent:!0,opacity:.6,wireframe:!1});this.brushIndicatorMesh=new Y(w,T),this.brushIndicatorMesh.visible=!1,this.scene.add(this.brushIndicatorMesh);let E=document.createElement(`canvas`);E.width=128,E.height=64;let D=E.getContext(`2d`);D.fillStyle=`rgba(0, 0, 0, 0.75)`,D.strokeStyle=`#ffd700`,D.lineWidth=2,D.beginPath(),D.roundRect(4,4,120,56,8),D.fill(),D.stroke(),D.fillStyle=`#ffffff`,D.font=`bold 24px "Courier Prime", monospace`,D.textAlign=`center`,D.textBaseline=`middle`,D.fillText(`⚡1`,64,32);let O=new Qi(E);O.colorSpace=bt;let k=new Qr({map:O,transparent:!0});this.brushIndicatorTextSprite=new fi(k),this.brushIndicatorTextSprite.scale.set(.12,.06,1),this.brushIndicatorTextSprite.visible=!1,this.scene.add(this.brushIndicatorTextSprite);let A=new na(.22,.31,.006),ee=new J({map:this.createOpponentCardBackTexture(),fog:!1});for(let e=0;e<3;e++){let t=new Y(A,ee);t.rotation.x=-Math.PI/2;let n=(e-1)*.15;t.position.set((e-1)*.16,.006,-2.42-Math.abs(e-1)*.02),t.rotation.z=-n,t.castShadow=!0,this.scene.add(t)}let te=new X(.015,.015,.005,8),j=new Z({color:2236962,shininess:30}),ne=new Z({color:10033947,shininess:30});for(let e=0;e<5;e++){let t=new Y(te,j);t.position.set(-.35+(Math.random()-.5)*.004,.005+e*.006,-2.42+(Math.random()-.5)*.004),this.scene.add(t)}for(let e=0;e<3;e++){let t=new Y(te,ne);t.position.set(-.4+(Math.random()-.5)*.004,.005+e*.006,-2.37+(Math.random()-.5)*.004),this.scene.add(t)}for(let e=0;e<6;e++){let t=new Y(te,ne);t.position.set(.35+(Math.random()-.5)*.004,.005+e*.006,-2.42+(Math.random()-.5)*.004),this.scene.add(t)}this.enemyVis=new ql,this.enemyVis.group.position.set(0,-.15,-3),this.enemyVis.group.scale.set(.68,.68,.68),this.scene.add(this.enemyVis.group);let re=this.createWallTexture();re.wrapS=ae,re.wrapT=ae,re.repeat.set(4,2.5);let ie=new Z({map:re,side:2,shininess:5,fog:!0}),oe=new Y(new sa(8,5),ie);oe.position.set(0,1.5,-3.5),oe.receiveShadow=!0,this.scene.add(oe);let se=new Y(new sa(8,5),ie);se.rotation.y=Math.PI/2,se.position.set(-3,1.5,0),se.receiveShadow=!0,this.scene.add(se);let M=new Y(new sa(8,5),ie);M.rotation.y=-Math.PI/2,M.position.set(3,1.5,0),M.receiveShadow=!0,this.scene.add(M);let ce=this.createCeilingTexture();ce.wrapS=ae,ce.wrapT=ae,ce.repeat.set(4,4);let le=new Y(new sa(8,8),new Z({map:ce,side:2,shininess:8,fog:!0}));le.rotation.x=Math.PI/2,le.position.set(0,2.5,0),le.receiveShadow=!0,this.scene.add(le),this.bulbGroup=new Un,this.bulbGroup.position.set(0,2.5,-.1),this.scene.add(this.bulbGroup);let N=new Y(new X(.003,.003,1.8,4),new Z({color:1118481,shininess:5}));N.position.y=-.9,this.bulbGroup.add(N);let ue=new Y(new X(.015,.018,.05,8),new Z({color:2236962,shininess:15}));ue.position.y=-1.825,this.bulbGroup.add(ue);let de=new la(.028,12,12);this.bulbMaterial=new Z({color:16775654,emissive:16771757,emissiveIntensity:1,shininess:100});let fe=new Y(de,this.bulbMaterial);fe.position.y=-1.86,this.bulbGroup.add(fe),this.bulbLight=new ro(16771757,28,10),this.bulbLight.position.set(0,-1.86,0),this.bulbLight.castShadow=!0,this.bulbLight.decay=1,this.bulbLight.shadow.mapSize.width=512,this.bulbLight.shadow.mapSize.height=512,this.bulbLight.shadow.bias=-.005,this.bulbGroup.add(this.bulbLight),this.dustGeometry=new Kr;let pe=new Float32Array(75);for(let e=0;e<25;e++)pe[e*3]=(Math.random()-.5)*3,pe[e*3+1]=Math.random()*2.2,pe[e*3+2]=(Math.random()-.5)*3;this.dustGeometry.setAttribute(`position`,new jr(pe,3));let me=new Wi({color:16771757,size:.015,transparent:!0,opacity:.35,depthWrite:!1});this.dustPoints=new Yi(this.dustGeometry,me),this.scene.add(this.dustPoints),this.wheelSpotlight=new to(16774112,15,12,Math.PI/4,.6,1),this.wheelSpotlight.position.set(0,2,-.75);let he=new Hn;he.position.set(0,.05,-.75),this.scene.add(he),this.wheelSpotlight.target=he,this.wheelSpotlight.castShadow=!0,this.wheelSpotlight.decay=1,this.wheelSpotlight.shadow.mapSize.width=512,this.wheelSpotlight.shadow.mapSize.height=512,this.wheelSpotlight.shadow.bias=-.002,this.scene.add(this.wheelSpotlight),this.feltSpotlight=new to(16774112,20,12,Math.PI/3,.6,1),this.feltSpotlight.position.set(0,2,.45);let ge=new Hn;ge.position.set(0,.005,.45),this.scene.add(ge),this.feltSpotlight.target=ge,this.feltSpotlight.castShadow=!0,this.feltSpotlight.decay=1,this.feltSpotlight.shadow.mapSize.width=512,this.feltSpotlight.shadow.mapSize.height=512,this.feltSpotlight.shadow.bias=-.002,this.scene.add(this.feltSpotlight),this.ambientLight=new ao(5594199,2.8),this.scene.add(this.ambientLight)}buildForgeScene(){this.forgeScene=new Qn,this.forgeScene.fog=new Zn(2233610,.06);let e=new ao(2957594,.4);this.forgeScene.add(e),this.forgeFurnaceLight=new ro(16733440,3.5,6),this.forgeFurnaceLight.position.set(1,.4,-1.2),this.forgeFurnaceLight.castShadow=!0,this.forgeScene.add(this.forgeFurnaceLight);let t=new ro(16754790,1.5,5);t.position.set(0,2,-.4),t.castShadow=!0,this.forgeScene.add(t);let n=new ro(16771757,1.2,3);n.position.set(0,.9,.7),this.forgeScene.add(n);let r=new to(16772306,2,8,Math.PI/3,.5,1);r.position.set(0,3,.8);let i=new Hn;i.position.set(0,.3,-.4),this.forgeScene.add(i),r.target=i,r.castShadow=!0,r.shadow.mapSize.width=512,r.shadow.mapSize.height=512,r.shadow.bias=-.002,this.forgeScene.add(r);let a=new Y(new sa(8,8),new Z({color:4866101,shininess:4}));a.rotation.x=-Math.PI/2,a.receiveShadow=!0,this.forgeScene.add(a);let o=new Z({color:5590082,shininess:2,side:2}),s=new Y(new sa(8,5),o);s.position.set(0,2.5,-3),s.receiveShadow=!0,this.forgeScene.add(s);let c=new Y(new sa(8,5),o);c.rotation.y=Math.PI/2,c.position.set(-3,2.5,0),c.receiveShadow=!0,this.forgeScene.add(c);let l=new Y(new sa(8,5),o);l.rotation.y=-Math.PI/2,l.position.set(3,2.5,0),l.receiveShadow=!0,this.forgeScene.add(l);let u=new Un;u.position.set(0,0,-.4);let d=new Y(new X(.18,.2,.35,6),new Z({color:6965301,shininess:5}));d.position.y=.175,d.receiveShadow=!0,d.castShadow=!0,u.add(d);let f=new na(.24,.03,.14),p=new xa({color:5922662,metalness:.85,roughness:.3}),m=new Y(f,p);m.position.y=.365,m.castShadow=!0,u.add(m);let h=new Y(new na(.2,.12,.1),p);h.position.y=.44,h.castShadow=!0,u.add(h);let g=new Y(new ia(.05,.12,6),p);g.rotation.z=Math.PI/2,g.position.set(-.16,.44,0),g.castShadow=!0,u.add(g);let _=new Y(new na(.08,.06,.08),p);_.position.set(.14,.47,0),_.castShadow=!0,u.add(_),this.forgeScene.add(u);let v=new X(.26,.3,.55,8),y=new Z({color:4540492,shininess:10});this.forgePedestal=new Y(v,y),this.forgePedestal.position.set(-.9,.275,-.5),this.forgePedestal.receiveShadow=!0,this.forgePedestal.castShadow=!0,this.forgeScene.add(this.forgePedestal);let b=new Un;b.position.set(1,0,-1.2);let x=new Y(new na(.6,.4,.6),new Z({color:8146763,shininess:5}));x.position.y=.2,x.receiveShadow=!0,x.castShadow=!0,b.add(x);let S=new Y(new X(.24,.24,.05,8),new J({color:16733440}));S.position.y=.4,b.add(S),this.forgeScene.add(b),this.forgeSparksGroup=new Un,this.forgeScene.add(this.forgeSparksGroup);let C=new na(.015,.015,.015),w=new J({color:16746496,transparent:!0}),T=e=>{e.position.set(1+(Math.random()-.5)*.2,.42,-1.2+(Math.random()-.5)*.2),e.userData={vx:(Math.random()-.65)*.15,vy:.35+Math.random()*.4,vz:(Math.random()-.5)*.15,age:0,life:.8+Math.random()*1.2},e.material.opacity=1};for(let e=0;e<30;e++){let e=new Y(C,w.clone());T(e),e.position.y=.42+Math.random()*.8,this.forgeSparksGroup.add(e),this.forgeSparks.push(e)}this.forgeCardsGroup=new Un,this.forgeScene.add(this.forgeCardsGroup)}buildShopScene(){this.shopScene=new Qn,this.shopScene.fog=new Zn(985882,.05);let e=new ao(1708592,.6);this.shopScene.add(e);let t=new ro(11766015,3,6);t.position.set(0,2,-.4),t.castShadow=!0,this.shopScene.add(t);let n=new ro(16771757,1.5,3);n.position.set(0,.9,.7),this.shopScene.add(n);let r=new to(13747433,3,8,Math.PI/3,.5,1);r.position.set(0,3,.8);let i=new Hn;i.position.set(0,.3,-.4),this.shopScene.add(i),r.target=i,r.castShadow=!0,r.shadow.mapSize.width=1024,r.shadow.mapSize.height=1024,r.shadow.bias=-.001,this.shopScene.add(r);let a=new Un;a.position.set(.6,.4,-.15),this.shopScene.add(a);let o=new Y(new X(.02,.02,.12,8),new Z({color:14535604,shininess:8}));o.position.y=.06,o.castShadow=!0,o.receiveShadow=!0,a.add(o);let s=new Y(new ia(.01,.03,6),new J({color:16755200}));s.position.y=.135,a.add(s),this.shopCandleLight=new ro(16750592,3.5,3),this.shopCandleLight.position.set(.6,.55,-.15),this.shopCandleLight.castShadow=!0,this.shopCandleLight.shadow.bias=-.002,this.shopScene.add(this.shopCandleLight),this.shopBellGroup=new Un,this.shopBellGroup.position.set(-.6,.4,-.15),this.shopScene.add(this.shopBellGroup);let c=new Y(new X(.045,.05,.012,10),new Z({color:1710618,shininess:20}));c.position.y=.006,c.castShadow=!0,c.receiveShadow=!0,c.userData={isShopBell:!0},this.shopBellGroup.add(c);let l=new Y(new X(.035,.04,.03,12),new Z({color:16766720,shininess:90}));l.position.y=.027,l.castShadow=!0,l.userData={isShopBell:!0},this.shopBellGroup.add(l);let u=new X(.004,.004,.022,6),d=new xa({color:13421772,metalness:.9,roughness:.2});this.shopBellPlunger=new Y(u,d),this.shopBellPlunger.position.y=.053,this.shopBellPlunger.castShadow=!0,this.shopBellPlunger.userData={isShopBell:!0},this.shopBellGroup.add(this.shopBellPlunger);let f=new Y(new la(.01,6,6),d);f.position.y=.011,f.userData={isShopBell:!0},this.shopBellPlunger.add(f);let p=new Y(new sa(8,8),new Z({color:2235696,shininess:4}));p.rotation.x=-Math.PI/2,p.receiveShadow=!0,this.shopScene.add(p);let m=new Z({color:2630459,shininess:2,side:2}),h=new Y(new sa(8,5),m);h.position.set(0,2.5,-3),h.receiveShadow=!0,this.shopScene.add(h);let g=new Y(new sa(8,5),m);g.rotation.y=Math.PI/2,g.position.set(-3,2.5,0),g.receiveShadow=!0,this.shopScene.add(g);let _=new Y(new sa(8,5),m);_.rotation.y=-Math.PI/2,_.position.set(3,2.5,0),_.receiveShadow=!0,this.shopScene.add(_);let v=new Y(new na(1.6,.4,.6),new Z({color:4007194,shininess:12}));v.position.set(0,.2,-.4),v.receiveShadow=!0,v.castShadow=!0,this.shopScene.add(v),this.shopCardsGroup=new Un,this.shopScene.add(this.shopCardsGroup)}buildEventScene(){this.eventScene=new Qn,this.eventScene.fog=new Zn(660495,.07);let e=new ao(858644,.6);this.eventScene.add(e);let t=new ro(8505220,1.5,5);t.position.set(0,2,-.4),t.castShadow=!0,this.eventScene.add(t);let n=new ro(16771757,1.2,3);n.position.set(0,.9,.7),this.eventScene.add(n);let r=new to(8505220,3,8,Math.PI/4,.5,1);r.position.set(0,3,.8);let i=new Hn;i.position.set(0,.3,-.4),this.eventScene.add(i),r.target=i,r.castShadow=!0,r.shadow.mapSize.width=1024,r.shadow.mapSize.height=1024,this.eventScene.add(r);let a=new Un;a.position.set(-.6,.6,-.4),this.eventScene.add(a);let o=new Y(new X(.015,.015,.15,6),new Z({color:3355443,shininess:5}));o.castShadow=!0,a.add(o);let s=new Y(new oa(.03,0),new xa({color:58879,emissive:58879,emissiveIntensity:2,roughness:.1}));s.position.y=.1,a.add(s),this.eventLeftTorchLight=new ro(58879,1.5,3),this.eventLeftTorchLight.position.set(-.6,.7,-.4),this.eventLeftTorchLight.castShadow=!0,this.eventScene.add(this.eventLeftTorchLight);let c=new Un;c.position.set(.6,.6,-.4),this.eventScene.add(c);let l=new Y(new X(.015,.015,.15,6),new Z({color:3355443,shininess:5}));l.castShadow=!0,c.add(l);let u=new Y(new oa(.03,0),new xa({color:3066993,emissive:3066993,emissiveIntensity:2,roughness:.1}));u.position.y=.1,c.add(u),this.eventRightTorchLight=new ro(3066993,1.5,3),this.eventRightTorchLight.position.set(.6,.7,-.4),this.eventRightTorchLight.castShadow=!0,this.eventScene.add(this.eventRightTorchLight);let d=new Y(new sa(8,8),new Z({color:1909792,shininess:2}));d.rotation.x=-Math.PI/2,d.receiveShadow=!0,this.eventScene.add(d);let f=new Z({color:2239013,shininess:1,side:2}),p=new Y(new sa(8,5),f);p.position.set(0,2.5,-3),p.receiveShadow=!0,this.eventScene.add(p);let m=new Y(new sa(8,5),f);m.rotation.y=Math.PI/2,m.position.set(-3,2.5,0),m.receiveShadow=!0,this.eventScene.add(m);let h=new Y(new sa(8,5),f);h.rotation.y=-Math.PI/2,h.position.set(3,2.5,0),h.receiveShadow=!0,this.eventScene.add(h);let g=new Y(new na(.8,.6,.8),new Z({color:1118481,shininess:15}));g.position.set(0,.3,-.4),g.receiveShadow=!0,g.castShadow=!0,this.eventScene.add(g),this.eventChoicesGroup=new Un,this.eventScene.add(this.eventChoicesGroup)}syncShopItems(){if(!this.ui)return;let e=this.ui.activeShopTab,t=[];if(e===`cards`){this.ui.shopCards.forEach((e,n)=>{t.push({type:`card`,data:e,id:n.toString(),purchased:!1})});let e=this.engine.runState,n=e.hp>=e.maxHp;t.push({type:`heal`,data:{name:`Blood Infusion`,description:`Transfuse essence back into your veins. Heals 25 HP.`,cost:12},id:`999`,purchased:n})}else{let e=this.engine.runState.playerWheel,n=this.engine.runState;Object.keys(k).forEach(r=>{let i=k[r],a=e.upgrades.includes(r),o=i.cost,s=i.name,c=i.description;if(r.startsWith(`level_`)){let e=r.replace(`level_`,``),t=n.colorLevels?.[e]||1;o=15+(t-1)*5,t>=10&&(a=!0),s=`${s} (Lvl ${t})`,c=`${c} Currently: Lvl ${t}.`}t.push({type:`upgrade`,data:{...i,name:s,cost:o,description:c},id:r,purchased:a})})}let n=t.map(e=>e.id);this.shopItemsVisuals=this.shopItemsVisuals.filter(r=>{let i=n.includes(r.itemId)&&r.itemType===(t.find(e=>e.id===r.itemId)?.type===`heal`?`heal`:e===`cards`?`card`:`upgrade`);return i||this.shopCardsGroup.remove(r.mesh),i}),t.forEach((n,r)=>{let i=this.shopItemsVisuals.findIndex(e=>e.itemId===n.id);if(i!==-1){let e=this.shopItemsVisuals[i];e.purchased!==n.purchased&&(this.shopCardsGroup.remove(e.mesh),this.shopItemsVisuals.splice(i,1),i=-1)}let a;if(i===-1){let e=this.engine.runState.combatMode===`points`;a=new Yl(n.type,n.data,n.id,n.purchased,e),this.shopCardsGroup.add(a.mesh),this.shopItemsVisuals.push(a)}else a=this.shopItemsVisuals[i];let o=t.length,s=e===`cards`?.28:.24,c=(r-(o-1)/2)*s,l=this.hoveredShopItemId===n.id,u=this.selectedShopItemId===n.id,d=.52,f=.15,p=-.42;u?(d+=.14,f+=.08,p=-.15):l&&(d+=.06,f+=.03,p=-.32),a.targetPosition.set(c,d+Math.sin(Date.now()*.003+r)*.012,f);let m=((o-1)/2-r)*.12;a.targetRotation.set(p,m+(l?Math.sin(Date.now()*.005)*.08:0),0)})}syncEventChoices(){let e=[{id:`1`,title:`Inject Syringe`,cost:`Lose 8 HP`,desc:`Gain 25 Essence chips.`},{id:`2`,title:`Accept Magnet`,cost:`Acquire Lodestone`,desc:`Add Lodestone Magnet card to your deck.`},{id:`3`,title:`Decline & Pass`,cost:`Decline Offer`,desc:`Push past them. Gain nothing, lose nothing.`}],t=e.map(e=>e.id);this.eventChoicesVisuals=this.eventChoicesVisuals.filter(e=>{let n=t.includes(e.choiceId);return n||this.eventChoicesGroup.remove(e.mesh),n}),e.forEach((e,t)=>{let n=this.eventChoicesVisuals.find(t=>t.choiceId===e.id);if(!n){let t=this.engine.runState.combatMode===`points`;n=new Xl(e.id,e.title,e.cost,e.desc,t),this.eventChoicesGroup.add(n.mesh),this.eventChoicesVisuals.push(n)}let r=(t-1)*.35,i=this.hoveredEventChoiceId===e.id,a=this.selectedEventChoiceId===e.id,o=.58,s=.15,c=-.42;a?(o+=.14,s+=.08,c=-.15):i&&(o+=.06,s+=.03,c=-.32),n.targetPosition.set(r,o+Math.sin(Date.now()*.003+t)*.012,s);let l=(1-t)*.18;n.targetRotation.set(c,l+(i?Math.sin(Date.now()*.005)*.08:0),0)})}performShopRaycasting(){if(this.mouse.x===-999)this.hoveredShopItemId=null;else{this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.shopItemsVisuals.map(e=>e.mesh),t=this.raycaster.intersectObjects(e);if(t.length>0){let e=t[0].object;this.hoveredShopItemId=e.userData.shopItemIdx}else this.hoveredShopItemId=null}}performEventRaycasting(){if(this.mouse.x===-999)this.hoveredEventChoiceId=null;else{this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.eventChoicesVisuals.map(e=>e.mesh),t=this.raycaster.intersectObjects(e);if(t.length>0){let e=t[0].object;this.hoveredEventChoiceId=e.userData.eventChoiceId}else this.hoveredEventChoiceId=null}}updateForgeSparks(e){let t=.016;this.forgeSparks.forEach(e=>{let n=e.userData;if(n.age+=t,n.age>=n.life)e.position.set(1+(Math.random()-.5)*.2,.42,-1.2+(Math.random()-.5)*.2),n.age=0,n.life=.8+Math.random()*1.2,n.vx=(Math.random()-.65)*.15,n.vy=.35+Math.random()*.4,n.vz=(Math.random()-.5)*.15,e.material.opacity=1;else{e.position.x+=n.vx*t,e.position.y+=n.vy*t,e.position.z+=n.vz*t;let r=n.age/n.life;e.material.opacity=1-r}})}syncForgeCards(){let e=this.engine.runState.forgeCards||[],t=e.map(e=>e.id);this.forgeCardsVisuals=this.forgeCardsVisuals.filter(e=>{let n=t.includes(e.cardId);return n||this.forgeCardsGroup.remove(e.mesh),n}),e.forEach((e,t)=>{let n=this.forgeCardsVisuals.find(t=>t.cardId===e.id),r=this.engine.runState.combatMode===`points`;n||(n=new Jl(e,r),this.forgeCardsGroup.add(n.mesh),this.forgeCardsVisuals.push(n)),n.purchased!==e.purchased&&(this.forgeCardsGroup.remove(n.mesh),this.forgeCardsVisuals=this.forgeCardsVisuals.filter(t=>t.cardId!==e.id),n=new Jl(e,r),this.forgeCardsGroup.add(n.mesh),this.forgeCardsVisuals.push(n));let i=(t-1)*.48,a=this.hoveredForgeCardId===e.id;n.targetPosition.set(i,.52+(a?.08:0)+Math.sin(Date.now()*.003+t)*.015,.15+(a?-.06:0));let o=(1-t)*.22;n.targetRotation.set(-.42,o+(a?Math.sin(Date.now()*.005)*.08:0),0)})}performForgeRaycasting(){if(this.mouse.x===-999)this.hoveredForgeCardId=null;else{this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.forgeCardsVisuals.map(e=>e.mesh),t=this.raycaster.intersectObjects(e);if(t.length>0){let e=t[0].object;this.hoveredForgeCardId=e.userData.forgeCardId}else this.hoveredForgeCardId=null}this.hoveredForgeCardId!==this.lastHoveredForgeCardId&&(this.lastHoveredForgeCardId=this.hoveredForgeCardId,this.onForgeCardHover&&this.onForgeCardHover(this.hoveredForgeCardId))}getActiveOutsideBets(e,t){let n=this.engine.battleState,r=n?n.boardModifiers:void 0,i=new Set,a=!1,o=!1,s=!1;for(let t of e.numbers)if(e.greenNumbers.includes(t))s=!0;else{let n=c(t,e,r);n&&i.add(n),t%2==0?o=!0:a=!0}let l=[];i.has(`red`)&&l.push(`red`),i.has(`black`)&&l.push(`black`),a&&l.push(`odd`),o&&l.push(`even`),s&&l.push(`green`);let u=[];return i.has(`gold`)&&u.push(`gold`),i.has(`purple`)&&u.push(`purple`),i.has(`cyan`)&&u.push(`cyan`),i.has(`crimson`)&&u.push(`crimson`),{row1:l,row2:u}}createFeltTexture(e,t){let n=document.createElement(`canvas`);n.width=1024,n.height=512;let r=n.getContext(`2d`);r.fillStyle=e?`#111111`:`#1b7a3e`,r.fillRect(0,0,1024,512),r.strokeStyle=e?`#ba1212`:`#ffca28`,r.lineWidth=6,r.strokeRect(10,10,1004,492);let i=this.engine.battleState,a=i?e?i.enemyWheel:i.playerWheel:this.engine.runState.playerWheel,o=a.numbers.filter(e=>!a.greenNumbers.includes(e)).sort((e,t)=>e-t),s=Math.ceil(o.length/3),l=820/s,u=i&&i.activeWheelOwner===`enemy`,d=i&&e===u&&i.predictionSector||[];r.fillStyle=`#4caf50`,r.fillRect(40,40,120,300),r.lineWidth=3,r.strokeRect(40,40,120,300);let f=a.greenNumbers;if(r.fillStyle=`#ffffff`,r.textAlign=`center`,r.textBaseline=`middle`,f.length===1)r.font=`bold 72px "Courier Prime", monospace`,r.fillText(f[0].toString(),100,190);else{r.font=`bold ${f.length>3?24:f.length===2?40:32}px "Courier Prime", monospace`;let e=300/(f.length+1);for(let t=0;t<f.length;t++)r.fillText(f[t].toString(),100,40+e*(t+1))}d.length>0&&a.greenNumbers.some(e=>d.includes(e))?(r.save(),r.strokeStyle=`#00ff64`,r.lineWidth=4,r.strokeRect(42,42,116,296),r.fillStyle=`rgba(0, 255, 100, 0.2)`,r.fillRect(40,40,120,300),r.restore()):d.length>0&&(r.save(),r.fillStyle=`rgba(0, 0, 0, 0.65)`,r.fillRect(40,40,120,300),r.restore()),r.font=s>12?`bold 22px "Courier Prime", monospace`:`bold 36px "Courier Prime", monospace`;for(let e=0;e<s;e++)for(let n=0;n<3;n++){let i=3*e+(2-n);if(i>=o.length)continue;let s=o[i],u=c(s,a,this.engine.battleState?.boardModifiers),f=`#2ebd42`;u===`red`?f=`#ef5350`:u===`black`?f=`#2d2d2d`:u===`gold`?f=`#ffd700`:u===`purple`?f=`#9c27b0`:u===`cyan`?f=`#00bcd4`:u===`crimson`&&(f=`#ff007f`);let p=160+e*l,m=40+n*100;r.fillStyle=f,r.fillRect(p,m,l-2,98),r.strokeRect(p,m,l-2,98),r.fillStyle=`#ffffff`,r.fillText(s.toString(),p+l/2,m+100/2),d.includes(s)?(r.save(),r.strokeStyle=`#00ff64`,r.lineWidth=4,r.strokeRect(p+2,m+2,l-6,94),r.fillStyle=`rgba(0, 255, 100, 0.2)`,r.fillRect(p,m,l-2,98),r.restore()):d.length>0&&(r.save(),r.fillStyle=`rgba(0, 0, 0, 0.65)`,r.fillRect(p,m,l-2,98),r.restore());let h=t?.goldFoils||[],g=t?.copperPlates||[],_=h.includes(s),v=g.includes(s);_?(r.save(),r.strokeStyle=`#ffd700`,r.lineWidth=4,r.strokeRect(p+2,m+2,l-6,94),r.fillStyle=`#ffd700`,r.font=`bold 20px "Courier Prime", monospace`,r.textAlign=`right`,r.textBaseline=`top`,r.fillText(`★`,p+l-6,m+6),r.restore()):v&&(r.save(),r.strokeStyle=`#ffffff`,r.lineWidth=4,r.strokeRect(p+2,m+2,l-6,94),r.fillStyle=`#ffffff`,r.font=`bold 20px "Courier Prime", monospace`,r.textAlign=`right`,r.textBaseline=`top`,r.fillText(`✦`,p+l-6,m+6),r.restore())}let p=t?.goldFoils||[],m=t?.copperPlates||[],h=a.greenNumbers.some(e=>p.includes(e)),g=a.greenNumbers.some(e=>m.includes(e));h?(r.save(),r.strokeStyle=`#ffd700`,r.lineWidth=4,r.strokeRect(42,42,116,296),r.restore()):g&&(r.save(),r.strokeStyle=`#ffffff`,r.lineWidth=4,r.strokeRect(42,42,116,296),r.restore()),e?this.enemyOutsideBets=[]:this.playerOutsideBets=[];let _=this.getActiveOutsideBets(a,e),v=a.payoutMultipliers,y=_.row1,b=(y.length-1)*8,x=y.length>0?Math.floor((820-b)/y.length):0;for(let t=0;t<y.length;t++){let n=y[t],i=160+t*(x+8),a=t===y.length-1?980-i:x,o={type:n,xStart:i,width:a,yStart:350,height:65};e?this.enemyOutsideBets.push(o):this.playerOutsideBets.push(o);let s=`#ef5350`,c=``,l=1;n===`red`?(s=`#ef5350`,c=`RED`,l=v.red||2):n===`black`?(s=`#2d2d2d`,c=`BLACK`,l=v.black||2):n===`odd`?(s=`#d84315`,c=`ODD`,l=v.odd||2):n===`even`?(s=`#0288d1`,c=`EVEN`,l=v.even||2):n===`green`&&(s=`#4caf50`,c=`GREEN`,l=v.green||10),r.fillStyle=s,r.fillRect(i,350,a,65),r.strokeStyle=e?`#ba1212`:`#ffca28`,r.lineWidth=3,r.strokeRect(i,350,a,65),r.fillStyle=`#ffffff`,r.textAlign=`center`,r.textBaseline=`middle`,r.font=`bold 20px "Courier Prime", monospace`,r.fillText(c,i+a/2,370),r.font=`bold 14px "Courier Prime", monospace`,r.fillText(`(${l}x)`,i+a/2,395)}let S=_.row2,C=(S.length-1)*10,w=S.length>0?Math.floor((820-C)/S.length):0;for(let t=0;t<S.length;t++){let n=S[t],i=160+t*(w+10),a=t===S.length-1?980-i:w,o={type:n,xStart:i,width:a,yStart:425,height:65};e?this.enemyOutsideBets.push(o):this.playerOutsideBets.push(o);let s=`#ffd700`,c=`#ffffff`,l=``,u=1;n===`gold`?(s=`#ffd700`,c=`#000000`,l=`GOLD`,u=v.gold||5):n===`purple`?(s=`#9c27b0`,l=`PURPLE`,u=v.purple||5):n===`cyan`?(s=`#00bcd4`,l=`CYAN`,u=v.cyan||5):n===`crimson`&&(s=`#ff007f`,l=`CRIMSON`,u=v.crimson||5),r.fillStyle=s,r.fillRect(i,425,a,65),r.strokeStyle=e?`#ba1212`:`#ffca28`,r.lineWidth=3,r.strokeRect(i,425,a,65),r.fillStyle=c,r.textAlign=`center`,r.textBaseline=`middle`,r.font=`bold 20px "Courier Prime", monospace`,r.fillText(l,i+a/2,445),r.font=`bold 14px "Courier Prime", monospace`,r.fillText(`(${u}x)`,i+a/2,470)}let T=e?999:444,E=()=>{let e=Math.sin(T++)*1e4;return e-Math.floor(e)};r.fillStyle=`rgba(0, 0, 0, 0.12)`;for(let e=0;e<40;e++){let e=E()*1024,t=E()*512,n=10+E()*40;r.beginPath(),r.arc(e,t,n,0,Math.PI*2),r.fill()}let D=new Qi(n);return D.colorSpace=bt,D.needsUpdate=!0,D}createOpponentCardBackTexture(){let e=document.createElement(`canvas`);e.width=256,e.height=360;let t=e.getContext(`2d`);t.fillStyle=`#2d0a06`,t.fillRect(0,0,e.width,e.height),t.strokeStyle=`#c59f51`,t.lineWidth=10,t.strokeRect(5,5,e.width-10,e.height-10),t.strokeStyle=`#ba1212`,t.lineWidth=6,t.beginPath(),t.moveTo(40,60),t.lineTo(216,300),t.moveTo(216,60),t.lineTo(40,300),t.stroke(),t.fillStyle=`#c59f51`,t.beginPath(),t.arc(128,180,24,0,Math.PI*2),t.fill();let n=new Qi(e);return n.colorSpace=bt,n.needsUpdate=!0,n}createWallTexture(){let e=document.createElement(`canvas`);e.width=512,e.height=512;let t=e.getContext(`2d`);t.fillStyle=`#3a443f`,t.fillRect(0,0,512,512),t.strokeStyle=`#1d2220`,t.lineWidth=6;for(let e=0;e<=512;e+=64)t.beginPath(),t.moveTo(0,e),t.lineTo(512,e),t.stroke();for(let e=64;e<=512;e+=64){let n=e/64%2==0?0:128/2;for(let r=n;r<=640;r+=128)t.beginPath(),t.moveTo(r,e-64),t.lineTo(r,e),t.stroke()}t.strokeStyle=`rgba(255, 255, 255, 0.12)`,t.lineWidth=2;for(let e=0;e<512;e+=64){let n=(e+64)/64%2==0?0:128/2;for(let r=n;r<640;r+=128)t.beginPath(),t.moveTo(r-128,e+3),t.lineTo(r,e+3),t.stroke(),t.beginPath(),t.moveTo(r-128+3,e),t.lineTo(r-128+3,e+64),t.stroke()}t.strokeStyle=`rgba(0, 0, 0, 0.25)`,t.lineWidth=2;for(let e=0;e<512;e+=64){let n=(e+64)/64%2==0?0:128/2;for(let r=n;r<640;r+=128)t.beginPath(),t.moveTo(r-128,e+64-3),t.lineTo(r,e+64-3),t.stroke(),t.beginPath(),t.moveTo(r-3,e),t.lineTo(r-3,e+64),t.stroke()}t.fillStyle=`rgba(0, 0, 0, 0.25)`;for(let e=0;e<15;e++){let e=Math.random()*512,n=Math.random()*512,r=20+Math.random()*60;t.beginPath(),t.arc(e,n,r,0,Math.PI*2),t.fill()}t.fillStyle=`rgba(45, 65, 35, 0.2)`;for(let e=0;e<10;e++){let e=Math.random()*512,n=Math.random()*512,r=30+Math.random()*70;t.beginPath(),t.arc(e,n,r,0,Math.PI*2),t.fill()}t.fillStyle=`rgba(255, 255, 255, 0.05)`;for(let e=0;e<8;e++){let e=Math.random()*512,n=Math.random()*512,r=15+Math.random()*40;t.beginPath(),t.arc(e,n,r,0,Math.PI*2),t.fill()}let n=new Qi(e);return n.colorSpace=bt,n.needsUpdate=!0,n}createCeilingTexture(){let e=document.createElement(`canvas`);e.width=512,e.height=512;let t=e.getContext(`2d`);t.fillStyle=`#2c332f`,t.fillRect(0,0,512,512),t.strokeStyle=`#141816`,t.lineWidth=8,t.beginPath(),t.moveTo(256,0),t.lineTo(256,512),t.moveTo(0,256),t.lineTo(512,256),t.stroke(),t.strokeStyle=`rgba(255, 255, 255, 0.08)`,t.lineWidth=3,t.beginPath(),t.moveTo(258,0),t.lineTo(258,512),t.moveTo(0,258),t.lineTo(512,258),t.stroke(),t.strokeStyle=`rgba(0, 0, 0, 0.3)`,t.lineWidth=3,t.beginPath(),t.moveTo(254,0),t.lineTo(254,512),t.moveTo(0,254),t.lineTo(512,254),t.stroke(),t.strokeStyle=`rgba(0, 0, 0, 0.2)`,t.lineWidth=4,[[128,128],[384,128],[128,384],[384,384]].forEach(([e,n])=>{t.beginPath(),t.arc(e,n,12,0,Math.PI*2),t.stroke(),t.fillStyle=`rgba(0, 0, 0, 0.15)`,t.fill()}),t.fillStyle=`rgba(0, 0, 0, 0.3)`;for(let e=0;e<15;e++){let e=Math.random()*512,n=Math.random()*512,r=40+Math.random()*100;t.beginPath(),t.arc(e,n,r,0,Math.PI*2),t.fill()}t.fillStyle=`rgba(255, 255, 255, 0.04)`;for(let e=0;e<10;e++){let e=Math.random()*512,n=Math.random()*512,r=20+Math.random()*60;t.beginPath(),t.arc(e,n,r,0,Math.PI*2),t.fill()}let n=new Qi(e);return n.colorSpace=bt,n.needsUpdate=!0,n}getFeltCellAtPosition(e,t){let n=e-0,r=t-.45;if(n<-.6||n>.6||r<-.275||r>.275)return null;let i=(n/1.2+.5)*1024,a=(r/.55+.5)*512,o=this.engine.battleState?this.engine.battleState.playerWheel:this.engine.runState.playerWheel;for(let e of this.playerOutsideBets)if(i>=e.xStart&&i<=e.xStart+e.width&&a>=e.yStart&&a<=e.yStart+e.height)return{type:e.type};if(i>=40&&i<=160&&a>=40&&a<=340)return{type:`number`,numberValue:o.greenNumbers[0]};if(i>=160&&i<=980&&a>=40&&a<=340){let e=o.numbers.filter(e=>!o.greenNumbers.includes(e)).sort((e,t)=>e-t),t=Math.ceil(e.length/3),n=820/t,r=Math.floor((i-160)/n),s=Math.floor((a-40)/100);if(r>=0&&r<t&&s>=0&&s<3){let t=3*r+(2-s);if(t<e.length)return{type:`number`,numberValue:e[t]}}}return null}setupPostProcessing(){this.renderTarget=new fn(this.RENDER_WIDTH,this.RENDER_HEIGHT,{minFilter:M,magFilter:M,format:De}),this.postScene=new Qn,this.postCamera=new io(-1,1,1,-1,0,1),this.postMaterial=new ya({vertexShader:Zl.vertexShader,fragmentShader:Zl.fragmentShader,uniforms:{tDiffuse:{value:this.renderTarget.texture},uResolution:{value:new U(this.RENDER_WIDTH,this.RENDER_HEIGHT)}},depthWrite:!1,depthTest:!1});let e=new Y(new sa(2,2),this.postMaterial);this.postScene.add(e)}setupEvents(){window.addEventListener(`resize`,()=>{let e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}),this.container.addEventListener(`contextmenu`,e=>{e.preventDefault()});let e=0,t=0,n=0,r=!1,i=null,a=!1,o=null,s=!1,c=null,l=null,u=!1,d=!1,f=e=>{let t=this.renderer.domElement.getBoundingClientRect();return new U((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1)};this.container.addEventListener(`pointerdown`,p=>{e=p.clientX,t=p.clientY;let m=f(p);if(this.mouse.copy(m),this.raycaster.setFromCamera(this.mouse,this.camera),this.bookMesh&&this.bookMesh.visible&&this.raycaster.intersectObjects(this.bookMesh.children).length>0){this.isBookZoomed=!this.isBookZoomed,this.sound&&this.sound.playCardSwoosh();return}if(this.activeView===4){this.ui&&!this.ui.mobileModeActive&&(this.isDraggingOverview=!0);return}this.ui&&this.ui.mobileModeActive&&this.activeView===2&&(this.isDraggingBoard=!0,this.dragStartOffset=this.boardHorizontalOffset);let h=this.engine.runState,g=h.gameState===`FORGE`,_=h.gameState===`SHOP`,v=h.gameState===`EVENT`;if(!g&&!_&&!v&&(!this.engine.battleState||this.engine.battleState.phase!==`betting`))return;if(g){let e=this.forgeCardsVisuals.map(e=>e.mesh),t=this.raycaster.intersectObjects(e);i=t.length>0?t[0].object.userData.forgeCardId:null;return}if(_){o=null,s=!1;let e=this.shopItemsVisuals.map(e=>e.mesh),t=this.raycaster.intersectObjects(e);if(t.length>0)o=t[0].object.userData.shopItemIdx;else{let e=[];this.shopBellGroup&&this.shopBellGroup.traverse(t=>{t.userData&&t.userData.isShopBell&&e.push(t)}),this.raycaster.intersectObjects(e).length>0&&(s=!0)}return}if(v){c=null;let e=this.eventChoicesVisuals.map(e=>e.mesh),t=this.raycaster.intersectObjects(e);t.length>0&&(c=t[0].object.userData.eventChoiceId);return}if(this.heldCardTimer&&=(clearTimeout(this.heldCardTimer),null),this.heldCardId=null,this.activeView===1||this.activeView===2){let e=null;if(this.activeView===2)e=this.raycastCardsInCurrentState();else if(this.ui&&this.ui.mobileModeActive){let t=this.cardVisuals.map(e=>e.mesh),n=this.raycaster.intersectObjects(t);n.length>0&&(e=n[0].object.userData.cardId)}else e=this.raycastCardsAtRest();if(e){i=e,n=0,r=!1,a=!1,u=!1,this.activeView===2&&(this.heldCardTimer=setTimeout(()=>{this.heldCardId=e,this.sound&&this.sound.playCardSwoosh()},200));return}}if(this.activeView===1||this.activeView===2||this.activeView===4){let e=this.playedCardVisuals.map(e=>(e.mesh.updateMatrixWorld(!0),e.mesh)),t=this.raycaster.intersectObjects(e);if(t.length>0){i=t[0].object.userData.cardId,n=0,r=!1,a=!0,u=!1;return}}let y=[];this.scene.traverse(e=>{e.userData&&(e.userData.isSourceStack||e.userData.isBell||e.userData.isPlacedChip||e.userData.isDrawDeck||e.userData.isSliderHandle||e.userData.isSliderTrack||e.userData.isClearCoin||e.userData.isRebetCoin||e.userData.isDoubleCoin||e.userData.isSacrificeCoin)&&y.push(e)});let b=this.raycaster.intersectObjects(y);if(b.length>0){let e=b[0].object;if(e.userData.isSliderHandle)d=!0,n=0,i=null,r=!1,a=!1,l=null,u=!1;else if(e.userData.isSliderTrack){let t=e.worldToLocal(b[0].point.clone()),o=Math.max(-.16,Math.min(.16,t.x));if(this.sliderHandle){this.sliderHandle.position.x=o;let e=(o+.16)/.32,t=Math.round(1+e*24);this.activeBrush=t,this.updateBrushDisplay(),this.sound&&this.sound.playChipPlace()}d=!0,n=0,i=null,r=!1,a=!1,l=null,u=!1}else e.userData.isClearCoin||e.userData.isRebetCoin||e.userData.isDoubleCoin||e.userData.isSacrificeCoin?(n=0,i=null,r=!1,a=!1,l=null,u=!1,e.position.y=.003,this.sound&&this.sound.playChipPlace()):e.userData.isSourceStack?(n=e.userData.denom,i=null,r=!1,a=!1,l=null,u=!1):e.userData.isBell?(r=!0,n=0,i=null,a=!1,l=null,u=!1):e.userData.isPlacedChip?(l=e,n=0,i=null,r=!1,a=!1,u=!1):e.userData.isDrawDeck&&(u=!0,n=0,i=null,r=!1,a=!1,l=null)}else n=0,r=!1,i=null,a=!1,l=null,u=!1}),this.container.addEventListener(`pointermove`,r=>{let i=f(r);if(this.mouse.copy(i),this.ui&&this.ui.mobileModeActive){if(this.isDraggingBoard&&this.activeView===2){let t=r.clientX-e;this.boardHorizontalOffset=Math.max(-.8,Math.min(.5,this.dragStartOffset-t*.0025))}return}if(this.engine.runState.gameState===`FORGE`)return;let a=Math.hypot(r.clientX-e,r.clientY-t);if(this.heldCardTimer&&a>10&&(clearTimeout(this.heldCardTimer),this.heldCardTimer=null),n>0&&a>5&&!this.isDragging){this.isDragging=!0,this.dragDenom=n;let e=new X(.02,.02,.006,8),t=this.chipMaterials.red;this.dragDenom===5?t=this.chipMaterials.green:this.dragDenom===10&&(t=this.chipMaterials.number),this.draggedDenomMesh=new Y(e,t),this.draggedDenomMesh.castShadow=!0,this.scene.add(this.draggedDenomMesh)}if(this.isDragging&&this.draggedDenomMesh){this.raycaster.setFromCamera(this.mouse,this.camera);let e=new W;this.raycaster.ray.intersectPlane(this.dragPlane,e),this.draggedDenomMesh.position.copy(e),this.draggedDenomMesh.position.y=.04;let t=this.getFeltCellAtPosition(e.x,e.z);if(t){this.activeHoveredCell=t;let e=this.getBoardCellPosition(t.type,t.numberValue);this.draggedDenomMesh.position.set(e.x,.02,e.z)}else this.activeHoveredCell=null}if(d&&this.sliderHandle){this.raycaster.setFromCamera(this.mouse,this.camera);let e=new W;this.raycaster.ray.intersectPlane(this.dragPlane,e);let t=Math.max(-.16,Math.min(.16,e.x-.1));this.sliderHandle.position.x=t;let n=(t+.16)/.32,r=Math.round(1+n*24);this.activeBrush=r,this.updateBrushDisplay();return}if(!this.isDragging&&!d&&this.activeBrush>0){this.raycaster.setFromCamera(this.mouse,this.camera);let e=new W;this.raycaster.ray.intersectPlane(this.dragPlane,e);let t=this.getFeltCellAtPosition(e.x,e.z);if(t&&this.engine.battleState){if(this.brushIndicatorMesh&&this.brushIndicatorTextSprite){let e=this.getBoardCellPosition(t.type,t.numberValue);this.brushIndicatorMesh.position.set(e.x,.008,e.z),this.brushIndicatorMesh.visible=!0,this.brushIndicatorTextSprite.position.set(e.x,.08,e.z),this.brushIndicatorTextSprite.visible=!0}}else this.brushIndicatorMesh&&this.brushIndicatorTextSprite&&(this.brushIndicatorMesh.visible=!1,this.brushIndicatorTextSprite.visible=!1)}else this.brushIndicatorMesh&&this.brushIndicatorTextSprite&&(this.brushIndicatorMesh.visible=!1,this.brushIndicatorTextSprite.visible=!1)}),this.container.addEventListener(`pointerup`,d=>{if(this.heldCardTimer&&=(clearTimeout(this.heldCardTimer),null),this.heldCardId){this.heldCardId=null,i=null,this.isDraggingBoard=!1,this.isDraggingOverview=!1;return}this.isDraggingBoard=!1,this.isDraggingOverview=!1;let f=Math.hypot(d.clientX-e,d.clientY-t);if(this.ui&&this.ui.mobileModeActive&&this.engine.battleState&&f>40){let o=d.clientX-e,s=d.clientY-t,c;c=Math.abs(o)>Math.abs(s)?o>0?`right`:`left`:s>0?`down`:`up`,this.handleMobileSwipe(c),n=0,r=!1,i=null,a=!1,l=null;return}if(this.activeView===4)return;let p=this.engine.runState,m=p.gameState===`FORGE`,h=p.gameState===`SHOP`,g=p.gameState===`EVENT`;if(m){i&&f<=5&&this.onForgeCardClicked&&this.onForgeCardClicked(i),i=null;return}if(h){if(f<=5&&this.ui)if(o)if(this.selectedShopItemId===o){let e=this.ui.activeShopTab,t=!1;if(e===`cards`){let e=parseInt(o);t=this.ui.purchaseShopCard(e)}else t=this.ui.purchaseBoardUpgrade(o);t&&(this.selectedShopItemId=null,this.ui.updateShopDescriptionBox())}else this.selectedShopItemId=o,this.sound.playCardSwoosh(),this.ui.updateShopDescriptionBox();else if(s){if(this.shopBellShakeTime=.15,this.sound.playBell(),this.selectedShopItemId){let e=this.ui.activeShopTab,t=!1;if(e===`cards`){let e=parseInt(this.selectedShopItemId);t=this.ui.purchaseShopCard(e)}else t=this.ui.purchaseBoardUpgrade(this.selectedShopItemId);t&&(this.selectedShopItemId=null,this.ui.updateShopDescriptionBox())}}else this.selectedShopItemId!==null&&(this.selectedShopItemId=null,this.sound.playCardSwoosh(),this.ui.updateShopDescriptionBox());o=null,s=!1;return}if(g){f<=5&&this.ui&&(c?this.selectedEventChoiceId===c?(this.ui.makeEventChoice(c),this.selectedEventChoiceId=null):(this.selectedEventChoiceId=c,this.sound.playCardSwoosh(),this.ui.updateEventDescriptionBox()):this.selectedEventChoiceId!==null&&(this.selectedEventChoiceId=null,this.sound.playCardSwoosh(),this.ui.updateEventDescriptionBox())),c=null;return}if(this.isDragging){if(this.activeHoveredCell&&this.engine.battleState){let e=this.activeHoveredCell.type,t=this.activeHoveredCell.numberValue,n=Math.min(this.dragDenom,this.engine.battleState.chipsPool);n>0&&(this.engine.placeBet(e,n,t),this.onBetPlaced&&this.onBetPlaced())}this.draggedDenomMesh&&=(this.scene.remove(this.draggedDenomMesh),this.draggedDenomMesh.geometry.dispose(),null),this.isDragging=!1,this.activeHoveredCell=null}else if(f<=(this.ui&&this.ui.mobileModeActive?8:12)){if(u)this.engine.buyCardDraw()?(this.sound.playCardSwoosh(),this.ui.render()):this.sound.playRouletteClick(.3);else if(this.ui&&this.ui.mobileModeActive&&(this.activeView===2||this.activeView===9)){if(i)a?this.onPlayedCardClicked&&this.onPlayedCardClicked(i):this.onCardClicked&&this.onCardClicked(i);else if(n>0)this.ui.currentBetAmount=n,this.sound.playRouletteClick(.8),this.ui.render();else if(r&&this.onBellClicked)this.bellShakeTime=.15,this.onBellClicked();else if(!i&&!r&&!l){this.raycaster.setFromCamera(this.mouse,this.camera);let e=new W;this.raycaster.ray.intersectPlane(this.dragPlane,e);let t=this.getFeltCellAtPosition(e.x,e.z);if(t&&this.engine.battleState){let e=t.type,n=t.numberValue,r=Math.min(this.ui.currentBetAmount,this.engine.battleState.chipsPool);r>0?(this.engine.placeBet(e,r,n),this.onBetPlaced&&this.onBetPlaced()):this.sound.playRouletteClick(.3)}}else if(l){let e=l.userData.betType,t=l.userData.numberValue;this.engine.removeBet(e,t),this.syncChips(),this.onBetPlaced&&this.onBetPlaced(),this.sound.playCardSwoosh()}}else if(i)a?this.onPlayedCardClicked&&this.onPlayedCardClicked(i):this.onCardClicked&&this.onCardClicked(i);else if(r&&this.onBellClicked)this.bellShakeTime=.15,this.onBellClicked();else if(l){let e=l.userData.betType,t=l.userData.numberValue;this.engine.removeBet(e,t),this.syncChips(),this.onBetPlaced&&this.onBetPlaced(),this.sound.playCardSwoosh()}}n=0,r=!1,i=null,a=!1,l=null,u=!1}),this.container.addEventListener(`pointerleave`,()=>{this.isDraggingBoard=!1,this.isDraggingOverview=!1,this.mouse.set(-999,-999),this.isDragging&&(this.draggedDenomMesh&&=(this.scene.remove(this.draggedDenomMesh),this.draggedDenomMesh.geometry.dispose(),null),this.isDragging=!1,this.activeHoveredCell=null),n=0,r=!1,l=null,i=null,a=!1})}syncHand(e){let t=e.map(e=>e.id);this.cardVisuals=this.cardVisuals.filter(e=>{let n=t.includes(e.mesh.userData.cardId);return n||this.handGroup.remove(e.mesh),n});let n=this.engine.runState.combatMode===`points`;e.forEach(e=>{if(!this.cardVisuals.some(t=>t.mesh.userData.cardId===e.id)){let t=new Kl(e,n);t.mesh.position.set(0,-.8,-.5),t.mesh.rotation.set(0,0,0),t.mesh.scale.set(.01,.01,.01),this.handGroup.add(t.mesh),this.cardVisuals.push(t)}})}syncPlayedCards(e){let t=e.map(e=>e.id);this.playedCardVisuals=this.playedCardVisuals.filter(e=>{let n=t.includes(e.mesh.userData.cardId);return n||this.playedCardsGroup.remove(e.mesh),n});let n=this.engine.runState.combatMode===`points`,r={GREEN_GREED:`greenMultiplier`,PRIME_TARGET:`primeMultiplier`,HIGH_ROLLER:`highMultiplier`,LOW_SWEEP:`lowMultiplier`,EVEN_SPLIT:`evenMultiplier`,ODD_ADVANTAGE:`oddMultiplier`,FIRST_DOZEN:`dozenMultiplier_1`,SECOND_DOZEN:`dozenMultiplier_2`,THIRD_DOZEN:`dozenMultiplier_3`,SINGLE_OUT:`singleOutMultiplier`,COLUMN_WAVE:`columnMultiplier_1`,COLUMN_DRIFT:`columnMultiplier_2`,COLUMN_APEX:`columnMultiplier_3`,LUCKY_INDEX:`globalMultiplier`,SCARLET_OVERFLOW:`scarletOverflow`,ONYX_ECLIPSE:`onyxEclipse`,BLOOD_SPILL:`bloodSpill`};e.forEach(e=>{let t=this.playedCardVisuals.find(t=>t.mesh.userData.cardId===e.id);t||(t=new Kl(e,n),t.mesh.position.set(0,.006,.85),t.mesh.rotation.set(-Math.PI/2,0,0),this.playedCardsGroup.add(t.mesh),this.playedCardVisuals.push(t));let i=this.engine.battleState?.boardModifiers.tempDurations||{},a=r[e.effectId],o=a?i[a]:void 0;t.updatePersistentState(o)})}updatePlayedCardTargets(){let e=this.playedCardVisuals.length;if(e===0)return;let t=this.ui&&this.ui.mobileModeActive,n=.15;this.playedCardVisuals.forEach((r,i)=>{let a=0;if(t){let e=i%2==0,t=Math.floor(i/2);a=e?-.25-t*n:.25+t*n}else a=-((e-1)*n)/2+i*n;let o=-Math.PI/2;r.targetPosition.set(a,.006,.85),r.targetRotation.set(o,0,0)})}playOpponentActionAnimation(e,t,n){let r=document.createElement(`canvas`);r.width=256*2,r.height=360*2;let i=r.getContext(`2d`);if(i.fillStyle=`#2d0a06`,i.fillRect(0,0,r.width,r.height),i.strokeStyle=`#c59f51`,i.lineWidth=24,i.strokeRect(12,12,r.width-24,r.height-24),i.fillStyle=`#170503`,i.fillRect(24,24,r.width-48,120),i.fillStyle=`#ffffff`,i.textBaseline=`middle`,n?(i.font=`bold 30px "Courier Prime", monospace`,i.fillText(n.name.toUpperCase(),40,84),i.fillStyle=`#ffca28`,i.font=`bold 44px "Courier Prime", monospace`,i.textAlign=`right`,i.fillText(`${n.cost}⚡`,r.width-40,84),i.textAlign=`left`):(i.font=`bold 40px "Courier Prime", monospace`,i.fillText(e.type.toUpperCase(),48,84),e.value>0&&(i.fillStyle=`#ef5350`,i.font=`bold 48px "Courier Prime", monospace`,i.textAlign=`right`,i.fillText(`${e.value}⚡`,r.width-48,84),i.textAlign=`left`)),i.fillStyle=`#17110c`,i.fillRect(48,180,r.width-96,240),i.strokeStyle=`#4a0f08`,i.strokeRect(56,188,r.width-112,224),i.fillStyle=`#ef5350`,i.font=`bold 96px "Courier Prime", monospace`,i.textAlign=`center`,i.textBaseline=`middle`,n){let e=`⚙️`;n.type===`payout`?e=`💸`:n.type===`physics`?e=`🌀`:n.type===`board`?e=`📊`:n.type===`chaos`&&(e=`💥`),i.fillText(e,256,300)}else i.fillText(`👁`,256,300);i.fillStyle=`#dddddd`,i.font=`bold 24px "Courier Prime", monospace`,i.textAlign=`left`,i.textBaseline=`alphabetic`;let a=(n?n.description:e.description).split(` `),o=``,s=480;for(let e=0;e<a.length;e++){let t=o+a[e]+` `;i.measureText(t).width>r.width-96&&e>0?(i.fillText(o,48,s),o=a[e]+` `,s+=40):o=t}i.fillText(o,48,s);let c=new Qi(r);c.colorSpace=bt,c.needsUpdate=!0;let l=new na(.18,.25,.004),u=new J({color:2951686,fog:!1}),d=new J({color:1508611,fog:!1}),f=[d,d,d,d,new J({map:c,fog:!1}),u];this.oppActionCardMesh=new Y(l,f),this.oppActionCardMesh.position.set(0,.1,-2.62),this.oppActionCardMesh.rotation.set(-Math.PI/2,Math.PI,0),this.oppActionCardMesh.castShadow=!0,this.scene.add(this.oppActionCardMesh),this.oppAnimChips.forEach(e=>this.scene.remove(e)),this.oppAnimChips=[];let p=new X(.02,.02,.006,8);t.forEach((e,t)=>{let n=this.chipMaterials.red;e.type===`black`?n=this.chipMaterials.black:e.type===`green`?n=this.chipMaterials.green:e.type===`number`?n=this.chipMaterials.number:e.type===`even`?n=this.chipMaterials.blue:e.type===`gold`?n=this.chipMaterials.gold:e.type===`purple`?n=this.chipMaterials.purple:e.type===`cyan`?n=this.chipMaterials.cyan:e.type===`crimson`&&(n=this.chipMaterials.crimson);let r=Math.max(1,Math.min(5,e.amount)),i=this.getBoardCellPosition(e.type,e.numberValue),a=-.25+t*.25,o=-2.5;for(let e=0;e<r;e++){let t=new Y(p,n);t.position.set(a,.005+e*.007,o),t.castShadow=!0,t.receiveShadow=!0,t.userData={startPosition:new W(a,.005+e*.007,o),targetPosition:new W(i.x,i.y+e*.007,i.z)},this.scene.add(t),this.oppAnimChips.push(t)}}),this.oppAnimTime=0,this.oppAnimType=`card_play`}updateFpsStats(e){let t=document.getElementById(`debug-stats-overlay`);if(!t||t.classList.contains(`hidden`))return;if(this.fpsFrames++,this.fpsLastTime===0){this.fpsLastTime=e;return}let n=e-this.fpsLastTime;if(this.fpsLastTime=e,this.fpsFrames%10==0){let e=Math.round(1e3/Math.max(1,n)),t=document.getElementById(`debug-fps-value`),r=document.getElementById(`debug-frame-time-value`);t&&(t.innerText=e.toString(),e>=55?t.style.color=`#64dd17`:e>=30?t.style.color=`#ffb300`:t.style.color=`#ef5350`),r&&(r.innerText=`${n.toFixed(1)} ms`),this.fpsHistory.push(e),this.fpsHistory.length>this.maxFpsHistory&&this.fpsHistory.shift();let i=document.getElementById(`debug-fps-canvas`);if(i){let e=i.getContext(`2d`);if(e){e.clearRect(0,0,i.width,i.height),e.strokeStyle=`#220a06`,e.lineWidth=1,e.beginPath();let t=i.height-60/90*i.height;e.moveTo(0,t),e.lineTo(i.width,t);let n=i.height-30/90*i.height;e.moveTo(0,n),e.lineTo(i.width,n),e.stroke(),e.strokeStyle=`#ef5350`,e.lineWidth=2,e.beginPath();let r=i.width/this.maxFpsHistory;for(let t=0;t<this.fpsHistory.length;t++){let n=Math.min(90,Math.max(0,this.fpsHistory[t])),a=t*r,o=i.height-n/90*i.height;t===0?e.moveTo(a,o):e.lineTo(a,o)}e.stroke(),this.fpsHistory.length>0&&(e.fillStyle=`rgba(239, 83, 80, 0.1)`,e.lineTo((this.fpsHistory.length-1)*r,i.height),e.lineTo(0,i.height),e.closePath(),e.fill())}}}}updateCardTargets(){let e=this.cardVisuals.length;if(e===0)return;if(this.ui&&this.ui.mobileModeActive&&this.activeView===1){this.activeHandCardIndex=Math.min(e-1,Math.max(0,this.activeHandCardIndex)),this.cardVisuals.forEach((e,t)=>{let n=t-this.activeHandCardIndex,r=0,i=0,a=-.16,o=.52,s=0;n!==0&&(Math.abs(n)===1?(r=n*.12,i=.01,a=-.22,o=.38,s=-n*.15):(o=.01,r=n<0?-.5:.5,a=-.2)),e.targetPosition.set(r,i,a),e.targetRotation.set(-.05,s,0),e.mesh.userData.targetScale=new W(o,o,o)});return}let t=-.12,n=-.24,r=this.hoveredCardId!==null&&this.activeView===1;this.activeView===1?(t=-.04,n=r?-.22:-.16):this.activeView===2?(t=-.22,n=-.24):this.activeView===3||this.activeView===5||this.activeView===6||this.activeView===7?(t=-.6,n=-.3):(t=-.19,n=-.32);let i=Math.min(.6,.12*(e-1)),a=e>1?i/(e-1):0,o=-i/2;this.cardVisuals.forEach((e,r)=>{let i=e.mesh.userData.cardId===this.hoveredCardId,s=o+r*a,c=s*.35,l=t-Math.abs(s)*.02,u=n+r*.015,d=-.05,f=0,p=0;e.mesh.userData.cardId===this.heldCardId?(c=0,l=.12,u=-.12,d=.05,f=0,p=0,e.targetPosition.set(c,l,u),e.targetRotation.set(d,f,p),e.mesh.userData.targetScale=new W(.9,.9,.9)):i&&this.activeView===1?(c=0,l=0,u=-.13,d=0,p=0,f=0,e.targetPosition.set(c,l,u),e.targetRotation.set(d,f,p),e.mesh.userData.targetScale=null):(e.targetPosition.set(c,l,u),e.targetRotation.set(d,f,p),e.mesh.userData.targetScale=null)})}raycastCardsAtRest(){let e=this.cardVisuals.map(e=>e.mesh.position.clone()),t=this.cardVisuals.map(e=>e.mesh.rotation.clone()),n=this.cardVisuals.length,r=Math.min(.6,.12*(n-1)),i=n>1?r/(n-1):0,a=-r/2;this.cardVisuals.forEach((e,t)=>{let n=a+t*i,r=n*.35,o=-.04-Math.abs(n)*.02,s=-.16+t*.015;e.mesh.position.set(r,o,s),e.mesh.rotation.set(-.05,0,0),e.mesh.updateMatrixWorld(!0)});let o=this.cardVisuals.map(e=>e.mesh),s=this.raycaster.intersectObjects(o);return this.cardVisuals.forEach((n,r)=>{n.mesh.position.copy(e[r]),n.mesh.rotation.copy(t[r]),n.mesh.updateMatrixWorld(!0)}),s.length>0?s[0].object.userData.cardId:null}raycastCardsInCurrentState(){let e=this.cardVisuals.map(e=>(e.mesh.updateMatrixWorld(!0),e.mesh)),t=this.raycaster.intersectObjects(e);return t.length>0?t[0].object.userData.cardId:null}performRaycasting(){if(this.mouse.x===-999||this.activeView!==1&&!(this.activeView===2&&this.ui&&this.ui.mobileModeActive)){this.hoveredCardId=null;return}if(this.raycaster.setFromCamera(this.mouse,this.camera),this.ui&&this.ui.mobileModeActive){let e=this.cardVisuals.map(e=>e.mesh),t=this.raycaster.intersectObjects(e);this.hoveredCardId=t.length>0?t[0].object.userData.cardId:null}else this.hoveredCardId=this.raycastCardsAtRest()}animate=e=>{requestAnimationFrame(this.animate),this.updateFpsStats(e);let t=e*.001,n=this.engine.runState.gameState===`FORGE`,r=this.engine.runState.gameState===`SHOP`,i=this.engine.runState.gameState===`EVENT`;if(this.bulbGroup){let e=Math.sin(t*1.1)*.06,n=Math.cos(t*.8)*.05;this.bulbGroup.rotation.set(e,0,n)}if(this.dustGeometry){let e=this.dustGeometry.attributes.position.array;for(let n=0;n<e.length;n+=3)e[n+1]-=.003,e[n]+=Math.sin(t*.5+n)*.001,e[n+1]<0&&(e[n+1]=2.2,e[n]=(Math.random()-.5)*3);this.dustGeometry.attributes.position.needsUpdate=!0}if(this.engine.runState.gameState===`GAME_OVER`)this.bulbLight.intensity=0,this.wheelSpotlight.intensity=0,this.feltSpotlight.intensity=0,this.ambientLight.intensity=.05,this.bulbMaterial.emissive.setHex(0),this.bulbMaterial.color.setHex(2236962);else{let e=24+Math.random()*6,t=Math.random()<.004?.2:1;this.bulbLight.intensity=e*t,this.bulbMaterial.emissiveIntensity=t;let n=5594199,r=2.8,i=16775399,a=16771757,o=this.engine.battleState;if(o&&this.engine.runState.gameState===`COMBAT`){let e=this.engine.runState.combatMode===`points`,t=o.playerScore||0,s=o.enemyScore||0;if(e&&t!==s)t>s?(n=4864768,r=2.2,i=16761095,a=16766287):(n=4852237,r=1.8,i=16717636,a=16732754);else{let e=o.enemy;e.isElite||e.spriteName===`dealer_claw`?(n=3809116,r=1.8,i=14696699,a=11766015):e.isBoss&&(n=6035994,r=1.2,i=16717636,a=16727296)}}this.bulbMaterial.emissive.setHex(a),this.bulbMaterial.color.setHex(a),this.bulbLight.color.setHex(a),this.wheelSpotlight.intensity=15,this.wheelSpotlight.color.setHex(i),this.feltSpotlight.intensity=20,this.feltSpotlight.color.setHex(i),this.ambientLight.intensity=r,this.ambientLight.color.setHex(n)}let a=!!this.engine.battleState;if(a&&!this.wasInBattle&&this.rebuildWheelsForCombat(),this.wasInBattle=a,!a){let e=this.engine.runState.selectedWheelId;if(e!==this.lastPlayerWheelId){if(this.lastPlayerWheelId=e,this.wheelVis.rebuildWheel(!1,this.engine.runState.playerWheel),this.enemyWheelVis.rebuildWheel(!0,this.engine.runState.playerWheel),this.playerFeltMesh){let e=this.playerFeltMesh.material;e.map&&e.map.dispose(),e.dispose(),this.playerFeltMesh.material=new J({map:this.createFeltTexture(!1),fog:!1})}if(this.enemyFeltMesh){let e=this.enemyFeltMesh.material;e.map&&e.map.dispose(),e.dispose(),this.enemyFeltMesh.material=new J({map:this.createFeltTexture(!0),fog:!1})}}}if(a&&this.engine.battleState){let e=JSON.stringify(this.engine.battleState.boardModifiers)+`|owner-${this.engine.battleState.activeWheelOwner}|pred-${JSON.stringify(this.engine.battleState.predictionSector||[])}`;e!==this.lastBoardHash&&(this.lastBoardHash=e,this.rebuildWheelsForCombat())}if(this.enemyVis.update(t),this.updateCurseVisual(),this.curseGroup){let e=this.curseGroup.getObjectByName(`curseCore`);if(e){e.position.y=.22+Math.sin(t*1.5)*.02,e.rotation.y+=.01;let n=this.engine.battleState?.curse;if(n){let r=n.id;if(r===`faraday`)for(let t=0;t<3;t++){let n=e.getObjectByName(`ring_${t}`);n&&(n.rotation.z+=.02*(t+1))}else if(r===`fog`)for(let n=0;n<4;n++){let r=e.getObjectByName(`dot_${n}`);r&&(r.position.y=Math.sin(t*2+n)*.04)}else if(r===`rust`){let t=e.getObjectByName(`smallGear`);t&&(t.rotation.z-=.03)}else if(r===`avarice`){let t=e.getObjectByName(`innerRing`),n=e.getObjectByName(`outerRing`);t&&(t.rotation.x+=.03),n&&(n.rotation.z+=.015)}else if(r===`eclipse`){let t=e.getObjectByName(`crescent`);t&&(t.rotation.z-=.025)}else if(r===`curse`)for(let n=0;n<3;n++){let r=e.getObjectByName(`spike_${n}`);r&&(r.position.y=Math.sin(t*3+n)*.01)}else if(r===`choked`)for(let t=0;t<2;t++){let n=e.getObjectByName(`cage_${t}`);n&&(n.rotation.z+=.01*(t===0?1:-1))}}}}if(this.engine.battleState&&this.engine.battleState.phase===`spinning`){let e=this.engine.physics,n=Math.min(.1,t-this.lastPhysicsTime);this.physicsAccumulator+=n;let r=.008;for(;this.physicsAccumulator>=r;){if(e.update(r),this.physicsAccumulator-=r,e.justHitPin){e.justHitPin=!1;let t=Math.abs(e.ballOmega-e.wheelOmega);this.sound.playPegBounce(.8+t*.15),this.onBounce&&this.onBounce(`pin`,t)}if(e.justHitDivider){e.justHitDivider=!1;let t=Math.abs(e.ballOmega-e.wheelOmega),n=this.engine.battleState?.physicsModifiers,r=``;n&&(n.targetZoneBias>0?r=`magnetic`:n.nudgeCheatActive?r=`nudge`:n.friction===1?n.wheelTilt>0?r=`tilt`:n.ballMass!==1&&(r=`mass`):r=`friction`),r?this.sound.playSpecialPhysicsClick(r,.6+t*.1):this.sound.playRouletteClick(.6+t*.1),this.onBounce&&this.onBounce(`divider`,t)}if(e.isSettled){if(this.physicsAccumulator=0,this.onSpinSettled){let e=this.onSpinSettled;this.onSpinSettled=void 0,e()}break}}}this.lastPhysicsTime=t;let o=this.engine.battleState,s=o?o.playerWheel:this.engine.runState.playerWheel,c=o?o.enemyWheel:this.engine.runState.playerWheel,l=this.engine.playerPhysics,u=this.engine.enemyPhysics,d=o?o.activeWheelOwner:`player`,f=o&&d===`player`?o.physicsModifiers:void 0,p=o&&d===`enemy`?o.physicsModifiers:void 0;if(this.wheelVis.update(l.wheelAngle,l.ballAngle,l.ballRadius,l.ballHeight,l.isSettled,l.settledSlotIndex,s,f,l.balls),this.enemyWheelVis.update(u.wheelAngle,u.ballAngle,u.ballRadius,u.ballHeight,u.isSettled,u.settledSlotIndex,c,p,u.balls),this.bellShakeTime>0){this.bellShakeTime-=.016;let e=1-Math.min(1,this.bellShakeTime/.15);this.bellPlunger.position.y=.055-Math.sin(e*Math.PI)*.015}else this.bellPlunger.position.y=.055;if(this.shopBellShakeTime>0){this.shopBellShakeTime-=.016;let e=1-Math.min(1,this.shopBellShakeTime/.15);this.shopBellPlunger.position.y=.053-Math.sin(e*Math.PI)*.012}else this.shopBellPlunger.position.y=.053;if(this.shopCandleLight&&this.engine.runState.gameState===`SHOP`&&(this.shopCandleLight.intensity=3.5+Math.sin(t*15)*.5+(Math.random()-.5)*.2),this.engine.runState.gameState===`EVENT`&&(this.eventLeftTorchLight&&(this.eventLeftTorchLight.intensity=1.5+Math.sin(t*2.5)*.4),this.eventRightTorchLight&&(this.eventRightTorchLight.intensity=1.5+Math.cos(t*2.5)*.4)),this.bookMesh)if(this.bookMesh.visible=this.engine.runState.gameState===`COMBAT`,this.isBookZoomed){this.bookMesh.parent!==this.handScene&&this.handScene.add(this.bookMesh);let e=new W(0,0,-.4);e.applyMatrix4(this.camera.matrixWorld);let t=this.camera.quaternion.clone();t.multiply(new Kt().setFromAxisAngle(new W(1,0,0),-Math.PI/2.2)),this.bookMesh.position.lerp(e,.15),this.bookMesh.quaternion.slerp(t,.15)}else{this.bookMesh.parent!==this.scene&&this.scene.add(this.bookMesh);let e=new W(-.8,.012,.15),t=new Kt().setFromEuler(new Tn(0,Math.PI/10,0));this.bookMesh.position.lerp(e,.15),this.bookMesh.quaternion.slerp(t,.15)}if(this.engine.battleState&&this.bookMesh&&this.bookMesh.visible){let e=this.engine.runState,t=e.colorLevels||{red:1,black:1,green:1,gold:1,purple:1,cyan:1,crimson:1},n=e.colorUnlocks||{red_ability:!1,black_ability:!1,green_ability:!1},r=this.engine.battleState.boardModifiers,i=`${t.red}_${t.black}_${t.green}_${t.gold}_${t.purple}_${t.cyan}_${t.crimson}_${n.red_ability}_${n.black_ability}_${n.green_ability}_${r?.redStreakCount||0}_${r?.blackStreakCount||0}_${r?.insuranceActive||!1}_${r?.enemyStunTurns||0}`;i!==this.lastBookStateKey&&(this.lastBookStateKey=i,this.updateBookTexture())}if(this.engine.battleState){this.syncHand(this.engine.battleState.hand),this.syncPlayedCards(this.engine.battleState.activePlayedCards||[]),this.performRaycasting(),this.updateCardTargets(),this.updatePlayedCardTargets();let e=new W(1,1,1);this.activeView===1?e.set(.5,.5,.5):this.activeView===2?e.set(.35,.35,.35):this.activeView===3||this.activeView===5||this.activeView===6||this.activeView===7?e.set(.01,.01,.01):this.activeView===4&&e.set(.3,.3,.3),this.cardVisuals.forEach(t=>{let n=t.mesh.userData.targetScale||e;t.mesh.scale.lerp(n,.08)}),this.handGroup.scale.set(1,1,1);let t=this.engine.battleState.bets.map(e=>`${e.type}-${e.amount}-${e.numberValue||0}`).join(`|`)+`|pool-${this.engine.battleState.chipsPool}`;if(t!==this.lastBetsHash&&(this.lastBetsHash=t,this.syncChips()),this.engine.battleState.turn!==this.lastTurnIndex&&(this.lastTurnIndex=this.engine.battleState.turn,this.hasFocusedDeckThisTurn=!1),this.ui&&this.ui.mobileModeActive){let e=this.engine.battleState;if(e.phase===`betting`){let t=(e.drawPile.length>0||e.discardPile.length>0)&&e.hand.length<8;e.drawsThisTurn===0&&t?this.hasFocusedDeckThisTurn||=(this.manualView=9,!0):e.drawsThisTurn>0&&this.manualView===9&&(this.manualView=1)}}let n=this.engine.battleState.drawPile.length,r=this.engine.getDrawCardCost();(n!==this.lastDrawPileCount||r!==this.lastDrawCardCost)&&(this.lastDrawPileCount=n,this.lastDrawCardCost=r,this.syncDeck());let i=this.manualView,a=document.getElementById(`resolution-overlay`),o=a&&!a.classList.contains(`hidden`),s=this.engine.battleState?.isResolving;if((this.engine.battleState.phase===`spinning`||o||s)&&(i=this.engine.battleState?.activeWheelOwner===`enemy`?6:3),this.ui&&this.ui.isCombatIntroActive&&(i=7),this.activeView=i,this.activeView===1)this.cameraTargetPos.set(0,.8,1.25),this.cameraTargetLookAt.set(0,.25,.8);else if(this.activeView===2){let e=this.ui&&this.ui.mobileModeActive?this.boardHorizontalOffset:0;this.ui&&this.ui.mobileModeActive?(this.cameraTargetPos.set(0+e,1.6,1.15),this.cameraTargetLookAt.set(0+e,0,.45)):(this.cameraTargetPos.set(0,1.5,.7),this.cameraTargetLookAt.set(0,0,.45))}else if(this.activeView===3)this.ui&&this.ui.mobileModeActive?(this.cameraTargetPos.set(-.8,1.75,.85),this.cameraTargetLookAt.set(-.8,.05,-.75)):(this.cameraTargetPos.set(-.8,1.25,.35),this.cameraTargetLookAt.set(-.8,.05,-.75));else if(this.activeView===6)this.ui&&this.ui.mobileModeActive?(this.cameraTargetPos.set(.8,1.75,.85),this.cameraTargetLookAt.set(.8,.05,-.75)):(this.cameraTargetPos.set(.8,1.25,.35),this.cameraTargetLookAt.set(.8,.05,-.75));else if(this.activeView===5){let e=this.oppAnimType===`card_play`?Math.min(1,this.oppAnimTime/3.5):0;this.oppAnimType===`card_play`&&e>=.2&&e<.8?(this.cameraTargetPos.set(0,.85,-1.35),this.cameraTargetLookAt.set(0,.35,-1.95)):this.ui&&this.ui.mobileModeActive?(this.cameraTargetPos.set(-.4,1.95,.05),this.cameraTargetLookAt.set(0,.1,-1.95)):(this.cameraTargetPos.set(-.4,1.75,-.45),this.cameraTargetLookAt.set(0,.1,-1.95))}else if(this.activeView===7)this.ui&&this.ui.mobileModeActive?(this.cameraTargetPos.set(0,1.55,-.45),this.cameraTargetLookAt.set(0,1.25,-3)):(this.cameraTargetPos.set(0,1.45,-.95),this.cameraTargetLookAt.set(0,1.25,-3));else if(this.activeView===9){let e=this.ui&&this.ui.mobileModeActive?this.boardHorizontalOffset:0;this.cameraTargetPos.set(-.75+e,1.25,1),this.cameraTargetLookAt.set(-.75+e,.05,.65)}else this.ui&&this.ui.mobileModeActive?(this.cameraTargetPos.set(0,2.2,1.8),this.cameraTargetLookAt.set(0,.1,-.2)):(this.cameraTargetPos.set(0,1.9,1.5),this.cameraTargetLookAt.set(0,.1,-.2))}else n?(this.activeView=8,this.cameraTargetPos.set(0,1.25,.95),this.cameraTargetLookAt.set(-.25,.45,-.5),this.wheelVis.group.parent!==this.forgeScene&&(this.forgeScene.add(this.wheelVis.group),this.wheelVis.group.position.set(-.9,.55,-.5),this.wheelVis.group.scale.set(.45,.45,.45),this.syncForgeCards()),this.wheelVis.group.rotation.y+=.005,this.forgeFurnaceLight&&(this.forgeFurnaceLight.intensity=2.5+Math.sin(t*5)*.8),this.updateForgeSparks(t),this.performForgeRaycasting(),this.syncForgeCards(),this.forgeCardsVisuals.forEach(e=>e.update(.12))):r?(this.activeView=9,this.cameraTargetPos.set(0,1.2,.85),this.cameraTargetLookAt.set(0,.45,-.4),this.wheelVis.group.parent===this.forgeScene&&(this.scene.add(this.wheelVis.group),this.wheelVis.group.position.set(-.8,.05,-.75),this.wheelVis.group.rotation.set(0,0,0),this.wheelVis.group.scale.set(.55,.55,.55)),this.performShopRaycasting(),this.syncShopItems(),this.shopItemsVisuals.forEach(e=>e.update(.12))):i?(this.activeView=10,this.cameraTargetPos.set(0,1.25,.95),this.cameraTargetLookAt.set(0,.5,-.4),this.wheelVis.group.parent===this.forgeScene&&(this.scene.add(this.wheelVis.group),this.wheelVis.group.position.set(-.8,.05,-.75),this.wheelVis.group.rotation.set(0,0,0),this.wheelVis.group.scale.set(.55,.55,.55)),this.performEventRaycasting(),this.syncEventChoices(),this.eventChoicesVisuals.forEach(e=>e.update(.12))):(this.wheelVis.group.parent===this.forgeScene&&(this.scene.add(this.wheelVis.group),this.wheelVis.group.position.set(-.8,.05,-.75),this.wheelVis.group.rotation.set(0,0,0),this.wheelVis.group.scale.set(.55,.55,.55),this.forgeCardsVisuals.forEach(e=>this.forgeCardsGroup.remove(e.mesh)),this.forgeCardsVisuals=[]),this.shopItemsVisuals.length>0&&(this.shopItemsVisuals.forEach(e=>this.shopCardsGroup.remove(e.mesh)),this.shopItemsVisuals=[],this.hoveredShopItemId=null),this.eventChoicesVisuals.length>0&&(this.eventChoicesVisuals.forEach(e=>this.eventChoicesGroup.remove(e.mesh)),this.eventChoicesVisuals=[],this.hoveredEventChoiceId=null),this.activeView=4,this.cameraTargetPos.set(Math.sin(t*.15)*.5,1.5,1.4),this.cameraTargetLookAt.set(0,0,-.8),this.cardVisuals.forEach(e=>this.handGroup.remove(e.mesh)),this.cardVisuals=[],this.handGroup.scale.set(1,1,1),this.playedCardVisuals.forEach(e=>this.playedCardsGroup.remove(e.mesh)),this.playedCardVisuals=[],this.chipMeshes.length>0&&(this.syncChips(),this.lastBetsHash=``));if(this.oppAnimType===`card_play`&&this.oppActionCardMesh){this.oppAnimTime+=.016;let e=Math.min(1,this.oppAnimTime/3.5);if(e<.2){let t=e/.2;this.oppActionCardMesh.position.set(0,.1+t*.25,-2.62+t*.67),this.oppActionCardMesh.rotation.set(-Math.PI/2+t*(Math.PI/2+.3),Math.PI-t*Math.PI,0)}else if(e<.8)this.oppActionCardMesh.position.set(0,.35,-1.95),this.oppActionCardMesh.rotation.set(.3,0,0);else{let t=(e-.8)/.2;this.oppActionCardMesh.position.set(0,.35-t*.3,-1.95),this.oppActionCardMesh.rotation.set(.3-t*(Math.PI/2+.3),0,0)}if(this.oppAnimChips.length>0){let t=.3;if(e>t){let n=Math.min(1,(e-t)/(.8-t)),r=1-(1-n)**3;this.oppAnimChips.forEach(e=>{let t=e.userData.startPosition,i=e.userData.targetPosition;t&&i&&(e.position.x=t.x+(i.x-t.x)*r,e.position.y=t.y+(i.y-t.y)*r+Math.sin(n*Math.PI)*.15,e.position.z=t.z+(i.z-t.z)*r)})}}e>=1&&(this.oppAnimType=`none`,this.scene.remove(this.oppActionCardMesh),this.oppActionCardMesh=null,this.oppAnimChips.forEach(e=>this.scene.remove(e)),this.oppAnimChips=[])}this.engine.battleState||(this.deckCostMesh&&this.deckCostMesh.parent&&this.scene.remove(this.deckCostMesh),this.isBookZoomed=!1);let m=0,h=0,g=this.ui&&this.ui.mobileModeActive;this.activeView===4&&this.isDraggingOverview&&this.mouse.x!==-999&&!g?(m=this.mouse.x*1.5,h=this.mouse.y*.8,this.overviewPanOffsetX+=(m-this.overviewPanOffsetX)*.05,this.overviewPanOffsetY+=(h-this.overviewPanOffsetY)*.05):(this.overviewPanOffsetX+=(0-this.overviewPanOffsetX)*.05,this.overviewPanOffsetY+=(0-this.overviewPanOffsetY)*.05);let _=this.cameraTargetPos.clone(),v=this.cameraTargetLookAt.clone();if(this.activeView===4){let e=this.overviewPanOffsetX/1.5*(Math.PI/2),t=-1.15+this.overviewPanOffsetY/.8*(Math.PI/6),n=new W(0,0,-1);n.applyAxisAngle(new W(1,0,0),t),n.applyAxisAngle(new W(0,1,0),-e),n.multiplyScalar(2),v.copy(_).add(n)}else _.x+=this.overviewPanOffsetX,_.y+=this.overviewPanOffsetY,v.x+=this.overviewPanOffsetX*.5,v.y+=this.overviewPanOffsetY*.5;this.camera.position.lerp(_,.08),this.cameraCurrentLookAt.lerp(v,.08),this.camera.lookAt(this.cameraCurrentLookAt),this.cardVisuals.forEach(e=>e.update(.12)),this.playedCardVisuals.forEach(e=>e.update(.12)),n?(this.renderer.setRenderTarget(null),this.renderer.render(this.forgeScene,this.camera)):r?(this.renderer.setRenderTarget(null),this.renderer.render(this.shopScene,this.camera)):i?(this.renderer.setRenderTarget(null),this.renderer.render(this.eventScene,this.camera)):(this.renderer.setRenderTarget(this.renderTarget),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(null),this.renderer.render(this.postScene,this.postCamera)),this.engine.battleState&&(this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.render(this.handScene,this.camera),this.renderer.autoClear=!0)};updateBrushIndicatorText(e){if(!this.brushIndicatorTextSprite)return;let t=document.createElement(`canvas`);t.width=128,t.height=64;let n=t.getContext(`2d`);n.clearRect(0,0,128,64),n.fillStyle=`rgba(0, 0, 0, 0.75)`,n.strokeStyle=`#ffd700`,n.lineWidth=2,n.beginPath(),n.roundRect(4,4,120,56,8),n.fill(),n.stroke(),n.fillStyle=`#ffffff`,n.font=`bold 24px "Courier Prime", monospace`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(`⚡${e}`,64,32);let r=new Qi(t);r.colorSpace=bt;let i=this.brushIndicatorTextSprite.material.map;this.brushIndicatorTextSprite.material.map=r,i&&i.dispose()}updateBrushDisplay(){if(!this.displayPanelCanvas||!this.displayPanelTex)return;let e=this.displayPanelCanvas.getContext(`2d`);if(e.fillStyle=`#2b1b14`,e.fillRect(0,0,512,128),e.strokeStyle=`#c59f51`,e.lineWidth=6,e.strokeRect(3,3,506,122),e.fillStyle=`#ffffff`,e.font=`bold 36px "Courier Prime", monospace`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`BRUSH: ⚡${this.activeBrush}`,256,64),this.displayPanelTex.needsUpdate=!0,this.brushIndicatorMesh){let e=15022389;this.activeBrush>=10?e=16766287:this.activeBrush>=5&&(e=4431943),this.brushIndicatorMesh.material.color.setHex(e);let t=Math.min(6,Math.ceil(this.activeBrush/2));this.brushIndicatorMesh.scale.y=t}if(this.updateBrushIndicatorText(this.activeBrush),this.ui){let e=this.ui.root.querySelector(`#custom-bet-input`);e&&(e.value=this.activeBrush.toString()),this.ui.currentBetAmount=this.activeBrush}}syncChips(){if(this.chipMeshes.forEach(e=>{this.scene.remove(e),e.geometry.dispose()}),this.chipMeshes=[],!this.engine.battleState)return;let e=new X(.02,.02,.006,8);this.engine.battleState.bets.forEach(t=>{let n=this.getBoardCellPosition(t.type,t.numberValue),r=t.amount,i=[];for(;r>=10;)i.push(10),r-=10;for(;r>=5;)i.push(5),r-=5;for(;r>=1;)i.push(1),--r;i.slice(0,12).forEach((r,i)=>{let a=this.chipMaterials.red;r===5?a=this.chipMaterials.green:r===10&&(a=this.chipMaterials.number);let o=new Y(e,a);o.castShadow=!0,o.receiveShadow=!0,o.userData={isPlacedChip:!0,betType:t.type,numberValue:t.numberValue};let s=(t.type.charCodeAt(0)||0)+(t.numberValue||0)+i,c=Math.sin(s*12.9898)*43758.5453%1*.006,l=Math.cos(s*78.233)*43758.5453%1*.006;o.position.set(n.x+c,n.y+i*.007+.003,n.z+l),this.scene.add(o),this.chipMeshes.push(o)})});let t=this.engine.battleState.chipsPool,n=t>=10?Math.max(1,Math.min(8,Math.floor(t/10))):0,r=t>=5?Math.max(1,Math.min(6,Math.floor(t/5))):0,i=t>=1?Math.max(1,Math.min(8,t)):0,a=this.ui&&this.ui.mobileModeActive,o=a?-.107:.423,s=a?0:.53,c=a?.107:.637,l=a?.85:.9;for(let t=0;t<n;t++){let n=new Y(e,this.chipMaterials.number);n.position.set(o,.005+t*.007+.003,l),n.castShadow=!0,n.receiveShadow=!0,n.userData={isSourceStack:!0,denom:10},this.scene.add(n),this.chipMeshes.push(n)}for(let t=0;t<r;t++){let n=new Y(e,this.chipMaterials.green);n.position.set(s,.005+t*.007+.003,l),n.castShadow=!0,n.receiveShadow=!0,n.userData={isSourceStack:!0,denom:5},this.scene.add(n),this.chipMeshes.push(n)}for(let t=0;t<i;t++){let n=new Y(e,this.chipMaterials.red);n.position.set(c,.005+t*.007+.003,l),n.castShadow=!0,n.receiveShadow=!0,n.userData={isSourceStack:!0,denom:1},this.scene.add(n),this.chipMeshes.push(n)}this.labelsMesh&&this.labelsMesh.position.set(s,.006,l),this.syncDeck()}syncDeck(){this.deckMeshes.forEach(e=>{this.scene.remove(e),e.geometry.dispose()}),this.deckMeshes=[];let e=this.engine.battleState;if(!e){this.deckCostMesh&&this.scene.remove(this.deckCostMesh);return}let t=e.drawPile.length;if(t===0){this.deckCostMesh&&this.scene.remove(this.deckCostMesh);return}let n=Math.max(1,Math.min(6,Math.ceil(t/3))),r=new na(.22,.31,.006),i=new J({map:this.createOpponentCardBackTexture(),fog:!1});for(let e=0;e<n;e++){let t=new Y(r,i);t.rotation.x=-Math.PI/2,t.rotation.z=(Math.random()-.5)*.05;let n=(Math.random()-.5)*.003,a=(Math.random()-.5)*.003;t.position.set(-.75+n,.005+e*.007,.65+a),t.userData={isDrawDeck:!0},this.scene.add(t),this.deckMeshes.push(t)}let a=this.engine.getDrawCardCost(),o=a===0?`DRAW: FREE`:`DRAW: ${a} ⚡`;if(this.deckCostMesh){let{canvas:e,ctx:t,texture:n}=this.deckCostMesh.userData;t.fillStyle=`#2b1b14`,t.fillRect(0,0,512,128),t.strokeStyle=`#c59f51`,t.lineWidth=6,t.strokeRect(3,3,506,122),t.fillStyle=`#c59f51`,t.font=`bold 48px "Courier Prime", monospace`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(o,256,64),n.needsUpdate=!0,this.deckCostMesh.parent||this.scene.add(this.deckCostMesh)}else{let e=document.createElement(`canvas`);e.width=512,e.height=128;let t=e.getContext(`2d`);t.fillStyle=`#2b1b14`,t.fillRect(0,0,512,128),t.strokeStyle=`#c59f51`,t.lineWidth=6,t.strokeRect(3,3,506,122),t.fillStyle=`#c59f51`,t.font=`bold 48px "Courier Prime", monospace`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(o,256,64);let n=new Qi(e);n.minFilter=N;let r=new J({map:n,side:2}),i=new Y(new sa(.22,.055),r);i.position.set(-.75,.006,.82),i.rotation.x=-Math.PI/2,i.userData={canvas:e,ctx:t,texture:n},this.scene.add(i),this.deckCostMesh=i}}getBoardCellPosition(e,t){let n=512,r=256,i=this.engine.battleState,a=i&&i.activeWheelOwner===`enemy`,o=i?a?i.enemyWheel:i.playerWheel:this.engine.runState.playerWheel,s=a?-1.95:.45,c=1.2,l=(a?this.enemyOutsideBets:this.playerOutsideBets).find(t=>t.type===e);if(l)n=l.xStart+l.width/2,r=l.yStart+l.height/2;else if(e===`number`&&t!==void 0)if(o.greenNumbers.includes(t))n=100,r=190;else{let e=o.numbers.filter(e=>!o.greenNumbers.includes(e)).sort((e,t)=>e-t),i=e.indexOf(t);if(i>=0){let t=820/Math.ceil(e.length/3),a=Math.floor(i/3),o=2-i%3;n=160+a*t+t/2,r=40+o*100+50}}let u,d;return a?(u=0-(n/1024-.5)*c,d=-(r/512-.5)*.55):(u=0+(n/1024-.5)*c,d=(r/512-.5)*.55),new W(u,.005,s+d)}initBook(){this.bookCanvas=document.createElement(`canvas`),this.bookCanvas.width=512,this.bookCanvas.height=512,this.bookTexture=new Qi(this.bookCanvas),this.bookTexture.colorSpace=bt,this.bookMesh=new Un;let e=new Y(new na(.38,.015,.28),new J({color:4004360}));e.position.y=-.0075,e.castShadow=!0,this.bookMesh.add(e);let t=new Y(new sa(.36,.26),new J({map:this.bookTexture,fog:!1}));t.rotation.x=-Math.PI/2,t.position.y=.001,this.bookMesh.add(t),this.bookMesh.position.set(-.8,.012,.15),this.bookMesh.rotation.y=Math.PI/10,this.scene.add(this.bookMesh),this.updateBookTexture()}updateBookTexture(){if(!this.bookCanvas||!this.bookTexture)return;let e=this.bookCanvas.getContext(`2d`);e.fillStyle=`#f3ebd9`,e.fillRect(0,0,512,512),e.strokeStyle=`rgba(139, 101, 8, 0.2)`,e.lineWidth=2,e.strokeRect(10,10,236,492),e.strokeRect(266,10,236,492),e.strokeStyle=`#c8b693`,e.lineWidth=3,e.beginPath(),e.moveTo(256,10),e.lineTo(256,502),e.stroke();let t=e.createLinearGradient(230,0,282,0);t.addColorStop(0,`rgba(0, 0, 0, 0.0)`),t.addColorStop(.5,`rgba(0, 0, 0, 0.22)`),t.addColorStop(1,`rgba(0, 0, 0, 0.0)`),e.fillStyle=t,e.fillRect(230,0,52,512);let n=this.engine.runState,r=n.colorLevels||{red:1,black:1,green:1,gold:1,purple:1,cyan:1,crimson:1},i=n.colorUnlocks||{red_ability:!1,black_ability:!1,green_ability:!1},a=n.playerWheel.payoutMultipliers,o=(e,t)=>`${this.engine.getScaledPayoutMultiplier(e,t).toFixed(1)}x`;e.fillStyle=`#3e2723`,e.textAlign=`center`,e.font=`bold 24px "Courier Prime", Courier, monospace`,e.fillText(`COLOR LEVELS`,128,48),e.font=`italic 12px "Courier Prime", Courier, monospace`,e.fillText(`Basic Multipliers`,128,70),e.strokeStyle=`rgba(62, 39, 35, 0.3)`,e.lineWidth=1,e.beginPath(),e.moveTo(30,80),e.lineTo(226,80),e.stroke();let s=[{name:`Red`,hex:`#d32f2f`,lvl:r.red,mult:o(`red`,a.red),ability:i.red_ability?`🔥 FEVER`:`🔒 LOCKED`},{name:`Black`,hex:`#333333`,lvl:r.black,mult:o(`black`,a.black),ability:i.black_ability?`❄️ GLACIER`:`🔒 LOCKED`},{name:`Green`,hex:`#2e7d32`,lvl:r.green,mult:o(`green`,a.green),ability:i.green_ability?`⚡ SYNAPSE`:`🔒 LOCKED`},{name:`Gold`,hex:`#f57f17`,lvl:r.gold,mult:o(`gold`,a.gold||4),ability:`✨ MIDAS`}];e.textAlign=`left`,s.forEach((t,n)=>{let r=120+n*85;e.fillStyle=t.hex,e.beginPath(),e.arc(35,r,7,0,Math.PI*2),e.fill(),e.fillStyle=`#3e2723`,e.font=`bold 18px "Courier Prime", Courier, monospace`,e.fillText(t.name.toUpperCase(),50,r+6),e.font=`bold 15px "Courier Prime", Courier, monospace`,e.fillText(`Lvl ${t.lvl}`,50,r+26),e.fillText(t.mult,140,r+26),e.font=`bold 12px "Courier Prime", Courier, monospace`,e.fillStyle=t.ability.includes(`LOCKED`)?`#8d6e63`:`#d84315`,e.fillText(t.ability,50,r+46)}),e.textAlign=`center`,e.fillStyle=`#3e2723`,e.font=`bold 24px "Courier Prime", Courier, monospace`,e.fillText(`SPECIAL TYPES`,384,48),e.font=`italic 12px "Courier Prime", Courier, monospace`,e.fillText(`Occurrences & Effects`,384,70),e.strokeStyle=`rgba(62, 39, 35, 0.3)`,e.lineWidth=1,e.beginPath(),e.moveTo(286,80),e.lineTo(482,80),e.stroke();let c=[{name:`Purple`,hex:`#7b1fa2`,lvl:r.purple,mult:o(`purple`,a.purple||4),ability:`🔮 CURSE`},{name:`Cyan`,hex:`#0097a7`,lvl:r.cyan,mult:o(`cyan`,a.cyan||4),ability:`🔋 CHARGE`},{name:`Crimson`,hex:`#c2185b`,lvl:r.crimson,mult:o(`crimson`,a.crimson||6),ability:`🩸 SURGE`}];e.textAlign=`left`,c.forEach((t,n)=>{let r=120+n*85;e.fillStyle=t.hex,e.beginPath(),e.arc(295,r,7,0,Math.PI*2),e.fill(),e.fillStyle=`#3e2723`,e.font=`bold 18px "Courier Prime", Courier, monospace`,e.fillText(t.name.toUpperCase(),310,r+6),e.font=`bold 15px "Courier Prime", Courier, monospace`;let i=this.engine.battleState&&(this.engine.battleState.playerScore||0)<(this.engine.battleState.enemyScore||0),a=t.name===`Crimson`&&i?`${t.mult} (x2)`:t.mult;e.fillText(`Lvl ${t.lvl}  ${a}`,310,r+26),e.font=`bold 12px "Courier Prime", Courier, monospace`,e.fillStyle=`#d84315`,e.fillText(t.ability,310,r+46)}),e.fillStyle=`#3e2723`,e.font=`bold 18px "Courier Prime", Courier, monospace`,e.fillText(`CURRENT MODS`,300,385),e.strokeStyle=`rgba(62, 39, 35, 0.3)`,e.lineWidth=1,e.beginPath(),e.moveTo(286,393),e.lineTo(482,393),e.stroke(),e.font=`bold 13px "Courier Prime", Courier, monospace`,e.fillStyle=`#4e342e`;let l=this.engine.battleState?.boardModifiers,u=`Streak: None`;l&&((l.redStreakCount||0)>0?u=`Red Streak: x${l.redStreakCount}`:(l.blackStreakCount||0)>0&&(u=`Black Streak: x${l.blackStreakCount}`)),e.fillText(u,300,413);let d=`Shield: Inactive`;l?.insuranceActive&&(d=`Insurance Active`),e.fillText(d,300,433);let f=`Stun Turns: 0`;l?.enemyStunTurns&&(f=`Enemy Stunned: ${l.enemyStunTurns}t`),e.fillText(f,300,453),this.bookTexture.needsUpdate=!0}};document.addEventListener(`DOMContentLoaded`,()=>{let e=document.querySelector(`#app`),t=new ne,n=new re;n.loadTitleMusic();let r=new ie(t,n,e),i=()=>{t.runState.gameState===`MENU`?n.playTitleMusic():n.initContext(),document.removeEventListener(`pointerdown`,i),document.removeEventListener(`keydown`,i)};document.addEventListener(`pointerdown`,i),document.addEventListener(`keydown`,i);let a=new Ql(t,document.querySelector(`#canvas-container`),n);r.setRenderer(a),a.onCardClicked=e=>{r.playCard(e)},a.onPlayedCardClicked=e=>{r.removePlayedCard(e)},a.onForgeCardClicked=e=>{t.purchaseForgeCard(e)?(n.playHammerStrike(),a.wheelVis.rebuildWheel(!1,t.runState.playerWheel),r.render()):n.playRouletteClick(.5)},a.onForgeCardHover=e=>{r.setHoveredForgeCard(e)},r.onViewChanged=e=>{a.setView(e)},a.onBetPlaced=()=>{r.render()},a.onBellClicked=()=>{r.bellTrigger()}});