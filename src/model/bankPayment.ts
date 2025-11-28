export interface BankPayment {
    type: string;
    id: number;
    attributes: {
        amount: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    };
    relationships: {
        customer: {
            self: URL;
            related: URL;
        };
    };
    links: {
        self: URL;
        related: URL;
    };
}
