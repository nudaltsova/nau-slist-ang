import { ROUTER_CONFIGURATION } from '@angular/router';
import { environment } from 'src/main/webapp/environments/environment';

export interface AbstractEntityWithId {
  id?: number;
}

export interface AbstractEntityWithLabel extends AbstractEntityWithId {
  getLabel(): string;
}

export abstract class AbstractCrudComponent{
  lastError: any = null;
  lastErrorMsg: string = "";
  isLoading: boolean = false;

  protected onError(error: any): void {
    this.lastError = error;
    this.isLoading = false;
    let errMessage = "Internal server error"
    if(error.error && error.error.message){
      errMessage = error.error.message
    } else if(error.message){
      errMessage = error.message
    }
    this.logError("onError: ", error);
  }

  protected logMessage(...args: any[]): void {
    if (environment.production)
      return;
    console.log(...args);
  }

  protected logError(...args: any[]): void {
    if (environment.production)
      return;
    console.error(...args);
  }

}
