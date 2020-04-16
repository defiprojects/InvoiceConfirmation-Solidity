'use strict'
module.exports = (app) => {
    var frontend = require('../controllers/frontEndController');

    //admin administration
    app.route('/superadmin')
        .get(frontend.getowner);

    app.route('/admin')
        .get(frontend.getadmins)
        .put(frontend.replaceadmin)
        .post(frontend.addadmin);

    app.route('/admin/:id')
        .delete(frontend.removeadmin);

    //transaction counts
    app.route('trxn-count')
        .get(frontend.trxncount);
    
    //transaction stats
    app.route()
        .get(frontend.trxnstat);

    //mint approval requirement
    app.route('/mint-requiement')
        .post(frontend.changerequirement);

    //Total Mint Supply
    app.route('/totalsupply')
        .get(frontend.totalsupply);

    //Users balance
    app.route('/userbalance')
        .get(frontend.userbalance)

    //Mint status
    app.route('/mints-schedules')
        .get()
        .post()
        .delete();

    app.route()
}
