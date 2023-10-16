const invoiceController = require('../../controllers/invoiceController');
const Invoice = require('../../models/invoice');

jest.mock('../../models/invoice');

const request = {
    body: {
        "SupplierName": "Supplier ABC",
        "OrderID": "12345",
        "SiteManagerID": "SM001",
        "SiteManagerName": "John Doe",
        "SiteName": "Site XYZ",
        "IssuedDate": "2023-10-16",
        "TotalAmount": 500.75,
        "Materials": [
            {
                "materialName": "Material 1",
                "quantity": 10,
                "unitPrice": 25.50
            },
            {
                "materialName": "Material 2",
                "quantity": 5,
                "unitPrice": 12.75
            }
        ]
    }
};

const response = {
    json: jest.fn((x) => x)
};

it('Should send a success response when invoice added', async () => {
    const mockSave = jest.fn().mockResolvedValue({});
    Invoice.mockImplementationOnce(() => ({
        save: mockSave,
    }));

    await invoiceController.createInvoice(request, response);

    expect(mockSave).toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith("Invoice Added");
});
