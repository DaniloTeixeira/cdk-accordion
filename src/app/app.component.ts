import { Component } from "@angular/core";
import {
  AccordionComponent,
  AccordionItemComponent,
} from "./accordion/accordion.component";

@Component({
  selector: "app-root",
  imports: [AccordionItemComponent, AccordionComponent],

  template: `
    <app-accordion multi>
      @for (item of items; track $index) {
      <app-accordion-item [index]="$index" #accordionItem>
        <span accordion-header>{{ item }}</span>

        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
          excepturi incidunt ipsum deleniti labore, tempore non nam doloribus
          blanditiis veritatis illo autem iure aliquid ullam rem tenetur
          deserunt velit culpa?
        </div>
      </app-accordion-item>

      }
    </app-accordion>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 1rem;

        & > * {
          flex: 1;
        }
      }
    `,
  ],
})
export class AppComponent {
  readonly items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
}
