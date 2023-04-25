import { environment } from 'src/main/webapp/environments/environment';

export interface AbstractEntityWithId {
  id?: number;
}

export interface AbstractEntityWithLabel extends AbstractEntityWithId {
  getLabel(): string;
}

export abstract class AbstractCrudComponent {
  lastError: any = "";
  lastErrorMsg: string = "";
  isLoading: boolean = false;

  protected onError(error: any): void {
    this.lastError = error;
    this.isLoading = false;
    let errMessage = "Internal server error"
    if (error.error && error.error.message) {
      this.lastErrorMsg = error.error.message
    } else if (error.message) {
      this.lastErrorMsg = error.message
    }
    this.logError("onError: ", error);
  }

  protected onSuccess(...success: any[]): void {
    this.lastError = null;
    this.isLoading = false;
    let errMessage = "Internal server error"
    this.lastErrorMsg = "";
    if (success)
      this.logMessage("onSuccess: ", success);
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

  protected getLastError(): string {
    if (this.lastErrorMsg)
      return this.lastErrorMsg;
    return "";
  }

  protected hasError(): boolean {
    if (this.lastErrorMsg)
      return this.lastErrorMsg.length > 0;
    return false;
  }
}
