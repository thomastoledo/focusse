export class Focusse {
    private container: HTMLElement;
    private focusableElements: HTMLElement[] = [];
    private firstElement: HTMLElement | null = null;
    private lastElement: HTMLElement | null = null;
  
    private keydownHandler: (event: KeyboardEvent) => void;
    private focusableSelectors: string[] = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
  
    constructor(container: HTMLElement) {
      this.container = container;
  
      // Handle keyboard navigation
      this.keydownHandler = this.handleKeyDown.bind(this);
    }
  
    activate() {
      this.updateFocusableElements();
      this.container.addEventListener('keydown', this.keydownHandler);
  
      // Focus on the first focusable element
      if (this.firstElement) {
        this.firstElement.focus();
      }
    }
  
    deactivate() {
      this.container.removeEventListener('keydown', this.keydownHandler);
    }
  
    setCustomSelectors(customSelectors: string[], replace: boolean = false) {
      if (replace) {
        this.focusableSelectors = customSelectors;
      } else {
        this.focusableSelectors = [...this.focusableSelectors, ...customSelectors];
      }
      this.updateFocusableElements();
    }
  
    private updateFocusableElements() {
      const focusableSelectors = this.focusableSelectors.join(', ');
      this.focusableElements = Array.from(
        this.container.querySelectorAll(focusableSelectors)
      ) as HTMLElement[];
  
      this.firstElement = this.focusableElements[0] || null;
      this.lastElement = this.focusableElements[this.focusableElements.length - 1] || null;
    }
  
    private handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab') return;
  
      const isShiftPressed = event.shiftKey;
  
      if (isShiftPressed && document.activeElement === this.firstElement) {
        // Shift+Tab on the first element
        event.preventDefault();
        this.lastElement?.focus();
      } else if (!isShiftPressed && document.activeElement === this.lastElement) {
        // Tab on the last element
        event.preventDefault();
        this.firstElement?.focus();
      }
    }
  }
  