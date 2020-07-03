Ext.define('MeExtApp.view.main.MainView', {
    requires: ['MeExtApp.view.fileEditForm.FileEditForm'],
    extend: 'Ext.Container',
    xtype: 'mainview',

    viewModel: {
        type: 'mainviewmodel'
    },

    layout: 'center',
    items: {xtype: 'filemanager'}
    // items:{
    //     layout: 'hbox',
    //     items: [
    //         {xtype: 'fileTree'},
    //         {xtype: 'fileTree'}
    //     ]
    // }
});

