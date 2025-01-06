export class Focusse {
  private container: HTMLElement;
  private focusableElements: HTMLElement[] = [];
  private currentElementIdx: number = 0;

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
    this.focusableElements[0]?.focus();
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
    this.focusableElements = (Array.from(
      this.container.querySelectorAll(focusableSelectors)
    ) as HTMLElement[]);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;
    if (document.activeElement === this.focusableElements[this.currentElementIdx]) {
      const isShiftPressed = event.shiftKey;
      const step = isShiftPressed ? -1 : 1;

      this.currentElementIdx = (this.currentElementIdx + step) % this.focusableElements.length;
      if (this.currentElementIdx < 0) {
        this.currentElementIdx = this.focusableElements.length - 1;
      }
    }
    else {
      this.currentElementIdx = (this.focusableElements.findIndex((item) => item === document.activeElement) + 1) % this.focusableElements.length;
    }
    event.preventDefault();
    this.focusableElements[this.currentElementIdx]?.focus();
  }
}
