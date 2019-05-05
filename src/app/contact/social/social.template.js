export const socialTemplate = ({url, icon, title}) => {

    return `
        <a class="social-link" href="${url}" style="text-decoration: none;" target="_blank">
            <div class="social-circle">
               <i class="social ${icon}"></i>   
            </div>
            <h4>${title}</h4>
        </a>
    `;
}