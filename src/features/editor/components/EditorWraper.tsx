"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const Editor = dynamic(
    async () => {
      const { Editor } = await import("@/features/editor/components/editor");
      return Editor;
    },
    {ssr: false}
  );
  
  

const EditorWrapper = () => {
  return <Editor />;
};

export default EditorWrapper;
