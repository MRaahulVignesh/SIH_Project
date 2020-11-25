package com.example.agri.pojos;


import java.io.Serializable;

public class Crops implements Serializable {
    String cropName, cropId;
    Integer totalQuantity, remainingQuantity, price;
    Boolean organic;
    String sellerId, seller;
    String expectedDate;
    Boolean delivered;
    String imageURL;

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public String getCropId() {
        return cropId;
    }

    public void setCropId(String cropId) {
        this.cropId = cropId;
    }

    public Integer getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Integer totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Integer getRemainingQuantity() {
        return remainingQuantity;
    }

    public void setRemainingQuantity(Integer remainingQuantity) {
        this.remainingQuantity = remainingQuantity;
    }

    public Crops() {
    }

    public Crops(String cropName, String cropId, Integer totalQuantity, Integer remainingQuantity, Integer price, Boolean organic, String sellerId, String seller, String expectedDate, Boolean delivered, String imageURL) {
        this.cropName = cropName;
        this.cropId = cropId;
        this.totalQuantity = totalQuantity;
        this.remainingQuantity = remainingQuantity;
        this.price = price;
        this.organic = organic;
        this.sellerId = sellerId;
        this.seller = seller;
        this.expectedDate = expectedDate;
        this.delivered = delivered;
        this.imageURL = imageURL;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public Boolean getOrganic() {
        return organic;
    }

    public void setOrganic(Boolean organic) {
        this.organic = organic;
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Boolean getDelivered() {
        return delivered;
    }

    public void setDelivered(Boolean delivered) {
        this.delivered = delivered;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getExpectedDate() {
        return expectedDate;
    }

    public void setExpectedDate(String expectedDate) {
        this.expectedDate = expectedDate;
    }
}