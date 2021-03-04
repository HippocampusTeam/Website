import { html, property, customElement } from 'lit-element';
import { CustomElement, LightCustomElement } from "../base";
import styles from "./styles.module.scss";
import "~c/button"

@customElement("c-card")
export class CardElement extends LightCustomElement implements Card {
	@property({type: String}) title : string = "";
	@property({type: String}) text : string = "";
	@property({type: Array}) buttons : CardButton[] = [];

	render() { return html`
		<div class="card-wrapper">
			<h4 class="card-title">${this.title}</h4>
			<p class="card-text">${this.text}</p>
			
			${this.buttons.length == 0 ? html`` : html`
				<div class="card-buttons-wrapper">
					${this.buttons.map(button => html`
						<c-button class="card-button"
								  text="${button.text}"
								  link="${button.link}"></c-button>
					`)}
				</div>
			`}
		</div>`;
	}

	static get styles() {
		return <any>styles;
	}
}

export interface Card extends CustomElement, CardPayload { }

export interface CardPayload {
	title : string;
	text : string;
	buttons : CardButton[];
}

export interface CardButton {
	text : string;
	link : string;
}