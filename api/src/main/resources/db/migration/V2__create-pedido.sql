use confeitaria;

CREATE TABLE boleto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_boleto VARCHAR(48) NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  data_vencimento DATE NOT NULL
);

CREATE TABLE cartao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_cartao BIGINT NOT NULL,
codigo_verificador INT(3) NOT NULL,
nome_completo VARCHAR(255) NOT NULL,
data_vencimento DATE NOT NULL,
usuario_id INT,
FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE forma_pagamento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cartao_id INT,
  boleto_id INT,
  parcelas INT,
  FOREIGN KEY (cartao_id) REFERENCES cartao(id),
FOREIGN KEY (boleto_id) REFERENCES boleto(id)
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_pedido INT,
    valor_total DECIMAL(10, 2) DEFAULT 0,
    status ENUM('AGUARDANDO', 'CONCLUIDO', 'CANCELADO'), -- Campo "status" modificado para ENUM
    data_pedido DATE,
    usuario_id INT,
    forma_pagamento_id INT,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (forma_pagamento_id) REFERENCES forma_pagamento(id)
);

CREATE TABLE itens_pedido (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT,
  produto_id INT,
  quantidade INT,
  subtotal DECIMAL(10, 2) DEFAULT 0,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

DELIMITER $$

CREATE TRIGGER atualizar_valor_total
AFTER INSERT ON itens_pedido
FOR EACH ROW
BEGIN
DECLARE novo_subtotal DECIMAL(10, 2);
SET novo_subtotal = NEW.subtotal;

UPDATE pedidos
SET valor_total = valor_total + novo_subtotal
WHERE id = NEW.pedido_id;
END;
$$


DELIMITER //
CREATE TRIGGER calcular_subtotal
BEFORE INSERT ON itens_pedido
FOR EACH ROW
BEGIN
DECLARE produto_valor DECIMAL(10, 2);

-- Obter o valor do produto com base no produto_id
SELECT valor INTO produto_valor FROM produtos WHERE id = NEW.produto_id;

-- Calcular o subtotal e atribuir ao NEW.subtotal
SET NEW.subtotal = produto_valor * NEW.quantidade;
END;
//
DELIMITER ;


DELIMITER //
CREATE TRIGGER subtrair_quantidade
AFTER INSERT ON itens_pedido
FOR EACH ROW
BEGIN
-- Subtrair a quantidade de itens_pedido da quantidade de produtos
UPDATE produtos
SET quantidade = quantidade - NEW.quantidade
WHERE id = NEW.produto_id;
END;
//
DELIMITER ;

