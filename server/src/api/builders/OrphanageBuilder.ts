import Orphanage from '../models/Orphanage';
import OrphanageImageBuilder from './OrphanageImageBuilder';

class OrphanagesBuilder {
  private _imageBuilder = new OrphanageImageBuilder();

  render = (orphanage: Orphanage): Orphanage => {
    const { about, id, instructions, latitude, images, longitude, name, openOnWeekends, openingHours } = orphanage;

    return {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      openOnWeekends,
      openingHours,
      images: this._imageBuilder.renderMany(images),
    };
  };

  renderMany = (orphanages: Orphanage[]): Orphanage[] => orphanages.map(orphanage => this.render(orphanage));
}

export default OrphanagesBuilder;
