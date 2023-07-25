import errorMessage from '@utils/errorMessage';
import { checkImage } from '@utils/uploadImage';
import { Request, Response } from 'express';
import { FileArray } from 'express-fileupload';
import fs from 'fs';
import { resolve } from 'path';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { folder } = req.query;
    const { files } = req;
    const file = await checkImage(files as FileArray);
    const folderPath = resolve(__dirname, `../images/${folder}`);
    const path = resolve(folderPath, `${Date.now()}-${id}.${file.mimetype.split('/').pop()}`);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    await file.mv(path);
    return res.json({ message: 'ok', path });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const destroyFile = async (req: Request, res: Response) => {
  try {
    const { path } = req.query;
    if (!fs.existsSync(String(path))) return res.status(400).json({ error: 'El archivo no existe' });
    fs.unlinkSync(String(path));
    return res.json({ message: 'ok' });
  } catch (error) {
    return errorMessage(res, error);
  }
};
