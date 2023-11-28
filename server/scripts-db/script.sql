/*TABLA CLIENTE*/

CREATE TABLE cliente (
	idCliente INT NOT NULL,
	nombre VARCHAR(20) NULL,
	apellido VARCHAR(20) NULL,
	edad INT NOT NULL,
	ciudad VARCHAR(30) NULL
)

INSERT INTO cliente (idCliente, nombre, apellido, edad, ciudad) VALUES (1, 'Juan', 'Pérez', 25, 'Ciudad de México');
INSERT INTO cliente (idCliente, nombre, apellido, edad, ciudad) VALUES (2, 'Monserrat', 'Ramírez', 30, 'Madrid');
INSERT INTO cliente (idCliente, nombre, apellido, edad, ciudad) VALUES (3, 'Carlos', 'López', 35, 'Buenos Aires');
INSERT INTO cliente (idCliente, nombre, apellido, edad, ciudad) VALUES (4, 'Ana', 'Rodríguez', 28, 'Lima');
INSERT INTO cliente (idCliente, nombre, apellido, edad, ciudad) VALUES (5, 'Pedro', 'Martínez', 32, 'Santiago');

/*TABLA ORDEN*/

CREATE TABLE orden (
	idOrden INT NOT NULL,
	idCliente INT NOT NULL,
	fecha DATE NOT NULL,
	monto DECIMAL(10,2) NULL
)

INSERT INTO orden (idOrden, idCliente, fecha, monto) VALUES (1, 3, '2023-07-18', 1500.00);
INSERT INTO orden (idOrden, idCliente, fecha, monto) VALUES (2, 4, '2023-07-19', 2000.00);
INSERT INTO orden (idOrden, idCliente, fecha, monto) VALUES (3, 1, '2023-07-20', 1500.00);
INSERT INTO orden (idOrden, idCliente, fecha, monto) VALUES (4, 5, '2023-07-21', 1800.00);
INSERT INTO orden (idOrden, idCliente, fecha, monto) VALUES (5, 2, '2023-07-22', 1200.00);
