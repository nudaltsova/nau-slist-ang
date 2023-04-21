import { SlUserGroup } from 'src/main/webapp/app/entities/slusergroup/slusergroup-model'
import { AbstractEntityWithLabel } from 'src/main/webapp/app/core/crud/crud.entity.model'

export class SlUser implements AbstractEntityWithLabel {
  constructor(
    public id?: number,
    public name?: string,
    public login?: string,
    public userGroups?: SlUserGroup[] | null,
  ){}


  public getLabel(): string {
    return this.name + '';
  }

}
