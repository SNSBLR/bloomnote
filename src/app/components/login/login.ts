import { Component, inject } from '@angular/core';
import { CardStateService } from '../../services/card-state.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly stateService = inject(CardStateService);

  loginWithGoogle() {
    console.log('Logging in with Google...');
    this.stateService.loginWithGoogle();
    this.stateService.currentView.set('wizard');
  }

  login() {
    console.log('Logging in with Email...');
    this.stateService.loginWithGoogle(); // Mocking email login for now
    this.stateService.currentView.set('wizard');
  }
}
