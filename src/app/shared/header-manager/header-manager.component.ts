import { Component, OnInit, Input, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { MatAnchor } from '@angular/material/button';

import { HeaderTag, LinkData } from '../types';

@Component({
  selector: 'app-header-manager',
  templateUrl: './header-manager.component.html',
  styleUrls: ['./header-manager.component.scss']
})
export class HeaderManagerComponent implements OnInit, AfterViewInit {
  @Input() text: string;
  @Input() headerTag: HeaderTag;
  @Input() linkData: LinkData;

  @ViewChild('link', { static: false }) link: MatAnchor;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    const header = this.renderer.createElement(this.headerTag);
    if (this.linkData) {
      this.renderer.appendChild(header, this.link._elementRef.nativeElement);
    } else {
      const text = this.renderer.createText(this.text);
      this.renderer.appendChild(header, text);
    }
    this.renderer.appendChild(this.elementRef.nativeElement, header);
  }

}
