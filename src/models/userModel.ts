export interface UserModel {
  id: string;
  username: string;
  account: {
    [x: string]: any;
    balanceInCents: number;
    debitedAccounts: string[];
    creditedAccounts: string[];
  };
}
