// Styles
import "./styles.scss";

// Components
import "~c/header";
import "~c/button";
import "~c/cards-list";
import { CardsList } from "~c/cards-list";
import { Header } from "~c/header";
import { Button } from "~c/button";
import { CardPayload } from "~c/card";

const baseUrl = "https://raw.githubusercontent.com/HippocampusTeam/WebsiteContent/master";

const nameHeader = document.querySelector(".name-header") as Header;
const bioText = document.querySelector(".bio-text") as HTMLElement;
const projectsCardsList = document.querySelector(".projects-cards-list") as CardsList;
const educationCardsList = document.querySelector(".education-cards-list") as CardsList;
const contactTelegramButton = document.querySelector(".contact-telegram-button") as Button;
const contactTelegramText = document.querySelector(".contact-telegram-text") as HTMLElement;
const contactEmailButton = document.querySelector(".contact-email-button") as Button;
const contactEmailText = document.querySelector(".contact-email-text") as HTMLElement;

const urlRegex : RegExpMatchArray | null = window.location.search.match(/\?p=(.+)/);
if (urlRegex) {
    const urlName = urlRegex ? urlRegex[1] : "";
    if (urlName.length > 0)
        fetchContent(urlName);
}

function fetchContent(urlName : string) {
    fetch(`${baseUrl}/${urlName}/person.json`)
        .then((response) => response.json())
        .then((data : PersonData) => {
            nameHeader.text = data.name;
            bioText.textContent = data.bio;
            contactTelegramButton.link = `tg://resolve?domain=${data.contacts.telegram}`;
            contactTelegramText.textContent = `@${data.contacts.telegram}`;
            contactEmailButton.link = `mailto:${data.contacts.email}`;
            contactEmailText.textContent = `${data.contacts.email}`;
        });

    fetch(`${baseUrl}/${urlName}/projects.json`)
        .then((response) => response.json())
        .then((data : ProjectsData) => {
            projectsCardsList.cards = data.cards;
        });

    fetch(`${baseUrl}/${urlName}/education.json`)
        .then((response) => response.json())
        .then((data : EducationData) => {
            educationCardsList.cards = data.cards;
        });
}

interface PersonData {
    name: string;
    bio: string;
    contacts: {
        telegram: string,
        email: string
    }
}

interface ProjectsData {
    cards: CardPayload[]
}

interface EducationData {
    cards: CardPayload[]
}