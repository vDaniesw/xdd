import type React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
  created_at?: string;
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

export interface SiteContent {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutImage: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
}