import { html, property, customElement } from 'lit-element';
import { CustomElement, LightCustomElement } from "../base";
import styles from "./styles.module.scss";

@customElement("c-header")
export class HeaderElement extends LightCustomElement implements Header {
	@property({type: String}) text : string = "";
	@property({type: String}) subtext : string = "";
	@property({type: Boolean}) secondary : boolean = false;

	render() { return html`
		<div class="header-wrapper">
			${!this.secondary ? html`
				<h2 class="header-subtext">${this.subtext}</h2>
				<h1 class="header-text">${this.text}</h1>
			` : html`
				<h3 class="header-subtext">${this.subtext}</h3>
				<h2 class="header-text">${this.text}</h2>
			`}
		</div>`;
	}

	static get styles() {
		return <any>styles;
	}
}

export interface Header extends CustomElement {
	text : string;
	subtext: string;
	secondary: boolean;
}