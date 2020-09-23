$('body').terminal({
    list: function() {
        this.echo('Hello -> jafar' +
                  '. Wellcome to this terminal.');
    },
    cat: function(width, height) {
        const img = $('<img src="https://placekitten.com/' +
                      width + '/' + height + '">');
        this.echo(img);
    }
}, {
    greetings: 'Welcome, I am Ali Asghari '.\n.'use list to see list of commands.'
});
