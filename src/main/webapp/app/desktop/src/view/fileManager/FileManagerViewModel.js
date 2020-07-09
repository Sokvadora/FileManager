Ext.define('MeExtApp.view.main.FileManagerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.filemanagerviewmodel',

    data: {
        documentSelected: {},
    },


    formulas: {
        editDate: {
            bind: {
                bindTo: '{documentSelected}'
            },
            get: function (documentSelected) {
                return Ext.Date.format(Ext.Date.parse(documentSelected.editedAt, 'Y-m-dTH:i:s.u'), 'd.m.y в H:i:s')
            }
        },
        createDate: {
            bind: {
                bindTo: '{documentSelected}'
            },
            get: function (documentSelected) {
                return Ext.Date.format(Ext.Date.parse(documentSelected.createdAt, 'Y-m-dTH:i:s.u'), 'd.m.y в H:i:s')
            }
        }
    }
});

