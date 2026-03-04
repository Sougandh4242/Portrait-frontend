import { XCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const BookingFailed = () => {
  return (
    <Layout>
      <section className="min-h-screen bg-background flex items-center justify-center px-6">
  <div className="glass rounded-xl p-10 max-w-md w-full text-center shadow-lg">

          <XCircle size={70} className="text-red-600 mx-auto mb-6" />
          
          <h1 className="text-2xl font-bold text-red-700 mb-3">
            Booking Failed
          </h1>

          <p className="text-gray-600 mb-4">
            The slot may already be booked or something went wrong.
            Please try again.
          </p>

          <p className="text-sm text-gray-400">
            You can close this window.
          </p>
        </div>

</section>
      
    </Layout>
  );
};

export default BookingFailed;