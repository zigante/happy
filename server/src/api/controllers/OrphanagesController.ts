import { RequestHandler } from 'express';
import { getRepository } from 'typeorm';
import OrphanageBuilder from '../builders/OrphanageBuilder';
import Orphanage from '../models/Orphanage';
import OrphanageValidator from '../validators/OrphanageValidator';

class OrphanagesController {
  private _repository = getRepository(Orphanage);
  private _builder = new OrphanageBuilder();
  private _validator = new OrphanageValidator();

  index: RequestHandler = (_req, res) =>
    this._repository
      .findAndCount({ relations: ['images'] })
      .then(([data, total]) => ({ data: this._builder.renderMany(data), total }))
      .then(({ data, total }) => res.status(200).send({ data, total }));

  show: RequestHandler = ({ params }, res) =>
    this._repository
      .findOneOrFail({ where: { id: params.id }, relations: ['images'] })
      .then(data => this._builder.render(data))
      .then(data => res.status(200).send(data));

  create: RequestHandler = ({ body, files }, res) => {
    const images = (files as Express.Multer.File[])?.map(({ filename: path }) => ({ path })) || [];
    const { openOnWeekends } = body as Orphanage;

    const payload = this._repository.create({
      ...body,
      openOnWeekends: typeof openOnWeekends === 'boolean' ? openOnWeekends : openOnWeekends === 'true',
      images,
    });

    return this._validator
      .validate((payload as unknown) as Orphanage)
      .then(() => this._repository.save(payload))
      .then(data => this._builder.render((data as unknown) as Orphanage))
      .then(orphanage => res.status(201).send(orphanage));
  };
}

export default OrphanagesController;
