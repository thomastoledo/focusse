import { Focusse } from './focusse';

describe('Focusse', () => {
  let container: HTMLElement;
  let focusse: Focusse;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <button id="button1">Button 1</button>
      <button id="button2">Button 2</button>
      <input type="text" id="input1" />
      <a href="#" id="link1">Link</a>
    `;
    document.body.appendChild(container);

    focusse = new Focusse(container);
  });

  afterEach(() => {
    container.remove();
  });

  test('activates focus trapping and focuses on the first element', () => {
    focusse.activate();

    const firstButton = container.querySelector('#button1');
    expect(document.activeElement).toBe(firstButton);
  });

  test('deactivates focus trapping', () => {
    focusse.activate();
    focusse.deactivate();

    const event = new KeyboardEvent('keydown', { key: 'Tab' });
    container.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
  });

  test('handles Tab navigation correctly', () => {
    focusse.activate();

    const firstButton = container.querySelector('#button1') as HTMLElement;
    const secondButton = container.querySelector('#button2') as HTMLElement;

    // Simulate Tab on the first button
    firstButton.focus();
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    container.dispatchEvent(tabEvent);

    expect(document.activeElement).toBe(secondButton);
  });

  test('handles Shift+Tab navigation correctly', () => {
    focusse.activate();

    const firstButton = container.querySelector('#button1') as HTMLElement;
    const lastLink = container.querySelector('#link1') as HTMLElement;

    // Simulate Shift+Tab on the first button
    firstButton.focus();
    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
    });
    container.dispatchEvent(shiftTabEvent);

    expect(document.activeElement).toBe(lastLink);
  });

  test('sets custom selectors and updates focusable elements', () => {
    container.innerHTML += `<div tabindex="0" id="custom">Custom Div</div>`;

    focusse.setCustomSelectors(['div[tabindex="0"]']);
    focusse.activate();

    const customDiv = container.querySelector('#custom') as HTMLElement;
    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
    });
    container.dispatchEvent(shiftTabEvent);
    expect(document.activeElement).toBe(customDiv);
  });

  test('replaces default selectors with custom selectors', () => {
    container.innerHTML += `<span tabindex="0" id="customSpan">Custom Span</span>`;

    focusse.setCustomSelectors(['span[tabindex="0"]'], true);
    focusse.activate();

    const customSpan = container.querySelector('#customSpan') as HTMLElement;
    expect(document.activeElement).toBe(customSpan);
  });

  test('handles empty containers gracefully', () => {
    container.innerHTML = '';
    focusse = new Focusse(container);

    expect(() => focusse.activate()).not.toThrow();
    expect(document.activeElement).not.toBe(container);
  });

  test('updates focusable elements after content changes', () => {
    container.innerHTML = '<button id="newButton">New Button</button>';
    focusse.activate();

    const newButton = container.querySelector('#newButton') as HTMLElement;
    expect(document.activeElement).toBe(newButton);
  });

  test('does nothing if Tab is pressed without focusable elements', () => {
    container.innerHTML = '';
    focusse = new Focusse(container);

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    container.dispatchEvent(tabEvent);

    expect(tabEvent.defaultPrevented).toBe(false);
  });

  test('handles repeated activation and deactivation correctly', () => {
    focusse.activate();
    const firstButton = container.querySelector('#button1') as HTMLElement;
    expect(document.activeElement).toBe(firstButton);

    focusse.deactivate();
    focusse.activate();
    expect(document.activeElement).toBe(firstButton);
  });
});
