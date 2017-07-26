export type FileImports = Map<string, string[]>;

export function addImport(
  source: string,
  imported: string[],
  imports: FileImports,
) {
  if (!imports.has(source)) {
    imports.set(source, imported);
  } else {
    const parts = imports.get(source) as string[];
    imports.set(source, [...new Set([...parts, ...imported])]);
  }

  return imports;
}
