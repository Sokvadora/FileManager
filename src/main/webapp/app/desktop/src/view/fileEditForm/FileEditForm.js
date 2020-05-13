Ext.define('MeExtApp.view.fileEditForm.FileEditForm', {
    requires: ['MeExtApp.view.fileEditForm.FileEditFormController'],
    extend: 'Ext.form.Panel',
    xtype: 'fileEditForm',
    controller: 'FileEditFormController',
    frame: true,
    bodyPadding: 5,
    scrollable: true,
    width: 458,
    height: 400,

    fieldDefaults: {
        labelAlign: "right",
        labelWidth: 115,
        msgTarget: 'side'
    },

    items: [{
        xtype: 'fieldset',
        itemId: 'fileInfo',
        title: 'File Info',
        bind: {
            title: '{fileTree.selection.name}',
        },
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },

        items: [
            {
                xtype: 'textarea',
                itemId: 'infoTextarea',
                fieldLabel: 'Info',
                name: 'info',
                emptyText: 'Select the file to view the information',
                bind: {
                    emptyText: '{fileTree.selection.info}',
                },
                width: 50,
                height: 170,
            },
            {
                allowBlank: false, fieldLabel: 'Name', name: 'name', emptyText: 'name file', bind: {
                    emptyText: '{fileTree.selection.name}',
                }
            },
            {
                fieldLabel: 'Author', name: 'author', emptyText: 'name author',
                bind: {
                    emptyText: '{fileTree.selection.author}',
                }
            },

        ]
    },],

    buttons: [{
        text: 'Update',
        disabled: true,
        formBind: true,
        handler: 'updateNode'
    }]
});