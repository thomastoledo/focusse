# 👀 Focusse

**Focusse** is a lightweight library for managing focus within modals, dialogs, or any component that requires trapping the user's focus. It ensures accessible and seamless navigation for keyboard and screen reader users.

---

## 🚀 Features

- **Focus trapping**: Ensures focus stays within a specified container.
- **Customizable focusable elements**: Add or replace default selectors to match your needs.
- **Keyboard navigation**: Handles `Tab` and `Shift+Tab` for circular navigation.
- **Accessible**: Enhances UX for keyboard users and aligns with accessibility guidelines.
- **Easy activation/deactivation**: Simple API for managing focus trapping dynamically.

---

## 📦 Installation

Install via npm:

```bash
npm install focusse
```

Or yarn:

```bash
yarn add focusse
```

---

## 🔧 Usage

### Import the library

```typescript
import { Focusse } from 'focusse';
```

---

### 🔹 **Basic Usage**

Trap focus within a modal or dialog.

```typescript
const modal = document.getElementById('modal')!;
const focusse = new Focusse(modal);

// Activate focus trapping
focusse.activate();

// Deactivate focus trapping
focusse.deactivate();
```

**HTML:**

```html
<div id="modal" style="display: none;">
  <button id="closeModal">Close</button>
  <input type="text" placeholder="Enter text" />
  <button>Submit</button>
</div>
```

---

### 🔹 **Custom Focusable Selectors**

Add or replace focusable selectors.

#### **Add custom selectors**
```typescript
focusse.setCustomSelectors(['[data-focus="true"]']);

// Example: Add a custom focusable element to your modal
modal.innerHTML += '<div data-focus="true" tabindex="0">Custom Focusable Element</div>';
focusse.activate();
```

#### **Replace default selectors**
```typescript
focusse.setCustomSelectors(['[data-focus="true"]'], true); // Replace defaults
focusse.activate();
```

---

### 🔹 **Keyboard Navigation**

The library automatically manages `Tab` and `Shift+Tab` navigation.

- Pressing `Tab` on the last focusable element loops back to the first.
- Pressing `Shift+Tab` on the first focusable element loops to the last.

---

## 🛠️ API Reference

### **Constructor**

```typescript
const focusse = new Focusse(container: HTMLElement);
```

| Parameter   | Type       | Description                       |
|-------------|------------|-----------------------------------|
| `container` | `HTMLElement` | The container to trap focus within. |

---

### **Methods**

#### **`activate()`**

Activates focus trapping. Automatically moves focus to the first focusable element in the container.

#### **`deactivate()`**

Deactivates focus trapping. Restores normal keyboard navigation.

#### **`setCustomSelectors(customSelectors: string[], replace: boolean = false)`**

Adds or replaces focusable element selectors.

| Parameter         | Type      | Default | Description                                                             |
|-------------------|-----------|---------|-------------------------------------------------------------------------|
| `customSelectors` | `string[]`| None    | An array of CSS selectors for custom focusable elements.                |
| `replace`         | `boolean` | `false` | If `true`, replaces default selectors; otherwise, adds to them.         |

---

## 📜 Default Selectors

The library uses the following default selectors for focusable elements:

```css
[
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
]
```

These selectors can be customized with `setCustomSelectors`.

---

## 🧪 Tests

Focusse is fully tested with Jest. To run the tests:

```bash
npm test
```

### Key Scenarios Covered:
- Trapping focus within the container.
- Circular navigation with `Tab` and `Shift+Tab`.
- Handling empty containers or no focusable elements.
- Adding and replacing custom focusable selectors.

---

## 📜 License

**MIT**

---

**Focusse**: Manage focus seamlessly in modals and components. 🚀
