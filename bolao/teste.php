<?php

    $destino = 'talescd@gmail.com';

    

    use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

    require 'phpMail/Exception.php';
    require 'phpMail/PHPMailer.php';
    require 'phpMail/SMTP.php';

    $mail = new PHPMailer;

    $mail->isSMTP();                                      	// Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';                        	// Specify main and backup SMTP servers
    $mail->Port = 587;
    $mail->SMTPAuth = true;                               	// Enable SMTP authentication
    $mail->Username = 'bolaobuteko@gmail.com';              // SMTP username
    $mail->Password = 'Buteko#01';                          // SMTP password
    $mail->SMTPSecure = 'tls';                            	// Enable encryption, 'ssl' also accepted
    $mail->setLanguage('pt_br', 'phpmailer.lang-pt_br.php');
    $mail->CharSet = 'UTF-8'; 

    $mail->From = 'bolaobuteko@gmail.com';
    $mail->FromName = 'Bolão do Buteko';
    $mail->addAddress($destino);    							// Add a recipient
    //$mail->addAddress('ellen@example.com','name '); 		  	// Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //$mail->WordWrap = 50;                                 	// Set word wrap to 50 characters
    //$mail->addAttachment('/var/tmp/file.tar.gz');         	// Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    	// Optional name
    $mail->isHTML(true);                                  		// Set email format to HTML

    $mail->Subject = 'Bem Vindo ao Bolão do Buteko 2021';
    $mail->Body    = "<h5>Obrigado por se cadastrar no Bolão do Buteko 2021</h5><br>
        <p>clique no link abaixo para confirmar seu registro</p>
        <a href='http://127.0.0.1/CBF/bolao/confirm.php?key={$destino}'> <h1> HABILITAR CONTA</h1> </a>";
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    echo $mail->Body;

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }



?>