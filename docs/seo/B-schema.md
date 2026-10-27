# B — Structured data (JSON-LD, ready to paste)

Every block below was generated and parsed by `tools/seo/build_pack.py`, so the JSON syntax is valid. **Before publishing:**

1. Replace every `[placeholder]`. Google treats a literal "[lat]" as invalid data, so never publish a block that still contains brackets.
2. Test each page in Google's [Rich Results Test](https://search.google.com/test/rich-results) and at [validator.schema.org](https://validator.schema.org/).

## How to add it without duplicates

**Rank Math (recommended).** It is not installed yet; the free version is enough.
- **Leave on (built in):** Rank Math already outputs `WebSite`, `WebPage`, `BreadcrumbList` (once breadcrumbs are enabled) and `Article` for posts.
  - Set **Titles & Meta → Local SEO**: *Company*, name "Republic of Sound Audio", logo.
  - Its Organization `@id` is `https://rosaudio.com/#organization`, the same as the block below, so the two merge into one entity.
  - So on a Rank Math site you **don't paste** the Organization/WebSite, BreadcrumbList or Article blocks. They are included for completeness and as the spec to check Rank Math's output against.
- **Paste with a snippet plugin** (WPCode → *Add snippet* → *HTML*, location *Site-wide header* or *Page-specific*):
  - LocalBusiness (site-wide)
  - Service (one per service page)
  - FAQPage (pages with FAQs)
- **Elementor alternative:** an *HTML* widget at the bottom of the page, holding the `<script>` block. This works, but WPCode keeps schema out of the page design.
- **Duplicates:** don't also turn on Rank Math's *Local Business* schema type for pages. The site must output exactly one `#business` entity.

**Yoast:** WebSite, Organization, WebPage and BreadcrumbList are built in. Add the rest via WPCode in the same way.

**Reviews and ratings:** there is no `aggregateRating` or `review` anywhere. Google does not show star ratings for LocalBusiness or Organization reviews that the business publishes about itself, and marking up hand-picked reviews risks a manual action. Reviews belong on the Google Business Profile.

**Service area:** `areaServed` lists Ranchi only. The brief names Jamshedpur, Dhanbad and Bokaro as Phase 3 cities. Add them as further `{"@type": "City", "name": …}` entries only when ROS confirms it takes work there, at the same time as the city pages go live. Listing them now would claim a service area the business hasn't confirmed.

**FAQ schema:** this is valid markup, but since 2023 Google shows FAQ rich results only for well-known government and health sites. Use it for clarity, not to win snippets. The questions and answers must match the visible page text word for word.

## 1. Site-wide
### LocalBusiness

**Goes on:** every page (site-wide header)  
**How:** WPCode, HTML snippet, *Site-wide header*

