const footer_template = document.createElement('template');

footer_template.innerHTML = `
  <style>
    a {
      text-decoration: none;
    }

    footer {
      padding: 98px 100px 38px;
    }

    footer hr {
      margin: 35px 0px;
    }

    .copyright-text {
      font-size: 1rem;
    }

    .footer-section p {
      font-size: 1rem;
      color: #9F9F9F;
      font-weight: 500;
    }

    .footer-sections-ctn {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      column-gap: 2rem;
      align-items: start;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      justify-content: left;
      row-gap: 46px;
      min-height: 312px;
    }

    .footer-section a {
      font-size: 1rem;
      font-weight: 500;
      color: black;
    }

    .address-section {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #9F9F9F;
      max-width: 285px;
    }

    .address-section p {
      font-size: 1rem;
      font-weight: 300;
    }

    .newsletter-section div {
      width: 300px;
      margin-right: 100px;
    }

    input[type="text"] {
      width: 200px;
      border-style: none;
      border-bottom: 0.15rem solid black;
    }

    input[type="text"]::placeholder {
      font-size: 0.875rem;
    }
    input[type="text"]:focus {
      outline: none;
    }

    .subscribe-btn {
      font-size: 0.875rem;
      font-weight: 500;
      height: 24px;
      border-style: none;
      border-bottom: 0.15rem solid black;
      background-color: #00000000;
      padding: 0;
      cursor: pointer;
      margin-left: 10px;
      padding-bottom: 2px;
    }
  </style>
  <footer>
    <div class="footer-sections-ctn">
      <div class="footer-section address-section">
        <p>400 University Drive Suite 200 Coral Gables,<br>FL 33134 USA</p>
      </div> 
      <div class="footer-section links-section">
        <p>Links</p>
        <a href="./index.html">Home</a>
        <a href="./shop.html">Shop</a>
        <a href="./about.html">About</a>
        <a href="./contact.html">Contact</a>
      </div> 
      <div class="footer-section help-section">
        <p>Help</p>
        <a href="#">Payment Options</a>
        <a href="#">Returns</a>
        <a href="#">Privacy Policies</a>
      </div> 
      <div class="footer-section newsletter-section">
        <p>Newsletter</p>
        <div>
          <input id="email-input" type="text" name="email" placeholder="Enter Your Email Address">
          <button class="subscribe-btn">SUBSCRIBE</button>
        </div>
      </div> 
    </div>
    <hr>
    <p class="copyright-text">2022 Meubel House. All rights reverved</p>
  </footer>
`;

class Footer extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(footer_template.content);
  }
}

customElements.define('footer-component', Footer)
