import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardStateService } from '../../services/card-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="app-sidebar" [class.minimized]="stateService.isSidebarMinimized()">
      <!-- Top Section: Expand/Collapse Arrow Toggle -->
      <div class="sidebar-header">
        <button 
          class="collapse-toggle-btn" 
          (click)="stateService.toggleSidebar()" 
          title="{{ stateService.isSidebarMinimized() ? 'Expand Menu' : 'Minimize Menu' }}"
        >
          <i [class]="stateService.isSidebarMinimized() ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'"></i>
        </button>
      </div>

      <!-- Main Navigation Menu -->
      <nav class="sidebar-nav">
        <!-- Option 1: Create / New Card -->
        <button 
          class="nav-item" 
          [class.active]="stateService.currentView() === 'wizard' || stateService.currentView() === 'editor'"
          (click)="stateService.startNewCard()"
          title="Create New Card"
        >
          <div class="icon-wrapper">
            <i class="ri-add-line"></i>
          </div>
          <span class="nav-label" *ngIf="!stateService.isSidebarMinimized()">Create / New</span>
        </button>

        <!-- Option 2: My Cards Collections -->
        <button 
          class="nav-item" 
          [class.active]="stateService.currentView() === 'collections'"
          (click)="stateService.openCollectionsView()"
          title="My Cards Collections"
        >
          <div class="icon-wrapper">
            <i class="ri-gallery-fill"></i>
          </div>
          <span class="nav-label" *ngIf="!stateService.isSidebarMinimized()">My Collections</span>
          <span class="collections-count-badge" *ngIf="!stateService.isSidebarMinimized() && stateService.savedCards().length > 0">
            {{ stateService.savedCards().length }}
          </span>
        </button>
      </nav>

      <!-- Sidebar Footer: Dark / Light Mode Switch -->
      <div class="sidebar-footer">
        <div class="theme-toggle-card" [class.minimized-card]="stateService.isSidebarMinimized()">
          <button 
            class="theme-toggle-btn" 
            (click)="stateService.toggleDarkMode()"
            title="Toggle Light/Dark Theme"
          >
            <div class="theme-icon-container">
              <i [class]="stateService.isDarkMode() ? 'ri-moon-clear-fill moon-icon' : 'ri-sun-fill sun-icon'"></i>
            </div>
            <div class="theme-label-group" *ngIf="!stateService.isSidebarMinimized()">
              <span class="theme-title">{{ stateService.isDarkMode() ? 'Dark Mode' : 'Light Mode' }}</span>
              <span class="theme-subtitle">Pastel Theme</span>
            </div>
            <div class="toggle-switch-track" *ngIf="!stateService.isSidebarMinimized()">
              <div class="toggle-switch-thumb" [class.active-dark]="stateService.isDarkMode()"></div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .app-sidebar {
      width: 240px;
      height: calc(100vh - 64px);
      background-color: var(--bg-sidebar);
      border-right: 1px solid var(--border-light);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 16px 12px;
      transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      user-select: none;
      z-index: 90;
    }

    .app-sidebar.minimized {
      width: 72px;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-light);
    }

    .app-sidebar.minimized .sidebar-header {
      justify-content: center;
    }

    .collapse-toggle-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--accent-mint-light);
      border: 1px solid var(--border-medium);
      color: var(--accent-mint);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .collapse-toggle-btn:hover {
      background: var(--accent-mint);
      color: #FFFFFF;
      transform: scale(1.05);
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 16px;
      flex: 1;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px 14px;
      border-radius: 14px;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      font-size: 0.92rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .app-sidebar.minimized .nav-item {
      justify-content: center;
      padding: 12px 0;
    }

    .nav-item:hover {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }

    .nav-item.active {
      background-color: var(--accent-mint-light);
      color: var(--accent-mint);
    }

    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 15%;
      height: 70%;
      width: 4px;
      border-radius: 0 4px 4px 0;
      background-color: var(--accent-mint);
    }

    .icon-wrapper {
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-label {
      white-space: nowrap;
      flex: 1;
      text-align: left;
    }

    .collections-count-badge {
      background: var(--accent-mint);
      color: #FFFFFF;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 99px;
    }

    /* Sidebar Footer / Theme Switch */
    .sidebar-footer {
      border-top: 1px solid var(--border-light);
      padding-top: 12px;
    }

    .theme-toggle-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-medium);
      border-radius: 16px;
      padding: 6px;
      transition: all 0.2s ease;
    }

    .theme-toggle-card.minimized-card {
      padding: 4px;
    }

    .theme-toggle-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 6px 8px;
    }

    .app-sidebar.minimized .theme-toggle-btn {
      justify-content: center;
    }

    .theme-icon-container {
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: var(--bg-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-sm);
    }

    .sun-icon {
      color: #F59E0B;
      font-size: 1.1rem;
    }

    .moon-icon {
      color: #8B5CF6;
      font-size: 1.1rem;
    }

    .theme-label-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 8px;
      flex: 1;
    }

    .theme-title {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .theme-subtitle {
      font-size: 0.68rem;
      color: var(--text-muted);
    }

    .toggle-switch-track {
      width: 38px;
      height: 20px;
      background: var(--border-medium);
      border-radius: 99px;
      padding: 2px;
      position: relative;
      transition: background 0.2s ease;
    }

    .toggle-switch-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #FFFFFF;
      transition: transform 0.2s ease;
      box-shadow: var(--shadow-sm);
    }

    .toggle-switch-thumb.active-dark {
      transform: translateX(18px);
      background: var(--accent-mint);
    }
  `]
})
export class SidebarComponent {
  readonly stateService = inject(CardStateService);
}
