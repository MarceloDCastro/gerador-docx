import { extractRawText } from "mammoth";
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
// import PizZipUtils from 'pizzip/utils/index.js';
// import expressionParser from 'docxtemplater/expressions';
// import { downloadFile } from "./download";

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

// export function fileToBinaryString(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       const result = reader.result;
//       if (typeof result === 'string') {
//         resolve(result);
//       } else {
//         reject(new Error('Erro ao converter o arquivo para string binária.'));
//       }
//     };

//     reader.onerror = (error) => {
//       reject(error);
//     };

//     reader.readAsBinaryString(file);
//   });
// }

// function loadFile(url: string, callback: (err: Error, data: string) => void) {
//   PizZipUtils.getBinaryContent(url, callback);
// }

// export function generateDocument(file: string, data: any) {
//   console.log({file, data})
//   let base64 = "";

//   loadFile(
//     file,
//     function (error, content) {
//       if (error) {
//         throw error;
//       }
//       const zip = new PizZip(content);
//       const doc = new Docxtemplater(zip, {
//         paragraphLoop: true,
//         linebreaks: true,
//         parser: expressionParser,
//       });
//       doc.render(data);
//       const out = doc.getZip().generate({
//         type: 'base64',
//         mimeType:
//           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       });
//       base64 = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + out;
//     }
//   );

//   return base64;
// };

// export function generatea(file: File, data: any) {
//   const reader = new FileReader();
//   if (!file) return;

//   let blob;

//   reader.readAsBinaryString(file);

//   reader.onerror = function (evt) {
//       console.log("error reading file", evt);
//   };

//   reader.onload = function (evt) {
//     const content = evt.target?.result;
//     if (!content) return;

//     const zip = new PizZip(content);
//     const doc = new window.docxtemplater(zip, {
//         paragraphLoop: true,
//         linebreaks: true,
//     });

//     doc.render(data);

//     blob = doc.getZip().generate({
//         type: "blob",
//         mimeType:
//             "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         compression: "DEFLATE",
//     });
//   };

//   return blob;
// };

export function generateDocument(file: File, data: any): Promise<string> {
  try {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    return new Promise((resolve, reject) => {
      reader.onload = function(event) {
        const binaryString = event.target?.result || "";
        if (!binaryString) throw Error;

        const zip = new PizZip(binaryString);
        const docx = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        docx.render(data);

        const outputBlob = docx.getZip().generate({
          type: 'blob',
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          compression: "DEFLATE",
        });
        const outputUrl = URL.createObjectURL(outputBlob);
        resolve(outputUrl);
      };

      reader.onerror = function(error) {
        reject(error);
      };
    });
  } catch {
    throw new Error('Erro ao carregar e substituir tags');
  }
}