> Types: `HomeAndConstructionBusiness` covers design and installation; `ElectronicsStore` covers equipment sales from the showroom. If ROS doesn't sell from the showroom, drop `ElectronicsStore`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": [
    "HomeAndConstructionBusiness",
    "ElectronicsStore"
  ],
  "@id": "https://rosaudio.com/#business",
  "name": "Republic of Sound Audio",
  "alternateName": [
    "ROS Audio",
    "Republic of Sound"
  ],
  "url": "https://rosaudio.com/",
  "logo": "https://rosaudio.com/wp-content/uploads/[logo-file].png",
  "image": [
    "https://rosaudio.com/wp-content/uploads/[demo-room-photo].webp",
    "https://rosaudio.com/wp-content/uploads/[showroom-exterior].webp"
  ],
  "description": "Home theatre, Hi-Fi, acoustic treatment, soundproofing and home automation company in Ranchi, Jharkhand, with a live demo room. Established 2011.",
  "telephone": "+918580239007",
  "email": "connect@rosaudio.com",
  "foundingDate": "2011",
  "priceRange": "₹₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Beside Javed Habib Salon, PP Compound, Main Road — CONFIRM]",
    "addressLocality": "Ranchi",
    "addressRegion": "Jharkhand",
    "postalCode": "[834001 — CONFIRM]",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[lat]",
    "longitude": "[long]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "[10:00]",
      "closes": "[20:00]"
    }
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Ranchi"
    }
  ],
  "sameAs": [
    "[Google Business Profile URL]",
    "[Instagram URL]",
    "[Facebook URL]",
    "[YouTube URL]",
    "[LinkedIn URL]"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Audio-visual services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Home theatre design and installation",
          "url": "https://rosaudio.com/home-theatre-ranchi/"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Acoustic treatment and soundproofing",
          "url": "https://rosaudio.com/acoustic-treatment-ranchi/"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Home automation and lighting control",
          "url": "https://rosaudio.com/home-automation-ranchi/"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Projectors, speakers and AV receivers",
          "url": "https://rosaudio.com/projectors-audio-gear/"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Home theatre recliners and cinema seating",
          "url": "https://rosaudio.com/cinema-seating/"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Boardroom and auditorium AV",
          "url": "https://rosaudio.com/corporate-av-jharkhand/"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Installation, calibration and after-sales service",
          "url": "https://rosaudio.com/contact/"
        }
      }
    ]
  }
}
</script>
```

### Organization + WebSite

**Goes on:** homepage  
**How:** Rank Math generates these automatically (same @ids). Paste only if you aren't using Rank Math or Yoast.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rosaudio.com/#organization",
      "name": "Republic of Sound Audio",
      "url": "https://rosaudio.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rosaudio.com/wp-content/uploads/[logo-file].png"
      },
      "foundingDate": "2011",
      "email": "connect@rosaudio.com",
      "telephone": "+918580239007",
      "sameAs": [
        "[social URLs, as in LocalBusiness]"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://rosaudio.com/#website",
      "url": "https://rosaudio.com/",
      "name": "Republic of Sound Audio",
      "inLanguage": "en-IN",
      "publisher": {
        "@id": "https://rosaudio.com/#organization"
      }
    }
  ]
}
</script>
```

## 2. Service (one per service page)

### Service: Home theatre installation in Ranchi

**Goes on:** `/home-theatre-ranchi/`  
**How:** WPCode, HTML snippet, *Page-specific* (or an Elementor HTML widget)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://rosaudio.com/home-theatre-ranchi/#service",
  "name": "Home theatre installation in Ranchi",
  "serviceType": "Home theatre installation",
  "description": "From living-room 5.1 to private Dolby Atmos cinemas, designed, built and calibrated for your room. Free site visit in Ranchi.",
  "url": "https://rosaudio.com/home-theatre-ranchi/",
  "provider": {
    "@id": "https://rosaudio.com/#business"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Ranchi"
    }
  ]
}
</script>
```

### Service: Acoustic treatment and soundproofing in Ranchi

**Goes on:** `/acoustic-treatment-ranchi/`  
**How:** WPCode, HTML snippet, *Page-specific* (or an Elementor HTML widget)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://rosaudio.com/acoustic-treatment-ranchi/#service",
  "name": "Acoustic treatment and soundproofing in Ranchi",
  "serviceType": "Acoustic treatment and soundproofing",
  "description": "Panels, bass traps and soundproofing for home theatres, studios and boardrooms. Start with an acoustic assessment of your room.",
  "url": "https://rosaudio.com/acoustic-treatment-ranchi/",
  "provider": {
    "@id": "https://rosaudio.com/#business"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Ranchi"
    }
  ]
}
</script>
```

### Service: Home automation and lighting control in Ranchi

**Goes on:** `/home-automation-ranchi/`  
**How:** WPCode, HTML snippet, *Page-specific* (or an Elementor HTML widget)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://rosaudio.com/home-automation-ranchi/#service",
  "name": "Home automation and lighting control in Ranchi",
  "serviceType": "Home automation and lighting control",
  "description": "One button for lights, screen, curtains and sound. Smart home and theatre automation for new and existing homes.",
  "url": "https://rosaudio.com/home-automation-ranchi/",
  "provider": {
    "@id": "https://rosaudio.com/#business"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Ranchi"
    }
  ]
}
</script>
```

### Service: Projectors, speakers and AV receivers in Ranchi

**Goes on:** `/projectors-audio-gear/`  
**How:** WPCode, HTML snippet, *Page-specific* (or an Elementor HTML widget)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://rosaudio.com/projectors-audio-gear/#service",
  "name": "Projectors, speakers and AV receivers in Ranchi",
  "serviceType": "Projectors, speakers and AV receivers",
  "description": "4K projectors, Atmos receivers, speakers and subwoofers, chosen for your room. Hear them in our Ranchi demo room first.",
  "url": "https://rosaudio.com/projectors-audio-gear/",
  "provider": {
    "@id": "https://rosaudio.com/#business"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Ranchi"
    }
  ]
}
</script>
```

