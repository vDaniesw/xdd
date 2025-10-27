import useLocalStorage from './useLocalStorage';
import { INITIAL_SITE_CONTENT } from '../constants';
import type { SiteContent } from '../types';

export const useSiteContent = () => {
  const [content, setContent] = useLocalStorage<SiteContent>('site-content', INITIAL_SITE_CONTENT);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  return { content, updateContent };
};
