<?php 

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require './phpmailer/src/Exception.php';
require './phpmailer/src/PHPMailer.php';
require './phpmailer/src/SMTP.php';

if (isset($_POST["email"]) && isset($_POST["otp"])) {

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'kazhu.korvi@gmail.com';
        $mail->Password   = 'xsosbahccgsdfmvv';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // Sender and recipient
        $mail->setFrom('kazhu.korvi@gmail.com', 'Sender Name');
        $mail->addAddress($_POST["email"], 'Recipient Name');

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'CarwashBoy OTP Code';
        $mail->Body    = $_POST["otp"];
        $mail->AltBody = 'Plain text version of the email';

        // Send the email
        $mail->send();
        echo '200';
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }

}


?>