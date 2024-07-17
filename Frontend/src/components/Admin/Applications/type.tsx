export type LoanApplications = {
    idProof: {
      public_id: string;
      url: string;
      uploaded: boolean;
    };
    addressProof: {
      public_id: string;
      url: string;
      uploaded: boolean;
    };
    incomeProof: {
      public_id: string;
      url: string;
      uploaded: boolean;
    };
    _id: any;
    user: any;
    name: string;
    email: string;
    phoneNumber: string;
    age: number;
    address: string;
    education: string;
    loanAmount: number;
    paymentStatus?: any;
    isSubmitted?:any
    comment?:any
    __v: number;
  };
  