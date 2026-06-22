<?php
header('Content-Type: application/json; charset=utf-8');

$toEmail = 'jonathanmchale8@gmail.com';
$headerEmail = 'jonathanmchale8@gmail.com';

$nameErr = $emailErr = $phoneErr = $serviceErr = $messageErr = '';
$name = $email = $phone = $service = $message = '';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit(json_encode([
        'status' => 'error',
        'msg' => 'Invalid request.',
    ]));
}

if (empty($_POST['name'])) {
    $nameErr = 'Name is required. ';
} else {
    $name = input_data($_POST['name']);
    if (!preg_match('/^[a-zA-Z ]*$/', $name)) {
        $nameErr = 'Name can only contain letters and white space. ';
    }
}

if (empty($_POST['email'])) {
    $emailErr = 'Email is required. ';
} else {
    $email = input_data($_POST['email']);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailErr = 'Invalid email format. ';
    }
}

if (empty($_POST['phone'])) {
    $phoneErr = 'Phone is required. ';
} else {
    $phone = input_data($_POST['phone']);
    if (!preg_match('/^[0-9+\s()-]*$/', $phone)) {
        $phoneErr = 'Invalid phone number format. ';
    }
}

if (empty($_POST['service'])) {
    $serviceErr = 'Service selection is required. ';
} else {
    $service = input_data($_POST['service']);
}

if (empty($_POST['message'])) {
    $messageErr = 'Message is required. ';
} else {
    $message = input_data($_POST['message']);
}

if ($nameErr !== '' || $emailErr !== '' || $phoneErr !== '' || $serviceErr !== '' || $messageErr !== '') {
    exit(json_encode([
        'status' => 'error',
        'msg' => $nameErr . $emailErr . $phoneErr . $serviceErr . $messageErr,
    ]));
}

$emailBody = "
    <b>Quote Request Details:</b><br><br>
    <b>Name:</b> $name<br>
    <b>Email:</b> $email<br>
    <b>Phone:</b> $phone<br>
    <b>Service:</b> $service<br><br>
    <b>Message:</b><br>$message
";

$subject = "New Quote Request from $name";

$header = "From: Cottle Construction <$headerEmail>\r\n";
$header .= "Reply-To: $name <$email>\r\n";
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-type: text/html; charset=UTF-8\r\n";

$mail_send = mail($toEmail, $subject, $emailBody, $header);

if ($mail_send) {
    exit(json_encode([
        'status' => 'success',
        'msg' => 'Your quote request was sent successfully!',
    ]));
}

exit(json_encode([
    'status' => 'error',
    'msg' => 'Your quote request could not be sent. Please call us on 0151 638 4838.',
]));

function input_data($data) {
    $data = trim($data);
    $data = stripslashes($data);
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}
