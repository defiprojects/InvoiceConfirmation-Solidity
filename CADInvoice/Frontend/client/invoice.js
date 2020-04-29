Template.invoice.helpers({
    invoiceAddress() {
        return Router.current().params.invoiceAddress;
    },
    invalid() {
        return Session.get("invalid");
    },
    valid() {
        return Session.get("valid");
    },
    contractAddress() {
        return contractAddress;
    }
});

Template.invoice.events({
    'click #printPDF' (event, instance) {
        html2canvas(window.document.getElementById("invoice"), {
            scale: 2
        }).then(function (canvas) {
            var a = document.createElement('a');
            // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
            a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            a.download = 'Bizancio - Certificado.png';
            a.click();
        });
    },
})

Template.invoice.onCreated(function () {
    // Web3 stuff
    this.subscribe('templates');

    // get invoice data
    invoiceContract.invoices.call(Router.current().params.invoiceAddress, function (error, result) {
        if (!error) {
            if (result[6] == false) {
                Session.set("invalid", true)
                return;
            }

            let invoiceData = result

            invoiceContract.vendors.call(invoiceData[2], function (error, vendorData) {
                if (vendorData) {
                    template = Templates.findOne({
                        address: invoiceData[2]
                    })
                    Session.set("valid", true)
                    document.getElementById("diploma").src = template.image;
                    document.getElementById("name").textContent = invoiceData[0];
                    document.getElementById("course").textContent = invoiceData[3];
                    document.getElementById("hours").textContent = invoiceData[5].c[0];
                    document.getElementById("name-representative").textContent = invoiceData[7];
                    document.getElementById("address-representative").textContent = invoiceData[8];
                    document.getElementById("dates").textContent = invoiceData[4];
                }
            });


        } else
            Session.set("invalid", true)
    });
});