### Service: Home theatre recliners and cinema seating in Ranchi

**Goes on:** `/cinema-seating/`  
**How:** WPCode, HTML snippet, *Page-specific* (or an Elementor HTML widget)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://rosaudio.com/cinema-seating/#service",
  "name": "Home theatre recliners and cinema seating in Ranchi",
  "serviceType": "Home theatre recliners and cinema seating",
  "description": "Manual and motorised recliners, loungers and cinema chairs, planned around your room and sightlines.",
  "url": "https://rosaudio.com/cinema-seating/",
  "provider": {
    "@id": "https://rosaudio.com/#business"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Ranchi"
    }
  ]
}
</script>
```

### Service: Boardroom and auditorium AV solutions in Jharkhand

**Goes on:** `/corporate-av-jharkhand/`  
**How:** WPCode, HTML snippet, *Page-specific* (or an Elementor HTML widget)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://rosaudio.com/corporate-av-jharkhand/#service",
  "name": "Boardroom and auditorium AV solutions in Jharkhand",
  "serviceType": "Boardroom and auditorium AV solutions",
  "description": "Projection, sound, video conferencing and control for boardrooms, auditoriums and hotels, designed and installed by ROS.",
  "url": "https://rosaudio.com/corporate-av-jharkhand/",
  "provider": {
    "@id": "https://rosaudio.com/#business"
  },
  "areaServed": [
    {
      "@type": "State",
      "name": "Jharkhand"
    }
  ]
}
</script>
```

## 3. FAQPage (pages with FAQs)

### FAQPage: Home theatre installation in Ranchi

**Goes on:** `/home-theatre-ranchi/`  
**How:** WPCode, *Page-specific*

> Answers containing [placeholders] must be completed on the page and in this block at the same time.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://rosaudio.com/home-theatre-ranchi/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a home theatre cost in Ranchi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the room as much as the equipment. A living-room upgrade with a soundbar or 5.1 system sits at the lower end; a dedicated Dolby Atmos room with treatment, a riser and recliners costs considerably more. Typical ROS projects range from ₹[X] lakh to ₹[Y] lakh. After a site visit we give you a written quote with the room work, equipment and labour shown separately."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a dedicated room for Dolby Atmos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. A 5.1.2 Atmos layout works well in many living rooms, using two in-ceiling or upfiring speakers. A dedicated room lets you control light, place all speakers at the right angles and add a second row, which is where 7.1.4 makes sense. We help you decide after seeing the room."
      }
    },
    {
      "@type": "Question",
      "name": "Can you install a home theatre in an apartment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Most of our living-room systems go into apartments. We plan speaker positions and cable routes around existing walls and false ceilings, check society rules for any civil work, and recommend treatment that keeps sound inside the flat as far as the building allows."
      }
    },
    {
      "@type": "Question",
      "name": "How long does installation take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A living-room system in a finished room usually takes [X] days once cabling routes are agreed. A dedicated cinema with carpentry, acoustic panels, a riser and seating typically takes [X]–[Y] weeks. Your proposal includes a schedule, and we coordinate with your interior designer or contractor."
      }
    },
    {
      "@type": "Question",
      "name": "Can I keep my existing TV or speakers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Often, yes. During the site visit we check what you already own and tell you plainly which parts suit the new design and which would hold it back. Many clients reuse a TV or a good pair of front speakers and add a receiver, centre, surrounds and a subwoofer."
      }
    }
  ]
}
</script>
```

### FAQPage: Acoustic treatment and soundproofing in Ranchi

**Goes on:** `/acoustic-treatment-ranchi/`  
**How:** WPCode, *Page-specific*

> Answers containing [placeholders] must be completed on the page and in this block at the same time.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://rosaudio.com/acoustic-treatment-ranchi/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will acoustic panels soundproof my room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Acoustic panels absorb sound inside the room, which reduces echo and makes dialogue clearer. Soundproofing stops sound travelling to other rooms, and that needs mass, airtight seals and decoupled walls, floors or ceilings. Many rooms need some of each; the assessment tells you which."
      }
    },
    {
      "@type": "Question",
      "name": "How much does acoustic treatment cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on room size, finishes and whether you need isolation as well as treatment. Treating a home theatre with panels and bass traps typically costs ₹[X]–[Y] lakh; soundproofing construction costs more because it is building work. We quote after assessing the room."
      }
    },
    {
      "@type": "Question",
      "name": "Can you soundproof a room completely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Complete silence is rarely realistic in an existing building. How much isolation is possible depends on the walls, slab, doors, windows, ventilation and how loud you play. After an assessment we explain what level of reduction is achievable and what it involves, before you spend anything."
      }
    },
    {
      "@type": "Question",
      "name": "Do you set up recording and podcast studios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Studio setup is part of our acoustic work: control rooms, vocal booths and podcast rooms, with treatment for accurate monitoring and isolation where neighbours or traffic are a problem. Tell us how you record and we will suggest the right scope."
      }
    },
    {
      "@type": "Question",
      "name": "Do acoustic panels have to look industrial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Fabric colours, wooden slats and frames can match your interiors, and some treatment can sit behind acoustically transparent fabric walls. In home theatres the panels are often part of the design rather than something added later, and we can show you finish samples during the assessment."
      }
    }
  ]
}
</script>
```

