import { Component, Input, OnInit } from '@angular/core';
import { InavbarData } from '../side-menu/helper';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-subproducts',
  templateUrl: './subproducts.component.html',
  styleUrls: ['../side-menu/side-menu.component.css'],
  animations: [
    trigger('submenu',[
      state('hidden',style({
        height : '0',
        overflow : 'hidden',
      })),
      state('visible',style({
        height : '*',
      })),
      transition('visible <=> hidden',[style({overflow : 'hidden'}),animate('{{transitionParams}}')]),
      transition('void => *',animate(0)),
    ])
  ]

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
