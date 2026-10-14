<?php
// ============================================================
// Contact Form Handler - PHP Version
// Use this ONLY if your hosting supports PHP (not Vercel)
// ============================================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

// CORS (agar React se call kar rahe ho)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

function clean_input($key) {
    return isset($_POST[$key]) ? trim(strip_tags($_POST[$key])) : '';
}

$name    = clean_input('name');
$email   = clean_input('email');
$phone   = clean_input('phone');
$subject = clean_input('subject');
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// Validation
$errors = [];
if (empty($name))    $errors[] = 'Name is required';
if (empty($email))   $errors[] = 'Email is required';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email';
if (empty($message)) $errors[] = 'Message is required';

// Header injection check
if (preg_match('/[\r\n]/', $email) || preg_match('/[\r\n]/', $name)) {
    $errors[] = 'Invalid characters detected';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => implode(', ', $errors)]);
    exit;
}

$to = "support@shayconsultancy.in";
$mail_subject = "New Inquiry from " . $name;

$body = "You received a new inquiry.\n\n";
$body .= "Name:    $name\n";
$body .= "Email:   $email\n";
$body .= "Phone:   $phone\n";
$body .= "Subject: $subject\n\n";
$body .= "Message:\n$message\n";

$from_email = "no-reply@shayconsultancy.in";
$headers  = "From: $from_email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $mail_subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
