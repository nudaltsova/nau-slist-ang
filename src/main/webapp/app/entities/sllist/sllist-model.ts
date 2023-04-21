import { SlItem } from 'src/main/webapp/app/entities/slitem/slitem-model'
import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { AbstractEntityWithLabel } from 'src/main/webapp/app/core/crud/crud.entity.model'

export class SlList implements AbstractEntityWithLabel {
  constructor(
    public id?: number,
    public date?: number,
    public store?: SlStore | null,
    public items?: SlItem[] | null,
  ){}


  public getLabel(): string {
    return this.id + '';
  }

}
