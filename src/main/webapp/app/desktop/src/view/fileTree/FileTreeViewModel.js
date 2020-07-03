Ext.define('MeExtApp.view.main.FileTreeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.filetreeviewmodel',

    stores: {
        treeStore: {
            storeId: 'fileStore',
            type: 'tree',
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    typeProperty: 'mtype'
                },
                url: '/file'
            },
            parentIdProperty: 'parentId',
            autoLoad: true,
        }
    },
});
