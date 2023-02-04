import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { AbstractEntityWithLabel } from 'src/main/webapp/app/core/crud/crud.entity.model'

export class SlGroup implements AbstractEntityWithLabel {
  constructor(
    public id?: number,
    public name?: string,
    public stores?: SlStore[] | null,
  ){}


  public getLabel(): string {
    return this.name + '';
  }

}
