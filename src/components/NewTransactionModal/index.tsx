import Modal from 'react-modal'
import { useState, FormEvent } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import CloseImg from '../../assets/close.svg';

import { RadioBox, Container, TransactionTypeContainer } from './styles'

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose}:NewTransactionModalProps) {
    const { createTransaction } = useTransactions()
    
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')

    const [type, setType] = useState('deposit')
    
    async function handleCreateNewTransaction (event: FormEvent) {
        event.preventDefault()

        await createTransaction({title, amount, category, type})
        onClose()
    }

    function onClose() {
        onRequestClose()
        clearForm()
    }

    function clearForm () {
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
    }

    return (
        <Modal 
          isOpen={isOpen} 
          onRequestClose={onClose}
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
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={type === 'deposit'}
                        onClick={() => { setType('deposit')}}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"                    
                        isActive={type === 'withdraw'}
                        onClick={() => { setType('withdraw')}}
                        activeColor="red"

                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}