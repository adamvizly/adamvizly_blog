figlet.defaults({fontPath: 'https://unpkg.com/figlet@1.4.0/fonts/'});
figlet.preloadFonts(["Standard", "Slant"], ready);

var term;

function ready() {
    term = $('body').terminal(function(cmd) {
        // echo function will run it in each render,
        // so text can be resized based on cols
        this.echo(() => render(cmd));
    }, {
        greetings: function() {
            return render('Welcome', 'Slant') +
                `\n[[;rgba(255,255,255,0.99);] I am Ali Asghari].\n`;
        }
    });
}

function render(text, font) {
    return figlet.textSync(text, {
        font: font || 'Standard',
        width: !term ? 80 : term.cols(),
        whitespaceBreak: true
    });
}
