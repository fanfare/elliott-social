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

var linkerElements = document.getElementsByClassName('linker');

console.log(sections);

for (const linkerElement of linkerElements) {
    linkerElement.innerHTML = Autolinker.link(linkerElement.innerHTML);
}