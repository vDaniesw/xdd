import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { SiteContent } from '../types';
import { v4 as uuidv4 } from 'uuid';

const CONTENT_ID = 1; // Assuming a single row for site content

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    // Use .maybeSingle() to prevent an error when the table is empty.
    // It will return null instead of throwing an error.
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('id', CONTENT_ID)
      .maybeSingle();

    if (error) {
      // This will now only log actual database errors, not "zero rows returned".
      console.error('Error fetching site content:', error.message || error);
      setContent(null);
    } else {
      setContent(data as SiteContent | null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const updateContent = async (newContent: Omit<SiteContent, 'id'>, imageFile: File | null) => {
    let finalContent = { ...newContent };

    if (imageFile) {
        const fileName = `about-image/${uuidv4()}-${imageFile.name}`;
        
        if (content?.aboutimage) {
            try {
                const urlParts = content.aboutimage.split('/');
                const oldFileName = urlParts.slice(-2).join('/'); // Grabs 'about-image/uuid-name.ext'
                if (oldFileName && oldFileName.length > 0) {
                    await supabase.storage.from('site-assets').remove([oldFileName]);
                }
            } catch(e) {
                console.error("Error removing old image:", e);
            }
        }
        
        const { error: uploadError } = await supabase.storage
            .from('site-assets')
            .upload(fileName, imageFile);

        if (uploadError) {
            console.error('Error uploading about image:', uploadError);
            throw uploadError;
        }

        const { data: urlData } = supabase.storage
            .from('site-assets')
            .getPublicUrl(fileName);
        
        finalContent.aboutimage = urlData.publicUrl;
    }
    
    // .upsert() followed by .select().single() is safe because upsert guarantees the row exists.
    const { data, error } = await supabase
      .from('site_content')
      .upsert({ ...finalContent, id: CONTENT_ID })
      .select()
      .single();

    if (error) {
      console.error('Error updating site content:', error);
      throw error;
    }
    
    if (data) {
        setContent(data as SiteContent);
    }
  };

  return { content, loading, updateContent };
};
