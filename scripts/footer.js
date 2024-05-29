const footer_template = document.createElement('template');

footer_template.innerHTML = `
  <style>
    a { text-decoration: none; }
    footer hr { margin: 35px 0px; }
    a:hover {
      opacity: 0.5;
    }

    footer {
      overflow: hidden;
      padding: 98px 100px 38px;
    }


    .copyright-text {
      font-size: 1rem;
    }

    .section p {
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

    .section {
      display: flex;
      flex-direction: column;
      justify-content: left;
      row-gap: 46px;
      min-height: 312px;
    }

    .section a {
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

    .newsletter-section form {
      width: 300px;
      margin-right: 100px;
    }

    input[type="text"] {
      width: 200px;
      border-style: none;
      border-bottom: 0.1rem solid black;
      padding-bottom: 4px;
      vertical-align: top;
    }

    input[type="text"]::placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: #9F9F9F;
    }

    input[type="text"]:focus {
      outline: none;
    }

    button[type="submit"] {
      font-size: 0.875rem;
      font-weight: 600;
      border-style: none;
      border-bottom: 0.1rem solid black;
      background-color: #00000000;
      padding: 0;
      cursor: pointer;
      margin-left: 10px;
      padding-bottom: 4px;
      vertical-align: top;
    }
    </style>
  <footer>
    <div class="footer-sections-ctn">
      <div class="section address-section">
        <p>400 University Drive Suite 200 Coral Gables,<br>FL 33134 USA</p>
      </div> 
      <div class="section links-section">
        <p>Links</p>
        <a href="./">Home</a>
        <a href="./shop.html">Shop</a>
        <a href="./about.html">About</a>
        <a href="./contact.html">Contact</a>
      </div> 
      <div class="section help-section">
        <p>Help</p>
        <a href="#">Payment Options</a>
        <a href="#">Returns</a>
        <a href="#">Privacy Policies</a>
      </div> 
      <div class="section newsletter-section">
        <p>Newsletter</p>
        <form class="form-subscription">
          <input id="email-input" type="text" name="email" placeholder="Enter Your Email Address">
          <button id="subscribe-btn" type="submit">SUBSCRIBE</button>
          <form>
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
