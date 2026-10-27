package com.healix.healix.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String from;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationCode(String to, String name, String code) {
        // Dev mode: no mail account configured, so print the code instead of emailing it.
        if (from == null || from.isBlank()) {
            log.warn("MAIL NOT CONFIGURED. Verification code for {} is: {}", to, code);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject("Your Healix verification code");
        message.setText(
            "Hi " + name + ",\n\n"
            + "Your Healix verification code is: " + code + "\n\n"
            + "It expires in 10 minutes. If you didn't request this, ignore this email."
        );
        mailSender.send(message);
    }
}