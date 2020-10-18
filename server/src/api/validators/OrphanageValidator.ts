import * as Yup from 'yup';
import Orphanage from '../models/Orphanage';
import OrphanageImageValidator from './OrphanageImageValidator';

class OrphanageValidator {
  private _imageValidator = new OrphanageImageValidator();

  validate = (data: Orphanage) =>
    this.schema.validate(data, {
      abortEarly: false,
    });

  schema = Yup.object().shape({
    name: Yup.string().required(),
    about: Yup.string().max(300),
    instructions: Yup.string(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    openingHours: Yup.string().required(),
    openOnWeekends: Yup.boolean().required(),
    contact: Yup.string(),
    images: Yup.array(this._imageValidator.schema),
  });
}

export default OrphanageValidator;
