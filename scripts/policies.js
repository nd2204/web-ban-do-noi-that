const policies_template = document.createElement('template');

policies_template.innerHTML = `
  <style>
    .section {
      background-color: #FAF4F4;
      max-height: 300px;
    }

    .policies-ctn {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 48px;
      padding: 96px 100px;
    }

    .block {
      display: block
    }

    .policies {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 32px;
      line-height: 48px;
      color: #000000;
    }

    .policies-caption {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
      color: #9F9F9F;
    }
  </style>
  <div class="section">
    <div class="policies-ctn">
      <div>
        <span class="policies block">Free Delivery</span>
        <span class="policies-caption block">For all oders over $50, consectetur adipim scing elit.</span>
      </div>
      <div>
        <span class="policies block">90 Days Return</span>
        <span class="policies-caption block">If goods have problems, consectetur adipim scing elit.</span>
      </div>
      <div>
        <span class="policies block">Free Delivery</span>
        <span class="policies-caption">100% secure payment, consectetur adipim scing elit.</span>
      </div>
    </div>
  </div>
`

class Policies extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(policies_template.content);
  }
}

customElements.define('policies-component', Policies)
