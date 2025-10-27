import type React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

export interface Skill {
  name: string;
  icon: React.ReactElement;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactElement;
}