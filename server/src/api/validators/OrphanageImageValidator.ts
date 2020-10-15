import * as Yup from 'yup';
import OrphanageImage from '../models/OrphanageImage';

class OrphanageImageValidator {
  validate = (data: OrphanageImage) =>
    this.schema.validate(data, {
      abortEarly: false,
    });

  schema = Yup.object().shape({
    path: Yup.string().required(),
  });
}

export default OrphanageImageValidator;
