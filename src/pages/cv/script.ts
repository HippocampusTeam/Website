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

const namedArt = document.querySelector(".hello-section .art") as HTMLElement;
const nameHeader = document.querySelector(".name-header") as Header;
const bioText = document.querySelector(".bio-text") as HTMLElement;
const projectsCardsList = document.querySelector(".projects-cards-list") as CardsList;
const educationCardsList = document.querySelector(".education-cards-list") as CardsList;
const contactTelegramButton = document.querySelector(".contact-telegram-button") as Button;
const contactTelegramText = document.querySelector(".contact-telegram-text") as HTMLElement;
const contactEmailButton = document.querySelector(".contact-email-button") as Button;
const contactEmailText = document.querySelector(".contact-email-text") as HTMLElement;
const contactGithubButton = document.querySelector(".contact-github-button") as Button;

const urlRegex : RegExpMatchArray | null = window.location.search.match(/\?p=(.+)/);
if (urlRegex) {
    const urlName = urlRegex ? urlRegex[1] : "";
    if (urlName.length > 0) {
        namedArt.classList.add(`art-${urlName}`);
        fetchContent(urlName);
    }
    else showWrongBanner();
} else showWrongBanner();

document.querySelector(".move-hello-button")!.addEventListener("click", () => {
    const scroller = document.querySelector("html") as HTMLElement;
    scroller.scrollTo({ left: 0, top: window.innerHeight - 120, behavior: 'smooth' });
});

// const parallaxElements = [...document.querySelectorAll('.parallax--effect')] as HTMLElement[];
// window.addEventListener('mousemove', function(e) {
//     const x = e.clientX / window.innerWidth - 0.5;
//     const y = e.clientY / window.innerHeight - 0.5;
//
//     for (const item of parallaxElements)
//         item.style.transform = getParallaxTranslate(x, y, +(item.dataset.pm as string))
// });

function fetchContent(urlName : string) : void {
    fetch(`${baseUrl}/${urlName}/person.json`)
        .then((response) => response.json())
        .then((data : PersonData) => {
            nameHeader.text = data.name;
            bioText.textContent = data.bio;
            contactTelegramButton.link = `tg://resolve?domain=${data.contacts.telegram}`;
            contactTelegramText.textContent = `@${data.contacts.telegram}`;
            contactEmailButton.link = `mailto:${data.contacts.email}`;
            contactEmailText.textContent = `${data.contacts.email}`;
            contactGithubButton.link = `https://github.com/${data.contacts.github}`;
        }).catch(() => {
            showWrongBanner()
    });

    fetch(`${baseUrl}/${urlName}/projects.json`)
        .then((response) => response.json())
        .then((data : ProjectsData) => {
            projectsCardsList.cards = data.cards;
        }).catch(() => {
        showWrongBanner()
    });

    fetch(`${baseUrl}/${urlName}/education.json`)
        .then((response) => response.json())
        .then((data : EducationData) => {
            educationCardsList.cards = data.cards;
        }).catch(() => {
        showWrongBanner()
    });
}

function showWrongBanner() : void {
    document.querySelector(".wrong-name-banner")!.classList.add("shown")
}

function getParallaxTranslate(x : number, y : number, m : number) : string {
    return `translate(${x * m}px, ${y * m}px)`
}

interface PersonData {
    name: string;
    bio: string;
    contacts: {
        telegram: string;
        email: string;
        github: string
    }
}

interface ProjectsData {
    cards: CardPayload[]
}

interface EducationData {
    cards: CardPayload[]
}