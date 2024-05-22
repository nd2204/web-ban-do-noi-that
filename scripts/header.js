const header_template = document.createElement('template');

header_template.innerHTML = `
  <style>
  a {
    text-decoration: none;
  }

  header {
    font-family: "Poppins", sans-serif;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0);
    z-index: 1000;
    overflow: hidden;
  }

  .middle-section {
    display: flex;
    justify-content: space-between;
    min-width: 430px;
    z-index: 1000;
  }

  .middle-section a {
    color: #000000;
    cursor: pointer;
    font-weight: 500;
    font-size: 16;
  }

  .right-section {
    display: flex;
    justify-content: space-between;
    width: 247px;
    flex-shrink: 0;
    position: absolute;
    right: 100px;
    z-index: 1000;
  }

  .right-section button {
    z-index: 1000;
    height: 28px;
    background-color: #00000000;
    border-width: 0;
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    header {
      justify-content: space-between;
    }
    .middle-section {
      margin-left: 100px;
      margin-right: 100px;
    }
    .right-section {
      display: flex;
      position: static;
      margin-right: 100px;
    }
  }
  </style>
  <header>
    <div class="middle-section">
      <a href="/">Home</a>
      <a href="/shop.html">Shop</a>
      <a href="/about.html">About</a>
      <a href="/contact.html">Contact</a>
    </div>
    <div class="right-section">
      <button onclick="alert('button clicked')"><img class="account-alert-icon" src="assets/icons/account_alert.svg"></button>
      <button onclick="alert('button clicked')"><img class="search-icon" src="assets/icons/search.svg"></button>
      <button onclick="alert('button clicked')"><img class="heart-icon" src="assets/icons/heart.svg"></button>
      <button onclick="alert('button clicked')"><img class="shopping-cart-icon" src="assets/icons/shopping_cart.svg"></button>
    </div>
  </header>
`

class Header extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(header_template.content);
  }
}

customElements.define('header-component', Header)
