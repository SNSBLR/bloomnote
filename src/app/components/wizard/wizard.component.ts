import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardStateService } from '../../services/card-state.service';
import { CARD_OCCASIONS, CARD_FORMATS, CARD_THEMES } from '../../constants/card-data.constants';
import { CardOccasion, CardFormat, CardTheme } from '../../models/card.models';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wizard-container animate-fade-in">
      <!-- Wizard Progress Header -->
      <div class="wizard-header">
        <div class="wizard-steps-indicator">
          <div 
            class="step-badge" 
            [class.active]="stateService.wizardStep() === 1" 
            [class.completed]="stateService.wizardStep() > 1"
            (click)="stateService.goToStep(1)"
          >
            <span class="step-num">1</span>
            <span class="step-label">Occasion</span>
          </div>

          <div class="step-connector" [class.filled]="stateService.wizardStep() > 1"></div>

          <div 
            class="step-badge" 
            [class.active]="stateService.wizardStep() === 2" 
            [class.completed]="stateService.wizardStep() > 2"
            (click)="stateService.wizardStep() >= 2 && stateService.goToStep(2)"
          >
            <span class="step-num">2</span>
            <span class="step-label">Format</span>
          </div>

          <div class="step-connector" [class.filled]="stateService.wizardStep() > 2"></div>

          <div 
            class="step-badge" 
            [class.active]="stateService.wizardStep() === 3" 
            (click)="stateService.wizardStep() >= 3 && stateService.goToStep(3)"
          >
            <span class="step-num">3</span>
            <span class="step-label">Theme</span>
          </div>
        </div>
      </div>

      <!-- ================= PAGE 1: OCCASION SELECTION ================= -->
      <div class="wizard-page-content" *ngIf="stateService.wizardStep() === 1">
        <div class="page-title-group">
          <span class="page-pill">Page 1 of 3</span>
          <h1 class="page-title">What kind of card would you like to create?</h1>
          <p class="page-subtitle">Select an occasion below to begin your personalized card design.</p>
        </div>

        <div class="occasions-grid">
          <div 
            class="occasion-card" 
            *ngFor="let occ of cardOccasions"
            [class.selected]="stateService.selectedOccasion().id === occ.id"
            (click)="stateService.selectOccasion(occ)"
          >
            <div class="occasion-badge">{{ occ.badge }}</div>
            <div class="occasion-icon-bubble" [style.background]="occ.accentBg">
              <i [class]="occ.icon"></i>
            </div>
            <h3 class="occasion-title">{{ occ.title }}</h3>
            <p class="occasion-desc">{{ occ.description }}</p>
            <div class="select-action">
              <span>Select & Continue</span>
              <i class="ri-arrow-right-line"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= PAGE 2: FORMAT SELECTION ================= -->
      <div class="wizard-page-content" *ngIf="stateService.wizardStep() === 2">
        <div class="page-title-group">
          <button class="back-btn" (click)="stateService.goToStep(1)">
            <i class="ri-arrow-left-line"></i> Back to Occasion
          </button>
          <span class="page-pill">Page 2 of 3</span>
          <h1 class="page-title">Choose your preferred card format</h1>
          <p class="page-subtitle">Select the aspect ratio layout for {{ stateService.selectedOccasion().title }}.</p>
        </div>

        <div class="formats-grid">
          <div 
            class="format-card" 
            *ngFor="let fmt of cardFormats"
            [class.selected]="stateService.selectedFormat().id === fmt.id"
            (click)="stateService.selectFormat(fmt)"
          >
            <div class="format-preview-box">
              <div class="aspect-ratio-wireframe" [ngClass]="fmt.id">
                <i [class]="fmt.icon"></i>
              </div>
            </div>
            <div class="format-meta">
              <span class="ratio-pill">{{ fmt.ratio }}</span>
              <h3 class="format-name">{{ fmt.name }}</h3>
              <p class="format-desc">{{ fmt.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= PAGE 3: THEME SELECTION ================= -->
      <div class="wizard-page-content" *ngIf="stateService.wizardStep() === 3">
        <div class="page-title-group">
          <button class="back-btn" (click)="stateService.goToStep(2)">
            <i class="ri-arrow-left-line"></i> Back to Format
          </button>
          <span class="page-pill">Page 3 of 3</span>
          <h1 class="page-title">Pick a beautiful theme for your card</h1>
          <p class="page-subtitle">Choose a pastel color palette and typography aesthetic.</p>
        </div>

        <div class="themes-grid">
          <div 
            class="theme-card" 
            *ngFor="let th of cardThemes"
            [class.selected]="stateService.selectedTheme().id === th.id"
            (click)="stateService.selectThemeAndProceed(th)"
          >
            <div class="theme-color-preview" [style.background]="th.bgGradient">
              <div class="theme-sample-text" [style.font-family]="th.fontFamily" [style.color]="th.textColor">
                Warm Wishes 🌸
              </div>
            </div>
            <div class="theme-info">
              <h3 class="theme-name">{{ th.name }}</h3>
              <p class="theme-desc">{{ th.description }}</p>
              <button class="btn-pastel btn-pastel-primary launch-editor-btn">
                <span>Personalize & Edit Card</span>
                <i class="ri-palette-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wizard-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .wizard-header {
      display: flex;
      justify-content: center;
      margin-bottom: 36px;
    }

    .wizard-steps-indicator {
      display: flex;
      align-items: center;
      gap: 16px;
      background: var(--bg-surface);
      padding: 10px 24px;
      border-radius: 99px;
      border: 1px solid var(--border-medium);
      box-shadow: var(--shadow-sm);
    }

    .step-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.2s ease;
    }

    .step-badge.active, .step-badge.completed {
      opacity: 1;
    }

    .step-num {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 700;
    }

    .step-badge.active .step-num {
      background: var(--accent-mint);
      color: #FFFFFF;
    }

    .step-badge.completed .step-num {
      background: var(--accent-mint-light);
      color: var(--accent-mint);
    }

    .step-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .step-connector {
      width: 40px;
      height: 2px;
      background: var(--border-medium);
    }

    .step-connector.filled {
      background: var(--accent-mint);
    }

    .page-title-group {
      text-align: center;
      margin-bottom: 32px;
      position: relative;
    }

    .back-btn {
      position: absolute;
      left: 0;
      top: 0;
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .back-btn:hover {
      color: var(--accent-mint);
    }

    .page-pill {
      display: inline-block;
      background: var(--accent-mint-light);
      color: var(--accent-mint);
      font-size: 0.78rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .page-title {
      font-size: 2.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }

    .page-subtitle {
      font-size: 1.05rem;
      color: var(--text-secondary);
    }

    /* Step 1 Grid: Occasions */
    .occasions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
      gap: 24px;
    }

    .occasion-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: 20px;
      padding: 28px 24px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .occasion-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent-mint);
      box-shadow: var(--shadow-md);
    }

    .occasion-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 99px;
    }

    .occasion-icon-bubble {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: #2D5A38;
      margin-bottom: 20px;
    }

    .occasion-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .occasion-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .select-action {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--accent-mint);
    }

    /* Step 2 Grid: Formats */
    .formats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .format-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: 18px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.25s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .format-card:hover, .format-card.selected {
      border-color: var(--accent-mint);
      background: var(--accent-mint-light);
      transform: translateY(-3px);
    }

    .format-preview-box {
      height: 140px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }

    .aspect-ratio-wireframe {
      border: 2px dashed var(--accent-mint);
      border-radius: 10px;
      background: var(--bg-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: var(--accent-mint);
      box-shadow: var(--shadow-sm);
    }

    .aspect-ratio-wireframe.portrait { width: 80px; height: 100px; }
    .aspect-ratio-wireframe.landscape { width: 120px; height: 70px; }
    .aspect-ratio-wireframe.square { width: 90px; height: 90px; }
    .aspect-ratio-wireframe.folded { width: 75px; height: 110px; border-style: solid; }
    .aspect-ratio-wireframe.story { width: 65px; height: 115px; }

    .ratio-pill {
      font-size: 0.72rem;
      font-weight: 700;
      background: var(--bg-secondary);
      color: var(--accent-mint);
      padding: 2px 8px;
      border-radius: 99px;
    }

    .format-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 8px 0 4px;
    }

    .format-desc {
      font-size: 0.8rem;
      color: var(--text-secondary);
    }

    /* Step 3 Grid: Themes */
    .themes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .theme-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .theme-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--accent-mint);
    }

    .theme-color-preview {
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .theme-sample-text {
      font-size: 1.8rem;
      font-weight: 700;
      text-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .theme-info {
      padding: 20px;
    }

    .theme-name {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .theme-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .launch-editor-btn {
      width: 100%;
    }
  `]
})
export class WizardComponent {
  readonly stateService = inject(CardStateService);
  readonly cardOccasions = CARD_OCCASIONS;
  readonly cardFormats = CARD_FORMATS;
  readonly cardThemes = CARD_THEMES;
}
