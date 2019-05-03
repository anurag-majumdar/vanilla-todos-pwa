export const projectTemplate = (model) => {

    return `
        <div class="project">
          <div class="project__media">
          <div class="project__image">
            <img src="${model.image}" alt="" class="project__image" />
          </div>
          </div>
          <div class="project__text">
            <span class="title subheading">${model.title}</span>
            <br/>
            ${model.text}
          </div>
        </div>
    `;
}