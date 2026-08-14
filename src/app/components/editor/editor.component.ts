import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardStateService } from '../../services/card-state.service';
import { STICKER_LIBRARY, SAMPLE_PHOTOS } from '../../constants/card-data.constants';
import { CanvasElement } from '../../models/card.models';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="editor-workspace animate-fade-in">
      <!-- Left Tool Drawer Navigation -->
      <div class="editor-left-tools">
        <div class="tool-tabs">
          <button 
            class="tab-btn" 
            [class.active]="activeTab() === 'text'"
            (click)="activeTab.set('text')"
          >
            <i class="ri-text-spacing"></i>
            <span>Text & Fonts</span>
          </button>

          <button 
            class="tab-btn" 
            [class.active]="activeTab() === 'stickers'"
            (click)="activeTab.set('stickers')"
          >
            <i class="ri-emotion-line"></i>
            <span>Stickers</span>
          </button>

          <button 
            class="tab-btn" 
            [class.active]="activeTab() === 'photos'"
            (click)="activeTab.set('photos')"
          >
            <i class="ri-image-add-line"></i>
            <span>Photos</span>
          </button>
        </div>

        <!-- Tool Content Panels -->
        <div class="tool-panel-body">
          <!-- ================= TAB 1: TEXT & TYPOGRAPHY ================= -->
          <div class="panel-section" *ngIf="activeTab() === 'text'">
            <h3 class="section-title">Typography & Style</h3>

            <button class="btn-pastel btn-pastel-primary add-element-btn" (click)="stateService.addTextElement()">
              <i class="ri-add-line"></i> Add New Text Block
            </button>

            <button class="btn-pastel btn-pastel-outline ai-trigger-btn" (click)="stateService.toggleAiDrawer()">
              <i class="ri-sparkles-fill ai-sparkle"></i> AI Writing Assistant
            </button>

            <!-- Text Property Inspector (If a text element is selected) -->
            <div class="property-inspector" *ngIf="getSelectedTextElement() as selText">
              <label class="prop-label">Edit Message Text</label>
              <textarea 
                class="prop-textarea" 
                rows="3"
                [ngModel]="selText.content"
                (ngModelChange)="stateService.updateElement(selText.id, { content: $event })"
              ></textarea>

              <label class="prop-label">Font Family</label>
              <select 
                class="prop-select"
                [ngModel]="selText.fontFamily"
                (ngModelChange)="stateService.updateElement(selText.id, { fontFamily: $event })"
              >
                <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans</option>
                <option value="'Caveat', cursive">Caveat (Handwritten)</option>
                <option value="'Dancing Script', cursive">Dancing Script (Cursive)</option>
                <option value="'Playfair Display', serif">Playfair Display (Serif)</option>
                <option value="'Outfit', sans-serif">Outfit (Modern Bold)</option>
                <option value="'Pacifico', cursive">Pacifico (Fun Retro)</option>
                <option value="'Cinzel', serif">Cinzel (Classic Elegant)</option>
              </select>

              <div class="prop-row">
                <div>
                  <label class="prop-label">Font Size ({{ selText.fontSize }}px)</label>
                  <input 
                    type="range" 
                    min="12" 
                    max="64" 
                    class="prop-slider"
                    [ngModel]="selText.fontSize"
                    (ngModelChange)="stateService.updateElement(selText.id, { fontSize: +$event })"
                  />
                </div>
              </div>

              <label class="prop-label">Text Color</label>
              <div class="color-palette-presets">
                <div 
                  class="color-swatch" 
                  *ngFor="let c of colorPresets"
                  [style.background]="c"
                  [class.active]="selText.color === c"
                  (click)="stateService.updateElement(selText.id, { color: c })"
                ></div>
                <input 
                  type="color" 
                  class="custom-color-picker" 
                  [ngModel]="selText.color"
                  (ngModelChange)="stateService.updateElement(selText.id, { color: $event })"
                />
              </div>

              <label class="prop-label">Text Alignment</label>
              <div class="align-btn-group">
                <button 
                  class="align-btn" 
                  [class.active]="selText.align === 'left'"
                  (click)="stateService.updateElement(selText.id, { align: 'left' })"
                >
                  <i class="ri-align-left"></i>
                </button>
                <button 
                  class="align-btn" 
                  [class.active]="selText.align === 'center'"
                  (click)="stateService.updateElement(selText.id, { align: 'center' })"
                >
                  <i class="ri-align-center"></i>
                </button>
                <button 
                  class="align-btn" 
                  [class.active]="selText.align === 'right'"
                  (click)="stateService.updateElement(selText.id, { align: 'right' })"
                >
                  <i class="ri-align-right"></i>
                </button>
              </div>

              <div class="layer-actions">
                <button class="layer-btn" (click)="stateService.moveLayer(selText.id, 'up')">
                  <i class="ri-layer-line"></i> Bring Forward
                </button>
                <button class="layer-btn danger" (click)="stateService.deleteElement(selText.id)">
                  <i class="ri-delete-bin-line"></i> Delete
                </button>
              </div>
            </div>
          </div>

          <!-- ================= TAB 2: STICKERS ================= -->
          <div class="panel-section" *ngIf="activeTab() === 'stickers'">
            <h3 class="section-title">Decorations & Stickers</h3>
            <p class="panel-hint">Click any sticker below to place it onto your card canvas.</p>

            <div class="stickers-grid">
              <div 
                class="sticker-tile" 
                *ngFor="let stk of stickerLibrary"
                (click)="stateService.addSticker(stk.icon)"
                title="{{ stk.name }}"
              >
                <span class="sticker-emoji">{{ stk.icon }}</span>
              </div>
            </div>
          </div>

          <!-- ================= TAB 3: PHOTOS ================= -->
          <div class="panel-section" *ngIf="activeTab() === 'photos'">
            <h3 class="section-title">Photos & Framing</h3>

            <div class="file-upload-box">
              <input type="file" #fileInput (change)="onPhotoFileSelected($event)" accept="image/*" style="display:none;" />
              <button class="btn-pastel btn-pastel-primary add-element-btn" (click)="fileInput.click()">
                <i class="ri-upload-cloud-2-line"></i> Upload Custom Photo
              </button>
            </div>

            <h4 class="sub-section-title">Pastel Sample Photos</h4>
            <div class="sample-photos-grid">
              <div 
                class="sample-photo-card" 
                *ngFor="let pic of samplePhotos"
                (click)="stateService.addPhoto(pic.url)"
              >
                <img [src]="pic.url" [alt]="pic.name" />
                <span class="photo-title">{{ pic.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Center Main Card Studio Canvas Workspace -->
      <div class="canvas-workspace-main">
        <!-- Canvas Stage Container -->
        <div 
          class="card-canvas-stage" 
          [style.width.px]="stateService.selectedFormat().width"
          [style.height.px]="stateService.selectedFormat().height"
          [style.background]="stateService.selectedTheme().bgGradient"
        >
          <!-- Outer Decorative Border Frame -->
          <div class="canvas-inner-border">
            <!-- Dynamic Canvas Elements -->
            <div 
              *ngFor="let el of stateService.canvasElements()"
              class="canvas-element"
              [class.selected]="stateService.selectedElementId() === el.id"
              [style.left.%]="el.x"
              [style.top.%]="el.y"
              [style.width.px]="el.width"
              [style.z-index]="el.zIndex"
              (click)="selectCanvasElement(el.id, $event)"
            >
              <!-- TEXT ELEMENT -->
              <ng-container *ngIf="el.type === 'text'">
                <div 
                  class="element-text-content"
                  [style.font-size.px]="el.fontSize"
                  [style.font-family]="el.fontFamily"
                  [style.color]="el.color"
                  [style.text-align]="el.align"
                  [style.font-weight]="el.fontWeight || '400'"
                >
                  {{ el.content }}
                </div>
              </ng-container>

              <!-- STICKER ELEMENT -->
              <ng-container *ngIf="el.type === 'sticker'">
                <div class="element-sticker-content" [style.font-size.px]="el.fontSize">
                  {{ el.content }}
                </div>
              </ng-container>

              <!-- PHOTO ELEMENT -->
              <ng-container *ngIf="el.type === 'photo'">
                <img [src]="el.content" alt="Uploaded photo" class="element-photo-content" />
              </ng-container>

              <!-- Active Drag & Selection Controls -->
              <div class="element-controls" *ngIf="stateService.selectedElementId() === el.id">
                <button class="ctrl-btn delete-btn" (click)="stateService.deleteElement(el.id); $event.stopPropagation()">
                  <i class="ri-close-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="canvas-bottom-hint">
          <i class="ri-drag-move-2-line"></i> Click any text, sticker, or photo on the card to edit & customize properties.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .editor-workspace {
      display: flex;
      height: calc(100vh - 64px);
      overflow: hidden;
    }

    /* Left Tool Drawer */
    .editor-left-tools {
      width: 340px;
      background: var(--bg-surface);
      border-right: 1px solid var(--border-light);
      display: flex;
      flex-direction: column;
    }

    .tool-tabs {
      display: flex;
      border-bottom: 1px solid var(--border-light);
      background: var(--bg-secondary);
    }

    .tab-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 12px 6px;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .tab-btn i {
      font-size: 1.2rem;
    }

    .tab-btn.active {
      background: var(--bg-surface);
      color: var(--accent-mint);
      border-bottom: 2px solid var(--accent-mint);
    }

    .tool-panel-body {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }

    .section-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 16px;
    }

    .add-element-btn, .ai-trigger-btn {
      width: 100%;
      margin-bottom: 12px;
    }

    .ai-sparkle {
      color: #F59E0B;
    }

    /* Property Inspector */
    .property-inspector {
      background: var(--bg-secondary);
      border: 1px solid var(--border-medium);
      border-radius: 16px;
      padding: 16px;
      margin-top: 16px;
    }

    .prop-label {
      display: block;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 12px 0 6px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .prop-textarea, .prop-select {
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: 10px;
      padding: 8px 12px;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.88rem;
      outline: none;
    }

    .prop-slider {
      width: 100%;
      accent-color: var(--accent-mint);
    }

    .color-palette-presets {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .color-swatch {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid transparent;
      box-shadow: var(--shadow-sm);
    }

    .color-swatch.active {
      border-color: var(--accent-mint);
      transform: scale(1.15);
    }

    .custom-color-picker {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      background: transparent;
    }

    .align-btn-group {
      display: flex;
      gap: 8px;
    }

    .align-btn {
      flex: 1;
      padding: 6px;
      border: 1px solid var(--border-medium);
      background: var(--bg-surface);
      color: var(--text-secondary);
      border-radius: 8px;
      cursor: pointer;
    }

    .align-btn.active {
      background: var(--accent-mint-light);
      color: var(--accent-mint);
      border-color: var(--accent-mint);
    }

    .layer-actions {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }

    .layer-btn {
      flex: 1;
      padding: 8px;
      border-radius: 8px;
      border: 1px solid var(--border-medium);
      background: var(--bg-surface);
      color: var(--text-primary);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
    }

    .layer-btn.danger {
      color: #E53E3E;
    }

    /* Stickers & Photos */
    .stickers-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .sticker-tile {
      background: var(--bg-secondary);
      border: 1px solid var(--border-medium);
      border-radius: 12px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .sticker-tile:hover {
      transform: scale(1.1);
      background: var(--accent-mint-light);
    }

    .sticker-emoji {
      font-size: 1.8rem;
    }

    .sub-section-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 20px 0 12px;
    }

    .sample-photos-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .sample-photo-card {
      background: var(--bg-secondary);
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid var(--border-medium);
    }

    .sample-photo-card img {
      width: 100%;
      height: 90px;
      object-fit: cover;
    }

    .photo-title {
      display: block;
      font-size: 0.7rem;
      padding: 4px 6px;
      text-align: center;
      color: var(--text-secondary);
    }

    /* Canvas Stage Workspace */
    .canvas-workspace-main {
      flex: 1;
      background-color: var(--bg-primary);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      overflow: auto;
      position: relative;
    }

    .card-canvas-stage {
      position: relative;
      border-radius: 20px;
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .canvas-inner-border {
      position: absolute;
      inset: 16px;
      border: 2px dashed rgba(0,0,0,0.1);
      border-radius: 12px;
      pointer-events: none;
    }

    .canvas-element {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: move;
      user-select: none;
      pointer-events: auto;
      border: 1.5px solid transparent;
      padding: 4px;
      border-radius: 8px;
    }

    .canvas-element.selected {
      border-color: var(--accent-mint);
      background: rgba(78, 168, 106, 0.05);
    }

    .element-text-content {
      line-height: 1.4;
      white-space: pre-wrap;
    }

    .element-photo-content {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    .element-controls {
      position: absolute;
      top: -12px;
      right: -12px;
    }

    .ctrl-btn {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #E53E3E;
      color: #FFFFFF;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
    }

    .canvas-bottom-hint {
      margin-top: 16px;
      font-size: 0.82rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }
  `]
})
export class EditorComponent {
  readonly stateService = inject(CardStateService);
  readonly activeTab = signal<'text' | 'stickers' | 'photos'>('text');
  readonly stickerLibrary = STICKER_LIBRARY;
  readonly samplePhotos = SAMPLE_PHOTOS;

  readonly colorPresets = [
    '#15281B', // Evergreen
    '#4EA86A', // Mint
    '#C85267', // Rose Pink
    '#D98A2B', // Warm Gold
    '#2B84B4', // Ocean Aqua
    '#6B8E23', // Olive Sage
    '#2C3E50', // Dark Slate
    '#FFFFFF'  // White
  ];

  getSelectedTextElement(): CanvasElement | null {
    const selId = this.stateService.selectedElementId();
    if (!selId) return null;
    return this.stateService.canvasElements().find(el => el.id === selId && el.type === 'text') || null;
  }

  selectCanvasElement(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.stateService.selectedElementId.set(id);
  }

  onPhotoFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.stateService.addPhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
