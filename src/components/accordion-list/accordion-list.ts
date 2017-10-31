import { Component, ElementRef, Input, Renderer, ViewChild } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'accordion-list',
    templateUrl: 'accordion-list.html'
})
export class AccordionListComponent {
    @Input() headerColor: string;
    @Input() textColor: string = '#FFF';
    @Input() contentColor: string = '#F9F9F9';
    @Input() title: string;
    @Input() subtitle: string;
    @Input() fecha: string;
    @Input() valorIndicador: string;
    @Input() desplegable: string = "true";
    @Input() button: boolean = false;
    @Input() masMeses: boolean = false;
    @Input() masMesesButton: string = "";
    @Input() hasMargin: boolean = true;
    @Input() maxHeight: number;

    @ViewChild('accordionContent') elementView: ElementRef;

    expanded: boolean = true;
    viewHeight: number;
    primerTexto: boolean = true;
    segundoTexto: boolean = false;

    constructor(public renderer: Renderer) { }

    ngAfterViewInit() {
        this.viewHeight = this.elementView.nativeElement.offsetHeight;
        this.renderer.setElementStyle(this.elementView.nativeElement, 'max-height', this.maxHeight + 'px');
    }

    toggleAccordion() {
        if (this.desplegable == "true") {
            this.expanded = !this.expanded;
            const newHeight = this.expanded ? this.maxHeight + 'px' : '0px';
            this.renderer.setElementStyle(this.elementView.nativeElement, 'max-height', newHeight);
        }
    }
    toggleAccordionButton() {
        this.expanded = !this.expanded;
        const newHeight = this.expanded ? this.maxHeight + 'px' : '0px';
        this.renderer.setElementStyle(this.elementView.nativeElement, 'max-height', newHeight);
        if (this.primerTexto) {
            this.primerTexto = false;
            this.segundoTexto = true;
        }
        else {
            this.primerTexto = true;
            this.segundoTexto = false;
        }
    }

}
