Ext.define('MeExtApp.view.fileManager.FileManager', {
    extend: 'Ext.panel.Panel',
    xtype: 'filemanager',
    title: 'File manager',
    controller: 'FileManagerController',
    itemId: 'fileManager',

    viewModel: {
        type: 'filemanagerviewmodel'
    },

    frame: true,
    width: 960,
    items: {
        layout: 'hbox',
        items: [
            {
                xtype: 'fileTree',
                flex: 1,
            },
            {
                layout: 'vbox',
                items: [
                    {
                        xtype: 'fileEditForm',
                        flex: 1,

                    },

                    {
                        xtype: 'panel',
                        width: 457,
                        height: 70,
                        bind: {
                            //TODO: use Ext.XTemplate?

                            html: '<table><tr>' +
                                '<th>Name</th>\n' +
                                '<th>Type</th>\n' +
                                '<th>Created</th>\n' +
                                '<th>Updated</th>\n' +
                                '<th>Size</th>\n' +
                                '<th>Author</th>\n' +
                                '</tr> <tr> ' +
                                '<td>{documentSelected.shortName}</td>' +
                                '<td>{documentSelected.fileType}</td>' +
                                '<td> createdAt </td>' +
                                '<td> editedAt </td>' +
                                '<td>{documentSelected.size}</td>' +
                                '<td>{documentSelected.author}</td>' +
                                '</tr></table>',
                        },
                        flex: 2
                    }
                ]
            }

        ]
    }

});
