import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: NewTransaction) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

interface Transaction {
    title: string,
    amount: number,
    category: string,
    type: string,
    createdAt: string,
    id: number
}

type NewTransaction = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode
}

export function TransactionsProvider ({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])
    
    useEffect(() => {
        api.get('transactions')
            .then(response => {
                setTransactions(response.data.transactions)
            })
    }, [])

    async function createTransaction (newTransaction: NewTransaction) {
        const { data: { transaction } } = await api.post('/transactions', {...newTransaction, createdAt: new Date()})
        setTransactions((currentTransactions) => [...currentTransactions, transaction])
    }

    return (
        <TransactionsContext.Provider value={ { transactions, createTransaction } }>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)
    return context
}