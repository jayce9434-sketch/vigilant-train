# My Singing Dogs — The Expansion (v2.0)

A self-contained, original music/collection browser game made to publish to GitHub Pages. The creator's icy dog image is the icon and their tan-and-white dog image guided the custom canine artwork. This version replaces and extends v1 without needing accounts or external services.

## Publishing

Extract **every file directly into the root** of a GitHub repository. In repository Settings → Pages, choose **Deploy from a branch**, branch **main**, folder **/(root)**. Open the resulting GitHub Pages URL. No npm, libraries, CDNs, servers or build processes required. Do not place the files in a nested subfolder. This package contains fewer than 100 files.

## Three independent musical islands

- **Plant Island:** Wind, Stone, Tech. The Green Overture, 2:17, eight original synchronized main-dog tracks.
- **Ice Island:** Wind, Stone, Cold. Aurora Nocturne, 2:40, eight main-dog tracks, plus an exclusive winter seasonal performance.
- **Wind Island:** Wind, Stone, Water. Cloudborne Symphony, 2:28, eight new instrumental/harmony tracks including strings, low bass, flute, harp, brass and choir. The 64-bar score includes changing entries, featured solos, sustained notes and rests.
- Three bonus types (mechanical dog and two prize-exclusive performers) have supplementary synchronized instrument tracks on every island. Musical Rares retain their normal species' part. In-game dog animations follow the corresponding timed note events. Original synthesized/sampled music, not copied MSM audio.

## New progression and economy

- Unlock **Ice Island for 25,000 coins**, **Wind Island for 65,000 coins**. Prior v1 saves retain access to Ice.
- Castle capacities grow **10 → 16 → 24 → 32 → 48 → 64** per island; large upgrades cost serious coins. Coins also fund breeding, bakery batches, bakery construction, Wishing Torches and their lighting, Vaults, Song Monuments, expensive Howltron shells, and optional gem exchange.
- Build up to **three bakeries per island** and produce treats in **10-minute, 30-minute, 60-minute or 2-hour** batches. Ovens keep working while away; collect completed batches before starting new ones.
- Upgrade Coin Vaults to raise income and storage and Song Monuments to raise experience. Sell placed dogs for coins; storage holds prizes earned while the castle was full.
- Each island has its own nursery egg. Common singles take 15m; doubles 45m; triples 1h 45m; Mythicals 3h. Rares can require longer. **Rare Ice Mythical = 4h; Rare Ice Seasonal = 3h 30m.** No egg incubation exceeds four hours. Speeding costs **one gem per remaining hour, rounded up**, at most 4 gems per egg.

## Rares, Mythicals, Seasonals, Howltrons

- Every base species has its own **Rare visual variant** with custom crystal-and-gold adornments and extra earnings; these variants appear as separate collection entries.
- Double + Triple has **exactly 5% base Mythical chance**. Rares roll separately with 4% base chance. There is **no guaranteed-pity timer**. Each lit Wishing Torch adds **1.5 percentage points** to both probabilities, up to 10 lit torches. Torches cost coins to build, cost 3,500 coins to light, and stay lit four hours.
- **Jinglepup** is Ice-exclusive, including Rare Jinglepup. Breed **Frostle (Cold) + Glacierhorn (triple)** during **December 15–30**, or weekly from **Thursday 11 PM to Friday 8 AM Eastern Time**, for a 12% seasonal breed chance. **Rare Jinglepup exclusively uses a 15% Rare-form roll, increased by 2 percentage points per lit Ice Wishing Torch (35% with all 10 lit), conditional on the 12% seasonal Jinglepup result.** All other Rares keep the normal odds. Without torches, a Rare Jinglepup is 1.8% per eligible breeding attempt (12% × 15%); with 10 lit, it is 4.2% (12% × 35%).
- Build dormant **Howltron** and **Rare Howltron** shells using coins. Activate one by permanently consuming **one of each of that island's eight base dogs of matching rarity**, INCLUDING its Mythical. The winter seasonal, game-prize exclusives, and the mechanical Howltron itself are not required. Both have organ parts and strong coin production.
- The **Paw Spin Wheel** has one free daily spin and costs **2 gems** for further spins; **Scratch Tickets** have one free daily ticket and cost **5 gems** for further tries. Prizes include coins, gems, treats, Rares, and distinct **Luckypaw** and **Scratchpaw** dog species that can **only** be won from their respective games. Free uses reset at midnight in **America/New_York**. Scratch the card with touch/mouse to reveal the prize.

## Save compatibility and data

Progress automatically saves to the same browser-local storage slot as v1. An older v1 save is migrated into v2 (existing dogs, coins, gems, achievements and collections retained). You can export a JSON backup from Settings and import it elsewhere. Local browser storage can be cleared by the browser or user; backups are strongly recommended.

## Art and performance limitations

All character sprites are transparent WebP. Rare outfits include decorative crystal crown, sparkling halos and jeweled collars, beyond a tint. Wind scenery is an original custom variant with open-sky windmills and streaming air details. Existing performance mouth elements are retained in a compact atlas to stay below 100 files. The animations are note-driven image layers, **not professional skeletal/frame-by-frame lip animation**. Instrument tracks are sampled from a General MIDI soundfont, **not studio-recorded dog vocals**.

## Security / access

This was intended as a private gift for the creator and Mason. Publishing with GitHub Pages **does not provide actual two-person access control**. Anyone who discovers the URL may open the site. Do not mistake a private repository, hidden link, or JavaScript password for access restriction. For genuine exclusivity, use hosting that supports authenticated authorization.

## Testing

Tested using Playwright with real Chromium rendering of the delivered HTML/CSS/JS and local assets intercepted through a local virtual host (this environment blocks direct navigation). Tests cover loading the app, new panels, species graphics and menus. More thorough scripted gameplay tests are included in the delivery screenshots. Live GitHub Pages deployment, service-worker installation on a real device, and physical iPad Safari were **not** verified here; no claim of flawless operation is made.


## V2 touch controls + starter gems patch
- New save files begin with **30 gems** instead of 18. Existing saves keep their earned/spent gems unchanged.
- Browser UI uses `touch-action: manipulation` to prevent double-tap zoom while retaining pinch zoom and scrolling.
- Game labels, dog art and buttons cannot be accidentally selected or invoke long-press copy/lookup menus on supported browsers. Text inputs remain editable.
- Special Rare Jinglepup breeding chance remains **15%** base / **35%** with ten lit Ice torches.
- Note: the iOS text-selection menu inside the ChatGPT app itself is outside the game's control.
