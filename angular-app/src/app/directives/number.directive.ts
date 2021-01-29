import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[Number]'
})
export class NumberDirective {

    // Allow only numbers
    private regexOnlyNum: RegExp = new RegExp(/^[0-9]*$/g);
    // Allow Backspace, tab, end, home, delete
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete'];

    constructor(private el: ElementRef) {
    }
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {

        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regexOnlyNum)) {
            event.preventDefault();
        }
    }
}
