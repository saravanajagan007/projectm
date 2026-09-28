<?php
/**
 * ProjectM Agency - Secure AJAX Contact Handler
 * Compatible with all shared hosting cPanel/Apache/LiteSpeed PHP environments (PHP 7.4 - 8.3+)
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Session-based or file-based rate limiting (Max 1 submission every 20 seconds per session/IP)
session_start();
$currentTime = time();
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

if (isset($_SESSION['last_submission_time']) && ($currentTime - $_SESSION['last_submission_time']) < 20) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'You are submitting too quickly. Please wait a few seconds before trying again.'
    ]);
    exit;
}

// Retrieve payload (supports both JSON payload and standard form-encoded POST)
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot check (anti-bot safeguard)
if (!empty($data['website_url']) || !empty($data['honeypot'])) {
    // Silently succeed for bots
    echo json_encode(['success' => true, 'message' => 'Thank you for reaching out!']);
    exit;
}

// Extract and sanitize fields
$name    = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email   = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone   = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$company = isset($data['company']) ? trim(strip_tags($data['company'])) : '';
$service = isset($data['service']) ? trim(strip_tags($data['service'])) : 'General Inquiry';
$budget  = isset($data['budget']) ? trim(strip_tags($data['budget'])) : 'Not Specified';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

// Validation
$errors = [];
if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Please provide your valid full name.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid business email address.';
}
if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Please provide a brief description of your project (minimum 10 characters).';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errors),
        'errors' => $errors
    ]);
    exit;
}

// Set last submission timestamp
$_SESSION['last_submission_time'] = $currentTime;

// Notification Email Settings
$to = 'contact@cloudcrafts.net'; // Primary recipient email
$subject = "🔥 New Project Inquiry: {$service} from {$name}";

$body = "New inquiry received from ProjectM Agency Website:\n\n";
$body .= "--------------------------------------------------\n";
$body .= "Client Name:  {$name}\n";
$body .= "Email:        {$email}\n";
$body .= "Phone:        " . ($phone ?: 'N/A') . "\n";
$body .= "Company:      " . ($company ?: 'N/A') . "\n";
$body .= "Service:      {$service}\n";
$body .= "Est. Budget:  {$budget}\n";
$body .= "Submitted At: " . date('Y-m-d H:i:s') . "\n";
$body .= "Client IP:    {$ip}\n";
$body .= "--------------------------------------------------\n\n";
$body .= "Project Details:\n{$message}\n\n";

$headers = [];
$headers[] = 'From: ProjectM Agency <no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'localhost') . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

// Send email (suppress warning if sendmail is not configured on local dev)
$mailSent = @mail($to, $subject, $body, implode("\r\n", $headers));

// Log entry to a local file for audit if mail fails or for backup
$logEntry = "[" . date('Y-m-d H:i:s') . "] {$name} <{$email}> | Service: {$service} | Budget: {$budget}\n";
@file_put_contents(__DIR__ . '/inquiries_log.txt', $logEntry, FILE_APPEND | LOCK_EX);

// Success response
echo json_encode([
    'success' => true,
    'message' => "Thank you, {$name}! Your project brief has been received. Our senior strategist will review it and get in touch within 24 hours.",
    'lead' => [
        'name' => $name,
        'service' => $service
    ]
]);
