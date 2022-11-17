-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

-- Criação da banco de dados do projeto AlertCenter.

CREATE DATABASE AlertCenter;
USE AlertCenter;

-- Criação das tabelas conforme o DER.

-- Entidade Forte 
CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
CNPJ CHAR(14),
telefone1 CHAR(11),
telefone2 CHAR(11),
email VARCHAR(45), 
-- Verificação básica do email e seus parâmetros
CONSTRAINT chkEmail CHECK (email LIKE '%@%.%' AND email NOT LIKE '@%' and email NOT LIKE '%.'), 
senha VARCHAR(45)
);

-- Atributo composto com mais de 2 itens - Endereço
-- Entidade Fraca (depende da Empresa)
CREATE TABLE Endereco (
idEndereco INT,
-- Relação de 1 para 1. Uma FK para uma PK (UNIQUE a FK)
fkEmpresa INT UNIQUE,
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
PRIMARY KEY (idEndereco,fkEmpresa),
rua VARCHAR(45),
bairro VARCHAR(45),
numero CHAR(5),
cep CHAR(8),
complemento VARCHAR(45)
);

-- Entidade Forte
CREATE TABLE DataCenter(
idDataCenter INT PRIMARY KEY AUTO_INCREMENT,
descricao VARCHAR(45),
andar CHAR(2),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Entidade Forte
CREATE TABLE Rack (
idRack INT PRIMARY KEY AUTO_INCREMENT,
corredor INT,
identificacao CHAR(3),
categoria VARCHAR(45),
fkDataCenter INT,
FOREIGN KEY (fkDataCenter) REFERENCES DataCenter(idDataCenter)
);

-- Entidade Forte
CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
numeroSerie VARCHAR(10),
descricao VARCHAR(45),
fkRack INT,
FOREIGN KEY (fkRack) REFERENCES Rack(idRack)
);

-- Entidade Fraca (depende do Sensor)
CREATE TABLE Metrica (
idMetrica INT,
fkSensor INT,
FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
PRIMARY KEY (idMetrica,fkSensor),
temperatura DOUBLE,
umidade DOUBLE,
dtMetrica DATETIME
);

/*
comando para sql server - banco remoto - ambiente de produção
*/

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY IDENTITY(1,1),
	descricao VARCHAR(300)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
);

/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
