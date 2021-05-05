<?php

    if (IsSet($_POST["do"])){

        include 'database.php';
        include 'sendMail.php';

        $query =  "";
        $email = "";
        $senha = "";
 
        if($_POST["do"] == 1){ // ADICIONA USUARIO

            $email = crip($_POST["email"]);
            $senha = crip($_POST["pass"]);
            $query = "INSERT INTO tb_usuario (email, senha ) VALUES ('{$email}', '{$senha}');";
            sendEmail($_POST["email"]);
       
        }else if($_POST["do"] == 2){ // VERIFICA USUARIO E SENHA
            $email = crip($_POST["user"]);
            $senha = crip($_POST["pass"]);
            $query = "SELECT * FROM tb_usuario WHERE email='{$email}' AND senha='{$senha}';";

        }else if($_POST["do"] == 3){ // AUTENTICA USUARIO
            $auth = $_POST["auth"];
            $query = "SELECT * FROM tb_usuario WHERE master_key='{$auth}';";

        }else if($_POST["do"] == 4){  // ADICIONA TODOS OS JOGOS POR ANO(TEMPORADA)
            $json = $_POST["json"];
            $ano = $_POST["ano"];
            $obj = json_decode($json);
            for($i=0; $i<count($obj); $i++){
                for($j=0; $j<count($obj[$i]); $j++){
                    $rodada = $i + 1;
                    $jogo = get_object_vars($obj[$i][$j]);
                    $mand = get_object_vars($jogo["mandante"]);
                    $vist = get_object_vars($jogo["visitante"]);
                    //*****//
                    $num_jogo = $jogo["num"];
                    $data = explode('/', $jogo["data"])[2]."-".explode('/', $jogo["data"])[1]."-".explode('/', $jogo["data"])[0];
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

                    $query = "INSERT INTO tb_jogos VALUES (DEFAULT, {$ano}, {$rodada}, {$num_jogo}, '{$horario}', '{$data}', '{$local}', DEFAULT, '{$mand_nome}', '{$vist_nome}', '{$mand_placar}', '{$vist_placar}');";
                    mysqli_query($conexao, $query);
                          
                }
            }
        }else if($_POST["do"] == 5){ // Adiciona Aposta
            $user = decrip($_POST["user"]);
            $jogo = $_POST["jogo"];
            $ano = $_POST["ano"];
            $p1 = $_POST["p1"];
            $p2 = $_POST["p2"];

//INSERT INTO table (id, name, age) VALUES(1, "A", 19) ON DUPLICATE KEY UPDATE    
//name="A", age=19

            $query = "INSERT INTO tb_apostas VALUES ( {$user}, {$jogo}, {$ano}, {$p1}, {$p2} )
             ON DUPLICATE KEY UPDATE p_mand={$p1}, p_vist={$p2};";

            print $query;

            mysqli_query($conexao, $query);
        }else if($_POST["do"] == 6){ // Adiciona Aposta
            $user = decrip($_POST["user"]);
            $ano = $_POST["ano"];

            $query = "SELECT * FROM tb_apostas WHERE id_user={$user} AND temporada={$ano};";

//            print $ano;

        }

        $result = mysqli_query($conexao, $query);
        $fetch = mysqli_fetch_row($result);
        $resp = [$fetch];
        while($fetch = mysqli_fetch_row($result)){
            array_push($resp, $fetch);
        }
        print json_encode($resp);

    }

    $conexao->close();

?>

