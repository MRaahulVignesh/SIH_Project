package com.example.agri.pojos;

import java.util.List;

public class TransactionsFB {
    List<Transactions> transactionsList;

    public TransactionsFB(List<Transactions> transactionsList) {
        this.transactionsList = transactionsList;
    }

    public TransactionsFB() {
    }

    public List<Transactions> getTransactionsList() {
        return transactionsList;
    }

    public void setTransactionsList(List<Transactions> transactionsList) {
        this.transactionsList = transactionsList;
    }
}
