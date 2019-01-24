# artifact-gacha
All the fun of opening artifact card packs without the money (Currently on hold, need to learn ReactJS first)

# TODO

# Frontend (To be done in ReactJS)
## User Interface
- Opening Session
  - ~12 cards (6x2)~ (Done kinda?)
  - ~Open new pack button~
  - Start over button
- Session Summary
  - Total spent
  - No. rares obtained
  - No. uncommons obtained
  - No. commons obtained
  - No. items obtained
  - No. heroes obtained
  - Expected value?
  - List of cards obtained
## Animations
- Card (Face Down)
  - OnHover => Glowing borders, lerp to higher elevation
  - OffHover => Remove glowing borders, lerp to lower elevation
  - OnClick => Turn card over
- Card (Face Up)
  - OnHover => Glowing border, raise elevation
  - OffHover => Remove glowing borders, lerp to lower elevation
  - OnClick => Magnify?
- Buttons?

# Backend
## Opening Session
- ~$2.69 CAD per session~
- ~12 cards~
- 1 Rare (Unable to determine card rarity from API, will need to do a rarity mapper in DB)
- 3 Uncommon (Unable to determine card rarity from API, will need to do a rarity mapper in DB)
- 8 Common (Unable to determine card rarity from API, will need to do a rarity mapper in DB)
- ~1 Hero card~
- ~2 Item cards~
- Commons and uncommons have a 5% chance to upgrade to next tier (Unable to determine card rarity from API, will need to do a rarity mapper in DB)

## Session Summary
- ~No. Packs opened~
- ~Total money spent~
- ~List of cards obtained~
- Implementation

## ~Profiles~
- ~Base account (5 packs)~
- ~Fully leveled account (5 +15 packs)~

# Test
## Frontend
## Backend
