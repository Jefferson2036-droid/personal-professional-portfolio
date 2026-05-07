export type PageRouteLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type StakeholderLaneKey = "faculty" | "students" | "parents" | "partners";

type StakeholderPathway = {
  lane: StakeholderLaneKey;
  label: string;
  title: string;
  body: string;
  cta: PageRouteLink;
  primary?: boolean;
};

export type PageExperienceProfile = {
  eyebrow: string;
  useCase: string;
  audience: string;
  closingTitle: string;
  closingBody: string;
  links: PageRouteLink[];
};

type FooterPathwaySet = {
  eyebrow: string;
  pathways: StakeholderPathway[];
};

const defaultProfile: PageExperienceProfile = {
  eyebrow: "Depth page",
  useCase: "Supporting handout",
  audience: "Faculty and broader stakeholders",
  closingTitle: "Continue through the argument",
  closingBody:
    "Use this page as a focused expansion of the core presentation, then return to the homepage film for the full case.",
  links: [
    { href: "/", label: "Return to presentation" },
    { href: "/why-bseai", label: "Open Why BSEAI" },
  ],
};

const pageProfiles: Record<string, PageExperienceProfile> = {
  "why-bseai": {
    eyebrow: "Institutional case",
    useCase: "Live branch or leave-behind",
    audience: "Faculty, leadership, partners",
    closingTitle: "Connect the case to curriculum",
    closingBody:
      "Move from the institutional rationale into the student-development path so the degree reads as a concrete system, not only a positioning argument.",
    links: [
      { href: "/from-freshman-to-professional", label: "Open curriculum path" },
      { href: "/", label: "Return to presentation" },
    ],
  },
  "engineering-english": {
    eyebrow: "Method layer",
    useCase: "Live branch page",
    audience: "Faculty, students, employers",
    closingTitle: "See how the method becomes controlled delivery",
    closingBody:
      "This page matters most when it leads into specs, sprint boundaries, verification, and the kind of controlled delivery that serious AI work requires.",
    links: [
      { href: "/how-this-was-made", label: "Open spec and verification page" },
      { href: "/", label: "Return to presentation" },
    ],
  },
  "from-freshman-to-professional": {
    eyebrow: "Student pathway",
    useCase: "Program progression",
    audience: "Faculty, students, parents",
    closingTitle: "Return to the program case",
    closingBody:
      "Use the progression to prove that the degree is developmentally sound, then reconnect it to the broader rationale for BSEAI.",
    links: [
      { href: "/why-bseai", label: "Revisit the rationale" },
      { href: "/", label: "Return to presentation" },
    ],
  },
  "author-context": {
    eyebrow: "Credibility context",
    useCase: "Supporting depth",
    audience: "Faculty and institutional stakeholders",
    closingTitle: "Keep the argument on the institution",
    closingBody:
      "Author context should support trust, then move the audience back toward the degree case and the curriculum path.",
    links: [
      { href: "/why-bseai", label: "Return to the degree case" },
      { href: "/", label: "Return to presentation" },
    ],
  },
};

const presentationPathways: FooterPathwaySet = {
  eyebrow: "Friday pathways",
  pathways: [
    {
      lane: "faculty",
      label: "Faculty",
      title: "Follow the institutional case",
      body: "Start with the rationale for the degree, then move into curriculum progression and implementation proof.",
      cta: { href: "/why-bseai", label: "Open faculty path" },
      primary: true,
    },
    {
      lane: "students",
      label: "Students",
      title: "See what the degree trains you to become",
      body: "Move from the four-year path into the Engineering English branch to see how the work changes.",
      cta: { href: "/from-freshman-to-professional", label: "Open student path" },
    },
    {
      lane: "parents",
      label: "Parents",
      title: "Understand progression and value",
      body: "Use the curriculum path to show developmental structure, then reconnect it to employability and degree logic.",
      cta: { href: "/from-freshman-to-professional", label: "Open parent path" },
    },
    {
      lane: "partners",
      label: "Partners",
      title: "See deployment-oriented proof",
      body: "Follow the method and verification pages to understand why this degree maps to enterprise implementation needs.",
      cta: { href: "/how-this-was-made", label: "Open partner path" },
    },
  ],
};

