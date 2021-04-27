<?php


//	require_once("class.phpmailer.php");

    echo"1";

//	echo('usuario:'.$usuario.' senha:'.$senha.' para:'.$fromaddr.' de:'.$email. ' nome:'.$name.' assunto:'.$subject.' mss:'.$mensagem);

    $mail = new PHPMailer();
    $mail->IsSMTP();		// Ativar SMTP
    $mail->SMTPDebug = 0;		// Debugar: 1 = erros e mensagens, 2 = mensagens apenas
    $mail->SMTPAuth = true;		// Autenticação ativada
    $mail->SMTPSecure = 'ssl';	// SSL REQUERIDO pelo GMail
    $mail->Host = 'mylastpixel.com.br';	// SMTP utilizado
    $mail->Port = 465;  		// A porta 465 deverá estar aberta em seu servidor
    $mail->Username = 'bolao_buteko@mylastpixel.com';
    $mail->Password = 'Buteco#1';
    $mail->SetFrom("noreply@bolaodobuteko", 'Bolao do Buteko');
    $mail->Subject = 'Autenticação de Email';
    $mail->Body = 'teste de email';
    $mail->AddAddress('talescd@gmail.com');

    print '$mail';

    if(!$mail->Send()) {
        echo('erro');
        return 'Houve um erro no envio, favor tentar mais tarde: '.$mail->ErrorInfo; 
    } else {
        echo('sucesso');
        return true;
    }



?>