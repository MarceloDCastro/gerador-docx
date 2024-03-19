import { extractRawText } from "mammoth";

export function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error("Falha ao ler arquivo como ArrayBuffer."));
      }
    };

    reader.onerror = (event) => {
      reject(event.target?.error || new Error("Falha ao ler arquivo"));
    };

    reader.readAsArrayBuffer(file);
  });
}

export async function identifyDocxTags(arrayBuffer: ArrayBuffer) {
  const { value: rawText } = await extractRawText({ arrayBuffer });

  const regex = /\{([^\}]+)\}/g;
  const tags: string[] = [];
  let match;

  while ((match = regex.exec(rawText)) !== null) {
    if(!tags.includes(match[1])) tags.push(match[1]);
  }

  return tags;
}