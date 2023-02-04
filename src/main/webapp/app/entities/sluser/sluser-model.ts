import { AbstractEntityWithLabel } from 'src/main/webapp/app/core/crud/crud.entity.model'

export class SlUser implements AbstractEntityWithLabel {
  constructor(
    public id?: number,
    public name?: string,
    public login?: string,
  ){}


  public getLabel(): string {
    return this.name + '';
  }

}
