# I — Tracking and reporting

## Files
- **`I-keyword-baseline.csv`:** all **63 keywords** in the map (the proposal says 60; the map as written has 63). Each row has its priority, target page and empty columns for volume/difficulty [from Keyword Planner], day-0 rank and the URL ranking now, then rank at days 30, 60, 90 and 180 against their targets. Import it into Google Sheets.
- **Rank tracker:** set the location to **Ranchi, Jharkhand** (not India-wide). Track on mobile and desktop.
  - **Tools:** SE Ranking, Semrush Position Tracking, or a free local check with a VPN and Google's `&near=Ranchi` parameter.
  - **GBP visibility:** track map-pack position separately with a local grid tool such as Local Falcon or BrightLocal.

## Baseline sheet layout (one Google Sheet, 4 tabs)

### Tab 1: Keywords (from the CSV)
| Keyword | Priority | Target page | Volume / difficulty [from Keyword Planner] | Rank day 0 | URL ranking day 0 | Rank d30 | Rank d60 | Target d90 | Rank d90 | Target d180 | Rank d180 | Notes |

### Tab 2: Google Business Profile (monthly, from GBP → Performance)
| Month | Profile views (Search) | Profile views (Maps) | Calls | Direction requests | Website clicks | Messages | Bookings | New reviews | Total reviews | Average rating | Posts published | Photos added |

### Tab 3: Website (monthly, GA4 + Search Console)
| Month | Organic sessions | Organic engaged sessions | GSC clicks | GSC impressions | Average position | Pages indexed | CWV mobile (LCP / CLS / INP, p75) |

### Tab 4: Leads by source (weekly)
| Week | Calls (`click_call`) | WhatsApp (`click_whatsapp`) | Forms (`generate_lead`) | Demo bookings (`demo_booked`) | GBP calls | Leads ROS confirms as genuine | Source notes |

The last column matters: ROS should tell us weekly which leads were real enquiries, so we report outcomes, not just clicks.

## Targets (from the proposal)
| Metric | Day 30 | Day 90 | Day 180 |
|---|---|---|---|
| "home theatre ranchi" (local rank) | baseline | top 10 | top 3 |
| Keywords in top 10 | baseline | 12 | 30+ |
| Google reviews (rating ≥ 4.6) | 25+ | 60+ | 100+ |

**Reality check on review targets.** The current count is [X]. Reaching 25+ by day 30 needs ROS to send review requests to **every** past customer in week 3, using the E-google-business-profile.md programme. **Never** offer incentives, hold contests or ask only happy customers: that breaks Google's policy and risks the profile being suspended or reviews removed. If the past-customer list is short, adjust the day-30 target with ROS rather than pushing harder.

Rankings depend on competition we haven't measured yet. Set the day-90 and day-180 targets for P2/P3 keywords after the day-0 baseline and the Keyword Planner volumes are in.

## Extra long-tail keywords — suggested, verify
These are the kinds of searches Indian buyers type, including Hinglish and questions. **No volumes are known.** Check each in Keyword Planner and Search Console before assigning it, then give each to exactly one page.

| # | Suggested keyword | Suggested page |
|---|---|---|
| 1 | home theatre kitne ka aata hai | /guides/home-theatre-cost-india/ |
| 2 | ghar me home theatre kaise lagaye | /guides/living-room-home-theatre-setups/ |
| 3 | dolby atmos ke liye kitna bada room chahiye | /guides/room-size-dolby-atmos/ |
| 4 | best home theatre shop near me ranchi | / (local intent; GBP does most of the work) |
| 5 | home theatre for 12x15 room | /guides/room-size-dolby-atmos/ |
| 6 | 5.1 vs 7.1 home theatre which is better | /guides/soundbar-vs-home-theatre/ or a new FAQ, after checking intent |
| 7 | projector screen size for 10 feet distance | /guides/room-size-dolby-atmos/ (calculator section) |
| 8 | room soundproofing cost in india | /guides/soundproof-room-india/ |
| 9 | acoustic panels price in ranchi | /acoustic-treatment-ranchi/ (FAQ; quote ₹[X]–[Y] only once confirmed) |
| 10 | home theatre installation charges | /guides/home-theatre-cost-india/ |
| 11 | recliner chair for home theatre price | /guides/home-cinema-recliners/ |
| 12 | best projector for home under 1 lakh | /guides/projector-vs-tv-home-theatre/ (only with real, current models) |
| 13 | how to make a home theatre room in an apartment | /guides/living-room-home-theatre-setups/ |
| 14 | conference room setup for zoom meeting | /guides/boardroom-av-checklist/ |
| 15 | studio setup in ranchi | /acoustic-treatment-ranchi/ (studios section) |

## Monthly report (one page, for ROS)
1. Leads by source (Tab 4) and how many ROS confirmed as genuine.
2. GBP calls, direction requests and reviews, against target.
3. Movement on the 10 P1 keywords.
4. What we shipped this month, and what's blocked waiting on ROS (the placeholders list).
5. Next month's three priorities.
