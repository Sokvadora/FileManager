Ext.define('MeExtApp.view.fileTree.FileTree', {
    extend: 'Ext.tree.Panel',
    requires: ['MeExtApp.view.fileTree.FileTreeController'],
    xtype: 'fileTree',

    viewModel: {
        type: 'filetreeviewmodel'
    },
    bind: {
        store: '{treeStore}',
    },
    reference: 'fileTree',
    controller: 'FileTreeController',
    rootVisible: true,
    width: 500,
    height: 450,
    reserveScrollbar: true,

    twoWayBindable: {
        document: true
    },

    config: {
        document: {}
    },

    viewConfig: {
        markDirty: false,
        plugins: {
            treeviewdragdrop: {
                containerScroll: true
            }
        }
    },

    columns: [{
        xtype: 'treecolumn',
        text: 'Name',
        dataIndex: 'name',
        width: 200,
        sortable: true,
    }, {
        text: 'Type',
        width: 90,
        sortable: true,
        dataIndex: 'fileType',
    },
        {
            text: 'Last update',
            dataIndex: 'editedAt',
            renderer: function(value) {
                return value ? Ext.Date.format(Ext.Date.parse(value, 'Y-m-dTH:i:s.u'), 'd.m.y в H:i:s'): value;
            },
            width: 130,
        },
        {
            text: 'Size',
            dataIndex: 'size',
            width: 80,
        }
    ],

    selModel: {
        allowDeselect: true,
        onKeyEnter: 'panelOnKeyEnter',
        listeners: {
            selectionchange: 'onSelectionChange',
        },
    },

    bbar: [{
        xtype: 'textfield',
        itemId: 'new-name',
        name: 'nameNode',
        enableKeyEvents: true,
        width: 100,
        regex: /^([\s \-a-zа-яё\_\/\\\-\.\:\&\?\=\#\+\%\@+\d]+|\d+)$/i,
        invalidText: 'Not a valid text.  Can only contain letters, numbers and the  valid link.',
        allowBlank: false,
        listeners: {
            keydown: 'bbarKeydown'
        }
    },
        {
            xtype: 'combobox',
            itemId: 'fileTypeCombo',
            reference: 'fileType',
            allowBlank: false,
            displayField: 'name',
            valueField: 'name',
            value: 'Folder',
            queryMode: 'local',
            store: {
                fields: ['name'],
                data: [{
                    "name": "Folder"
                }, {
                    "name": "File"
                }, {
                    "name": "Link"
                }],
            },
            forceSelection: true,
            width: 80,
        },
        {
            itemId: 'add-button',
            text: 'Add Folder',
            bind: {
                text: 'Add  {fileType.selection.name}'
            },
            handler: 'addButtonClick'
        },
        {
            itemId: 'delete-button',
            text: 'Delete',
            bind: {
                text: 'Delete {fileTree.selection.shortName}',
            },
            handler: 'deleteButtonClick',
        }
    ],

    tbar: {
        reference: 'tbar',
        items: [{
            text: 'Expand All',
            handler: 'onExpandAllClick'
        }, {
            text: 'Collapse All',
            handler: 'onCollapseAllClick'
        }]
    },

    listeners: {
        drop: 'changeParentId',

    }
});
