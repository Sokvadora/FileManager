Ext.define('MeExtApp.view.fileEditForm.FileEditFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FileEditFormController',

    updateNode: function (btn) {

        const selectedItem = this.getViewModel().get('selectedItem')
        const frm = btn.up('form');
        let updateFileDTO = frm.getForm().getValues();
        const panel = Ext.ComponentQuery.query('treepanel')[0];
        const target = panel.selModel.getSelection()[0] || panel.getRootNode();
        const currentNodeName = target.parentNode.findChild('name', updateFileDTO.name.trim());

        if (currentNodeName && currentNodeName.id !== target.id) {
            Ext.Msg.alert('Error', 'A node with this name already exists.');
            return;
        }

        if (selectedItem.fileType === 'link') {
            updateFileDTO.href = updateFileDTO.name
        }

        if (!Ext.isEmpty(updateFileDTO.name.trim())) {
            updateFileDTO.shortName = updateFileDTO.name.substr(0, 14)
            updateFileDTO.name = updateFileDTO.name.trim();
            updateFileDTO.author = updateFileDTO.author.trim();

            Ext.Ajax.request({
                url: 'file/updateNode',
                method: 'POST',
                params: {id: selectedItem.id},
                jsonData: updateFileDTO,
                success: function (resp) {
                    let store = Ext.getStore('fileStore');
                    console.log('ok');
                    store.load({
                        callback: function () {
                            let item = Ext.getStore('fileStore').getNodeById(selectedItem.id);
                            console.log(item);
                            item.parentNode.expand();
                        }
                    })
                },
                failure: function () {
                    console.log('Error');
                }
            });
        }
    },

    init: function (view) {
        view.doInit = this.doInit.bind(this);
    },

    doInit: function (item) {
        this.getViewModel().set('selectedItem', item)
    }

});