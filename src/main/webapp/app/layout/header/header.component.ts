import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItemsAdmin: any = [
    { label: 'menu.home', route: '/home' },
    {
      label: 'menu.entities', items: [
        { label: 'sluser.name', route: '/users' },
        { label: 'slgroup.name', route: '/groups' },
        { label: 'slusergroup.name', route: '/usergroups' },
        { label: 'slstore.name', route: '/stores' },
      ]
    },
  ];

  menuItemsUser: any = [
    { label: 'menu.home', route: '/home' },
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


  getMenuItems(): any {
    if (this.isAdmin())
      return this.menuItemsAdmin;
    return this.menuItemsAdmin;
  }

  isAdmin(): boolean {
    var user = null;
    var roles: string[];
    if (this.authService.instance.getAllAccounts().length > 0) {
      user = this.authService.instance.getAllAccounts()[0];
      roles = (this.authService.instance.getAllAccounts()[0].idTokenClaims as any).roles;
    }

    const result = roles && roles.length > 0 && roles.indexOf('SLIST_ROLE_ADMIN') > -1;
    return result;
  }

}
