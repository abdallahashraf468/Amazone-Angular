import { Component, Input, OnInit } from '@angular/core';
import { InavbarData } from '../side-menu/helper';

@Component({
  selector: 'app-subproducts',
  templateUrl: './subproducts.component.html',
  styleUrls: ['../side-menu/side-menu.component.css'],
  animations: []
})
export class SubproductsComponent implements OnInit {
  @Input() data: InavbarData = {
    routeLink: '',
    label: '',
    icon: '',
    items: []
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  ngOnInit(): void { }

  handleClick(event: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let item of this.data.items) {
          if (item.expanded && this.expanded) {
            item.expanded = false;
          }
        }
      }
    }
    this.expanded = !this.expanded;
  }
}
