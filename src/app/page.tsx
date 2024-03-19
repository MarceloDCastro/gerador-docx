"use client"

import Dropzone from "react-dropzone";
import { convertToHtml } from 'mammoth';
import { fileToArrayBuffer, identifyDocxTags } from "@/utils/docx";
import { useState } from "react";
import { Title } from "@/components/text";
import { useForm } from "react-hook-form";
import { TagsForm } from "@/components/form";

export default function Home() {
  const [docxHtml, setDocxHtml] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const tagsForm = useForm();

  async function onUploadFile(files: File[]) {
    const file = files[0];
    if(!file) return;

    const arrayBuffer = await fileToArrayBuffer(file);
    
    const resultDocxToHtml = await convertToHtml({ arrayBuffer });
    setDocxHtml(resultDocxToHtml.value);

    const tags = await identifyDocxTags(arrayBuffer);
    setTags(tags);

    tagsForm.reset();
  }

  return (
    <div className="p-10 space-y-3">
      <Title as="h1">Gerador de docx</Title>

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

      {!!docxHtml && (
        <section>
          <Title as="h2">Convertido em HTML</Title>
          <div dangerouslySetInnerHTML={{ __html: docxHtml }} className="border max-h-[400px] p-5 overflow-scroll" />
        </section>
      )}

      {!!tags.length && (
        <section>
          <Title as="h2">Formulário das Tags</Title>
          <TagsForm form={tagsForm} tags={tags} />
        </section>
      )}
    </div>
  );
}
