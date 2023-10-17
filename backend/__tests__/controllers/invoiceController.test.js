// Import necessary modules and dependencies
const invoiceController = require('../../controllers/invoiceController');
const Invoice = require('../../models/invoice');

// Mock Order.save to return data in orderController
jest.mock('../../models/invoice');

// Test cases for createOrder function
describe('invoiceController', () => {
    describe('createInvoice', () => {

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create an invoice', async () => {
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

            const mockSave = jest.fn().mockResolvedValue({});
            Invoice.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await invoiceController.createInvoice(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Invoice Added");
        });

        it('should not create an invoice with invalid input', async () => {
            const request = {
                body: {
                    "SupplierName": "Supplier ABC",
                    "OrderID": "",
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

            const mockSave = jest.fn().mockResolvedValue({});
            Invoice.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await invoiceController.createInvoice(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Invoice Added");
        });
    });
});
