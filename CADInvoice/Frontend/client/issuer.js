import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

Template.issuer.helpers({
    sending() {
        return Session.get("sending");
    },
    title() {
        if (Session.get("currentVendor"))
            return Session.get("currentVendor") + " - Issue Invoice";
        else
            return "Issue Invoice"
    },
    showVendor() {
        if (Session.get("currentVendor"))
            return "hidden"
    },
    showConfig() {
        return Session.get("currentVendor")
    },
});

Template.issuer.onCreated(function () {

    this.subscribe('templates');

    Session.set("sending", 0)

    //  if (!Meteor.userId())
    //    Router.go("/login")

    datatables(window, $);
    datatables_bs(window, $);

});

Template.issuer.events({
    //  'click .btn-send-email' (event, instance) {
    //    event.preventDefault();
    //    if (event.target.parentElement.parentElement.parentElement.childNodes[1].innerText.length == 66)
    //      var data = [{
    //          value: event.target.parentElement.parentElement.parentElement.childNodes[1].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.parentElement.childNodes[2].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.parentElement.childNodes[3].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.parentElement.childNodes[4].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.parentElement.childNodes[5].innerText
    //      }]
    //    else
    //      var data = [{
    //          value: event.target.parentElement.parentElement.childNodes[1].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.childNodes[2].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.childNodes[3].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.childNodes[4].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.childNodes[5].innerText
    //      }]
    //
    //    //    if (confirm("Reenviar o email para " + data[1].value + "?"))
    //    //      enviaEmail(data);
    //
    //  },
    'click .invoice-contract' (event, instance) {
        event.preventDefault();
        window.open(invoiceURL + event.target.innerHTML);
    },
    'click #config-modal' (event, instance) {
        event.preventDefault();
        Modal.show('configModal')
    },

    'click .send-invalid' (event, instance) {
        event.preventDefault();

        var myAddress = web3js.eth.coinbase

        if (!myAddress) {
            alert("You are not using an Ethereum-compatible browser. Install Metamask in your preferred browser to be able to send transactions.");
            return;
        }

        var transactionObject = {
            from: myAddress,
            gas: 900000,
            gasPrice: 3000000000
        };

        var invoice = event.target.parentElement.parentElement.parentElement.childNodes[2].innerText
        if (invoice.length != 66) return;

        invoiceContract.invalidateInvoice.sendTransaction(invoice, transactionObject, (error, transaction) => {

            // send email
            if (!error) {
                var sent = false;
                // get transaction result 
                console.log(transaction);
            } else
                console.log(error)
        });

    },
});

Template.issuer.onRendered(function () {

    invoiceURL = "/invoice/";

    // Data table
    $('#invoices').dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/English.json"
        },
        "order": [[0, "desc"]]
    });

    $('#printInvoiceForm').show();

    abiDecoder.addABI(contractAbi);

    // table functions

    if (Router.current().params.vendor) {
       invoiceContract.vendors.call(Router.current().params.vendor, function (error, result) {
            if (result) {
                if (result[4]) { //active institution
                    Session.set("currentVendor", result[1])
                    $("#vendor").val(Router.current().params.vendor)
                }
            }
        });

    }

    // append row to the HTML table
    function appendRow(data) {
        $("#invoices").DataTable().row.add([
      "<button class='btn btn-primary btn-xs btn-send-email'><i class='fa fa-send'></i></button>" + data[0],
      data[1],
      "<small><a class='invoice-contract' style='cursor: pointer;' href'#' >" + data[2] + "</a></small>",
      data[3],
      data[4],
      data[5],
      data[6],
            ((data[7]) ? "sim <button class='btn btn-danger btn-xs send-invalid'><i class='fa fa-ban'></i></button>" : "não")
    ]).draw();
    }

    // Get printed invoicess
    var invoices = invoiceContract.logPrintedInvoice({}, {
        fromBlock: 1600000,
        toBlock: 'latest'
    });

    invoices.watch(function (error, result) {

        if (!error) {
            let data = result

           invoiceContract.vendors.call(result.args._vendor, function (error, result) {
                if (result && (Session.get("currentVendor") ? (Session.get("currentVendor") == result[1]) : true)) {
                    invoiceContract.invoices.call(data.args.contractAddress,
                        function (error, cert) {
                            appendRow([
                              data.blockNumber.toString(),
                              result[1],
                              data.args.contractAddress,
                              data.args._name,
                              data.args.email,
                              data.args._item,
                              data.args._dates,
                              cert[6]
                            ])


                        })


                }
            });

            ;

        } else {
            console.log(error);
        }
    });


});

Template.issuer.onDestroyed(function () {

    Session.set("currentVendor", false)

});

Template.configModal.events({
    'change #fileinput': function (event, template) {
        //var files = event.target.files;
        //console.log(files[0])
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {} else {
                    var imagesURL = {
                        "image": "/cfs/files/images/" + fileObj._id
                    };
                    var invoiceTemplate = Templates.findOne({
                        address: Router.current().params.vendor
                    })

                    if (invoiceTemplate)
                        Templates.update(invoiceTemplate._id, {
                            $set: imagesURL
                        })
                    else
                        Templates.insert({
                            address: Router.current().params.vendor,
                            image: imagesURL
                        });
                }
            });

        });
    }
});

Template.configModal.helpers({
    imageUrl() {
        var invoiceTemplate = Templates.findOne({
            address: Router.current().params.vendor
        })
        if (invoiceTemplate)
            return invoiceTemplate.image;
    },
})
