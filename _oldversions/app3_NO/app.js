angular
    .module('myapp', [
        'ngNewRouter',
        'myapp.home',
        'myapp.users'
    ])

    .config(function ($componentLoaderProvider) {
        // change default template location
        //   from : ./components/my-widget/my-widget.html
        //   to:    ./my-widget.tpl.html
        $componentLoaderProvider.setTemplateMapping(function (name) {
            // name is component name
            return name + '.tpl.html';
        });
    });