package com.example.agri;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.agri.pojos.Farmers;
import com.example.agri.pojos.FarmersFB;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;

public class RegisterActivity extends AppCompatActivity {
    Button contBtn;
    Farmers farmer;
    FirebaseAuth mAuth;
    FirebaseFirestore db;
    FarmersFB data;
    private EditText aadharCardNoET, emailET, locationET, nameET;
    private Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        db = FirebaseFirestore.getInstance();
        mAuth = FirebaseAuth.getInstance();
        context = this;

        aadharCardNoET = findViewById(R.id.aadharet);
        emailET = findViewById(R.id.emailet);
        locationET = findViewById(R.id.locationet);
        contBtn = findViewById(R.id.ctnBtn);
        nameET = findViewById(R.id.name_et);

        DocumentReference docRef = db.collection("Agri").document("Farmers");
        docRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot document = task.getResult();
                    if (document.exists()) {
                        data = document.toObject(FarmersFB.class);
                        contBtn.setClickable(true);
                    } else {
                        //Log.d(TAG, "No such document");\
                    }
                } else {
                    //Log.d(TAG, "get failed with ", task.getException());
                    Toast.makeText(RegisterActivity.this, task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                }
            }
        });

        if (data == null) {
            data = new FarmersFB();
            data.setFarmersList(new ArrayList<Farmers>());
        }

        contBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String aadhaarNo = aadharCardNoET.getText().toString();
                String email = emailET.getText().toString();
                String location = locationET.getText().toString();
                String name = nameET.getText().toString();

                if (aadhaarNo.length() == 0) {
                    Toast.makeText(context, "Please enter your 12 digit aadhar number", Toast.LENGTH_SHORT).show();
                } else if (location.length() == 0 || location.trim().length() == 0) {
                    Toast.makeText(context, "Please enter your location", Toast.LENGTH_SHORT).show();
                } else if (name.length() == 0 || name.trim().length() == 0) {
                    Toast.makeText(context, "Please enter your name", Toast.LENGTH_SHORT).show();
                } else if (aadhaarNo.length() != 12) {
                    Toast.makeText(context, "Aadhar number should be 12 digits in length", Toast.LENGTH_SHORT).show();
                } else if (!isValidEmail(email)) {
                    Toast.makeText(context, "Please enter a valid email address", Toast.LENGTH_SHORT).show();
                } else {
                    //after verification and fixing created Farmer class object
                    farmer = new Farmers();
                    farmer.setMobNo(getIntent().getStringExtra("MobNo"));
                    farmer.setId(mAuth.getUid());
                    farmer.setAadhaarNo(aadhaarNo);
                    farmer.setEmail(email);
                    farmer.setName(name);

                    data.getFarmersList().add(farmer);

                    CollectionReference dbUsers = db.collection("Agri");
                    dbUsers.document("Farmers").set(data).addOnSuccessListener(new OnSuccessListener<Void>() {
                        @Override
                        public void onSuccess(Void aVoid) {
                            //here is where we go into the app
                            startActivity(new Intent(RegisterActivity.this, MainActivity.class));
                            finish();
                        }
                    }).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            Toast.makeText(getApplicationContext(), "Sign Up Failed, Try Again " + e.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    });
                }


            }
        });
    }

    private boolean isValidEmail(String target) {
        if (target.length() == 0)
            return true;
        if (target == null) {
            return false;
        } else {
            return Patterns.EMAIL_ADDRESS.matcher(target).matches();
        }
    }
}