### FAQPage: Home automation and lighting control in Ranchi

**Goes on:** `/home-automation-ranchi/`  
**How:** WPCode, *Page-specific*

> Answers containing [placeholders] must be completed on the page and in this block at the same time.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://rosaudio.com/home-automation-ranchi/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can you automate an existing home without rewiring?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Often, yes. Many lighting, curtain and AV controls can be retrofitted with wireless modules or smart switches that fit standard boxes. Some features, such as multi-circuit dimming or centralised control, work best with new wiring. We check your electrical layout and suggest the least disruptive option."
      }
    },
    {
      "@type": "Question",
      "name": "Which apps and voice assistants do you support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We integrate the platforms we install and support: [ROS to list control systems, apps and voice assistants]. We only recommend systems we can configure and service locally, so you are not left with an app nobody in Ranchi can fix. If you already use a platform at home, tell us and we will check compatibility first."
      }
    },
    {
      "@type": "Question",
      "name": "What is a lighting scene?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A scene is a preset for several lights at once, such as \"Movie\", \"Dinner\" or \"All off\". One button press dims, brightens or switches each circuit to the right level. In a home theatre, scenes can also lower the screen and close the curtains."
      }
    },
    {
      "@type": "Question",
      "name": "Can one remote control my whole home theatre?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A programmed remote, keypad or app can switch on the projector, receiver and sources, select the right inputs, set the volume and dim the lights in one step. We programme it around how your family actually watches, test it with you at handover, and keep the layout simple enough for grandparents and guests to use without a manual."
      }
    }
  ]
}
</script>
```

### FAQPage: Projectors, speakers and AV receivers in Ranchi

**Goes on:** `/projectors-audio-gear/`  
**How:** WPCode, *Page-specific*

> Answers containing [placeholders] must be completed on the page and in this block at the same time.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://rosaudio.com/projectors-audio-gear/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Projector or TV: which is better for a home theatre?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A TV is simpler in bright rooms and for daytime viewing. A projector gives a far larger image for the money and feels more cinematic in a room you can darken. Short-throw and laser projectors narrow the gap in living rooms. We show both so you can compare in person."
      }
    },
    {
      "@type": "Question",
      "name": "Which projector should I buy for a 3–4 metre seating distance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Screen size should follow seating distance. At 3–4 metres, most rooms suit a 16:9 screen of roughly 75 to 130 inches, depending on how immersive you want it. Then choose brightness to match how dark the room gets. Our room-size guide has a full table."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a Dolby Atmos receiver for Atmos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, for a speaker-based Atmos system. The receiver decodes Atmos and powers the height speakers, so check how many channels it can process and amplify: a 5.1.2 layout needs 7 channels and 7.1.4 needs 11. Some systems add an external amplifier for the extra channels."
      }
    },
    {
      "@type": "Question",
      "name": "Are you an authorised dealer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[ROS to confirm which brands it is authorised to sell in Jharkhand, e.g. Q Acoustics, ViewSonic, Artsound.] Buying from an authorised dealer protects your manufacturer warranty and gives you local support if something goes wrong, so ask any seller for proof of authorisation before you pay, whoever you buy from. We are happy to show ours, and to explain which models suit your room best."
      }
    },
    {
      "@type": "Question",
      "name": "Can I listen before I buy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, that is the point of our demo room. Book a 30-minute slot, bring a film scene or music you know well, and compare speakers, subwoofers and projectors in a set-up room before deciding. There is no obligation to buy, and we will tell you if a cheaper option sounds just as good in your room."
      }
    }
  ]
}
</script>
```

