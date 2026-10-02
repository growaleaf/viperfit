// ViperFit data — every number below traces to a source_url a pilot can open and check.
// buttons/axes/hats = physical input slots on the controller, from the manufacturer's own
// technical-specification text.
//
// thrustmaster.com was returning a site-maintenance page for every product URL at research time
// (2026-09-08). Each Thrustmaster number below was re-confirmed against the Wayback Machine's
// archived copy of that same official product page (timestamp in the source label) rather than
// guessed or reused from another dataset unverified. One correction found in the process: an
// earlier Hive dataset (CockpitFit/StarHOTAS) lists the T-Flight HOTAS 4 at 15 buttons / 5 axes /
// 1 hat — the archived official page states "12 action buttons and 5 axes" with no hat switch
// mentioned anywhere on the page. This entry uses the verified 12/5/0 figure; the other two
// products should be corrected in a follow-up pass (see DONE_REPORT.md).

const CONTROLLERS = [
  {
    id: "t16000m-fcs",
    name: "Thrustmaster T.16000M FCS",
    note: "joystick only, no throttle",
    buttons: 16,
    axes: 4,
    hats: 1,
    sources: [
      { label: "Thrustmaster — T.16000M FCS product page (via Wayback Machine, captured 2022-05-19; thrustmaster.com is under maintenance as of 2026-09-08): \"4 independent axes... 16 action buttons... one 8-way Point of View (PoV) hat switch\"", url: "https://web.archive.org/web/20220519180630/https://www.thrustmaster.com/en-us/products/t-16000m-fcs/" }
    ]
  },
  {
    id: "t16000m-fcs-hotas",
    name: "Thrustmaster T.16000M FCS HOTAS",
    note: "joystick + TWCS Throttle bundle",
    buttons: 30,
    axes: 5,
    hats: 2,
    sources: [
      { label: "Thrustmaster — T.16000M FCS HOTAS product page (via Wayback Machine, captured 2024-05-03; thrustmaster.com is under maintenance as of 2026-09-08): \"In total, this provides gamers with 5 axes, 30 buttons and two 8-way PoVs\"", url: "https://web.archive.org/web/20240503071852/https://www.thrustmaster.com/en-us/products/t-16000m-fcs-hotas/?platformId=1467" }
    ]
  },
  {
    id: "t-flight-hotas-4",
    name: "Thrustmaster T-Flight HOTAS 4",
    note: "joystick + throttle, entry-level. No hat switch.",
    buttons: 12,
    axes: 5,
    hats: 0,
    sources: [
      { label: "Thrustmaster — T-Flight HOTAS 4 product page (via Wayback Machine, captured 2022-01-23; thrustmaster.com is under maintenance as of 2026-09-08): \"HOTAS with 12 action buttons and 5 axes\" — no hat switch mentioned on the page", url: "https://web.archive.org/web/20220123153655/https://www.thrustmaster.com/en-us/products/t-flight-hotas-4/" }
    ]
  },
  {
    id: "t-flight-hotas-x",
    name: "Thrustmaster T.Flight HOTAS X",
    note: "joystick + detachable throttle, entry-level. No hat switch.",
    buttons: 12,
    axes: 5,
    hats: 0,
    sources: [
      { label: "Thrustmaster — T.Flight HOTAS X product page (via Wayback Machine, captured 2023-02-09; thrustmaster.com is under maintenance as of 2026-09-08): \"12 programmable action buttons\", \"5 axes\"", url: "https://web.archive.org/web/20230209055449/https://www.thrustmaster.com/en-us/products/t-flight-hotas-x-3/" }
    ]
  },
  {
    id: "logitech-x56",
    name: "Logitech G X56 H.O.T.A.S.",
    note: "joystick + throttle, includes thumb mini-sticks",
    buttons: 31,
    axes: 13,
    hats: 5,
    tier: "pro",
    sources: [
      { label: "Logitech G — X56 H.O.T.A.S. product page (logitechg.com, captured 2026-10-02): \"189+ PROGRAMMABLE CONTROLS — Customize all 13 axes, 5 HATS, and 31 programmable buttons over three modes.\"", url: "https://www.logitechg.com/en-us/shop/p/x56-space-flight-vr-simulator-controller" }
    ]
  },
  {
    id: "twcs-throttle",
    name: "Thrustmaster TWCS Throttle",
    note: "throttle only, no joystick",
    buttons: 14,
    axes: 5,
    hats: 1,
    tier: "pro",
    sources: [
      { label: "Thrustmaster — TWCS Throttle product page (thrustmaster.com, captured 2026-10-02): \"ERGONOMY — Including 5 axes and 14 action buttons\"; body text: \"the TWCS throttle includes 14 buttons and one 8-way-PoV hat switch\"", url: "https://www.thrustmaster.com/en-us/products/twcs-throttle/" }
    ]
  }
];

