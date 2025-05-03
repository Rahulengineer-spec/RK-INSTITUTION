'use client';

import { useEffect } from 'react';
import { BlogClientWrapper } from './BlogClientWrapper';

export function BlogClientInitializer() {
  // Handle the transition between server and client rendered content
  useEffect(() => {
    // First make sure we're mounted and hydrated
    const serverContent = document.querySelector('.blog-server-content');
    const clientContent = document.querySelector('.blog-client-content');
    const sidebar = document.querySelector('.blog-sidebar');
    
    if (serverContent && clientContent && sidebar) {
      // Render the client components in the sidebar
      sidebar.innerHTML = '';
      const sidebarWrapper = document.createElement('div');
      sidebarWrapper.id = 'blog-sidebar-wrapper';
      sidebar.appendChild(sidebarWrapper);
      
      // Reveal the client content by replacing display:none
      setTimeout(() => {
        clientContent.innerHTML = '';
        (clientContent as HTMLElement).style.display = 'block';
        if (serverContent) {
          (serverContent as HTMLElement).style.display = 'none';
        }
        
        // Initialize client components
        const root = document.createElement('div');
        root.id = 'blog-client-root';
        clientContent.appendChild(root);
      }, 100);
    }
  }, []);
  
  return <BlogClientWrapper />;
}
