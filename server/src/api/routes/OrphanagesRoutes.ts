import uploadConfigs from '@/core/configs/upload';
import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from '../controllers/OrphanagesController';

const OrphanagesRoutes = () => {
  const router = Router();
  const controller = new OrphanagesController();

  router.get('/', controller.index);
  router.get('/:id', controller.show);
  router.post('/', multer(uploadConfigs).array('images'), controller.create);

  return router;
};

export default OrphanagesRoutes;
