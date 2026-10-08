select * from cliente;
select * from telefone;
select * from produto;
select * from pedido;

insert into cliente (nome, cep, numero, complemento) values
("Timóteo Matos","13905-714","27","Ap44 BL01"),
("Xeila Teixeira de Souza","13907-100",null,"Fundos"),
("Raul Bispo Filho","13907-100","100",null),
("Hugo Souza","13904-906","9090","Fundos"),
("Brito Bispo Martim","13904-906","1313","BL19 AP44"),
("Hugo Silva Alves","13904-452","1010","BL10 AP14"),
("Valter Martins","13904-071","1245",null),
("Antônio Martins","13905-520","2345",null),
("Zélia Júnior","13901-329","13",null),
("Evandro Martins de Oliveira","13905-682","17","BL12 AP44");

insert into telefone(id,id_cliente,numero,tipo) values
(1,"19 99987-8789","Celular"),
