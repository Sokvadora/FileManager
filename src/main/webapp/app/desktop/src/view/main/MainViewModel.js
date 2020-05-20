Ext.define('MeExtApp.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewmodel',

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
            //autoSync: true,
            root: {
                id: 0,
                expanded: false
            }
        }
    }
});
