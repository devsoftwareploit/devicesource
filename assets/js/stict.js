'use strict';

document.querySelector('#search').addEventListener('submit', event => {
    event.preventDefault();
});

let tools = [];

document.querySelectorAll('[data-tool-id]').forEach(element => {
    let category = element.getAttribute('data-tool-category').toLowerCase();

    tools.push({
        id: element.getAttribute('data-tool-id'),
        name: element.getAttribute('data-tool-name').toLowerCase(),
        category,
    })
});




['change', 'paste', 'keyup', 'search'].forEach(event_type => {
    document.querySelector('input[name="search"]').addEventListener(event_type, event => {
        let string = event.currentTarget.value.toLowerCase();

        /* Hide header sections */
        document.querySelectorAll('[data-category]').forEach(element => {
            if(string.length) {
                element.classList.add('d-none');
            } else {
                element.classList.remove('d-none');
            }
        });

        for(let tool of tools) {
            document.querySelector(`[data-tool-id="${tool.id}"][data-aos]`) && document.querySelector(`[data-tool-id="${tool.id}"][data-aos]`).removeAttribute('data-aos');

            if(tool.name.includes(string)) {
                document.querySelector(`[data-tool-id="${tool.id}"]`).classList.remove('d-none');
                document.querySelector(`[data-category="${tool.category}"]`).classList.remove('d-none');
            } else {
                document.querySelector(`[data-tool-id="${tool.id}"]`).classList.add('d-none');
            }
        }
    });
});

setTimeout(function(){

}, 3000);
document.addEventListener('DOMContentLoaded', function() {
  if(/[?&]search=/.test(location.search)) {
    const params = new URLSearchParams(location.search);
    let in_search = document.querySelector('input[name="search"]');
    in_search.value = params.get('search');
    
    in_search.dispatchEvent(new KeyboardEvent('keyup', {'key':'y'}));
  }
}, false);
