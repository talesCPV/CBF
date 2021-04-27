<?php

	require_once("class.phpmailer.php");

	$mail = new PHPMailer();
	$mail->IsSMTP();		// Ativar SMTP
	$mail->SMTPDebug = 1;		// Debugar: 1 = erros e mensagens, 2 = mensagens apenas
	$mail->SMTPAuth = true;		// Autenticação ativada
	$mail->SMTPSecure = 'ssl';	// SSL REQUERIDO pelo GMail
	$mail->Host = 'smtp.gmail.com';	// SMTP utilizado
	$mail->Port = 465;  		// A porta 465 deverá estar aberta em seu servidor
	$mail->Username = 'bolaobuteko@gmail.com';
	$mail->Password = 'Buteko#01';
	$mail->SetFrom('bolaobuteko@gmail.com', 'Autenticação de email');
	$mail->Subject = 'Autenticação';
	$mail->Body = 'teste de email';
	$mail->AddAddress('talescd@gmail.com','seu nome');	

	if(!$mail->send()) {
		echo('erro => '.$mail->ErrorInfo);
		return 'Houve um erro no envio, favor tentar mais tarde: '.$mail->ErrorInfo; 
	} else {
		echo('sucesso');
		return true;
	}

// Buteko#01

?>

