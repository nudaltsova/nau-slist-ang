import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: any = [
    { label: 'menu.home', route: '/home'},
    { label: 'menu.entities', items: [
            { label: 'sluser.name', route: '/users'},
      { label: 'slgroup.name', route: '/groups'},
      { label: 'slusergroup.name', route: '/usergroups'},
      { label: 'slstore.name', route: '/stores'},
      { label: 'sllist.name', route: '/lists'},
    ]},
  ];

  constructor(private authService: MsalService) { }

  ngOnInit(): void {

  }

  doLogout(): void {
    this.authService.instance.logout();
  }

  getUsername(): string {
    if (this.authService.instance.getAllAccounts().length > 0) {
      return this.authService.instance.getAllAccounts()[0].name;
    }
    return 'Anonymous';
  }
}
