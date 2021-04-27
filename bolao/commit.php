<?php

    if (IsSet($_POST["do"])){

        include 'database.php';

        $query =  "";

        if($_POST["do"] == 1){

            $email = $_POST["email"];
            $senha = $_POST["pass"];

            $query = "INSERT INTO tb_usuario (email, senha ) VALUES ('{$email}', '{$senha}');";

        }


        echo $query;

        $result = mysqli_query($conexao, $query);

    /*		
        while($fetch = mysqli_fetch_row($result)){

        }
    */

    }

    $conexao->close();


?>