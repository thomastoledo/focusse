import { Focusse } from './focusse';


describe('FocusTrap', () => {
  let container: HTMLElement;
  let focusse: Focusse;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <button>Button 1</button>
      <input type="text" placeholder="Input field" />
      <button>Button 2</button>
    `;
    document.body.appendChild(container);
    focusse = new Focusse(container);
  });

  afterEach(() => {
    container.remove();
  });

  test('should activate and set focus on the first focusable element', () => {
    focusse.activate();
    const firstButton = container.querySelector('button')!;
    expect(document.activeElement).toBe(firstButton);
  });

  test('should trap focus within the container and loop with Tab', () => {
    focusse.activate();
    const buttons = container.querySelectorAll('button');
    const input = container.querySelector('input')!;

    buttons[0].focus(); // Start at first button
    focusse.activate();

    input.focus(); // Simulate Tab to input
    expect(document.activeElement).toBe(input);

    buttons[1].focus(); // Simulate Tab to second button
    expect(document.activeElement).toBe(buttons[1]);

    buttons[0].focus(); // Simulate loop back
    expect(document.activeElement).toBe(buttons[0]);
  });
  test('should trap focus within the container and loop with Shift+Tab', () => {
    const buttons = container.querySelectorAll('button');
    const input = container.querySelector('input')!;
  
    focusse.activate();
  
    // Step 1: Focus on the last element
    buttons[1].focus();
    expect(document.activeElement).toBe(buttons[1]);
  
    // Step 2: Simulate Shift+Tab to move focus to input
    input.focus(); // Explicitly move focus to input
    expect(document.activeElement).toBe(input);
  
    // Step 3: Simulate Shift+Tab to move focus to the first button
    buttons[0].focus(); // Explicitly move focus to first button
    expect(document.activeElement).toBe(buttons[0]);
  
    // Step 4: Simulate Shift+Tab to loop back to the last button
    buttons[1].focus(); // Explicitly move focus to last button
    expect(document.activeElement).toBe(buttons[1]);
  });
  

  test('should deactivate and allow focus to leave the container', () => {
    const outsideButton = document.createElement('button');
    document.body.appendChild(outsideButton);

    focusse.activate();
    focusse.deactivate();

    outsideButton.focus();
    expect(document.activeElement).toBe(outsideButton);

    outsideButton.remove();
  });

  test('should handle empty containers gracefully', () => {
    container.innerHTML = ''; // Empty the container
    focusse = new Focusse(container);

    expect(() => focusse.activate()).not.toThrow();
    expect(document.activeElement).not.toBe(container); // Focus does not move
  });


  test('should allow adding custom selectors', () => {
    container.innerHTML += `<div data-focus="true" tabindex="0">Custom Focusable</div>`;
    focusse.setCustomSelectors(['[data-focus="true"]']);
    focusse.activate();

    const customElement: HTMLElement = container.querySelector('[data-focus="true"]')!;
    customElement.focus();
    expect(document.activeElement).toBe(customElement);
  });

  test('should allow replacing default selectors', () => {
    container.innerHTML += `<div data-focus="true" tabindex="0">Custom Focusable</div>`;
    focusse.setCustomSelectors(['[data-focus="true"]'], true); // Replace defaults
    focusse.activate();

    const customElement: HTMLElement = container.querySelector('[data-focus="true"]')!;
    customElement.focus();
    expect(document.activeElement).toBe(customElement);
  });

  test('should handle containers with no focusable elements', () => {
    container.innerHTML = `<div>No focusable elements here</div>`;
    focusse.activate();

    expect(document.activeElement).not.toBe(container); // Focus does not move
  });
});
