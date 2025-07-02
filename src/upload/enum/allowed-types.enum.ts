export enum AllowedFileType {
  JPG = 'jpg',
  JPEG = 'jpeg',
  PDF = 'pdf',
}

export const getAllowedFileTypePattern = (): string => {
  const types = Object.values(AllowedFileType);
  return `.(${types.join('|')})`;
};
