define(["jquery", "underscore", "backbone", "backbone.queryparams", "backbone.route-filter", 
    'backbone.localStorage', "backbone.token", "model/user-local",  "model/commande-local", 
    "view/homeView", "view/loginView", "view/creationcompteView", "view/parametreView",
    "view/commandeView", "view/stockView","view/cassePerteView", "view/CommanderMenuView",
    "view/commandeProduitView", "view/stockProduitView", "view/destockProduitView",
    "view/MonCompteView", "view/EncoursFacturationView", "view/MonEquipeView", "view/InventaireView",
    "view/HistoriqueCommandeView",], 
function($, _, Backbone, QueryParams, RouterFilter,
    LocalStorage, Token, UserLocalModel, CommandeLocalModel,
    HomeView, LoginView, CreationCompteView, ParametreView,
    CommandeView, StockView,CassePerteView, CommanderMenuView,
    CommandeProduitView, StockProduitView, DestockProduitView,
    MonCompteView, EncoursFacturationView, MonEquipeView, InventaireView,
    HistoriqueCommandeView) {
    
    var userLocal = new UserLocalModel();
    userLocal.fetch();

    var AppRouter = Backbone.Router.extend({
        init: true,
        routes: {
            "": "home",
            "home": "home",
            "creationcompte": "creationcompte",
            "login": "login",
            "commanderMenu": "commanderMenu",
            "commander": "commander",
            "commanderProduit/:id": "commanderProduit",
            "historiqueCommande": "historiqueCommande",
            "consult_stock": "consult_stock",
            "stockProduit": "stockProduit",
            "cassePerteProduit" : "cassePerteProduit",
            "inventaire": "inventaire",
            "destockProduit": "destockProduit",
            "parametre": "parametre",
            "logout": "logout",
            "sync/:type": "sync",
            "moncompte" : "moncompte",
            "encoursFacturation" : "encoursfacturation",
            "monequipe" : "monequipe",
            "inventaire" : "inventaire",
        },
        
        before: {
            '*any': 'checkAuthorization'
        },

        checkAuthorization: function(fragment, args, next) {
            var isLogged = this.userLocal.get('is_logged');
            Backbone.TokenAuth.setToken(this.userLocal.get('token'));
            if (!isLogged && fragment != "login" && fragment != "creationcompte" ){
                Backbone.history.navigate('login',  {trigger: true});
            } 
            else if (isLogged && fragment == "login"){
                Backbone.history.navigate('home',  {trigger: true});
            }
            else {
                next();
            }
            return false;
        },
        initialize: function() {
            $('.back').on('click', function(event) {
                window.history.back();
                return false;
            });
            this.firstPage = true;
            console.log(userLocal);
            this.userLocal = userLocal;
        },
        logout: function() {
            this.userLocal.clear();
            this.userLocal.set(this.userLocal.defaults);
            this.userLocal.save();
            localStorage.clear();
            Backbone.history.navigate('login', true);
        },
        login: function() {
            var loginView = new LoginView({
                user: this.userLocal
            });
            loginView.render();
            this.changePage(loginView);
        },
        home: function() {
            var view = new HomeView({
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        commanderMenu: function() {
            var view = new CommanderMenuView({
                commande: new CommandeLocalModel(),
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        commander: function() {
            var view = new CommandeView({
                commande: new CommandeLocalModel(),
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        historiqueCommande: function() {
            var view = new HistoriqueCommandeView({
                commande: new CommandeLocalModel(),
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        monequipe: function() {
            var view = new MonEquipeView({
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        commanderProduit: function(id) {
            var view = new CommandeProduitView({
                commande: new CommandeLocalModel(),
                categorie_id: id,
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        consult_stock: function() {
            var view = new StockView({
                commande: new CommandeLocalModel(),
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        stockProduit: function() {
            var view = new StockProduitView({
                commande: new CommandeLocalModel(),
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        cassePerteProduit: function() {
            var view = new CassePerteView({
                commande: new CommandeLocalModel(),
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        inventaire: function() {
            var view = new InventaireView({
                commande: new CommandeLocalModel(),
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        destockProduit: function() {
            var view = new DestockProduitView({
                commande: new CommandeLocalModel(),
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        parametre: function() {
            var view = new ParametreView({
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        encoursfacturation: function() {
            var view = new EncoursFacturationView({
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        moncompte : function() {
            var view = new MonCompteView({
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        creationcompte: function() {
            var view = new CreationCompteView({
                user: this.userLocal
            });
            view.render();
            this.changePage(view);
        },
        changePage: function(page) {
            page.$el.attr('data-role', 'page');
            $('body').append(page.$el);
            if (this.init) {
                $(':mobile-pagecontainer').pagecontainer('change', $(page.el), {
                    transition: 'none',
                    changeHash: false,
                    reverse: true,
                    showLoadMsg: true,
                    allowSamePageTransition: true
                });
            } else {
                this.init = false;
            }
        }
    });
    return AppRouter;
});