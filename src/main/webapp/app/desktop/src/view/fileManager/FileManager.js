Ext.define('MeExtApp.view.fileManager.FileManager', {
    extend: 'Ext.panel.Panel',
    xtype: 'filemanager',
    title: 'File manager',
    frame: true,
    width: 960,
    // height: 670,
    layout: 'column',
    items: [
        {xtype: 'fileTree'},
        {
            xtype: 'container',
            layout: 'column',
            width: 400,
            height: 400,
            items: [{
                xtype: 'panel',
                layout: 'column',
                width: 457,
                height: 380,
                items: [
                    {xtype: 'fileEditForm'},
                ]
            },
                {
                    xtype: 'panel',
                    width: 457,
                    height: 70,

                    bind: {
                        html: '<table>\n' +
                            '  <tr>\n' +
                            '    <th> Name</th>\n' +
                            '    <th>Type</th>\n' +
                            '    <th>Created</th>\n' +
                            '    <th>Updated</th>\n' +
                            '    <th>Size</th>\n' +
                            '    <th>Author</th>\n' +
                            '  </tr>\n' +
                            '  <tr >\n' +
                            '    <td>{fileTree.selection.shortName}</td>\n' +
                            '    <td>{fileTree.selection.fileType}</td>\n' +
                            '    <td>{fileTree.selection.createdAt}</td>\n' +
                            '    <td>{fileTree.selection.editedAt}</td>\n' +
                            '    <td>{fileTree.selection.size}</td>\n' +
                            '    <td>{fileTree.selection.author}</td>\n' +
                            '  </tr>\n' +
                            '</table>',
                    }
                }
            ]
        }]
});
