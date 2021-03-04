import { html, property, customElement } from 'lit-element';
import { CustomElement, LightCustomElement } from "../base";
import styles from "./styles.module.scss";

@customElement("c-button")
export class ButtonElement extends LightCustomElement implements Button {
	@property({type: String}) text : string = "";
	@property({type: Boolean}) secondary : boolean = false;
	@property({type: String}) icon : string | undefined = undefined;
	@property({type: String}) link : string | undefined = undefined;

	render() { return html`
		${this.link ? html`
			<a class="button-wrapper ${this.secondary ? `button-secondary` : ``}" href="${this.link}"
			   target="_blank">
				${this.icon ? html`<span class="button-icon material-icons-round">${this.icon}</span>` : html``}
				<span class="button-text">${this.text}</span>
			</a>
		` : html`
			<button class="button-wrapper ${this.secondary ? `button-secondary` : ``}">
				${this.icon ? html`<span class="button-icon material-icons-round">${this.icon}</span>` : html``}
				<span class="button-text">${this.text}</span>
			</button>
		`}`;
	}

	static get styles() {
		return <any>styles;
	}
}

export interface Button extends CustomElement {
	text : string;
	secondary: boolean;
	icon? : string;
	link? : string;
}