package com.example.agri.pojos;

import java.util.List;

public class FarmersFB {
    List<Farmers> farmersList;

    public FarmersFB() {
    }

    public FarmersFB(List<Farmers> farmersList) {
        this.farmersList = farmersList;
    }

    public List<Farmers> getFarmersList() {
        return farmersList;
    }

    public void setFarmersList(List<Farmers> farmersList) {
        this.farmersList = farmersList;
    }
}
