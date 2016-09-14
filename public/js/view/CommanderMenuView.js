define(["jquery", "underscore", "backbone", "text!template/commander_menu.html"], function($, _, Backbone, commander_menu_tpl) {
    var CommanderMenuView = Backbone.View.extend({
        
        id: 'commande-view',

        template: _.template(commander_menu_tpl),
        
        initialize: function(options) {
            this.user = options.user;
            this.commande = options.commande;
            /*this.listenToOnce(this.user, 'pointage:failure', function() {
                _.delay(this.loadingStop);
                alert('Erreur de sauvegarde, Veuillez vous déconnecter et recommencer');
            });*/
            this.bind('render:completed', function() {
               $('a.ui-btn').removeClass('ui-btn');
            });
        },
        
        loadingStart: function(text_show) {
            $.mobile.loading('show', {
                text: text_show,
                textVisible: true,
                theme: 'b',
                html: ""
            });
        },

        loadingStop: function() {
            $.mobile.loading('hide');
        },
        
        onClickFilter: function(e){
            e.preventDefault();
            var el = e.target;
            if($(el).parent().hasClass("comm_1_cat")) {
                Backbone.history.navigate("commanderProduit/"+$(el).parent().attr('data-id'), true);
            }
            /*if($(el).attr("name") == "entree") {
                this.loadingStart("Sauvegarde de votre pointage ...");
                this.pointeuse.pointage("entree", this.user);
            } else if($(el).attr("name") == "sortie") {
                this.pointeuse.pointage("sortie", this.user);
            }*/
        },
        
        render: function(eventName) {
            this.$el.empty();
            this.$el.append(this.template({
                user: this.user.toJSON()
            }));
            this.trigger('render:completed', this);
            return this;
        }            
    });
    return CommanderMenuView;
});