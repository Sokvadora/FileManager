Ext.define('MeExtApp.view.fileTree.FileTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FileTreeController',

    deleteButtonClick: function (button) {
        let panel = button.up('treepanel');
        let target = panel.selModel.getSelection()[0] || panel.getRootNode();
        let fileId = target.id;

        Ext.Ajax.request({
            url: 'file/deleteNode',
            params: {id: fileId},
            success: function () {
                let store = panel.getStore();
                store.reload();
            },
            failure: function () {
                console.log('Error');
            }
        });

    },

    addButtonClick: function (button) {
        let panel = button.up('treepanel');
        let inputTextField = panel.down('#new-name');
        let target = panel.selModel.getSelection()[0] || panel.getRootNode();
        let nameNode = inputTextField.getValue();

        //     let reg =/^([\s \-a-zа-яё\_+\d]+|\d+)$/i;
        // || reg.test(nameNode.trim()) === false

        if (nameNode.trim() == '') {
            return;
        }

        let node = {
            mtype: '',
            leaf: '',
            parentId: '',
            infoNode: '',
            fileType: '',
            href: '',
            glyph: '',
            name: nameNode.trim(),
            size: '',
            shortName: nameNode.trim().substr(0, 14)
        };


        if (nameNode) {

            //if (!panel.getRootNode().findChild('name', nameNode)) {
            if (!target.findChild('name', nameNode)) {
                this.createNode(target, node, nameNode, panel);
            } else {
                Ext.Msg.alert('Error', 'A node with this name already exists.');
                return;
            }


            console.log(target.findChild('name', nameNode))

            let obj = Ext.JSON.encode(node);

            Ext.Ajax.request({
                url: 'file',
                method: 'POST',
                jsonData: obj,
                success: function () {
                    let store = panel.getStore();
                    console.log('ok')
                    inputTextField.reset();
                    store.reload();
                },
                failure: function () {
                    console.log('Error');
                }
            });

        }
    },

    createNode: function (target, node, nameNode, panel) {

        let selectedType = panel.down('#fileTypeCombo').value;

        target.isRoot() ? node.parentId = null : node.parentId = target.data.id;

        if (selectedType === 'Folder') {
            node.mtype = 'Folder';
            node.fileType = 'folder';
            node.href = '';
            node.glyph = '';
            node.leaf = false;
            node.infoNode = `You can't change this file`;
        } else if (selectedType === 'File') {
            node.leaf = true;
            node.mtype = 'File';
            node.infoNode = 'New file';
            node.fileType = 'file';
            node.href = '';
            node.glyph = '';
            node.size = Math.floor((Math.random() * 100) + 1) + 'MB';
        } else if (selectedType === 'Link') {
            node.leaf = true;
            node.mtype = 'Href';
            node.fileType = 'link';
            node.infoNode = `You can't change this file`;
            node.href = nameNode;
            node.glyph = 'glyphicon-globe';
        }
    },


    selectionchange: function (selModel, selection) {
        let panel = selModel.view.up('');
        panel.onSelectionChange.apply(panel, arguments);


    },

    panelOnKeyEnter: function () {
        let panel = this.view.up('');
        panel.down('#new-name').focus();
    },

    bbarKeydown:
        function (inputField, event) {
            let panel = inputField.up('treepanel');
            let button = panel.down('#add-button');
            if (event.keyCode === Ext.EventObject.ENTER) {
                if (!panel.down('#add-button').isDisabled()) {
                    this.addButtonClick(button)
                }
            } else if (event.keyCode === Ext.EventObject.TAB && event.shiftKey) {
                event.stopEvent();
                panel.view.focusRow(panel.selModel.getSelection()[0] || 0);
            }
        },


    onExpandAllClick: function () {
        let view = this.getView();
        let toolbar = view.lookup('tbar');

        view.getEl().mask('Expanding tree...');
        toolbar.disable();
        view.expandAll(function () {
            view.getEl().unmask();
            toolbar.enable();
        });
    },

    onCollapseAllClick: function () {
        let view = this.getView();
        let toolbar = view.lookup('tbar');

        toolbar.disable();
        view.collapseAll(function () {
            toolbar.enable();
        });
    },


    onSelectionChange: function (selModel, selection) {
        let panel = selModel.view.up('');
        let buttonAdd = panel.down('#add-button');
        let fileInfoEditForm = Ext.ComponentQuery.query("#fileEditForm")[0];
        let fileInfoName = fileInfoEditForm.down('#infoName');
        let fileInfoAuthor = fileInfoEditForm.down('#infoAuthor');
        let fileInfoTextarea = fileInfoEditForm.down('#infoTextarea');
        let selectedNode;

        let updateButton = fileInfoEditForm.down('#update-btn');

        updateButton.enable()
        buttonAdd.enable()

        if (selection.length) {
            selectedNode = selection[0];

            fileInfoName.setValue(selectedNode.data.name)
            fileInfoAuthor.setValue(selectedNode.data.author)
            fileInfoTextarea.setValue(selectedNode.data.info)

            this.selectedType(fileInfoEditForm, selectedNode, buttonAdd, fileInfoName,fileInfoTextarea )

        }
    },


    selectedType: function (fileInfoEditForm, selectedNode, buttonAdd, fileInfoName, fileInfoTextarea) {

        let fileInfoAuthor = fileInfoEditForm.down('#infoAuthor');
        let buttonUpdate = fileInfoEditForm.down('#update-btn');

        if (selectedNode.data.fileType === 'file') {
            buttonAdd.disable()
            fileInfoTextarea.enable()

        } else if (selectedNode.data.fileType === 'link') {
            buttonAdd.disable()
            fileInfoTextarea.disable()

        } else if (selectedNode.data.fileType === 'folder') {
            buttonAdd.enable()
            fileInfoTextarea.disable()
            //fileInfoEditForm.down('#update-btn').disable()
            fileInfoName.enable()
            fileInfoAuthor.enable()

        } else if (selectedNode.data.root === true) {

            buttonAdd.enable()
            fileInfoTextarea.disable()
            fileInfoName.disable()
            fileInfoAuthor.disable()
            buttonUpdate.disable()
        }
    },

    changeParentId: function (node, data, overModel, dropPosition) {

        let currentParentId;
        let newParams = new Object();
        let currentFileId = data.records[0].data.id;
        let isRoot = data.records[0].parentNode.data.root;

        console.log(data.records[0])

        if (isRoot === false) {
            currentParentId = data.records[0].data.parentId;
            newParams = {parentId: currentParentId};
        }

        let droppedFileDTO = Ext.JSON.encode(newParams);

        console.log('id:', currentFileId, 'parent:', currentParentId)

        Ext.Ajax.request({
            url: 'file/droppedNode',
            method: 'POST',
            params: {id: currentFileId},
            jsonData: droppedFileDTO,
            success: function (resp) {
                let store = Ext.getStore('fileStore')
                store.reload();
                // console.log(resp)
            },
            failure: function (resp) {
                console.log(resp.responseText);
            }
        });

    },

})