import {socialTemplate} from "./social/social.template";

export const contactTemplate = (model) => {
    const socialsHTML = model.socials
        .reduce((html, social) => html + socialTemplate(social), '');

    return `
        <div class="center-content">
            <h1 class="page__heading">${model.title}</h1>
            <div class="grid"> 
                <div class="social-container">
                    ${socialsHTML}
                </div>
             </div>
        </div>
        <hr class="divider">
        <div id="map"></div>
    `;
}