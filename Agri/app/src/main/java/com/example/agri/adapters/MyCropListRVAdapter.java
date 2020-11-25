package com.example.agri.adapters;

import android.content.Context;
import android.content.Intent;
import android.text.Html;
import android.text.Spanned;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.agri.CropDetailsActivity;
import com.example.agri.R;
import com.example.agri.pojos.Crops;

import java.util.List;

public class MyCropListRVAdapter extends RecyclerView.Adapter<MyCropListRVAdapter.MyCropItemViewHolder> {

    private Context context;
    private List<Crops> cropsList;

    public MyCropListRVAdapter(Context context, List<Crops> cropsList) {
        this.context = context;
        this.cropsList = cropsList;
    }

    @NonNull
    @Override
    public MyCropItemViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View listItem = LayoutInflater.from(context).inflate(R.layout.farmer_crop_list_item, parent, false);
        return new MyCropItemViewHolder(listItem);
    }

    @Override
    public void onBindViewHolder(@NonNull MyCropItemViewHolder holder, int position) {
        final Crops crop = cropsList.get(position);
        holder.cropNameTV.setText(styleString("Crop:", crop.getCropName()));
        holder.cropExpectedDateTV.setText(styleString("Expected harvest:", crop.getExpectedDate()));
        holder.cropTotalQuantityTV.setText(styleString("Total Stock:", crop.getTotalQuantity().toString()));
        holder.cropRemainingQuantityTV.setText(styleString("Unsold:", crop.getRemainingQuantity().toString()));
        holder.cropIsOrganicTV.setText(styleString("Organic:", crop.getOrganic() ? "Yes" : "No"));
        holder.cropPriceTV.setText(styleString("Unit Price:", crop.getPrice().toString()));

        holder.parentRL.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, CropDetailsActivity.class);
                intent.putExtra("crop", crop);
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return cropsList.size();
    }

    static class MyCropItemViewHolder extends RecyclerView.ViewHolder {
        TextView cropNameTV, cropExpectedDateTV, cropTotalQuantityTV, cropRemainingQuantityTV, cropIsOrganicTV, cropPriceTV;
        RelativeLayout parentRL;

        MyCropItemViewHolder(@NonNull View itemView) {
            super(itemView);
            this.parentRL = itemView.findViewById(R.id.crop_list_item_parent_rl);
            this.cropNameTV = itemView.findViewById(R.id.mu_crop_name);
            this.cropExpectedDateTV = itemView.findViewById(R.id.my_crop_expected_date);
            this.cropTotalQuantityTV = itemView.findViewById(R.id.my_crop_total_quantity);
            this.cropRemainingQuantityTV = itemView.findViewById(R.id.my_crop_remaining_quantity);
            this.cropIsOrganicTV = itemView.findViewById(R.id.my_crop_isOrganic);
            this.cropPriceTV = itemView.findViewById(R.id.my_crop_price);
        }
    }

    private Spanned styleString(String a, String b) {
        String sourceString = "<b>" + a + "</b> " + b;
        return (Html.fromHtml(sourceString));
    }
}
