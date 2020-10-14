import { diskStorage } from 'multer';
import path from 'path';

export default {
  storage: diskStorage({
    destination: path.join(__dirname, '..', '..', '..', 'uploads'),
    filename: (_req, file, cb) => cb(null, [Date.now(), file.originalname].join('-')),
  }),
};
