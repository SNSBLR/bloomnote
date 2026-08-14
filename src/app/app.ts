import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardStateService } from './services/card-state.service';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { EditorComponent } from './components/editor/editor.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { AiAssistantComponent } from './components/ai-assistant/ai-assistant.component';

import { Login } from './components/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    WizardComponent,
    EditorComponent,
    CollectionsComponent,
    AiAssistantComponent,
    Login
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly stateService = inject(CardStateService);
}
