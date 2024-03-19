export function downloadFile({
  src,
  type,
  name,
}: {
  src: string;
  type: "pdf" | "docx";
  name: string;
}) {
  const link = document.createElement('a');
  link.href = src;
  link.download = `${name}.${type}`;
  link.dispatchEvent(new MouseEvent('click'));
}