/* ── OPEN ROLES ──
   Single source for the /careers listing and the role pages it links to. Adding
   a role here gives it a listing row and a page at /careers/<slug>. */
export type Role = {
  slug: string
  title: string
  team: string
  location: string
  type: string
  /* Lede under the role title */
  summary: string
  about: string[]
  responsibilities: string[]
  requirements: string[]
  bonus: string[]
  offer: string[]
}

export const OPEN_ROLES: Role[] = [
  {
    slug: 'senior-full-stack-software-engineer',
    title: 'Senior Full Stack Software Engineer',
    team: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    summary:
      'Own product surfaces end to end, from the real-time transcription pipeline to the screen a litigator reads mid-deposition.',
    about: [
      'Ithildin listens to a deposition as it happens, transcribes it with speaker attribution and page:line references, and flags the moment a witness contradicts prior testimony. The room does not pause for us, so everything we build has to be correct the first time and fast enough to matter while the question is still hanging.',
      'You would be one of the first engineers on the team. That means the architecture decisions are still yours to make, the surface area is wide, and there is no layer of the stack that is off limits to you.',
    ],
    responsibilities: [
      'Build and own product features end to end: schema, API, real-time pipeline, and the interface a litigator actually reads under pressure.',
      'Work on the low-latency path that turns live audio into attributed, cited transcript text without falling behind the room.',
      'Design the retrieval and evaluation layer that decides when a contradiction is real enough to put in front of a lawyer.',
      'Set the engineering bar early: testing, observability, and review habits that hold once the team is five times the size.',
      'Sit with litigators during real depositions and turn what you see there into the next thing we ship.',
    ],
    requirements: [
      'Five or more years building production software, with meaningful ownership of something users depended on.',
      'Strong across the stack: TypeScript and React on the front end, and a backend language you are genuinely fluent in.',
      'Experience with real-time or streaming systems, and a working understanding of where their latency actually goes.',
      'Comfortable with ambiguity. You can take a rough problem statement, find the real constraint, and ship against it.',
      'You care about correctness in a domain where a wrong citation is worse than no citation.',
    ],
    bonus: [
      'Experience shipping LLM-backed products, including evaluation and grounding rather than prompt tinkering.',
      'Background in audio, ASR, or speaker diarization.',
      'You have worked at an early-stage company and know what the first ten engineers actually do.',
      'Any exposure to legal technology, litigation workflows, or the discovery process.',
    ],
    offer: [
      'Meaningful equity. Early team, early ownership.',
      'Competitive salary benchmarked to San Francisco senior engineering.',
      'Health, dental, and vision coverage.',
      'A hardware budget and whatever tooling makes you fast.',
      'Direct access to the customers you build for, from your first week.',
    ],
  },
]

export function getRole(slug: string): Role | undefined {
  return OPEN_ROLES.find(r => r.slug === slug)
}
