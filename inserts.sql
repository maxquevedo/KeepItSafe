--PLANES
insert into planes values(1,2);
select * from planes;
-- USUARIOS
insert into usuarios values (1,'Adam','adam@falabella.com','Adam Acosta','1234','Cliente',1,'1');
insert into usuarios values (2,'Brett','Brett2@gmail.com','Brett Hodge','1234','Profesional',1,'1');
insert into usuarios values (3,'Lewis','lewisc@gmail.com','Lewis Clark','1234','Admin',1,'1');
insert into usuarios values (4,'Renee','Renee@gmail.com','Renee Briggs','1234','Cliente',2,'1');
insert into usuarios values (5,'Gavin','Gavin@gmail.com','Gavin Love','1234','Profesional',2,'1');
insert into usuarios values (6,'Maxi','maxquevedo@gmail.com','Maximiliano Quevedo','1234','Cliente',3,'1');
select * from usuarios;
-- PRO
insert into pro values('10693187-9',1,'Brett','Hodge',sysdate,1);
insert into pro values('18708465-2',2,'Gavin','Love',sysdate,2);
select * from pro;
--CLIENTES
insert into clientes values('10433294-3',1,'Inmobiliaria','Able',1,1);
insert into clientes values('23313228-4',2,'Consultora','Able',1,2);
insert into clientes values('19208513-6',3,'Consultora','Able',1,null);
select * from clientes;
-- CONTRATOS
insert into contratos values(1,TO_DATE('01/10/2020','DD/MM/YYYY'),TO_DATE('01/10/2021','DD/MM/YYYY'),to_date('15/10/20','DD/MM/YY'),1,1);
insert into contratos values(2,TO_DATE('01/11/2020','DD/MM/YYYY'),TO_DATE('01/11/2021','DD/MM/YYYY'),to_date('20/11/20','DD/MM/YY'),1,2);
insert into contratos values(3,TO_DATE('01/11/2020','DD/MM/YYYY'),TO_DATE('01/12/2021','DD/MM/YYYY'),to_date('12/10/20','DD/MM/YY'),1,3);
select * from contratos;
--MEJORAS
insert into mejoras values(1,'abierta','extintor','',1,1);
insert into mejoras values(2,'abierta','pasamanos','',1,1);
insert into mejoras values(3,'abierta','zona segura','',1,1);
select * from mejoras;
--PRECIOS EXTRA
insert into precios_extra values(1,'Visita',2);
insert into precios_extra values(2,'Capacitacion',2);
insert into precios_extra values(3,'Asesoria especial',3);
insert into precios_extra values(4,'Reporte cliente',2);
insert into precios_extra values(5,'Cambiar checks',4);
insert into precios_extra values (6,'Subscripción mensual', 18);
--ACCIDENTES
insert into accidentes values(1,'accidente fisico',1,1,0);
insert into accidentes values(2,'extintor',1,1,0);
insert into accidentes values(3,'pasamanos',1,1,0);
insert into accidentes values(4,'zona segura',1,1,0);

-- descomentar si todo sale bien
-- commit; 