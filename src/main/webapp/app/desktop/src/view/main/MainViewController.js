Ext.define('MeExtApp.view.main.MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewcontroller',

    // Simply run setCenterViewXtype, passing the record that describes the center view,
    // and updateCenterViewXtype takes care of the rest.
    config: {
        centerViewXtype: null
    },

    initViewModel: function (vm) {
        var me = this;

        // menuItem can change either because the user selected an item in the NavView, or
        // because the record is named in the URL routing information.
        vm.bind("", me.setCenterViewXtype, me);
    },


    routes: {
        ':xtype': {action: 'mainRoute'}
    },

    mainRoute: function (xtype) {
        //var menuview = this.lookup('menuview');
        var navview = this.lookup('navview');
        var menuview = navview.items.items[0]
        var centerview = this.lookup('centerview');
        var exists = Ext.ClassManager.getByAlias('widget.' + xtype);
        if (exists === undefined) {
            console.log(xtype + ' does not exist');
            return;
        }
        var node = menuview.getStore().findNode('xtype', xtype);
        if (node == null) {
            console.log('unmatchedRoute: ' + xtype);
            return;
        }
        if (!centerview.getComponent(xtype)) {
            centerview.add({xtype: xtype, itemId: xtype, heading: node.get('text')});
        }
        centerview.setActiveItem(xtype);
        menuview.setSelection(node);
        var vm = this.getViewModel();
        vm.set('heading', node.get('text'));
    },


});