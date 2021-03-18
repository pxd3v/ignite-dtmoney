import Modal from 'react-modal'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import CloseImg from '../../assets/close.svg';
import { RadioBox, Container, TransactionTypeContainer } from './styles'
import { useState } from 'react';
interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose}:NewTransactionModalProps) {
    const [type, setType] = useState('deposit')
    
    return (
        <Modal 
          isOpen={isOpen} 
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={onRequestClose} 
                className="react-modal-close"
            >
                <img src={CloseImg} alt="Fechar modal" />
            </button>
            <Container>
                <h2>Cadastrar transação</h2>
                <input
                    placeholder="Título"
                />
                <input
                    type="number"
                    placeholder="Valor"
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={type === 'deposit'}
                        onClick={() => { setType('deposit')}}
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"                    
                        isActive={type === 'withdraw'}
                        onClick={() => { setType('withdraw')}}
                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                />
                
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}