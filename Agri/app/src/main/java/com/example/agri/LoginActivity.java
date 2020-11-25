package com.example.agri;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseException;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;

import java.util.concurrent.TimeUnit;

public class LoginActivity extends AppCompatActivity {

    EditText mobNoEt, passwordEt;
    Button loginBt;
    Context context;
    TextView resendOTPTv;
    PhoneAuthProvider.OnVerificationStateChangedCallbacks verificationStateChangedCallbacks;
    PhoneAuthProvider.ForceResendingToken resendingToken;
    FirebaseAuth mAuth;
    String phoneNo, verificationId;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        context = this;
        mobNoEt = findViewById(R.id.login_mobile_no);
        passwordEt = findViewById(R.id.login_password);
        loginBt = findViewById(R.id.loginBtn);
        resendOTPTv = findViewById(R.id.resend_otp);
        FirebaseApp.initializeApp(this);
        mAuth = FirebaseAuth.getInstance();

        if (mAuth.getCurrentUser() != null) {
            startActivity(new Intent(LoginActivity.this, MainActivity.class));
            finish();
        }

        loginBt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                phoneNo = mobNoEt.getText().toString();
                if (phoneNo.length() != 10) {
                    Toast.makeText(context,
                            "Phone Number must be 10 digits!",
                            Toast.LENGTH_SHORT).show();
                    return;
                }
                phoneNo = "+91" + phoneNo;
                mobNoEt.setClickable(false);
                mobNoEt.setFocusable(false);

                if (loginBt.getText().equals(getString(R.string.reqCode))) {
                    //request code
                    setUpVerificationCallbacks();
                    PhoneAuthProvider.getInstance().verifyPhoneNumber(
                            phoneNo,
                            60,
                            TimeUnit.SECONDS,
                            LoginActivity.this,
                            verificationStateChangedCallbacks
                    );
                    passwordEt.setVisibility(View.VISIBLE);
                    loginBt.setText(R.string.Login);

                } else {
                    //verify code and login
                    String code = passwordEt.getText().toString();
                    PhoneAuthCredential credential = PhoneAuthProvider.getCredential(verificationId, code);
                    signInWithPhoneAuthCredential(credential);
                }
            }
        });
    }

    private void setUpVerificationCallbacks() {
        verificationStateChangedCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {

            @Override
            public void onVerificationCompleted(@NonNull PhoneAuthCredential phoneAuthCredential) {
                //open activity
                signInWithPhoneAuthCredential(phoneAuthCredential);
                Toast.makeText(context, "Successfully Logged In!", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onVerificationFailed(@NonNull FirebaseException e) {
                Log.e("FirebaseError", e.getMessage());
                Toast.makeText(context, e.getMessage(), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onCodeSent(@NonNull String s, @NonNull PhoneAuthProvider.ForceResendingToken forceResendingToken) {
                super.onCodeSent(s, forceResendingToken);
                verificationId = s;
                resendingToken = forceResendingToken;
                resendOTPTv.setVisibility(View.VISIBLE);
                resendOTPTv.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        //resend OTP
                        setUpVerificationCallbacks();
                        PhoneAuthProvider.getInstance().verifyPhoneNumber(
                                phoneNo,
                                60,
                                TimeUnit.SECONDS,
                                LoginActivity.this,
                                verificationStateChangedCallbacks,
                                resendingToken
                        );
                    }
                });
            }
        };
    }

    private void signInWithPhoneAuthCredential(PhoneAuthCredential credential) {
        mAuth.signInWithCredential(credential).addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {
                if (task.isSuccessful()) {
                    if (task.getResult().getAdditionalUserInfo().isNewUser()) {
                        //New user, take to registration page
                        Intent out = new Intent(LoginActivity.this, RegisterActivity.class);
                        out.putExtra("MobNo", phoneNo);
                        startActivity(out);
                        finish();
                    } else {
                        //Take to main page
                        Intent out = new Intent(LoginActivity.this, MainActivity.class);
                        startActivity(out);
                        finish();
                    }

                } else {
                    if (task.getException() instanceof
                            FirebaseAuthInvalidCredentialsException) {
                        // The verification code entered was invalid
                        Toast.makeText(context, "Invalid Code Entered!", Toast.LENGTH_SHORT).show();
                        mobNoEt.setFocusable(true);
                        mobNoEt.setClickable(true);
                    }
                }
            }
        });
    }
}





