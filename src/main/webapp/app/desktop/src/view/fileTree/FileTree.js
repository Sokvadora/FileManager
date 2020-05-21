Ext.define('MeExtApp.view.fileTree.FileTree', {
    extend: 'Ext.tree.Panel',
    requires: ['MeExtApp.view.fileTree.FileTreeController'],
    xtype: 'fileTree',
    bind: {
        store: '{treeStore}',
    },
    reference: 'fileTree',
    controller: 'FileTreeController',
    rootVisible: true,
    width: 500,
    height: 450,
    reserveScrollbar: true,


    viewConfig: {
        markDirty: false,
        id: 'configDataPanelsView',
        plugins:
            {
                ptype: 'treeviewdragdrop',
                containerScroll: true,

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
        maskRe: /[^\s*$]/,
        allowBlank: false,
        listeners: {
            keydown: 'bbarKeydown'
        }
    },
        {
            xtype: 'combobox',
            itemId: 'fileTypeCombo',
            reference: 'fileType',
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
            id: 'deleteButton',
            text: 'Delete',
            bind: {
                text: 'Delete {fileTree.selection.name}',
            },
            handler: 'deleteButtonClick'
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
        // load: function (aa) {
        //     console.log(this.lookupViewModel())
        //
        // }
    }
});
