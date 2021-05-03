use mylast96_bolao_buteco;

show tables;

CREATE TABLE tb_usuario(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(70) NOT NULL,
    email VARCHAR(80) DEFAULT NULL,
    master_key VARCHAR(50) DEFAULT NULL,
    senha VARCHAR(50) DEFAULT NULL,
    torce varchar(30) DEFAULT NULL,
    status varchar(3) DEFAULT 'OFF',
    PRIMARY KEY(ID)
)DEFAULT CHARSET=UTF8;

CREATE TABLE tb_jogos (
    id INT NOT NULL AUTO_INCREMENT,
    ano int NOT NULL,
    rodada int NOT NULL,
    num_j int NOT NULL,
    hora_j varchar(5) DEFAULT NULL,
    data_j date DEFAULT NULL,
    local_j varchar(50) DEFAULT NULL,
    status_j varchar(7) NOT NULL DEFAULT 'ABERTO',
    mand varchar(30) DEFAULT NULL,
    vist varchar(30) DEFAULT NULL,
    p_mand int DEFAULT NULL,
    p_vist int DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX(ano,num_j)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

CREATE TABLE tb_apostas (
    id_user int NOT NULL,
    id_jogo int NOT NULL,
    p_mand int DEFAULT NULL,
    p_vist int DEFAULT NULL,
    PRIMARY KEY (id_user, id_jogo),
    FOREIGN KEY (id_user) REFERENCES tb_usuario(id),
    FOREIGN KEY (id_jogo) REFERENCES tb_jogos(id)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

*DROP TABLE tb_usuario;
*DROP TABLE tb_jogos;
*DROP TABLE tb_apostas;

SELECT * FROM tb_usuario;
SELECT * FROM tb_jogos;
SELECT * FROM tb_apostas;
