import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'
import { SlGroup } from 'src/main/webapp/app/entities/slgroup/slgroup-model'
import { AbstractEntityWithLabel } from 'src/main/webapp/app/core/crud/crud.entity.model'

export class SlStore implements AbstractEntityWithLabel {
  constructor(
    public id?: number,
    public name?: string,
    public country?: string,
    public group?: SlGroup | null,
    public departments?: SlDepartment[] | null,
  ){}


  public getLabel(): string {
    return this.name + '';
  }

}
