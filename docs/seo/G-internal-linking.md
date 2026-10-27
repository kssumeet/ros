# G — Internal linking map

## Rules
1. **Every service page** links to 2 related services, 1 project and 1 guide, placed in the body copy (not just a "related" box).
2. **Every guide** links to its service page within the first 150 words, and to `/book-a-demo/` at the end.
3. **Homepage:** the "What we build" tiles link to all 6 service pages.
4. **Header:** Services menu (the 6 services), Projects, Guides, Contact, plus a *Book a free demo* button. **Footer:** every page, including all published guides.
5. **Anchor text:** vary it naturally. Use the same exact-match anchor (for example "home theatre installation in Ranchi") at most once per source page, and at most 2–3 times across the whole site. Use descriptive anchors; never "click here".
6. **Links must be real HTML `<a href>`** links to the canonical URL, with a trailing slash and no UTM parameters. Elementor buttons and Icon Box links qualify.
7. **Unpublished targets:** until the projects and month-2/3 guides exist, link to `/projects/` (or the relevant section) instead. Never link to a URL that 404s.

## Map (source → anchor text → target)

### Homepage `/`
| Anchor text | Target | Placement |
|---|---|---|
| Home theatre | /home-theatre-ranchi/ | What we build tile |
| Acoustics | /acoustic-treatment-ranchi/ | tile |
| Automation | /home-automation-ranchi/ | tile |
| Projectors & audio gear | /projectors-audio-gear/ | tile |
| Cinema seating | /cinema-seating/ | tile |
| Corporate AV | /corporate-av-jharkhand/ | tile |
| see the rooms we've built | /projects/ | projects section |
| what a home theatre really costs | /guides/home-theatre-cost-india/ | budget section |
| how big a room Atmos needs | /guides/room-size-dolby-atmos/ | FAQ answer |
| Book a free demo | /book-a-demo/ | hero + final CTA |

### Home theatre `/home-theatre-ranchi/`
| Anchor text | Target | Placement |
|---|---|---|
| acoustic treatment for your theatre | /acoustic-treatment-ranchi/ | "What a design includes" |
| recliners and riser seating | /cinema-seating/ | same section |
| choosing a projector | /projectors-audio-gear/ | projector or TV section |
| one of our dedicated theatres | /projects/ (later /projects/[project-slug]/) | living vs dedicated section |
| room size for Dolby Atmos | /guides/room-size-dolby-atmos/ | Atmos section |
| typical budgets | /guides/home-theatre-cost-india/ | budget section |
| book a free demo | /book-a-demo/ | CTA |

### Acoustics `/acoustic-treatment-ranchi/`
| Anchor text | Target | Placement |
|---|---|---|
| home theatre design | /home-theatre-ranchi/ | home theatre treatment section |
| boardroom AV | /corporate-av-jharkhand/ | boardrooms section |
| a studio we treated | /projects/ (acoustics filter) | studios section |
| how to soundproof a room in India | /guides/soundproof-room-india/ (month 2; until then the cost guide) | soundproofing section |
| request an acoustic assessment | /contact/#enquiry | CTA |

### Automation `/home-automation-ranchi/`
| Anchor text | Target | Placement |
|---|---|---|
| dedicated home theatre | /home-theatre-ranchi/ | theatre automation section |
| motorised screens and projectors | /projectors-audio-gear/ | motorised screens section |
| a lighting-scene project | /projects/ | scenes section |
| living-room setups | /guides/living-room-home-theatre-setups/ (month 3; until then /guides/) | retrofit section |
| book an automation demo | /book-a-demo/ | CTA |

### Gear `/projectors-audio-gear/`
| Anchor text | Target | Placement |
|---|---|---|
| full home theatre installation | /home-theatre-ranchi/ | intro |
| room treatment | /acoustic-treatment-ranchi/ | Hi-Fi section |
| a recent Atmos install | /projects/ | receivers section |
| projector or TV? | /guides/projector-vs-tv-home-theatre/ (month 2; until then the Atmos guide) | projector section |
| hear it in our demo room | /book-a-demo/ | CTA |

### Seating `/cinema-seating/`
| Anchor text | Target | Placement |
|---|---|---|
| planning a dedicated theatre | /home-theatre-ranchi/ | rows and risers section |
| auditorium sound and AV | /corporate-av-jharkhand/ | auditorium section |
| a two-row cinema we built | /projects/ | intro |
| choosing recliners for a home cinema | /guides/home-cinema-recliners/ (month 3; until then the Atmos guide's seating section) | space section |
| arrange a seating visit | /contact/#enquiry | CTA |

### Corporate AV `/corporate-av-jharkhand/`
| Anchor text | Target | Placement |
|---|---|---|
| acoustic treatment for meeting rooms | /acoustic-treatment-ranchi/ | VC section |
| auditorium seating | /cinema-seating/ | auditorium section |
| a boardroom project | /projects/ (corporate filter) | intro |
| boardroom AV checklist | /guides/boardroom-av-checklist/ (month 3; until then none) | survey section |
| request a proposal | #proposal | CTA |

### Projects `/projects/`
Each case study links to its service page (for example "home theatre installation"), one guide, and *Book a free demo*.

### Book a demo `/book-a-demo/`
| Anchor text | Target |
|---|---|
| what to expect from a home theatre | /home-theatre-ranchi/ |
| room-size guide (measure before you visit) | /guides/room-size-dolby-atmos/ |
| contact and directions | /contact/ |

### Guides index `/guides/`
Links to every published guide (title as anchor), plus *Book a free demo*.

### Contact `/contact/`
Links to *Book a free demo* (Calendly) and the corporate proposal form (`/corporate-av-jharkhand/#proposal`).

### Guide: cost `/guides/home-theatre-cost-india/`
| Anchor text | Target | Position |
|---|---|---|
| home theatre design and installation in Ranchi | /home-theatre-ranchi/ | **first 150 words** |
| acoustic treatment | /acoustic-treatment-ranchi/ | mistakes section |
| recliners | /cinema-seating/ | trade-offs section |
| room size for Dolby Atmos | /guides/room-size-dolby-atmos/ | related |
| Book a free demo | /book-a-demo/ | **end** |

### Guide: Atmos room size `/guides/room-size-dolby-atmos/`
| Anchor text | Target | Position |
|---|---|---|
| Dolby Atmos home theatre installation | /home-theatre-ranchi/ | **first 150 words** |
| cinema seating | /cinema-seating/ | seating section |
| acoustic treatment | /acoustic-treatment-ranchi/ | room shape section |
| what a home theatre costs in India | /guides/home-theatre-cost-india/ | related |
| Book a free demo | /book-a-demo/ | **end** |

### Month 2–3 guides
Each follows the guide rule: its service page in the first 150 words, one sibling guide, and *Book a free demo* at the end. The anchors are listed in each brief in `H-content-plan.md`.

## Exact-match anchor budget (site-wide)
| Exact-match anchor | Allowed uses | Where |
|---|---|---|
| home theatre installation in Ranchi | 1 | cost guide |
| acoustic treatment in Ranchi | 1 | homepage FAQ or soundproof guide |
| projector dealer in Ranchi | 1 | projector vs TV guide |
| home automation in Ranchi | 1 | living-room setups guide |
| Everywhere else | — | varied descriptive anchors, as in the tables above |
