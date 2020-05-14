Ext.define('MeExtApp.view.fileEditForm.FileEditFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FileEditFormController',

    updateNode: function (btn) {

        let frm = btn.up('form');
        let selectedFileName = Ext.ComponentQuery.query('#fileInfo')[0].title;
        let selectedFileAtr = Ext.StoreMgr.lookup("fileStore").findExact('name', selectedFileName);
        let fileFromStore = Ext.getStore('fileStore').getAt(selectedFileAtr);
        let fileId = fileFromStore.get('id')
        let updateFileDTO = frm.getForm().getValues();

        Ext.Ajax.request({
            url: 'file/updateNode',
            method: 'POST',
            params: {id: fileId},
            jsonData:updateFileDTO,
            success: function (resp) {
                let store = Ext.getStore('fileStore')
                store.reload();
                frm.reset();
                console.log('ok')
            },
            failure: function () {
                console.log('Error');
            }
        });
    }
})