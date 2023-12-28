import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

// type CustomFile = Express.Multer.File;

export default multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 2000000,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileFilter: (_req: Request, file: any, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      const error: Error = new Error('File type is not supported');
      cb(error as unknown as null, false);
      return;
    }
    cb(null, true);
  },
});