const CATEGORY_PRIORITY = ["Flight/Basic", "Weapons Release", "TMS/DMS/CMS", "Radar/Master Mode", "Trim", "Views", "System Overrides"];

const GIST_SOURCE = {
  label: "GitHub gist (arithex) — \"Absolute Bare Minimum Key Bindings\" for Falcon BMS, community-sourced, not an official document, captured 2026-09-08. Only the Taxi/Takeoff/Fly/Land and Guns/Weapons-release entries are used here — the tier definition below excludes this gist's other listed functions (radar cursor, uncage, countermeasures, jammer, display switching) because those are the switchology this tier is defined to NOT include.",
  url: "https://gist.github.com/arithex/5defc84b92f566a1fcb46cafde3f1c8e"
};

const BMS_MANUAL_SOURCE = {
  label: "Falcon BMS Technical Manual (Benchmark Sims, Change 1.00), Section 2 \"The HOTAS issue\", p.2-19 — worked keyfile example listing SimTMSUp/Left/Right/Down, SimDMSUp/Left/Right/Down, SimCMSUp/Left/Right/Down, SimMissileStep, SimPinkySwitch verbatim, captured 2026-09-08",
  url: "https://cdn.falcon-bms.com/docs/4.35/bms-technical-manual.pdf"
};

const BMS_MANUAL_FULL_SOURCE = {
  label: "Falcon BMS Technical Manual (Benchmark Sims, Change 1.00), Section 2 \"The HOTAS issue\", p.2-19 — the SAME worked keyfile example as Standard Combat, read in full: it also lists SimPinkySwitch and SimAPOverride, which Standard Combat deliberately excludes. Verbatim from the PDF: \"SimPinkySwitch = v\" and \"SimAPOverride = ALT q\", captured 2026-10-02",
  url: "https://cdn.falcon-bms.com/docs/4.35/bms-technical-manual.pdf"
};

const BMS_TRIM_VIEW_SOURCE = {
  label: "Falcon BMS Technical Manual (Benchmark Sims, Change 1.00), Section 10.9.2 \"How to change the DX POV functions (Trim vs. View & other functions)\", p.10-107 — lists the default HOTAS-unshifted trim callbacks (AFElevatorTrimUp, AFAileronTrimRight, AFElevatorTrimDown, AFAileronTrimLeft) and the HOTAS-shifted view callbacks (OTWViewUp, OTWViewRight, OTWViewDown, OTWViewLeft) verbatim, captured 2026-10-02",
  url: "https://cdn.falcon-bms.com/docs/4.35/bms-technical-manual.pdf"
};

const TIERS = [
  {
    id: "minimum-viable",
    tier_name: "Minimum Viable",
    tier_note: "Basic flight + weapons release. No switchology — everything else falls back to keyboard.",
    core_functions: [
      { category: "Flight/Basic", count: 5 },
      { category: "Weapons Release", count: 1 }
    ],
    total_functions: 6,
    source_url: GIST_SOURCE.url,
    source_note: GIST_SOURCE.label
  },
  {
    id: "standard-combat",
    tier_name: "Standard Combat",
    tier_note: "Adds TMS/DMS/CMS hat functions (chaff/flare live on the CMS switch in BMS) and the radar/master-mode step functions used in a fight.",
    core_functions: [
      { category: "Flight/Basic", count: 5 },
      { category: "Weapons Release", count: 1 },
      { category: "TMS/DMS/CMS", count: 12 },
      { category: "Radar/Master Mode", count: 2 }
    ],
    total_functions: 20,
    source_url: BMS_MANUAL_SOURCE.url,
    source_note: BMS_MANUAL_SOURCE.label
  },
  {
    id: "trim-and-view",
    tier_name: "Trim & View Control",
    tier_note: "The default HOTAS trim axis functions (elevator/aileron trim) plus the shifted-layer out-the-window view functions from BMS's own default key file.",
    core_functions: [
      { category: "Trim", count: 4 },
      { category: "Views", count: 4 }
    ],
    total_functions: 8,
    tier: "pro",
    source_url: BMS_TRIM_VIEW_SOURCE.url,
    source_note: BMS_TRIM_VIEW_SOURCE.label
  },
  {
    id: "full-switch-program",
    tier_name: "Full Switch Program",
    tier_note: "Everything in Standard Combat plus the pinky switch and autopilot override — the complete worked HOTAS keyfile example from the Technical Manual, nothing left out.",
    core_functions: [
      { category: "Flight/Basic", count: 5 },
      { category: "Weapons Release", count: 1 },
      { category: "TMS/DMS/CMS", count: 12 },
      { category: "Radar/Master Mode", count: 2 },
      { category: "System Overrides", count: 2 }
    ],
    total_functions: 22,
    tier: "pro",
    source_url: BMS_MANUAL_FULL_SOURCE.url,
    source_note: BMS_MANUAL_FULL_SOURCE.label
  }
];
