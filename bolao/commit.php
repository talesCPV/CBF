<?php

    if (IsSet($_POST["do"])){

        include 'database.php';
        include 'sendMail.php';

        $query =  "";
        $email = "";
        $senha = "";
 
        if($_POST["do"] == 1){

            $email = crip($_POST["email"]);
            $senha = crip($_POST["pass"]);
            $query = "INSERT INTO tb_usuario (email, senha ) VALUES ('{$email}', '{$senha}');";
            sendEmail($_POST["email"]);
       
        }else if($_POST["do"] == 2){
            $email = crip($_POST["user"]);
            $senha = crip($_POST["pass"]);
            $query = "SELECT * FROM tb_usuario WHERE email='{$email}' AND senha='{$senha}';";
        }

//        echo $query;

        $result = mysqli_query($conexao, $query);        
        $fetch = mysqli_fetch_row($result);
        print json_encode($fetch);

    }

    $conexao->close();

?>

