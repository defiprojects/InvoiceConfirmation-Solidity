contractAbi = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "addr",
                "type": "address"
        },
            {
                "name": "roleName",
                "type": "bytes32"
        }
      ],
        "name": "checkRole",
        "outputs": [],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "addr",
                "type": "address"
        },
            {
                "name": "roleName",
                "type": "bytes32"
        }
      ],
        "name": "adminAddRole",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_vendorHash",
                "type": "bytes32"
        }
      ],
        "name": "invalidateVendor",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
        },
            {
                "name": "_code",
                "type": "string"
        }
      ],
        "name": "addVendor",
        "outputs": [
            {
                "name": "vendorHash",
                "type": "bytes32"
        }
      ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
        }
      ],
        "name": "invoices",
        "outputs": [
            {
                "name": "name",
                "type": "string"
        },
            {
                "name": "email",
                "type": "string"
        },
            {
                "name": "vendor",
                "type": "bytes32"
        },
            {
                "name": "item",
                "type": "string"
        },
            {
                "name": "dates",
                "type": "string"
        },
            {
                "name": "itemHours",
                "type": "uint16"
        },
            {
                "name": "valid",
                "type": "bool"
        },
            {
                "name": "representativeName",
                "type": "string"
        },
            {
                "name": "representativeAddress",
                "type": "address"
        }
      ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
        }
      ],
        "name": "vendors",
        "outputs": [
            {
                "name": "code",
                "type": "string"
        },
            {
                "name": "name",
                "type": "string"
        },
            {
                "name": "validFrom",
                "type": "uint256"
        },
            {
                "name": "validTo",
                "type": "uint256"
        },
            {
                "name": "valid",
                "type": "bool"
        }
      ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "addr",
                "type": "address"
        },
            {
                "name": "roleName",
                "type": "bytes32"
        }
      ],
        "name": "hasRole",
        "outputs": [
            {
                "name": "",
                "type": "bool"
        }
      ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_issuerAddress",
                "type": "address"
        },
            {
                "name": "_vendor",
                "type": "bytes32"
        }
      ],
        "name": "revokeIssuer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "addr",
                "type": "address"
        },
            {
                "name": "roleName",
                "type": "bytes32"
        }
      ],
        "name": "adminRemoveRole",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "ROLE_ADMIN",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
        }
      ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_issuerAddress",
                "type": "address"
        },
            {
                "name": "_vendor",
                "type": "bytes32"
        }
      ],
        "name": "addIssuer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "contractAddress",
                "type": "bytes32"
        },
            {
                "indexed": false,
                "name": "_name",
                "type": "string"
        },
            {
                "indexed": false,
                "name": "email",
                "type": "string"
        },
            {
                "indexed": false,
                "name": "_vendor",
                "type": "bytes32"
        },
            {
                "indexed": false,
                "name": "_item",
                "type": "string"
        },
            {
                "indexed": false,
                "name": "_dates",
                "type": "string"
        },
            {
                "indexed": false,
                "name": "_hours",
                "type": "uint16"
        }
      ],
        "name": "logPrintedInvoice",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_address",
                "type": "address"
        },
            {
                "indexed": false,
                "name": "Vendor",
                "type": "bytes32"
        },
            {
                "indexed": false,
                "name": "timestamp",
                "type": "uint256"
        }
      ],
        "name": "logNewIssuer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "hash",
                "type": "bytes32"
        },
            {
                "indexed": false,
                "name": "name",
                "type": "string"
        },
            {
                "indexed": false,
                "name": "timestamp",
                "type": "uint256"
        }
      ],
        "name": "logNewVendor",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "addr",
                "type": "address"
        },
            {
                "indexed": false,
                "name": "roleName",
                "type": "bytes32"
        }
      ],
        "name": "RoleAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "addr",
                "type": "address"
        },
            {
                "indexed": false,
                "name": "roleName",
                "type": "bytes32"
        }
      ],
        "name": "RoleRemoved",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
        },
            {
                "name": "_email",
                "type": "string"
        },
            {
                "name": "_vendor",
                "type": "bytes32"
        },
            {
                "name": "_item",
                "type": "string"
        },
            {
                "name": "_dates",
                "type": "string"
        },
            {
                "name": "_hours",
                "type": "uint16"
        },
            {
                "name": "representativeName",
                "type": "string"
        }
      ],
        "name": "printInvoice",
        "outputs": [
            {
                "name": "invoiceAddress",
                "type": "bytes32"
        }
      ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_invoiceAddress",
                "type": "bytes32"
        }
      ],
        "name": "invalidateInvoice",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
  ]

  