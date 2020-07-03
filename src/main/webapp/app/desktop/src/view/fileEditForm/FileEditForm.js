Ext.define('MeExtApp.view.fileEditForm.FileEditForm', {
    requires: ['MeExtApp.view.fileEditForm.FileEditFormController'],
    extend: 'Ext.form.Panel',
    xtype: 'fileEditForm',
    reference: 'fileEditForm',
    itemId: 'fileEditForm',
    controller: 'FileEditFormController',
    frame: true,
    bodyPadding: 5,
    scrollable: true,
    width: 458,
    height: 385,

    viewModel: {
        type: 'fileeditformviewmodel'
    },


    fieldDefaults: {
        labelAlign: "right",
        labelWidth: 50,
        msgTarget: 'side',
    },

    items: [{
        xtype: 'fieldset',
        itemId: 'fileInfo',
        title: 'File Info',
        bind: {
            title: '{selectedItem.shortName}',
        },
        defaultType: 'textfield',
        defaults: {
            anchor: '100%',
        },

        items: [
            {
                xtype: 'textarea',
                itemId: 'infoTextarea',
                fieldLabel: 'Info',
                name: 'info',
                emptyText: 'Select the file to view the information',
                maxLength: 500,
                disabled: true,
                bind: {
                    emptyText: '{selectedItem.info}',
                    value: '{selectedItem.info}'
                },
                width: 50,
                height: 170,
            },
            {
                allowBlank: false,
                itemId: 'infoName',
                fieldLabel: 'Name',
                name: 'name',
                emptyText: 'name file',
                disabled: true,
                //maskRe: /[^\s*$]/,
                regex: /^([\s \-a-zа-яё\_\/\\\-\.\:\&\?\=\#\+\%\@+\d]+|\d+)$/i,
                invalidText: 'Not a valid text.  Can only contain letters, numbers and the  valid link.',
                bind: {
                    emptyText: '{doc.name}',
                }
            },
            {
                fieldLabel: 'Author',
                itemId: 'infoAuthor',
                name: 'author',
                disabled: true,
                regex: /^([\s \-a-zа-яё\_+\d]+|\d+)$/i,
                invalidText: 'Not a valid text.  Can only contain letters, numbers and the symbol "_".',
                emptyText: 'name author',
                bind: {
                    emptyText: '{selectedItem.author}',
                }
            },

        ]
    },

    ],

    buttons: [{
        text: 'Update',
        itemId: 'update-btn',
        disabled: true,
        formBind: true,
        handler: 'updateNode'
    }],

});