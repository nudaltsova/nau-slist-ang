import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'
import { AbstractEntityWithLabel } from 'src/main/webapp/app/core/crud/crud.entity.model'

export class SlItem implements AbstractEntityWithLabel {
  constructor(
    public id?: number,
    public name?: string,
    public orderNum?: number,
    public department?: SlDepartment | null,
  ){}


  public getLabel(): string {
    return this.name + '';
  }

}
