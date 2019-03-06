import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStuff } from 'app/shared/model/stuff.model';

@Component({
    selector: 'jhi-stuff-detail',
    templateUrl: './stuff-detail.component.html'
})
export class StuffDetailComponent implements OnInit {
    stuff: IStuff;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stuff }) => {
            this.stuff = stuff;
        });
    }

    previousState() {
        window.history.back();
    }
}
