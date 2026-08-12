/** Chart content extracted from Botanical case-study images */

export const STORYTELLING_CHART = {
  title: 'Storytelling and tone of voice',
  linearTitle: 'Linear storytelling',
  linearItems: [
    'scientist and butterfly',
    'elements from the garden',
    'user joins them on their journey',
    'the story follows the intended path through the greenhouses',
  ],
  toneCardTitle: 'The Four Dimensions of Tone of Voice',
  toneScales: [
    { left: 'Formal', right: 'Casual', position: 78 },
    { left: 'Serious', right: 'Funny', position: 92 },
    { left: 'Respectful', right: 'Irreverent', position: 38 },
    { left: 'Matter-of-fact', right: 'Enthusiastic', position: 82 },
  ],
  toneTitle: 'Tone of voice',
  toneItems: [
    'the greenhouses are a place for visitors of all ages',
    'user wants to have a bit of fun but also learn about plants',
  ],
}

export const PURPOSE_CHART = {
  title: '4 Key Dimensions',
  dimensions: [
    {
      id: 'emotional',
      title: 'Emotional',
      description: 'storytelling, curiosity, immersion',
    },
    {
      id: 'physical',
      title: 'Physical',
      description: 'guided movement & exploration through the garden',
    },
    {
      id: 'intellectual',
      title: 'Intellectual',
      description: 'focused, modular, and layered content',
    },
    {
      id: 'technology',
      title: 'Technology',
      description: 'tablets enhance & support the experience',
    },
  ],
  caption: 'well-rounded and engaging visitor journey',
}

export const OOUX_CHART = {
  headers: ['Object', 'Properties', 'Relationship', 'Call-to-action'],
  rows: [
    {
      object: 'Screensaver',
      properties: ['Moving images'],
      relationship: ['Landing Page'],
      cta: ['Tap to start'],
    },
    {
      object: 'Landing Page',
      properties: ['Text', 'Start button', 'Language button'],
      relationship: ['Story Pages', 'Language'],
      cta: ['Click on language', 'Start button'],
    },
    {
      object: 'Story Pages',
      properties: [
        'Animations → story representation',
        'Text → storyline',
        'Audio → text',
        'Exit button',
        'Volume button',
      ],
      relationship: ['Landing page', 'Volume'],
      cta: ['Exit to home page', 'Volume level', 'Next / Continue'],
    },
    {
      object: 'Quiz',
      properties: [
        'Text',
        'Answer buttons',
        'Exit button',
        'Prompt to enter email',
      ],
      relationship: ['Landing Page', 'Story Pages'],
      cta: [
        'Next / Continue',
        'Exit to home page',
        'Type email for newsletter and shop discount',
      ],
    },
  ],
}

export const PRINCIPLES_CHART = {
  title: "Allen & Gutwill's",
  subtitle: 'common pitfalls',
  items: [
    { label: 'No overload', text: 'clear narrative structure' },
    { label: 'No user interference', text: 'stations with headsets' },
    { label: 'No disruption', text: 'interaction supports story' },
    { label: 'Clear focus', text: 'guided journey' },
    { label: 'No distraction', text: 'photo booth placed at the end' },
  ],
}
