var autolinker = new Autolinker( {
    urls : {
        schemeMatches : true,
        wwwMatches    : true,
        tldMatches    : true
    },
    email       : false,
    phone       : false,
    mention     : false,
    hashtag     : false,

    stripPrefix : true,
    stripTrailingSlash : true,
    newWindow   : false,

    truncate : {
        length   : 0,
        location : 'end'
    },

    className : ''
} );

var description = document.getElementsByClassName('description-linker')[0];
var sections = document.getElementsByTagName('section');

description.innerHTML = Autolinker.link(description.innerHTML);

console.log(sections);

for (const section of sections) {
    section.innerHTML = Autolinker.link(section.innerHTML);
}