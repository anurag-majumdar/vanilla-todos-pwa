import { projectTemplate } from "./project/project.template";

export const workTemplate = (model) => {
    const projectsHTML = model.projects
        .reduce((html, project) => html + projectTemplate(project), '');

    return `
        <section id="work">
            <section class="page__text-zone">
                <h1 class="page__heading">${model.title}</h1>
                ${projectsHTML}
            </section>
        </section>
    `;
}