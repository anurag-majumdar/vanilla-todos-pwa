import { paragraphTemplate } from "../common/text.template";

export const aboutTemplate = (model) => {
    const paragraphsHTML = model.paragraphs
        .reduce((html, todo) => html + paragraphTemplate(todo), '');

    return `
        <section class="page__text-zone">
            <h1>${model.title}</h1>
            ${paragraphsHTML}
        </section>
    `;
}