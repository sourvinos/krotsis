import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({ selector: '[inputDecimal]' })

export class InputDecimalDirective {

    constructor(private elementRef: ElementRef) { }

    @HostListener('blur') onBlur(): any {
        const value = this.elementRef.nativeElement.value
        this.elementRef.nativeElement.value = parseFloat(value).toFixed(2)
    }

}
