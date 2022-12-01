/* Comandos para mysql - banco local - ambiente de desenvolvimento */

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


-- --------------------------------------------------------------
-- Nossa empresa irá até o DataCenter para cadastrar os dispositivos no sistema:
INSERT INTO datacenter VALUES 
(1,'South-Murilo','1',1);

INSERT INTO rack VALUES 
(1,1,'A','aberto',1);

INSERT INTO sensor VALUES 
(1,'0001MD','DHT-11',1);
-- --------------------------------------------------------------

-- Metricas inicias para o LIMIT 6
INSERT INTO metrica VALUES
(NULL,1,25.0,50.0,NOW()),
(NULL,1,25.0,50.0,NOW()),
(NULL,1,25.0,50.0,NOW()),
(NULL,1,25.0,50.0,NOW()),
(NULL,1,25.0,50.0,NOW()),
(NULL,1,25.0,50.0,NOW());

-- Agora, só ir atualizando as métricas conforme o Arduino ;), faça o teste! 
-- OBS: mude APENAS a temperatura e umidade! na lógica o mesmo sensor está plotando em dois gráficos para fins didáticos.
INSERT INTO Metrica VALUES
(NULL,1,35.0,20.0,NOW());


/* Comandos para sql server - banco remoto - ambiente de produção */

-- Criação de tabelas
CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY IDENTITY(1,1),
nome VARCHAR(45),
CNPJ CHAR(14),
telefone1 CHAR(11),
telefone2 CHAR(11),
email VARCHAR(45), 
CONSTRAINT chkEmail CHECK (email LIKE '%@%.%' AND email NOT LIKE '@%' and email NOT LIKE '%.'), 
senha VARCHAR(45)
);

CREATE TABLE endereco (
idEndereco INT,
fkEmpresa INT UNIQUE,
FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
PRIMARY KEY (idEndereco,fkEmpresa),
rua VARCHAR(45),
bairro VARCHAR(45),
numero CHAR(5),
cep CHAR(8),
complemento VARCHAR(45)
);

CREATE TABLE datacenter(
idDataCenter INT PRIMARY KEY IDENTITY(1,1),
descricao VARCHAR(45),
andar CHAR(2),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE rack (
idRack INT PRIMARY KEY IDENTITY(1,1),
corredor INT,
identificacao CHAR(3),
categoria VARCHAR(45),
fkDataCenter INT,
FOREIGN KEY (fkDataCenter) REFERENCES datacenter(idDataCenter)
);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY IDENTITY(1,1),
numeroSerie VARCHAR(10),
descricao VARCHAR(45),
fkRack INT,
FOREIGN KEY (fkRack) REFERENCES rack(idRack)
);

CREATE TABLE metrica (
idMetrica INT IDENTITY(1,1),
fkSensor INT,
FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
PRIMARY KEY (idMetrica,fkSensor),
temperatura DECIMAL(10,2),
umidade DECIMAL(10,2),
dtMetrica DATETIME
);