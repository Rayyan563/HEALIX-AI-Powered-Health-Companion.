
package com.healix.healix.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class GoogleTokenService {

    @Value("${healix.google.client-id}")
    private String clientId;

    public GoogleIdToken.Payload verifyToken(String credential)
            throws GeneralSecurityException, IOException {

        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(
                        new NetHttpTransport(),
                        GsonFactory.getDefaultInstance()
                )
                        .setAudience(Collections.singletonList(clientId))
                        .build();

        GoogleIdToken idToken = verifier.verify(credential);

        if (idToken == null) {
            throw new IllegalArgumentException(
                    "Invalid Google ID token"
            );
        }

        GoogleIdToken.Payload payload = idToken.getPayload();

        if (!Boolean.TRUE.equals(payload.getEmailVerified())) {
            throw new IllegalArgumentException(
                    "Google email is not verified"
            );
        }

        return payload;
    }
}
