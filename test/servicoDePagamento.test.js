import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Classe de Servico de Pagamentos', () => {
    it('Validar que o pagamento é adicionada na lista de Pagamentos e que com o valor maior que 100 a categoria é igual a cara', function() {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
        const pagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamento.codigoBarras, '0987-7656-3475');
        assert.equal(pagamento.empresa, 'Samar');
        assert.equal(pagamento.valor, 156.87);
        assert.equal(pagamento.categoria, 'cara');
    });
        it('Validar que o pagamento é adicionada na lista de Pagamentos e com o valor menor que 100 a categoria é igual a padrão', function() {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('04532-4532-56643', 'Dotent', 90.00);
        const pagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamento.codigoBarras, '04532-4532-56643');
        assert.equal(pagamento.empresa, 'Dotent');
        assert.equal(pagamento.valor, 90.00);
        assert.equal(pagamento.categoria, 'padrão');
    });
        it('Validar que o último pagamento é retornado', function() {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('32532-45332-23443', 'Tentinet', 50.00);
        servicoDePagamento.pagar('54322-55433-34356', 'TecnoHuman', 200.00);
        servicoDePagamento.pagar('56443-65434-09764', 'JKNet', 100.00);

        const pagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamento.codigoBarras, '56443-65434-09764'); 
        assert.equal(pagamento.empresa, 'JKNet');
        assert.equal(pagamento.valor, 100.00);
        assert.equal(pagamento.categoria, 'padrão');
    });
        it('Validar que valor 100.01 tem categoria cara', function() {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();
        
        // Act
        servicoDePagamento.pagar('5443-5644-5443', 'LogicTec', 100.01);
        const pagamento = servicoDePagamento.consultarUltimoPagamento();
        
        // Assert
        assert.equal(pagamento.valor, 100.01);
        assert.equal(pagamento.categoria, 'cara');
    });
});