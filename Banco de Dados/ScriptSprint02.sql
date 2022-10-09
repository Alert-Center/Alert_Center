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
senha VARCHAR(45),
-- Uma empresa pode ser Matriz ou Filial, (auto-relacionamento para saber qual filial pertence a qual matriz)
fkMatriz INT,
FOREIGN KEY (fkMatriz) REFERENCES Empresa(idEmpresa)
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


-- Inserindo dados nas tabelas.

INSERT INTO Empresa VALUES
(NULL,'SPTech','38735516000157','11939289129',NULL,'sptech@sptech.school','senhaSPTECH',NULL),
(NULL,'Facebook','14857417000180','21926747238','22998172289','facebook@hotmail.com','senhaFACEBOOK',NULL),
(NULL,'Facebook Brasil','12345612356789','11029384756',NULL,'facebookbrasil@hotmail.com','senhaFACEBOOKBR',2),
(NULL,'Microsoft','83483534000143','13987652678','14908723336','microsoft@hotmail.school','senhaMicrosoft',NULL);

INSERT INTO Endereco VALUES 
(1,1,'Rua Haddock Lobo','Consolação','595','01414000','Prédio'),
(1,2,'Rua Washinton Luis','Toronto','1000B','92847189','Empresa'),
(1,3,'Rua Brasilia','stritivo','1001B','20394190','Empresa'),
(1,4,'Rua Microsoft Silva','New Yeah','1235','02938173','Empresa');

-- Dois Data Center para Microsoft, mostrando que uma empresa pode ter um ou mais.
INSERT INTO DataCenter VALUES
(NULL,'SPTech-2319','25',1),
(NULL,'Facebook-2039','30',2),
(NULL,'FacebookBR-4920','22',3),
(NULL,'Microsoft-1298','12',4),
(NULL,'Microsoft-2491','05',4);

-- Muitos Racks para um Data Center
INSERT INTO Rack VALUES
(NULL,1,'A','aberto' ,1),
(NULL,1,'B','fechado' ,1),
(NULL,1,'A','aberto' ,2),
(NULL,2,'A','aberto' ,2),
(NULL,3,'B','parede' ,3),
(NULL,3,'C','fechado' ,3),
(NULL,1,'A','fechado' ,4),
(NULL,2,'B','fechado' ,4),
(NULL,3,'C','aberto' ,5),
(NULL,2,'A','aberto' ,5);

-- Um Sensor por Rack.
INSERT INTO Sensor VALUES
(NULL,'1298AN','DHT-11',1),
(NULL,'982NAS','DHT-11',2),
(NULL,'ERT453','DHT-11',3),
(NULL,'192SD1','DHT-11',4),
(NULL,'123JAS','DHT-11',5),
(NULL,'493NSM','DHT-11',6),
(NULL,'929FNW','DHT-11',7),
(NULL,'029DMV','DHT-11',8),
(NULL,'234AJE','DHT-11',9),
(NULL,'249AMD','DHT-11',10);

-- Duas métricas testes por sensor.
INSERT INTO Metrica VALUES 
(1,1,50.5,19.2,'2022-09-12 09:23:00'),
(2,1,30.5,11.2,'2022-09-12 09:23:01'),
(1,2,50.9,10.3,'2022-07-11 07:23:00'),
(2,2,20.5,49.4,'2022-07-11 07:23:01'),
(1,3,17.5,59.5,'2022-05-11 05:25:00'),
(2,3,12.5,19.6,'2022-05-11 05:25:01'),
(1,4,07.5,39.7,'2022-03-13 03:27:00'),
(2,4,03.5,49.8,'2022-03-13 03:27:01'),
(1,5,44.5,29.9,'2022-01-15 01:29:00'),
(2,5,35.5,39.8,'2022-01-15 01:29:01'),
(1,6,30.5,49.7,'2022-08-17 09:19:00'),
(2,6,20.5,19.6,'2022-08-17 09:19:01'),
(1,7,50.6,29.5,'2022-06-19 07:19:00'),
(2,7,30.7,29.4,'2022-06-19 07:19:01'),
(1,8,30.8,49.3,'2022-11-17 05:24:00'),
(2,8,20.9,29.2,'2022-11-17 05:24:01'),
(1,9,03.5,19.1,'2022-11-11 03:26:00'),
(2,9,12.5,09.1,'2022-11-11 03:26:01'),
(1,10,12.5,09.1,'2022-12-14 02:27:00'),
(2,10,12.6,09.2,'2022-12-14 02:27:01');


-- Comandos de Consulta

