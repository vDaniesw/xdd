import type React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageurl: string;
  tags: string[];
  liveurl?: string;
  sourceurl?: string;
  created_at?: string;
  views?: number;
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
  herotitle: string;
  herosubtitle: string;
  herodescription: string;
  aboutimage: string;
  aboutp1: string;
  aboutp2: string;
  aboutp3: string;
  githuburl?: string;
  linkedinurl?: string;
  twitterurl?: string;
  skills?: string[];
}

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
}
