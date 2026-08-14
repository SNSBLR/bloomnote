import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardStateService } from '../../services/card-state.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ai-drawer-overlay animate-fade-in" *ngIf="stateService.isAiDrawerOpen()">
      <div class="ai-drawer-panel">
        <!-- Header -->
        <div class="ai-drawer-header">
          <div class="ai-header-title">
            <div class="ai-sparkle-avatar">
              <i class="ri-sparkles-fill"></i>
            </div>
            <div>
              <h3>AI Writing Assistant</h3>
              <span class="ai-subtitle">Grammarly-style message helper</span>
            </div>
          </div>

          <button class="close-drawer-btn" (click)="stateService.toggleAiDrawer()">
            <i class="ri-close-line"></i>
          </button>
        </div>

        <!-- Quick Action Transformation Pills -->
        <div class="quick-actions-bar">
          <span class="bar-label">Quick AI Transformations:</span>
          <div class="pills-scroll">
            <button class="action-pill" (click)="stateService.transformSelectedTextWithAi('grammar')">
              <i class="ri-magic-line"></i> Fix Grammar
            </button>
            <button class="action-pill" (click)="stateService.transformSelectedTextWithAi('shorten')">
              <i class="ri-scissors-line"></i> Shorten
            </button>
            <button class="action-pill" (click)="stateService.transformSelectedTextWithAi('elongate')">
              <i class="ri-expand-height-line"></i> Elongate
            </button>
            <button class="action-pill" (click)="stateService.transformSelectedTextWithAi('heartfelt')">
              <i class="ri-heart-line"></i> Make Heartfelt
            </button>
            <button class="action-pill" (click)="stateService.transformSelectedTextWithAi('funny')">
              <i class="ri-emotion-laugh-line"></i> Make Witty
            </button>
            <button class="action-pill" (click)="stateService.transformSelectedTextWithAi('formal')">
              <i class="ri-briefcase-line"></i> Make Formal
            </button>
          </div>
        </div>

        <!-- Chat Conversation Messages Body -->
        <div class="ai-chat-body">
          <div 
            *ngFor="let msg of stateService.aiMessages()" 
            class="chat-bubble-row"
            [class.user-row]="msg.sender === 'user'"
            [class.ai-row]="msg.sender === 'ai'"
          >
            <div class="bubble-avatar">
              <span *ngIf="msg.sender === 'user'">👤</span>
              <i class="ri-sparkles-fill ai-avatar-icon" *ngIf="msg.sender === 'ai'"></i>
            </div>

            <div class="bubble-content">
              <p class="bubble-text">{{ msg.text }}</p>

              <!-- Apply to Card Button for AI Suggestions -->
              <div class="apply-container" *ngIf="msg.sender === 'ai' && msg.text.length > 20">
                <button class="apply-to-card-btn" (click)="applyText(msg.text)">
                  <i class="ri-check-line"></i> Apply to Selected Text Block
                </button>
              </div>
            </div>
          </div>

          <!-- Loading Indicator -->
          <div class="ai-thinking-row" *ngIf="stateService.isAiThinking()">
            <div class="bubble-avatar">
              <i class="ri-sparkles-fill ai-avatar-icon spinning"></i>
            </div>
            <div class="thinking-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- Bottom Custom Prompt Input Bar -->
        <div class="ai-input-footer">
          <input 
            type="text" 
            class="ai-prompt-input"
            placeholder="Ask AI to alter, edit, or write a custom message..."
            [(ngModel)]="customPrompt"
            (keyup.enter)="submitPrompt()"
          />
          <button class="btn-pastel btn-pastel-primary send-prompt-btn" (click)="submitPrompt()">
            <i class="ri-send-plane-2-fill"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ai-drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(4px);
      z-index: 300;
      display: flex;
      justify-content: flex-end;
    }

    .ai-drawer-panel {
      width: 420px;
      height: 100%;
      background: var(--bg-surface);
      border-left: 1px solid var(--border-medium);
      box-shadow: var(--shadow-lg);
      display: flex;
      flex-direction: column;
    }

    .ai-drawer-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--bg-secondary);
    }

    .ai-header-title {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ai-sparkle-avatar {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: var(--accent-mint-light);
      color: var(--accent-mint);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
    }

    .ai-header-title h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .ai-subtitle {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .close-drawer-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid var(--border-medium);
      background: var(--bg-surface);
      color: var(--text-primary);
      cursor: pointer;
    }

    /* Quick Action Pills */
    .quick-actions-bar {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-light);
      background: var(--bg-primary);
    }

    .bar-label {
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 8px;
      display: block;
    }

    .pills-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
    }

    .action-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 12px;
      border-radius: 99px;
      border: 1px solid var(--border-medium);
      background: var(--bg-surface);
      color: var(--text-primary);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .action-pill:hover {
      background: var(--accent-mint-light);
      color: var(--accent-mint);
      border-color: var(--accent-mint);
    }

    /* Chat Messages Body */
    .ai-chat-body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .chat-bubble-row {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .chat-bubble-row.user-row {
      flex-direction: row-reverse;
    }

    .bubble-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--bg-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
    }

    .ai-avatar-icon {
      color: var(--accent-mint);
    }

    .bubble-content {
      max-width: 80%;
      background: var(--bg-secondary);
      border: 1px solid var(--border-medium);
      border-radius: 16px;
      padding: 12px 16px;
    }

    .user-row .bubble-content {
      background: var(--accent-mint);
      color: #FFFFFF;
      border: none;
    }

    .bubble-text {
      font-size: 0.88rem;
      line-height: 1.45;
    }

    .apply-container {
      margin-top: 10px;
    }

    .apply-to-card-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--accent-mint);
      color: #FFFFFF;
      border: none;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
    }

    .apply-to-card-btn:hover {
      background: var(--accent-mint-hover);
    }

    .ai-thinking-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .thinking-dots {
      display: flex;
      gap: 4px;
    }

    .thinking-dots span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-mint);
      animation: pulse 1s infinite alternate;
    }

    @keyframes pulse {
      0% { opacity: 0.3; }
      100% { opacity: 1; }
    }

    /* Footer Input */
    .ai-input-footer {
      padding: 16px;
      border-top: 1px solid var(--border-light);
      display: flex;
      gap: 10px;
      background: var(--bg-surface);
    }

    .ai-prompt-input {
      flex: 1;
      background: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: 12px;
      padding: 10px 14px;
      color: var(--text-primary);
      font-size: 0.88rem;
      outline: none;
    }

    .send-prompt-btn {
      padding: 10px 14px;
      border-radius: 12px;
    }
  `]
})
export class AiAssistantComponent {
  readonly stateService = inject(CardStateService);
  customPrompt = '';

  submitPrompt() {
    if (!this.customPrompt.trim()) return;
    this.stateService.sendCustomAiPrompt(this.customPrompt);
    this.customPrompt = '';
  }

  applyText(text: string) {
    this.stateService.applyAiTextToSelected(text);
    alert('✨ Applied message to your card canvas text block!');
    this.stateService.toggleAiDrawer();
  }
}
