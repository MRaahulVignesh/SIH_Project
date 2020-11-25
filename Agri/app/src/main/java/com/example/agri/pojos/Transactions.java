package com.example.agri.pojos;

public class Transactions {
    String cropId, buyerId, sellerId, quantity;

    public Transactions() {
    }

    public Transactions(String cropId, String buyerId, String sellerId, String quantity) {
        this.cropId = cropId;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.quantity = quantity;
    }

    public String getCropId() {
        return cropId;
    }

    public void setCropId(String cropId) {
        this.cropId = cropId;
    }

    public String getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
