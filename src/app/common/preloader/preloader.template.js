import logoTemplate from "../logo.template";

const preloaderTemplate = () => {
    const logo = logoTemplate('preloader-logo');
    return `
    <div style="margin-bottom: 60px; display: flex; flex-direction: column; justify-content: center; align-items: center">
        <div style="width: 80px; height: 100px;">
            ${logo}
        </div>
        <span>Tenório is Coding...</span>
    </div>
`
};

export default preloaderTemplate;