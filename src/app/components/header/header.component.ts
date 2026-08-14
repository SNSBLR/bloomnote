import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardStateService } from '../../services/card-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="app-header">
      <div class="header-left">
        <div class="logo-brand" (click)="stateService.startNewCard()">
          <div class="logo-icon">🌿</div>
          <span class="logo-text">Bloomnote</span>
          <span class="version-tag">Studio</span>
        </div>

        <div class="card-title-container" *ngIf="stateService.currentView() === 'editor'">
          <i class="ri-edit-line title-edit-icon"></i>
          <input 
            type="text" 
            class="card-title-input" 
            [ngModel]="stateService.cardTitle()" 
            (ngModelChange)="stateService.cardTitle.set($event)"
            placeholder="Name your card..."
          />
        </div>
      </div>

      <div class="header-right">
        <!-- Editor Top Action Bar -->
        <ng-container *ngIf="stateService.currentView() === 'editor'">
          <button class="btn-pastel btn-pastel-outline" (click)="stateService.toggleAiDrawer()" title="Grammarly-style AI Writing Assistant">
            <i class="ri-sparkles-fill ai-sparkle-icon"></i>
            <span>AI Assistant</span>
          </button>

          <button class="btn-pastel btn-pastel-secondary" (click)="saveDraft()" title="Save as draft to edit later">
            <i class="ri-save-3-line"></i>
            <span>Save Draft</span>
          </button>

          <button class="btn-pastel btn-pastel-primary" (click)="downloadCard()" title="Download High Resolution PNG/PDF">
            <i class="ri-download-2-line"></i>
            <span>Download</span>
          </button>
        </ng-container>

        <!-- Profile / Auth Controls -->
        <div class="profile-menu-container">
          <div class="profile-trigger" (click)="toggleProfileDropdown()" *ngIf="stateService.userProfile().isLoggedIn; else loginBtn">
            <img [src]="stateService.userProfile().avatar" alt="Avatar" class="avatar-img" />
            <div class="user-info-text">
              <span class="user-name">{{ stateService.userProfile().name }}</span>
              <span class="user-badge">
                <i class="ri-google-fill google-mini-icon"></i> Google
              </span>
            </div>
            <i class="ri-arrow-down-s-line arrow-down"></i>
          </div>

          <ng-template #loginBtn>
            <button class="google-sign-in-btn" (click)="stateService.loginWithGoogle()">
              <i class="ri-google-fill google-icon"></i>
              <span>Sign in with Google</span>
            </button>
          </ng-template>

          <!-- Profile Dropdown Modal -->
          <div class="profile-dropdown animate-fade-in" *ngIf="isDropdownOpen()">
            <div class="dropdown-header">
              <img [src]="stateService.userProfile().avatar" alt="Avatar" class="dropdown-avatar" />
              <div class="dropdown-meta">
                <strong>{{ stateService.userProfile().name }}</strong>
                <span class="dropdown-email">{{ stateService.userProfile().email }}</span>
              </div>
            </div>
            <hr class="dropdown-divider" />
            <div class="dropdown-item" (click)="stateService.openCollectionsView(); isDropdownOpen.set(false)">
              <i class="ri-folders-line"></i> My Cards Collections
            </div>
            <div class="dropdown-item" (click)="stateService.startNewCard(); isDropdownOpen.set(false)">
              <i class="ri-add-circle-line"></i> Create New Card
            </div>
            <hr class="dropdown-divider" />
            <div class="dropdown-item logout-item" (click)="stateService.logout(); isDropdownOpen.set(false)">
              <i class="ri-logout-box-r-line"></i> Sign Out
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      height: 64px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--header-bg);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-light);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: background-color 0.3s ease;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .logo-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }

    .logo-icon {
      font-size: 1.4rem;
      background: var(--accent-mint-light);
      padding: 4px 8px;
      border-radius: 10px;
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.02em;
    }

    .version-tag {
      font-size: 0.7rem;
      font-weight: 600;
      background: var(--accent-mint-light);
      color: var(--accent-mint);
      padding: 2px 8px;
      border-radius: 99px;
      text-transform: uppercase;
    }

    .card-title-container {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      padding: 4px 12px;
      border-radius: 10px;
      transition: border-color 0.2s ease;
    }

    .card-title-container:focus-within {
      border-color: var(--accent-mint);
    }

    .title-edit-icon {
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .card-title-input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
      width: 200px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ai-sparkle-icon {
      color: #F59E0B;
    }

    /* Google Profile & Sign In */
    .google-sign-in-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #FFFFFF;
      color: #3C4043;
      border: 1px solid #DADCE0;
      padding: 8px 16px;
      border-radius: 99px;
      font-weight: 600;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }

    .google-sign-in-btn:hover {
      background: #F8F9FA;
      border-color: #D2E3FC;
      box-shadow: 0 2px 6px rgba(0,0,0,0.12);
    }

    .google-icon {
      color: #4285F4;
      font-size: 1.1rem;
    }

    .profile-trigger {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 4px 12px 4px 6px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: 99px;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s ease;
    }

    .profile-trigger:hover {
      background: var(--bg-secondary);
    }

    .avatar-img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-info-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }

    .user-name {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .user-badge {
      font-size: 0.7rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .google-mini-icon {
      color: var(--accent-mint);
    }

    .arrow-down {
      color: var(--text-muted);
      font-size: 1rem;
    }

    .profile-menu-container {
      position: relative;
    }

    .profile-dropdown {
      position: absolute;
      top: 48px;
      right: 0;
      width: 240px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: 16px;
      box-shadow: var(--shadow-lg);
      padding: 8px 0;
      z-index: 200;
    }

    .dropdown-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
    }

    .dropdown-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .dropdown-meta {
      display: flex;
      flex-direction: column;
    }

    .dropdown-meta strong {
      font-size: 0.9rem;
      color: var(--text-primary);
    }

    .dropdown-email {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .dropdown-divider {
      border: none;
      border-top: 1px solid var(--border-light);
      margin: 6px 0;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--text-primary);
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .dropdown-item:hover {
      background: var(--accent-mint-light);
      color: var(--accent-mint);
    }

    .logout-item {
      color: #E53E3E;
    }

    .logout-item:hover {
      background: #FFF5F5;
      color: #E53E3E;
    }
  `]
})
export class HeaderComponent {
  readonly stateService = inject(CardStateService);
  readonly isDropdownOpen = signal<boolean>(false);

  toggleProfileDropdown() {
    this.isDropdownOpen.update(v => !v);
  }

  saveDraft() {
    this.stateService.saveCardDraft(false);
    alert('✨ Draft saved successfully to your "My Cards Collections"!');
  }

  downloadCard() {
    this.stateService.saveCardDraft(true);
    alert('🎉 Downloading high-resolution card PNG! Card has also been saved to your Collections.');
  }
}
