/**
 * Persona board content extracted from yoga_persona.pdf
 */
export const YOGA_PERSONA_DATA = {
  name: 'SOLVEJ',
  subtitle: 'Advanced yogi with 7 years of practice experience',
  quote:
    'Yoga is my way to relax and de-stress from my daily tasks and I love to connect with my mind and body. I am looking to continue with yoga as a path and continue exploring different ways to practice.',
  summary:
    'Solvej is a Gym instructor who works full time in Aarhus. She practices yoga 3-4 times a week for the last 5 years to de-stress from work. Solvej is confident to do the postures but likes to be guided sometimes. She is curious to find out more about traditional yoga. As a gym instructor, she wants to find balance between being in company and alone-time. Alone or with a group, she wants to catch fresh air and inspiration in free areas while staying out of the spotlight and finding privacy.',
  details: [
    { label: 'Age', value: '31' },
    { label: 'Location', value: 'Aarhus for 7 years' },
    { label: 'Nationality', value: 'French/ Danish' },
    { label: 'Occupation', value: 'Gym instructor' },
    { label: 'Education', value: 'Bachelor Degree Kinesiology' },
    { label: 'Family Status', value: 'Single' },
    { label: 'Challenges', value: 'Anxiety' },
    { label: 'Online locations', value: 'Phone, work computer, social media' },
  ],
  scales: [
    { left: 'Technophobe', right: 'Wired', value: 0.88 },
    { left: 'Yoga Beginner', right: 'Expert', value: 0.9 },
    { left: 'Introvert', right: 'Extrovert', value: 0.18 },
    { left: 'Functional', right: 'Aesthetic', value: 0.38 },
  ],
  panels: [
    {
      id: 'pain',
      title: 'Motivation and Pain Points',
      intro:
        'Solvej’s favourite health activity is yoga; 5 years ago, it has become a lifestyle for her that balances her work and social life energy.',
      subtitle: 'What is getting in the way?',
      items: [
        'Stay motivated to keep yoga a routine',
        'Access inexpensive places where she can practice on her own or with friends',
        'Find good surroundings to practice without interruptions',
        'Find time to practice or learn more',
      ],
    },
    {
      id: 'goals',
      title: 'Goals and Behavior',
      sections: [
        {
          subtitle: 'User goals',
          items: [
            'Try private/ quiet places to do yoga',
            'Find balance between alone-time vs group practice, guided vs self practice.',
            'Find inspiration by exploring more about yoga traditions',
            'Possibly host her own retreats someday',
          ],
        },
        {
          subtitle: 'User Behavior',
          items: [
            'Practices yoga/ exercise 3-4 times a week',
            'Knows various types, practices mostly Vinyasa and Yin-yoga',
            'Does yoga by herself or with a group, for 5 years',
          ],
        },
      ],
    },
    {
      id: 'digital',
      title: 'Digital solution',
      items: [
        'Discover free ideal spots → show media/ info',
        'Learn about outdoor yoga benefits.',
        'Learn about yoga traditions → Books, articles',
        '“Explore, learn, transform”',
      ],
    },
    {
      id: 'business',
      title: 'Business Objective',
      subtitle: 'Primary Goal: Increase Human Awareness by:',
      items: [
        'Promote Health, encourage yoga/ exercise',
        'Raise people’s connection and care for nature',
        'Improve self-awareness with body and mind',
        '“Connect, inform, transform”',
      ],
    },
  ],
}
