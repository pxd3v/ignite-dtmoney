import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles'



export function TransactionTable () {
    const { transactions } = useTransactions()

    const getAmountLabel = (type: string, amount: number) => {
        return `${type === 'withdraw' ? '-' : ''}${new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount)}`
    }

    const getDateLabel = (date: string) =>  {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
    }

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(({ id, title, type,amount, category, createdAt }) => (
                        <tr key={id}>
                            <td>{title}</td>
                            <td className={type}>{getAmountLabel(type, amount)}</td>
                            <td>{category}</td>
                            <td>{getDateLabel(createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}