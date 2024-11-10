"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

// Add custom formats if needed
const formats = [
  'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 
  'list', 'bullet', 'indent', 'link', 'image', 'video', 'color', 
  'background', 'align', 'clean', // 'clean' for the clear formatting button
];

export const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-black">
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange} 
        formats={formats} // Pass the formats to support specific HTML elements
        modules={{
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'] // remove formatting button
          ],
        }}
      />
    </div>
  );
};
