/**
 * HMW + Conventions chart content extracted from yoga PDFs
 */
export const YOGA_HMW_CHART = {
  title: 'How Might We',
  columns: ['QUESTIONS', 'ANSWERS'],
  rows: [
    {
      question: 'How might I inspire people to attend the places?',
      answer:
        'Showcasing media that is attractive; real footage of the places and mention the benefits of yoga/exercise outdoors',
    },
    {
      question:
        'How might I help people find the balance between private and group exercise?',
      answer:
        'Writing the level of privacy (icons) on each place (how exposed to human eye), how many people can fit into each place and encourage alone or group participation',
    },
    {
      question:
        'How might I provide easy to understand information about the places?',
      answer:
        'By creating a short guide on suggestions on what to bring, location and what is available around. Possibly through a video or drawings of the items.',
    },
    {
      question:
        'How might I further educate people with an understanding of yoga or other disciplines?',
      answer:
        'By providing information on yoga and sources to find out more. Books, article links.',
    },
    {
      question:
        'How might I ensure that the people stay safe if they go on their own?',
      answer: 'Displaying emergency contacts',
    },
    {
      question: 'How might I encourage more participants than yogis?',
      answer:
        'By always reminding that these places are primarily for yoga and meditation but other forms of disciplines are welcome (UX writing)',
    },
    {
      question:
        'How might I invite people that fit into my target group? (ages 20-35)',
      answer:
        'Making the website aesthetically appealing, showcasing true information about the theory of yoga, inspiring by including common phrases said by yogis on the interviews, providing clear information foraging through sensorial images and media and an intuitive navigation',
    },
    {
      question:
        'How might I satisfy user needs so the way that they remain using my solution?',
      answer:
        'By provide all practical things about the places before going (providing accurate location, weather buttons and guides)',
    },
    {
      question:
        'How might I adapt to my target group (advanced level on yoga or any physical discipline) and invite other levels?',
      answer:
        'By possibly creating 1 exercise routine video tutorials that invite beginners and 1-2 videos for higher levels',
    },
    {
      question:
        'How might I provide the neighborhoods of Aarhus for accessible places according to their locations?',
      answer:
        'By selecting 3 places; north, middle and south Aarhus for everyone to have at least 2 convenient locations',
    },
  ],
}

export const YOGA_OOUX_CHART = {
  title: 'OOUX',
  headers: ['OBJECT', 'PROPERTIES', 'RELATIONSHIPS', 'CALLS-TO-ACTION'],
  rows: [
    {
      object: 'Place 1',
      properties: [
        'Hero image',
        'Title',
        'Subheading',
        'Info about the place',
        'Brief info about yoga',
        'Quotes from yogis',
        'Level of privacy',
        'Maximum number of people',
        'Preparations expandable section',
        'Emergency contacts',
      ],
      relationships: ['Preparations', 'Learn more'],
      cta: [
        'Scroll to see pictures of the place, read about and find yogi phrases',
        'Scroll to find expandable section of preparations',
        'Click link to reserve',
      ],
    },
    {
      object: 'Learn more',
      properties: [
        'Tutorials → How to/ videos',
        'About yoga → books and articles',
        'Videos → 2-3 workout routine intros',
      ],
      relationships: ['Place 1', 'Place 2', 'Place 3', 'Preparations'],
      cta: [
        'click to check show related info',
        'click to zoom in new collection / clothes pictures',
      ],
    },
    {
      object: 'Preparations',
      properties: ['List of must bring with icons or video'],
      relationships: ['Place 1', 'Place 2', 'Place 3'],
      cta: [
        'click to expand to find out info about how to prepare for the place',
      ],
    },
  ],
}
