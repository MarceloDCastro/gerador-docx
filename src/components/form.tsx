"use client"

import { UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { generateDocument } from "@/utils/docx";
import { downloadFile } from "@/utils/download";

interface TagsForm {
  form: UseFormReturn;
  tags: string[];
  file?: File;
}

export function TagsForm({ form, tags, file }: TagsForm) {
  function renderTagsFormInputs() {
    return tags.map(tag => {
      return (
        <div key={tag} className="col-span-4">
          <label htmlFor={tag}>{tag}</label>
          <Input id={tag} {...form.register(tag)} />
        </div>
      )
    })
  }

  function onSubmit(data: Object) {
    console.log({ data });
  }

  async function handleDownload() {
    if (!file) return;

    const documentBlob = await generateDocument(file, form.getValues());
    console.log({ documentBlob });

    downloadFile({src: documentBlob, type: "docx", name: 'Arquivo gerado'})
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-4 mb-4">
        {renderTagsFormInputs()}
      </div>

      <div className="flex gap-4">
        <Button type="submit">Enviar</Button>
        <Button type="button" onClick={handleDownload}>Baixar docx</Button>
      </div>
    </form>
  );
}