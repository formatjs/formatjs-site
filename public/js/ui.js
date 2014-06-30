YUI({
    gallery: 'gallery-2013.05.15-21-12'
}).use('node-base', 'gallery-affix', 'gallery-scrollspy', function (Y) {
    var sidebar  = Y.one('.sidebar');

    // Create Affix (Fixes the sidebar as you scroll)
    // Doing an if check here because we don't include a sidebar if there are
    // no section headings.
    if (sidebar) {
        sidebar.plug(Y.Plugin.Affix, {
            offset: {
                top: 45
            }
        });

        // Plugin Scrollspy (Updates the sidebar with the current section heading)
        Y.one('body').plug(Y.Plugin.ScrollSpy, {
            target: sidebar,
            activeClass: 'is-sidebar-list-item-active'
        });
    }
});