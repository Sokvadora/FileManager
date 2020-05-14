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
        let currentDate = new Date();

        let node = {
            mtype: '',
            leaf: '',
            fdate: '',
            parentId: '',
            infoNode: '',
            fileType: '',
            href: '',
            glyph: '',
            name: nameNode,
            groupId: '',
        };

        Ext.Date.patterns = {
            ShortDate: "d.m.Y"
        };

        node.fdate = Ext.Date.format(currentDate, Ext.Date.patterns.ShortDate);

        if (nameNode) {

            if (!panel.getRootNode().findChild('name', nameNode)) {
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
                success: function () {
                    let store = panel.getStore();
                    store.reload();
                    console.log('ok')
                    inputTextField.reset();
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
        } else if (selectedType === 'Link') {
            node.leaf = true;
            node.mtype = 'Href';
            node.fileType = 'link';
            node.infoNode = `You can't change this file`;
            node.href = nameNode;
            node.glyph = 'glyphicon-globe';
        }
    },


    //
    // selectionchange: function (selModel, selection) {
    //     let panel = selModel.view.up('');
    //     panel.onSelectionChange.apply(panel, arguments);
    // },

    panelOnKeyEnter: function () {
        let panel = this.view.up('');
        panel.down('#new-name').focus();
    },

    bbarKeydown: function (inputField, e) {
        let panel = inputField.up('treepanel');
        if (e.keyCode === Ext.EventObject.ENTER) {
            if (!panel.down('#add-button').isDisabled()) {
                panel.addClick();
            }
        } else if (e.keyCode === Ext.EventObject.TAB && e.shiftKey) {
            e.stopEvent();
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

})