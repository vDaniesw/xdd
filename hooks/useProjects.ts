import { useState, useEffect, useCallback } from 'react';
import type { Project } from '../types';
import { supabase } from '../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error.message || error);
      setProjects([]);
    } else {
      setProjects(data as Project[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (projectData: Omit<Project, 'id' | 'imageurl'>, imageFile: File) => {
    const fileName = `${uuidv4()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }

    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName);
    
    const imageUrl = urlData.publicUrl;

    const { data: insertData, error: insertError } = await supabase
      .from('projects')
      .insert([{ ...projectData, imageurl: imageUrl }])
      .select();

    if (insertError) {
      console.error('Error adding project:', insertError);
      await supabase.storage.from('project-images').remove([fileName]);
      throw insertError;
    }

    if (insertData) {
      setProjects(prevProjects => [insertData[0] as Project, ...prevProjects]);
    }
  };

  const deleteProject = async (id: string) => {
    const projectToDelete = projects.find(p => p.id === id);
    if (!projectToDelete) return;

    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (deleteError) {
        console.error('Error deleting project:', deleteError);
        throw deleteError;
    }
    
    try {
        const imageUrl = projectToDelete.imageurl;
        const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        if (fileName) {
            await supabase.storage.from('project-images').remove([fileName]);
        }
    } catch (storageError) {
        console.error("Could not delete project image from storage.", storageError);
    }
    
    setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
  };

  return { projects, loading, addProject, deleteProject };
};