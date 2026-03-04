import { CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const BookingSuccess = () => {
  return (
    <Layout>

      <section className="min-h-screen bg-background flex items-center justify-center px-6">
  <div className="glass rounded-xl p-10 max-w-md w-full text-center shadow-lg">
    

          <CheckCircle size={70} className="text-green-600 mx-auto mb-6" />
          
          <h1 className="text-2xl font-bold text-green-700 mb-3">
            Your portrait is booked!
          </h1>

          <p className="text-gray-600 mb-4">
            You will receive an email with your order details shortly.
          </p>

          <p className="text-sm text-gray-400">
            You can close this window.
          </p>
        </div>

</section>
    </Layout>
  );
};

export default BookingSuccess;


