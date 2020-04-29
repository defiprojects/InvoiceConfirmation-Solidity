import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

Template.vendors.events({
    'click .btn-revoke-vendor'(event, instance) {
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
        invoiceContract.invalidateVendor.sendTransaction(event.target.id, transactionObject, (error, transaction) => {

            // send email
            if (!error) {
                var sent = false;
                // get transaction result 
                console.log(transaction);
            } else
                console.log(error)
        });

    },
    'click #new-vendor' (event, instance) {
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

        invoiceContract.addVendor.sendTransaction(document.getElementById("name").value, document.getElementById("code").value, transactionObject, (error, transaction) => {

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

Template.vendors.onRendered(function () {
    datatables(window, $);
    datatables_bs(window, $);

    // append row to the HTML table
    function appendRow(data) {
        $("#vendors-data-table").DataTable().row.add([
      "<small><a class='vendor-address' style='cursor: pointer;' href'#' >" + data[0] + "</a><small>",
      data[1],
      "<span class='" + data[0] + "'><i class='fa fa-spinner fa-pulse'></i><span>"
    ]).draw();
    }

    function updateVendor(hash) {
        invoiceContract.vendors.call(hash, function (error, result) {
            if (result[4]) {
                for (i = 0; i < document.getElementsByClassName(hash).length; i++)
                    document.getElementsByClassName(hash)[i].innerHTML = "yes (" + result[0] + ")<button id='" + hash + "' name='" + hash + "' class='btn btn-danger pull-right btn-xs btn-revoke-vendor'>Revoke</button>";
            } else
                for (i = 0; i < document.getElementsByClassName(hash).length; i++)
                    document.getElementsByClassName(hash)[i].innerHTML = "no";
        });
    }

    // Get current users
    var users = invoiceContract.logNewVendor({}, {
        fromBlock: 0,
        toBlock: 'latest',
        // address: 0xA8033F3eC6567F298792F1C94acc706727257e80
    });

    users.watch(function (error, result) {

        if (!error) {
            var data = [
        result.args.hash,
        result.args.name,
        result.blockNumber,
        result.transactionHash
      ]

            appendRow(data);
            updateVendor(result.args.hash);

        } else {
            console.log(error);
        }
    });


    // data table
    $('#vendors-data-table').dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/English.json"
        }
    });

})
