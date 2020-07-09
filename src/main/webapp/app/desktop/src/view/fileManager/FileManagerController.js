Ext.define('MeExtApp.view.fileManager.FileManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FileManagerController',

    init: function (view) {
        view.doInit = this.doInit.bind(this);
    },

    doInit: function (item) {
        this.getViewModel().set('documentSelected', item);
    }
});