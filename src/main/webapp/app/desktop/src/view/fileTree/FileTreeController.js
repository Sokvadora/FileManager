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
        let nameNode = inputTextField.getValue().trim();

        if (Ext.isEmpty(nameNode)) {
            Ext.Msg.alert('System message', 'Please enter the file name');
            return;
        }

        let node = {
            mtype: '',
            leaf: '',
            parentId: '',
            info: '',
            fileType: '',
            href: '',
            glyph: '',
            name: nameNode,
            size: '',
            shortName: nameNode.substr(0, 14),
        };

        if (nameNode) {

            if (!target.findChild('name', nameNode)) {
                this.createNode(target, node, nameNode, panel);
            } else {
                Ext.Msg.alert('Error', 'A node with this name already exists.');
                return;
            }

            let obj = Ext.JSON.encode(node);

            Ext.Ajax.request({
                url: 'file',
                method: 'POST',
                jsonData: obj,
                success: function (response) {
                    let store = panel.getStore();
                    console.log('ok')
                    inputTextField.reset();
                    store.load({
                        callback: function (store, records) {
                            let newItemId = panel.getViewModel().get('itemId');
                            let itemFromStore = Ext.getStore('fileStore').getNodeById(newItemId);
                            if (itemFromStore) {
                                itemFromStore.expand();
                            }
                        }
                    })
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
            node.info = `You can't change this file`;
        } else if (selectedType === 'File') {
            node.leaf = true;
            node.mtype = 'File';
            node.info = 'New file';
            node.fileType = 'file';
            node.href = '';
            node.glyph = '';
            node.size = Math.floor((Math.random() * 100) + 1) + 'MB';
        } else if (selectedType === 'Link') {
            node.leaf = true;
            node.mtype = 'Href';
            node.fileType = 'link';
            node.info = `You can't change this file`;
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
        const fileInfoEditForm = Ext.ComponentQuery.query("#fileEditForm")[0];
        const fileManagerForm = Ext.ComponentQuery.query("#fileManager")[0];

        if (!Ext.isEmpty(selection)) {
            let item = selection[0].getData();
            fileInfoEditForm.getController().doInit(item);
            fileManagerForm.getController().doInit(item);
            this.doInit(item.id)
        }

        const panel = selModel.view.up('');
        const buttonAdd = panel.down('#add-button');
        buttonAdd.enable();

        if (selection.length) {

            let fileInfoName = fileInfoEditForm.down('#infoName');
            let fileInfoAuthor = fileInfoEditForm.down('#infoAuthor');
            let fileInfoTextarea = fileInfoEditForm.down('#infoTextarea');
            let selectedNode = selection[0];

            fileInfoName.setValue(selectedNode.data.name);
            fileInfoAuthor.setValue(selectedNode.data.author);
            fileInfoTextarea.setValue(selectedNode.data.info);
            this.selectedType(panel, selectedNode)
        } else {
            this.isDisabled(false, true, true, true, true)
        }

    },

    selectedType: function (panel, selectedNode) {

        if (selectedNode.data.fileType === 'file') {
            this.isDisabled(true, false, false, false, false)
        } else if (selectedNode.data.fileType === 'link') {
            this.isDisabled(true, true, false, false, false)
        } else if (selectedNode.data.fileType === 'folder') {
            this.isDisabled(false, true, false, false, false)
        } else {
            this.isDisabled(false, true, true, true, true)
        }
    },

    isDisabled: function (add, info, author, name, update) {
        const panel = this.getView();
        const buttonAdd = panel.down('#add-button');
        const fileInfoEditForm = Ext.ComponentQuery.query("#fileEditForm")[0];
        const buttonUpdate = fileInfoEditForm.down('#update-btn');
        const fileInfoName = fileInfoEditForm.down('#infoName');
        const fileInfoAuthor = fileInfoEditForm.down('#infoAuthor');
        const fileInfoTextarea = fileInfoEditForm.down('#infoTextarea');

        buttonAdd.setDisabled(add);
        fileInfoTextarea.setDisabled(info);
        fileInfoAuthor.setDisabled(author);
        fileInfoName.setDisabled(name);
        buttonUpdate.setDisabled(update);
    },


    changeParentId: function (node, data, overModel, dropPosition) {

        let isRoot = data.records[0].parentNode.data.root;
        let fileToDrop;

        if (!isRoot) {
            fileToDrop = {
                id: data.records[0].data.id,
                parentFile: data.records[0].data.parentId
            }
        } else {
            fileToDrop = {
                id: data.records[0].data.id
            }
        }

        Ext.Ajax.request({
            url: 'file/droppedNode',
            method: 'PUT',
            params: fileToDrop,
            success: function (resp) {
                let store = Ext.getStore('fileStore');
                store.load({
                    callback: function (store, records) {
                        Ext.getStore('fileStore').getNodeById(fileToDrop.id).expand()
                    }
                });
            },
            failure: function (resp) {
                console.log(resp.responseText);
            }
        });
    },


    init: function (view) {
        view.doInit = this.doInit.bind(this);
    },

    doInit: function (itemId) {
        this.getViewModel().set('itemId', itemId)
    }

})