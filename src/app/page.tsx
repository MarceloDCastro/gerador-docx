"use client"

import Dropzone from "react-dropzone";
import mammoth from 'mammoth';
import { fileToArrayBuffer } from "@/utils/docx";
import { useState } from "react";

export default function Home() {
  const [docxHtml, setDocxHtml] = useState<string>("");

  async function onUploadFile(files: File[]) {
    const file = files[0];

    if(!file) return;

    const arrayBuffer = await fileToArrayBuffer(file);
    
    const resuultDocxToHtml = await mammoth.convertToHtml({ arrayBuffer });

    setDocxHtml(resuultDocxToHtml.value);
  }

  return (
    <div className="p-10">
      <Dropzone
        accept={{
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        }}
        maxFiles={1}
        onDropAccepted={onUploadFile}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className="dropzone border border-dashed border-gray-400 cursor-pointer w-full rounded-lg p-3"
            {...getRootProps()}
          >
            <input type="file" {...getInputProps()} />
            Arraste seu modelo aqui!
          </div>
        )}
      </Dropzone>

      <div dangerouslySetInnerHTML={{ __html: docxHtml }} />
    </div>
  );
}
