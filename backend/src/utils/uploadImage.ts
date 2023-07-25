import { FileArray, UploadedFile } from 'express-fileupload';
import fs from 'fs';
import { join } from 'path';

export const removeTmp = (path: string): void => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

export const checkImage = async (files: FileArray): Promise<UploadedFile> => {
  if (!files || Object.keys(files).length === 0) throw new Error('No ha seleccionado ningún archivo');
  const file = files.img as UploadedFile;
  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!file) {
    removeTmp(file);
    throw new Error('La imagen no existe');
  }
  if (!types.includes(file.mimetype)) {
    removeTmp(file.tempFilePath);
    throw new Error('El formato del archivo debe ser imagen o pdf');
  }
  if (file.size > 1024 * 1024 * 2) {
    removeTmp(file.tempFilePath);
    throw new Error('El tamaño del archivo debe ser menor a 2MB');
  }
  return file;
};

export const buffer = (file: UploadedFile) => {
  if (!fs.existsSync(file.tempFilePath)) removeTmp(file.tempFilePath);
  const bufferRead = fs.readFileSync(file.tempFilePath);
  return bufferRead;
};

export const renameFile = (file: UploadedFile) => {
  const name = file.name.split('.');
  const ext = name[name.length - 1];
  const newName = `${Date.now()}.${ext}`;
  fs.renameSync(file.tempFilePath, join('images', newName));
  return `images/${newName}`;
};
