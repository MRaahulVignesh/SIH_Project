package com.example.agri.pojos;

import java.util.List;

public class CropsFB {
    List<Crops> cropsList;

    public CropsFB(List<Crops> cropsList) {
        this.cropsList = cropsList;
    }

    public CropsFB() {
    }

    public List<Crops> getCropsList() {
        return cropsList;
    }

    public void setCropsList(List<Crops> cropsList) {
        this.cropsList = cropsList;
    }
}
