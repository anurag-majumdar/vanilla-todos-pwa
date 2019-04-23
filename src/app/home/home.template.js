import logoTemplate from "../common/logo.template";

export const homeTemplate = (model) => {
    const logo = logoTemplate('bgSVG');
    return `
        <section id="home">
            <section class="page__text-zone">
                <h1>
                    <span>Hi,</span>
                    <br/>
                    <span>I'm Tenorio,</span>
                    <br/>
                    <span>Web Developer.</span>
                </h1>
                <h2>Front End Developer / React Developer / Angular JS </h2>
                <button id="svgTeste">
                    contact me
                </button>
            </section>
            <section class="page__background">
                ${logo}
            </section>
        </section>
    `;
}