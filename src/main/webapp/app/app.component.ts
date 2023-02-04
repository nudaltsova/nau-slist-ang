import { Component } from '@angular/core';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { MsalBroadcastService } from '@azure/msal-angular';

import { TranslateService } from "@ngx-translate/core";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private msalBroadcastService: MsalBroadcastService) {

    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.msalBroadcastService.msalSubject$
      .pipe().subscribe((result: EventMessage) => {
        if (result.eventType === EventType.LOGIN_SUCCESS) {
          console.log("login success");
        }
        if (result.eventType === EventType.LOGOUT_SUCCESS) {
          console.log("logout success");
        }
      });

  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
