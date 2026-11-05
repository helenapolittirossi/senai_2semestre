CREATE DATABASE IF NOT EXISTS guiasesi;

USE guiasesi;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('aluno', 'professor', 'coordenacao') NOT NULL
);

CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE agenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    data DATE NOT NULL,
    horario TIME,
    local VARCHAR(100)
);

CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    disciplina_id INT NOT NULL,
    professor_id INT NOT NULL,
    prazo DATE NOT NULL,
    status VARCHAR(30) DEFAULT 'Pendente',

    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    FOREIGN KEY (professor_id) REFERENCES usuarios(id)
);

CREATE TABLE avisos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    mensagem TEXT NOT NULL,
    data DATE NOT NULL,
    usuario_id INT NOT NULL,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE materiais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    disciplina_id INT NOT NULL,
    professor_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    link VARCHAR(255) NOT NULL,

    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    FOREIGN KEY (professor_id) REFERENCES usuarios(id)
);

CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    nota DECIMAL(4,2) NOT NULL,
    faltas INT DEFAULT 0,

    FOREIGN KEY (aluno_id) REFERENCES usuarios(id),
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);

//Inserir dados

INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('Helena Politti', 'helena@sesiamparo.com', '123456', 'aluno'),
('Paulo Correia', 'paulo@sesiamparo.com', '123456', 'professor'),
('Juliana Godoi', 'juliana@sesiamparo.com', '123456', 'coordenacao');

INSERT INTO disciplinas (nome) VALUES
('Matemática'),
('Português'),
('História');

INSERT INTO tarefas
(titulo, disciplina_id, professor_id, prazo, status)
VALUES
('Trabalho de Matemática', 1, 2, '2026-11-20', 'Pendente'),
('Lista de exercícios', 1, 2, '2026-11-25', 'Pendente'),
('Pesquisa sobre História', 3, 2, '2026-11-28', 'Concluída');

INSERT INTO avisos
(titulo, mensagem, data, usuario_id)
VALUES
('Reunião de pais', 'A reunião acontecerá na sexta-feira.', '2026-11-10', 2),
('Entrega de trabalhos', 'Não se esqueçam dos prazos de entrega.', '2026-11-12', 2),
('Comunicado escolar', 'A coordenação informa sobre o calendário escolar.', '2026-11-15', 3);

INSERT INTO materiais
(titulo, disciplina_id, professor_id, tipo, link)
VALUES
('Apostila de Matemática', 1, 2, 'PDF', 'https://exemplo.com/matematica.pdf'),
('Material de Português', 2, 2, 'PDF', 'https://exemplo.com/portugues.pdf'),
('Resumo de História', 3, 2, 'PDF', 'https://exemplo.com/historia.pdf');

INSERT INTO notas
(aluno_id, disciplina_id, nota, faltas)
VALUES
(1, 1, 8.5, 2),
(1, 2, 9.0, 1),
(1, 3, 7.5, 3);

INSERT INTO agenda
(titulo, descricao, data, horario, local)
VALUES
('Prova de Matemática', 'Avaliação do conteúdo do bimestre.', '2026-11-18', '08:00:00', 'Sala 12'),
('Entrega do trabalho de História', 'Prazo final para entrega.', '2026-11-20', '10:00:00', 'Sala 8'),
('Reunião de turma', 'Encontro com os alunos.', '2026-11-25', '14:00:00', 'Auditório');

