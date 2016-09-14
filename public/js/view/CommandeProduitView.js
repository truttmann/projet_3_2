define(["jquery", "underscore", "backbone", "text!template/commande_cat_produit.html"], function($, _, Backbone, commande_cat_produit_tpl) {
    var CommandeProduitView = Backbone.View.extend({
        
        id: 'commande-produit-view',

        template: _.template(commande_cat_produit_tpl),
        
        initialize: function(options) {
            this.user = options.user;
            this.commande = options.commande;
            this.categorie_id = options.categorie_id
            /*this.listenToOnce(this.user, 'pointage:failure', function() {
                _.delay(this.loadingStop);
                alert('Erreur de sauvegarde, Veuillez vous déconnecter et recommencer');
            });*/
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
            /*if($(el).attr("name") == "entree") {
                this.loadingStart("Sauvegarde de votre pointage ...");
                this.pointeuse.pointage("entree", this.user);
            } else if($(el).attr("name") == "sortie") {
                this.pointeuse.pointage("sortie", this.user);
            }*/
        },
        
        render: function(eventName) {
            var _this = this;
            var xhr = $.get(config.api_url + "/rest-categorie/"+this.categorie_id, {"token": _this.user.get('token')}, null, 'jsonp');
            xhr.done( function(data){
                _this.$el.empty();
                _this.$el.append(_this.template({
                    categorie: data.result,
                    user: _this.user.toJSON()
                }));
                _this.trigger('render:completed', _this);
                return _this;
            });
            xhr.fail(function(data) {
                $('#error').empty().html(data);
                this.trigger('categorie:failure');
            });
            
            
        }
    });
    return CommandeProduitView;
});