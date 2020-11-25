package com.example.agri;

import android.Manifest;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Looper;
import android.provider.MediaStore;
import android.provider.Settings;
import android.text.Html;
import android.text.Spanned;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.example.agri.pojos.Crops;
import com.example.agri.pojos.Locations;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.squareup.picasso.Picasso;

import java.io.ByteArrayOutputStream;

public class CropDetailsActivity extends AppCompatActivity {
    private static final int REQUEST_IMAGE_CAPTURE = 100;
    private static final int CAMERA_PERMISSION_REQUEST_CODE = 200;
    private FirebaseFirestore db;
    private ImageButton uploadNewImageBtn;
    private ImageView cropImageView;
    private StorageReference mStorage;
    private Context context;
    private ProgressDialog mProgress;
    private Crops crop;
    private Locations loc;
    private TextView cropNameTV, cropIdTV, totalQuantityTV, remainingQuantityTV, priceTV, organicTV, sellerIdTV, expectedDateTV, deliveredTV;

    String lat;
    String lon;
    double latitude;
    double longitude;
    int PERMISSION_ID = 24;
    Location mLastLocation;
    Location location;
    private FusedLocationProviderClient fusedLocationClient;
    private LocationCallback mLocationCallback = new LocationCallback() {
        @Override
        public void onLocationResult(LocationResult locationResult) {
            mLastLocation = locationResult.getLastLocation();
            latitude = mLastLocation.getLatitude();
            longitude = mLastLocation.getLongitude();
            lat = String.valueOf(mLastLocation.getLatitude());
            lon = String.valueOf(mLastLocation.getLongitude());
            updateLocationInFirestore(lat, lon);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_crop_details);
        context = this;
        db = FirebaseFirestore.getInstance();
        mStorage = FirebaseStorage.getInstance().getReference();

        uploadNewImageBtn = findViewById(R.id.upload_new_image_btn);
        cropImageView = findViewById(R.id.crop_image_view);
        cropNameTV = findViewById(R.id.crop_name);
        cropIdTV = findViewById(R.id.crop_id);
        totalQuantityTV = findViewById(R.id.crop_total_quantity);
        remainingQuantityTV = findViewById(R.id.crop_remaining_quantity);
        priceTV = findViewById(R.id.crop_price);
        organicTV = findViewById(R.id.crop_isOrganic);
        sellerIdTV = findViewById(R.id.crop_seller_id);
        expectedDateTV = findViewById(R.id.crop_expected_date);
        deliveredTV = findViewById(R.id.crop_delivered);

        crop = (Crops) getIntent().getSerializableExtra("crop");

        if (crop != null) {
            cropNameTV.setText(styleString("Crop Name:", crop.getCropName()));
            cropIdTV.setText(styleString("Crop Id:", crop.getCropId()));
            totalQuantityTV.setText(styleString("Total Quantity:", crop.getTotalQuantity() + ""));
            remainingQuantityTV.setText(styleString("Unsold Stock:", crop.getRemainingQuantity() + ""));
            priceTV.setText(styleString("Unit Price:", crop.getPrice() + ""));
            organicTV.setText(styleString("Organic:", crop.getOrganic().toString()));
            sellerIdTV.setText(styleString("Seller Id:", crop.getSellerId()));
            expectedDateTV.setText(styleString("Expected Date:", crop.getExpectedDate()));
            deliveredTV.setText(styleString("Delivered:", (crop.getDelivered() != null ? "Yea" : "No")));
        }

        mProgress = new ProgressDialog(this);

        uploadNewImageBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (checkPermissions()) {
                    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                    startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);
                } else {
                    requestPermissions();
                }
            }
        });

        if (crop.getImageURL() != null && crop.getImageURL().trim().length() != 0) {
            showBitmapImageIntoCropImageView();
        }


        DocumentReference docRef = db.collection("Locations").document(FirebaseAuth.getInstance().getUid() + "");
        docRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot document = task.getResult();
                    if (document.exists()) {
                        loc = document.toObject(Locations.class);
                        if (loc == null) {
                            loc = new Locations();
                        }

                    } else {
                        //Log.d(TAG, "No such document");\
                        loc = new Locations();
                    }
                } else {
                    //Log.d(TAG, "get failed with ", task.getException());
                    Toast.makeText(context, task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                    finish();
                }
            }
        });

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            mProgress.setMessage("Uploading image...");
            mProgress.show();

            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
            cropImageView.setImageBitmap(imageBitmap);
            encodeBitmapAndSaveToFirebase(imageBitmap);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case CAMERA_PERMISSION_REQUEST_CODE:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED &&
                        grantResults[1] == PackageManager.PERMISSION_GRANTED &&
                        grantResults[2] == PackageManager.PERMISSION_GRANTED &&
                        grantResults[3] == PackageManager.PERMISSION_GRANTED &&
                        grantResults[4] == PackageManager.PERMISSION_GRANTED &&
                        grantResults[5] == PackageManager.PERMISSION_GRANTED) {
                    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                    startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);
                    requestNewLocationData();
                }
        }
    }

    private void encodeBitmapAndSaveToFirebase(final Bitmap imageBitmap) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        imageBitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        final StorageReference filepath = mStorage.child("CropPhotos").child(crop.getCropId());
        filepath.putBytes(baos.toByteArray()).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                mProgress.dismiss();
                Toast.makeText(context, "Image uploaded successfully", Toast.LENGTH_SHORT).show();
                filepath.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                    @Override
                    public void onSuccess(Uri uri) {
                        crop.setImageURL(uri.toString());
                        updateImageURLInDatabase();
                    }
                });
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                mProgress.dismiss();
                Toast.makeText(context, "Something went wrong try uploading again", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void showBitmapImageIntoCropImageView() {
        Picasso.get()
                .load(crop.getImageURL())
                .into(cropImageView);
    }

    private Spanned styleString(String a, String b) {
        String sourceString = "<b>" + a + "</b> " + b;
        return (Html.fromHtml(sourceString));
    }

    private void updateImageURLInDatabase() {
        for (Crops c : MainActivity.myCropList) {
            if (c.getCropId().equals(crop.getCropId())) {
                c.setImageURL(crop.getImageURL());
            }
        }
        CollectionReference dbUsers = db.collection("Agri");
        dbUsers.document("Crops").set(MainActivity.data).addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                mProgress.dismiss();
                MainActivity.myCropListRVAdapter.notifyDataSetChanged();
                Toast.makeText(CropDetailsActivity.this, "Image URL updated Successfully!", Toast.LENGTH_SHORT).show();
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                Toast.makeText(getApplicationContext(), "Failed To Upload! Try Again!" + e.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        getLastLocation();
    }

    private boolean checkPermissions() {
        return ContextCompat.checkSelfPermission(context, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(context, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(context, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_BACKGROUND_LOCATION) == PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    private void requestPermissions() {
        ActivityCompat.requestPermissions(CropDetailsActivity.this, new String[]
                {Manifest.permission.CAMERA,
                        Manifest.permission.READ_EXTERNAL_STORAGE,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        Manifest.permission.ACCESS_BACKGROUND_LOCATION,
                        Manifest.permission.ACCESS_COARSE_LOCATION,
                        Manifest.permission.ACCESS_FINE_LOCATION}, CAMERA_PERMISSION_REQUEST_CODE);
    }

    private boolean isLocationEnabled() {
        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) || locationManager.isProviderEnabled(
                LocationManager.NETWORK_PROVIDER
        );
    }

    private void requestNewLocationData() {
        LocationRequest mLocationRequest = new LocationRequest();
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        mLocationRequest.setInterval(3000);
        mLocationRequest.setFastestInterval(1000);
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        fusedLocationClient.requestLocationUpdates(
                mLocationRequest, mLocationCallback,
                Looper.myLooper()
        );
    }

    private void getLastLocation() {
        if (checkPermissions()) {
            if (isLocationEnabled()) {
                fusedLocationClient.getLastLocation().addOnCompleteListener(
                        new OnCompleteListener<Location>() {
                            @Override
                            public void onComplete(@NonNull Task<Location> task) {
                                location = task.getResult();
                                if (location == null) {
                                    requestNewLocationData();
                                } else {
                                    lat = String.valueOf(location.getLatitude());
                                    lon = String.valueOf(location.getLongitude());
                                    latitude = location.getLatitude();
                                    longitude = location.getLongitude();
                                    updateLocationInFirestore(lat, lon);
                                }
                            }
                        }
                );
            } else {
                Toast.makeText(this, "Turn on location", Toast.LENGTH_LONG).show();
                Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                startActivity(intent);
            }
        } else {
            requestPermissions();
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        if (checkPermissions()) {
            requestNewLocationData();
        }

    }

    private void updateLocationInFirestore(String lat, String lon) {
        loc.setLoc(loc.getLoc() + lat + "," + lon + "\n");
        CollectionReference dbU = db.collection("Locations");
        dbU.document(FirebaseAuth.getInstance().getUid() + "").set(loc).addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Log.d("locations", "LOC Success! ");
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                Log.d("locations", "LOC Failed! ");
            }
        });
    }

}
