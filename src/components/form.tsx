import { UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TagsForm {
  form: UseFormReturn;
  tags: string[];
}

export function TagsForm({ form, tags }: TagsForm) {
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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-4 mb-4">
        {renderTagsFormInputs()}
      </div>

      <div className="flex gap-4">
        <Button type="submit">Enviar</Button>
        <Button type="button">Baixar Word</Button>
      </div>
    </form>
  );
}