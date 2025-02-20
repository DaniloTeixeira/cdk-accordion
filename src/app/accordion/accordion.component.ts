import {
  CDK_ACCORDION,
  CdkAccordion,
  CdkAccordionItem,
  CdkAccordionModule,
} from "@angular/cdk/accordion";
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-accordion",
  imports: [CdkAccordionModule],
  // Ensures that the items (CdkAccordionItem) recognize the UiAccordionComponent as their accordion.
  providers: [{ provide: CDK_ACCORDION, useExisting: AccordionComponent }],

  template: ` <cdk-accordion class="example-accordion">
    <ng-content />
  </cdk-accordion>`,
})
export class AccordionComponent extends CdkAccordion {
  constructor() {
    // Calls the parent class (CdkAccordion) constructor
    super();
  }
}

@Component({
  selector: "app-accordion-item",
  imports: [CdkAccordionItem],
  template: `
    <cdk-accordion-item
      #accordionItem="cdkAccordionItem"
      class="example-accordion-item"
      tabindex="0"
      [attr.id]="'accordion-header-' + index()"
      [attr.aria-expanded]="accordionItem.expanded"
      [attr.aria-controls]="'accordion-body-' + index()"
    >
      <div
        class="example-accordion-item-header"
        role="button"
        (click)="accordionItem.toggle()"
      >
        <ng-content select="[accordion-header]" />
        <span class="example-accordion-item-description">
          Click to {{ accordionItem.expanded ? "close" : "open" }}
        </span>
      </div>

      <div
        class="example-accordion-item-body"
        role="region"
        [style.display]="accordionItem.expanded ? '' : 'none'"
        [attr.id]="'accordion-body-' + index()"
        [attr.aria-labelledby]="'accordion-header-' + index()"
      >
        <ng-content />
      </div>
    </cdk-accordion-item>
  `,
})
export class AccordionItemComponent implements AfterViewInit {
  readonly #destroyRef = inject(DestroyRef);

  readonly accordionItem =
    viewChild.required<CdkAccordionItem>("accordionItem");

  readonly index = input<number>();

  readonly #expanded = signal(false);

  ngAfterViewInit() {
    this.accordionItem()
      .expandedChange.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((expanded) => {
        this.#expanded.set(expanded);
      });
  }

  open = () => this.accordionItem().open();
  close = () => this.accordionItem().close();
  toggle = () => this.accordionItem().toggle();
}
