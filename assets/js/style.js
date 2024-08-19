document.querySelector('#switch_theme_style').addEventListener('click', event => {
    let theme_style = document.querySelector('body[data-theme-style]').getAttribute('data-theme-style');
    let new_theme_style = theme_style == 'light' ? 'dark' : 'light';

    /* Set a cookie with the new theme style */
    set_cookie('theme_style', new_theme_style, 30, "#\/");

 

    /* Refresh the logo/title */
    document.querySelectorAll('[data-logo]').forEach(element => {
        let new_brand_value = element.getAttribute(`data-${new_theme_style}-value`);
        let new_brand_class = element.getAttribute(`data-${new_theme_style}-class`);
        let new_brand_tag = element.getAttribute(`data-${new_theme_style}-tag`)
        let new_brand_html = new_brand_tag == 'img' ? `<img src="${new_brand_value}" class="${new_brand_class}" alt="Website Logo" />` : `<${new_brand_tag} class="${new_brand_class}">${new_brand_value}</${new_brand_tag}>`;
        element.innerHTML = new_brand_html;
    });


    document.querySelector(`#switch_theme_style`).setAttribute('data-original-title', document.querySelector(`#switch_theme_style`).getAttribute(`data-title-theme-style-${theme_style}`));
    document.querySelector(`#switch_theme_style [data-theme-style="${new_theme_style}"]`).classList.remove('d-none');
    document.querySelector(`#switch_theme_style [data-theme-style="${theme_style}"]`).classList.add('d-none');
    $(`#switch_theme_style`).tooltip('hide').tooltip('show');

    event.preventDefault();
});