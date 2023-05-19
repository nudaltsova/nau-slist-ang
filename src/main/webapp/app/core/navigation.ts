import { NavigationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private navigationHistory: string[];

    constructor(private router: Router, private location: Location) {
        this.navigationHistory = [];
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.navigationHistory.push(event.url);
             }
        });
    }

    public getRedirectBack() {
        const length = this.navigationHistory.length;
        if (length === 0)
            return this.location.back();
        const previousURL = this.navigationHistory[length - 1];
        if (previousURL.includes("new"))
            if (this.navigationHistory.length === 1)
                return previousURL;
            else return this.navigationHistory[length - 2];
        else
            return previousURL;;
    }

}
