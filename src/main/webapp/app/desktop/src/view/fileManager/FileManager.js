Ext.define('MeExtApp.view.fileManager.FileManager', {
    extend: 'Ext.panel.Panel',
    xtype: 'filemanager',
    title: 'File manager',
    frame: true,
    width: '60%',
    layout: 'column',
    items: [
        {xtype: 'fileTree'},
        {
            xtype: 'container',
            layout: 'column',
            width: 400,
            height: 600,
            items: [{
                xtype: 'panel',
                layout: 'column',
                width: 500,
                height: 500,
                items: [
                    {xtype: 'fileEditForm'},
                ]
            },
                {
                    xtype: 'panel',
                    width: 450,
                    height: 300,
                    bind: {
                        html: '<table style="width:100%">\n' +
                            '  <tr>\n' +
                            '    <th> Name</th>\n' +
                            '    <th>Type</th>\n' +
                            '    <th>Date</th>\n' +
                            '    <th>Size</th>\n' +
                            '    <th>Author</th>\n' +
                            '  </tr>\n' +
                            '  <tr style="background-color: #dddddd">\n' +
                            '    <td>{fileTree.selection.name}</td>\n' +
                            '    <td>{fileTree.selection.fileType}</td>\n' +
                            '    <td>{fileTree.selection.fdate}</td>\n' +
                            '    <td>{fileTree.selection.size}</td>\n' +
                            '    <td>{fileTree.selection.author}</td>\n' +
                            '  </tr>\n' +
                            '   \n' +
                            '</table>',
                    }
                }
            ]
        }]
});
