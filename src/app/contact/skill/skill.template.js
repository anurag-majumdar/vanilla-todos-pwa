export const skillTemplate = (model) => {

    return `
        <div class="skill">
          <div class="skill__media">
            <span data-progress="${model.progress}" class="skill__progress"></span>
            <i class="${model.icon} skill__icon"></i>
          </div>
          <div class="skill__text">
            <span class="title subheading">${model.title}</span>
            <br/>
            ${model.text}
          </div>
        </div>
    `;
}