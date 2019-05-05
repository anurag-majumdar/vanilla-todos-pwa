import { skillTemplate } from "./skill/skill.template";

export const skillsTemplate = (model) => {
    const skillsHTML = model.skills
        .reduce((html, skill) => html + skillTemplate(skill), '');

    return `
        <section id="skills">
            <section class="page__text-zone">
                <h1 class="page__heading">${model.title}</h1>
                <div class="skill-container">
                    ${skillsHTML}
                </div>
            </section>
        </section>
    `;
}