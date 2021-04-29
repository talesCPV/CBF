<?php
    if(isset($_GET['email'])){
        include 'database.php';

        $key = crip($_GET["email"]);
        $email = $_GET['email'];

        $query = "SELECT id FROM tb_usuario WHERE email='{$key}';";
        $result = mysqli_query($conexao, $query);
        $fetch = mysqli_fetch_row($result);

        if(count($fetch) > 0){
            $id =  crip($fetch[0]);

            $query = "UPDATE tb_usuario set status='ON', master_key='{$id}' WHERE email='{$key}';";
        
            $result = mysqli_query($conexao, $query);
//            echo "<h1>{$id}</h1><br>";

        }

        $conexao->close();
 
        header('Location:http://mylastpixel.com/bolao/login.html');
    }

?>