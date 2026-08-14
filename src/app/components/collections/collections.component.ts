import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardStateService } from '../../services/card-state.service';
import { SavedCard } from '../../models/card.models';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="collections-container animate-fade-in">
      <div class="collections-header">
        <div>
          <h1 class="collections-title">My Cards Collections</h1>
          <p class="collections-subtitle">View, edit, download, and manage your saved card drafts & finished creations.</p>
        </div>

        <button class="btn-pastel btn-pastel-primary" (click)="stateService.startNewCard()">
          <i class="ri-add-line"></i> Create New Card
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="search-box">
          <i class="ri-search-line search-icon"></i>
          <input 
            type="text" 
            class="search-input" 
            placeholder="Search cards by title or occasion..."
            [ngModel]="searchQuery()"
            (ngModelChange)="searchQuery.set($event)"
          />
        </div>

        <div class="tab-filters">
          <button 
            class="filter-tab" 
            [class.active]="activeTab() === 'all'"
            (click)="activeTab.set('all')"
          >
            All Cards ({{ stateService.savedCards().length }})
          </button>
          <button 
            class="filter-tab" 
            [class.active]="activeTab() === 'drafts'"
            (click)="activeTab.set('drafts')"
          >
            Drafts
          </button>
          <button 
            class="filter-tab" 
            [class.active]="activeTab() === 'completed'"
            (click)="activeTab.set('completed')"
          >
            Finished Cards
          </button>
        </div>
      </div>

      <!-- Collections Grid -->
      <div class="collections-grid" *ngIf="filteredCards().length > 0; else emptyState">
        <div class="card-item" *ngFor="let card of filteredCards()">
          <div class="card-preview-container" (click)="stateService.loadDraftIntoEditor(card)">
            <div class="preview-mockup" [style.aspect-ratio]="card.aspectRatio">
              <span class="preview-badge" [class.draft]="card.isDraft">
                {{ card.isDraft ? 'Draft' : 'Saved Card' }}
              </span>
              <div class="card-inner-text">
                <i class="ri-mail-heart-fill card-icon"></i>
                <h4 class="card-preview-title">{{ card.title }}</h4>
                <span class="format-tag">{{ card.aspectRatio }}</span>
              </div>
            </div>
          </div>

          <div class="card-item-body">
            <h3 class="card-item-title">{{ card.title }}</h3>
            <span class="card-item-date">Updated {{ card.updatedAt }}</span>

            <div class="card-actions">
              <button class="action-btn edit-btn" (click)="stateService.loadDraftIntoEditor(card)" title="Edit Card">
                <i class="ri-edit-box-line"></i> Edit
              </button>
              <button class="action-btn download-btn" (click)="downloadCard(card)" title="Download">
                <i class="ri-download-2-line"></i>
              </button>
              <button class="action-btn delete-btn" (click)="stateService.deleteSavedCard(card.id)" title="Delete">
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <ng-template #emptyState>
        <div class="empty-state-box">
          <div class="empty-icon-bubble">🌿</div>
          <h2>No cards found in your collection</h2>
          <p>Start a new card design or adjust your search filter.</p>
          <button class="btn-pastel btn-pastel-primary" (click)="stateService.startNewCard()">
            <i class="ri-add-line"></i> Create Your First Card
          </button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .collections-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .collections-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
    }

    .collections-title {
      font-size: 2.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 6px;
    }

    .collections-subtitle {
      font-size: 0.98rem;
      color: var(--text-secondary);
    }

    .filter-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
      gap: 16px;
    }

    .search-box {
      position: relative;
      width: 320px;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
    }

    .search-input {
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: 12px;
      padding: 10px 14px 10px 36px;
      color: var(--text-primary);
      font-size: 0.9rem;
      outline: none;
    }

    .tab-filters {
      display: flex;
      background: var(--bg-secondary);
      padding: 4px;
      border-radius: 12px;
      border: 1px solid var(--border-medium);
    }

    .filter-tab {
      padding: 6px 14px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
    }

    .filter-tab.active {
      background: var(--bg-surface);
      color: var(--accent-mint);
      box-shadow: var(--shadow-sm);
    }

    .collections-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
    }

    .card-item {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: 18px;
      overflow: hidden;
      transition: all 0.25s ease;
    }

    .card-item:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
      border-color: var(--accent-mint);
    }

    .card-preview-container {
      background: var(--bg-secondary);
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .preview-mockup {
      width: 100%;
      background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
      border-radius: 12px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-shadow: var(--shadow-sm);
    }

    body.dark-theme .preview-mockup {
      background: linear-gradient(135deg, #1C2B20 0%, #294231 100%);
    }

    .preview-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 0.68rem;
      font-weight: 700;
      background: var(--accent-mint);
      color: #FFFFFF;
      padding: 2px 8px;
      border-radius: 99px;
    }

    .preview-badge.draft {
      background: #F59E0B;
    }

    .card-icon {
      font-size: 2rem;
      color: var(--accent-mint);
      margin-bottom: 8px;
    }

    .card-preview-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
      text-align: center;
    }

    .format-tag {
      font-size: 0.7rem;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .card-item-body {
      padding: 16px;
    }

    .card-item-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .card-item-date {
      font-size: 0.78rem;
      color: var(--text-muted);
      display: block;
      margin-bottom: 14px;
    }

    .card-actions {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-medium);
      background: var(--bg-secondary);
      color: var(--text-primary);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .edit-btn {
      flex: 1;
      justify-content: center;
      background: var(--accent-mint-light);
      color: var(--accent-mint);
      border-color: var(--accent-mint);
    }

    .delete-btn:hover {
      background: #FFF5F5;
      color: #E53E3E;
    }

    .empty-state-box {
      text-align: center;
      padding: 60px 20px;
      background: var(--bg-surface);
      border: 1px dashed var(--border-medium);
      border-radius: 20px;
      margin-top: 20px;
    }

    .empty-icon-bubble {
      font-size: 3rem;
      margin-bottom: 12px;
    }
  `]
})
export class CollectionsComponent {
  readonly stateService = inject(CardStateService);
  readonly searchQuery = signal<string>('');
  readonly activeTab = signal<'all' | 'drafts' | 'completed'>('all');

  readonly filteredCards = computed(() => {
    let cards = this.stateService.savedCards();
    const query = this.searchQuery().toLowerCase().trim();
    const tab = this.activeTab();

    if (tab === 'drafts') {
      cards = cards.filter(c => c.isDraft);
    } else if (tab === 'completed') {
      cards = cards.filter(c => !c.isDraft);
    }

    if (query) {
      cards = cards.filter(c => c.title.toLowerCase().includes(query) || c.occasionId.includes(query));
    }

    return cards;
  });

  downloadCard(card: SavedCard) {
    alert(`🎉 Downloading card "${card.title}" high-res PNG file!`);
  }
}
