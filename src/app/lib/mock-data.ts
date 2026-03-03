

export interface Session {
  id: string;
  title: string;
  description: string;
  time: string;
  room: string;
  speakerId: string;
  speakerName: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  bio: string;
  sessions: string[]; // session titles
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export const sessions: Session[] = [
  {
    id: '1',
    title: 'Building Modern Web Apps with Next.js',
    description:
      'Join Jane as she walks through the latest features in Next.js and demonstrates how to build fast, scalable web applications. You will learn about the App Router, server components, and deployment strategies.',
    time: '10:00 AM - 11:00 AM',
    room: 'Room A',
    speakerId: '1',
    speakerName: 'Jane Doe',
  },
  {
    id: '2',
    title: 'Tailwind CSS Tips & Tricks',
    description:
      'John shares his favorite Tailwind CSS techniques for building responsive, maintainable UIs. Learn how to optimize your workflow and create custom designs without leaving your HTML.',
    time: '11:15 AM - 12:15 PM',
    room: 'Room B',
    speakerId: '2',
    speakerName: 'John Smith',
  },
  {
    id: '3',
    title: 'State Management in 2025',
    description:
      'Alice explores the evolving landscape of state management in React. From built-in hooks to emerging libraries, you will gain insights into choosing the right tool for your project.',
    time: '1:00 PM - 2:00 PM',
    room: 'Room A',
    speakerId: '3',
    speakerName: 'Alice Johnson',
  },
  {
    id: '4',
    title: 'Performance Optimization Strategies',
    description:
      'Bob presents battle‑tested techniques to improve web performance. Learn about code splitting, lazy loading, and advanced caching strategies to make your apps lightning fast.',
    time: '2:15 PM - 3:15 PM',
    room: 'Room C',
    speakerId: '4',
    speakerName: 'Bob Brown',
  },
  {
    id: '5',
    title: 'Accessibility First',
    description:
      'Carol demonstrates how to build inclusive web applications from the ground up. You will leave with practical knowledge to ensure your projects are usable by everyone.',
    time: '3:30 PM - 4:30 PM',
    room: 'Room B',
    speakerId: '5',
    speakerName: 'Carol White',
  },
];

export const speakers: Speaker[] = [
  {
    id: '1',
    name: 'Jane Doe',
    role: 'Lead Engineer at Vercel',
    bio: 'Jane is a core team member of Next.js and a passionate advocate for web performance. She has spoken at numerous conferences and loves helping developers build better experiences.',
    sessions: ['Building Modern Web Apps with Next.js'],
    social: {
      twitter: 'janedoe',
      github: 'janedoe',
      linkedin: 'janedoe',
    },
  },
  {
    id: '2',
    name: 'John Smith',
    role: 'Frontend Architect',
    bio: 'John has been designing and building design systems for over a decade. He is a Tailwind CSS lover and enjoys sharing his knowledge through workshops and talks.',
    sessions: ['Tailwind CSS Tips & Tricks'],
    social: {
      twitter: 'johnsmith',
      github: 'johnsmith',
    },
  },
  {
    id: '3',
    name: 'Alice Johnson',
    role: 'Tech Lead at Shopify',
    bio: 'Alice is a React maintainer and state management enthusiast. She works on large‑scale e‑commerce applications and contributes to open source.',
    sessions: ['State Management in 2025'],
    social: {
      twitter: 'alicej',
      linkedin: 'alicejohnson',
    },
  },
  {
    id: '4',
    name: 'Bob Brown',
    role: 'Performance Consultant',
    bio: 'Bob helps companies around the world improve their web performance. He is the author of several popular performance auditing tools.',
    sessions: ['Performance Optimization Strategies'],
    social: {
      github: 'bobbrown',
    },
  },
  {
    id: '5',
    name: 'Carol White',
    role: 'Accessibility Engineer',
    bio: 'Carol is dedicated to making the web inclusive for everyone. She works with teams to integrate accessibility into their development process.',
    sessions: ['Accessibility First'],
    social: {
      twitter: 'carolwhite',
      linkedin: 'carolwhite',
    },
  },
  {
    id: '6',
    name: 'David Lee',
    role: 'Developer Advocate',
    bio: 'David focuses on cloud and serverless technologies. He loves helping developers adopt modern architectures and sharing his knowledge through talks and blog posts.',
    sessions: ['Serverless in Production'],
    social: {
      twitter: 'davidlee',
      github: 'davidlee',
    },
  },
];

// Helper to get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}