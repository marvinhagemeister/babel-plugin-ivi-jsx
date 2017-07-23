export type FileImports = Map<number, Map<string, string[]>>;

export function addImport(
  file: number,
  source: string,
  imported: string[],
  fileImports: FileImports,
) {
  if (!fileImports.has(file)) {
    fileImports.set(file, new Map());
  }

  const imports = fileImports.get(file) as Map<string, string[]>;

  if (!imports.has(source)) {
    imports.set(source, imported);
  } else {
    const parts = imports.get(source) as string[];
    imports.set(source, [...new Set([...parts, ...imported])]);
  }

  return fileImports;
}
