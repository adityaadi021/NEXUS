import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CreditCard, Trophy, CheckCircle2, XCircle } from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  date: string;
  tournamentName: string;
  status: 'completed' | 'failed' | 'pending';
  paymentMethod: string;
  transactionId: string;
}

// Mock data - In a real app, this would come from your database
const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 500,
    date: '2024-03-15',
    tournamentName: 'Weekend Warriors',
    status: 'completed',
    paymentMethod: 'UPI',
    transactionId: 'TXN123456'
  },
  {
    id: '2',
    amount: 200,
    date: '2024-03-10',
    tournamentName: 'Daily Scrims',
    status: 'completed',
    paymentMethod: 'UPI',
    transactionId: 'TXN123457'
  }
];

export default function PaymentHistoryPage() {
  const totalSpent = mockPayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-3xl md:text-4xl text-neon-primary">Payment History</h1>
          <p className="text-lg text-gray-300">
            Track your tournament entry payments and transactions
          </p>
        </div>

        {/* Summary Card */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Overview of your tournament payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Total Spent</div>
                <div className="text-2xl font-semibold text-primary">₹{totalSpent}</div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Successful Payments</div>
                <div className="text-2xl font-semibold text-green-400">
                  {mockPayments.filter(p => p.status === 'completed').length}
                </div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Pending Payments</div>
                <div className="text-2xl font-semibold text-yellow-400">
                  {mockPayments.filter(p => p.status === 'pending').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment List */}
        <div className="space-y-4">
          {mockPayments.length > 0 ? (
            mockPayments.map((payment) => (
              <Card key={payment.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{payment.tournamentName}</CardTitle>
                      <CardDescription className="text-gray-400">
                        Transaction ID: {payment.transactionId}
                      </CardDescription>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      payment.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-gray-300">{payment.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <span className="text-gray-300">{payment.paymentMethod}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="text-gray-300">₹{payment.amount}</span>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        View Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="py-8 text-center">
                <p className="text-gray-300 mb-2">No payment history found</p>
                <p className="text-gray-400 text-sm">
                  Your payment history will appear here when you register for tournaments
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
