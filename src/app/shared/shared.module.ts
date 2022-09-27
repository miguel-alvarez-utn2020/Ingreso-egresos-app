import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const component = [NavbarComponent, SidebarComponent];

@NgModule({
  declarations: [FooterComponent, ...component],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, SidebarComponent, FooterComponent],
})
export class SharedModule {}
