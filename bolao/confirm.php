<?php
    if(isset($_GET['key'])){
        include 'database.php';

        $key = crip($_GET["key"]);
        $email = $_GET['key'];

//        echo($key);

        $query = "SELECT id FROM tb_usuario WHERE email='{$key}';";
        $result = mysqli_query($conexao, $query);
        $fetch = mysqli_fetch_row($result);
        if(count($fetch > 0)){
            $id =  crip($fetch[0]);
            echo "<h1>{$id}</h1><br>";

            $query = "UPDATE tb_usuario set status='ON', master_key='{$id}' WHERE email='{$key}';";
        
            $result = mysqli_query($conexao, $query);
            $fetch = mysqli_fetch_row($result);

        }

        $conexao->close();
        header('Location:http://127.0.0.1/CBF/bolao/login.html');
    }

?>