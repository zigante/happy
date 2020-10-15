import { Configs } from '@/core';
import OrphanageImage from '../models/OrphanageImage';

class OrphanageImageBuilder {
  private _configs = Configs.Server;

  render = ({ id, path }: OrphanageImage): OrphanageImage => {
    return {
      id,
      path: `${this._configs.proxyUrl}/uploads/${path}`,
    };
  };

  renderMany = (images: OrphanageImage[]): OrphanageImage[] => images.map(this.render);
}

export default OrphanageImageBuilder;