### FAQPage: Home theatre recliners and cinema seating in Ranchi

**Goes on:** `/cinema-seating/`  
**How:** WPCode, *Page-specific*

> Answers containing [placeholders] must be completed on the page and in this block at the same time.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://rosaudio.com/cinema-seating/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Manual or motorised recliner: which should I choose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Manual recliners cost less, need no power and have nothing to fail electrically. Motorised recliners move smoothly at the touch of a button and can stop at any angle, but need power points planned under or behind each row. For a dedicated theatre most clients choose motorised."
      }
    },
    {
      "@type": "Question",
      "name": "How much space does a home theatre recliner need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Check the fully reclined length, not the upright depth; it is often well over 1.5 metres. Add a clear walkway in front of each row. Wall-hugger designs need less space behind. We measure your room and suggest a row layout before you choose a model."
      }
    },
    {
      "@type": "Question",
      "name": "How high should the riser be for a second row?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High enough that the rear row's eye line clears the heads in front, often around 300–450 mm depending on seat height, row spacing and screen position. We work it out from your room's dimensions so speaker angles still suit both rows."
      }
    },
    {
      "@type": "Question",
      "name": "Do you supply auditorium seating?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We supply auditorium, multiplex and cinema chairs for schools, institutions and commercial venues. Share the hall dimensions, seating capacity and any sightline or aisle requirements, and we will propose a layout with seat options and spacing. We can also coordinate the sound system and projection for the same hall, so seating and sightlines are planned together. [ROS to confirm ranges, finishes and lead times.]"
      }
    }
  ]
}
</script>
```

### FAQPage: Boardroom and auditorium AV solutions in Jharkhand

**Goes on:** `/corporate-av-jharkhand/`  
**How:** WPCode, *Page-specific*

> Answers containing [placeholders] must be completed on the page and in this block at the same time.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://rosaudio.com/corporate-av-jharkhand/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which video conferencing platforms do you set up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We set up rooms for the platforms your team already uses, such as Microsoft Teams, Zoom or Google Meet, with cameras, microphones and speakers matched to the room size and seating. We test calls from every seat before handover so remote participants can see and hear everyone. [ROS to confirm certified room systems it supplies.]"
      }
    },
    {
      "@type": "Question",
      "name": "Why do remote participants struggle to hear in our boardroom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Usually because of echo and microphone placement. Hard walls and glass make speech bounce around, and a single table microphone picks up the room as much as the voice. Treatment plus correctly placed microphones with echo cancellation fixes most of it."
      }
    },
    {
      "@type": "Question",
      "name": "Do you install auditorium sound systems and PA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We design and install sound systems for auditoriums, halls, schools and institutions, aiming for even coverage and clear speech in every seat. Send us the hall dimensions, seating capacity and how it is used, and we will propose a system."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer AMC and maintenance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[ROS to confirm annual maintenance contract terms, response times and coverage area.] Every installation is handed over with labelled equipment, system documentation and training for your staff, so day-to-day use does not depend on calling us. Ask about support options when you request a proposal, and tell us how critical the room is, for example a boardroom used for daily client calls."
      }
    },
    {
      "@type": "Question",
      "name": "Can you work outside Ranchi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We take corporate and institutional projects across Jharkhand. [ROS to confirm cities and any travel charges.] Share the site location, the number of rooms and your timeline in your proposal request, and we will confirm the survey visit and how installation will be scheduled around your working hours."
      }
    }
  ]
}
</script>
```

