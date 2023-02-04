import { SlGroup } from 'src/main/webapp/app/entities/slgroup/slgroup-model'
import { SlUser } from 'src/main/webapp/app/entities/sluser/sluser-model'
import { AbstractEntityWithLabel } from 'src/main/webapp/app/core/crud/crud.entity.model'

export class SlUserGroup implements AbstractEntityWithLabel {
  constructor(
    public id?: number,
    public approved?: boolean,
    public user?: SlUser | null,
    public group?: SlGroup | null,
  ){}


  public getLabel(): string {
    return this.id + '';
  }

}
