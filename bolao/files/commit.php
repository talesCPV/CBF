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

        }else if($_POST["do"] == 3){
            $auth = $_POST["auth"];
            $query = "SELECT * FROM tb_usuario WHERE master_key='{$auth}';";

        }else if($_POST["do"] == 4){
            $json = $_POST["json"];
            $ano = $_POST["ano"];
            $obj = json_decode($json);
            for($i=0; $i<count($obj); $i++){
                for($j=0; $j<count($obj[$i]); $j++){
                    $jogo = get_object_vars($obj[$i][$j]);
                    $mand = get_object_vars($jogo["mandante"]);
                    $vist = get_object_vars($jogo["visitante"]);
                    //*****//
                    $num_jogo = $jogo["num"];
                    $data = $jogo["data"];
                    $horario = $jogo["horario"];
                    $local = $jogo["estadio"];
                    $mand_nome = $mand["nome"];
                    $mand_sigla = $mand["sigla"];
                    $mand_logo = $mand["logo"];
                    $mand_placar = $mand["placar"];
                    $vist_nome = $vist["nome"];
                    $vist_sigla = $vist["sigla"];
                    $vist_logo = $vist["logo"];
                    $vist_placar = $vist["placar"];


                    $query = "INSERT INTO tb_jogos VALUES (DEFAULT, {$ano}, {$num_jogo}, '{$horario}', '{$data}', '{$local}', DEFAULT, '{$mand_nome}', '{$vist_nome}', '{$mand_placar}', '{$vist_placar}');";
                    mysqli_query($conexao, $query);

//                    print("Jogo: {$num_jogo} Data: {$data} Hora: {$horario} Local: {$local} - {$mand_nome} {$mand_placar} X {$vist_placar} {$vist_nome}<br>");
//                    print("Mandante: ".$mand["nome"]."<br>");
                            
                }
            }
//            print $json;

//            $query = "SELECT * FROM tb_usuario WHERE master_key='{$auth}';";                 
        }

//        echo $query;

        $result = mysqli_query($conexao, $query);        
        $fetch = mysqli_fetch_row($result);
        print json_encode($fetch);

    }

    $conexao->close();

?>

