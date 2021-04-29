<?php

	include 'crip.php';

	$usuario  = decrip('LlLOgLoh7M?JfiLZP9LMRNn-jL`b0[+VaUiU`LkO^LdiLlFG');
	$senha    = decrip('#M#)B#J+C?8@AD#4*K#%,(0*E#9;15G0:/(#c#F)7#?z#GK2');
	$servidor = decrip('DSDG_Dg%OOQ^^aDRHTDEJF0-bDWYqS"N"M."`DcGUD[/DdPO');
	$banco    = decrip('ilUXpUxd7M9JorUdYIUV[Vn0sUik0I+Oa_VU[UtWgU?i7uFG');

	$conexao = new mysqli($servidor, $usuario, $senha, $banco);

	if (!$conexao)
		die ("Erro de conexão com localhost, o seguinte erro ocorreu -> ".mysql_error());


?>