-- Consultar as tabelas separadamente 
SELECT * FROM Empresa;
SELECT * FROM Endereco;
SELECT * FROM DataCenter;
SELECT * FROM Rack;
SELECT * FROM Sensor;
SELECT * FROM Metrica;

-- Consulta de Tabelas Relacionadas

-- Consultar as empresas e seus respectivos endereços.
SELECT  empresa.nome AS Empresa, 
		endereco.rua,
        endereco.bairro,
        endereco.numero,
        endereco.cep,
        endereco.complemento
			FROM Empresa AS empresa JOIN Endereco AS endereco
				ON endereco.fkEmpresa = empresa.idEmpresa;
                
-- Consultar todas as Empresas e o nome das suas respectivas filiais.
SELECT  m.nome AS Matriz,
		f.nome AS Empresa
			FROM Empresa as m RIGHT JOIN Empresa as f
				ON f.fkMatriz = m.idEmpresa;
                
-- Consultar informações dos Data Centers e suas respectivas Empresas.
SELECT  e.nome AS Empresa, 
		dc.idDataCenter,
		dc.descricao,
        dc.andar
			FROM Empresa AS e JOIN DataCenter AS dc
				ON dc.fkEmpresa = e.idEmpresa;

-- Consultar informações dos Racks e seus respectivos Data Centers.
SELECT  dc.idDataCenter,
		dc.descricao AS DataCenter,
		r.identificacao AS Rack_Identificação,
		r.corredor,
		r.categoria
			FROM DataCenter AS dc JOIN Rack AS r
				ON r.fkDataCenter = dc.idDataCenter;
                
-- Consultar qual Sensor está em cada Rack
SELECT  r.idRack,
		r.corredor AS Corredor_Rack,
		r.identificacao AS IdentificacaoRack,
		s.numeroSerie AS NumeroSerieSensor,
        s.descricao
			FROM Rack as r JOIN Sensor AS S
				ON s.fkRack = r.idRack; 
                
-- Consultar os Sensores e suas Métricas.
SELECT  s.idSensor,
		s.numeroSerie,
		s.descricao,
		m.temperatura,
		m.umidade,
		m.dtMetrica
			FROM Sensor AS s JOIN Metrica AS m
				ON m.fkSensor = s.idSensor;
                
-- Consultar todos os sensores de um Data Center.
	SELECT  dc.descricao as DataCenter,
    		s.descricao as Sensor,
			s.numeroSerie
				FROM DataCenter AS dc
					JOIN Rack AS r
						ON r.fkDataCenter = dc.idDataCenter
					JOIN Sensor AS s
						ON s.fkRack = r.idRack;

-- Consultar todas as Métricas de um determinado Data Center  (mostrar qual o corredor e o rack)
SELECT  dc.descricao AS DataCenter,
		r.corredor,
		r.identificacao AS Rack,
        m.temperatura,
        m.umidade,
        m.dtMetrica
			FROM DataCenter AS dc
				JOIN Rack as r
					ON r.fkDataCenter = dc.idDataCenter
				JOIN Sensor AS s
					ON s.fkRack = r.idRack
						JOIN Metrica AS m
							ON m.fkSensor = s.idSensor
			WHERE dc.descricao = "Facebook-2039";
            
-- Consultar as Métricas de um determinado corredor de um Data Center (mostrar a qual Rack pertence).
SELECT  dc.descricao AS DataCenter,
		r.corredor,
		r.identificacao AS Rack,
        m.temperatura,
        m.umidade,
        m.dtMetrica
			FROM DataCenter AS dc
				JOIN Rack as r
					ON r.fkDataCenter = dc.idDataCenter
				JOIN Sensor AS s
					ON s.fkRack = r.idRack
						JOIN Metrica AS m
							ON m.fkSensor = s.idSensor
					WHERE dc.descricao = 'SPTech-2319' AND r.corredor= 1;
                    
				
-- Consultar as todas as Metricas das Empresas, mostrando se tem uma Matriz.
SELECT  mt.nome AS Matriz,
		f.nome AS Empresa,
		dc.descricao AS DataCenter,
		r.corredor,
		r.identificacao AS Rack,
        m.temperatura,
        m.umidade,
        m.dtMetrica
			FROM Empresa AS mt
				RIGHT JOIN Empresa AS f
					ON f.fkMatriz = mt.idEmpresa
				JOIN DataCenter AS dc
					ON dc.fkEmpresa = f.idEmpresa
				JOIN Rack AS r
					ON r.fkDataCenter = dc.idDataCenter
				JOIN Sensor AS s
					ON s.fkRack = r.idRack
				JOIN Metrica AS m
					ON m.fkSensor = s.idSensor;