## 4. Article (guides)

### Article: What does a home theatre cost in India?

**Goes on:** `/guides/home-theatre-cost-india/`  
**How:** Rank Math: post → Schema tab → Article (set author and dates there). Use this block only to check its output, or paste it if Rank Math's Article is switched off.

> If no named author is approved, use `"author": {"@id": "https://rosaudio.com/#organization"}`. Don't invent credentials.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://rosaudio.com/guides/home-theatre-cost-india/#article",
  "headline": "What does a home theatre cost in India?",
  "description": "Where a home theatre budget goes in India: room work, equipment, acoustics and seating, with budget bands and mistakes to avoid. Read now.",
  "inLanguage": "en-IN",
  "image": [
    "https://rosaudio.com/wp-content/uploads/[guide-hero-1200x675].webp"
  ],
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": {
    "@type": "Person",
    "name": "[Author name]",
    "jobTitle": "[Role at ROS]",
    "url": "https://rosaudio.com/[author-page]/"
  },
  "publisher": {
    "@id": "https://rosaudio.com/#organization"
  },
  "mainEntityOfPage": "https://rosaudio.com/guides/home-theatre-cost-india/"
}
</script>
```

### Article: Room size for Dolby Atmos: a practical guide

**Goes on:** `/guides/room-size-dolby-atmos/`  
**How:** Rank Math: post → Schema tab → Article (set author and dates there). Use this block only to check its output, or paste it if Rank Math's Article is switched off.

> If no named author is approved, use `"author": {"@id": "https://rosaudio.com/#organization"}`. Don't invent credentials.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://rosaudio.com/guides/room-size-dolby-atmos/#article",
  "headline": "Room size for Dolby Atmos: a practical guide",
  "description": "Room size, ceiling height, seating position, 5.1.2 vs 7.1.4 and screen size for Dolby Atmos. Try the room planner, then book a demo.",
  "inLanguage": "en-IN",
  "image": [
    "https://rosaudio.com/wp-content/uploads/[guide-hero-1200x675].webp"
  ],
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": {
    "@type": "Person",
    "name": "[Author name]",
    "jobTitle": "[Role at ROS]",
    "url": "https://rosaudio.com/[author-page]/"
  },
  "publisher": {
    "@id": "https://rosaudio.com/#organization"
  },
  "mainEntityOfPage": "https://rosaudio.com/guides/room-size-dolby-atmos/"
}
</script>
```

## 5. BreadcrumbList (every page except the homepage)

Rank Math: *General Settings → Breadcrumbs → Enable*. It then outputs these automatically. The expected trails are listed so you can check them:

- `/home-theatre-ranchi/`: Home › Home theatre
- `/acoustic-treatment-ranchi/`: Home › Acoustics
- `/home-automation-ranchi/`: Home › Automation
- `/projectors-audio-gear/`: Home › Projectors & audio gear
- `/cinema-seating/`: Home › Cinema seating
- `/corporate-av-jharkhand/`: Home › Corporate AV
- `/projects/`: Home › Projects
- `/book-a-demo/`: Home › Book a demo
- `/guides/`: Home › Guides
- `/contact/`: Home › Contact
- `/guides/home-theatre-cost-india/`: Home › Guides › What does a home theatre cost in India?
- `/guides/room-size-dolby-atmos/`: Home › Guides › Room size for Dolby Atmos

### BreadcrumbList template

**Goes on:** e.g. `/guides/room-size-dolby-atmos/`  
**How:** Generated by Rank Math. Paste manually only if breadcrumbs are off.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://rosaudio.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Guides",
      "item": "https://rosaudio.com/guides/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Room size for Dolby Atmos",
      "item": "https://rosaudio.com/guides/room-size-dolby-atmos/"
    }
  ]
}
</script>
```