const standardPathwaysByPage: Record<string, FooterPathwaySet> = {
  "why-bseai": {
    eyebrow: "Who should go next",
    pathways: [
      {
        lane: "faculty",
        label: "Faculty",
        title: "Pressure-test the curriculum claim",
        body: "Move next to the four-year path to verify that the positioning argument lands in developmentally credible coursework.",
        cta: { href: "/from-freshman-to-professional", label: "Open curriculum path" },
        primary: true,
      },
      {
        lane: "parents",
        label: "Parents",
        title: "Translate rationale into a student journey",
        body: "The progression page is the easiest way to see what changes across four years and why that matters.",
        cta: { href: "/from-freshman-to-professional", label: "View four-year path" },
      },
      {
        lane: "partners",
        label: "Partners",
        title: "Inspect the implementation layer",
        body: "If the rationale is persuasive, the next proof is whether the work really maps to bounded delivery, verification, and deployed systems.",
        cta: { href: "/how-this-was-made", label: "See spec and verification proof" },
      },
    ],
  },
  "engineering-english": {
    eyebrow: "Who should go next",
    pathways: [
      {
        lane: "partners",
        label: "Partners",
        title: "Follow the method into controlled delivery",
        body: "This lane matters when structured language is shown inside a real spec, sprint, evaluation, and deployment process.",
        cta: { href: "/how-this-was-made", label: "Open spec and verification proof" },
        primary: true,
      },
      {
        lane: "faculty",
        label: "Faculty",
        title: "Reconnect method to curriculum",
        body: "After the method page, the next question is whether the degree teaches this as part of a coherent institutional case.",
        cta: { href: "/why-bseai", label: "Return to rationale" },
      },
      {
        lane: "students",
        label: "Students",
        title: "See where this skill fits in the pathway",
        body: "The student path shows when this kind of semantic systems work becomes legible in the degree arc.",
        cta: { href: "/from-freshman-to-professional", label: "Open student path" },
      },
    ],
  },
  "from-freshman-to-professional": {
    eyebrow: "Who should go next",
    pathways: [
      {
        lane: "students",
        label: "Students",
        title: "See the degree as a build path",
        body: "This page is the clearest route for students deciding whether the program becomes real technical growth instead of vague AI branding.",
        cta: { href: "/engineering-english", label: "See the method branch" },
        primary: true,
      },
      {
        lane: "parents",
        label: "Parents",
        title: "Connect progression to career value",
        body: "Return to the core rationale once the progression is clear so the degree reads as both structured and economically grounded.",
        cta: { href: "/why-bseai", label: "Return to rationale" },
      },
      {
        lane: "faculty",
        label: "Faculty",
        title: "Verify that the growth path is defensible",
        body: "This is the handoff point from development story back to institutional argument and program design discipline.",
        cta: { href: "/why-bseai", label: "Reopen faculty case" },
      },
    ],
  },
  "author-context": {
    eyebrow: "Who should go next",
    pathways: [
      {
        lane: "faculty",
        label: "Faculty",
        title: "Return to the degree argument",
        body: "Author context should only reinforce trust before the audience goes back to the institutional and curricular case.",
        cta: { href: "/why-bseai", label: "Return to rationale" },
        primary: true,
      },
      {
        lane: "partners",
        label: "Partners",
        title: "See the production orientation in action",
        body: "The spec and verification page shows how the systems lens behind the argument translates into actual build practice.",
        cta: { href: "/how-this-was-made", label: "Open spec and verification proof" },
      },
      {
        lane: "students",
        label: "Students",
        title: "Reconnect credibility to development",
        body: "The student pathway keeps this page from feeling like biography by moving immediately back to the program’s student outcome story.",
        cta: { href: "/from-freshman-to-professional", label: "Open student path" },
      },
    ],
  },
  default: {
    eyebrow: "Who should go next",
    pathways: [
      {
        lane: "faculty",
        label: "Faculty",
        title: "Return to the main case",
        body: "The faculty path stays anchored in the institutional rationale first, then moves outward to supporting proof.",
        cta: { href: "/why-bseai", label: "Open faculty path" },
        primary: true,
      },
      {
        lane: "students",
        label: "Students",
        title: "See the student progression",
        body: "The four-year path is the clearest proof that the degree is developmental rather than rhetorical.",
        cta: { href: "/from-freshman-to-professional", label: "Open student path" },
      },
      {
        lane: "partners",
        label: "Partners",
        title: "Inspect spec and verification proof",
        body: "The spec and verification branch shows whether the claims about deployment and integration survive contact with real implementation.",
        cta: { href: "/how-this-was-made", label: "Open spec and verification proof" },
      },
    ],
  },
};

export function getPageExperienceProfile(slug: string): PageExperienceProfile {
  return pageProfiles[slug] ?? defaultProfile;
}

export function getFooterPathwaySet(mode: "standard" | "presentation", pageSlug?: string): FooterPathwaySet {
  if (mode === "presentation") {
    return presentationPathways;
  }

  if (pageSlug && standardPathwaysByPage[pageSlug]) {
    return standardPathwaysByPage[pageSlug];
  }

  return standardPathwaysByPage.default;
}