import { paragraphTemplate } from "../common/text.template";

export const aboutTemplate = (model) => {
    const paragraphsHTML = model.paragraphs
        .reduce((html, todo) => html + paragraphTemplate(todo), '');

    return `
        <section id="about">
            <section class="page__text-zone">
                <h1 class="page__heading">${model.title}</h1>
                <div class="page__body-text">
                    ${paragraphsHTML}
                    <div class="page__pic">
                        <img src="/public/images/me.png"/>
                    </div>
                </div>
                
            </section>
        </section>
    `;
}