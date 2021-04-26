<?php

	include 'crip.php';

	$usuario  = decrip('?:?AX?`6`tfsWZ?LBb??D@=,[?QSVMTH/G7"`?\AO?U7?]mn');
	$senha    = decrip(`xsxz8xB!9e0m7:x, Cxx"y0);x13V-H(2'y%cx=z/x5 x?qY`);
	$servidor = decrip('k9km+k3n557r*-kxn:kkplw,.k"%[yltlsul`k/m k(vk065');
	$banco    = decrip(' 7:y 9yC2`tbs8;y-!pyy##=/=y24VpTv/(#"\y?%0yf7`@mn');

	$conexao = new mysqli($servidor, $usuario, $senha, $banco);

	if (!$conexao)
		die ("Erro de conexão com localhost, o seguinte erro ocorreu -> ".mysql_error());


?>
