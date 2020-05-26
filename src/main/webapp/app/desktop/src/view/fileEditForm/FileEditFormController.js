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
        let panel = Ext.ComponentQuery.query('treepanel')[0];
        let target = panel.selModel.getSelection()[0] || panel.getRootNode();


        if (target.parentNode.findChild('name', updateFileDTO.name.trim())) {
            Ext.Msg.alert('Error', 'A node with this name already exists.');
            return;
        }


        if (fileFromStore.get('fileType') === 'link') {
            updateFileDTO.href = updateFileDTO.name
        }


        if (updateFileDTO.name.trim() !== '') {
            console.log(frm.getForm().getValues())
            updateFileDTO.shortName = updateFileDTO.name.substr(0, 14)
            updateFileDTO.name = updateFileDTO.name.trim();
            updateFileDTO.author = updateFileDTO.author.trim();

            Ext.Ajax.request({
                url: 'file/updateNode',
                method: 'POST',
                params: {id: fileId},
                jsonData: updateFileDTO,
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


    }
})